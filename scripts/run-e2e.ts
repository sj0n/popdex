/**
 * E2E orchestration: build → start wrangler dev → wait for ready → run tests → teardown.
 *
 * Prerequisites:
 *   - `wrangler login` has been run (the `pokemon` service binding resolves
 *     to the deployed `popdex-worker-api` worker via Cloudflare).
 *
 * Run via: `bun run test:e2e`
 */
import { spawn, execSync } from "node:child_process";

const PORT = 8787;
const HOST = `http://localhost:${PORT}`;
const READY_TIMEOUT_MS = 90_000; // wrangler dev + first JIT can be slow
const POLL_INTERVAL_MS = 1000;
const POLL_REQUEST_TIMEOUT_MS = 3000;

function log(msg: string) {
  console.log(`[e2e:orchestrate] ${msg}`);
}

async function waitForServer(startedAt: number): Promise<void> {
  if (Date.now() - startedAt >= READY_TIMEOUT_MS) {
    throw new Error(
      `server did not become ready at ${HOST} within ${READY_TIMEOUT_MS / 1000}s`,
    );
  }
  try {
    const res = await fetch(HOST, {
      method: "GET",
      signal: AbortSignal.timeout(POLL_REQUEST_TIMEOUT_MS),
    });
    // Any non-5xx means the server is up and rendering pages.
    if (res.status < 500) {
      log(
        `server ready at ${HOST} (status ${res.status}) after ${Math.round((Date.now() - startedAt) / 1000)}s`,
      );
      return;
    }
  } catch {
    // not up yet
  }
  await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
  return waitForServer(startedAt);
}

function killTree(pid: number | undefined) {
  if (!pid) return;
  try {
    if (process.platform === "win32") {
      // /T kills the whole process tree (cmd → bunx → wrangler → workerd).
      execSync(`taskkill /pid ${pid} /T /F`, { stdio: "ignore" });
    } else {
      process.kill(pid, "SIGTERM");
    }
  } catch {
    // already gone
  }
}

async function main() {
  // 1. Build the Nuxt app (produces .output/server/index.mjs for wrangler).
  log("building nuxt app...");
  execSync("bun run build", { stdio: "inherit" });
  log("build complete");

  // 2. Start wrangler dev in the background.
  log(`starting wrangler dev on port ${PORT}...`);
  const wrangler = spawn(
    "bunx",
    ["wrangler", "dev", "--port", String(PORT)],
    { stdio: "inherit", shell: true },
  );

  let exitCode = 1;
  const cleanup = (code: number) => {
    log("tearing down wrangler dev...");
    killTree(wrangler.pid);
    process.exit(code);
  };
  process.on("SIGINT", () => cleanup(130));
  process.on("SIGTERM", () => cleanup(143));

  // If wrangler dies on its own (e.g. port in use, auth failure), bail out.
  wrangler.on("exit", (code) => {
    if (code !== null && code !== 0) {
      log(`wrangler dev exited early with code ${code}`);
      cleanup(code);
    }
  });

  try {
    // 3. Wait until the server responds.
    await waitForServer(Date.now());

    // 4. Run the e2e tests against the running server.
    log("running e2e tests...");
    execSync("bunx vitest --project e2e --run", { stdio: "inherit" });
    log("e2e tests passed");
    exitCode = 0;
  } catch (e) {
    log(
      `e2e orchestration failed: ${e instanceof Error ? e.message : String(e)}`,
    );
    exitCode = 1;
  }

  cleanup(exitCode);
}

main();

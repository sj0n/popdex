import { BadRequestError } from "../types/api-error";

export function validateName(name: string | undefined): string {
  if (!name) throw new BadRequestError("Pokemon name is required.");

  const trimmed = name.trim();

  if (trimmed.length < 2)
    throw new BadRequestError(
      "Pokemon name must be at least 2 characters long.",
    );
  if (!trimmed.match(/^[a-z0-9\-']+$/i))
    throw new BadRequestError(
      "Pokemon name can only contain letters, hyphens and numbers.",
    );

  return trimmed.toLowerCase();
}

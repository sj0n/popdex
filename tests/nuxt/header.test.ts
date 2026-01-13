import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Header from "@@/app/components/Header.vue";

describe("Header component", () => {
  it("renders the header component", async () => {
    const wrapper = await mountSuspended(Header);
    expect(wrapper.text()).toContain("PopDex");

    const link = wrapper.find("a");
    expect(link.exists()).toBe(true);
    expect(link.text()).toBe("PopDex");
    expect(link.element.tagName).toBe("A");
  });
});

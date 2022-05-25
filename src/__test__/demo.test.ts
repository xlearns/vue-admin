import { describe, expect, it } from "vitest";
function add(a, b) {
  return a + b;
}
describe("vitest测试", () => {
  it("测试1", () => {
    expect(add(1, 2)).toBe(3);
  });
});

describe("vitest测试", () => {
  it("测试2", () => {
    expect(add("1", "2")).toBe(3);
  });
});

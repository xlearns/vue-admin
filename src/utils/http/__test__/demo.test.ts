import { describe, expect, it } from "vitest";
import { http } from "../";

function getTest(data?) {
  return http.request("get", "/api/login", { data });
}

describe("http测试", () => {
  it("测试1", () => {
    getTest().then(
      res => {
        expect(res).toBe("hello123");
      },
      er => {
        // expect(er).toBe("hello1");
      }
    );
  });
});

import { isDivideToZero } from "../../src/utils/index";
import { expect, it, describe } from "vitest";

describe("isDivideToZero should recogise correctly", () => {
  it("should return true", () => {
    const nums1 = [2, 0, 4];
    const ops1 = ["/", "-"];
    const expected1 = true;
    const result1 = isDivideToZero(nums1, ops1);

    expect(result1).toEqual(expected1);
  });

  it("should return false", () => {
    const nums2 = [3, 2, 6];
    const ops2 = ["*", "/"];
    const expected2 = false;
    const result2 = isDivideToZero(nums2, ops2);

    expect(result2).toEqual(expected2);
  });
});

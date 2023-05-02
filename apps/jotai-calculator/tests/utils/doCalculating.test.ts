import { it, describe, expect } from "vitest";
import { doComputating } from "../../src/utils/index";

describe.concurrent("should doCalculating do calculate correctly", () => {
  it("should handle addition and rouding", () => {
    const nums1 = [2, 3, 4];
    const ops1 = ["+", "-"];
    const expected1 = 1;
    const result1 = doComputating(nums1, ops1);

    expect(result1).toEqual(expected1);
  });

  it("should handle multiplication and division", () => {
    const nums2 = [3, 2, 6];
    const ops2 = ["*", "/"];
    const expected2 = 1;
    const result2 = doComputating(nums2, ops2);
    expect(result2).toEqual(expected2);
  });

  it("should handle negative number", () => {
    const nums3 = [-5, 2, 3];
    const ops3 = ["*", "+"];
    const expected3 = -7;
    const result3 = doComputating(nums3, ops3);
    expect(result3).toEqual(expected3);
  });

  it("should handle empty string", () => {
    const nums4: number[] = [];
    const ops4: string[] = [];
    const expected4 = 0;
    const result4 = doComputating(nums4, ops4);
    expect(result4).toEqual(expected4);
  });

  it("should handle decimal numbers", () => {
    const nums5 = [0.5, 2, 3];
    const ops5 = ["+", "-"];
    const expected5 = -0.5;
    const result5 = doComputating(nums5, ops5);
    expect(result5).toEqual(expected5);
  });
});

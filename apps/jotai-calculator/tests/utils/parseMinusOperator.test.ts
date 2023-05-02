import { translateFormulaToObject } from "../../src/utils/index";
import { it, describe, expect } from "vitest";

describe.concurrent('translateFormulaToObject should work correctly', () => {
  it('should correctly translate a valid formula string to an object', () => {
    const raw = "32-4*2+10/5";
    const expected = {
      nums: [32, -4, 2, 10, 5],
      ops: ["+", "*", "+", "/"],
      message: ""
    };

    const result = translateFormulaToObject(raw);

    expect(result).toEqual(expected);
  });

  it('should handle formula string with negative numbers correctly', () => {
    const raw = "20--3+5*-2";
    const expected = {
      nums: [20, 3, 5, -2],
      ops: ["+", "+", "*",],
      message: ""
    };

    const result = translateFormulaToObject(raw);

    expect(result).toEqual(expected);
  });

  it('should handle formula string with decimal numbers correctly', () => {
    const raw = "3.2*0.5-1.8/0.2";
    const expected = {
      nums: [3.2, 0.5, -1.8, 0.2],
      ops: ["*", "+", "/"],
      message: ""
    };

    const result = translateFormulaToObject(raw);

    expect(result).toEqual(expected);
  });

  it('should return an error message for invalid input', () => {
    const raw = "2+3*"; // Invalid formula
    const expected = {
      nums: [2, 3],
      ops: ["+", "*"],
      message: "Wrong input for calculation!"
    };

    const result = translateFormulaToObject(raw);

    expect(result).toEqual(expected);
  });

  it('should return an error message for divide by zero', () => {
    const raw = "5/0"; // Divide by zero
    const expected = {
      nums: [5, 0],
      ops: ["/"],
      message: "Can not divide by zero!"
    };

    const result = translateFormulaToObject(raw);

    expect(result).toEqual(expected);
  });
});

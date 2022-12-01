const priorityOperators = ["*", "/"];

export function doComputating(nums: number[], ops: string[]) {
  let result = 0;
  let newNums = [...nums];
  let newOps = [...ops];
  let i = 0;

  // Do priority operators
  while (i < newOps.length) {
    if (priorityOperators.includes(newOps[i])) {
      let temp = 0;

      if (newOps[i] === priorityOperators[0]) {
        temp = newNums[i] * newNums[i + 1];
      } else {
        temp = newNums[i] / newNums[i + 1];
      }

      newNums = [...newNums.slice(0, i), temp, ...newNums.slice(i + 2)];
      newOps = [...newOps.slice(0, i), ...newOps.slice(i + 1)];

      i = 0;
      continue;
    }

    i += 1;
  }

  // Do other operators: addition or minus
  result = newNums[0];

  for (let i = 0; i < newOps.length; i += 1) {
    if (newOps[i] === "+") {
      result += newNums[i + 1];
    } else {
      result -= newNums[i + 1];
    }
  }

  return Math.round(result * 1000) / 1000;
}

export function translateFormulaToObject(raw: string) {
  const nums: number[] = [];
  const ops: string[] = [];
  const transformed = raw
    .replace(/--/g, "+")
    .replace(/(-\+)|(\+-)/g, "-")
    .replace(/(\*\+)|(\+\*)/g, "*")
    .replace(/(\/\+)|(\+\/)/g, "/");
  let tempStr = transformed[0];
  let errMes = "";

  for (let i = 1; i < transformed.length; i += 1) {
    // Add value to temp if it can be convert to number or it is -, . , 0
    // Valid values: 32, 34-3, 31.3, 3402-0.4
    if (!["+", "*", "/"].includes(transformed[i])) {
      tempStr += transformed[i];
    } else {
      // If the temp string is not ending by the minus or dot such as 3-, 3-.
      if (tempStr && !["-", "."].includes(tempStr.slice(-1))) {
        parseMinusOperator(tempStr, nums, ops);
        ops.push(transformed[i]);
        tempStr = "";
      } else {
        errMes = "Wrong input for calculation!";
        break;
      }
    }

    // Check the temp when comes to the end of the formula
    if (i === transformed.length - 1) {
      // Make sure the end of formula is not an operator
      if (["+", "-", "*", "/"].includes(transformed[i])) {
        errMes = "Wrong input for calculation!";
        break;
      }

      // If temp is not a blank, then try to split the value that may contain - inside
      if (tempStr) {
        parseMinusOperator(tempStr, nums, ops);
      }
    }
  }

  if (!errMes && isDivideToZero(nums, ops)) {
    errMes = "Can not divide by zero!";
  }

  return { nums, ops, message: errMes };
}

export function parseMinusOperator(str: string, nums: number[], ops: string[]) {
  if (Number(str)) {
    nums.push(Number(str));
    return;
  }

  // Incase the string is a formula of minus
  const splitted = str.split("-");
  const isFirstNegative = str[0] === "-";
  let i = isFirstNegative ? 2 : 1;
  let j = isFirstNegative ? 1 : 0;

  nums.push(isFirstNegative ? -Number(splitted[1]) : Number(splitted[0]));

  // Adding numbers to array
  while (i < splitted.length) {
    nums.push(-Number(splitted[i]));
    i += 1;
  }

  // Adding operator to array
  while (j < splitted.length - 1) {
    ops.push("+");
    j += 1;
  }
}

export function isDivideToZero(nums: number[], ops: string[]) {
  for (let i = 0; i < ops.length; i += 1) {
    if (ops[i] === "/" && nums[i + 1] === 0) {
      return true;
    }
  }

  return false;
}

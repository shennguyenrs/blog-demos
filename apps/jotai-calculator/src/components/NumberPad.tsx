import { useAtom } from "jotai";
import { ReactElement } from "react";
import { errorAtom, historyAtom, inputAtom, previousInputAtom } from "../atoms";
import { doComputating, translateFormulaToObject } from "../utils";
import ChangeThemeBtn from "./ChangeThemeBtn";

const pad = [
  ["1", "2", "3", "+"],
  ["4", "5", "6", "-"],
  ["7", "8", "9", "*"],
  [".", "0", "=", "/"],
];

const funcs = ["C", "AC"];

export default function NumberPad(): ReactElement {
  const [history, setHistory] = useAtom(historyAtom);
  const [input, setInput] = useAtom(inputAtom);
  const [previousInput] = useAtom(previousInputAtom);
  const [err, setErr] = useAtom(errorAtom);

  function resetAllStates() {
    setHistory([]);
    setInput("");
    setErr("");
  }

  function handleInput(n: string) {
    // Rest error message when input change
    if (err) {
      setErr("");
    }

    switch (n) {
      // Handle clear all
      case "AC": {
        resetAllStates();
        break;
      }

      // Handle clear a character
      case "C": {
        setInput(previousInput);
        break;
      }

      // Handle caculation
      case "=": {
        const obj = translateFormulaToObject(input);

        if (obj.message) {
          setErr(obj.message);
          break;
        }

        const result = doComputating(obj.nums, obj.ops);

        const newArr = [
          ...history,
          {
            input,
            result,
          },
        ];

        setHistory(newArr);
        setInput(result.toString());
        break;
      }

      // Handle input a character
      default: {
        // Change value to new input
        // else use the old result
        const isInputDiffResult =
          Number(n) &&
          history.length &&
          history.slice(-1)[0].result.toString() === input;

        if (isInputDiffResult) {
          setInput(n);
        } else {
          setInput(input + n);
        }

        break;
      }
    }
  }

  return (
    <div className="grid grid-rows-5 gap-2">
      <div className="grid grid-cols-4 gap-2">
        {funcs.map((i, idx) => (
          <button
            key={idx}
            className="btn-num-base"
            onClick={() => handleInput(i)}
          >
            {i}
          </button>
        ))}
        <ChangeThemeBtn />
      </div>
      {pad.map((line, idx) => (
        <div key={idx} className="grid grid-cols-4 gap-2">
          {line.map((i, idx) => (
            <button
              key={idx}
              className="btn-num-base"
              onClick={() => handleInput(i)}
            >
              {i}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

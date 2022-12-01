import { useAtom } from "jotai";
import { ReactElement } from "react";
import { historyAtom, inputAtom } from "../atoms";

export default function Display(): ReactElement {
  const [history] = useAtom(historyAtom);
  const [input] = useAtom(inputAtom);

  return (
    <div className="border-2 border-gray-100 dark:border-gray-800 rounded-lg w-72 h-72 text-right p-2 grid grid-rows-6">
      <div className="row-span-5 flex justify-end items-end text-gray-300 dark:text-gray-600 overflow-y-hidden">
        <div className="flex flex-col">
          {history.map((i, idx) => (
            <div key={idx}>
              <p>{i.input}</p>
              <p>
                {idx === history.length - 1 && i.result.toString() === input
                  ? ""
                  : "= " + i.result}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="row-span-1 flex justify-end items-center">
        {history.length && history.slice(-1)[0].result.toString() === input ? (
          <p>
            <span className="text-gray-330 dark:text-gray-600"> = </span>{" "}
            {input}
          </p>
        ) : (
          <p>{input}</p>
        )}
      </div>
    </div>
  );
}

/** @jsxImportSource jotai-signal */

import { atom, useAtom } from "jotai";
import { $ } from "jotai-signal";
import "virtual:uno.css";

const counterAtom = atom(0);

function Controller() {
  const [, setCounter] = useAtom(counterAtom);
  return (
    <button
      className="bg-teal-200 hover:bg-teal-300 text-teal-700 font-bold py-2 px-4 rounded border-0 transition ease-in-out active:scale-95"
      onClick={() => setCounter((c: number) => c + 1)}
    >
      Add one to counter
    </button>
  );
}

function Display() {
  const [value] = useAtom(counterAtom);
  return (
    <p>
      Using 'useAtom': {value} - {Math.random()}
    </p>
  );
}

function DisplayWithSignal() {
  return (
    <p>
      Using Signal: {$(counterAtom)} - {Math.random()}
    </p>
  );
}

function App() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <h3>
        New number will be shown (next to the counter) when the component is
        re-render
      </h3>
      <Controller />
      <Display />
      <DisplayWithSignal />
    </div>
  );
}

export default App;

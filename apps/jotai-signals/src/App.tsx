/** @jsxImportSource jotai-signal */

import { atom, useAtom } from "jotai";
import { $ } from "jotai-signal";

const counterAtom = atom(0);

function Controller() {
  const [, setCounter] = useAtom(counterAtom);
  return (
    <button onClick={() => setCounter((c: number) => c + 1)}>
      Add one to counter
    </button>
  );
}

function Display() {
  const [value] = useAtom(counterAtom);
  return (
    <p>
      'useAtom': {value} - {Math.random()}
    </p>
  );
}

function DisplayWithSignal() {
  return (
    <p>
      Signal: {$(counterAtom)} - {Math.random()}
    </p>
  );
}

function App() {
  return (
    <>
      <Controller />
      <p>
        New number will be shown after the counter when the component is
        re-render
      </p>
      <Display />
      <DisplayWithSignal />
    </>
  );
}

export default App;

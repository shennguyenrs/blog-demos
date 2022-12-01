import { useAtom } from "jotai";
import { ReactElement } from "react";
import { themeAtom } from "./atoms";
import { Display, ErrorMessage, NumberPad } from "./components";

export default function App(): ReactElement {
  const [theme] = useAtom(themeAtom);

  return (
    <div className={theme}>
      <div className="w-screen h-screen flex justify-center items-center flex-col bg-gray-50 dark:bg-slate-900 dark:text-gray-50">
        <p className="text-3xl underline">Jotai Calculator</p>
        <div className="mt-10">
          <Display />
        </div>
        <div className="mt-4">
          <ErrorMessage />
        </div>
        <div className="mt-4">
          <NumberPad />
        </div>
      </div>
    </div>
  );
}

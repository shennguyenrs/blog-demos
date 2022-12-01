import type { ReactElement } from "react";
import { useAtom } from "jotai";
import { errorAtom } from "../atoms";

export default function ErrorMessage(): ReactElement {
  const [message] = useAtom(errorAtom);

  return message.length ? <p className="italic text-red-400">{message}</p> : <p className="invisible">No Error</p>;
}

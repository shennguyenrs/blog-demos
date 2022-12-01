import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { HISTORY } from "../interfaces";

// Theme
export const themeAtom = atomWithStorage<string>("color-theme", "light");
export const isLightThemeAtom = atom((get) => get(themeAtom) === "light");

// History of caculation
export const historyAtom = atomWithStorage<HISTORY[]>("his-cal", []);

// Current inputted math formula
export const inputAtom = atom<string>("");

// Current inputted math formula that clear one charater on the end
export const previousInputAtom = atom((get) => {
  const i = get(inputAtom).slice(0, -1);
  return i ? i : "";
});

export const errorAtom = atom<string>("");

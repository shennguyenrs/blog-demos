import { useAtom } from "jotai";
import { ReactElement } from "react";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { isLightThemeAtom, themeAtom } from "../atoms";
import { THEME_MODE } from "../libs/config";

export default function ChangeThemeBtn(): ReactElement {
  const [, setTheme] = useAtom(themeAtom);
  const [isLightTheme] = useAtom(isLightThemeAtom);

  function handleChangeTheme() {
    setTheme(isLightTheme ? THEME_MODE.DA : THEME_MODE.LI);
  }

  return (
    <button
      className="btn-num-base flex justify-center items-center"
      onClick={handleChangeTheme}
    >
      {isLightTheme ? (
        <IoSunnyOutline size={30} />
      ) : (
        <IoMoonOutline size={30} />
      )}
    </button>
  );
}

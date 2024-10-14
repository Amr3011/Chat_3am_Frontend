import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../redux/reducers/themeReducer";
import { useEffect } from "react";

export default function ThemeToggler() {
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);
  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className="fixed w-12 z-50 h-12 bottom-12 right-12 rounded-full bg-base-content"
    >
      {isDarkMode ? "🌞" : "🌜"}
    </button>
  );
}

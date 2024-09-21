import { useSelector } from "react-redux";
import { RotateLoader } from "react-spinners";

export default function Loading() {
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  return (
    <div className="flex justify-center items-center min-h-screen">
      {isDarkMode ? (
        <RotateLoader color="white" />
      ) : (
        <RotateLoader color="black" />
      )}
    </div>
  );
}

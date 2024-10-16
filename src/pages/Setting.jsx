import ThemeToggler from "../components/inputs/ThemeToggler";
import LastSeen from "../components/chat/LastSeen";
import DeleteAccount from "../components/common/DeleteAccount";
import Logout from "../components/common/Logout";
import RightSide from "../components/common/RightSide";
import { faker } from "@faker-js/faker";

const Setting = () => {
  return (
    <div className="flex w-full">
      <div className="w-full md:w-[40%] lg:w-[30%] p-8 bg-base-100 shadow-lg">
        <h1 className="text-3xl font-bold mb-8">Setting</h1>
        <div className="flex items-center mb-8">
          <img
            src={faker.image.avatar()}
            alt="User Profile"
            className="w-20 h-20 rounded-full mr-6"
          />
          <span className="text-xl font-semibold">Lavern Laboy</span>
        </div>
        <ThemeToggler />
        <LastSeen />
        <DeleteAccount />
        <Logout />
      </div>
      <RightSide />
    </div>
  );
};

export default Setting;

import { Fragment } from "react";
import ThemeToggler from "../components/inputs/ThemeToggler";
import LastSeen from "../components/chat/LastSeen";
import DeleteAccount from "../components/common/DeleteAccount";
import Logout from "../components/common/Logout";
import RightSide from "../components/common/RightSide";
import { faker } from "@faker-js/faker";

const Setting = () => {
  return (
    <Fragment>
      <div className="flex w-full">
        <div className="w-full flex gap-4 flex-col">
          <h1>Personal Information</h1>
          <img src={faker.image.avatar()} alt="UserImage" />
          <p>Username</p>
          <ThemeToggler />
          <LastSeen />
          <DeleteAccount />
          <Logout />
        </div>
        <RightSide />
      </div>
    </Fragment>
  );
};

export default Setting;

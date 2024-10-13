import { Fragment } from "react";
import ThemeToggler from "../inputs/ThemeToggler";
import LastSeen from "./LastSeen";
import DeleteAccount from "./DeleteAccount";
import Logout from "./Logout";
import RightSide from "./RightSide";

import SideBar from "./SideBar";

const Setting = () => {
  return (
    <Fragment>
      <SideBar>
        <div className="flex w-full">
          <div className="w-full flex gap-4 flex-col">
            <h1>Personal Information</h1>
            <img src="" alt="UserImage" />
            <p>Username</p>
            <ThemeToggler />
            <LastSeen />
            <DeleteAccount />
            <Logout />
          </div>
          <RightSide />
        </div>
      </SideBar>
    </Fragment>
  );
};

export default Setting;

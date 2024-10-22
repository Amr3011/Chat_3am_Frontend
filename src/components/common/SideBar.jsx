import PropTypes from "prop-types";
import { TiMessageTyping } from "react-icons/ti";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { IoArrowRedoCircleOutline } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaQuestionCircle } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import siteMap from "../../sitemap";
import { useSelector } from "react-redux";
import socket from "./../../utils/Socket";
import { useEffect } from "react";

export default function SideBar({ children }) {
  const userInfo = useSelector((state) => state.user.userInfo);
  const location = useLocation();

  useEffect(() => {
    socket.emit("subscribe", userInfo._id);
    return () => {
      socket.emit("unsubscribe", userInfo._id);
      socket.disconnect();
    };
  }, [userInfo._id]);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content grid">
        <label
          htmlFor="my-drawer-2"
          className="drawer-button lg:hidden max-w-max p-3"
        >
          <IoArrowRedoCircleOutline fontSize={24} />
        </label>
        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="flex flex-col items-center justify-between bg-primary text-white min-h-full h-full w-32 p-4">
          {/* Sidebar content here */}
          <li>
            <Logo containerClass="" imgClass="rounded-full h-16 w-16" />
          </li>
          <li>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  className={`${
                    location.pathname === siteMap.chats.path &&
                    "text-primary bg-white"
                  } hover:text-primary hover:bg-white h-fit flex flex-col items-center p-2 rounded-lg`}
                  to={siteMap.chats.path}
                >
                  <TiMessageTyping fontSize={24} />
                  <p className="capitalize">chats</p>
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    location.pathname === siteMap.notifications.path &&
                    "text-primary bg-white"
                  } hover:text-primary hover:bg-white h-fit flex flex-col items-center p-2 rounded-lg`}
                  to={siteMap.notifications.path}
                >
                  <FaBell fontSize={24} />
                  <p className="capitalize">notifications</p>
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    location.pathname === siteMap.userInfo.path &&
                    "text-primary bg-white"
                  } hover:text-primary hover:bg-white h-fit flex flex-col items-center p-2 rounded-lg`}
                  to={siteMap.userInfo.path}
                >
                  <LuUser2 fontSize={24} />
                  <p className="capitalize">user info</p>
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    location.pathname === siteMap.groups.path &&
                    "text-primary bg-white"
                  } hover:text-primary hover:bg-white h-fit flex flex-col items-center p-2 rounded-lg`}
                  to={siteMap.groups.path}
                >
                  <HiOutlineUserGroup fontSize={24} />
                  <p className="capitalize">groups</p>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  className={`${
                    location.pathname === siteMap.settings.path &&
                    "text-primary bg-white"
                  } hover:text-primary hover:bg-white h-fit flex flex-col items-center p-2 rounded-lg`}
                  to={siteMap.settings.path}
                >
                  <GoGear fontSize={24} />
                  <p className="capitalize">settings</p>
                </Link>
              </li>
              <li className="flex justify-center">
                <img
                  src={userInfo.avatar}
                  alt="avatar"
                  width={0}
                  height={0}
                  className="h-12 w-12 rounded-full"
                />
              </li>
            </ul>
            <ul>
              <li className="mt-4">
                {" "}
                <Link
                  className={`${
                    location.pathname === siteMap.FAQs.path &&
                    "text-primary bg-white"
                  } hover:text-primary hover:bg-white h-fit flex flex-col items-center p-2 rounded-lg`}
                  to={siteMap.FAQs.path}
                >
                  <FaQuestionCircle fontSize={24} />
                  <p className="capitalize">FAQs</p>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

SideBar.propTypes = {
  children: PropTypes.node.isRequired,
};

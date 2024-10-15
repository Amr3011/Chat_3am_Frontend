// import { Fragment } from "react";
// import RightSide from "./RightSide";
// import SideBar from "./SideBar";
import { useState } from "react";
import SideBar from "./SideBar";
import SendIcon from "../../assets/SendIcon.svg";
import AttachedIcon from "../../assets/AttachedIcon.svg";
import Threedots from "../../assets/Threedots.svg";
// import SearchIcon from "../../assets/SearchIcon.svg";
const PrivateChat = () => {
  const [messages, setMessages] = useState([]);

  return (
    <SideBar>
      <div className="flex w-1/3">
        <div className="flex flex-col">
          Chats
          <button className="bg-primary text-white rounded-full ">
            Add User
          </button>
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input  w-24 md:w-auto bg-white pl-8 pr-4"
          />
        </div>
      </div>
      <div className=" bg-gray-100 w-2/3 hidden lg:flex items-center justify-center flex-col">
        {/*NavBar*/}
        <div className="navbar bg-primary">
          <div className="flex-1">
            <a className="btn btn-ghost text-white text-xl">User1</a>
          </div>
          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="">
                  <img alt="Tailwind CSS Navbar component" src={Threedots} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Messages */}
        <ul className="flex-1 overflow-y-auto p-4" id="messages">
          {messages.map((msg, index) => (
            <li
              key={index}
              className={`p-2 my-2 rounded-lg ${
                index % 2 === 0 ? "bg-gray-200" : "bg-white"
              }`}
            >
              {msg}
            </li>
          ))}
        </ul>

        {/* Typing status */}
        <p id="typing_status" className="px-4 text-sm text-gray-500">
          {/* This will show typing status */}
        </p>

        {/* Input Form */}
        <form
          className=" w-full bg-base-100 p-3 flex items-center border-gray-300"
          id="form"
        >
          <button type="submit" className="px-1">
            <img src={AttachedIcon} alt="SendIcon" />
          </button>
          <input
            id="input"
            type="text"
            placeholder="Type your message..."
            className="flex-grow bg-gray-100 rounded-full px-4 py-2 focus:outline-none"
            autoComplete="off"
          />
          <button
            type="submit"
            className=" text-white px-4 py-2 ml-2 rounded-full"
          >
            <img src={SendIcon} alt="SendIcon" />
          </button>
        </form>
      </div>
    </SideBar>
  );
};
export default PrivateChat;


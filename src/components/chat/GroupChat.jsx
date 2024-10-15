import { useState } from "react";
import SendIcon from "../../assets/SendIcon.svg";
import AttachedIcon from "../../assets/AttachedIcon.svg";
import RightSide from "../common/RightSide";
import { AiOutlineSearch } from "react-icons/ai";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { faker } from "@faker-js/faker";

const avatar = faker.image.avatar();

const GroupChat = () => {
  // Sample group chats data
  const initialGroups = [
    {
      id: 1,
      name: "Group A",
      members: ["Tafeda", "Sodfa", "Alice"],
      image: "/path/to/groupA.png",
      messages: ["Welcome to Group A!", "Let's discuss our project."],
    },
    {
      id: 2,
      name: "Group B",
      members: ["Bob", "Charlie"],
      image: "/path/to/groupB.png",
      messages: ["Good morning, everyone!", "What's on the agenda today?"],
    },
  ];

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setMessages(group.messages);
  };

  const handleSearchToggle = () => {
    setSearchActive((prev) => !prev);
  };

  const handleBackClick = () => {
    setSelectedGroup(null);
    setMessages([]);
  };

  // Filter groups based on search query
  const filteredGroups = initialGroups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen">
      {/* Sidebar with group list */}
      <div
        className={`w-full lg:w-1/3 p-4 bg-base-100 ${
          selectedGroup ? "hidden lg:block" : "block"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4 text-secondary">Groups</h2>
        <button className="bg-primary text-white rounded-full px-4 py-2 mb-4">
          Create Group
        </button>
        <div className="form-control mb-4">
          <input
            type="text"
            placeholder="Search or create a new group"
            className="input w-full bg-white pl-4 pr-4 text-neutral"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          />
        </div>

        {/* Group list */}
        <ul className="space-y-4">
          {filteredGroups.map((group) => (
            <li
              key={group.id}
              className={`cursor-pointer p-4 rounded-md shadow flex items-center ${
                selectedGroup?.id === group.id
                  ? "bg-[#E6E6E6]" // Selected group background
                  : "bg-[#F5F5F5]" // Unselected group background (light gray)
              }`}
              onClick={() => handleGroupClick(group)}
            >
              <div className="relative mr-4">
                <img
                  src={avatar}
                  alt={group.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <span className="text-base text-secondary">{group.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat area */}
      <div
        className={`flex-1 bg-white flex flex-col ${
          selectedGroup ? "" : "hidden lg:block"
        }`}
      >
        {selectedGroup ? (
          <>
            {/* Navbar with back button */}
            <div className="navbar bg-primary w-full flex items-center">
              <button
                onClick={handleBackClick}
                className="flex items-center text-white mr-4"
              >
                <IoIosArrowBack className="w-6 h-6" />
                <span className="ml-2">Back</span>
              </button>
              <div className="flex-1 flex items-center">
                <div className="relative mr-2">
                  <img
                    src={avatar}
                    alt={selectedGroup.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <span className="text-white text-xl">{selectedGroup.name}</span>
              </div>
              <div className="flex-none">
                <AiOutlineSearch
                  className="text-white w-6 h-6 cursor-pointer"
                  onClick={handleSearchToggle}
                />
              </div>
            </div>

            {/* Search input for filtering messages */}
            {searchActive && (
              <div className="w-full p-4 bg-gray-200">
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="input w-full bg-gray-100 pl-4 pr-4 rounded-lg"
                />
                <div className="flex justify-end mt-2">
                  <FaArrowUp className="mr-2 cursor-pointer text-black" />
                  <FaArrowDown className="cursor-pointer text-black" />
                </div>
              </div>
            )}

            {/* Messages Container */}
            <div
              className="flex-1 overflow-y-auto p-4 w-full"
              style={{ maxHeight: "calc(100vh - 200px)" }}
            >
              <ul className="w-full">
                {messages.map((msg, index) => (
                  <li
                    key={index}
                    className={`p-2 my-2 rounded-lg ${
                      index % 2 === 0
                        ? "bg-[#F1F1F1] text-black" // First sender's message
                        : "bg-primary text-white" // Second sender's message
                    }`}
                  >
                    {msg}
                  </li>
                ))}
              </ul>
            </div>

            {/* Input form fixed at the bottom */}
            <form
              className="bg-base-100 flex items-center p-2"
              onSubmit={(e) => {
                e.preventDefault();
                const newMessage = e.target.input.value;
                setMessages((prev) => [...prev, newMessage]);
                e.target.input.value = "";
              }}
            >
              <button type="submit" className="px-1">
                <img src={AttachedIcon} alt="Attach" />
              </button>
              <input
                id="input"
                type="text"
                placeholder="Type your message..."
                className="flex-grow bg-gray-100 rounded-full px-4 py-2 text-base focus:outline-none"
                autoComplete="off"
              />
              <button
                type="submit"
                className="text-white flex items-center justify-center p-2 ml-2 rounded-full"
              >
                <img src={SendIcon} alt="Send" />
              </button>
            </form>
          </>
        ) : (
          <RightSide />
        )}
      </div>
    </div>
  );
};

export default GroupChat;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SendIcon from "../../assets/SendIcon.svg";
import AttachedIcon from "../../assets/AttachedIcon.svg";
import RightSide from "../common/RightSide";
import { AiOutlineSearch } from "react-icons/ai";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { fetchGroupChats } from "../../api/chatApi"; // Adjust the import path
import { setGroupChats } from "../../redux/reducers/chatReducer";
import { faker } from "@faker-js/faker";

const avatar = faker.image.avatar();

const GroupChat = () => {
  const dispatch = useDispatch();
  const { groupChats } = useSelector((state) => state.chat);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMessages, setFilteredMessages] = useState([]);

  // Fetch group chats when component mounts
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("userInfo"))._id; // Adjust according to your user data structure
        const chats = await fetchGroupChats(userId);
        dispatch(setGroupChats(chats)); // Dispatch the action to set the chats in the store
      } catch (error) {
        console.error("Failed to fetch group chats:", error);
      }
    };

    fetchChats();
  }, [dispatch]);

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setMessages(group.messages); // Assume 'messages' is an array within the group object
    setFilteredMessages(group.messages); // Set filtered messages initially
  };

  const handleSearchToggle = () => {
    setSearchActive((prev) => !prev);
  };

  const handleBackClick = () => {
    setSelectedGroup(null);
    setMessages([]);
    setFilteredMessages([]); // Reset filtered messages
  };

  // Filter groups based on search query
  const filteredGroups = groupChats.filter((group) =>
    group.chatName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter messages based on search query
  useEffect(() => {
    if (selectedGroup) {
      const results = messages.filter((msg) =>
        msg.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMessages(results);
    }
  }, [searchQuery, selectedGroup, messages]);

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
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Group list */}
        <ul className="space-y-4">
          {filteredGroups.map((group) => (
            <li
              key={group._id}
              className={`cursor-pointer p-4 rounded-md shadow flex items-center ${
                selectedGroup?._id === group._id
                  ? "bg-[#E6E6E6]"
                  : "bg-[#F5F5F5]"
              }`}
              onClick={() => handleGroupClick(group)}
            >
              <div className="relative mr-4">
                <img
                  src={group.image || avatar}
                  alt={group.chatName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <span className="text-base text-secondary">{group.chatName}</span>
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
                    src={selectedGroup.image || avatar}
                    alt={selectedGroup.chatName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <span className="text-white text-xl">
                  {selectedGroup.chatName}
                </span>
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                {filteredMessages.map((msg, index) => (
                  <li
                    key={index}
                    className={`p-2 my-2 rounded-lg ${
                      index % 2 === 0
                        ? "bg-[#F1F1F1] text-black"
                        : "bg-primary text-white"
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
                // Update messages and filtered messages
                setMessages((prev) => [...prev, newMessage]);
                setFilteredMessages((prev) => [...prev, newMessage]);
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

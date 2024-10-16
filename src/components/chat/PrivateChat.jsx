import { useState } from "react";
import SendIcon from "../../assets/SendIcon.svg";
import AttachedIcon from "../../assets/AttachedIcon.svg";
import RightSide from "../common/RightSide";
// import { AiOutlineSearch } from "react-icons/ai";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { faker } from "@faker-js/faker";

// import io from "socket.io-client";

// const ENDPOINT = "http://localhost:5000/";

// var socket, selectedChatCompare;

const avatar = faker.image.avatar();

const PrivateChat = () => {
  //   useEffect(() => {
  //     socket = io(ENDPOINT);
  //   }, []);

  //   useEffect(() => {
  //     if (selectedChat) {
  //       socket.emit("joinChat", selectedChat.id);
  //     }
  //   }, [selectedChat]);

  // Sample chats data
  const initialChats = [
    {
      id: 1,
      name: "Tafeda",
      phone: "123-456-7890",
      email: "tafeda@example.com",
      image: "/path/to/tafeda.png",
      status: "online",
      messages: ["Hello Tafeda! How are you?", "I'm good, thanks!"]
    },
    {
      id: 2,
      name: "Sodfa",
      phone: "234-567-8901",
      email: "sodfa@example.com",
      image: "/path/to/sodfa.png",
      status: "offline",
      messages: ["Did you see the new update?", "Yes, it's awesome!"]
    },
    {
      id: 3,
      name: "Alice",
      phone: "345-678-9012",
      email: "alice@example.com",
      image: "/path/to/alice.png",
      status: "online",
      messages: ["Hey there!", "How's it going?"]
    },
    {
      id: 4,
      name: "Bob",
      phone: "456-789-0123",
      email: "bob@example.com",
      image: "/path/to/bob.png",
      status: "offline",
      messages: ["Good morning!", "Ready for the meeting?"]
    },
    {
      id: 5,
      name: "Charlie",
      phone: "567-890-1234",
      email: "charlie@example.com",
      image: "/path/to/charlie.png",
      status: "online",
      messages: ["Let's catch up soon!", "Miss you!"]
    }
  ];

  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchActive, _] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
    setMessages(chat.messages);
  };

  // const handleSearchToggle = () => {
  //   setSearchActive((prev) => !prev);
  // };

  const handleBackClick = () => {
    setSelectedChat(null);
    setMessages([]);
  };

  // Filter chats based on search query
  const filteredChats = initialChats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.phone.includes(searchQuery) ||
      chat.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen">
      {/* Sidebar with chat list */}
      <div
        className={`w-full lg:w-1/3 p-4 bg-base-100 lg:overflow-y-scroll overflow-y-visible ${
          selectedChat ? "hidden lg:block" : "block"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Chats</h2>
        <button className="bg-primary text-white rounded-full px-4 py-2 mb-4">
          Add User
        </button>
        <div className="form-control mb-4">
          <input
            type="text"
            placeholder="Search or start a new chat"
            className="input w-full bg-white pl-4 pr-4 text-neutral"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          />
        </div>

        {/* Chat list */}
        <ul className="space-y-4">
          {filteredChats.map((chat) => (
            <li
              key={chat.id}
              className={`cursor-pointer p-4 rounded-md shadow flex items-center ${
                selectedChat?.id === chat.id
                  ? "bg-[#E6E6E6]" // Selected chat background
                  : "bg-[#F5F5F5]" // Unselected chat background (light gray)
              }`}
              onClick={() => handleChatClick(chat)}
            >
              <div className="relative mr-4">
                <img
                  src={avatar}
                  alt={chat.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {chat.status === "online" && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-white"></span>
                )}
              </div>
              <span className="text-base text-secondary">{chat.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat area */}
      <div
        className={`flex-1 bg-white flex flex-col ${
          selectedChat ? "" : "hidden lg:block"
        }`}
      >
        {selectedChat ? (
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
                    alt={selectedChat.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {selectedChat.status === "online" && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-primary"></span>
                  )}
                </div>
                <span className="text-white text-xl">{selectedChat.name}</span>
              </div>
              <div className="flex-none">
                {/* <AiOutlineSearch
                  className="text-white w-6 h-6 cursor-pointer"
                  onClick={handleSearchToggle}
                /> */}
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
            <div className="fixed bottom-0">
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
                  className=" text-white flex items-center justify-center p-2 ml-2 rounded-full"
                >
                  <img src={SendIcon} alt="Send" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <RightSide />
        )}
      </div>
    </div>
  );
};

export default PrivateChat;

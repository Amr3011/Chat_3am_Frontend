// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchChats } from "../../redux/reducers/chatReducer"; // Import the correct thunk
// import SendIcon from "../../assets/SendIcon.svg";
// import AttachedIcon from "../../assets/AttachedIcon.svg";
// import RightSide from "../common/RightSide";
// import { IoIosArrowBack } from "react-icons/io";

// // PrivateChat Component
// const PrivateChat = () => {
//   const dispatch = useDispatch();

//   // Fetch chats from the Redux store
//   const { privateChats, loading, error } = useSelector((state) => state.chat);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [searchQuery, setSearchQuery] = useState(""); // Keep the search bar, but remove logic

//   // Fetch private chats when the component mounts
//   useEffect(() => {
//     dispatch(fetchChats()); // Dispatch the fetchChats action to load private chats
//   }, [dispatch]);

//   // Handle chat selection
//   const handleChatClick = (chat) => {
//     setSelectedChat(chat);
//   };

//   const handleBackClick = () => {
//     setSelectedChat(null);
//   };

//   if (loading) return <div>Loading chats...</div>;
//   if (error) return <div>Error loading chats: {error}</div>;

//   return (
//     <div className="flex flex-col lg:flex-row w-full h-screen">
//       {/* Sidebar with chat list */}
//       <div
//         className={`w-full lg:w-1/3 p-4 bg-base-100 lg:overflow-y-scroll overflow-y-visible ${
//           selectedChat ? "hidden lg:block" : "block"
//         }`}
//       >
//         <h2 className="text-2xl font-bold mb-4">Chats</h2>

//         {/* Search bar with no functionality */}
//         <div className="form-control mb-4">
//           <input
//             type="text"
//             placeholder="Search or start a new chat"
//             className="input w-full bg-white pl-4 pr-4 text-neutral"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)} // Input updates searchQuery but doesn't filter chats
//           />
//         </div>

//         {/* Chat list */}
//         <ul className="space-y-4">
//           {privateChats.map((chat) => (
//             <li
//               key={chat._id}
//               className={`cursor-pointer p-4 rounded-md shadow flex items-center ${
//                 selectedChat?._id === chat._id
//                   ? "bg-[#E6E6E6]" // Selected chat background
//                   : "bg-[#F5F5F5]" // Unselected chat background (light gray)
//               }`}
//               onClick={() => handleChatClick(chat)}
//             >
//               <div className="relative mr-4">
//                 {/* Optional: You can add an image here for chat participants */}
//               </div>
//               <span className="text-base text-secondary">{chat.chatName}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Chat area */}
//       <div
//         className={`flex-1 bg-white flex flex-col ${
//           selectedChat ? "" : "hidden lg:block"
//         }`}
//       >
//         {selectedChat ? (
//           <>
//             {/* Navbar with back button */}
//             <div className="navbar bg-primary w-full flex items-center">
//               <button
//                 onClick={handleBackClick}
//                 className="flex items-center text-white mr-4"
//               >
//                 <IoIosArrowBack className="w-6 h-6" />
//                 <span className="ml-2">Back</span>
//               </button>
//               <div className="flex-1 flex items-center">
//                 <div className="relative mr-2">
//                   {/* Optional: You can add an image here for the selected chat participant */}
//                 </div>
//                 <span className="text-white text-xl">
//                   {selectedChat.chatName}
//                 </span>
//               </div>
//             </div>

//             {/* Input form fixed at the bottom */}
//             <div className="fixed bottom-0 w-full">
//               <form
//                 className="bg-base-100 flex items-center p-2"
//                 onSubmit={(e) => {
//                   e.preventDefault(); // Prevent form submission
//                 }}
//               >
//                 <button type="submit" className="px-1">
//                   <img src={AttachedIcon} alt="Attach" />
//                 </button>

//                 <input
//                   id="input"
//                   type="text"
//                   placeholder="Type your message..."
//                   className="flex-grow bg-gray-100 rounded-full pl-4 pr-4 py-2 ml-2"
//                 />

//                 <button type="submit" className="px-1">
//                   <img src={SendIcon} alt="Send" />
//                 </button>
//               </form>
//             </div>
//           </>
//         ) : (
//           <RightSide />
//         )}
//       </div>
//     </div>
//   );
// };

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../../redux/reducers/chatReducer";
import { fetchMessages } from "../../redux/reducers/messageReducer";
import SendIcon from "../../assets/SendIcon.svg";
import AttachedIcon from "../../assets/AttachedIcon.svg";
import RightSide from "../../components/common/RightSide";
import { IoIosArrowBack } from "react-icons/io";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Adjust your server URL

// PrivateChat Component
const PrivateChat = () => {
  const dispatch = useDispatch();
  const { privateChats, loading, error } = useSelector((state) => state.chat);
  const { messages } = useSelector((state) => state.messages);
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");

  // Fetch private chats when the component mounts
  useEffect(() => {
    dispatch(fetchChats());

    // Listen for incoming messages
    socket.on("message received", (newMessage) => {
      // You can update the state here to display the new message
      // For example, you might want to dispatch an action to update messages
      console.log("New message received:", newMessage);
    });

    return () => {
      socket.off("message received"); // Clean up listener on unmount
    };
  }, [dispatch]);

  // Handle chat selection
  const handleChatClick = (chat) => {
    setSelectedChat(chat);
    dispatch(fetchMessages(chat._id)); // Fetch messages for the selected chat
  };

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Resets the selected chat to null, effectively navigating back to the list
   * of private chats.
   */
  /******  abc8d989-bd17-4c13-8d66-d11246abf0cb  *******/
  const handleBackClick = () => {
    setSelectedChat(null);
  };

  const handleMessageChange = (e) => {
    setMessageInput(e.target.value);
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      content: messageInput,
      contentType: "text", // Adjust if you have other content types
      chatId: selectedChat._id
    };
    socket.emit("new message", newMessage); // Emit the message via WebSocket
    setMessageInput(""); // Clear the input after sending
  };

  if (loading) return <div>Loading chats...</div>;
  if (error) return <div>Error loading chats: {error}</div>;

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen">
      {/* Sidebar with chat list */}
      <div
        className={`w-full lg:w-1/3 p-4 bg-base-100 lg:overflow-y-scroll overflow-y-visible ${
          selectedChat ? "hidden lg:block" : "block"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Chats</h2>
        <div className="form-control mb-4">
          <input
            type="text"
            placeholder="Search or start a new chat"
            className="input w-full bg-white pl-4 pr-4 text-neutral"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <ul className="space-y-4">
          {privateChats.map((chat) => (
            <li
              key={chat._id}
              className={`cursor-pointer p-4 rounded-md shadow flex items-center ${
                selectedChat?._id === chat._id ? "bg-[#E6E6E6]" : "bg-[#F5F5F5]"
              }`}
              onClick={() => handleChatClick(chat)}
            >
              <span className="text-base text-secondary">{chat.chatName}</span>
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
            <div className="navbar bg-primary w-full flex items-center">
              <button
                onClick={handleBackClick}
                className="flex items-center text-white mr-4"
              >
                <IoIosArrowBack className="w-6 h-6" />
                <span className="ml-2">Back</span>
              </button>
              <div className="flex-1 flex items-center">
                <span className="text-white text-xl">
                  {selectedChat.chatName}
                </span>
              </div>
            </div>

            <div className="flex-grow overflow-y-scroll p-4">
              {messages && messages.length > 0 ? (
                messages.map((msg) => (
                  <div key={msg._id} className="mb-2">
                    <span className="font-semibold">
                      {msg.sender.username}:{" "}
                    </span>
                    <span>{msg.content}</span>
                  </div>
                ))
              ) : (
                <div>No messages yet.</div>
              )}
            </div>

            <div className="fixed bottom-0 w-full">
              <form
                className="bg-base-100 flex items-center p-2"
                onSubmit={handleMessageSubmit}
              >
                <button type="button" className="px-1">
                  <img src={AttachedIcon} alt="Attach" />
                </button>
                <input
                  id="input"
                  type="text"
                  placeholder="Type your message..."
                  className="flex-grow bg-gray-100 rounded-full pl-4 pr-4 py-2 ml-2"
                  value={messageInput}
                  onChange={handleMessageChange}
                />
                <button type="submit" className="px-1">
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

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChats,
  fetchAvailableUsers,
} from "../../redux/reducers/chatReducer";
import SendIcon from "../../assets/SendIcon.svg";
import AttachedIcon from "../../assets/AttachedIcon.svg";
import RightSide from "../common/RightSide";
import { IoIosArrowBack } from "react-icons/io";

// PrivateChat Component
const PrivateChat = () => {
  const dispatch = useDispatch();

  // Fetch chats from the Redux store
  const { privateChats, availableUsers, loading, error } = useSelector(
    (state) => state.chat
  );
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);

  // Fetch private chats when the component mounts
  useEffect(() => {
    dispatch(fetchChats()); // Dispatch the fetchChats action to load chats
  }, [dispatch]);

  // Handle chat selection
  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  const handleBackClick = () => {
    setSelectedChat(null);
  };

  // Fetch available users for private chat when clicking "Add User"
  const handleOpenAddUserModal = () => {
    dispatch(fetchAvailableUsers());
    setAddUserModalOpen(true);
  };

  const handleCloseAddUserModal = () => {
    setAddUserModalOpen(false);
  };

  // Filter private chats based on the search query
  const filteredChats = privateChats.filter((chat) => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase(); // Convert search query to lowercase for case-insensitive search
    const userEmails = chat.usersRef.map((user) => user.email.toLowerCase());
    const userPhones = chat.usersRef.map((user) => user.phone);

    return (
      chat.chatName.toLowerCase().includes(lowerCaseSearchQuery) || // Search by chat name
      userPhones.some((phone) => phone.includes(searchQuery)) || // Search by phone if it exists
      userEmails.some((email) => email.includes(lowerCaseSearchQuery)) // Search by email if it exists
    );
  });

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
        <button
          className="bg-primary text-white rounded-full px-4 py-2 mb-4"
          onClick={handleOpenAddUserModal}
        >
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
              key={chat._id}
              className={`cursor-pointer p-4 rounded-md shadow flex items-center ${
                selectedChat?._id === chat._id
                  ? "bg-[#E6E6E6]" // Selected chat background
                  : "bg-[#F5F5F5]" // Unselected chat background (light gray)
              }`}
              onClick={() => handleChatClick(chat)}
            >
              <div className="relative mr-4">
                {/* Optional: You can add an image here for chat participants */}
              </div>
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
                  {/* Optional: You can add an image here for the selected chat participant */}
                </div>
                <span className="text-white text-xl">
                  {selectedChat.chatName}
                </span>
              </div>
            </div>

            {/* Input form fixed at the bottom */}
            <div className="fixed bottom-0 w-full">
              <form
                className="bg-base-100 flex items-center p-2"
                onSubmit={(e) => {
                  e.preventDefault(); // Prevent form submission
                }}
              >
                <button type="submit" className="px-1">
                  <img src={AttachedIcon} alt="Attach" />
                </button>

                <input
                  id="input"
                  type="text"
                  placeholder="Type your message..."
                  className="flex-grow bg-gray-100 rounded-full pl-4 pr-4 py-2 ml-2"
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

      {/* Add user modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add a User</h2>
            <button
              className="bg-gray-500 text-white rounded-full px-4 py-2 mb-4"
              onClick={handleCloseAddUserModal}
            >
              Close
            </button>
            <ul>
              {availableUsers.map((user) => (
                <li key={user._id} className="p-2">
                  {user.name} ({user.email})
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivateChat;

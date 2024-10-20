import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroupChats } from "../../redux/reducers/chatReducer"; // Use the correct thunk
import SendIcon from "../../assets/SendIcon.svg";
import AttachedIcon from "../../assets/AttachedIcon.svg";
import RightSide from "../../components/common/RightSide";
import { IoIosArrowBack } from "react-icons/io";

// GroupChat Component
const GroupChat = () => {
  const dispatch = useDispatch();
  const { groupChats, loading, error } = useSelector((state) => state.chat);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch group chats when component mounts
  useEffect(() => {
    dispatch(fetchGroupChats()); // Correct action to load group chats
  }, [dispatch]);

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
  };

  const handleBackClick = () => {
    setSelectedGroup(null);
  };

  const handleCreateGroup = () => {
    console.log("Create new group button clicked!");
  };

  if (loading) return <div>Loading groups...</div>;
  if (error) return <div>Error loading groups: {error}</div>;

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen">
      {/* Sidebar with group list */}
      <div
        className={`w-full lg:w-1/3 p-4 bg-base-100 lg:overflow-y-scroll overflow-y-visible ${
          selectedGroup ? "hidden lg:block" : "block"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Groups</h2>

        {/* Create Group Button */}
        <button
          onClick={handleCreateGroup}
          className="bg-primary text-white rounded-full px-4 py-2 mb-4"
        >
          Create Group
        </button>

        {/* Search bar */}
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
          {groupChats.map((group) => (
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
                  src={group.image || "fallback-image-url"} // Replace with actual fallback
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
                <img
                  src={selectedGroup.image || "fallback-image-url"} // Replace with actual fallback
                  alt={selectedGroup.chatName}
                  className="w-10 h-10 rounded-full object-cover mr-2"
                />
                <span className="text-white text-xl">
                  {selectedGroup.chatName}
                </span>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 w-full">
              <ul className="w-full">
                {selectedGroup.messages &&
                  selectedGroup.messages.map((msg, index) => (
                    <li
                      key={index}
                      className={`p-2 my-2 rounded-lg ${
                        index % 2 === 0
                          ? "bg-[#F1F1F1] text-black"
                          : "bg-primary text-white"
                      }`}
                    >
                      {msg.content}{" "}
                      {/* Adjust according to your message structure */}
                    </li>
                  ))}
              </ul>
            </div>

            {/* Input form fixed at the bottom */}
            <div className="fixed bottom-0 w-full">
              <form className="bg-base-100 flex items-center p-2">
                <button type="button" className="px-1">
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
    </div>
  );
};

export default GroupChat;

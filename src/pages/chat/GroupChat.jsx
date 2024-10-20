import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RightSide from "../../components/common/RightSide";
import { fetchGroupChats } from "../../redux/reducers/chatReducer";
import ChatSkelton from "../../components/chat/ChatSkelton";
import ChatBox from "../../components/chat/ChatBox";
import groupImg from "../../assets/groupChats.png";


const GroupChat = () => {
  const isDark = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();
  const { groupChats, loading } = useSelector((state) => state.chat);
  const [selectedChat, setSelectedChat] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchGroupChats());
  }, [dispatch]);

  const handleBack = () => {
    setSelectedChat(null);
  };
  
  return (
    <div className="w-full grid grid-cols-12 overflow-y-hidden h-screen">
      <div
        className={`${
          selectedChat ? "md:block hidden" : ""
        } col-span-12 md:col-span-4 p-6`}
      >
        <div className="flex justify-between my-3">
          <h1 className="capitalize text-2xl font-bold mb-4">Group chats</h1>
          <button className="btn btn-primary capitalize">Create Group</button>
        </div>
        <div className="form-control mb-4">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full bg-white pl-4 pr-4 text-neutral"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {
          <ul className="h-screen lg:overflow-y-scroll border-r-2 border-base-200 pb-52">
            {groupChats.map((chat) => (
              <li
                key={chat._id}
                className={`p-2 m-2 rounded-xl flex items-center gap-3 cursor-pointer ${
                  selectedChat && selectedChat._id === chat._id
                    ? "bg-primary"
                    : ""
                } ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
              >
                {loading ? (
                  <ChatSkelton />
                ) : (
                  <div
                    className="flex items-center gap-3 w-full"
                    onClick={() => {
                      setSelectedChat(chat);
                    }}
                  >
                    <img
                      src={chat.picture || groupImg}
                      height={0}
                      width={0}
                      className="h-12 w-12 rounded-full"
                      alt=""
                    />
                    <div className="flex flex-col">
                      <p className="capitalize">{chat.chatName}</p>
                      <p className="text-sm">
                        {chat?.latestMessage?.content || ""}
                      </p>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        }
      </div>
      <div
        className={`col-span-12 md:col-span-8 ${
          selectedChat ? "" : "hidden md:block"
        }`}
      >
        {selectedChat ? (
          <ChatBox selectedChat={selectedChat} handleBack={handleBack} />
        ) : (
          <RightSide />
        )}
      </div>
    </div>
  );
};

export default GroupChat;
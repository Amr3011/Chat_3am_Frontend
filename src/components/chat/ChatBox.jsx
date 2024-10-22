import { useEffect, useRef, useState } from "react";
import { GrDocumentUpload } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, fetchMessages } from "../../redux/reducers/messageReducer";
import Message from "./Message";
import Loading from "./../common/Loading";
import PropTypes from "prop-types";
import groupImg from "../../assets/groupChats.png";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-toastify";
import socket from "./../../utils/Socket";

const ChatBox = ({ selectedChat, handleBack }) => {
  const { userInfo } = useSelector((state) => state.user);
  const [typing, setTyping] = useState(false);
  const [whoIsTyping, setWhoIsTyping] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const { messages, loading } = useSelector((state) => state.messages);
  const { chatName, img, picture } = selectedChat;
  const messagesRef = useRef();
  const typingTimeoutRef = useRef(null); // Ref to store timeout ID
  const dispatch = useDispatch();

  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    socket.emit("joinChat", selectedChat._id);
  }, [selectedChat._id]);

  useEffect(() => {
    dispatch(fetchMessages(selectedChat._id));
  }, [dispatch, selectedChat._id]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") {
      toast.error("Message cannot be empty");
      return;
    }
    try {
      const response = await fetch(`/api/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chatId: selectedChat._id,
          content: newMessage,
          contentType: "text"
        })
      });
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      const data = await response.json();
      dispatch(addMessage(data.data));
      socket.emit("newMessage", data.data);
      setNewMessage("");
      setTyping(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleKeyDown = () => {
    socket.emit("typing", selectedChat._id, userInfo.username);
  };

  const handleKeyUp = () => {
    socket.emit("stopTyping", selectedChat._id);
  };

  const handleOnTyping = (e) => {
    setNewMessage(e.target.value);
    if (e.key === "Enter") {
      sendMessage(e);
    }
  };

  useEffect(() => {
    socket.on("typing", (username) => {
      setTyping(true);
      setWhoIsTyping(username);

      // Clear existing timeout if user is typing again
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    });

    socket.on("stopTyping", () => {
      // Set a timeout before changing the typing state
      typingTimeoutRef.current = setTimeout(() => {
        setTyping(false);
        setWhoIsTyping("");
      }, 500);
    });

    socket.on("messageReceived", (message) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.emit("leaveChat", selectedChat._id);

      // Cleanup timeout on component unmount
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [dispatch, userInfo._id, selectedChat._id]);

  return (
    <div className="relative h-screen ">
      <div className="flex justify-between items-center p-2 bg-primary px-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={picture || img || groupImg}
              alt="Chat"
              className="h-12 w-12 rounded-full"
            />
          </div>
          <p className="text text-2xl text-white">{chatName}</p>
        </div>
        <button
          className="flex gap-2 items-center text-white capitalize"
          onClick={handleBack}
        >
          <IoIosArrowBack />
          <span>back</span>
        </button>
      </div>
      <div
        className="h-full overflow-y-scroll p-4 pb-52 w-full"
        ref={messagesRef}
      >
        {loading ? (
          <Loading />
        ) : (
          <>
            {messages.map((message) => (
              <Message msg={message} key={message._id} />
            ))}
            {typing && (
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1.5">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                </div>
                <span className="text-sm text-gray-500 capitalize">
                  {whoIsTyping} is typing...
                </span>
              </div>
            )}
          </>
        )}
      </div>
      <form
        onSubmit={sendMessage}
        method="post"
        className="flex items-center gap-3 p-4 absolute bottom-0 w-full bg-base-100"
      >
        <label htmlFor="file" className="btn btn-primary">
          <input type="file" name="file" id="file" className="hidden" />
          <span>
            <GrDocumentUpload fontSize={18} />
          </span>
        </label>
        <input
          type="text"
          placeholder="Type a message"
          className="input input-bordered w-full  px-4 text-base-content"
          value={newMessage}
          onChange={handleOnTyping}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />
        <button className="btn bg-primary text-white">Send</button>
      </form>
    </div>
  );
};

ChatBox.propTypes = {
  selectedChat: PropTypes.object.isRequired,
  handleBack: PropTypes.func.isRequired
};

export default ChatBox;

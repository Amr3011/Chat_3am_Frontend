import { useEffect } from "react";
import { GrDocumentUpload } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../../redux/reducers/messageReducer";
import Message from "./Message";
import Loading from "./../common/Loading";
import PropTypes from "prop-types";
import groupImg from "../../assets/groupChats.png";
import { IoIosArrowBack } from 'react-icons/io';

const ChatBox = ({ selectedChat, handleBack }) => {
  const { messages, loading } = useSelector((state) => state.messages);
  const { chatName, img,  picture } = selectedChat;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMessages(selectedChat._id));
  }, [dispatch, selectedChat._id]);

  return (
    <div className="relative h-screen ">
      <div className="flex justify-between items-center  p-2 bg-primary px-8">
        <div className="flex items-center gap-4">
          <img src={picture|| img || groupImg} alt="" className="h-12 w-12 rounded-full" />
          <p className="text text-2xl">{chatName}</p>
        </div>
        <button className="flex gap-2 items-center text-white capitalize" onClick={handleBack}>
          <IoIosArrowBack/><span>back</span>
        </button>
      </div>
      <div className="h-full overflow-y-scroll p-4 pb-52 w-full">
        {loading ? (
          <Loading />
        ) : (
          <>
            {messages.map((message) => (
              <Message msg={message} key={message._id} />
            ))}
          </>
        )}
      </div>
      <form
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

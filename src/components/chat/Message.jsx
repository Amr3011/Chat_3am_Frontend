import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";
import defaultAvatar from "../../assets/defaultProfile.jpg";

const Message = ({ msg }) => {
  const userId = useSelector((state) => state.user.userInfo._id);
  return (
    <div
      className={`chat ${userId == msg.sender._id ? "chat-end" : "chat-start"}`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt={msg.sender.username}
            src={msg.sender.avatar ? msg.sender.avatar : defaultAvatar}
          />
        </div>
      </div>
      <div className="chat-header">
        {msg.sender.username}
        <time className="text-xs opacity-50 ml-2">
          {new Date(msg.updatedAt).toGMTString()}
        </time>
      </div>
      {msg.contentType === "text" ? (
        <div className="chat-bubble chat-bubble-primary">{msg.content}</div>
      ) : null}
      <div className="chat-footer opacity-50 capitalize"></div>
    </div>
  );
};

Message.propTypes = {
  msg: PropTypes.objectOf({
    _id: PropTypes.string.isRequired,
    sender: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
    contentType: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired
  }).isRequired
};

export default Message;

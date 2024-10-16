import chat from "../../assets/chat.svg";

export default function RightSide() {
  return (
    <div className="bg-primary w-full h-full flex items-center justify-center flex-col">
      <img src={chat} alt="Chat" />
      <p className="text-white mx-auto p-4">
        Start Chat with your Friends, Make calls, Share your Screen and get
        Faster Now..
        </p>
    </div>
  );
}

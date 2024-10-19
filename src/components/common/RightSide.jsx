import chat from "../../assets/chat.svg";
// import AmigosChatting from "../../assets/Amigos Chatting.png";

export default function RightSide() {
  return (
    <div className="bg-primary text-center light:text-base-100 flex flex-col justify-center items-center p-12 w-full md:w-[60%] lg:w-[70%] s:hidden m:hidden">
      <div className="flex justify-center">
        <img src={chat} alt="Illustration" className="mb-8" />
      </div>
      <p className="text-white mx-auto p-4">
        Start Chat with your Friends, Make calls, Share your Screen and get
        Faster Now..
      </p>
    </div>
  );
}

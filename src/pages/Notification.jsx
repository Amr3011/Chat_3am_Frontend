import AmigosChatting from "../assets/Amigos Chatting.png";

const Notification = () => {
  const notifications = [
    {
      id: 1,
      name: "Tafeda",
      time: "8 min ago",
      message: "Added your product to her favourites list",
      image: "/path/to/tafeda.png"
    },
    {
      id: 2,
      name: "Sodfa",
      time: "10 min ago",
      message: "Added your product to her favourites list",
      image: "/path/to/sodfa.png"
    },
    {
      id: 3,
      name: "Deela",
      time: "15 min ago",
      message: "Added your product to her favourites list",
      image: "/path/to/deela.png"
    },
    {
      id: 4,
      name: "Shehab",
      time: "19 min ago",
      message: "Added your product to her favourites list",
      image: "/path/to/shehab.png"
    },
    {
      id: 5,
      name: "Masa",
      time: "20 min ago",
      message: "Added your product to her favourites list",
      image: "/path/to/masa.png"
    },
    {
      id: 6,
      name: "Marwan",
      time: "28 min ago",
      message: "Added your product to her favourites list",
      image: "/path/to/marwan.png"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-base-100 text-neutral font-roboto">
      {/* Notification Section */}
      <div className="w-full lg:w-1/2 bg-neutral p-8">
        <h2 className="text-2xl font-bold mb-6 text-primary">Notification</h2>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center bg-white rounded-md p-4 shadow"
            >
              <img
                src={notification.image}
                alt={notification.name}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div className="flex-1">
                <p className="text-lg font-semibold">{notification.name}</p>
                <p className="text-sm text-accent">{notification.message}</p>
              </div>
              <span className="text-sm text-gray-500">{notification.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="md:block flex-1 bg-primary flex justify-center items-center p-12 shadow-lg">
        <div className="text-center text-base-100">
          <div className="flex justify-center">
            <img src={AmigosChatting} alt="Illustration" className="mb-8" />
          </div>
          <p className="text-xl">
            Start Chat with your Friends, Make calls, Share your Screen and get
            Faster Now...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notification;

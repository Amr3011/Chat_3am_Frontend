import { faker } from "@faker-js/faker";
//import AmigosChatting from "../assets/Amigos Chatting.png";
import RightSide from "../components/common/RightSide";

function timeDifference(toDate) {
  const now = new Date(); // Get current date and time
  const pastDate = new Date(toDate); // Parse the input date
  const diffMs = Math.abs(now - pastDate); // Get the difference in milliseconds

  // Calculate the time components
  const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor(
    (diffMs % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
  );
  const days = Math.floor(
    (diffMs % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
  );
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return {
    years,
    months,
    days,
    hours,
    minutes
  };
}

const itHaveBeen = (time) => {
  const { years, months, days, hours, minutes } = timeDifference(time);
  if (years > 0) {
    return `${years} years ago`;
  } else if (months > 0) {
    return `${months} months ago`;
  } else if (days > 0) {
    return `${days} days ago`;
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else {
    return `${minutes} minutes ago`;
  }
};

const generateNotification = () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  time: itHaveBeen(faker.date.recent()),
  message: faker.lorem.sentence(),
  image: faker.image.avatar()
});

const notifications = Array.from({ length: 15 }, generateNotification);

const Notification = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-base-100 h-screen">
      {/* Notification Section */}
      <div className="w-full lg:w-1/2 p-8 overflow-visible lg:overflow-y-scroll">
        <h2 className="text-2xl font-bold mb-6 text-base-content">
          Notification
        </h2>
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
                <p className="text-lg font-semibold text-base-300">{notification.name}</p>
                <p className="text-sm text-accent">{notification.message}</p>
              </div>
              <span className="text-sm text-gray-500">{notification.time}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden lg:flex lg:w-1/2 bg-primary justify-center items-center h-screen">
        <RightSide />
      </div>
    </div>
  );
};

export default Notification;

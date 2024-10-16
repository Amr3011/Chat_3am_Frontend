export const fetchGroupChats = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/chat/", {
      method: "GET",
      credentials: "include", // Include cookies in the request
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch group chats");
    }

    const data = await response.json();
    // Process your group chat data here
    console.log(data);
  } catch (error) {
    console.error("Error fetching group chats:", error);
  }
};

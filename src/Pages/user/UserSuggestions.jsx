import { useEffect, useState } from "react";
import UserNavigation from "../../Components/user/UserNavigation";
import BASE_URL from "../../../apiConfig";

// eslint-disable-next-line react/prop-types
const UserSuggestions = ({ Toggle }) => {
  const [userObj, setUserObj] = useState([]);
  const [messages, setMessages] = useState({}); // State to store messages for each suggestion
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsed = JSON.parse(user);
    fetchData(parsed.id);
    updateSuggestions(parsed.id);
  }, []);

  const fetchData = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}ask/suggestionsByUserID/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.data) {
        setUserObj(data.data);
        const messages = data.data.map((item) => ({
          suggestionId: item._id,
          username: item.userName,
          message: item.suggestionReply,
        }));
        setChatMessages(messages);
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const updateSuggestions = async (id) => {
    try {
      await fetch(`${BASE_URL}ask/updateAllSuggestions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ isNewReplyAdmin: false }),
      });
      console.log("Suggestions updated successfully");
    } catch (error) {
      console.error("Error updating suggestions:", error);
    }
  };

  const sendMessage = async (suggestionId, userId, userName, message) => {
    try {
      const isAdmin = userName.toLowerCase() === "admin";
      const senderName = isAdmin ? "admin" : userName;
      const response = await fetch(
        `${BASE_URL}ask/sendMessage/${suggestionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            suggestionId,
            userId,
            userName: senderName,
            message,
            isNewReplyUsers: true,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        const newMessage = {
          suggestionId,
          username: senderName,
          message: message,
          isNewReplyUser: true,
        };
        setChatMessages([...chatMessages, newMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSubmit = (event, suggestionId, userId, userName) => {
    event.preventDefault();
    sendMessage(suggestionId, userId, userName, messages[suggestionId]); // Use messages[suggestionId] to get the message
    setMessages((prevMessages) => ({
      ...prevMessages,
      [suggestionId]: "", // Clear the message for the current suggestion after sending
    }));
    window.location.reload();
  };

  const handleMessageChange = (event, suggestionId) => {
    const { value } = event.target;
    setMessages((prevMessages) => ({
      ...prevMessages,
      [suggestionId]: value,
    }));
  };

  return (
    <div className="px-3">
      <UserNavigation Toggle={Toggle} />
      <div className="container-fluid">
        <div className="row bg-white g-3 my-2 pt-1 pb-2 mt-4 fw-bolder fs-2 rounded-3 shadow-sm">
          <h3 className="text-center text-dark">Suggestions</h3>
        </div>
        <div className="row g-3 my-2">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Details</th>
                <th scope="col">Replies</th>
              </tr>
            </thead>
            <tbody>
              {userObj.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.userName}</td>
                  <td>
                    {Object.entries(item.suggestiondetails).map(
                      ([key, value]) => (
                        <p key={key}>
                          {key}: {value}
                        </p>
                      )
                    )}
                  </td>
                  <td>
                    {chatMessages
                      .filter((msg) => msg.suggestionId === item._id)
                      .map((msg, idx) => (
                        <div key={idx}>
                          {msg.message.map((messageObj, index) => (
                            <div key={index}>
                              {messageObj.userName &&
                              messageObj.userName.toLowerCase() === "admin" ? (
                                <strong>Admin: {messageObj.message}</strong>
                              ) : (
                                <strong>
                                  {messageObj.userName || "Unknown User"}:{" "}
                                  {messageObj.message}
                                </strong>
                              )}
                            </div>
                          ))}
                        </div>
                      ))}

                    <br />
                    <form
                      onSubmit={(event) =>
                        handleSubmit(
                          event,
                          item._id,
                          item.userId,
                          item.userName
                        )
                      }
                    >
                      <input
                        type="text"
                        value={messages[item._id] || ""}
                        onChange={(event) =>
                          handleMessageChange(event, item._id)
                        }
                        placeholder="Type your message"
                      />
                      <button type="submit">Send</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserSuggestions;

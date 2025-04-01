import { Link } from "react-router-dom";
import "./chatList.css";
import { useQuery } from "@tanstack/react-query";

const ChatList = ({ closeMenu }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard" onClick={closeMenu}>
        Create a new Chat
      </Link>
      <Link to="/" onClick={closeMenu}>
        Explore Lama AI
      </Link>
      <Link to="/" onClick={closeMenu}>
        Contact
      </Link>
      <hr />
      <span className="title">RECENT CHATS</span>
      <div className="list">
        {isPending
          ? "Loading..."
          : error
          ? "Something went wrong!"
          : data?.map((chat) => (
              <Link
                to={`/dashboard/chats/${chat._id}`}
                key={chat._id}
                onClick={closeMenu} // Close menu when a chat is selected
              >
                {chat.title}
              </Link>
            ))}
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo.png" alt="" />
        <div className="texts">
          <a
            href="https://www.harvitt.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "18px",
              fontWeight: "600",
              textDecoration: "none",
              color: "#ffffff",
              cursor: "pointer",
            }}
          >
            harvitt.in
          </a>
        </div>
      </div>
    </div>
  );
};

export default ChatList;

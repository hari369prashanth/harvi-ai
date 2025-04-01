import { Outlet, useNavigate } from "react-router-dom";
import "./dashboardLayout.css";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState , useRef} from "react";
import ChatList from "../../components/chatList/ChatList";

const DashboardLayout = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); // Reference to menu

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate]);

   // Close menu when clicking outside
   useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) && 
        !event.target.classList.contains("hamburger")
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (!isLoaded) return "Loading...";

  return (
    <div className="dashboardLayout">
      {/* Hamburger Button */}
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      {/* Sidebar Menu */}
      <div ref={menuRef}  className={`menu ${menuOpen ? "open" : ""}`}>
        <ChatList closeMenu={() => setMenuOpen(false)} />
      </div>

      {/* Chat Content */}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;

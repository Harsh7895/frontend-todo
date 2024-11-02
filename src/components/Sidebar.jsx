import {
  FiCodesandbox,
  FiLayout,
  FiDatabase,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";
import toast from "react-hot-toast";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://backend-todo-tan.vercel.app/api/v1/auth/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        localStorage.removeItem("token");
        toast.success("Logged out successfully");
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Error during logout:", error);
    }
  };

  return (
    <aside className="sidebar-aside">
      <div className="sidebar-top">
        <h2>
          <FiCodesandbox size={20} />
          Pro Manage
        </h2>

        <div>
          <Link
            to={"/"}
            className={location.pathname === "/" ? "active-link" : ""}
          >
            <FiLayout /> Board
          </Link>
          <Link
            to={"/analytics"}
            className={location.pathname === "/analytics" ? "active-link" : ""}
          >
            <FiDatabase /> Analytics
          </Link>
          <Link
            to={"/setting"}
            className={location.pathname === "/setting" ? "active-link" : ""}
          >
            <FiSettings /> Settings
          </Link>
        </div>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        <FiLogOut size={20} />
        Log out
      </button>
    </aside>
  );
};

export default Sidebar;

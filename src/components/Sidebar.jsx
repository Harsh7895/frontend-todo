import {
  FiCodesandbox,
  FiLayout,
  FiDatabase,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = () => {
  const location = useLocation();

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
            className={location.pathname == "/" ? "active-link" : ""}
          >
            {" "}
            <FiLayout /> Board
          </Link>
          <Link
            to={"/analytics"}
            className={location.pathname == "/analytics" ? "active-link" : ""}
          >
            {" "}
            <FiDatabase /> Analytics
          </Link>
          <Link
            to={"/setting"}
            className={location.pathname == "/setting" ? "active-link" : ""}
          >
            {" "}
            <FiSettings /> Settings
          </Link>
        </div>
      </div>

      <button className="logout-btn">
        <FiLogOut size={20} />
        Log out
      </button>
    </aside>
  );
};

export default Sidebar;

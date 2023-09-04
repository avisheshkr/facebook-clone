import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import "./topbar.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Topbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="topbar">
      <Link to="/" style={{ flex: "1.5" }}>
        <h1>office-hub</h1>
      </Link>
      <div className="search">
        <SearchIcon style={{ fontSize: "2rem" }} />
        <input type="text" placeholder="Search for friend, post or video" />
      </div>
      <ul className="menu">
        <li>
          <a href="/">homepage</a>
        </li>
        <li>
          <a href="/">Timeline</a>
        </li>
      </ul>
      <ul className="alert-icons">
        <li>
          <span>1</span>
          <PersonIcon style={{ fontSize: "3rem" }} />
        </li>
        <Link to="/messenger">
          <li>
            <span>2</span>
            <MessageIcon style={{ fontSize: "3rem" }} />
          </li>
        </Link>
        <li>
          <span>1</span>
          <NotificationsIcon style={{ fontSize: "3rem" }} />
        </li>
      </ul>
      <div className="profile-pic">
        <Link to={`/profile/${user.username}`}>
          <img src={user.profilePicture || `/assets/download.png`} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;

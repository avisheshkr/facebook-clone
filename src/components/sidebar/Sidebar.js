import "./sidebar.css";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import GroupIcon from "@mui/icons-material/Group";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import { Users } from "../../dummyData";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <a href="">
            <RssFeedIcon style={{ fontSize: "3rem" }} />
            <span>Feed</span>
          </a>
        </li>
        <li>
          <a href="">
            <ChatIcon style={{ fontSize: "3rem" }} />
            <span>Chats</span>
          </a>
        </li>
        <li>
          <a href="">
            <OndemandVideoIcon style={{ fontSize: "3rem" }} />
            <span>Videos</span>
          </a>
        </li>
        <li>
          <a href="">
            <GroupIcon style={{ fontSize: "3rem" }} />
            <span>Groups</span>
          </a>
        </li>
        <li>
          <a href="">
            <BookmarkIcon style={{ fontSize: "3rem" }} />
            <span>Bookmarks</span>
          </a>
        </li>
        <li>
          <a href="">
            <HelpOutlineIcon style={{ fontSize: "3rem" }} />
            <span>Questions</span>
          </a>
        </li>
        <li>
          <a href="">
            <WorkOutlineIcon style={{ fontSize: "3rem" }} />
            <span>Jobs</span>
          </a>
        </li>
        <li>
          <a href="">
            <EventIcon style={{ fontSize: "3rem" }} />
            <span>Events</span>
          </a>
        </li>
        <li>
          <a href="">
            <SchoolIcon style={{ fontSize: "3rem" }} />
            <span>Courses</span>
          </a>
        </li>
      </ul>
      <button>Show More</button>
      <hr />
      <div className="chat-heads">
        {Users.map((user) => {
          return (
            <div key={user.id} className="single-chat-head">
              <div>
                <img src={user.profilePicture} alt="" />
              </div>
              <span>{user.username}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;

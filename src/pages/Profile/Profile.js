import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./profile.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Feeds from "../../components/Feeds/Feeds";
import ProfileRightbar from "../../components/rightbar/ProfileRightbar";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/users?username=${username}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <div className="profile-container">
        <Sidebar />
        <div className="profile-container__profile">
          <div className="profile-container__cover">
            <img
              src={
                user.coverPicture
                  ? user.coverPicture
                  : `https://images.pexels.com/photos/628233/pexels-photo-628233.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
              }
              alt="Cover"
            />
          </div>
          <div className="profile-container__profile-pic">
            <img
              src={
                user.profilePicture
                  ? user.profilePicture
                  : `/assets/download.png`
              }
              alt="Profile"
            />
          </div>
          <h3 className="profile-container__profileName">{user.username}</h3>
          <p className="caption">{user.desc}</p>
          <div className="profile-container__info">
            <Feeds username={username} />
            {/* <ProfileRight /> */}
            <ProfileRightbar user={user} username={username} id={user._id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

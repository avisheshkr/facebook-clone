import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./profilerightbar.css";

const ProfileRightbar = ({ user, username, id }) => {
  const [friends, setFriends] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const [follow, setFollow] = useState(false);

  const followUnfollowUser = async () => {
    const userData = {
      userId: currentUser._id,
      id: id,
    };

    try {
      if (follow) {
        await axios.patch(`/users/${id}/unfollow`, userData);
        setFollow(false);
      } else {
        await axios.patch(`/users/${id}/follow`, userData);
        setFollow(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const followUser = async () => {
  //   const userData = {
  //     userId: currentUser._id,
  //     id: id,
  //   };
  //   try {
  //     await axios.patch(`/users/${id}/follow`, userData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const unfollowUser = async () => {
  //   const userData = {
  //     userId: currentUser._id,
  //     id: id,
  //   };
  //   try {
  //     await axios.patch(`/users/${id}/unfollow`, userData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    const fetchFriends = async () => {
      const res = await axios.get(`/users/friends/${user._id}`);

      setFriends(res.data);
    };

    fetchFriends();
  }, [user._id]);

  useEffect(() => {
    if (currentUser.followings.includes(user._id)) {
      setFollow(true);
    } else {
      setFollow(false);
    }
  }, [user._id, currentUser.followings]);

  return (
    <div className="profile-right">
      {currentUser.username !== username && (
        <>
          {follow ? (
            <button className="btn_unfollow" onClick={followUnfollowUser}>
              <span>Unfollow</span>
              <RemoveIcon style={{ fontSize: "2.2rem" }} />
            </button>
          ) : (
            <button className="btn_follow" onClick={followUnfollowUser}>
              <span>Follow</span>
              <AddIcon style={{ fontSize: "2.2rem" }} />
            </button>
          )}
        </>
      )}
      <h4>User information</h4>
      <div className="profile-right__user-info">
        <p>City:</p>
        <p>{user.city}</p>
      </div>
      <div className="profile-right__user-info">
        <p>From:</p>
        <p>{user.from}</p>
      </div>
      <div className="profile-right__user-info">
        <p>Relationship:</p>
        <p>
          {user.relationship === 1
            ? "Single"
            : user.relationship === 2
            ? "Married"
            : "-"}
        </p>
      </div>
      <div className="profile-right__friends">
        <h4>User friends</h4>
        <div className="profile-right__lists">
          {friends.map((friend) => {
            return (
              <Link key={friend._id} to={`/profile/${friend.username}`}>
                <div className="profile-right__list">
                  <div>
                    <img
                      src={
                        friend.profilePicture
                          ? friend.profilePicture
                          : `/assets/download.png`
                      }
                      alt=""
                    />
                  </div>
                  <p>{friend.username}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileRightbar;

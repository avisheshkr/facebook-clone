import { useEffect, useState } from "react";
import axios from "axios";
import "./conversation.css";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios.get(`/users?userId=${friendId}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation__chathead">
      <div className="conversation__chathead__image">
        {/* {user && (
          <img
            src={
              user.profilePicture ? user.profilePicture : "/assets/download.png"
            }
            alt="profile"
          />
        )}  OR below are same*/}
        <img
          src={
            user?.profilePicture ? user.profilePicture : "/assets/download.png"
          }
          alt="profile"
        />
      </div>
      {/* <h3>{user && user.username}</h3> */}
      <h3>{user?.username}</h3>
    </div>
  );
};

export default Conversation;

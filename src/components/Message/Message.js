import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import "./message.css";

const Message = ({ own, message, userId, time, scrollRef }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/users?userId=${userId}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [userId]);

  return (
    <>
      <div
        className={own ? "message__user" : "message__friend"}
        ref={scrollRef}
      >
        <div className="message__friend__image">
          <img
            src={
              user.profilePicture ? user.profilePicture : "/assets/download.png"
            }
            alt="profile"
          />
        </div>
        <div className={own ? "message__user__desc" : "message__friend__desc"}>
          <p>{message}</p>
          <span className={own ? "message__user__timeago" : null}>
            {moment(time).fromNow()}
          </span>
        </div>
      </div>
    </>
  );
};

export default Message;

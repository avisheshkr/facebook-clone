import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import "./post.css";
import { AuthContext } from "../../context/AuthContext";
// import { Users } from "../../dummyData";

const Post = ({ post }) => {
  const [user, setUser] = useState({});
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { user: currentUser } = useContext(AuthContext);
  let menuRef = useRef();

  // const user = users.filter((user) => post.userId === user.id);

  const likePosts = async () => {
    try {
      await axios.patch(`/posts/${post._id}/like`, {
        userId: currentUser._id,
      });

      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const removePosts = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { userId: currentUser._id },
      });

      alert("Post deleted");
      window.location.reload(false);
    } catch (error) {
      if (error.response.status === 403)
        alert("You cannot delete other user's posts");
      else console.log(error);
    }
  };

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  // Detect click outside of element
  useEffect(() => {
    let handler = (event) => {
      if (!menuRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="post-container">
      <div className="post-container__top-container">
        <div className="post-container__top">
          <div>
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  !user.profilePicture
                    ? "/assets/download.png"
                    : user.profilePicture
                }
                alt=""
              />
            </Link>
          </div>
          <Link to={`/profile/${user.username}`}>
            <p>{user.username}</p>
          </Link>
          <span>{format(post.createdAt)}</span>
        </div>

        <div className="post__options" ref={menuRef}>
          <span>
            <MoreVertIcon
              style={{ fontSize: "3rem", cursor: "pointer" }}
              onClick={() => setShowOptions(!showOptions)}
            />
          </span>
          {showOptions && (
            <div>
              <button>Edit post</button>
              <button onClick={removePosts}>Remove post</button>
            </div>
          )}
        </div>
      </div>
      <h3>{post.desc}</h3>
      <div className="post-container__photo">
        <img src={post.img} alt="" />
      </div>
      <div className="post-container__bottom">
        <div>
          <img
            src="/assets/like.png"
            alt=""
            onClick={
              likePosts
              // likeCount === post.like
              //   ? setLikeCount(likeCount + 1)
              //   : setLikeCount(likeCount - 1);
            }
          />
          <img src="/assets/heart.png" alt="" onClick={likePosts} />
          <span>{likeCount} people like it</span>
        </div>
        <p>{post.comment} comments</p>
      </div>
    </div>
  );
};

export default Post;

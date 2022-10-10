import "./feeds.css";
import Post from "../Post/Post";
import Share from "../Share/Share";
import { useContext, useEffect, useState } from "react";
// import { Posts } from "../../dummyData";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Feeds = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`/posts/profile/${username}`)
        : await axios.get(`/posts/timeline/${user._id}`);

      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);
  return (
    <div className="feeds">
      {(user.username === username || !username) && <Share />}
      {posts.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </div>
  );
};

export default Feeds;

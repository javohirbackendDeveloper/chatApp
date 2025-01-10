import Post from "./Post";
import Share from "./Share";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
// import { Posts } from "../DummyData";
import { AuthContext } from "../context/AuthContext";

function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("http://localhost:4000/api/posts/profile/" + username)
        : await axios.get(
            "http://localhost:4000/api/posts/timeline/" + user.userID
          );

      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user.userID]);

  return (
    <div className="feed">
      {(!username || username === user.username) && <Share />}
      {posts.map((p) => {
        return <Post key={p._id} post={p} />;
      })}
    </div>
  );
}

export default Feed;

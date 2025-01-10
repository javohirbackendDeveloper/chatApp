import {
  FavoriteBorder,
  MoreVert,
  ThumbDown,
  ThumbUp,
} from "@mui/icons-material";
import noUserImg from "/assets/noUserImg.png";
import { Users } from "../DummyData";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import Feed from "./Feed";
import Rightbar from "./Rightbar";
import { AuthContext } from "../context/AuthContext";
const PF = "http://localhost:4000/image/";

function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  console.log(post.img);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser.userID));
  }, [currentUser.userID, post.likes]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:4000/api/users?userId=${post.userId}`
      );
      setUser(res.data);
    };
    fetchData();
  }, [post.userId]);

  const handleLiked = async () => {
    try {
      await axios.put("http://localhost:4000/api/posts/" + post._id + "/like", {
        userId: currentUser.userID,
      });
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`http://localhost:5173/profile/${user.username}`}>
              <img
                src={user.profilePicture ? PF + user.profilePicture : noUserImg}
                alt="img"
              />
            </Link>
            <span className="username">{user.username}</span>
            <span className="date">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span>{post?.desc}</span>
          <img
            src={post.img ? PF + post.img.replace(/^\d+/, "") : noUserImg}
            alt="img"
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <FavoriteBorder
              className="likeIcon like"
              style={{
                backgroundColor: isLiked ? "red" : "grey",
                borderRadius: "50%",
                padding: "5px",
                color: "white",
              }}
              onClick={handleLiked}
            />

            <span>{like}</span>
          </div>
          <div className="postBottomRight">
            <span>{post.comment}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;

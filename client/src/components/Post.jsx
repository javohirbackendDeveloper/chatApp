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
const d = "http://localhost:4000/image/profile-photo.jpeg.jpg";
function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:4000/getOneUser?userId=${post.userId}`
      );
      setUser(res.data);
    };
    fetchData();
  }, [post.userId]);

  const handleLiked = () => {
    try {
      axios.put("http://localhost:4000/putLike/" + post._id, {
        userId: currentUser._id,
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
            <Link to={`/profile/${user.username}`}>
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
          <span>{post.desc}</span>
          <img src={PF + post.img.replace(/^\d+/, "")} alt="img" />
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

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Rightbar from "./Rightbar";
import Feed from "./Feed";
import profile1 from "/assets/profile1.jfif";
import post1 from "/assets/post1.jfif";
import noUserImg from "/assets/noUserImg.png";
import javaSocial from "/assets/javaSocial.jfif";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

function Profile() {
  const [user, setUser] = useState({});
  const username = useParams().username;
  const PF = "http://localhost:4000/image/";

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:4000/api/users?username=${username}`
      );
      // setUser(res.data);
      console.log(res);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Navbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture ? PF + user.coverPicture : javaSocial}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture ? PF + user.profilePicture : noUserImg}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4>{user.username}</h4>
              <span>{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

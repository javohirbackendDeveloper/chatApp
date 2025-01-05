import gift from "/assets/gift.jfif";
import advertise from "/assets/advertise.jfif";
import { Users } from "../DummyData";
import Online from "./Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import noUserImg from "/assets/noUserImg.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";
const PF = "http://localhost:4000/image/";
function Rightbar({ user }) {
  const [friend, setFriend] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser, user]);

  useEffect(() => {
    const getFriend = async () => {
      try {
        const friendList = await axios.get(
          "http://localhost:4000/getFriends/" + user.id
        );
        setFriend(friendList.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriend();
  }, []);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put("http://localhost:4000/updateUnfollow/" + user._id, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("http://localhost:4000/updateFollow/" + user._id, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (error) {
      console.log(error);
    }

    setFollowed(!followed);
  };

  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src={gift} alt="" />
          <span>
            <b>Behruz</b> and <b>3 others</b> have a birthday today{" "}
          </span>
        </div>
        <img src={advertise} alt="img" />
        <h4>Online Friends</h4>
        <ul>
          {Users.map((user) => (
            <Online key={user.id} user={user} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightBar = () => {
    return (
      <div className="rightbar">
        {user.username == currentUser.username && (
          <button onClick={handleClick} className="rightbarFollowButton">
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4>User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City : </span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From : </span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship : </span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "Empty"}
            </span>
          </div>
        </div>
        <h4>User Friends</h4>
        <div className="rigthbarFollowings">
          {friend.map((fr) => {
            <Link
              to={"http://localhost:4000/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightFollowing">
                <img
                  src={
                    fr.profilePicture ? PF + fr.profilePicture : PF + noUserImg
                  }
                  alt="img"
                />
                <span>{fr.username}</span>
              </div>
              ;
            </Link>;
          })}
        </div>
      </div>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
}

export default Rightbar;

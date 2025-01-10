import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";
import gift from "/assets/gift.jfif";
import advertise from "/assets/advertise.jfif";
import noUserImg from "/assets/noUserImg.png";
import { Users } from "../DummyData";
import Online from "./Online";

const PF = "http://localhost:4000/image/";

function Rightbar({ user }) {
  const [friend, setFriend] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings?.includes(currentUser?.userID)
  );

  useEffect(() => {
    const getFriend = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/users/${currentUser.userID}`
        );
        setFriend(res.data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };
    if (user) getFriend();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(
          `http://localhost:4000/api/users/${user._id}/unfollow`,
          {
            userId: currentUser.userID,
          }
        );
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`http://localhost:4000/api/users/${user._id}/follow`, {
          userId: currentUser.userID,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (error) {
      console.error("Error handling follow/unfollow:", error);
    }
  };

  const HomeRightBar = () => (
    <>
      <div className="birthdayContainer">
        <img src={gift} alt="Gift" />
        <span>
          <b>Behruz</b> and <b>3 others</b> have a birthday today
        </span>
      </div>
      <img src={advertise} alt="Advertise" />
      <h4>Online Friends</h4>
      <ul>
        {Users.map((user) => (
          <Online key={user.username} user={user} />
        ))}
      </ul>
    </>
  );

  const ProfileRightBar = () => (
    <div className="rightbar">
      {user.username !== currentUser.username && (
        <button onClick={handleClick} className="rightbarFollowButton">
          {followed ? "Unfollow" : "Follow"}
          {followed ? <Remove /> : <Add />}
        </button>
      )}
      <h4>User Information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City: </span>
          <span className="rightbarInfoValue">{user.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From: </span>
          <span className="rightbarInfoValue">{user.from}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship: </span>
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
      <div className="rightbarFollowings">
        {friend.map((fr) => (
          <Link
            to={`http://localhost:5173/profile/${fr.username}`}
            style={{ textDecoration: "none" }}
            key={fr._id}
          >
            <div className="rightFollowing">
              <img
                src={fr.profilePicture ? PF + fr.profilePicture : noUserImg}
                alt={fr.username}
              />
              <span>{fr.username}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
}

export default Rightbar;

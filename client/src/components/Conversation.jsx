import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noUserImg from "/assets/noUserImg.png";

function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = "http://localhost:4000/image/";

  useEffect(() => {
    console.log("Conversation Members:", conversation.members);
    console.log("Current User ID:", currentUser.userID);
    const friendId = conversation?.members?.find(
      (m) => m !== currentUser.userID
    );

    console.log(friendId);

    const getUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/users?userId=" + friendId
        );
        setUser(res.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        src={user.profilePicture ? PF + user.profilePicture : noUserImg}
        // src="/assets/post5.jfif"
        alt=""
      />
      <span>{user.username}</span>
      {/* <span>Guest</span> */}
    </div>
  );
}

export default Conversation;

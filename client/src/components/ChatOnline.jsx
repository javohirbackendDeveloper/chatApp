import axios from "axios";
import { useEffect, useState } from "react";

function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriend] = useState([]);
  const [onlineFriends, setOnlineFriend] = useState([]);
  const PF = "http://localhost:4000/image/";

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(
        "http://localhost:4000/api/users/friends/" + currentId
      );
      setFriend(res.data);
      console.log(currentId);
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriend(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/conversation/find/${currentId}/${user.userID}`
      );
      setCurrentChat(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="friend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImg">
            <img
              src={
                o?.profilePicture
                  ? PF + o.profilePicture
                  : "/assets/profile6.jfif"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>

          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}

export default ChatOnline;

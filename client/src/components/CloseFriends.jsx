import noUserImg from "/assets/noUserImg.png";

function CloseFriends({ user }) {
  return (
    <div>
      <div className="sidebarFriendsContainer">
        <img
          src={
            user.profilePicture
              ? `http://localhost:4000/image/${user.profilePicture}`
              : noUserImg
          }
          alt="profileImg"
        />
        <span>{user.username}</span>
      </div>
    </div>
  );
}

export default CloseFriends;

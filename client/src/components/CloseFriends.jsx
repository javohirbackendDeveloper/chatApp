function CloseFriends({ user }) {
  return (
    <div>
      <div className="sidebarFriendsContainer">
        <img
          src={"http://localhost:4000/image/" + user.profilePicture}
          alt="profileImg"
        />
        <span>{user.username}</span>
      </div>
    </div>
  );
}

export default CloseFriends;

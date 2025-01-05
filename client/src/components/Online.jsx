function Online({ user }) {
  return (
    <div>
      <li>
        <div className="rightBarImgContainer">
          <div className="img">
            <img
              src={"http://localhost:4000/image/" + user.profilePicture}
              alt="img"
            />
          </div>
          <span className="span"></span>
        </div>
        <span>{user.username}</span>
      </li>
    </div>
  );
}

export default Online;

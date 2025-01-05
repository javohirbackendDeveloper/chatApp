import { Chat, Notifications, Person, Search } from "@mui/icons-material";
import profile1 from "/assets/profile1.jfif";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import noUserImg from "/assets/noUserImg.png";
function Navbar() {
  const { user } = useContext(AuthContext);

  const PF = "http://localhost:4000/image/";
  return (
    <div className="navbar">
      <div className="container">
        <div className="leftSide">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="ownerName">JavaSocial</span>
          </Link>
        </div>
        <div className="centerSide">
          <Search className="searchIcon" />
          <input type="text" placeholder="Search..." className="centerInput" />
        </div>
        <div className="rightSide">
          <div className="navbarLinks">
            <span className="navbarLink">Homepage</span>
            <span className="navbarLink">Timeline</span>
          </div>
          <div className="navbarRightIcons">
            <div className="navbarIconItem">
              <Person />
              <span className="iconNotification">1</span>
            </div>
            <div className="navbarIconItem">
              <Link to="/chat">
                <Chat />
              </Link>
              <span className="iconNotification">2</span>
            </div>
            <div className="navbarIconItem">
              <Notifications />
              <span className="iconNotification">3</span>
            </div>
            <Link to={`http://localhost:5173/profile/${user.username}`}>
              <div className="navbarImg">
                <img
                  src={
                    user.profilePicture ? PF + user.profilePicture : noUserImg
                  }
                  alt=""
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

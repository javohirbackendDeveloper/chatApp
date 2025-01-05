import {
  Cancel,
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
} from "@mui/icons-material";
import profile1 from "/assets/profile1.jfif";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import noUserImg from "/assets/noUserImg.png";
import axios from "axios";
function Share() {
  const PF = "http://localhost:4000/image/";
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submithandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("file", file);
      data.append("name", fileName);
      newPost.img = fileName;
      try {
        await axios.post("http://localhost:4000/upload", data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await axios.post("http://localhost:4000/addPost", newPost);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={user.profilePicture ? PF + user.profilePicture : noUserImg}
            alt="img"
          />
          <input
            type="text"
            placeholder={"What in your mind " + user.username + " ?"}
            ref={desc}
          />
        </div>
        <div className="hr"></div>
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" />
            <Cancel className="cancel" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submithandler}>
          <label htmlFor="file" className="shareOptions">
            <div className="shareOption">
              <span>Photo/Video</span>
              <PermMedia className="icon" htmlColor="green" />
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png ,jpeg , .jpg , .jfif"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="shareOption">
              <span>Tag</span>
              <Label className="icon" htmlColor="blue" />
            </div>
            <div className="shareOption">
              <span>Location</span>
              <Room className="icon" htmlColor="red" />
            </div>
            <div className="shareOption">
              <span>Feelings</span>
              <EmojiEmotions className="icon" htmlColor="orange" />
            </div>
            <button type="submit">Share</button>
          </label>
        </form>
      </div>
    </div>
  );
}

export default Share;

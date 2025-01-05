import {
  Bookmark,
  Chat,
  Event,
  Group,
  QuestionMark,
  RssFeed,
  School,
  VideoCall,
  Work,
} from "@mui/icons-material";
import React from "react";
import profile1 from "/assets/profile1.jfif";
import { Users } from "../DummyData";
import CloseFriends from "./CloseFriends";
function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <RssFeed />
          <span>Feed</span>
        </li>
        <li>
          <Chat />
          <span>Chats</span>
        </li>
        <li>
          <VideoCall />
          <span>Videos</span>
        </li>
        <li>
          <Group />
          <span>Group</span>
        </li>
        <li>
          <Bookmark />
          <span>Bookmarks</span>
        </li>
        <li>
          <QuestionMark />
          <span>Questions</span>
        </li>
        <li>
          <Work />
          <span>Jobs</span>
        </li>
        <li>
          <Event />
          <span>Events</span>
        </li>
        <li>
          <School />
          <span>Courses</span>
        </li>
      </ul>
      <button>Show more</button>
      <div className="hr"></div>
      <div className="sidebarFriendsContainer">
        <img src={profile1} alt="profileImg" />
        <span>David Marge</span>
      </div>
      {Users.map((user) => (
        <CloseFriends user={user} key={user.id} />
      ))}
    </div>
  );
}

export default Sidebar;

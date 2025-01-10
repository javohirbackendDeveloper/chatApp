import { format } from "timeago.js";

function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img src="/assets/profile3.jfif" alt="" />
        <p>{message?.text}</p>
      </div>
      <div className="messageBottom"> {format(message?.createdAt)}</div>
    </div>
  );
}

export default Message;

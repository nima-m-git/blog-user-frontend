import { NavLink } from "react-router-dom";
import "./PostTile.scss";

const Post = ({
  post: {
    title,
    content,
    author,
    comments,
    published,
    _id,
    timeCreated,
    timeLastEdited,
  },
}) => {
  return (
    <NavLink to={`/posts/${_id}`}>
      <div className="post-tile">
        <h2 className="title">{title}</h2>
        <h3 className="author">By {author.username}</h3>
        <p className="content-short">{content.slice(0, 50)}...</p>
        <div className="secondary-bar">
          <div className="published">
            {published ? "Published" : "Unpublished"}
          </div>
          <div className="comments">Comments ({comments?.length || 0})</div>
        </div>
        <div className="dates secondary-bar">
          <div className="date">Added: {timeCreated?.slice(0, 10)}</div>
          <div className="date">
            Last Edited: {timeLastEdited?.slice(0, 10)}
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Post;

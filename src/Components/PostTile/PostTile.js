import "./PostTile.scss";

const Post = ({
  post: {
    title,
    content,
    author,
    comment,
    published,
    _id,
    timeCreated,
    timeLastEdited,
  },
}) => {
  return (
    <div className="post-tile">
      <a href="">
        <h2 className="title">{title}</h2>
      </a>
      <h3 className="author">By {author.username}</h3>
      <p className="content-short">{content.slice(0, 50)}...</p>
      <div className="secondary-bar">
        <div className="published">
          {published ? "Published" : "Unpublished"}
        </div>
        <a
          href={`${process.env.REACT_APP_BE_URL}/posts/${_id}`}
          target="blank"
          className="comments"
        >
          Comments ({comment?.length || 0})
        </a>
      </div>
      <div className="dates secondary-bar">
        <div>Added: {timeCreated?.slice(0, 10)}</div>
        <div>Last Edited: {timeLastEdited?.slice(0, 10)}</div>
      </div>
    </div>
  );
};

export default Post;

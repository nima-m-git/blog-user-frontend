import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CommentBox } from "../index";

const PostPage = ({ token, setErrors, setMessage }) => {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const getPost = () => {
    fetch(`${process.env.REACT_APP_BE_URL}/posts/${postId}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setPost(result.post);
          setIsLoaded(true);
        },
        (error) => {
          setErrors([error]);
          setIsLoaded(true);
        }
      );
  };

  useEffect(() => {
    getPost();
  }, []);

  if (!isLoaded) {
    return <div className="loading">Loading ...</div>;
  }

  return (
    <div>
      <div className="post-page">
        <h2 className="title">{post.title}</h2>
        <h3 className="author">By {post.author.username}</h3>
        <p className="content">{post.content}</p>
        <div className="dates secondary-bar">
          <div>Added: {post.timeCreated?.slice(0, 10)}</div>
          <div>Last Edited: {post.timeLastEdited?.slice(0, 10)}</div>
        </div>
        <div className="comments-footer">
          <p>Comments ({post.comment?.length || 0})</p>
          {token ? (
            <CommentBox
              refresh={getPost}
              postId={post._id}
              {...{ setMessage }}
              {...{ setErrors }}
            />
          ) : (
            <div>Signup or Login</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPage;

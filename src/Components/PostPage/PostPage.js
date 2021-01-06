import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { CommentBox } from "Components/index";
import "./PostPage.scss";

const PostPage = ({ token, setErrors, setMessage }) => {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const getPost = useCallback(() => {
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
  }, [postId, setErrors]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  if (!isLoaded) {
    return <div className="loading">Loading ...</div>;
  }

  return (
    <div>
      <div className="post-page">
        <div className="post">
          <h2 className="title">{post.title}</h2>
          <h3 className="author">By {post.author.username}</h3>
          <p className="content">{post.content}</p>
          <div className="dates secondary-bar">
            <div>Added: {post.timeCreated?.slice(0, 10)}</div>
            <div>Last Edited: {post.timeLastEdited?.slice(0, 10)}</div>
          </div>
        </div>

        <div className="comments-footer">
          <p>Comments ({post?.comments?.length || 0})</p>
          {token ? (
            <div>
              <CommentBox
                refresh={getPost}
                postId={post._id}
                {...{ setMessage }}
                {...{ setErrors }}
                {...{ token }}
              />
            </div>
          ) : (
            <div className="login-links">
              <Link className="link" to="/login">
                Login
              </Link>{" "}
              or{" "}
              <Link className="link" to="/signup">
                Signup
              </Link>{" "}
              to comment
            </div>
          )}

          <div className="commentsx">
            {post?.comments &&
              post.comments.map(
                ({ content, author: { username }, timeCreated }, i) => (
                  <div className="comment" key={i}>
                    <div className="comment-content">{content}</div>
                    <div className="secondary-bar footer">
                      <div className="author">By: {username}</div>
                      <div className="dates">Posted {timeCreated}</div>
                    </div>
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;

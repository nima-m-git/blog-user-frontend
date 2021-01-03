import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState([]);

  const getPosts = () => {
    fetch(`${process.env.REACT_APP_BE_URL}/posts/${postId}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setPost(result.post);
          setIsLoaded(true);
        },
        (error) => {
          console.log(error);
          setErrors([error]);
          setIsLoaded(true);
        }
      );
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (!isLoaded) {
    return <div className="loading">Loading ...</div>;
  }

  return (
    <div>
      {errors?.length > 0 && (
        <div className="errors">
          <h4 className="err-title">Errors: </h4>
          {errors.map((error, i) => (
            <div key={i}>- {error}</div>
          ))}
          <div className="ok-btn">
            <button onClick={() => setErrors([])}>OK</button>
          </div>
        </div>
      )}

      <div className="post-page">
        <h2 className="title">{post.title}</h2>
        <h3 className="author">By {post.author.username}</h3>
        <p className="content-short">{post.content.slice(0, 50)}...</p>
        <div className="secondary-bar">
          <div className="published">
            {post.published ? "Published" : "Unpublished"}
          </div>
          <a
            href={`${process.env.REACT_APP_BE_URL}/posts/${post._id}`}
            target="blank"
            className="comments"
          >
            Comments ({post.comment?.length || 0})
          </a>
        </div>
        <div className="dates secondary-bar">
          <div>Added: {post.timeCreated?.slice(0, 10)}</div>
          <div>Last Edited: {post.timeLastEdited?.slice(0, 10)}</div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;

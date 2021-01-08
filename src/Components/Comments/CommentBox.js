import { useState } from "react";

const CommentBox = ({ post, token, refresh, setMessage, setErrors }) => {
  const [comment, setComment] = useState("");

  const headers = {
    Authorization: `Bearer ${token}`,
    "content-type": "application/json",
  };

  const handleResult = (result) => {
    setMessage(result?.message);
    // Set error(s) in array
    setErrors(
      result?.errors
        ? result.errors.map((err) => err.msg)
        : result?.err
        ? [result.err]
        : []
    );
    refresh();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_BE_URL}/posts/${post._id}`, {
      method: "POST",
      body: JSON.stringify(comment),
      headers,
    })
      .then((res) => res.json())
      .then((result) => handleResult(result));
  };

  return (
    <form className="comment-box" onSubmit={handleSubmit}>
      <label>
        Reply:
        <textarea
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
      </label>
      <button>Submit</button>
    </form>
  );
};

export default CommentBox;

import { useState } from "react";

const CommentBox = ({ postId, token, refresh, setMessage, setErrors }) => {
  const [comment, setComment] = useState("");

  const headers = {
    Authorization: `Bearer ${token}`,
    "content-type": "application/json",
  };

  const handleResult = (result) => {
    setMessage(result?.message);
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

    fetch(`${process.env.REACT_APP_BE_URL}/posts/${postId}`, {
      method: "POST",
      body: JSON.stringify({ content: comment }),
      headers,
    })
      .then((res) => res.json())
      .then((result) => handleResult(result));

    setComment("");
  };

  return (
    <form className="comment-box" onSubmit={handleSubmit}>
      <label>
        Reply:
        <textarea
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          rows={5}
          cols={40}
          maxLength={300}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentBox;

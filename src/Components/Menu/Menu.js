import { useEffect, useState } from "react";

import { PostTile, FilterBar } from "../index";
import "./Menu.scss";

const Menu = ({ token, username }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState(null);

  const headers = {
    Authorization: `Bearer ${token}`,
    "content-type": "application/json",
  };

  const getPosts = () => {
    fetch(`${process.env.REACT_APP_BE_URL}/posts`)
      .then((res) => res.json())
      .then(
        (result) => {
          setPosts(result.posts);
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
    return <div className="loading">Loading...</div>;
  } else {
    return (
      <div className="container">
        <div className="message-container">
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
          {message?.length > 0 && (
            <div className="message">
              {message}
              <div className="ok-btn">
                <button onClick={() => setMessage(null)}>OK</button>
              </div>
            </div>
          )}
        </div>

        <div className="head-bar">
          <button className="new-btn">New Post</button>
          <FilterBar
            {...{ setFilteredPosts }}
            {...{ posts }}
            {...{ username }}
          />
        </div>

        <div className="posts-container">
          {filteredPosts.map((post) => (
            <PostTile
              {...{ post }}
              {...{ headers }}
              {...{ getPosts }}
              key={post._id}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default Menu;

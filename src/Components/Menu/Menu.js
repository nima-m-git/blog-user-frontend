import { useCallback, useEffect, useState } from "react";

import { PostTile, FilterBar } from "../index";
import "./Menu.scss";

const Menu = ({ token, setErrors }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [isLoaded, setIsLoaded] = useState(false);

  const headers = {
    Authorization: `Bearer ${token}`,
    "content-type": "application/json",
  };

  const getPosts = useCallback(() => {
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
  }, [setErrors]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (!isLoaded) {
    return <div className="loading">Loading...</div>;
  } else {
    return (
      <div className="container">
        <div className="head-bar">
          <button className="new-btn">New Post</button>
          <FilterBar {...{ setFilteredPosts }} {...{ posts }} />
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

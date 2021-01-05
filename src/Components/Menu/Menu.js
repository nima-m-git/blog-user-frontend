import { useCallback, useEffect, useState } from "react";

import { PostTile, FilterBar } from "../index";
import "./Menu.scss";

const Menu = ({ token, setErrors }) => {
  const [posts, setPosts] = useState([]);
  const [sortedPosts, setSortedPosts] = useState(posts);
  const [isLoaded, setIsLoaded] = useState(false);

  const setFilter = useCallback(
    (choice, order) => {
      let filtered = [...posts];

      switch (choice) {
        case "timeCreated" || "timeLastEdited":
          filtered = filtered.sort((a, b) => (a[choice] > b[choice] ? 1 : -1));
          break;
        case "comments":
          filtered = filtered.sort((a, b) =>
            a[choice].length > b[choice].length ? 1 : -1
          );
          break;
        default:
          break;
      }

      if (order === "Descending") {
        filtered = filtered.reverse();
      }

      setSortedPosts(filtered);
    },
    [posts]
  );

  const headers = {
    Authorization: `Bearer ${token}`,
    "content-type": "application/json",
  };

  const getPosts = useCallback(() => {
    fetch(`${process.env.REACT_APP_BE_URL}/posts`)
      .then((res) => res.json())
      .then(
        (result) => {
          setPosts(result.posts.filter((post) => post.published));
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
          <FilterBar {...{ setFilter }} {...{ posts }} />
        </div>

        <div className="posts-container">
          {sortedPosts.map((post, i) => (
            <PostTile
              {...{ post }}
              {...{ headers }}
              {...{ getPosts }}
              key={post._id + i}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default Menu;

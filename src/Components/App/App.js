import { Link, Route, Switch } from "react-router-dom";

import "./App.scss";
import { Menu } from "../index";
import PostPage from "../PostPage/PostPage";

function App() {
  return (
    <div>
      <Link to="/">
        <header>
          <h1>Blog Home</h1>
        </header>
      </Link>
      <Switch>
        <Route path="/" exact>
          <Menu />
        </Route>
        <Route path="/posts/:postId">
          <PostPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

import { Route, Switch } from "react-router-dom";
import { useState } from "react";

import "./App.scss";
import { Menu, Login, Signup, LoginBar } from "../index";
import PostPage from "Components/PostPage/PostPage";

function App() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState(null);

  return (
    <div className="app">
      <LoginBar {...{ token }} {...{ setToken }} />

      <div className="container">
        {/* Routes */}
        <Switch>
          <Route path="/" exact>
            <Menu {...{ setErrors }} />
          </Route>
          <Route path="/posts/:postId">
            <PostPage
              {...{ token }}
              {...{ setErrors }}
              {...{ setMessage }}
              {...{ username }}
            />
          </Route>
          <Route path="/login">
            <Login {...{ setToken }} {...{ setUsername }} />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>

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
      </div>
    </div>
  );
}

export default App;

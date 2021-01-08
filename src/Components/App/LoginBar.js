import { Link } from "react-router-dom";

import "./LoginBar.scss";

const LoginBar = ({ token, setToken }) => (
  <header className="header">
    <Link to="/">
      <header>
        <h1>Blog</h1>
      </header>
    </Link>
    <nav className="login-bar">
      {token ? (
        <div className="login-links">
          <div className="link" onClick={() => setToken(null)}>
            Logout
          </div>
        </div>
      ) : (
        <div className="login-links">
          <a
            href={process.env.REACT_APP_ADMIN_URL}
            className="link"
            target="_blank"
            rel="noreferrer"
          >
            Admin
          </a>
          <Link className="link" to="/login">
            Login
          </Link>
          <Link className="link" to="/signup">
            Signup
          </Link>
        </div>
      )}
    </nav>
  </header>
);

export default LoginBar;

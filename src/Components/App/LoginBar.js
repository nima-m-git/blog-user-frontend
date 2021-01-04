import { Link } from "react-router-dom";

import "./LoginBar.scss";

const LoginBar = ({ token, setToken }) => (
  <nav className="login-bar">
    {token ? (
      <div className="login-links">
        <div className="link" onClick={() => setToken(null)}>
          Logout
        </div>
      </div>
    ) : (
      <div className="login-links">
        <Link className="link" to="/login">
          Login
        </Link>
        <Link className="link" to="/signup">
          Signup
        </Link>
      </div>
    )}
  </nav>
);

export default LoginBar;

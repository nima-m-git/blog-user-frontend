import { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState(null);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const history = useHistory();

  const handleChange = (e) => {
    setInputs((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(process.env.REACT_APP_BE_URL + "/users/signup", {
      method: "POST",
      body: JSON.stringify(inputs),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setMessage(result?.message);

        if (result?.errors) {
          setErrors([...result?.errors]);
        } else {
          setErrors([]);
          setTimeout(() => history.push("/login"), 2000);
        }
      });
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Signup</h2>
      {errors.map((error, i) => (
        <div className="error" key={i}>
          - {error.msg}
        </div>
      ))}
      {message && <div className="message">{message}</div>}
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={inputs.username}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
        />
      </label>
      <label>
        Confirm Password:
        <input
          type="password"
          name="confirmPassword"
          value={inputs.confirmPassword}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Signup;

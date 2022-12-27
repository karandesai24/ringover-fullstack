import { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";

import { toast } from "react-toastify";
const Login = () => {
  const [formInput, setFormInput] = useState({});
  const navigate = useNavigate();
  const { isFetching, error, loginRequest } = useContext(AuthContext);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formInput.email || !formInput.password) return;
    await loginRequest(formInput);

    navigate("/");
  };

  return (
    <>
      <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formInput.email || ""}
            onChange={handleChange}
            placeholder="Enter Email Address"
            required
          />

          <label className="label-2" for="Password">
            Password
          </label>
          <input
            className="input-2"
            type="password"
            id="password"
            name="password"
            value={formInput.password || ""}
            onChange={handleChange}
            placeholder="Enter Password"
            required
          />

          <button type="submit" className="login-cta" disabled={isFetching}>
            Login
          </button>

          <p className="registers">
            Don't have an account ? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;

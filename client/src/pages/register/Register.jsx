import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";
import "./register.scss";

const Register = () => {
  const [formInput, setFormInput] = useState({});
  const navigate = useNavigate();
  const { isFetching, registerRequest } = useContext(AuthContext);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formInput.username || !formInput.email || !formInput.password) return;
    await registerRequest(formInput);
    navigate("/");
  };

  return (
    <div className="login-box">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label for="username">UserName</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formInput.username || ""}
          onChange={handleChange}
          placeholder="Enter Name"
          className="input"
          required
        />

        <label className="label-2" for="username">
          Email
        </label>
        <input
          className="input-2"
          type="email"
          id="email"
          name="email"
          value={formInput.email || ""}
          onChange={handleChange}
          placeholder="Enter Email Address"
          required
        />

        <label className="label-3" for="Password">
          Password
        </label>
        <input
          className="input-3"
          type="password"
          id="password"
          name="password"
          value={formInput.password || ""}
          onChange={handleChange}
          placeholder="Enter Password"
          required
        />

        <button type="submit" className="login-cta" disabled={isFetching}>
          Register
        </button>
        <p className="registers">
          Already have an account ?<Link to="/login"> Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

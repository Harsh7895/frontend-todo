import "../styles/login.css";
import { MdOutlineMailOutline, MdLockOutline } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const backend_Uri = "http://localhost:3000/api/v1/auth/login";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(backend_Uri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Login successful!");
        localStorage.setItem("token", result.token);
        navigate("/");
      } else {
        toast.error(`Error: ${result.message}`);
      }
    } catch (error) {
      toast.error(
        "An error occurred while logging in. Please try again",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <div className="astronaut-image"></div>
        <h1>Welcome aboard my friend</h1>
        <p>Just a couple of clicks and we start</p>
      </div>
      <div className="right-section">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <MdOutlineMailOutline size={25} />
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="input-group">
            <MdLockOutline size={25} />
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
          <p className="register-text">Have no account yet?</p>
          <button
            className="register-button"
            type="button"
            disabled={loading}
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

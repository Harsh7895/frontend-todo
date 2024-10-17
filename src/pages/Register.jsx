import "../styles/login.css";
import { MdOutlineMailOutline, MdLockOutline } from "react-icons/md";
import { RxPerson } from "react-icons/rx";
import { useState } from "react";
import toast from "react-hot-toast";

const backend_Uri =
  "https://todo-backend-ruddy-zeta.vercel.app/api/v1/auth/register";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(backend_Uri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Registration successful!");
      } else {
        toast.error(`Error: ${result.message}`);
      }
    } catch (error) {
      toast.error(
        "An error occurred while registering. Please try again.",
        error
      );
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <div className="astronaut-image"></div>
        <h1>Welcome aboard my friend</h1>
        <p>just a couple of clicks and we start</p>
      </div>
      <div className="right-section">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <RxPerson size={25} />
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <MdOutlineMailOutline size={25} />
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
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
            />
          </div>
          <div className="input-group">
            <MdLockOutline size={25} />
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Register
          </button>
          <p className="register-text">Have an account?</p>
          <button className="register-button" type="button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

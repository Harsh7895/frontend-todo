import "../styles/login.css";
import { MdOutlineMailOutline, MdLockOutline } from "react-icons/md";

const Login = () => {
  return (
    <div className="login-container">
      <div className="left-section">
        <div className="astronaut-image"></div>
        <h1>Welcome aboard my friend</h1>
        <p>just a couple of clicks and we start</p>
      </div>
      <div className="right-section">
        <h2>Login</h2>
        <form>
          <div className="input-group">
            <MdOutlineMailOutline size={25} />
            <input type="email" id="email" placeholder="Email" required />
          </div>
          <div className="input-group">
            <MdLockOutline size={25} />
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Log in
          </button>
          <p className="register-text">Have no account yet?</p>
          <button className="register-button" type="button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

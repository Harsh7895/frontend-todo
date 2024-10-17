import "../styles/login.css";
import { MdOutlineMailOutline, MdLockOutline } from "react-icons/md";
import { RxPerson } from "react-icons/rx";

const Register = () => {
  return (
    <div className="login-container">
      <div className="left-section">
        <div className="astronaut-image"></div>
        <h1>Welcome aboard my friend</h1>
        <p>just a couple of clicks and we start</p>
      </div>
      <div className="right-section">
        <h2>Register</h2>
        <form>
          <div className="input-group">
            <RxPerson size={25} />
            <input type="name" id="name" placeholder="Name" required />
          </div>
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
          <div className="input-group">
            <MdLockOutline size={25} />
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm Password"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Register
          </button>
          <p className="register-text">Have an account ?</p>
          <button className="register-button" type="button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

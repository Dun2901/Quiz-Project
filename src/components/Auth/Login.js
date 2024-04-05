import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.scss";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async () => {
    // validate
    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      toast.error("Invalid Email");
      return;
    }
    if (!password) {
      toast.error("Invalid Password");
      return;
    }

    //submit  apis
    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/");
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have an account yet?</span>
        <button className="btn btn-light" onClick={() => navigate("/register")}>
          Sign up
        </button>
      </div>
      <div className="title col-4 mx-auto">Log In</div>
      <div className="welcome col-4 mx-auto">Hello, who's this</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <span className="forgot-password">Forgot password?</span>
        <div>
          <button className="btn-submit" onClick={() => handleLogin()}>
            Login
          </button>
        </div>
        <div className="back" onClick={() => navigate("/")}>
          <FaArrowLeft />
          <span>Go to Homepage</span>
        </div>
      </div>
    </div>
  );
};

export default Login;

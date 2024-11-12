import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.scss";
import { postRegister } from "../../services/apiService";
import Language from "../Header/Language";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleShowHidePassword = () => {
    if (type === "password") {
      setType("text");
      setIcon(eye);
    } else {
      setType("password");
      setIcon(eyeOff);
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleRegister = async () => {
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

    // submit apis
    const data = await postRegister(email, password, username);
    console.log("check data: ", data);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <div className="register-container">
      <div className="header">
        <span> Already have an account?</span>
        <button className="btn btn-light" onClick={() => navigate("/login")}>
          Log in
        </button>
        <Language />
      </div>
      <div className="title col-4 mx-auto">Sign Up</div>
      <div className="welcome col-4 mx-auto">Start your journey?</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email (*)</label>
          <input
            type={"email"}
            className="form-control"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type={"text"}
            className="form-control"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group pass-group">
          <label>Password (*)</label>
          <input
            type={type}
            className="form-control"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <span className="icons-eye" onClick={() => handleShowHidePassword()}>
            <Icon icon={icon} />
          </span>
        </div>
        <div>
          <button className="btn-submit" onClick={() => handleRegister()}>
            Create my free account
          </button>
        </div>
        <div>
          <span
            className="back"
            onClick={() => {
              navigate("/");
            }}
          >
            <FaArrowLeft /> Go to Homepage
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;

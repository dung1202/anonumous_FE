import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { signUp } from "./Axios";
import "./Register.css";

export default function Register() {
  let history = useNavigate();

  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const changeusername = (e) => setusername(e.target.value);
  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);
  const changeRepeatPassword = (e) => setRepeatPassword(e.target.value);
  const togglePasswordVisibility = () =>
    setPasswordShown(!passwordShown ? true : false);

  const redirectSignIn = () => history("/");

  const handleSubmit = (e) => {
    e.preventDefault();
    setusername(username.replace(/\s+/g, ""));
    const newAccount = { username, email, password };
    checkInput() &&
      signUp(newAccount).then((res) => {
        if (res.data.message !== "Register successfully!") {
          setAlertMessage(res.data.message);
        } else if (res.data.message === "Register successfully!") {
          localStorage.setItem("accessToken", res.data.accessToken);
            redirectSignIn();
        }
      });
  };

  const checkInput = () => {
    if (!checkusername()) {
      setAlertMessage("Your username should be 8-30 characters.");
      return false;
    }
    if (!checkEmail()) {
      setAlertMessage("Your email should be at most 30 characters.");
      return false;
    }
    if (!checkPassword()) {
      setAlertMessage("Your password should be 8-30 characters.");
      return false;
    }
    if (!checkRepeatPassword()) {
      setAlertMessage("Passwords are not the same as repeat passwords");
      return false;
    }
    return true;
  };

  const checkusername = () => username.length >= 8 && username.length <= 30;
  const checkEmail = () => email.length <= 30;
  const checkPassword = () => password.length >= 8 && password.length <= 30;
  const checkRepeatPassword = () =>
    repeatPassword.localeCompare(password) === 0;

  return (
    <div className="signup-container">
      <form
        className="signup-form flexColumn"
        onSubmit={handleSubmit}
        spellCheck="false"
        autoComplete="off"
      >
        <h2 id="signup-title">SIGN UP</h2>
        <label>
          <input
            className="signup-input"
            name="username"
            type="text"
            value={username}
            placeholder="Your username"
            onChange={changeusername}
            required
          />
        </label>

        <label>
          <input
            className="signup-input"
            name="email"
            type="email"
            value={email}
            placeholder="Your Email"
            onChange={changeEmail}
            required
          />
        </label>

        <label className="signup-password">
          <input
            className="signup-input"
            name="password"
            type={passwordShown ? "text" : "password"}
            value={password}
            placeholder="Password"
            onChange={changePassword}
            required
          />
          <FontAwesomeIcon
            className="fa-icons"
            icon={faEye}
            onClick={togglePasswordVisibility}
          />
        </label>

        <label className="signup-password">
          <input
            className="signup-input"
            name="repeatPassword"
            type={passwordShown ? "text" : "password"}
            value={repeatPassword}
            placeholder="Repeat your password"
            onChange={changeRepeatPassword}
            required
          />
          <FontAwesomeIcon
            className="fa-icons"
            icon={faEye}
            onClick={togglePasswordVisibility}
          />
        </label>
        <div className="signup-alert">{alertMessage}</div>
        <label>
          <input
            className="signup-agreement"
            name="termAgreement"
            type="checkbox"
            required
          />
          &nbsp; I agree all statements in &nbsp;
          <a
            href="https://github.com/dung1202/anonumous_FE"
            target="_blank"
            rel="noreferrer"
          >
            Terms of service
          </a>
        </label>

        <input className="signup-submit" type="submit" value="SIGN UP" />

        <div className="signup-redirect">
          Have already an account ?
          <button id="redirect-signin" onClick={redirectSignIn}>
            Home
          </button>
        </div>
      </form>
    </div>
  );
}

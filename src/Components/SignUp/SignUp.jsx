import React, { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import APIKEY from "../../APIKEY";
import { useHistory } from "react-router-dom";
const SignUp = () => {
  const history = useHistory();
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirm: "",
  });
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  // async function to send request to signup
  async function SignupRequest() {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: input.email,
            password: input.password,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log(error);

        throw new Error("Failed to Signup");
      }

      const result = await response.json();
      console.log(result);
      history.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  }
  const submitHandler = (event) => {
    event.preventDefault();
    SignupRequest();
  };
  return (
    <form onSubmit={submitHandler} className="signup">
      <div className="signup__input">
        <div className="signup__email">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={input.email}
            name="email"
            onChange={changeHandler}
          />
        </div>
        <div className="signup__password">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            value={input.password}
            name="password"
            onChange={changeHandler}
          />
        </div>
        <div className="signup__confirm">
          <label htmlFor="confirm">confirm</label>
          <input
            type="text"
            id="confirm"
            value={input.confirm}
            name="confirm"
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className="signup__button">
        <button type="submit">Signup</button>
      </div>
      <p>
        Already have Account then
        <Link to="/login">Login</Link>
      </p>
    </form>
  );
};

export default SignUp;

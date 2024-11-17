import React, { useContext, useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import APIKEY from "../../APIKEY";
import { authContext } from "../../context/authContext";
const Login = () => {
  const authctx = useContext(authContext);
  const [input, setInput] = useState({
    email: "",
    password: "",
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

  // function to send api requst when form submited
  async function LoginRequest() {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`,
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
        throw new Error(response.statusText);
      }
      const result = await response.json();
      localStorage.setItem("token", result.idToken);
      authctx.login(result.idToken);
    } catch (error) {
      console.log(error.message);
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();
    LoginRequest();
  };

  return (
    <form onSubmit={submitHandler} className="login">
      <div className="login__inputs">
        <div className="login__Email">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={input.email}
            name="email"
            onChange={changeHandler}
          />
        </div>
        <div className="login__Password">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            value={input.password}
            name="password"
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className="login__button">
        <button type="submit">Login</button>
      </div>
      <p>
        Sign up
        <Link to="/signup">here</Link>
      </p>
    </form>
  );
};

export default Login;

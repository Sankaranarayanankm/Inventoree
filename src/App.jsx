import React, { useContext, useEffect } from "react";
import "./App.css";
import ProductList from "./Components/ProductsList/ProductList";
import Header from "./Components/Header/Header";
import Modal from "./Modal/Modal";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import { Switch, Route } from "react-router-dom";
import { authContext } from "./context/authContext";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { productContext } from "./context/productContext";

const App = () => {
  const authctx = useContext(authContext);
  const { token, login } = authctx;

  const productctx = useContext(productContext);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) login(storedToken);
  }, []);

  useEffect(() => {
    const userCart = `user${token}`;
    const userProducts = JSON.parse(localStorage.getItem(userCart)) || [];
    for (let val of userProducts) {
      productctx.addToCart(val);
    }
  }, [token]);

  return (
    <div className="app">
      <Switch>
        {!token && (
          <Route exact path="/signup">
            <SignUp />
          </Route>
        )}
        {!token && (
          <Route exact path="/login">
            <Login />
          </Route>
        )}
        {token && (
          <Route exact path="/">
            <Header />
            <ProductList />
          </Route>
        )}
        <Route path="*">
          {token && <Redirect to="/" />}
          {!token && <Redirect to="/signup" />}
        </Route>
      </Switch>
    </div>
  );
};

export default App;

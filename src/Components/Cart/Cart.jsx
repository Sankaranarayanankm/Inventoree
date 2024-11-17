import React, { useContext, useEffect } from "react";
import "./Cart.css";
import { productContext } from "../../context/productContext";
import Product from "../Product/Product";
import { authContext } from "../../context/authContext";
const Cart = ({ closeCartHandler }) => {
  const productctx = useContext(productContext);
  const { cartItems, orderItems } = productctx;
  const { token } = useContext(authContext);
  function oderItemsHandler() {
    if (token) {
      const userCart = `user${token}`;
      localStorage.removeItem(userCart);
      orderItems();
    }
  }
  console.log(orderItems);
  

  return (
    <div className="cart">
      <div className="cart__header">
        <h1>Cart Items</h1>
      </div>
      <div className="cart__items">
        <ul>
          {cartItems &&
            cartItems.map((item) => <Product key={item.id} {...item} />)}
        </ul>
      </div>
      <div className="cart__button">
        <button onClick={oderItemsHandler}>Place Order</button>
        <button onClick={closeCartHandler}>Close</button>
      </div>
    </div>
  );
};

export default Cart;

import React, { useContext, useEffect } from "react";
import "./Product.css";
import { modalContext } from "../../context/modalContext";
import { productContext } from "../../context/productContext";
import { authContext } from "../../context/authContext";

const Product = (props) => {
  const modalctx = useContext(modalContext);
  const productctx = useContext(productContext);
  const { showButton } = modalctx;
  const authctx = useContext(authContext);
  const { token } = authctx;

  const addToCartHandler = () => {
    const userCart = `user${token}`;
    let userProduct = JSON.parse(localStorage.getItem(userCart)) || [];
    userProduct = [...userProduct, props];
    localStorage.setItem(userCart, JSON.stringify(userProduct));
    productctx.addToCart(props);
  };

  return (
    <div className="product">
      <div className="product__image">
        <img
          src={props.thumbnail || props.images[0]}
          alt={props.title}
          width="160px"
          height="200px"
        />
      </div>
      <div className="product__specification">
        <h3>{props.title}</h3>
        <p>{props.category}</p>
        <p>price: ${props.price}</p>
        <p>stock: {props.stock}</p>
        <p>rating: {props.rating}</p>
        {!showButton && <p>quantity:{props.quantity}</p>}
      </div>
      <div className="product__button">
        {showButton && (
          <button type="button" onClick={addToCartHandler}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;

import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import { productContext } from "../../context/productContext";
import Modal from "../../Modal/Modal";
import Cart from "../Cart/Cart";
import { modalContext } from "../../context/modalContext";
import { authContext } from "../../context/authContext";
const Header = () => {
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("");
  const productctx = useContext(productContext);
  const modalctx = useContext(modalContext);
  const authctx = useContext(authContext);
  const { logout } = authctx;

  const {
    show,
    showHandler,
    hideHandler,
    showButtonHandler,
    hideButtonHandler,
  } = modalctx;

  const closeCartHandler = () => {
    showButtonHandler();
    hideHandler();
  };

  const showCartHandler = () => {
    showHandler();
    hideButtonHandler();
  };
  const logoutHandler = () => {
    logout();
    localStorage.removeItem("token");
  };

  const productCategory = Array.from(
    new Set(productctx.products.map((item) => item.category))
  );

  useEffect(() => {
    productctx.filterProducts(select);
  }, [select]);

  return (
    <div className="header">
      <div className="header__left">
        <div className="header__title">
          <h1>Inventoree</h1>
        </div>
      </div>
      <div className="header__middle">
        <div className="header__search">
          <input
            type="text"
            placeholder="Searc Product here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="header__right">
        <div className="header__filter">
          <select onChange={(e) => setSelect(e.target.value)}>
            <option value="">Search Products here</option>
            {productCategory.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="header__button" onClose={hideHandler}>
          <button onClick={showCartHandler}>Cart</button>
          <button onClick={logoutHandler}>Logout</button>
        </div>
        {show && (
          <Modal onClose={closeCartHandler}>
            <Cart closeCartHandler={closeCartHandler} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Header;

import React, { useContext, useEffect, useState } from "react";
import "./ProductList.css";
import Product from "../Product/Product";
import { productContext } from "../../context/productContext";
import useFetch from "../../hooks/useFetch";

const ProductList = () => {
  const productctx = useContext(productContext);
  const { filtered, addProducts } = productctx;
  const { error, loading, data } = useFetch(
    "https://dummyjson.com/products?limit=194"
  );

  if (error) {
    return <p>{error}</p>;
  }

  useEffect(() => {
    if (data && data.products) {
      addProducts(data.products);
    }
  }, [data]);
  return (
    <div className="productList">
      {loading && <h4>Loading please wait!...</h4>}
      <div className="productList__data">
        <ul>
          {filtered &&
            filtered.length > 0 &&
            filtered.map((item) => <Product key={item.id} {...item} />)}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;

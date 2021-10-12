import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Product.css";

const Product = (props) => {
    // console.log(props);
    const { name, img, price, seller, stock } = props.product;
    const cardIcon = <FontAwesomeIcon icon={faShoppingCart} />;
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h2 className="product-name">Name : {name}</h2>
                <p>
                    <small>by : {seller}</small>
                </p>
                <h4>Price : ${price}</h4>
                <p>only {stock} left in stock - order soon</p>
              
                <br />
                <button
                    onClick={() => props.hendleAddToCart(props.product)}
                    className="btn-regular"
                >
                    {cardIcon} add to cart
                </button>
            </div>
        </div>
    );
};

export default Product;

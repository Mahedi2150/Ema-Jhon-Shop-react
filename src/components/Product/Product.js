import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Product.css";
import Rating from "react-rating";
const Product = (props) => {
    // console.log(props);
    const { name, img, price, seller, stock,star } = props.product;
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
                <Rating
                      initialRating={star}
                    emptySymbol="far fa-star icon-color"
                    fullSymbol="fas fa-star icon-color"
                    readonly
                ></Rating>
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

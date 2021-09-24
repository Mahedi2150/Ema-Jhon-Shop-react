
import React, { useEffect, useState } from "react";
import { addToDb, getStoredCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
const Shop = () => {
  const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [displayProduct, setDisplayProduct] = useState([])
  useEffect(() => {
    fetch("./products.JSON")
      .then((res) => res.json())
        .then((data) => {
            setProducts(data);
            setDisplayProduct(data);
        });
  
      
  }, []);

  useEffect(() => {
    if (products.length) {
      const savedCart = getStoredCart();
      const storedCard = [];
      for (const key in savedCart) {
        const addedProduct = products.find((product) => product.key === key);
        if (addedProduct) {
          const quantity = savedCart[key];
          addedProduct.quantity = quantity;
          storedCard.push(addedProduct);
        }
      }
      setCart(storedCard);
    }
  }, [products]);
  const hendleAddToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    // save to localStorage
    addToDb(product.key);
    };
    const hendleSearch = event => {
        const searchText = event.target.value;
        const matchProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
        setDisplayProduct(matchProducts)
        console.log(matchProducts.length);
    }
  return (
    <>
      <div className="search-container">
              <input type="text"
              onChange={ hendleSearch}
                placeholder="Search Product" />
      </div>
      <div className="shop-container">
        <div className="product-container">
          {displayProduct.map((product) => (
            <Product
              key={product.key}
              product={product}
              hendleAddToCart={hendleAddToCart}
            ></Product>
          ))}
        </div>
        <div className="card-container">
          <Cart cart={cart}></Cart>
        </div>
      </div>
    </>
  );
};

export default Shop;

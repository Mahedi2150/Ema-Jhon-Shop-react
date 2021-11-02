
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { addToDb, getStoredCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [pageCount, setPageCount] = useState(0)
  const [page, setPage] = useState(0)
  const [displayProduct, setDisplayProduct] = useState([])
  const size = 10
  useEffect(() => {
    fetch(`http://localhost:5000/products?page=${page}&&size=${size}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setDisplayProduct(data.products);
        const count = data.count;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber)
      });


  }, [page]);

  /*   useEffect(() => {
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
    }, [products]); */
  const hendleAddToCart = (product) => {
    const exist = cart.find(pd => pd.key === product.key);
    let newCart = []
    if (exist) {
      const rest = cart.filter(pd => pd.key !== product.key)
      exist.quantity = exist.quantity + 1;
      newCart = [...rest, product]
    } else {
      product.quantity = 1;
      newCart = [...cart, product]
    }

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
          onChange={hendleSearch}
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
          <div className="pagination">
            {
              [...Array(pageCount).keys()]
                .map(number => <button
                  className={number === page ? 'selected' : ''}
                  key={number}
                  onClick={() => setPage(number)}
                >{number + 1}</button>)
            }
          </div>
        </div>
        <div className="card-container">
          <Cart cart={cart}>
            <Link to="/orderreview" >
              <button className="btn-regular"> Review Your Order</button>
            </Link>
          </Cart>
        </div>
      </div>
    </>
  );
};

export default Shop;

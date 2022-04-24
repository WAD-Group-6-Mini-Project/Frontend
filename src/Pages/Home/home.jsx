import { React, useState, useEffect } from "react";
import axios from "../../api/axiosApi";
import PageFooter from "../../components/Footer/footer";
import Navbar from "../../components/Navbar/navbar";
import ProductCard from "../../components/ProductCard/productCard";

import "./home.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      await axios
        .get("/products")
        .then((res) => {
          console.log(res);
          setProducts(() => res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getProducts();
  }, []);
  return (
    <div>
      <header>
        <Navbar />

        <div className="products">
          {products.length === 0 ? (
            <h1>No products to Display</h1>
          ) : (
            products.map((product) => {
              console.log(product);
              return <ProductCard product={product} />;
            })
          )}
        </div>
      </header>
      <PageFooter />
    </div>
  );
};

export default Home;

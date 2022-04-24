import { React, useState, useEffect } from "react";
import axios from "../../api/axiosApi";
import PageFooter from "../../components/Footer/footer";
import Navbar from "../../components/Navbar/navbar";
import ProductCard from "../../components/ProductCard/productCard";

import "./home.css";

const Home = () => {
  const [products, setProducts] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
    "Item 11",
    "Item 12",
    "Item 13",
    "Item 14",
    "Item 15",
    "Item 16",
    "Item 17",
  ]);

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
              return <ProductCard />;
            })
          )}
        </div>
      </header>
      <PageFooter />
    </div>
  );
};

export default Home;

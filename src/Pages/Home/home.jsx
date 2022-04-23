import { React, useState } from "react";
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
  return (
    <div>
      <header>
        <Navbar />

        <div className="products">
          {products.map((product) => {
            return <ProductCard />;
          })}
        </div>
      </header>
    </div>
  );
};

export default Home;

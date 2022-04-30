import { React, useState, useEffect } from "react";

import axios from "../../api/axiosApi";
import { getUser } from "../../redux/userSlice/userSlice";
import { useSelector } from "react-redux";

import Navbar from "../../components/Navbar/navbar";

import { Card, List, Divider } from "@mui/material";
import PageFooter from "../../components/Footer/footer";

import { useLocation } from "react-router-dom";

import "./filter.css";
import FilterItem from "./filter-item";

const FilterArtists = (props) => {
  const { state } = useLocation();
  const userData = useSelector(getUser);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      await axios
        .post("/product/category", { tag: state.tag })
        .then((res) => {
          console.log(res.data);
          setProducts(() => res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getProduct();
  }, [state]);

  return (
    <div>
      <Navbar />
      <div className="cart-content">
        <Card className="cart-card">
          <h1>FILTER</h1>
          <Divider style={{ margin: "2%" }} />
          <List>
            {products.map((item) => {
              console.log(item);
              return <FilterItem item={item} />;
            })}
          </List>
        </Card>
      </div>

      <PageFooter />
    </div>
  );
};

export default FilterArtists;

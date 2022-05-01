import { React, useState, useEffect } from "react";

import axios from "../../api/axiosApi";

import Navbar from "../../components/Navbar/navbar";

import { Card, List, Divider } from "@mui/material";
import PageFooter from "../../components/Footer/footer";

import { useLocation } from "react-router-dom";

import "./filter.css";
import FilterItem from "./filter-item";

const FilterArtists = (props) => {
  const { state } = useLocation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      await axios
        .post("/product/category", { artist: state["_id"] })
        .then((res) => {
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
      <h1>FILTER BY ARTISTS</h1>
      <div className="cart-content">
        <Card className="cart-card">
          <Divider style={{ margin: "2%" }} />

          {products.length === 0 ? (
            <div class="fof">
              <h1>Artist seems busy...</h1>
            </div>
          ) : (
            products.map((item) => {
              return (
                <List>
                  <FilterItem item={item} />
                </List>
              );
            })
          )}
        </Card>
      </div>

      <PageFooter />
    </div>
  );
};

export default FilterArtists;

import { React, useState, useEffect } from "react";

import axios from "../../api/axiosApi";
import { getUser } from "../../redux/userSlice/userSlice";
import { useSelector } from "react-redux";

import Navbar from "../../components/Navbar/navbar";

import { Card, List, Button, Divider } from "@mui/material";
import PageFooter from "../../components/Footer/footer";
import CartItem from "./cart-item";

import { useNavigate } from "react-router-dom";

import "./cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const userData = useSelector(getUser);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getCart = async () => {
      await axios
        .get(`/user/cart/${userData["_id"]}`)
        .then((res) => {
          setCart(() => res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getCart();
  }, [userData]);

  const removeItem = (product_id) => {
    const data = {
      product_id,
      userId: userData["_id"],
    };

    setCart(() => cart.filter((item) => item._id !== data.product_id));

    axios
      .delete(`/user/cart`, { data: data })
      .then((res) => {
        alert("Product removed from cart!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const checkout = async () => {
    await axios
      .post(`/user/checkout/${userData["_id"]}`, { cart })
      .then((res) => {
        alert("Confirm Order?");
      })
      .catch((e) => {
        console.log(e);
      });
    navigate("/checkout", { state: { _id: userData["_id"] } });
  };

  return (
    <div>
      <Navbar />
      <div className="cart-content">
        <Card className="cart-card">
          <h1>SHOPPING CART</h1>
          <Divider style={{ margin: "2%" }} />
          <List>
            {cart.map((item) => {
              return <CartItem item={item} delete={removeItem} />;
            })}
          </List>

          <Button variant="outlined" onClick={checkout}>
            Proceed to Checkout
          </Button>
        </Card>
      </div>

      <PageFooter />
    </div>
  );
};

export default Cart;

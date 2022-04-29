import { React, useState, useEffect } from "react";

import axios from "../../api/axiosApi";
import { getUser } from "../../redux/userSlice/userSlice";
import { useSelector } from "react-redux";

import Navbar from "../../components/Navbar/navbar";

import { Card, List, Button, Divider } from "@mui/material";
import PageFooter from "../../components/Footer/footer";
import CartItem from "./cart-item";

import "./cart.css";
import { Link } from "react-router-dom";

const Cart = (props) => {
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

    console.log(cart);
    axios
      .delete(`/user/cart`, { data: data })
      .then((res) => {
        alert("Product removed from cart!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const checkout = () => {
    console.log(cart);
    axios
      .post(`/user/checkout/${userData["_id"]}`, { cart })
      .then((res) => {})
      .catch((e) => {
        console.log(e);
      });
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

          <Link
            to={`/checkout`}
            state={{ userId: userData["_id"] }}
            style={{ textDecoration: "none" }}
          >
            <Button variant="outlined" onClick={checkout}>
              Proceed to Checkout
            </Button>
          </Link>
        </Card>
      </div>

      <PageFooter />
    </div>
  );
};

export default Cart;

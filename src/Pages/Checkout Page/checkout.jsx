import { React, useState, useEffect } from "react";
import axios from "../../api/axiosApi";
import { getUser } from "../../redux/userSlice/userSlice";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar/navbar";
import { useLocation } from "react-router-dom";
import { Card, List, Button, Divider } from "@mui/material";
import PageFooter from "../../components/Footer/footer";
import CheckoutItem from "./checkout-item";
import "./checkout.css";

const Checkout = (props) => {
  const { state } = useLocation();
  const userData = useSelector(getUser);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getCart = async () => {
      await axios
        .get(`/user/cart/${state.userId}`)
        .then((res) => {
          setCart(() => res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getCart();
  }, [state]);

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

  return (
    <div>
      <Navbar />
      <div className="cart-content">
        <Card className="cart-card">
          <h1>CHECKOUT</h1>
          <Divider style={{ margin: "2%" }} />
          <List>
            {cart.map((item) => {
              return <CheckoutItem item={item} delete={removeItem} />;
            })}
          </List>
          <Button variant="outlined" onClick={null}>
            Confirm
          </Button>
        </Card>
      </div>

      <PageFooter />
    </div>
  );
};

export default Checkout;

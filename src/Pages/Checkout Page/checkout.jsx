import { React, useState, useEffect } from "react";
import axios from "../../api/axiosApi";
import { getUser } from "../../redux/userSlice/userSlice";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar/navbar";
import { useLocation } from "react-router-dom";
import { Card, List, Button, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import PageFooter from "../../components/Footer/footer";
import { useNavigate } from "react-router-dom";
import CheckoutItem from "./checkout-item";

import "./checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const userData = useSelector(getUser);
  const [cart, setCart] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleModalClose = () => setOpenModal(false);
  const handleModalOpen = () => setOpenModal(true);

  useEffect(() => {
    const getCart = async () => {
      await axios
        .get(`/user/cart/${state["_id"]}`)
        .then((res) => {
          console.log(res.data);
          setCart(() => res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getCart();
  }, [state]);

  const checkout = async () => {
    await axios
      .post(`user/confirm/${userData["_id"]}`)
      .then((res) => {
        navigate("/home");
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
              console.log(item);
              return <CheckoutItem item={item} />;
            })}
          </List>
          <Button variant="outlined" onClick={handleModalOpen}>
            Confirm
          </Button>
          <Modal
            keepMounted
            open={openModal}
            onClose={handleModalClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <Box className="modal-box">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                }}
              >
                <h1>Thankyou for Shopping with us!</h1>
                <Button
                  variant="outlined"
                  onClick={checkout}
                  color="success"
                  style={{ margin: "5%", width: "20%" }}
                >
                  Ok
                </Button>
              </div>
            </Box>
          </Modal>
        </Card>
      </div>

      <PageFooter />
    </div>
  );
};

export default Checkout;

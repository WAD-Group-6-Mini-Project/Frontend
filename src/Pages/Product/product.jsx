import { React, useState, useEffect } from "react";
import Navbar from "../../components/Navbar/navbar";
import PageFooter from "../../components/Footer/footer";
import "./product.css";
import { getUser } from "../../redux/userSlice/userSlice";
import { useSelector } from "react-redux";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import axios from "../../api/axiosApi";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import { Buffer } from "buffer";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ProductPage = (props) => {
  const { state } = useLocation();
  const [product, setProduct] = useState({});
  const userData = useSelector(getUser);

  const addtoCart = async (product_id, product_name, user_id) => {
    const data = {
      name: product_name,
      product_id: product_id,
      userId: user_id,
    };
    await axios
      .post(`/user/cart`, data)
      .then((res) => {
        alert("Product added to cart succesfully!!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const addtoWishlist = async (product_id, product_name, user_id) => {
    const data = {
      name: product_name,
      product_id: product_id,
      userId: user_id,
    };
    await axios
      .post(`/user/wishlist`, data)
      .then((res) => {
        console.log(res);
        alert("Product added to WishList succesfully!!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    const getProducts = async () => {
      await axios
        .get(`/product/${state.productId}`)
        .then((res) => {
          setProduct(() => res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getProducts();
  }, []);

  if (product.img) {
    return (
      <div>
        <Navbar />
        <Box sx={{ flexGrow: 1, my: 10, justifyContent: "end" }}>
          <Grid
            container
            spacing={{ xs: 8, mx: 3 }}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              direction: "row",
            }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={2} sm={4} md={6}>
              <Item>
                <img
                  alt={product.name}
                  src={`data:image/png;base64,${Buffer.from(
                    product.img
                  ).toString("base64")}`}
                  className="ProductImage"
                  margin={0}
                />
              </Item>
            </Grid>
            <Grid item xs={2} sm={4} md={6}>
              <Item>
                <h2 style={{ margin: "5%" }}>{product.name}</h2>

                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  style={{ marginBottom: "5%" }}
                >
                  By : Janhavi Kolte
                </Typography>

                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  align="left"
                >
                  Description:
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{ marginTop: "2%", marginBottom: "5%" }}
                  align="left"
                >
                  {product.description}
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  align="left"
                >
                  Price: {product.price["$numberDecimal"].toString()}
                </Typography>

                <Stack spacing={2} direction="row" style={{ margin: "5%" }}>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      addtoCart(product._id, product.name, userData._id)
                    }
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() =>
                      addtoWishlist(product._id, product.name, userData._id)
                    }
                  >
                    Add to WishList
                  </Button>
                </Stack>
              </Item>
            </Grid>
          </Grid>
        </Box>
        <PageFooter />
      </div>
    );
  } else {
    return <div>Loading!!!</div>;
  }
};

export default ProductPage;

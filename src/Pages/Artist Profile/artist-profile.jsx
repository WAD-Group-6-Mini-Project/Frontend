import { React, useState, useEffect } from "react";
import { Buffer } from "buffer";
import ImageList from "@mui/material/ImageList";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import { getUser } from "../../redux/userSlice/userSlice";
import ImageListItem from "@mui/material/ImageListItem";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "../../api/axiosApi";

import "./artist-profile.css";
import Navbar from "../../components/Navbar/navbar";
import PageFooter from "../../components/Footer/footer";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ArtistProfilePage = () => {
  const userData = useSelector(getUser);
  const [openModal, setOpenModal] = useState(false);
  const [wishlist, setWishList] = useState([]);
  const [products, setProducts] = useState([]);

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  useEffect(() => {
    const getWishList = async () => {
      await axios
        .get(`/user/wishlist/${userData["_id"]}`)
        .then((res) => {
          setWishList(() => res.data);
        })
        .catch((e) => {
          console.log("Error : " + e);
          alert("Error Occured : ", e);
        });
    };

    const getProducts = async () => {
      await axios
        .get(`/user/products/${userData["_id"]}`)
        .then((res) => {
          setProducts(() => res.data);
          console.log(res.data);
        })
        .catch((e) => {
          console.log("Error : " + e);
          alert("Error Occured : ", e);
        });
    };

    getWishList();
    getProducts();
  }, [userData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const productData = new FormData();

    productData.append("productImg", data.get("productImg"));
    productData.append("name", data.get("name"));
    productData.append("tag", data.get("tag"));
    productData.append("description", data.get("description"));
    productData.append("price", data.get("price"));
    productData.append("artistId", userData["_id"]);
    productData.append("artistName", userData["userName"]);

    await axios
      .post("/product", productData)
      .then((res) => {
        alert("Product Upload Successully");
      })
      .catch((e) => {
        console.log("Error : " + e);
        alert("Error Occured : ", e);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="products-wrapper">
        <Card>
          <Grid
            container
            spacing={2}
            columns={8}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={4}>
              <Item>
                <Avatar
                  alt="Remy Sharp"
                  src="https://picsum.photos/1000"
                  sx={{ width: 500, height: 500, m: 5 }}
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item sx={{ p: 25 }}>
                <Typography variant="h6" gutterBottom component="div">
                  {userData.userName}
                </Typography>
                <Typography variant="h7" gutterBottom component="div">
                  {userData.mobile}
                </Typography>
                <Typography variant="h7" gutterBottom component="div">
                  {userData.city}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  body1. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum
                  inventore consectetur, neque doloribus, cupiditate numquam
                  dignissimos laborum fugiat deleniti? Eum quasi quidem
                  quibusdam.
                </Typography>
                <Button variant="outlined" onClick={handleModalOpen}>
                  Upload Product
                </Button>
                <Modal
                  keepMounted
                  open={openModal}
                  onClose={handleModalClose}
                  aria-labelledby="keep-mounted-modal-title"
                  aria-describedby="keep-mounted-modal-description"
                >
                  <Box className="modal-box">
                    <form enctype="multipart/formdata" onSubmit={handleSubmit}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Product name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="tag"
                        label="Product Tag"
                        name="tag"
                        autoComplete="tag"
                        autoFocus
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="price"
                        label="Product Price"
                        type="number"
                        id="password"
                        autoComplete="price"
                      />

                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="description"
                        label="Product Description"
                        name="description"
                        autoComplete="description"
                        autoFocus
                      />

                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="raised-button-file"
                        type="file"
                        name="productImg"
                      />
                      <label htmlFor="raised-button-file">
                        <Button variant="outlined" component="span" primary>
                          Upload
                        </Button>
                      </label>

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="success"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Upload Product
                      </Button>
                    </form>
                  </Box>
                </Modal>
              </Item>
            </Grid>
          </Grid>

          <Divider />
          <h1 style={{ margin: "5%" }}>MY WISHLIST</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "centers",
              margin: "5%",
            }}
          >
            <ImageList sx={{ width: "75%", height: "75%" }}>
              {wishlist.length === 0 ? (
                <div>Add something to your wishlist!</div>
              ) : (
                wishlist.map((item, index) => {
                  return (
                    <ImageListItem key={index}>
                      <img
                        src={`data:image/png;base64,${Buffer.from(
                          item.img
                        ).toString("base64")}`}
                        alt={item.name}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        title={item.name}
                        actionIcon={
                          <IconButton
                            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                            aria-label={`info about ${item.name}`}
                          >
                            <Link
                              to={`/product/${item._id}`}
                              state={{ productId: item._id }}
                              style={{
                                color: "inherit",
                                textDecoration: "none",
                              }}
                            >
                              <InfoIcon />
                            </Link>
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  );
                })
              )}
            </ImageList>
          </div>

          <Divider />

          <h1 style={{ margin: "5%" }}>MY PRODUCTS</h1>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "centers",
              margin: "5%",
            }}
          >
            <ImageList sx={{ width: "75%", height: "75%" }}>
              {products.length === 0 ? (
                <div>No Products to display!!</div>
              ) : (
                products.map((item, index) => {
                  return (
                    <ImageListItem key={index}>
                      <img
                        src={`data:image/png;base64,${Buffer.from(
                          item.img
                        ).toString("base64")}`}
                        alt={item.name}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        title={item.name}
                        actionIcon={
                          <IconButton
                            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                            aria-label={`info about ${item.name}`}
                          >
                            <Link
                              to={`/product/${item._id}`}
                              state={{ productId: item._id }}
                              style={{
                                color: "inherit",
                                textDecoration: "none",
                              }}
                            >
                              <InfoIcon />
                            </Link>
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  );
                })
              )}
            </ImageList>
          </div>
        </Card>
      </div>
      <PageFooter />
    </div>
  );
};

export default ArtistProfilePage;

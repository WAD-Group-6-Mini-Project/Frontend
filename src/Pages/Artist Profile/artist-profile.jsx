import { React, useState } from "react";
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
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "../../api/axiosApi";

import "./artist-profile.css";
import Navbar from "../../components/Navbar/navbar";
import PageFooter from "../../components/Footer/footer";

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

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

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
  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger",
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera",
    },
    {
      img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      title: "Coffee",
    },
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Hats",
    },
    {
      img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
      title: "Honey",
    },
    {
      img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
      title: "Basketball",
    },
    {
      img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
      title: "Fern",
    },
    {
      img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
      title: "Mushrooms",
    },
    {
      img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
      title: "Tomato basil",
    },
    {
      img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
      title: "Sea star",
    },
    {
      img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
      title: "Bike",
    },
  ];

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

          <ImageList
            sx={{ width: 1200, height: 1200, m: 5 }}
            cols={3}
            rowHeight={164}
          >
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Card>
      </div>
      <PageFooter />
    </div>
  );
};

export default ArtistProfilePage;

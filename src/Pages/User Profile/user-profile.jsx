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
import axios from "../../api/axiosApi";

import "./user-profile.css";
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
  const [wishlist, setWishList] = useState([]);

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

    getWishList();
  }, [userData]);

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
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                  blanditiis tenetur unde suscipit, quam beatae rerum inventore
                  consectetur, neque doloribus, cupiditate numquam dignissimos
                  laborum fugiat deleniti? Eum quasi quidem quibusdam.
                </Typography>
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
        </Card>
      </div>
      <PageFooter />
    </div>
  );
};

export default ArtistProfilePage;

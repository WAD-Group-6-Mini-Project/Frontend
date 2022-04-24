import { React } from "react";
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

import "./user-profile.css";
import Navbar from "../../components/Navbar/navbar";
import PageFooter from "../../components/Footer/footer";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const UserProfilePage = () => {
  const userData = useSelector(getUser);
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

export default UserProfilePage;

import { React } from "react";
import Navbar from "../../components/Navbar/navbar";
import PageFooter from "../../components/Footer/footer";
import "./product.css";

import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ProductPage = () => {
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
          <Grid item xs={2} sm={4} md={6} >
            <Item>
              <img src="https://picsum.photos/1000" className="ProductImage" margin={0} />
            </Item>
          </Grid>
          <Grid item xs={2} sm={4} md={6}>
            <Item>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                align="left"
              >
                Description:
              </Typography>
              <Typography variant="body1" gutterBottom>
                body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quos blanditiis tenetur unde suscipit, quam beatae rerum
                inventore consectetur, neque doloribus, cupiditate numquam
                dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                align="left"
              >
                Price : INR 550
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                align="left"
              >
                By : Janhavi Kolte
              </Typography>
              <Stack spacing={2} direction="row">
                <Button variant="Add to Cart">Add to Cart</Button>
                <Button variant="Wish list">Add to WishList</Button>
              </Stack>
            </Item>
          </Grid>
        </Grid>
      </Box>
      <h1>Product Page</h1>
      <PageFooter />
    </div>
  );
};

export default ProductPage;

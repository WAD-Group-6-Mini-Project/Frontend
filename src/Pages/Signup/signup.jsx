import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "../../api/axiosApi";
import { useNavigate } from "react-router-dom";

import "./signup.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const SignUp = () => {
  const [city, setCity] = React.useState("Pune");

  const [userType, setType] = React.useState("User");
  const navigate = useNavigate();

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      userName: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      mobile: data.get("mobile"),
      city: data.get("city"),
      userType: data.get("userType"),
    };
    console.log(userData);
    await axios
      .post("/user/signup", userData)
      .then((res) => {
        console.log(res);
        alert("Account Created Successfully!");
        navigate("/");
      })
      .catch((e) => {
        console.log("Error : " + e);
        alert("Error Occured : ", e);
      });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="login-wrapper">
        <Card sx={{ backgroundColor: "#000000", opacity: 0.7 }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ width: 72, height: 72, my: 2 }} />
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="mobile"
                label="Phone Number"
                name="mobile"
                autoComplete="mobile"
                autoFocus
              />

              <TextField
                id="city"
                name="city"
                select
                label="Select City"
                sx={{ mx: 5, my: 5 }}
                value={city}
                onChange={handleCityChange}
                helperText="Please Select City"
              >
                <MenuItem value="Pune">Pune</MenuItem>
                <MenuItem value="Mumbai">Mumbai</MenuItem>
                <MenuItem value="Chennai">Chennai</MenuItem>
                <MenuItem value="Surat">Surat</MenuItem>
              </TextField>

              <TextField
                id="type"
                select
                name="userType"
                label="Select Type"
                sx={{ mx: 5, my: 5 }}
                value={userType}
                onChange={handleTypeChange}
                helperText="Please Select Type"
              >
                <MenuItem value="Artist">Artist</MenuItem>
                <MenuItem value="User">User</MenuItem>
              </TextField>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Card>
      </div>
    </ThemeProvider>
  );
};

export default SignUp;

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "../../api/axiosApi";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addUser } from "../../redux/userSlice/userSlice";

import "./login.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    await axios
      .post("/user/login", userData)
      .then((res) => {
        dispatch(addUser(res["data"]["user"]));
        alert("Logged In Successfully!");
        navigate("/home");
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
              Sign in
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
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
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
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

export default SignIn;

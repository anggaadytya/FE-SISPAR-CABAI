import "./Login.css";
import { Avatar, Box, Container, createTheme, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { ThemeProvider } from "@emotion/react";
import InputTextField from "../../../components/LoginTextField/LoginTextField";
import ButtonLogin from "../../../components/ButtonLogin/ButtonLogin";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import AlertMessage from "../../../components/AlertAuth/AlertAuth";
import { deepOrange } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: deepOrange,
  },
});

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isSucces, setIsSucces] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log("data email:", data.get("email"));
    console.log("data password:", data.get("password"));

    const email = data.get("email");
    const password = data.get("password");

    if (email === "Admin" && password === "Admin") {
      setIsSucces(true);
      handleLogin();
    } else {
      setIsError(true);
    }
  };

  const handeClose = () => {
    setIsSucces(false);
    setIsSucces(false);
  };

  const handleLogin = () => {
    window.location.href = "/admin/dashboard";
  };

  return (
    <div className="login">
      <ThemeProvider theme={theme}>
        <Container maxWidth="xs" sx={{ boxShadow: 4, borderRadius: 2 }}>
          <Box
            sx={{
              paddingTop: 3,
              marginBottom: 3,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
            component="form"
            onSubmit={handleSubmit}
          >
            <Avatar sx={{ bgcolor: "chocolate" }}>
              <LockIcon />
            </Avatar>
            <Typography component={"h1"} variant="h5">
              Sign In
            </Typography>
            <InputTextField
              id="email"
              label="Email Address"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              autoFocus
              name="email"
              type="text"
            />
            <div
              style={{ display: "flex", width: "100%", position: "relative" }}
            >
              <InputTextField
                id="password"
                label="Password"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                autoFocus
                name="password"
                type={isShowPassword ? "text" : "password"}
              />
              <div
                style={{
                  position: "absolute",
                  right: 15,
                  top: 33,
                  cursor: "pointer",
                }}
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? <VisibilityOff /> : <Visibility />}
              </div>
            </div>
            <ButtonLogin
              type="submit"
              variant="contained"
              fullWidth
              color="white"
              backgroundColor="chocolate"
              label="Sign In"
              onClick={handleSubmit}
            />
            <AlertMessage
              message="Your email and password is correct !!"
              open={isSucces}
              severity="success"
              onClose={handeClose}
            />
            <AlertMessage
              message="Your email and password is wrong !!"
              open={isError}
              severity="error"
              onClose={handeClose}
            />
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Login;

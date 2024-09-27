import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useNavigate } from "react-router";
import proxima360 from "../../Assets/icons/proxima360.png";
import { LocalLaundryService } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import CryptoJS from 'crypto-js';
import { useDispatch, useSelector } from "react-redux";
import { postUSRAUTHRequest } from '../../Redux/Action/UserConfigDetails';
import { Modal } from '@material-ui/core';
import CircularProgress from "@mui/material/CircularProgress";
import User_Signup from './UsrRegist'

const useStyles = makeStyles({
  Copyrightdiv: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: "20px 70px",
    marginTop: "50px",
  },
  Copyrighttext: {
    color: "#00000099",
  },
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function Copyright(props) {
  const Authclasses = useStyles();
  return (
    <>
      {" "}
      <div className={Authclasses.Copyrightdiv}>
        {" "}
        <img src={proxima360} />
        <div className={Authclasses.Copyrighttext} {...props}>
          {"Copyright © "}
          <Link color="inherit" href="https://proxima360.com/" target="_blank">
            Proxima360
          </Link>{" "}
          {new Date().getFullYear()}
        </div>
      </div>
    </>
  );
}

const theme = createTheme();


const secretKey = CryptoJS.enc.Utf8.parse("Allocation_Encrpytion_Proxima360");  // Keep this safe and use the same key in Django

export default function SignIn() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usrRegPStatus, setUsrRegPStatus] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UsersData = useSelector(
    (state) => state.UserConfigReducers
  );

  useEffect(() => {
    const usrDtls = UsersData?.data?.usrAuthn;
    if (Array.isArray(usrDtls) && usrDtls.length > 0) {
      if (usrDtls[0].AUTH) {
        //localStorage.setItem("userData", JSON.stringify({ username: userData.username, }));
        if ((usrDtls[0].INFO).length > 0) {
          const user_details = (usrDtls[0].INFO)[0];
          let userData = localStorage.getItem("userData");
          if (userData) {
            userData = JSON.parse(userData);
          } else {
            userData = {};
          }
          userData.role_id = user_details.role_id;
          userData.role_name = user_details.role_name;
          localStorage.setItem("userData", JSON.stringify(userData));
        }
        setUserData({
          username: "",
          password: "",
        });
        navigate("/AllocDashboard");
      } else if (!(usrDtls[0].AUTH)) {
        setIsError(true);
        localStorage.clear();
      }
      UsersData.data.usrAuthn[0].AUTH = 0;
      setIsLoading(false);
    }
  }, [UsersData?.data]);

  const encryptPassword = (plainText) => {
    const encrypted = CryptoJS.AES.encrypt(plainText, secretKey, {
      mode: CryptoJS.mode.ECB, // Use ECB mode for consistency
      padding: CryptoJS.pad.Pkcs7, // Default padding (PKCS7)
    });
    return encrypted.toString();  // Output is base64 encoded
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const encryptedPassword = encryptPassword(userData.password);

    if (userData.username.length > 0 && userData.password.length > 0) {
      const currentUser = [{
        "USERNAME": userData.username,
        "PASSWORD": encryptedPassword
      }];
      setIsLoading(true);
      dispatch(postUSRAUTHRequest(currentUser));

      localStorage.setItem("userData", JSON.stringify({ username: userData.username, }));
      // navigate("/AllocDashboard");
    } else {
      setIsError(true);
    }
    // window.location.reload();
  };

  const handleChange = (e) => {
    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsError(false);
  };
  const handleSignUpClick = () => {
    setUsrRegPStatus(true);
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={proxima360} />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              value={userData.username}
              onChange={handleChange}
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
              value={userData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
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
                <Link href="#" variant="body2" onClick={handleSignUpClick}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={isError} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Please enter valid username and password !
          </Alert>
        </Snackbar>
      </Stack>
      <Modal open={isLoading}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <CircularProgress color="secondary" />
        </div>
      </Modal>
      {
        usrRegPStatus ?
          <div>
            < User_Signup />
          </div>
          : null
      }
    </ThemeProvider>
  );
}

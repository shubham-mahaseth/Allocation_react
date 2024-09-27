// import op1 from  '../../op1.gif'
import '../../App.css';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Backdrop } from '@mui/material';
import './regStyle.css';



export default function User_Signup() {
        const theme = createTheme({palette: {
            background: {
                default: ' #FFFEF2', // Set default background color to grey
              },
            primary: {
              main: '#f44336', // Override primary color to red
            },
            secondary: {
              main: '#3f51b5', // Override secondary color to indigo
            },
          },
          typography: {
            fontFamily: 'Arial', // Override font family
          },});
          // console.log("customBox",customBox)
    return(
        // <div className="App">
        //   <header className="App-header">
          <ThemeProvider theme={theme} 
          >
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box className ="customBox"
            //  sx={{
            //     marginTop: 14,
            //     display: "flex",
            //     flexDirection: "column",
            //     alignItems: "center",
            //     background:"white",
            //     borderRadius:'24px',border: 0,boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)"
            //   }}
              >
                
                {/* <Typography component="h1" variant="h5">
                Sign in
                </Typography> */}
                <Box sx={{ textAlign : 'center' ,mt:2}}
                >
                {/* <img className ="logoImage" src={op1}  alt="Profile" /> */}
                {/* <div style={{ textAlign: 'center' }}>    */}
                <TextField
                  margin="normal"
                  required
                //   fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  sx={{ width: '80%' }}
                />
                <TextField
                  margin="normal"
                  required
                  sx={{ width: '80%' }}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                 
                <Button
                  type="submit"
                  //fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 3 ,}}
                > Sign In
                </Button>
                {/* </div> */}
                </Box>
            </Box>
            </Container>
            </ThemeProvider>
        //   </header>
        // </div>
    )
    
}
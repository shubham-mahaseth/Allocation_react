import './regStyle.css';
import { makeStyles } from "@mui/styles";
import proxima360 from "../../Assets/icons/proxima360.png";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { postUSERREGTRequest } from '../../Redux/Action/UserConfigDetails';
import { encryptPassword } from './InforEnc';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { Modal } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  float_child: {
    marginBottom: "0.4rem",
    marginLeft: "0.5rem"
  },
  inputField1: {
    width: "300px",
    height: "30px",
    '& input + fieldset': {
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
    },
  },
  inputField2: {
    width: "300px",
    height: "30px",
    '& input + fieldset': {
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
    },
  },

});
function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
      bounds="body"
    >
      <Paper {...props} />
    </Draggable>
  );
}
function Copyright(props) {
  const Authclasses = useStyles();
  return (
    <>
      <div className={Authclasses.Copyrightdiv}>
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
const initUsrData = {
  FNAME: "",
  LNAME: "",
  MAIL: "",
  USERNAME: "",
  PASSWORD: "",
  CPASSWORD: ""
}
const initUsrStatus = {
  FNAME: false,
  LNAME: false,
  MAIL: false,
  USERNAME: false,
  PASSWORD: false,
  CPASSWORD: false
}
export default function ResetInfo() {
  const SignupStyle = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(initUsrData);
  const [userErrStatus, setUserErrStatus] = useState(initUsrStatus);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState("");
  const [navLogin, setNavLogin] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UserRegitData = useSelector(
    (state) => state.UserConfigReducers
  );
  useEffect(() => {
    const usrDtls = UserRegitData?.data?.userRegtData;
    if (usrDtls?.status === 500) {
      setOpenDialog(true);
      setDialogData(usrDtls.message);
      setNavLogin(false);
    }else if (usrDtls?.status === 200){
      setOpenDialog(true);
      setDialogData("Registered Successfully");
      setNavLogin(true);
    }
    if (usrDtls?.status) {
      UserRegitData.data.userRegtData.status = 0;
    }
    setIsLoading(false);

  }, [UserRegitData?.data]);

  const handleChange = (event) => {
    // console.log("Change :: ", event.target.name, "val", event.target.value)
    setUserInfo((prev) => {
      return { ...prev, [event.target.name]: event.target.value }
    })
  }
  const handleBlur = (event) => {
    if (event.target.name === "CPASSWORD" && (userInfo.PASSWORD).length > 0 && userInfo.PASSWORD !== userInfo.CPASSWORD) {

      setUserErrStatus((prev) => {
        return { ...prev, [event.target.name]: true }
      })
    } else {
      setUserErrStatus((prev) => {
        return { ...prev, [event.target.name]: false }
      })
    }
  }
  const handleValidation = () => {
    let anyError = false;

    setUserErrStatus(prevState => {
      const newErrStatus = { ...prevState };
      Object.keys(userInfo).forEach(key => {
        const value = userInfo[key];
        // Validate 
        if (key === "MAIL") {
          newErrStatus[key] = !(value.includes('@') && value.toLowerCase().includes('.com'));
        } else if (["FNAME", "LNAME", "USERNAME"].includes(key) && !isNaN(value)) {
          newErrStatus[key] = true;
        } else if (key === "CPASSWORD") {
          newErrStatus[key] = value.length ===0 ?true: value.length >0 && userInfo.PASSWORD.length > 0 && userInfo.PASSWORD !== value;
        } else {
          newErrStatus[key] = value === "";
        }
        if (newErrStatus[key]) anyError = true;
      });

      return newErrStatus;
    });

    // console.log("anyError: ", anyError);
    return anyError;
  };


  const handleSubmit = () => {

    if (!handleValidation()) {
      const { CPASSWORD, ...userRegtInfo } = userInfo;
      userRegtInfo.PASSWORD = encryptPassword(userRegtInfo.PASSWORD)
      // console.log("userRegtInfo :: ", userRegtInfo)
      setIsLoading(true);
      dispatch(postUSERREGTRequest([userRegtInfo]));

    }
  }

  const handleCloseDialog = (e) => {
    setOpenDialog(false);
    setDialogData("");
    if(navLogin){
      navigate(`/`);
    }
  }
  return (
    <div class="container">
      <Box className="customBox" sx={{ minWidth: "450px", background: 'white' }}>
        <img className="logoImage" src={proxima360} alt="Profile" />

        <Box sx={{ textAlign: 'center', mt: 2, }}>

          <div className={SignupStyle.float_child}>
            <div>

              {userErrStatus.FNAME ?
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 0px", display: 'inline', float: 'left', color: "#b22222" }}>
                  First Name*</InputLabel>
                :
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                  First Name</InputLabel>}
            </div>
            <div>
              <TextField
                size="small"
                error={userErrStatus.FNAME}
                name="FNAME"
                onChange={handleChange}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0",
                    borderRadius: "5px",
                    height: "15px",

                  }
                }}
                id="outlined-disabled"
                autoComplete='off'
                //value={searchData.ALLOC_DESC}
                // label="Not Before Date To"
                InputLabelProps={{ style: { fontSize: "12px", background: "red", }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12, height: "32px" },
                  className: SignupStyle.inputField1,
                }}
                inputProps={{ sx: { backgroundColor: '#fff' } }}
              // disabled={disHead}
              // isDisabled={disHead}
              />
            </div>
          </div>
          <div className={SignupStyle.float_child}>
            <div>
              {userErrStatus.LNAME ?
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 0px", display: 'inline', float: 'left', color: "#b22222" }}>
                  Last Name*</InputLabel>
                :
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                  Last Name</InputLabel>}
            </div>
            <div>
              <TextField
                size="small"
                name="LNAME"
                onChange={handleChange}
                error={userErrStatus.LNAME}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0",
                    borderRadius: "5px",
                    height: "15px",
                  }
                }}
                id="outlined-disabled"
                autoComplete='off'
                //value={searchData.ALLOC_DESC}
                // label="Not Before Date To"
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12, height: "32px" },
                  className: SignupStyle.inputField1,
                }}
                inputProps={{ sx: { backgroundColor: '#fff' } }}
              // disabled={disHead}
              // isDisabled={disHead}
              />
            </div>
          </div>
          <div className={SignupStyle.float_child}>
            <div>
              {userErrStatus.MAIL ?
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 0px", display: 'inline', float: 'left', color: "#b22222" }}>
                  E-mail*</InputLabel>
                :
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                  E-mail</InputLabel>}
            </div>
            <div>
              <TextField
                size="small"
                name="MAIL"
                onChange={handleChange}
                error={userErrStatus.MAIL}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0",
                    borderRadius: "5px",
                    height: "15px",

                  }
                }}
                id="outlined-disabled"
                autoComplete='off'
                //value={searchData.ALLOC_DESC}
                // label="Not Before Date To"
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12, height: "32px" },
                  className: SignupStyle.inputField2,
                }}
                inputProps={{ sx: { backgroundColor: '#fff' } }}
              // disabled={disHead}
              // isDisabled={disHead}
              />
            </div>
          </div>
          <div className={SignupStyle.float_child}>
            <div>
              {userErrStatus.USERNAME ?
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 0px", display: 'inline', float: 'left', color: "#b22222" }}>
                  Username*</InputLabel>
                :
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                  Username </InputLabel>
              }
            </div>
            <div>
              <TextField
                size="small"
                name="USERNAME"
                onChange={handleChange}
                error={userErrStatus.USERNAME}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0",
                    borderRadius: "5px",
                    height: "15px",
                  }
                }}
                id="outlined-disabled"
                autoComplete='off'
                //value={searchData.ALLOC_DESC}
                // label="Not Before Date To"
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12, height: "32px" },
                  className: SignupStyle.inputField1,
                }}
                inputProps={{ sx: { backgroundColor: '#fff' } }}
              // disabled={disHead}
              // isDisabled={disHead}
              />
            </div>
          </div>
          <div className={SignupStyle.float_child}>
            <div>
              {userErrStatus.PASSWORD ? <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 0px", display: 'inline', float: 'left', color: "#b22222" }}>
                Password*</InputLabel> :
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                  Password </InputLabel>}
            </div>
            <div>
              <TextField
                size="small"
                name="PASSWORD"
                onChange={handleChange}
                id="password"
                type="password"
                error={userErrStatus.PASSWORD}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0",
                    borderRadius: "5px",
                    height: "15px",
                  }
                }}
                autoComplete='off'
                //value={searchData.ALLOC_DESC}
                // label="Not Before Date To"
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12, height: "32px" },
                  className: SignupStyle.inputField1,
                }}
                inputProps={{ sx: { backgroundColor: '#fff' } }}
              // disabled={disHead}
              // isDisabled={disHead}
              />
            </div>
          </div>
          <div className={SignupStyle.float_child}>
            <div>
              {userErrStatus.CPASSWORD ? <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 0px", display: 'inline', float: 'left', color: "#b22222" }}>
                Confirm Password*</InputLabel> :
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                  Confirm Password </InputLabel>}
            </div>
            <div>
              <TextField
                size="small"
                name="CPASSWORD"
                id="password"
                type="password"
                error={userErrStatus.CPASSWORD}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0",
                    borderRadius: "5px",
                    height: "15px",
                  }
                }}
                autoComplete='off'
                //value={searchData.ALLOC_DESC}
                // label="Not Before Date To"
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12, height: "32px" },
                  className: SignupStyle.inputField1,
                }}
                inputProps={{ sx: { backgroundColor: '#fff' } }}
              // disabled={disHead}
              // isDisabled={disHead}
              />
            </div>
          </div>

          <Button
            type="submit"
            //fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 3, }}
            onClick={handleSubmit}
          > Reset Password
          </Button>

        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Box>
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

      <div>
        <Dialog
          fullWidth={true}
          maxWidth="xs"
          open={openDialog}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
          disableBackdropClick
        >
          <DialogTitle sx={{ margin: "0px", padding: "15px 0px 0px 0px", }}></DialogTitle>
          <DialogContent id="draggable-dialog-title" sx={{ fontSize: "16px", userSelect: 'text', padding: "0px 0px 0px 10px", }} >
            {dialogData}
          </DialogContent>
          <DialogActions>
            <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 5px 0px 0px", width: "100px", }}
              onClick={handleCloseDialog} autoFocus variant="contained" startIcon={<DoneAllIcon />}>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>

    //   </header>
    // </div>
  )

}
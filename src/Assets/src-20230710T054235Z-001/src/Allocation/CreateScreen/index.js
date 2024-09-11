import React, { useEffect, useState, useRef } from "react";
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import Table from "../../Components/Table/index";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import { Modal, Backdrop, Fade } from '@material-ui/core';
import Autocomplete from "@mui/material/Autocomplete";
// import InfoIcon from '@mui/icons-material/Info';
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { Popover } from '@material-ui/core';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import InputLabel from '@mui/material/InputLabel';
import Drawer from "@mui/material/Drawer";
import AllocSummary from "../AllocSummary/AllocSummary";
import { makeStyles, withStyles } from "@mui/styles";
import {
  getWarehouseRequest,
  getSUPPLIERRequest,
  getSUPPLIERSITERequest,
  getPACKNORequest,
  getDIFFRequest,
  getSKURequest,
  getITEM_LIST_HEADRequest,
  getVPNRequest,
  getUDARequest,
  getPORequest,
  getPO_TYPERequest,
  getHIERRequest,
  getEXCLUDEUDARequest,
  getALLOC_LEVELRequest,
  getALLOC_TYPERequest,
  getCONTEXT_TYPERequest,
  getPROMOTIONRequest,
  getSTATUSRequest,
  postALLOCRESULTRequest,
  getALLOC_CRITERIARequest,
  postALLOCINSERTRequest,
  getITEMPARENTRequest,
  getHIER2Request,
  getHIER3Request,
  postALLOCRESULTCWHRequest,
  getASNRequest,
  postALLOCRESULTCASNRequest,
  getTSFRequest,
  postALLOCRESULTCTSFRequest,
  getALLOCNORequest,
  getALLOC_AVAIL_SEARCHRequest,
  getALLOC_AVAIL_QTYRequest,
  getUPDATESELINDCREATERequest,
  getSWITCHTABFUNCRequest,
  getDELETECREATEGRIDRequest,
  getCREATEREFRESHGRIDRequest,
  postCALCRequest,
  postALLOCDTLTABRequest,
  postErrReportRequest,
  postAPPROVEFUNCTIONRequest,
  postAPPROVEVALIDFUNCTIONRequest,
  postCREATEGRIDDFRequest,
  postRESERVEFUNCTIONRequest,
  postWORKSHEETFUNCTIONRequest, postSchdlrtvRequest,
  getSPLITCREATEFUNCTIONRequest,
  postMULTIPOCREATERequest,
  postVALIDRLCHECKDATARequest,
  postCOMMITDATARequest,
} from "../../Redux/Action/createAllocation";
import { getRTVRLDATARequest } from "../../Redux/Action/rules&location";
import { postSwitchASYRequest } from "../../Redux/Action/allocSummary";
import {
  getALLOCHEADDETAILSRequest,
} from "../../Redux/Action/quantityLimits";
import CircularProgress from "@mui/material/CircularProgress";
// import { headCells } from "./tableHead";
import SearchIcon from "@mui/icons-material/Search";
import { alpha } from "@mui/material/styles";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SendIcon from "@mui/icons-material/Send";
//import { trnType } from "./transType.js";
// import { errorList } from "./errorType.js";
// import _ from "lodash";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import swal from '@sweetalert/with-react';
// import TrnTypeList from "../TRNTYPE";
import Select, { components } from 'react-select';
import makeAnimated, { Input } from 'react-select/animated';
import { CallMade, CheckBox, ConstructionOutlined } from "@mui/icons-material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { headCells } from "./tableHead";
import TableSortLabel from '@mui/material/TableSortLabel';
import PropTypes from 'prop-types';
import Toolbar from "@mui/material/Toolbar";
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from "@mui/material/Tab";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from '@mui/icons-material/Info';
import LockIcon from '@mui/icons-material/Lock';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import { BsFillEraserFill } from 'react-icons/bs';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorIcon from '@mui/icons-material/Error';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SourceIcon from '@mui/icons-material/Source';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DataGrid } from '@mui/x-data-grid';
import ForwardIcon from '@mui/icons-material/Forward';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Card, CardContent, ListItemIcon } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
// import SearchIcon from '@mui/icons-material/Search';
import CachedIcon from '@mui/icons-material/Cached';
import RefreshIcon from '@mui/icons-material/Refresh';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import AnimationIcon from '@mui/icons-material/Animation';
import { height } from "@mui/system";
//import "./index.css";
import QuantityLimits from "../QuantityLimits/index";
import LikeItemMap from "../LikeItem/index";
import RulesAndLocation from "../Rules/index";
import ScheduleAlloc from "../ScheduleAlloc";
import AllocDetails from "../AllocDetails/AllocDetails";
import AllocDetailsPack from "../AllocDetails/AllocDetailPack"
// import WhatIFSummary from "../WhatIFSummary/index";
import WhatIFPO from "../WhatIf/PO";
import WhatIFSummary from "../WhatIf/Summary";
import ErrorReportScreen from "../ErrorReport";
import SizeDetails from "../SizeDetails"
// import AllocSummary from "../AllocSummary/AllocSummary"
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import TabScrollButton from '@material-ui/core/TabScrollButton';
import Draggable from 'react-draggable';
import "./Swalstyling.css"
import { postRTVADPACKRequest } from "../../Redux/Action/AllocDPk"// import CircularProgress from '@mui/material/CircularProgress';
import { POData } from "../../Redux/Saga/CreateAllocationSaga";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import WebhookIcon from '@mui/icons-material/Webhook';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import Backdrop from '@mui/material/Backdrop';
// import { GET_SWITCHTABFUNC_REQUEST } from "../../Redux/constant";
// import { set } from "immer/dist/internal";\

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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const swalStyles = makeStyles((theme) => ({
  customIcon: {
    fontSize: '10px',
  },

  mySwal: {
    // position: 'fixed',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
  },
  myPopup: {
    width: '100px !important',
    height: '100px !important',
  },

  button: {
    backgroundColor: "#228B22",//theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
    //borderRadius: '4px',
    //padding: '0.5rem 1rem',
    // minWidth: '8rem',
    // margin: '1rem',
    fontSize: "12px",
    //backgroundColor: "#228B22",
    padding: "5px", fontFamily: "system-ui",
    width: "100px",
    //marginLeft: "5px", marginTop: "2px",
  },
  cancelButton: {
    //backgroundColor: "red",//theme.palette.primary.main,
    color: theme.palette.common.white,
    // fontWeight: 'bold',
    // borderRadius: '4px',
    // //padding: '0.5rem 1rem',
    // minWidth: '8rem',
    // margin: '1rem',
    fontSize: "12px",
    backgroundColor: "maroon",
    padding: "5px", fontFamily: "system-ui",
    width: "100px",// marginLeft: "5px", marginTop: "2px",
  },
  title: {
    fontFamily: "system-ui",
    fontSize: "16px !important",
    fontWeight: 'bold',
    color: 'red',
  }
  ,

}));
const animatedComponents = makeAnimated();

const styleSelect = {
  control: base => ({
    ...base,
    width: "180px",
    fontSize: "13px",
    // height:"25px",
    minHeight: "30px",
    border: "1px solid rgb(170, 170, 170)",
    // This line disable the blue border
    // borderRadius: "0",
    // backgroundColor:"#f0f0f0",
    boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
    // borderColor: state.isFocused ?
    //       '#ddd' : isValid ?
    //       '#ddd' : 'red',
    // '&:hover': {
    //   borderColor: state.isFocused ?
    //     '#ddd' : isValid ?
    //     '#ddd' : 'red'
    // }
    // border:"1px solid red"
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: 1,
    // border:"1px solid black"
  }),
  clearIndicator: (base) => ({
    ...base,
    // paddingTop: 0,
    padding: 0,
    color: 'rgb(90,90,90)',
    // border:"1px solid orange"
  }),
  valueContainer: (provided) => ({
    ...provided,
    minHeight: '30px',
    // maxHeight: '30px',
    height: '30px',
    paddingTop: '0px',
    paddingBottom: '0px',
    // border:"1px solid green"
  }),
  singleValue: (provided) => ({
    ...provided,
    // minHeight: '1px',
    // paddingBottom: '0px',
    // border:"1px solid blue"
  }),
  input: (provided) => ({
    ...provided,
    width: "100%",
    // border:"1px solid violet"
  }),
  option: provided => ({
    ...provided,
    // color: 'blue',
    fontSize: "12px",
    // border:"1px solid lightgreen"
  }),
  menu: base => ({
    ...base,
    // override border radius to match the box
    borderRadius: 0,
    // border:"1px solid lightblue",
    // backgroundColor: 'black',
    // kill the gap
    marginTop: 0
  }),
  menuList: base => ({
    ...base,
    // kill the white space on first and last option
    padding: 0,
    // border:"1px solid pink"
  })
};

const tabStyle = {
  border: "solid 1px", borderRadius: '12px 12px 0px 0px',
  marginRight: '5px', fontWeight: "bold",
}

const tabStyleBlue = {
  border: "solid 1px", borderRadius: '12px 12px 0px 0px',
  marginRight: '5px', fontWeight: "bold", color: '#3792CB',
}

const tabStyleRed = {
  border: "solid 1px", borderRadius: '12px 12px 0px 0px',
  marginRight: '5px', fontWeight: "bold", color: '#C30900',
}

const tabStyleGreen = {
  border: "solid 1px", borderRadius: '12px 12px 0px 0px',
  marginRight: '5px', fontWeight: "bold", color: '#46923C',
}

const theme = createTheme({
  palette: {
    // Change the indicator color to red
    indicator: {
      main: "red",
    },
  },
});

const tabStyleCalcRed = {
  border: "solid 1px", borderRadius: '12px 12px 0px 0px', marginRight: '5px', fontWeight: "bold",//borderColor:"1px solid grey",color:"grey",
  // Set the background color to white by default
  // Add padding to the tab to create some space around the label
  color: '#46923C',
  padding: "10px",
  // Set the cursor to pointer to indicate that the tab is clickable
  cursor: "pointer",
  '&.Mui-selected': {
    outline: '1px',
    color: "grey", borderColor: "grey", color: '#C30900',
    //borderBottom:"1px solid red"
  },

}

const tabStyleCalcGreen = {
  border: "solid 1px", borderRadius: '12px 12px 0px 0px', marginRight: '5px', fontWeight: "bold",//borderColor:"1px solid grey",color:"grey",
  // Set the background color to white by default
  color: '#C30900',
  // Add padding to the tab to create some space around the label
  padding: "10px",
  // Set the cursor to pointer to indicate that the tab is clickable
  cursor: "pointer",
  '&.Mui-selected': {
    outline: '1px',
    color: "grey", borderColor: "grey", color: '#46923C',
    //borderBottom:"1px solid red"
  },

}

const tabStyleCalcDis = {
  border: "solid 1px", borderRadius: '12px 12px 0px 0px', marginRight: '5px', fontWeight: "bold",
  padding: "10px", cursor: "pointer",
  '&.Mui-selected': { outline: '1px', color: "light grey", borderColor: "grey", },
}

const tabStyleCalcDisApprove = {
  border: "solid 1px", borderRadius: '12px 12px 0px 0px', marginRight: '5px', fontWeight: "bold",
  padding: "10px", cursor: "pointer",


  '&.Mui-selected': { outline: '1px', color: "light grey", borderColor: "grey", },
}


const tabStyleCalcDisReserve = {
  border: "solid 1px", borderRadius: '12px 12px 0px 0px', marginRight: '5px', fontWeight: "bold",
  padding: "10px", cursor: "pointer",
  '&.Mui-selected': { outline: '1px', color: "light grey", borderColor: "grey", },
}

const tabStyleCalcDisBlue = {
  border: "solid 1px", borderRadius: '12px 12px 0px 0px', marginRight: '5px', fontWeight: "bold",
  padding: "10px", cursor: "pointer",
  '&.Mui-selected': { outline: '1px', color: "light grey", borderColor: "grey", color: '#3792CB', },
}
const activeTabStyle = {
  // Set the background color to a different color when the tab is active
  backgroundColor: "lightblue",
  border: "1px solid grey",
};


const useStyles = makeStyles({
  maindiv: {
    position: "relative",
    // backgroundColor:"yellow",
    // width:"100%",
    width: "calc(95vw - 0px)",
    "& table": {
      "& tr": {
        "& td:nth-child(29)": {
          display: "none",
        },
        "& td:nth-child(30)": {
          display: "none",
        },
        "& td:nth-child(31)": {
          display: "none",
        },
      },
    },
  },
  boxDiv: {
    textAlign: "initial",
    position: "relative",
    maxWidth: "1400px",
    // backgroundColor:"yellow"
  },
  uploaddiv: {
    display: "flex",
    alignItems: "center",
    marginTop: "50px",
    textAlign: "start",
    gap: 20,
    // backgroundColor:"lightgreen"
  },
  GobackDiv: {
    cursor: "pointer",
  },
  textField: {
    marginRight: "10px !important",

  },
  dateField: {
    "& .MuiInput-input": {
      color: "rgba(102,102,102,1)",
    },
  },
  popUp: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    padding: "20px 20px 20px 20px",
  },
  input: {
    // width: "250px",
    height: "30px",
    // background: "rgb(255, 255, 255)",
    '& input + fieldset': {
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
      // borderColor: 'gray',
    },
  },
  formRadio: {
    "& .MuiSvgIcon-root": {
      height: 18,
      width: 18,
    }
  },
  inputField: {
    width: "100%",
    height: 37.8,
    // margin:"10px 0px 0px 0px",
    // height: 30,

    backgroundColor: "#f0f0f0",
    '& input + fieldset': {
      // borderColor: 'gray',
      borderRadius: "0",
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
    },
  },
  inputFieldTable: {
    width: "100%",
    height: 37.8,
    // margin:"10px 0px 0px 0px",
    // height: 30,
    backgroundColor: "#f0f0f0",
    '& input + fieldset': {
      // borderColor: 'gray',
      borderRadius: "5px",
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
    },
  },
  inputFielddate: {
    width: "180px",
    // margin: "1px 0px 0px 0px",
    height: "30px",
    // border: 0,
    // backgroundColor:"#f0f0f0",
    '& input + fieldset': {
      // backgroundColor:"white",
      // borderColor: 'gray',
      // borderRadius: "0",
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
    },
  },
  float_container: {
    display: "inline-block",
    // margin: "0.3rem",
    // padding: "1rem 1rem",
    // text-align: center;
  },
  float_child: {
    display: "inline-block",
    // border: "1px solid red",
    margin: "0px 0px 0px 8px",
    padding: "0rem 0rem",
    verticalAlign: "middle",
  },
  container: {
    display: "flex",
    float: "left"
  },
  container_child: {
    float: "left"
  },
  container_button: {
    // margin:"0.5rem"
  },
  grid_child: {
    display: "inline-block",
    // border: "1px solid red",
    padding: "0rem 0.2rem",
    // verticalAlign: "middle",
  },
  course_box: {
    width: "100%",
    // margin:"0 auto",
    // display: "block",
    // flexWrap:"wrap",
  },
  course_list: {
    // backgroundColor:"lightgreen",
    // position: "relative"
  },
  listdropdown: {
    padding: "0"
  },
  hoverdropdown: {
    display: "inline-block",
    fontSize: "20px",
  },
  grid_block: {
    display: "inline-block",
    // border: "1px solid red",
    padding: "0rem 0rem",
    verticalAlign: "middle",
  },
  grid_container: {
    display: "inline-block",
    // margin: "0.3rem",
  },
  header_container: {
    display: "inline-block",
    // marginTop: "0.2rem",
    // padding: "1rem 1rem",
    // text-align: center;
  },
  header_child: {
    display: "inline-block",
    // border: "1px solid red",
    padding: "0rem 0.2rem",
    verticalAlign: "middle",
  },
  grid_child1: {
    display: "inline-block",
    // border: "1px solid red",
    margin: "0px 0px 0px 0px",
    padding: "0rem 0rem",
    verticalAlign: "middle",
  },
  TableCell: {
    color: "#fff",
    padding: "6px 6px !important",
    lineHeight: "1.2rem !important",
  },
  TitleHead: {
    // height: "20px",
    position: "sticky",
    top: -1,
    // '&::-webkit-scrollbar': { width: '8px', height: "8px" },
    // '&::-webkit-scrollbar-thumb': { backgroundColor: '#bdbdbd', borderRadius: '4px', },
    // '&::-webkit-scrollbar-track': { backgroundColor: '#f5f5f5', borderRadius: '4px', },
  },
  multiselectfield: {
    display: "inline-block",
    // border: "1px solid red",
    margin: "0rem",
    padding: "0rem 0rem",
    verticalAlign: "middle",
  },
  root: {
    "& .MuiFilledInput-root": {
      background: "rgb(232, 241, 250)"
    }
  },
  TitleRow: {
    height: 20
  },
  Desc_column: {
    // border: "2px solid red",
    fontSmooth: "always",
    fontSize: "13px",
    // fontFamily: "system-ui",
    color: "black",
    padding: "0px"
  },
  backdrop: {
    zIndex: 999,
    color: '#fff',
  },
  menuContent: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    zIndex: 999,
    display: 'none',
    padding: "1px",
    border: "1px solid lightgrey",
    margin: "0px 0px 0px 0px"
  },
  menuContentVisible: {
    display: 'block',
    padding: "1px",
    border: "1px solid lightgrey",
    margin: "0px"
  },
  drawerDiv: {
    padding: "0px 0px 10px 0px"
  }
});


const styleSelect5 = {
  control: base => ({ ...base, fontSize: "12px", minHeight: "20px", textAlign: "center", borderRadius: "3px", }),
  dropdownIndicator: (base) => ({ ...base, padding: 0, }),
  clearIndicator: (base) => ({ ...base, paddingTop: 0, paddingBottom: 0, }),
  valueContainer: (provided) => ({ ...provided, height: '20px', paddingTop: '0', paddingBottom: '0', }),
  singleValue: (provided) => ({ ...provided, }),
  input: (provided) => ({ ...provided, width: "100%", justifyContent: "left" }),
  option: provided => ({ ...provided, fontSize: "12px", }),
  menu: base => ({ ...base, borderRadius: 0, marginTop: 0, textAlign: "center", }),
  menuList: base => ({ ...base, padding: 0, textAlign: "center", })
};

const styleSelect3 = {
  control: base => ({ ...base, fontSize: "12px", minHeight: "20px", textAlign: "center", borderRadius: "0px", border: 0, borderBottom: "1px solid gray" }),
  dropdownIndicator: (base) => ({ ...base, padding: 0, }),
  clearIndicator: (base) => ({ ...base, paddingTop: 0, paddingBottom: 0, }),
  valueContainer: (provided) => ({ ...provided, height: '20px', paddingTop: '0', paddingBottom: '0', }),
  singleValue: (provided) => ({ ...provided, }),
  input: (provided) => ({ ...provided, width: "100%", justifyContent: "left" }),
  option: provided => ({ ...provided, fontSize: "12px", }),
  menu: base => ({ ...base, borderRadius: 0, marginTop: 0, textAlign: "center", }),
  menuList: base => ({ ...base, padding: 0, textAlign: "center", })
};

const styleSelect4 = {
  control: base => ({ ...base, fontSize: "12px", width: "70px", minHeight: "20px", textAlign: "center", borderRadius: "0px", border: 0, borderBottom: "1px solid gray" }),
  dropdownIndicator: (base) => ({ ...base, padding: 0, }),
  clearIndicator: (base) => ({ ...base, padding: 0, }),
  valueContainer: (provided) => ({ ...provided, height: '20px', padding: 0, }),
  singleValue: (provided) => ({ ...provided, }),
  input: (provided) => ({ ...provided, width: "100%", justifyContent: "left" }),
  option: provided => ({ ...provided, fontSize: "12px", }),
  menu: base => ({ ...base, borderRadius: 0, marginTop: 0, textAlign: "center", zIndex: 5 }),
  menuList: base => ({ ...base, padding: 0, textAlign: "center", zIndex: 5 })
};


const initialDataCCommon = {
  HIER1: [],
  HIER2: [],
  HIER3: [],
  WH: [],
  SUPPLIER: [],
  SUPPLIER_SITE: [],
  PACK_NO: [],
  ITEM_PARENT: [],
  DIFF_ID: [],
  SKU: [],
  ITEM_LIST: [],
  VPN: [],
  UDA: [],
  UDA_VALUE: [],
  EXCLUDE_UDA: [],
  EXCLUDE_UDA_VALUE: [],
  ITEM_GRANDPARENT: [],
  CLEARANCE_IND: "NULL",
  RECALC_IND: "NULL",
  PO: [],
  ASN: [],
  TSF: [],
  PO_TYPE: "",
  START_DATE: "",
  END_DATE: "",
  EISD_START_DATE: "",
  EISD_END_DATE: "",
  MIN_AVAIL_QTY: "",
  MAX_AVAIL_QTY: "",
  PACK_IND: "N",
}

const initialDataPO = {
  WHATIF_SOURCE_TYPE_IND: 0,
  WH_SOURCE_TYPE_IND: 0,
  TSF_SOURCE_TYPE_IND: 0,
  PO_SOURCE_TYPE_IND: 1,
  ASN_SOURCE_TYPE_IND: 0,

}

const initialDataWH = {
  WHATIF_SOURCE_TYPE_IND: 0,
  WH_SOURCE_TYPE_IND: 1,
  TSF_SOURCE_TYPE_IND: 0,
  PO_SOURCE_TYPE_IND: 0,
  ASN_SOURCE_TYPE_IND: 0,

}

const initialDataASN = {
  WHATIF_SOURCE_TYPE_IND: 0,
  WH_SOURCE_TYPE_IND: 0,
  TSF_SOURCE_TYPE_IND: 0,
  PO_SOURCE_TYPE_IND: 0,
  ASN_SOURCE_TYPE_IND: 1,
}

const initialDataTSF = {
  WHATIF_SOURCE_TYPE_IND: 0,
  WH_SOURCE_TYPE_IND: 0,
  TSF_SOURCE_TYPE_IND: 1,
  PO_SOURCE_TYPE_IND: 0,
  ASN_SOURCE_TYPE_IND: 0,
}

const initialDataWHATIF = {
  WHATIF_SOURCE_TYPE_IND: 1,
  WH_SOURCE_TYPE_IND: 0,
  TSF_SOURCE_TYPE_IND: 0,
  PO_SOURCE_TYPE_IND: 0,
  ASN_SOURCE_TYPE_IND: 0,
}


const options = [
  // { value: "None" },
  { value: "Purchase Order" },
  { value: "Warehouse" },
  { value: "ASN" },
  { value: "Transfer" },
  { value: "Pre Buy" },
];

const optionsHoldback = [
  // { value: "None" },
  { CODE_DESC: "PCT ", CODE: "P" },
  { CODE_DESC: "Unit ", CODE: "U" },
];

const optionssom = [
  // { value: "None" },
  { CODE_DESC: "Each", CODE: "E" },
  { CODE_DESC: "Case", CODE: "C" },
  { CODE_DESC: "Inner", CODE: "I" },
];

const initialCopyValues = {
  HOLDBACK_QTY: "",
  HOLDBACK_TYPE: "",
  AVAIL_QTY: "",
  SOM_TYPE: "",
}
const PackIndOptions = [
  { id: "Y" },
  { id: "N" },
]

const CreateAllocation = ({ screenName, callData, callMode, rlCheck, setCheck, setTabFltrData,
  setTabData, callWksht, setCallWksht, LoadCheckAllcSumm, setLoadCheckAllcSumm,
  setcurrentPageRowsAllSumm, setcurrentPageDataAllSumm, aSMPage }
) => {

  /*
     ####################################
     ######   REACT DATE PICKER    ######
     ####################################
   */


  // Define a CSS class for the shared styles
  const sharedInputClass = {
    fontSize: '12px',
    height: '32px',
    boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
  };
  const sharedInputClassDis = {
    fontSize: '12px',
    height: '32px',
    backgroundColor: "#f0f0f0",
    boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
  };
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [releaseDate, setReleaseDate] = useState(convertDateFormat(new Date().toISOString().slice(0, 10)));
  const handleYearClick = () => {
    setIsYearDropdownOpen(!isYearDropdownOpen);
  };
  function convertDateFormat(dateString) {
    // Create a new Date object using the input date string
    var date = new Date(dateString);

    // Get the date components
    var day = date.getDate();
    var month = date.getMonth() + 1; // Month is zero-based, so add 1
    var year = date.getFullYear() % 100; // Get the last two digits of the year

    // Pad the day and month with leading zeros if necessary
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    // Create the converted date string in the desired format
    var convertedDateString = month + '-' + day + '-' + year;
    //var convertedDateString = year + '-' + month + '-' + day;
    return convertedDateString;
  }

  function convertDateFormat2(dateString) {
    // Create a new Date object using the input date string
    var date = new Date(dateString);

    // Get the date components
    var day = date.getDate();
    var month = date.getMonth() + 1; // Month is zero-based, so add 1
    var year = date.getFullYear() % 100; // Get the last two digits of the year

    // Pad the day and month with leading zeros if necessary
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    // Create the converted date string in the desired format
    // var convertedDateString = month + '-' + day + '-' + year;
    var convertedDateString = date.getFullYear() + '-' + month + '-' + day;
    // //console.log("allocDetails::1:", convertedDateString, day, month, year, date.getFullYear(),dateString)

    return convertedDateString;
  }

  function convertDateFormat1(dateString) {
    // Split the date string into an array
    dateString = convertDateFormat2(dateString);

    var dateArray = dateString.split('-');

    // Rearrange the array elements to the desired format
    //var rearrangedDateArray = [dateArray[1], dateArray[0], '20' + dateArray[2]];
    var rearrangedDateArray = ['20' + dateArray[2], dateArray[0], dateArray[1]];

    // Join the array elements with '-' separator
    var convertedDateString = rearrangedDateArray.join('-');

    return convertedDateString;
  }
  const initialHeaderData = {
    ALLOC_CRITERIA: "",
    CONTEXT: "",
    ALLOC_LEVEL: "",
    ALLOC_TYPE: screenName === "ScheduleAllocation" ? "S" : "A",
    STATUS: "",
    PROMOTION: "",
    CREATE_ID: JSON.parse(localStorage.getItem("userData"))?.username,
    ALLOC_DESC: "",
    RELEASE_DATE: new Date().toISOString().slice(0, 10),
    ALLOC_NO: "",
    ALLOC_LEVEL_CODE: "",
    ALLOC_TYPE_CODE: screenName === "ScheduleAllocation" ? "Scheduled" : "Manual",
    STATUS_CODE: "",
    PROMOTION_CODE: "",
    CONTEXT_CODE: "",
  }
  const [searchDataCCommon, setSearchDataCCommon] = useState(initialDataCCommon);
  const [searchDataCPO, setSearchDataCPO] = useState(initialDataPO);
  const [searchDataCWH, setSearchDataCWH] = useState(initialDataWH);
  const [searchDataCASN, setSearchDataCASN] = useState(initialDataASN);
  const [searchDataCTSF, setSearchDataCTSF] = useState(initialDataTSF);
  const [searchDataCWHATIF, setSearchDataCWHATIF] = useState(initialDataWHATIF);
  const [isSearch, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [tabledata, setTabledata] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('SR_NO');
  const [selected, setSelected] = React.useState([{}]);
  const [searchHeaderData, setSearchHeaderData] = useState(initialHeaderData);
  const [headerDis, setHeaderDis] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [allocDetails, setAllocDetails] = useState([]);
  const [allocDetailsData, setAllocDetailsData] = useState([]);
  const [sampleVal, setSampleVal] = useState([])
  const [tab, setTab] = React.useState('1');

  const [isValidCTEDF, setIsValidCTEDF] = useState(false);
  const [isValidCTNDF, setIsValidCTNDF] = useState(false);
  const [isValidCTEDT, setIsValidCTEDT] = useState(false);
  const [isValidCTNDT, setIsValidCTNDT] = useState(false);
  const [isGreatCTEDF, setIsGreatCTEDF] = useState(false);
  const [isGreatCTNDF, setIsGreatCTNDF] = useState(false);
  const [isGreatCTEDT, setIsGreatCTEDT] = useState(false);
  const [isGreatCTNDT, setIsGreatCTNDT] = useState(false);

  ///////////////////////////////////////////
  ///Filter and Copy DATA //
  ////////////////////////////////////

  const [inputValue, setInputValue] = useState({});
  const [inputValue1, setInputValue1] = useState({});
  const [sampleVal1, setSampleVal1] = useState([]);
  const [copyValue, setCopyValue] = useState(initialCopyValues);
  const [LockCheck, setLockCheck] = useState(false);


  ///////////////////////////////////////////
  ///API WEB SERVICE DATA //
  ////////////////////////////////////

  const [warehouseData, setWarehouseData] = useState([{}]);
  const [supplierData, setSupplierData] = useState([{}]);
  const [supplerSiteData, setSupplerSiteData] = useState([{}]);
  const [packNoData, setPackNoData] = useState([{}]);
  const [diffData, setDIffData] = useState([{}]);
  const [skuData, setSkuData] = useState([{}]);
  const [itemListHeadData, setItemListHeadData] = useState([{}]);
  const [vpnData, setVpnData] = useState([{}]);
  const [udaData, setUdaData] = useState([{}]);
  const [poData, setPoData] = useState([{}]);
  const [poTypeData, setPoTypeData] = useState([{}]);
  const [hierData, setHierData] = useState([{}]);
  const [hier2Data, setHier2Data] = useState([{}]);
  const [hier3Data, setHier3Data] = useState([{}]);
  const [excludeUdaData, setExcludeUdaData] = useState([{}]);
  const [allocLevelData, setAllocLevelData] = useState([{}]);
  const [allocTypeData, setAllocTypeData] = useState([{}]);
  const [contextTypeData, setContextTypeData] = useState([{}]);
  const [promotionData, setPromotionData] = useState([{}]);
  const [statusData, setStatusData] = useState([{}]);
  const [asnData, setAsnData] = useState([{}]);
  const [tsfData, setTsfData] = useState([{}]);
  const [criteriaData, setCriteriaData] = useState([{}]);
  const [itemParentData, setItemParentData] = useState([{}]);
  const [allocNoData, setAllocNoData] = useState([]);
  const [statusCreateDataCheck, setStatusCreateDataCheck] = useState(false);
  const [availQty, setAvailQty] = useState([]);
  const [availSearch, setAvailSearch] = useState([]);
  const [valAvailQty, setValAvailQty] = useState([]);

  const [openAvailDialog, setOpenAvailDialog] = React.useState(false);
  const [availCheck, setAvailCheck] = useState(false);
  const [totalAvailQty, setTotalAvailQty] = useState(0)
  const [UpdateSelIndCreate, setUpdateSelIndCreate] = useState([{}]);
  const [deleteCreateGrid, setDeleteCreateGrid] = useState([]);
  const [CreateRefreshGridGrid, setCreateRefreshGridGrid] = useState([]);
  const [isValidQtyLimits, setIsValidQtyLimits] = useState(false);
  const [splitCreateFunction, setSplitCreateFunction] = useState([]);


  ///////////////////////////////////////////
  ///CRITERIA PURCHASE ORDER//
  ////////////////////////////////////

  const [inputHIER1CCommon, setInputHIER1CCommon] = useState("");
  const [inputHIER2CCommon, setInputHIER2CCommon] = useState("");
  const [inputHIER3CCommon, setInputHIER3CCommon] = useState("");
  const [inputITEM_PARENTCCommon, setInputITEM_PARENTCCommon] = useState("");
  const [valHIER1CCommon, setValHIER1CCommon] = useState([]);
  const [valHIER2CCommon, setValHIER2CCommon] = useState([]);
  const [valHIER3CCommon, setValHIER3CCommon] = useState([]);
  const [valITEM_PARENTCCommon, setValITEM_PARENTCCommon] = useState([]);
  const [inputWHCCommon, setInputWHCCommon] = useState("");
  const [valWHCCommon, setValWHCCommon] = useState([]);
  const [inputSUPPLIERCCommon, setInputSUPPLIERCCommon] = useState("");
  const [valSUPPLIERCCommon, setValSUPPLIERCCommon] = useState([]);
  const [inputSUPPLIER_SITECCommon, setInputSUPPLIER_SITECCommon] = useState("");
  const [valSUPPLIER_SITECCommon, setValSUPPLIER_SITECCommon] = useState([]);
  const [inputPACK_NOCCommon, setInputPACK_NOCCommon] = useState("");
  const [valPACK_NOCCommon, setValPACK_NOCCommon] = useState([]);
  const [inputDIFF_IDCCommon, setInputDIFF_IDCCommon] = useState("");
  const [valDIFF_IDCCommon, setValDIFF_IDCCommon] = useState([]);
  const [inputSKUCCommon, setInputSKUCCommon] = useState("");
  const [valSKUCCommon, setValSKUCCommon] = useState([]);
  const [inputITEM_LISTCCommon, setInputITEM_LISTCCommon] = useState("");
  const [valITEM_LISTCCommon, setValITEM_LISTCCommon] = useState([]);
  const [inputVPNCCommon, setInputVPNCCommon] = useState("");
  const [valVPNCCommon, setValVPNCCommon] = useState([]);
  const [inputUDACCommon, setInputUDACCommon] = useState("");
  const [valUDACCommon, setValUDACCommon] = useState([]);
  const [inputUDA_VALUECCommon, setInputUDA_VALUECCommon] = useState("");
  const [valUDA_VALUECCommon, setValUDA_VALUECCommon] = useState([]);
  const [filterUDAValueCCommon, setFilterUDAValueCCommon] = useState([]);
  const [inputEXCLUDE_UDACCommon, setInputEXCLUDE_UDACCommon] = useState("");
  const [valEXCLUDE_UDACCommon, setValEXCLUDE_UDACCommon] = useState([]);
  const [filterEXCLUDE_UDAValueCCommon, setFilterEXCLUDE_UDAValueCCommon] = useState([]);
  const [inputEXCLUDE_UDA_VALUECCommon, setInputEXCLUDE_UDA_VALUECCommon] = useState("");
  const [valEXCLUDE_UDA_VALUECCommon, setValEXCLUDE_UDA_VALUECCommon] = useState([]);
  const [submitListCount, setSubmitListCount] = useState(0)
  const [submitListCheck, setSubmitListCheck] = useState(false)
  const [inputPOCPO, setInputPOCPO] = useState("");
  const [valPOCPO, setValPOCPO] = useState([]);
  const [inputPO_TYPECPO, setInputPO_TYPECPO] = useState("");
  const [valPO_TYPECPO, setValPO_TYPECPO] = useState([]);

  const [inputASNCASN, setInputASNCASN] = useState("");
  const [valASNCASN, setValASNCASN] = useState([]);

  const [inputTSFCTSF, setInputTSFCTSF] = useState("");
  const [valTSFCTSF, setValTSFCTSF] = useState([]);

  const [tabCond, setTabCond] = useState(false);
  const [rTabCond, setRTabCond] = useState(false);
  const [disCond, setDisCond] = useState(0);
  const [switchVal, setSwitchVal] = useState(0);
  const [switchTab, setswitchTab] = useState([]);
  const [limData, setLIMData] = useState([]);

  //SCHEDULE
  const [open_Schdl, setOpen_Schdl] = useState(false);

  const [valAD, setValAD] = useState(false);
  const [adSwtich, setADSwitch] = useState(0);
  const [open_ErrReport, setOpen_ErrReport] = useState(false);
  const [releaseDateCheck, setReleaseDateCheck] = useState(false);
  // ERROR REPORT DATA
  const [errReportData, setErrReportData] = useState([])
  // SCHEDULE RETRIEVE
  const [schdlData, setSchdlData] = useState([]);
  const [OkScheduleCheck, setOkScheduleCheck] = useState(false);
  //LIM switching condition
  const [limCheck, setLimCheck] = useState(false);

  //RL Screen
  const [rtvrldata, setrtvrldata] = useState([]);

  //Approve Button
  const [ApproveCheck, setApproveCheck] = useState(false);

  //Calculation Button
  const [CalcCheck, setCalcCheck] = useState(false);

  //Worksheet Button
  const [WorksheetCheckDis, setWorksheetCheckDis] = useState(false);
  const [HeaderCheck, setHeaderCheck] = useState(false);

  // Error popup message
  const [openDialog, setOpenDialog] = useState(false);
  const [DialogData, setDialogData] = useState("");

  // Manage columns popup in Table Grid
  const [openDialogManage, setOpenDialogManage] = useState(false);

  //ALLOC SUMMARY
  const [switchASM, setSwitchASM] = useState([]);
  const [swtBkAsm, setSwtBkAsm] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  ///////////////////////////////////////////
  ///CRITERIA WAREHOUSE//
  ////////////////////////////////////
  const [adData, setADData] = useState([]);
  const [packADData, setPackADData] = useState([])
  const [selectedCriteria, setSelectedCriteria] = useState({});

  // **** Selected Data ****
  const [selData, setSelData] = useState([]);
  //Split button function
  const [selSplitData, setSelSplitData] = useState([]);
  const [selectedSplit, setSelectedSplit] = React.useState([]);
  const [selectedSizeProfile, setSelectedSizeProfile] = React.useState([]);
  const [selectedSubsInd, setSelectedSubsInd] = React.useState([]);
  const [selectedInvInd, setSelectedInvInd] = React.useState([]);
  const [selectedPackInd, setSelectedPackInd] = React.useState([]);

  ////
  const [openWH, setOpenWH] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [availValCheck, setAvailValCheck] = useState("");

  // Multi PO popup
  const [openMultiPO, setOpenMultiPO] = React.useState(false);
  const [inputMultiPO, setInputMultiPO] = useState({});
  const [MultiPOData, setMultiPOData] = useState([]);
  const [TableMultiPOData, setTableMultiPOData] = useState([]);
  const [selectedMultiPO, setSelectedMultiPO] = useState([]);

  // Validation in create screen.

  const [ValidRLCheckData, setValidRLCheckData] = useState([]); // To check the data in RL screen
  const [ValidQtyTabCheck, setValidQtyTabCheck] = useState(true); // For Enabling and Disabling QL screen
  const [ValidCalculateTabCheck, setValidCalculateTabCheck] = useState(true); // For Enabling and Disabling Calculation Tab
  const [calculateFunctionCall, setCalculateFunctionCall] = useState(false); // Calculation calling function
  const [ValidCalculateDataCheck, setValidCalculateDataCheck] = useState(false); // After the calculation, checking calc qty .For Enabling and Disabling the Approve Tab
  const [ValidReserveDataCheck, setValidReserveDataCheck] = useState(false); // For Enabling and Disabling the Reserve Tab
  const [ValidAllocDetailCheck, setValidAllocDetailCheck] = useState(true);  // For Enabling and Disabling the Alloc details Tab
  const [ValidWhatIfSummCheck, setValidWhatIfSummCheck] = useState(true);  // For Enabling and Disabling the What If Summary details Tab
  const [ValidSizeDetailCheck, setValidSizeDetailCheck] = useState(true);  // For Enabling and Disabling the Size details Tab
  const [ValidWorkSheetCheck, setValidWorkSheetCheck] = useState(false);  // For Enabling and Disabling the Back to WorkSheet Tab
  const [ApproveFreeseCheck, setApproveFreeseCheck] = useState(false); // For Enabling and Disabling the Freese for all button and textfield in all screen
  const [ValidWorkSheetDataCheck, setValidWorkSheetDataCheck] = useState(true);  // For Enabling and Disabling the Alloc header details
  const [ValidWorkSheetApproveCheck, setValidWorkSheetApproveCheck] = useState(true);  // For Enabling and Disabling the Back to WorkSheet Tab while in alloc summary screen

  // Tab Color validations
  const [RLscreenTabColor, setRLscreenTabColor] = useState(true);
  const [LIMscreenTabColor, setLIMscreenTabColor] = useState(true);
  const [QLscreenTabColor, setQLscreenTabColor] = useState(true);
  const [CalculatescreenTabColor, setCalculatescreenTabColor] = useState(true);
  const [SchedulescreenTabColor, setSchedulescreenTabColor] = useState(true);

  const [WhatIfSummscreenTabColor, setWhatIfSummscreenTabColor] = useState(false);
  const [AllocDtlscreenTabColor, setAllocDtlscreenTabColor] = useState(false);
  const [SizeDtlscreenTabColor, setSizeDtlscreenTabColor] = useState(false);

  const [ApprovescreenTabColor, setApprovescreenTabColor] = useState(false);
  const [ReservescreenTabColor, setReservescreenTabColor] = useState(false);
  const [WorksheetscreenTabColor, setWorksheetscreenTabColor] = useState(false);

  const [LoadingAllocSumm, setLoadingAllocSumm] = useState(false);
  const [LoadingAllocSummCheck, setLoadingAllocSummCheck] = useState(false);
  const [pUpLoad, setPUpLoad] = useState(false);
  const [countSplitInd, setCountSplitInd] = useState(0);

  const [isHovered, setHovered] = useState(false);
  const [isExpanded, setExpanded] = useState(false);

  const [isExpanded1, setExpanded1] = useState(true);
  const [isExpanded2, setExpanded2] = useState(true);
  const [isExpanded3, setExpanded3] = useState(true);
  const [isExpanded4, setExpanded4] = useState(false);

  //Pagniation
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const [page, setPage] = React.useState(0);
  const [currentPageData, setcurrentPageData] = useState([]);
  const [currentPageRows, setcurrentPageRows] = useState([]);
  const [allPageSelected, setAllPageSelected] = useState([]);
  const [calcStatus, setCalcStatus] = useState(false);

  const [checkOkWhatIfSummCheck, setCheckOkWhatIfSummCheck] = useState(false);

  const startIndex = page * rowsPerPage;

  var check = false;

  const theme = useTheme();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const CreateAllocationClasses = useStyles();
  const CreateASwal = swalStyles();
  const CreateAllocationData = useSelector(
    (state) => state.CreateAllocationReducers
  );
  const AllocSummaryCreateData = useSelector(
    (state) => state.AllocationSummaryReducers
  );
  const ADPackCreateData = useSelector(
    (state) => state.AllocDPkReducers
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = screenName === "ScheduleAllocation" ? 'Schedule Allocation' : 'Standard Allocation';
  }, []);


  var valPost = [];

  useEffect(() => {
    setLoading(true);
    if (typeof callMode === "undefined") {
      if (!check) {
        dispatch(getALLOCNORequest([{}]));
        dispatch(getHIERRequest([{}]));
        dispatch(getALLOC_LEVELRequest([{}]));
        dispatch(getALLOC_TYPERequest([{}]));
        dispatch(getCONTEXT_TYPERequest([{}]));
        dispatch(getPROMOTIONRequest([{}]));
        dispatch(getSTATUSRequest([{}]));
        check = true
      }
      else {
        dispatch(getWarehouseRequest([{}]));
        dispatch(getSUPPLIERRequest([{}]));
        dispatch(getSUPPLIERSITERequest([{}]));
        dispatch(getITEM_LIST_HEADRequest([{}]));
        dispatch(getPORequest([{}]));
        dispatch(getPO_TYPERequest([{}]));
        dispatch(getASNRequest([{}]));
        dispatch(getTSFRequest([{}]));
        dispatch(getALLOC_CRITERIARequest([{}]));
        dispatch(getPACKNORequest([{}]));
      }
      setTotalData([]);
    } else if (callMode === "VIEW") {
      if (LoadCheckAllcSumm) { setLoadingAllocSummCheck(true) }
      setTotalData([]);
      setOpen_Schdl(false);
      setAllocNoData({ "ALLOC_NO": callData[0].ALLOC_NO });
      dispatch(getALLOCHEADDETAILSRequest([{ "ALLOC_NO": callData[0].ALLOC_NO }]));
      setAllocDetails([]);
      dispatch(postCREATEGRIDDFRequest([{ "ALLOC_NO": callData[0].ALLOC_NO }])); // asy akhil
      // dispatch(postAPPROVEVALIDFUNCTIONRequest([{ "ALLOC_NO": callData[0].ALLOC_NO }]));// asy akhil
      dispatch(postVALIDRLCHECKDATARequest([{ "ALLOC_NO": callData[0].ALLOC_NO }]));
      dispatch(getALLOC_LEVELRequest([{}]));
      dispatch(getALLOC_TYPERequest([{}]));
      dispatch(getCONTEXT_TYPERequest([{}]));
      dispatch(getPROMOTIONRequest([{}]));
      dispatch(getSTATUSRequest([{}]));
      setApproveFreeseCheck(true);
      setIsLoading(true);

    } else if (callMode === "EDIT") {
      if (LoadCheckAllcSumm) { setLoadingAllocSummCheck(true) }
      setTotalData([]);
      setOpen_Schdl(false);
      setAllocNoData({ "ALLOC_NO": callData[0].ALLOC_NO });
      dispatch(getALLOCHEADDETAILSRequest([{ "ALLOC_NO": callData[0].ALLOC_NO }]));
      setAllocDetails([]);
      dispatch(postCREATEGRIDDFRequest([{ "ALLOC_NO": callData[0].ALLOC_NO }])); // asy akhil
      // dispatch(postAPPROVEVALIDFUNCTIONRequest([{ "ALLOC_NO": callData[0].ALLOC_NO }]));// asy akhil
      dispatch(postVALIDRLCHECKDATARequest([{ "ALLOC_NO": callData[0].ALLOC_NO }]));
      dispatch(getWarehouseRequest([{}]));
      dispatch(getSUPPLIERRequest([{}]));
      dispatch(getSUPPLIERSITERequest([{}]));
      dispatch(getITEM_LIST_HEADRequest([{}]));
      dispatch(getPORequest([{}]));
      dispatch(getPO_TYPERequest([{}]));
      dispatch(getPACKNORequest([{}]));
      dispatch(getASNRequest([{}]));
      dispatch(getTSFRequest([{}]));
      dispatch(getALLOC_CRITERIARequest([{}]));
      dispatch(getHIERRequest([{}]));
      dispatch(getALLOC_LEVELRequest([{}]));
      dispatch(getALLOC_TYPERequest([{}]));
      dispatch(getCONTEXT_TYPERequest([{}]));
      dispatch(getPROMOTIONRequest([{}]));
      dispatch(getSTATUSRequest([{}]));
      //setApproveFreeseCheck(true)
      setIsLoading(true);
      // setIsValidQtyLimits(true);
    }

  }, [""]);

  if (OkScheduleCheck) {
    setIsLoading(true);
    dispatch(getALLOCHEADDETAILSRequest([{ "ALLOC_NO": searchHeaderData.ALLOC_NO }]));
    setAllocDetails([]);
    setOkScheduleCheck(false);
    setValidWorkSheetDataCheck(true);
  }

  useEffect(() => {
    if (allocDetails.length > 0 && ValidWorkSheetDataCheck) {
      // //console.log("allocDetails: ", allocDetails, convertDateFormat(allocDetails[0].RELEASE_DATE), convertDateFormat2("06-28-23"));
      if (allocDetails[0].ALLOC_CRITERIA === "P") {
        setSelectedCriteria((prev) => { return { ...prev, ALLOC_CRITERIA: "Purchase Order" } })
        setSearchHeaderData((prev) => { return { ...prev, ALLOC_CRITERIA: "Purchase Order" } })
      }
      if (allocDetails[0].ALLOC_CRITERIA === "W") {
        setSelectedCriteria((prev) => { return { ...prev, ALLOC_CRITERIA: "Warehouse" } })
        setSearchHeaderData((prev) => { return { ...prev, ALLOC_CRITERIA: "Warehouse" } })
      }
      if (allocDetails[0].ALLOC_CRITERIA === "T") {
        setSelectedCriteria((prev) => { return { ...prev, ALLOC_CRITERIA: "Transfer" } })
        setSearchHeaderData((prev) => { return { ...prev, ALLOC_CRITERIA: "Transfer" } })
      }
      if (allocDetails[0].ALLOC_CRITERIA === "A") {
        setSelectedCriteria((prev) => { return { ...prev, ALLOC_CRITERIA: "ASN" } })
        setSearchHeaderData((prev) => { return { ...prev, ALLOC_CRITERIA: "ASN" } })
      }
      if (allocDetails[0].ALLOC_CRITERIA === "F") {
        setSelectedCriteria((prev) => { return { ...prev, ALLOC_CRITERIA: "Pre Buy" } })
        setSearchHeaderData((prev) => { return { ...prev, ALLOC_CRITERIA: "Pre Buy" } })
      }

      setSearchHeaderData((prev) => {
        return {
          ...prev,
          // ALLOC_CRITERIA: allocDetails[0].ALLOC_CRITERIA,
          CONTEXT: allocDetails[0].CONTEXT_CODE,
          ALLOC_LEVEL: allocDetails[0].ALLOC_LEVEL_CODE,
          ALLOC_TYPE: allocDetails[0].ALLOC_TYPE_CODE,
          STATUS: String(allocDetails[0].STATUS_CODE),
          PROMOTION: allocDetails[0].PROMOTION,
          CREATE_ID: allocDetails[0].ALLOCATOR,
          ALLOC_DESC: allocDetails[0].ALLOC_DESC,
          RELEASE_DATE: convertDateFormat2(allocDetails[0].RELEASE_DATE),//new Date().toISOString().slice(0, 10),
          ALLOC_NO: allocDetails[0].ALLOC_NO,
          ALLOC_LEVEL_CODE: allocDetails[0].ALLOC_LEVEL,
          ALLOC_TYPE_CODE: allocDetails[0].ALLOC_TYPE,
          STATUS_CODE: allocDetails[0].STATUS,
          PROMOTION_CODE: allocDetails[0].PROMOTION,
          CONTEXT_CODE: allocDetails[0].CONTEXT,
        };
      })
      if (allocDetails[0].STATUS_CODE === "POC") {
        setApproveFreeseCheck(true);
      }
      setReleaseDate(convertDateFormat(allocDetails[0].RELEASE_DATE)); //yyyy-mm-dd
      setIsLoading(false);
      setAllocDetails([]);
      setValidWorkSheetDataCheck(false);
    }
  })

  useEffect(() => {
    setIsLoading(true);
    // setLoading(true);
    if (allocDetails.length > 0 && (callMode === "EDIT") && ValidWorkSheetApproveCheck) {
      if (allocDetails[0].ALLOC_CRITERIA === "P") {
        setSelectedCriteria((prev) => { return { ...prev, ALLOC_CRITERIA: "Purchase Order" } })
        setSearchHeaderData((prev) => { return { ...prev, ALLOC_CRITERIA: "Purchase Order" } })
      }
      if (allocDetails[0].ALLOC_CRITERIA === "W") {
        setSelectedCriteria((prev) => { return { ...prev, ALLOC_CRITERIA: "Warehouse" } })
        setSearchHeaderData((prev) => { return { ...prev, ALLOC_CRITERIA: "Warehouse" } })
      }
      if (allocDetails[0].ALLOC_CRITERIA === "T") {
        setSelectedCriteria((prev) => { return { ...prev, ALLOC_CRITERIA: "Transfer" } })
        setSearchHeaderData((prev) => { return { ...prev, ALLOC_CRITERIA: "Transfer" } })
      }
      if (allocDetails[0].ALLOC_CRITERIA === "A") {
        setSelectedCriteria((prev) => { return { ...prev, ALLOC_CRITERIA: "ASN" } })
        setSearchHeaderData((prev) => { return { ...prev, ALLOC_CRITERIA: "ASN" } })
      }
      if (allocDetails[0].ALLOC_CRITERIA === "F") {
        setSelectedCriteria((prev) => { return { ...prev, ALLOC_CRITERIA: "Pre Buy" } })
        setSearchHeaderData((prev) => { return { ...prev, ALLOC_CRITERIA: "Pre Buy" } })
      }
      setOpen_Schdl(false);
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          // ALLOC_CRITERIA: allocDetails[0].ALLOC_CRITERIA,
          CONTEXT: allocDetails[0].CONTEXT_CODE,
          ALLOC_LEVEL: allocDetails[0].ALLOC_LEVEL_CODE,
          ALLOC_TYPE: allocDetails[0].ALLOC_TYPE_CODE,
          STATUS: String(allocDetails[0].STATUS_CODE),
          PROMOTION: allocDetails[0].PROMOTION,
          CREATE_ID: allocDetails[0].ALLOCATOR,
          ALLOC_DESC: allocDetails[0].ALLOC_DESC,
          RELEASE_DATE: convertDateFormat2(allocDetails[0].RELEASE_DATE),//new Date().toISOString().slice(0, 10),
          ALLOC_NO: allocDetails[0].ALLOC_NO,
          ALLOC_LEVEL_CODE: allocDetails[0].ALLOC_LEVEL,
          ALLOC_TYPE_CODE: allocDetails[0].ALLOC_TYPE,
          STATUS_CODE: allocDetails[0].STATUS,
          PROMOTION_CODE: allocDetails[0].PROMOTION,
          CONTEXT_CODE: allocDetails[0].CONTEXT,
        };
      })
      setReleaseDate(convertDateFormat(allocDetails[0].RELEASE_DATE)); //yyyy-mm-dd
      const currentDate = new Date().toISOString().slice(0, 10);
      if (allocDetails[0].CALC_ITEM_COUNT === 0) {
        setValidAllocDetailCheck(true); // Disabling the Alloc Details Tab
        setValidWhatIfSummCheck(true); // Disabling the What If Summary Tab
        setValidSizeDetailCheck(true); // Disabling the Size Details Tab
        setValidCalculateDataCheck(false); // Disabling the Approve Tab
        setValidReserveDataCheck(false); // Disabling the Reserve Tab
        setValidWorkSheetCheck(false); // Disabling the Back to WorkSheet Tab
        if (allocDetails[0].STATUS_CODE === "SCHD") {
          setValidCalculateTabCheck(true);  // Disabling the Calculate Tab
          setSchedulescreenTabColor(true); //Tab color changing to red for Schedule screen
        } else {
          setValidCalculateTabCheck(false);  // Enabling the Calculate Tab
        }
      }
      if (allocDetails[0].CALC_ITEM_COUNT === 1) {
        if (allocDetails[0].STATUS_CODE === "WS") {
          if (convertDateFormat2(allocDetails[0].RELEASE_DATE) >= currentDate) {
            if (allocDetails[0].RECALC_IND === "N" && allocDetails[0].ALLOC_CRITERIA !== 'F') {
              setValidCalculateDataCheck(true); // Enabling the Approve Tab
              setValidReserveDataCheck(true); // Enabling the Reserve Tab
            } else {
              setValidCalculateDataCheck(false); // Disabling the Approve Tab
              setValidReserveDataCheck(false); // Disabling the Reserve Tab
            }
          }
          setWhatIfSummscreenTabColor(false);
          setAllocDtlscreenTabColor(false);
          setSizeDtlscreenTabColor(false);
          setValidCalculateTabCheck(false);  // Enabling the Calculate Tab
          setValidWorkSheetCheck(false); // Disabling the Back to WorkSheet Tab
        } else if (allocDetails[0].STATUS_CODE === "APV") {
          setApproveFreeseCheck(true);  // Enabling the Freese for all button and textfield in all screen
          if (ValidWorkSheetDataCheck) { setValidWorkSheetCheck(true); } // Enabling the Back to WorkSheet Tab
          setValidCalculateTabCheck(true);  // Disabling the Calculate Tab
          setValidCalculateDataCheck(false); // Disabling the Approve Tab
          setValidReserveDataCheck(false); // Disabling the Reserve Tab
          setWhatIfSummscreenTabColor(true);
          setAllocDtlscreenTabColor(true);
          setSizeDtlscreenTabColor(true);
          setApprovescreenTabColor(true);
        } else if (allocDetails[0].STATUS_CODE === "RSV") {
          setValidReserveDataCheck(false); // Disabling the Reserve Tab
          setValidCalculateDataCheck(true); // Enabling the Approve Tab
          setApproveFreeseCheck(true);  // Enabling the Freese for all button and textfield in all screen
          if (ValidWorkSheetDataCheck) { setValidWorkSheetCheck(true); } // Enabling the Back to WorkSheet Tab
          setValidCalculateTabCheck(true);  // Disabling the Calculate Tab
          setWhatIfSummscreenTabColor(true);
          setAllocDtlscreenTabColor(true);
          setSizeDtlscreenTabColor(true);
          setReservescreenTabColor(true);
        }
        setValidAllocDetailCheck(false); // Enabling the Alloc Details Tab
        if (allocDetails[0].ALLOC_LEVEL_CODE === "D") { setValidSizeDetailCheck(false); } // Enabling the Size Details Tab
        else if (allocDetails[0].ALLOC_LEVEL_CODE === "T") { setValidSizeDetailCheck(true); } // Disabling the Size Details Tab
        if (allocDetails[0].ALLOC_CRITERIA === "F") { setValidWhatIfSummCheck(false); } // Enabling the What If Summary Tab
        else { setValidWhatIfSummCheck(true); } // Disabling the What If Summary Tab
      }
      if (allocDetails[0].STATUS_CODE === "POC") {
        setApproveFreeseCheck(true);
      }
      setAllocDetails([]);
      setValidWorkSheetApproveCheck(false);

    } else if (allocDetails.length > 0 && (callMode === "VIEW")) {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          // ALLOC_CRITERIA: allocDetails[0].ALLOC_CRITERIA,
          CONTEXT: allocDetails[0].CONTEXT_CODE,
          ALLOC_LEVEL: allocDetails[0].ALLOC_LEVEL_CODE,
          ALLOC_TYPE: allocDetails[0].ALLOC_TYPE_CODE,
          STATUS: allocDetails[0].STATUS_CODE,
          PROMOTION: allocDetails[0].PROMOTION,
          CREATE_ID: allocDetails[0].ALLOCATOR,
          ALLOC_DESC: allocDetails[0].ALLOC_DESC,
          RELEASE_DATE: convertDateFormat2(allocDetails[0].RELEASE_DATE),//new Date().toISOString().slice(0, 10),
          ALLOC_NO: allocDetails[0].ALLOC_NO,
          ALLOC_LEVEL_CODE: allocDetails[0].ALLOC_LEVEL,
          ALLOC_TYPE_CODE: allocDetails[0].ALLOC_TYPE,
          STATUS_CODE: allocDetails[0].STATUS,
          PROMOTION_CODE: allocDetails[0].PROMOTION,
          CONTEXT_CODE: allocDetails[0].CONTEXT,
        };
      })
      setReleaseDate(convertDateFormat(allocDetails[0].RELEASE_DATE)); //yyyy-mm-dd
      setOpen_Schdl(false);
      setValidCalculateTabCheck(true);
      setValidCalculateDataCheck(false);
      setValidReserveDataCheck(false);
      setValidWorkSheetCheck(false)
      if (allocDetails[0].CALC_ITEM_COUNT === 1) {
        setWhatIfSummscreenTabColor(false);
        setAllocDtlscreenTabColor(false);
        setSizeDtlscreenTabColor(false);
        setValidAllocDetailCheck(false); // Enabling the Alloc Details Tab
        if (allocDetails[0].ALLOC_LEVEL_CODE === "D") { setValidSizeDetailCheck(false); } // Enabling the Size Details Tab
        else if (allocDetails[0].ALLOC_LEVEL_CODE === "T") { setValidSizeDetailCheck(true); } // Disabling the Size Details Tab
        if (allocDetails[0].ALLOC_CRITERIA === "F") { setValidWhatIfSummCheck(false); } // Enabling the What If Summary Tab
        else { setValidWhatIfSummCheck(true); } // Disabling the What If Summary Tab
      } else if (allocDetails[0].CALC_ITEM_COUNT === 0) {
        setValidAllocDetailCheck(true); // Disabling the Alloc Details Tab
        setValidWhatIfSummCheck(true); // Disabling the What If Summary Tab
        setValidSizeDetailCheck(true); // Disabling the Size Details Tab
        setValidCalculateDataCheck(false); // Disabling the Approve Tab
        setValidReserveDataCheck(false); // Disabling the Reserve Tab
        setValidCalculateTabCheck(true);  // Disabling the Calculate Tab
        setValidWorkSheetCheck(false); // Disabling the Back to WorkSheet Tab
      }
      if (allocDetails[0].STATUS_CODE === "POC") {
        setApproveFreeseCheck(true);
      }
      // setAllocDetails([]);
    }
    setIsLoading(false);
  }, [allocDetails]);

  ////console.log('CreateAllocationData: ', [{ ...searchDataCCommon, ...searchHeaderData }], statusData.filter(obj => searchHeaderData?.STATUS === obj.CODE));

  const serializedata = (datatable) => {
    let newTabledata = [];
    let count = 1;
    if (datatable.length > 0) {
      datatable.map(item => {
        item['SR_NO'] = count;
        const reorder = {
          'ALLOC_NO': [],
          'ALLOC_CRITERIA': [],
          'SPLIT_IND': [],
          'ALLOC_TYPE': [],
          'CREATE_ID': [],
          'CREATE_DATETIME': [],
          'ITEM': [],
          'ITEM_DESC': [],
          'DIFF_ID': [],
          'HIER1': [],
          'HIER2': [],
          'HIER3': [],
          'LOC': [],
          'AVAIL_QTY': [],
          'CLEARANCE_IND': [],
          'REF_1': [],
          'VPN': [],
          'INACTIVE_QTY': [],
          'HOLDBACK_QTY': [],
          // 'HOLDBACK_TYPE': [],
        }
        count++;

        let test = Object.assign(reorder, item);
        newTabledata.push(test);
      })
      // setTabledataclone(newTabledata)
      return newTabledata;
    }
  }

  const serializedata1 = (datatable) => {
    let newTabledata = [];
    let count = 1;
    if (datatable.length > 0) {
      datatable.map(item => {
        item['SR_NO'] = count;
        const reorder = {
          'ALLOC_NO': "",
          'COMMENT_DESC': "",
          'ESTIMATED_INSTOCK_DATE': "",
          'LOCATION': "",
          'ORDER_NO': "",
          'SEL_IND': "",
          'SUPPLIER': "",
        }
        count++;

        let test = Object.assign(reorder, item);
        newTabledata.push(test);
      })
      // setTabledataclone(newTabledata)
      return newTabledata;
    }
  }
  // if (LoadingAllocSummCheck) {
  //   if (callMode === "VIEW" || callMode === "EDIT") { setLoadCheckAllcSumm(false); }
  // }
  // if (LoadingAllocSumm) {
  //   if (callMode === "VIEW" || callMode === "EDIT") { setLoadCheckAllcSumm(false); }
  //   setLoadingAllocSumm(false);
  // }

  useEffect(() => {
    if (CreateAllocationData?.data?.totalData && Array.isArray(CreateAllocationData?.data?.totalData)) {
      if (CreateAllocationData?.data?.totalData.length > 0) {
        setHeaderDis(true);
        setTotalData([]);
        setTabledata(serializedata(CreateAllocationData?.data?.totalData));
        setAllData(serializedata(CreateAllocationData?.data?.totalData));
        setTotalData(serializedata(CreateAllocationData?.data?.totalData));
        if (calcStatus) {
          setCalcStatus(false);
          setPage(0);
          const data = serializedata(CreateAllocationData?.data?.totalData)

          const result = data.reduce((acc, obj) => {
            const groupIndex = Math.floor((obj.SR_NO - 1) / 30); // Calculate the group index based on SR_NO
            if (!acc[groupIndex]) {
              acc[groupIndex] = { [groupIndex]: [] }; // Create a new group object if it doesn't exist
            }
            acc[groupIndex][groupIndex].push(obj.SR_NO); // Add the SR_NO to the respective group
            return acc;
          }, []);


        }
        setLoading(false);
        setSubmit(false);
        setSearch(false);
        setIsLoading(false);
        setSubmitListCheck(true);
      }
      else {
        setHeaderDis(false);
        setTotalData([]);
        setTabledata([]);
        setAllData([]);
        setIsLoading(false);
      }
      setState({ ...state, right: false });
    }
    else if (CreateAllocationData?.data?.warehouseData && Array.isArray(CreateAllocationData?.data?.warehouseData)
    ) {
      setWarehouseData(CreateAllocationData?.data?.warehouseData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.supplierData &&
      Array.isArray(CreateAllocationData?.data?.supplierData)
    ) {
      setSupplierData(CreateAllocationData?.data?.supplierData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.supplerSiteData &&
      Array.isArray(CreateAllocationData?.data?.supplerSiteData)
    ) {
      setSupplerSiteData(CreateAllocationData?.data?.supplerSiteData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.packNoData &&
      Array.isArray(CreateAllocationData?.data?.packNoData)
    ) {
      setPackNoData(CreateAllocationData?.data?.packNoData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.diffData &&
      Array.isArray(CreateAllocationData?.data?.diffData)
    ) {
      setDIffData(CreateAllocationData?.data?.diffData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.skuData &&
      Array.isArray(CreateAllocationData?.data?.skuData)
    ) {
      setSkuData(CreateAllocationData?.data?.skuData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.itemListHeadData &&
      Array.isArray(CreateAllocationData?.data?.itemListHeadData)
    ) {
      setItemListHeadData(CreateAllocationData?.data?.itemListHeadData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.vpnData &&
      Array.isArray(CreateAllocationData?.data?.vpnData)
    ) {
      setVpnData(CreateAllocationData?.data?.vpnData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.udaData &&
      Array.isArray(CreateAllocationData?.data?.udaData)
    ) {
      setUdaData(CreateAllocationData?.data?.udaData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.poData &&
      Array.isArray(CreateAllocationData?.data?.poData)
    ) {
      setPoData(CreateAllocationData?.data?.poData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.poTypeData &&
      Array.isArray(CreateAllocationData?.data?.poTypeData)
    ) {
      setPoTypeData(CreateAllocationData?.data?.poTypeData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.hierData &&
      Array.isArray(CreateAllocationData?.data?.hierData)
    ) {
      setHierData(CreateAllocationData?.data?.hierData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.hier2Data &&
      Array.isArray(CreateAllocationData?.data?.hier2Data)
    ) {
      setHier2Data(CreateAllocationData?.data?.hier2Data);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.hier3Data &&
      Array.isArray(CreateAllocationData?.data?.hier3Data)
    ) {
      setHier3Data(CreateAllocationData?.data?.hier3Data);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.excludeUdaData &&
      Array.isArray(CreateAllocationData?.data?.excludeUdaData)
    ) {
      setExcludeUdaData(CreateAllocationData?.data?.excludeUdaData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.allocLevelData &&
      Array.isArray(CreateAllocationData?.data?.allocLevelData)
    ) {
      setAllocLevelData(CreateAllocationData?.data?.allocLevelData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.allocTypeData &&
      Array.isArray(CreateAllocationData?.data?.allocTypeData)
    ) {
      setAllocTypeData(CreateAllocationData?.data?.allocTypeData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.contextTypeData &&
      Array.isArray(CreateAllocationData?.data?.contextTypeData)
    ) {
      setContextTypeData(CreateAllocationData?.data?.contextTypeData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.promotionData &&
      Array.isArray(CreateAllocationData?.data?.promotionData)
    ) {
      setPromotionData(CreateAllocationData?.data?.promotionData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.statusData &&
      Array.isArray(CreateAllocationData?.data?.statusData)
    ) {
      setStatusData(CreateAllocationData?.data?.statusData);
      if (typeof callMode === "undefined") { setStatusCreateDataCheck(true) }
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.criteriaData &&
      Array.isArray(CreateAllocationData?.data?.criteriaData)
    ) {
      setCriteriaData(CreateAllocationData?.data?.criteriaData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.itemParentData &&
      Array.isArray(CreateAllocationData?.data?.itemParentData)
    ) {
      setItemParentData(CreateAllocationData?.data?.itemParentData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.asnData &&
      Array.isArray(CreateAllocationData?.data?.asnData)
    ) {
      setAsnData(CreateAllocationData?.data?.asnData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.tsfData &&
      Array.isArray(CreateAllocationData?.data?.tsfData)
    ) {
      setTsfData(CreateAllocationData?.data?.tsfData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.allocNoData
    ) {
      //setAllocNoData(CreateAllocationData?.data?.allocNoData);
      setAllocNoData({ ALLOC_NO: CreateAllocationData?.data?.allocNoData?.ALLOC_NO });
      // setSearchHeaderData((prev) => { return { ...prev, RELEASE_DATE: CreateAllocationData?.data?.allocNoData?.SYSTEM_DATE } })
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.ValidRLCheckData
    ) {
      setValidRLCheckData([]);
      setLoadingAllocSummCheck(false);
      if (CreateAllocationData?.data?.ValidRLCheckData?.status === 200) {
        if (CreateAllocationData?.data?.ValidRLCheckData?.message[0].RL_LOCATIONS === 1 && CreateAllocationData?.data?.ValidRLCheckData?.message[0].RL_RULES === 1) {
          setValidQtyTabCheck(false); // Enabling QL Tab
          setValidCalculateTabCheck(false); // Enabling Calculation Tab
          setValidRLCheckData(CreateAllocationData?.data?.ValidRLCheckData?.message[0].RL_RULE_DATA);
          setRLscreenTabColor(false); //Tab color changing to green for RL screen
        } else {
          setValidQtyTabCheck(true); // Disabling QL Tab
          setValidCalculateTabCheck(true); // Disabling Calculation Tab
          setValidRLCheckData([]);
          setRLscreenTabColor(true); //Tab color changing to red for RL screen
        }
        if (CreateAllocationData?.data?.ValidRLCheckData?.message[0].LIM_DATA_CHECK === 1) { setLIMscreenTabColor(false);/* Tab color changing to green for LIM screen */ }
        else if (CreateAllocationData?.data?.ValidRLCheckData?.message[0].LIM_DATA_CHECK === 0) { setLIMscreenTabColor(true);/* Tab color changing to red for LIM screen */ }
        if (CreateAllocationData?.data?.ValidRLCheckData?.message[0].QL_DATA_CHECK === 1) { setQLscreenTabColor(false);/* Tab color changing to green for QL screen */ }
        else if (CreateAllocationData?.data?.ValidRLCheckData?.message[0].QL_DATA_CHECK === 0) { setQLscreenTabColor(true);/* Tab color changing to red for QL screen */ }
        if (CreateAllocationData?.data?.ValidRLCheckData?.message[0].CALC_ITEM_COUNT === 1) { setCalculatescreenTabColor(false); setQLscreenTabColor(false);/* Tab color changing to green for Calculation screen */ }
        else if (CreateAllocationData?.data?.ValidRLCheckData?.message[0].CALC_ITEM_COUNT === 0) { setCalculatescreenTabColor(true);/* Tab color changing to red for Calculation screen */ }
        if (CreateAllocationData?.data?.ValidRLCheckData?.message[0].ALLOC_HEAD.length > 0) {
          if (CreateAllocationData?.data?.ValidRLCheckData?.message[0].ALLOC_HEAD[0].STATUS === 'WS') { setValidCalculateTabCheck(false); /* Enabling Calculation Tab */ }
          else if (CreateAllocationData?.data?.ValidRLCheckData?.message[0].ALLOC_HEAD[0].STATUS === 'SCHD') { setValidCalculateTabCheck(true); setSchedulescreenTabColor(false); /*Tab color changing to green for Schedule screen*/ }
          else { setValidCalculateTabCheck(true); /* Disabling Calculation Tab */ }
          if (CreateAllocationData?.data?.ValidRLCheckData?.message[0].ALLOC_HEAD[0].RECALC_IND === 'Y') { setCalculatescreenTabColor(true);/* Tab color changing to red for Calculation screen */ }
        }
        if (CreateAllocationData?.data?.ValidRLCheckData?.message[0].SCHEDULE === 1) { setSchedulescreenTabColor(false); /*Tab color changing to green for Schedule screen*/ }
        else if (CreateAllocationData?.data?.ValidRLCheckData?.message[0].SCHEDULE === 0) { setSchedulescreenTabColor(true); /*Tab color changing to red for Schedule screen*/ }
      } else if (CreateAllocationData?.data?.ValidRLCheckData?.status === 500) {
        setValidQtyTabCheck(true); // Disabling QL Tab
        setValidCalculateTabCheck(true); // Disabling Calculation Tab
        setRLscreenTabColor(true); //Tab color changing to red for RL screen
      }
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.availQty &&
      Array.isArray(CreateAllocationData?.data?.availQty)
    ) {
      setAvailQty(CreateAllocationData?.data?.availQty);
      setLoading(false);
      setAvailCheck(true);
    } else if (
      CreateAllocationData?.data?.availSearch &&
      Array.isArray(CreateAllocationData?.data?.availSearch)
    ) {
      setPUpLoad(false);
      setAvailSearch(CreateAllocationData?.data?.availSearch);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.CREATEREFRESHGRID) {
      if (CreateAllocationData?.data?.CREATEREFRESHGRID?.status === 201) {
        setIsLoading(false);
      } else if (CreateAllocationData?.data?.CREATEREFRESHGRID?.status === 500) {
        setOpenDialog(true);
        setDialogData(String(CreateAllocationData?.data?.CREATEREFRESHGRID?.message));
        setIsLoading(false);
      }
    } else if (
      CreateAllocationData?.data?.splitCreateFunction
    ) {
      if (CreateAllocationData?.data?.splitCreateFunction?.status === 200) {
        setSplitCreateFunction(CreateAllocationData?.data?.splitCreateFunction);
        dispatch(postCREATEGRIDDFRequest([allocNoData]));
        setCalcCheck(false);
        setApproveCheck(false);
        setPage(0);
      }
      setOpenDialog(true);
      setDialogData(String(CreateAllocationData?.data?.splitCreateFunction?.message))
      setLoading(false);
      setIsLoading(false);
      setState({ ...state, right: false });
    } else if (
      CreateAllocationData?.data?.switchTab
      // && Array.isArray(CreateAllocationData?.data?.switchTab)
    ) {
      if (CreateAllocationData?.data?.switchTab?.status === 200) {
        if (CreateAllocationData?.data?.switchTab?.message[1] === 1) {
          setTab("2");
        }
        else if (CreateAllocationData?.data?.switchTab?.message[1] === 2) {
          setLIMData(CreateAllocationData?.data?.switchTab?.message[0]);
          setTab("3")
          setLimCheck(false);
          setIsLoading(false);
        }
        else if (CreateAllocationData?.data?.switchTab?.message[1] === 3) {
          setLIMData(CreateAllocationData?.data?.switchTab?.message[0]);
          setTab("4")
          setLimCheck(false);
          setIsLoading(false);
        }
      } else if (CreateAllocationData?.data?.switchTab?.status === 500) {
        setOpenDialog(true);
        setDialogData(String(CreateAllocationData?.data?.switchTab?.message) + ". Please Add the Items again.");
        setTab("1");
        setIsLoading(false);
      }
      CreateAllocationData.data.switchTab.status = 0
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.errRptData
      && Array.isArray(CreateAllocationData?.data?.errRptData)
    ) {
      // const uniErrData =
      //   CreateAllocationData?.data?.errRptData.length > 0
      //     ? [...new Map(CreateAllocationData?.data?.errRptData.map((item) => [item["SOURCE_ITEM"], item])).values()]
      //     : [];
      setErrReportData(CreateAllocationData?.data?.errRptData);
      if ((CreateAllocationData?.data?.errRptData).length > 0) {
        setIsLoading(false);
        setOpen_ErrReport(true);
      }
    } else if (
      CreateAllocationData?.data?.allocDetails
      && Array.isArray(CreateAllocationData?.data?.allocDetails)
    ) {
      setAllocDetails(CreateAllocationData?.data?.allocDetails);
      setAllocDetailsData(CreateAllocationData?.data?.allocDetails);
      if (CreateAllocationData?.data?.allocDetails.length > 0) {
        if (CreateAllocationData?.data?.allocDetails[0].ALLOC_CRITERIA === "P") {
          setSelectedCriteria((prev) => { return { ...prev, ALLOC_CRITERIA: "Purchase Order" } })
        }
        if (CreateAllocationData?.data?.allocDetails[0].ALLOC_CRITERIA === "W") {
          setSelectedCriteria((prev) => { return { ...prev, ALLOC_CRITERIA: "Warehouse" } })
        }
        if (CreateAllocationData?.data?.allocDetails[0].ALLOC_CRITERIA === "T") {
          setSelectedCriteria((prev) => { return { ...prev, ALLOC_CRITERIA: "Transfer" } })
        }
        if (CreateAllocationData?.data?.allocDetails[0].ALLOC_CRITERIA === "A") {
          setSelectedCriteria((prev) => { return { ...prev, ALLOC_CRITERIA: "ASN" } })
        }
        if (CreateAllocationData?.data?.allocDetails[0].ALLOC_CRITERIA === "F") {
          setSelectedCriteria((prev) => { return { ...prev, ALLOC_CRITERIA: "Pre Buy" } })
        }
      }
      // // setValidWorkSheetApproveCheck(true);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.schdlData
      && Array.isArray(CreateAllocationData?.data?.schdlData)
    ) {
      setSchdlData(CreateAllocationData?.data?.schdlData);
      setOpen_Schdl(true);
      setIsLoading(false);
      CreateAllocationData.data.schdlData = 0
    } else if (
      CreateAllocationData?.data?.allocdtlval
      && Array.isArray(CreateAllocationData?.data?.allocdtlval)
    ) {
      setADData(CreateAllocationData?.data?.allocdtlval);
      setValAD(true);
      setDisCond(5);
      setTab("5");
      setIsLoading(true);
      setADSwitch(1);
    } else if (
      CreateAllocationData?.data?.MultiPOData &&
      Array.isArray(CreateAllocationData?.data?.MultiPOData)
    ) {
      if (CreateAllocationData?.data?.MultiPOData.length > 0) {
        setMultiPOData(serializedata1(CreateAllocationData?.data?.MultiPOData));
        setTableMultiPOData(serializedata1(CreateAllocationData?.data?.MultiPOData))
        const po_check_data = searchDataCCommon.PO
        const temp = CreateAllocationData?.data?.MultiPOData.filter((res) => po_check_data.includes(res.ORDER_NO))
        var check_select = []
        temp.map(obj => check_select.push(obj.SR_NO));
        setSelectedMultiPO(check_select);
        setOpenMultiPO(true);
      } else {
        setMultiPOData([]);
        setTableMultiPOData([]);
        setSelectedMultiPO([]);
        setOpenMultiPO(true);
      }
      // setOpenMultiPO(true);
      setIsLoading(false);
      setLoading(false);
    } else {
      setSearch(false);
    }
    if ((CreateAllocationData?.data?.deleteCreateGrid?.status) === 500) {
      setOpenDialog(true);
      setDialogData(String(CreateAllocationData?.data?.deleteCreateGrid?.message))
      CreateAllocationData.data.deleteCreateGrid.status = 0
      setIsLoading(false);
      setState({ ...state, right: false });
    } else if ((CreateAllocationData?.data?.deleteCreateGrid?.status) === 201) {
      setState({ ...state, right: false });
      const combinedList = Object.values(selected[0]).flat()
      const id = combinedList;
      const data = [...totalData];
      const updatedTable = data.filter((val) => {
        return !id.includes(val.SR_NO);
      });
      updatedTable.map((row) => {
        if (Object.keys(row).includes("SR_NO")) {
          delete row["SR_NO"];
        }
      })

      if (updatedTable.length > 0) {
        setTabledata(serializedata(updatedTable));
        setTotalData(serializedata(updatedTable));
        const temp = updatedTable.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
        setcurrentPageData(temp);
        setcurrentPageRows(temp);
        const temp3 = []
        const temp4 = []
        const temp5 = []
        const temp6 = []
        const temp7 = []
        const temp2 = updatedTable.filter(item => item["SPLIT_IND"] === "Y" ? item : null)
        updatedTable.filter(item => item["SPLIT_IND"] === "Y" ? temp3.push(item["SR_NO"]) : null)
        updatedTable.filter(item => item["SIZE_PRF_IND"] === "Y" ? temp4.push(item["SR_NO"]) : null)
        updatedTable.filter(item => item["SUBSTITUTE_IND"] === "Y" ? temp5.push(item["SR_NO"]) : null)
        updatedTable.filter(item => item["INVENT_IND"] === "Y" ? temp6.push(item["SR_NO"]) : null)
        updatedTable.filter(item => item["PACK_IND"] === "Y" ? temp7.push(item["SR_NO"]) : null)
        setSelSplitData(temp2);
        setSelectedSplit(temp3);
        setSelectedSizeProfile(temp4);
        setSelectedSubsInd(temp5);
        setSelectedInvInd(temp6);
        setSelectedPackInd(temp7);
        setCountSplitInd(temp2.length);
        setAllPageSelected([])
      }
      else {
        setTabledata([]);
        setTotalData([]);
        setSelSplitData([]);
        setSelectedSplit([]);
        setSelectedSizeProfile([]);
        setSelectedSubsInd([]);
        setSelectedInvInd([]);
        setSelectedPackInd([]);
        setCountSplitInd(0);
        setcurrentPageData([]);
        setcurrentPageRows([]);
      }
      setSelected([{}]);
      setSelData([]);
      setAllPageSelected([]);
      setIsLoading(false);
      setPage(0);
    }
    if (
      AllocSummaryCreateData?.data?.switchAsyData
      && Array.isArray(AllocSummaryCreateData?.data?.switchAsyData)
    ) {
      setIsLoading(false);
      const sortData = (AllocSummaryCreateData?.data?.switchAsyData).length > 0 ?
        stableSort(AllocSummaryCreateData?.data?.switchAsyData, getComparator('desc', 'ALLOC_NO'))
        : []
      setSwitchASM(sortData);
      setTabData(sortData);
      const temp = sortData.slice(aSMPage * 30, aSMPage * 30 + 30).filter(row => row !== undefined);
      setcurrentPageDataAllSumm(temp);
      setcurrentPageRowsAllSumm(temp);
      setTabFltrData(sortData);
      setCheck(false);
      AllocSummaryCreateData.data.switchAsyData = 0
      setSwtBkAsm(true);
      if (callWksht) {
        setCallWksht(false);
      }
      document.title = 'Alloc Summary';
    }
    if (
      ADPackCreateData?.data?.aDPkData
      && Array.isArray(ADPackCreateData?.data?.aDPkData)
    ) {
      setPackADData(ADPackCreateData?.data?.aDPkData);
      setValAD(true);
      setDisCond(5);
      setTab("5");
      setIsLoading(false);
      setADSwitch(2);
      ADPackCreateData.data.aDPkData = 0;
    }
  }, [CreateAllocationData?.data, AllocSummaryCreateData?.data, ADPackCreateData?.data]);

  useEffect(() => {
    if (AllocSummaryCreateData?.data?.switchAsyData) {
      if (AllocSummaryCreateData?.data?.switchAsyData.message === "SWITCH : CONNECTION LOST") {
        setOpenDialog(true);
        setDialogData("CONNECTION LOST")
        setCheck(false);
        setSwtBkAsm(true);
        setOpen_Schdl(false);
        setIsLoading(false);
        if (callWksht) {
          setCallWksht(false);
        }
        document.title = 'Alloc Summary';
      }
    }
  }, [AllocSummaryCreateData?.data]);

  if (statusData.length > 0 && statusCreateDataCheck) {
    statusData.map((option) => {
      ////console.log("statusCreateDataCheck: 1");
      if (option.CODE === "WS") {
        setSearchHeaderData((prev) => {
          return {
            ...prev,
            STATUS: option.CODE,
            STATUS_CODE: option.STATUS
          };
        })
      }
    })
    setStatusCreateDataCheck(false);
  }

  ////console.log("selected: ", selected, page, selData, totalData, allPageSelected, currentPageData);

  /*
    ####################################
    ### SEARCH DATA UNIQUE FUNCTIONS ###
    ####################################
  */
  // let UniqTableCPO =
  //   totalData.length > 0
  //     ? [...new Map(totalData.map((item) => [item["ITEM"], item])).values()]
  //     : [];

  let UniqDept =
    hierData.length > 0
      ? [...new Map(hierData.map((item) => [item["HIER1"], item])).values()]
      : [];


  let UniqClass =
    hier2Data.length > 0
      ? [...new Map(hier2Data.map((item) => [item["HIER2"], item])).values()]
      : [];


  let UniqSubClass =
    hier3Data.length > 0
      ? [...new Map(hier3Data.map((item) => [item["HIER3"], item])).values()]
      : [];


  let UniqItemParent =
    itemParentData.length > 0
      ? [...new Map(itemParentData.map((item) => [item["ITEM_PARENT"], item])).values()]
      : [];


  let UniqPOType =
    poTypeData.length > 0
      ? [...new Map(poTypeData.map((item) => [item["PO_TYPE"], item])).values()]
      : [];

  let UniqPO =
    poData.length > 0
      ? [...new Map(poData.map((item) => [item["PO"], item])).values()]
      : [];


  let UniqUDA =
    udaData.length > 0
      ? [...new Map(udaData.map((item) => [item["UDA"], item])).values()]
      : [];

  let UniqExcludeUDA =
    excludeUdaData.length > 0
      ? [...new Map(excludeUdaData.map((item) => [item["EXCLUDE_UDA"], item])).values()]
      : [];

  let UniqVPN =
    vpnData.length > 0
      ? [...new Map(vpnData.map((item) => [item["VPN"], item])).values()]
      : [];

  let UniqSKU =
    skuData.length > 0
      ? [...new Map(skuData.map((item) => [item["SKU"], item])).values()]
      : [];

  let UniqDiff_id =
    diffData.length > 0
      ? [...new Map(diffData.map((item) => [item["DIFF_ID"], item])).values()]
      : [];


  useEffect(() => {

    if (CreateAllocationData.isError) {
      setIsError(true)
      if (totalData.length === 0) {
        setIsLoading(false)
        setOpenDialog(true);
        setDialogData(String(CreateAllocationData["message"]))
      }
      CreateAllocationData.isError = false;
    } else if (CreateAllocationData.isSuccess) {
      setIsSuccess(true);
      if (CreateAllocationData?.data?.totalData) {
        if (CreateAllocationData?.data?.totalData?.message) {
          setHeaderDis(false);
          setIsLoading(false);
          setOpenDialog(true);
          setDialogData(String(CreateAllocationData?.data?.totalData["message"]))
        }
        setLoading(true);
      }
    } else {
      setIsError(false)
    }
  }, [CreateAllocationData])

  ///////////////////////////////////////////
  /////////CSS functions////////////////////
  ///////////////////////////////////////////

  const styleSelect1 = {
    control: base => ({
      ...base, width: "20vh", fontSize: "12px",
      margin: "0px 0px 2px 0px", minHeight: "30px", border: "1px solid rgb(180, 180, 180)",
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
    }),
    dropdownIndicator: (base) => ({ ...base, padding: 0, }),
    clearIndicator: (base) => ({ ...base, padding: 0, }),
    valueContainer: (provided) => ({ ...provided, paddingTop: '0', paddingBottom: '0', }),
    singleValue: (provided) => ({ ...provided, }),
    input: (provided) => ({ ...provided, width: "100%", height: '20px', }),
    option: provided => ({ ...provided, fontSize: "12px", }),
  };

  const styleSelect2 = {
    control: base => ({
      ...base, width: "20vh", fontSize: "12px", margin: "0px 0px 2px 0px",
      minHeight: "30px", border: "1px solid #b22222", boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
    }),
    dropdownIndicator: (base) => ({ ...base, padding: 0, }),
    clearIndicator: (base) => ({ ...base, ppadding: 0, }),
    valueContainer: (provided) => ({ ...provided, paddingTop: '0', paddingBottom: '0', }),
    singleValue: (provided) => ({ ...provided, }),
    input: (provided) => ({ ...provided, width: "100%", height: '20px', }),
    option: provided => ({ ...provided, fontSize: "12px", }),
  };

  ///////////////////////////////////////////
  /////////Submit functions////////////////////
  ///////////////////////////////////////////
  //const [submitListCount, setSubmitListCount] = useState(0)
  //const [submitListCheck, setSubmitListCheck] = useState(false)

  const SubmitList = () => {
    setLoading(true);
    setHeaderDis(true);
    setIsValid(false);
    if (searchHeaderData["CONTEXT"] === "PROM" && String(searchHeaderData["PROMOTION"]).length === 0) {
      setIsError(true);
      setOpenDialog(true);
      setDialogData("All fields are required in Header*")
      setHeaderDis(false);
      setLoading(true);
      setIsValid(true);
    } else if (searchHeaderData["ALLOC_DESC"].length === 0 ||
      searchHeaderData["ALLOC_LEVEL"].length === 0 ||
      searchHeaderData["RELEASE_DATE"].length === 0 ||
      searchHeaderData["CONTEXT"].length === 0 ||
      searchHeaderData["ALLOC_TYPE"].length === 0) {
      setIsError(true);
      setOpenDialog(true);
      setDialogData("All fields are required in Header*")
      setHeaderDis(false);
      setLoading(true);
      setIsValid(true);
    } else if (releaseDateCheck) {
      setOpenDialog(true);
      setDialogData("Release Date Cannot be past date");
    } else {
      if (searchHeaderData.ALLOC_CRITERIA === "Purchase Order") {
        const keysToCheck = ["HIER1", "HIER2", "HIER3", "PACK_NO", "ITEM_PARENT", "DIFF_ID",
          "SKU", "ITEM_LIST", "VPN", "UDA", "UDA_VALUE", "EXCLUDE_UDA", "EXCLUDE_UDA_VALUE", "PO"];

        const isEmpty = keysToCheck.every(key => {
          const value = searchDataCCommon[key];
          return Array.isArray(value) ? String(value).length === 0 : value === "";
        });
        if (isEmpty) {
          setOpenDialog(true);
          setDialogData("Merch Hierarchy, PO, Sku or Sku List is mandatory.")
          setHeaderDis(false);
          setLoading(true);
        } else {
          if ((searchDataCCommon["EISD_START_DATE"].length > 0 && searchDataCCommon["EISD_END_DATE"].length === 0) ||
            (searchDataCCommon["EISD_END_DATE"].length > 0 && searchDataCCommon["EISD_START_DATE"].length === 0)) {
            setOpenDialog(true);
            setDialogData("ESID Date From/To is required");
            setIsValidCTEDF(true);
            setIsGreatCTEDF(true);
            setIsGreatCTEDT(true);
          }
          else if ((searchDataCCommon["START_DATE"].length > 0 && searchDataCCommon["END_DATE"].length === 0) ||
            (searchDataCCommon["END_DATE"].length > 0 && searchDataCCommon["START_DATE"].length === 0)) {
            setOpenDialog(true);
            setDialogData("Not Before Date From/To is required");
            setIsValidCTNDF(true);
            setIsGreatCTNDF(true);
            setIsGreatCTNDT(true);
          }
          else if ((searchDataCCommon.EISD_START_DATE.length) > 0 && (searchDataCCommon.EISD_END_DATE.length) > 0 &&
            searchDataCCommon.EISD_END_DATE.toString().slice(8, 10) < searchDataCCommon.EISD_START_DATE.toString().slice(8, 10)) {
            var Date_From = searchDataCCommon.EISD_START_DATE.toString().slice(8, 10)
            var Date_To = searchDataCCommon.EISD_END_DATE.toString().slice(8, 10)
            if (Date_To < Date_From) {
              setOpenDialog(true);
              setDialogData("ESID From is not greater than ESID To");
              setIsGreatCTEDF(true);
              setIsGreatCTEDT(true);
            }
          }
          else if ((searchDataCCommon.START_DATE.length) > 0 && (searchDataCCommon.END_DATE.length) > 0
            && searchDataCCommon.END_DATE.toString().slice(8, 10) < searchDataCCommon.START_DATE.toString().slice(8, 10)) {
            var Date_From = searchDataCCommon.START_DATE.toString().slice(8, 10)
            var Date_To = searchDataCCommon.END_DATE.toString().slice(8, 10)
            if (Date_To < Date_From) {
              setOpenDialog(true);
              setDialogData("Not Before Date From is not greater than Not Before Date To");
              setIsGreatCTNDF(true);

              setIsGreatCTNDT(true);

            }
          }
          else {
            let merged = { ...searchHeaderData, ...searchDataCPO, ...searchDataCCommon }
            dispatch(postALLOCRESULTCWHRequest([{
              "CREATE_DATA": merged, "UPDATE": selData,
              "CHANGE_CREATE_GRID": selData, "CHANGE_CREATE_AVAIL_GRID": [],
              "SPLIT_IND": selSplitData
            }]));
            setIsValid(false);
            setIsLoading(true);

            setTotalData([]);
            setSelected([{}])
            setSubmitListCount(1);
            if (submitListCount === 1) {
              setSubmitListCheck(true)
            }
          }
        }
      }
      else if (searchHeaderData.ALLOC_CRITERIA === "Warehouse" || searchHeaderData.ALLOC_CRITERIA === "W") {
        const keysToCheck = ["HIER1", "HIER2", "HIER3", "PACK_NO", "ITEM_PARENT", "DIFF_ID",
          "SKU", "ITEM_LIST", "VPN", "UDA", "UDA_VALUE", "EXCLUDE_UDA", "EXCLUDE_UDA_VALUE"];

        const isEmpty = keysToCheck.every(key => {
          const value = searchDataCCommon[key];
          return Array.isArray(value) ? String(value).length === 0 : value === "";
        });
        if (isEmpty) {
          setOpenDialog(true);
          setDialogData("Merch Hierarchy, Sku or Sku List is mandatory.")
          setHeaderDis(false);
          setLoading(true);
        } else {
          let merged = { ...searchDataCWH, ...searchHeaderData, ...searchDataCCommon }
          dispatch(postALLOCRESULTCWHRequest([{
            "CREATE_DATA": merged, "UPDATE": selData,
            "CHANGE_CREATE_GRID": selData, "CHANGE_CREATE_AVAIL_GRID": [],
            "SPLIT_IND": selSplitData
          }]));
          setIsLoading(true);
          setIsValid(false);
          setTotalData([]);
          setSelected([{}])
          setSubmitListCount(1);
          if (submitListCount === 1) {
            setSubmitListCheck(true)
          }
        }
      }
      else if (searchHeaderData.ALLOC_CRITERIA === "ASN") {
        const keysToCheck = ["HIER1", "HIER2", "HIER3", "PACK_NO", "ITEM_PARENT", "DIFF_ID",
          "SKU", "ITEM_LIST", "VPN", "UDA", "UDA_VALUE", "EXCLUDE_UDA", "EXCLUDE_UDA_VALUE", "ASN"];

        const isEmpty = keysToCheck.every(key => {
          const value = searchDataCCommon[key];
          return Array.isArray(value) ? String(value).length === 0 : value === "";
        });
        if (isEmpty) {
          setOpenDialog(true);
          setDialogData("Merch Hierarchy, ASN, Sku or Sku List is mandatory.")
          setHeaderDis(false);
          setLoading(true);
        } else {
          let merged = { ...searchDataCASN, ...searchHeaderData, ...searchDataCCommon }
          dispatch(postALLOCRESULTCWHRequest([{
            "CREATE_DATA": merged, "UPDATE": selData,
            "CHANGE_CREATE_GRID": selData, "CHANGE_CREATE_AVAIL_GRID": [],
            "SPLIT_IND": selSplitData
          }]));
          setIsValid(false);
          setTotalData([]);
          setSelected([{}]);
          setIsLoading(true);
          setSubmitListCount(1);
          if (submitListCount === 1) {
            setSubmitListCheck(true)
          }
        }
      }
      else if (searchHeaderData.ALLOC_CRITERIA === "Transfer") {
        const keysToCheck = ["HIER1", "HIER2", "HIER3", "PACK_NO", "ITEM_PARENT", "DIFF_ID",
          "SKU", "ITEM_LIST", "VPN", "UDA", "UDA_VALUE", "EXCLUDE_UDA", "EXCLUDE_UDA_VALUE", "TSF"];

        const isEmpty = keysToCheck.every(key => {
          const value = searchDataCCommon[key];
          return Array.isArray(value) ? String(value).length === 0 : value === "";
        });
        if (isEmpty) {
          setOpenDialog(true);
          setDialogData("Merch Hierarchy, TSF, Sku or Sku List is mandatory.")
          setHeaderDis(false);
          setLoading(true);
        } else {
          let merged = { ...searchDataCTSF, ...searchHeaderData, ...searchDataCCommon }
          dispatch(postALLOCRESULTCWHRequest([{
            "CREATE_DATA": merged, "UPDATE": selData,
            "CHANGE_CREATE_GRID": selData, "CHANGE_CREATE_AVAIL_GRID": [],
            "SPLIT_IND": selSplitData
          }]));
          setIsValid(false);
          setTotalData([]);
          setSelected([{}]);
          setIsLoading(true);
          setSubmitListCount(1);
          if (submitListCount === 1) {
            setSubmitListCheck(true);
          }
        }
      }
      else if (searchHeaderData.ALLOC_CRITERIA === "Pre Buy") {
        const keysToCheck = ["HIER1", "HIER2", "HIER3", "PACK_NO", "ITEM_PARENT", "DIFF_ID",
          "SKU", "ITEM_LIST", "VPN", "UDA", "UDA_VALUE", "EXCLUDE_UDA", "EXCLUDE_UDA_VALUE"];

        const isEmpty = keysToCheck.every(key => {
          const value = searchDataCCommon[key];
          return Array.isArray(value) ? String(value).length === 0 : value === "";
        });
        if (isEmpty) {
          setOpenDialog(true);
          setDialogData("Merch Hierarchy, Sku or Sku List is mandatory.")
          setHeaderDis(false);
          setLoading(true);
        } else {
          let merged = { ...searchDataCWHATIF, ...searchHeaderData, ...searchDataCCommon }
          dispatch(postALLOCRESULTCWHRequest([{
            "CREATE_DATA": merged, "UPDATE": selData,
            "CHANGE_CREATE_GRID": selData, "CHANGE_CREATE_AVAIL_GRID": selData,
            "SPLIT_IND": selSplitData
          }]));
          setIsLoading(true);
          setIsValid(false);
          setTotalData([]);
          setSelected([{}]);
          setSubmitListCount(1);
          if (submitListCount === 1) {
            setSubmitListCheck(true);
          }
        }
      }
    }
    setValidCalculateDataCheck(false);
    setValidReserveDataCheck(false);
    setValidWorkSheetCheck(false);
    setCalculatescreenTabColor(true);
    setApprovescreenTabColor(false);
    setReservescreenTabColor(false);
    setState({ ...state, right: false });
  }

  if (submitListCheck && totalData.length > 0) {
    setSelData([])
    const temp1 = []
    const temp3 = []
    const temp4 = []
    const temp5 = []
    const temp6 = []
    const temp7 = []
    const temp = totalData.filter(item => item["SEL_IND"] === "Y" ? item : null)
    totalData.filter(item => item["SEL_IND"] === "Y" ? temp1.push(item["SR_NO"]) : null)
    const temp2 = totalData.filter(item => item["SPLIT_IND"] === "Y" ? item : null)
    totalData.filter(item => item["SPLIT_IND"] === "Y" ? temp3.push(item["SR_NO"]) : null)
    totalData.filter(item => item["SIZE_PRF_IND"] === "Y" ? temp4.push(item["SR_NO"]) : null)
    totalData.filter(item => item["SUBSTITUTE_IND"] === "Y" ? temp5.push(item["SR_NO"]) : null)
    totalData.filter(item => item["INVENT_IND"] === "Y" ? temp6.push(item["SR_NO"]) : null)
    totalData.filter(item => item["PACK_IND"] === "Y" ? temp7.push(item["SR_NO"]) : null)
    setSelData(temp);
    if (temp.length > 0) {
      const lastPage = Math.ceil((totalData.length) / rowsPerPage);
      var page_dict = {}
      var val = 0
      for (let ind = 0; ind < lastPage; ind++) {
        var temp9 = []
        const temp8 = totalData.slice(val * rowsPerPage, val * rowsPerPage + rowsPerPage).filter(row => row !== undefined)
        temp8.filter(item => item["SEL_IND"] === "Y" ? temp9.push(item["SR_NO"]) : null)
        page_dict = { ...page_dict, [val]: temp9 }
        val = val + 1
      }
      setSelected([page_dict]);
      const combinedList = Object.values(page_dict).flat()
      setAllPageSelected(combinedList)
    } else {
      setSelected([{}]);
    }
    setSelSplitData(temp2);
    setSelectedSplit(temp3);
    setSelectedSizeProfile(temp4);
    setSelectedSubsInd(temp5);
    setSelectedInvInd(temp6);
    setSelectedPackInd(temp7);
    setCountSplitInd(temp2.length);
    setSubmitListCheck(false);
    const temp8 = totalData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
    setcurrentPageData(temp8);
    setcurrentPageRows(temp8);
    setPage(0);
    // if (allocDetails[0].ALLOC_TYPE_CODE === "S")
    // totalData.filter(item => item["SEL_IND"] === "Y" &&  item["ERR_IND"] !== "E"? temp1.push(item["SR_NO"]) : null)
    // }else{
    //   totalData.filter(item => item["SEL_IND"] === "Y"? temp1.push(item["SR_NO"]) : null)

    // }
  }

  if (searchHeaderData.ALLOC_TYPE_CODE === "Child" && typeof callMode === "undefined") {
    setOpenDialog(true);
    setDialogData("Cannot select the Child*");
    setSearchHeaderData((prev) => {
      return {
        ...prev,
        ALLOC_TYPE_CODE: "Manual",
        ALLOC_TYPE: "A",
      };
    })
  }

  ///////////////////////////////////////////
  /////////Menu functions////////////////////
  ///////////////////////////////////////////

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setLoading(true);
    setSearchHeaderData((prev) => {
      return {
        ...prev,
        ALLOC_CRITERIA: options[selectedIndex].value,
      };
    })
  }, [""]);

  const handleClickListItem = (event) => {
    //console.log("handleClickListItem: ", event);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    if (index || index === 0) {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          ALLOC_CRITERIA: options[index].value,
        };
      })
    }
    else if (event.target.value) {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          ALLOC_CRITERIA: event.target.value,
        };
      });
    }
    setSelectedIndex(index);
    setAnchorEl(null);
    setTotalData([]);

    setInputHIER1CCommon("");
    setInputHIER2CCommon("");
    setInputHIER3CCommon("");
    setInputITEM_PARENTCCommon("");
    setInputWHCCommon("");
    setInputSUPPLIERCCommon("");
    setInputSUPPLIER_SITECCommon("");
    setInputPACK_NOCCommon("");
    setInputDIFF_IDCCommon("");
    setInputSKUCCommon("");
    setInputITEM_LISTCCommon("");
    setInputVPNCCommon("");
    setInputUDACCommon("");
    setInputUDA_VALUECCommon("");
    setInputEXCLUDE_UDACCommon("");
    setInputEXCLUDE_UDA_VALUECCommon("");
    setValHIER1CCommon([]);
    setValHIER2CCommon([]);
    setValHIER3CCommon([]);
    setValITEM_PARENTCCommon([]);
    setValWHCCommon([]);
    setValSUPPLIERCCommon([]);
    setValSUPPLIER_SITECCommon([]);
    setValPACK_NOCCommon([]);
    setValDIFF_IDCCommon([]);
    setValSKUCCommon([]);
    setValITEM_LISTCCommon([]);
    setValVPNCCommon([]);
    setValUDACCommon([]);
    setValUDA_VALUECCommon([]);
    setFilterUDAValueCCommon([]);
    setValEXCLUDE_UDACCommon([]);
    setFilterEXCLUDE_UDAValueCCommon([]);
    setValEXCLUDE_UDA_VALUECCommon([]);


    setIsValidCTEDF(false);
    setIsValidCTNDF(false);
    setIsValidCTEDT(false);
    setIsValidCTNDT(false);
    setIsGreatCTEDF(false);
    setIsGreatCTNDF(false);
    setIsGreatCTEDT(false);
    setIsGreatCTNDT(false);

    setInputPOCPO("");
    setInputPO_TYPECPO("");
    setValPOCPO([]);
    setValPO_TYPECPO([]);

    setInputASNCASN("");
    setValASNCASN([]);

    setInputTSFCTSF("");
    setValTSFCTSF([]);

    setSearchDataCTSF(initialDataTSF)
    setSearchDataCASN(initialDataASN)
    setSearchDataCPO(initialDataPO)
    setSearchDataCWH(initialDataWH)
    setSearchDataCCommon(initialDataCCommon)
  };


  const handleClose = () => {
    setAnchorEl(null);
  };



  ///////////////////////////////////////////////////////////////////////////////
  /////////Tablecell and Table Row Customization functions////////////////////
  /////////////////////////////////////////////////////////////////////////

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.root}`]: {
      height: "10px",
      padding: "0px",
    },
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "DodgerBlue",
      color: theme.palette.common.black,
      fontSize: "12px",
      textAlign: "left",
      // minHeight: "10px",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: "11px",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    root: {
      height: "10px",
    },
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  //////////////////////////////////////////////////
  /////////TextField Functions////////////////////
  //////////////////////////////////////////////
  const validateDateInput = (input) => {
    if (typeof input === "undefined" || input === null || input.length === 0) {
      return true;
    }
    if (input.length === 3 || input.length === 6) {
      if (input.slice(-1) === "-") {
        return true;
      } else {
        return false;
      }
    } else if (/^\d{2}-\d{2}-\d{2}$/.test(input)) {
      if (input.split("-")[2].length > 2) {
        return false;
      } else {
        return true;
      }
    } else {
      const isValid = input.replace(/-/g, '').match(/^\d+$/);
      return isValid ? true : false;
    }
  };
  //console.log(searchHeaderData)
  const initialDateString = releaseDate;//searchHeaderData.RELEASE_DATE;
  const initialDateParts = initialDateString.split('-');
  const initialDateR = new Date(
    Number('20' + initialDateParts[2]), // Year
    Number(initialDateParts[0]) - 1, // Month (0-based index)
    Number(initialDateParts[1]) // Day
  );

  const handleDatePicker = (name, date) => {
    const currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    const ReleaseDate = date !== null ? new Date(date.getFullYear(), date.getMonth(), date.getDate()) : ""
    switch (name) {
      case "RELEASE_DATE":
        if (ReleaseDate < currentDate) {
          setReleaseDateCheck(true)
          setOpenDialog(true);
          setDialogData("Invalid Release Date Input");
          return;
        }
        else {
          setReleaseDateCheck(false)
        }
        const Cdate = new Date(date);
        const year = Cdate.getFullYear();
        const month = String(Cdate.getMonth() + 1).padStart(2, '0');
        const day = String(Cdate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setSearchHeaderData((prev) => {
          return {
            ...prev,
            RELEASE_DATE: formattedDate,
          };
        });
        setReleaseDate(convertDateFormat(date))
        break;
      default:
        break;
    }
  }
  //console.log("MAIN check", searchHeaderData)

  const onChange = (e) => {
    if (e.target.name === "RELEASE_DATE") {
      if (e.target.value.length > 0) {
        var date_val = (e.target.value).slice(0, 4)
        var checkyear = String(e.target.value).split("-")[0]
        if (date_val < (new Date().toISOString().slice(0, 4))) {
          setReleaseDateCheck(true)
        }
        else {
          setReleaseDateCheck(false)
        }
        if (checkyear.length > 4) {
          setSearchHeaderData((prev) => {
            return {
              ...prev,
              [e.target.name]: new Date().toISOString().slice(0, 10),
            };
          });
          setOpenDialog(true);
          setDialogData("Invalid Release Date Input");
          return;
        }
      }
    }
    setSearchHeaderData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onChangeCPO = (e) => {
    setSearchDataCCommon((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onChangeCWH = (e) => {
    setSearchDataCCommon((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const HandleReleaseDate = (e) => {
    const currentDate = new Date().toISOString().slice(0, 10);
    if (e.target.value < currentDate) {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          [e.target.name]: new Date().toISOString().slice(0, 10),
        };
      });
      setOpenDialog(true);
      setDialogData("Release Date cannot be past date");
    }
  }


  //////////////////////////////////////
  ////////REFRESH CRITERIA INPUTS SCREEN/////////
  //////////////////////////////////////

  const RefreshGrid = () => {
    setApproveFreeseCheck(false);
    setAvailCheck(false);

    setIsValidCTEDF(false);
    setIsValidCTNDF(false);
    setIsValidCTEDT(false);
    setIsValidCTNDT(false);

    setIsGreatCTEDF(false);
    setIsGreatCTNDF(false);
    setIsGreatCTEDT(false);
    setIsGreatCTNDT(false);

    setInputHIER1CCommon("");
    setInputHIER2CCommon("");
    setInputHIER3CCommon("");
    setInputITEM_PARENTCCommon("");
    setInputWHCCommon("");
    setInputSUPPLIERCCommon("");
    setInputSUPPLIER_SITECCommon("");
    setInputPACK_NOCCommon("");
    setInputDIFF_IDCCommon("");
    setInputSKUCCommon("");
    setInputITEM_LISTCCommon("");
    setInputVPNCCommon("");
    setInputUDACCommon("");
    setInputPOCPO("");
    setInputPO_TYPECPO("");
    setInputUDA_VALUECCommon("");
    setInputEXCLUDE_UDACCommon("");
    setInputEXCLUDE_UDA_VALUECCommon("");
    setValHIER1CCommon([]);
    setValHIER2CCommon([]);
    setValHIER3CCommon([]);
    setValITEM_PARENTCCommon([]);
    setValWHCCommon([]);
    setValSUPPLIERCCommon([]);
    setValSUPPLIER_SITECCommon([]);
    setValPACK_NOCCommon([]);
    setValDIFF_IDCCommon([]);
    setValSKUCCommon([]);
    setValITEM_LISTCCommon([]);
    setValVPNCCommon([]);
    setValUDACCommon([]);
    setValPOCPO([]);
    setValPO_TYPECPO([]);
    setValUDA_VALUECCommon([]);
    setFilterUDAValueCCommon([]);
    setValEXCLUDE_UDACCommon([]);
    setFilterEXCLUDE_UDAValueCCommon([]);
    setValEXCLUDE_UDA_VALUECCommon([]);
    setSearchDataCPO(initialDataPO)

    setSearchDataCWH(initialDataWH)

    setInputASNCASN("");
    setValASNCASN([]);
    setSearchDataCASN(initialDataASN)


    setInputTSFCTSF("");
    setValTSFCTSF([]);
    setSearchDataCTSF(initialDataTSF)
    setSearchDataCCommon(initialDataCCommon)
  }


  //////////////////////////////////////
  ////////REFRESH ENTIRE SCREEN/////////
  //////////////////////////////////////
  const RefreshTableGrid = () => {
    setIsLoading(true);
    setSelData([]);
    setTotalData([]);

    setSelected([{}])
    setSelectedRow(1);
    setWorksheetCheckDis(false)

    setInputHIER1CCommon("");
    setInputHIER2CCommon("");
    setInputHIER3CCommon("");
    setInputITEM_PARENTCCommon("");
    setInputWHCCommon("");
    setInputSUPPLIERCCommon("");
    setInputSUPPLIER_SITECCommon("");
    setInputPACK_NOCCommon("");
    setInputDIFF_IDCCommon("");
    setInputSKUCCommon("");
    setInputITEM_LISTCCommon("");
    setInputVPNCCommon("");
    setInputUDACCommon("");
    setInputPOCPO("");
    setInputPO_TYPECPO("");
    setInputUDA_VALUECCommon("");
    setInputEXCLUDE_UDACCommon("");
    setInputEXCLUDE_UDA_VALUECCommon("");
    setValHIER1CCommon([]);
    setValHIER2CCommon([]);
    setValHIER3CCommon([]);
    setValITEM_PARENTCCommon([]);
    setValWHCCommon([]);
    setValSUPPLIERCCommon([]);
    setValSUPPLIER_SITECCommon([]);
    setValPACK_NOCCommon([]);
    setValDIFF_IDCCommon([]);
    setValSKUCCommon([]);
    setValITEM_LISTCCommon([]);
    setValVPNCCommon([]);
    setValUDACCommon([]);
    setValPOCPO([]);
    setValPO_TYPECPO([]);
    setValUDA_VALUECCommon([]);
    setFilterUDAValueCCommon([]);
    setValEXCLUDE_UDACCommon([]);
    setFilterEXCLUDE_UDAValueCCommon([]);
    setValEXCLUDE_UDA_VALUECCommon([]);

    setSearchDataCCommon(initialDataCCommon)
    setSearchDataCPO(initialDataPO)
    setSearchDataCWH(initialDataWH)

    setInputASNCASN("");
    setValASNCASN([]);
    setSearchDataCASN(initialDataASN)

    setInputTSFCTSF("");
    setValTSFCTSF([]);
    setSearchDataCTSF(initialDataTSF)

    setSelectedCriteria({})
    setOrder('asc')
    setOrderBy('SR_NO')

    setSearchHeaderData((prev) => {
      return {
        ...prev,
        RELEASE_DATE: new Date().toISOString().slice(0, 10),
      };
    });
    setReleaseDate(convertDateFormat(new Date().toISOString().slice(0, 10)));
    statusData.map((option) => {
      ////console.log("statusCreateDataCheck: 2");
      if (option.CODE === "WS") {
        setSearchHeaderData((prev) => {
          return {
            ...prev,
            STATUS: option.CODE,
            STATUS_CODE: option.STATUS
          };
        })
      }
    })

    dispatch(getCREATEREFRESHGRIDRequest(allocNoData));

    setIsValid(false);
    setAvailCheck(false);

    setIsValidCTEDF(false);
    setIsValidCTNDF(false);
    setIsValidCTEDT(false);
    setIsValidCTNDT(false);

    setIsGreatCTEDF(false);
    setIsGreatCTNDF(false);
    setIsGreatCTEDT(false);
    setIsGreatCTNDT(false);
    setHeaderDis(false);

    setTabCond(false);
    setRTabCond(false);
    setDisCond([]);
    setSwitchVal([]);
    setLIMData([]);
    setrtvrldata([])
    setSelectedSizeProfile([])
    setSelectedSubsInd([])
    setSelectedInvInd([])
    setSelectedPackInd([])

    setSubmitListCount(0)
    setSubmitListCheck(false)
    setCalcCheck(false);
    setValidSizeDetailCheck(false);

    setMultiPOData([]);
    setTableMultiPOData([]);
    setOpenMultiPO(false);
    setSelectedMultiPO([]);

    setValidRLCheckData(true);
    setValidQtyTabCheck(true);
    setValidCalculateTabCheck(true);
    setCalculateFunctionCall(false);
    setValidCalculateDataCheck(false);
    setValidReserveDataCheck(false);
    setValidAllocDetailCheck(true);
    setValidWhatIfSummCheck(true);
    setValidSizeDetailCheck(true);
    setValidWorkSheetCheck(false);
    setApproveFreeseCheck(false);
    setValidWorkSheetDataCheck(true);
    setValidWorkSheetApproveCheck(true);

    setRLscreenTabColor(true);
    setLIMscreenTabColor(true);
    setQLscreenTabColor(true);
    setCalculatescreenTabColor(true);
    setSchedulescreenTabColor(true);

    setWhatIfSummscreenTabColor(false);
    setAllocDtlscreenTabColor(false);
    setSizeDtlscreenTabColor(false);

    setApprovescreenTabColor(false);
    setReservescreenTabColor(false);
    setWorksheetscreenTabColor(false);

    setPage(0);
    setcurrentPageData([]);
    setcurrentPageRows([]);
    setAllPageSelected([]);
  }

  //////////////////////////////////////////////////
  const handleDelete = () => {
    const combinedList = Object.values(selected[0]).flat()
    if (combinedList.length === 0) {
      setOpenDialog(true);
      setDialogData("Please select the records");
    }
    else {
      setIsLoading(true);
      dispatch(getDELETECREATEGRIDRequest(selData));
    }
    // const updatedTable = data.filter((val) => {
    //   return !id.includes(val.SR_NO);
    // });
    // setTabledata(updatedTable)
    // setTotalData(updatedTable)
    // setSelected([]);
    // setSelData([]);
    // setReleaseDateCheck(false)
  };


  ////////////////////////////////////////////////


  ///////////////////////////////////////////
  ///SINGLE SELECT CODE FOR HEADER//
  ////////////////////////////////////


  const selectALLOC_LEVEL = (val) => {
    if (val) {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          ALLOC_LEVEL: val.CODE,
          ALLOC_LEVEL_CODE: val.ALLOC_LEVEL
        };
      });
      if (val.CODE === "D") {
        setSearchDataCCommon((prev) => { return { ...prev, PACK_IND: 'N', }; });
      }
    }
    else {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          ALLOC_LEVEL: "",
          ALLOC_LEVEL_CODE: "",
        };
      });
    }
  }

  const selectALLOC_TYPE = (val) => {
    if (val) {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          ALLOC_TYPE: val.CODE,
          ALLOC_TYPE_CODE: val.ALLOC_TYPE
        };
      });
    }
    else {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          ALLOC_TYPE: "",
          ALLOC_TYPE_CODE: "",
        };
      });
    }
    if (val) {
      if (val.CODE === "S") {
        setSearchHeaderData((prev) => {
          return {
            ...prev,
            ALLOC_CRITERIA: "Warehouse",
          };
        })
        setSelectedIndex(1)
      }
    }
  }

  const selectCONTEXT_TYPE = (val) => {
    if (val) {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          CONTEXT: val.CODE,
          CONTEXT_CODE: val.CONTEXT
        };
      });
      if (val !== "PROM") {
        setSearchHeaderData((prev) => { return { ...prev, PROMOTION: "", PROMOTION_CODE: "", }; });
      }
    }
    else {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          CONTEXT: "",
          CONTEXT_CODE: "",
        };
      });
    }
  }

  const selectPROMOTION = (val) => {
    if (val) {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          PROMOTION: val.PROMOTION,
          PROMOTION_CODE: val.PROMOTION
        };
      });
    }
    else {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          PROMOTION: "",
          PROMOTION_CODE: "",
        };
      });
    }
  }

  const selectSTATUS = (val) => {
    // if (val) {
    //   setSearchHeaderData((prev) => {
    //     return {
    //       ...prev,
    //       STATUS: val.CODE,
    //       STATUS_CODE: val.STATUS
    //     };
    //   });
    // }

    // else {
    //   setSearchHeaderData((prev) => {
    //     return {
    //       ...prev,
    //       STATUS: "",
    //       STATUS_CODE: "",
    //     };
    //   });
    // }
    if (val.CODE === searchHeaderData.STATUS) {
      return;
    }
    if (val.CODE === "APV") {
      if (ValidCalculateDataCheck) {
        APPROVE_func();
      } else {
        setOpenDialog(true);
        setDialogData("Allocation is not ready for Approve");

        if (allocDetailsData.length > 0 && allocDetailsData[0].STATUS_CODE === "RSV") {
          statusData.map((option) => {
            if (option.CODE === allocDetailsData[0].STATUS_CODE) { setSearchHeaderData((prev) => { return { ...prev, STATUS: option.CODE, STATUS_CODE: option.STATUS }; }) }
          })
        } else {
          statusData.map((option) => {
            if (option.CODE === "WS") { setSearchHeaderData((prev) => { return { ...prev, STATUS: option.CODE, STATUS_CODE: option.STATUS }; }) }
          })
        }
      }

    } else if (val.CODE === "RSV") {
      if (ValidReserveDataCheck) {
        REVERSE_func();
      } else {

        if (allocDetailsData.length > 0 && allocDetailsData[0].STATUS_CODE === "APV") {
          statusData.map((option) => {
            if (option.CODE === allocDetailsData[0].STATUS_CODE) { setSearchHeaderData((prev) => { return { ...prev, STATUS: option.CODE, STATUS_CODE: option.STATUS }; }) }
          })
          setOpenDialog(true);
          setDialogData("Allocation cannot Reserve for Approved allocation");
        } else {
          statusData.map((option) => {
            if (option.CODE === "WS") { setSearchHeaderData((prev) => { return { ...prev, STATUS: option.CODE, STATUS_CODE: option.STATUS }; }) }
          })
          setOpenDialog(true);
          setDialogData("Allocation is not ready for Reserve");
        }
      }
    }
    if (val.CODE === "WS") {
      if (ValidWorkSheetCheck) {
        Worksheet_func();
      }
      else if (allocDetailsData.length > 0 && (allocDetailsData[0].STATUS_CODE === "RSV" || allocDetailsData[0].STATUS_CODE === "APV")) {
        statusData.map((option) => {
          ////console.log("statusCreateDataCheck: 3");
          if (option.CODE === allocDetailsData[0].STATUS_CODE) { setSearchHeaderData((prev) => { return { ...prev, STATUS: option.CODE, STATUS_CODE: option.STATUS }; }) }
        })
        setOpenDialog(true);
        setDialogData("Please close the allocation and open the allocation from Allocation Summary screen");
      } else {
        statusData.map((option) => {
          if (option.CODE === "WS") { setSearchHeaderData((prev) => { return { ...prev, STATUS: option.CODE, STATUS_CODE: option.STATUS }; }) }
        })
      }
    }
  }

  ///////////////////////////////////////////
  ///MULTI SELECT CODE FOR PURSCHASE ORDER///
  ////////////////////////////////////

  /* 
          #######################################
          ##### Filtering Data Hooks ######
          #######################################
  */
  const [fltrH3, setFltrH3] = useState([]);
  const [fltrPACK, setFltrPACK] = useState([]);
  const [fltrITP, setFltrITP] = useState([]);
  const [fltrDiff, setFltrDiff] = useState([]);
  const [fltrSku, setFltrSku] = useState([]);
  const [fltrVPN, setFltrVPN] = useState([]);
  const [fltrUDA, setFltrUDA] = useState([]);
  const [fltrASN, setFltrASN] = useState([]);
  const [fltrTSF, setFltrTSF] = useState([]);
  const [udaVCheck, setUDAVCheck] = useState(false);

  useEffect(() => {
    if (searchDataCCommon.UDA.length > 0 && udaVCheck) {
      var temp = {}
      if (searchDataCCommon.HIER3.length > 0) {
        temp["HIER3"] = [...searchDataCCommon.HIER3]
      } else if (searchDataCCommon.HIER2.length > 0) {
        temp["HIER2"] = [...searchDataCCommon.HIER2]
      } else if (searchDataCCommon.HIER1.length > 0) {
        temp["HIER1"] = [...searchDataCCommon.HIER1]
      }
      if (Object.keys(temp).length > 0) {
        filteringData(udaData, temp, "UDAV"); // Filtering UDA
      }
      setUDAVCheck(false);

    }
  });

  /* 
              #######################################
              ##### FILTERING DATA IN CRITERIA ######
              #######################################
  */
  //FILTERING ON SELECT
  const filteringData = (data, f_key, name) => {
    if (name === "UDAV") {

      const temp_d = udaData.filter(row => (f_key[Object.keys(f_key)[0]].includes(row[Object.keys(f_key)[0]])));
      const uda_v = temp_d.filter(row => (searchDataCCommon.UDA.includes(row.UDA)))

      const filterUDAValue = temp_d.filter((item) => {
        return (searchDataCCommon.UDA).some((val) => {
          return item.UDA === val;
        });
      });
      setFilterUDAValueCCommon(fltrSort(filterUDAValue, "UDA_VALUE"));
      return
    }
    var fltrd_data = [];
    f_key[Object.keys(f_key)[0]].map((key) => {
      const temp_fdata = data.filter((row => row[Object.keys(f_key)[0]] === key))
      fltrd_data.push(...temp_fdata)
    });
    //UPDATE FILTERED DATA 
    if (name == "HIER3") {
      setFltrH3(fltrSort(fltrd_data, "HIER3"));
    } else if (name == "PACK_NO") {
      setFltrPACK(fltrSort(fltrd_data, "PACK_NO"));
      if (searchDataCCommon.PACK_NO.length > 0) {
        var temp = []
        if (fltrd_data.length > 0) {
          // fltrd_data.map((row) => { temp.push(row[name]) });

          setValPACK_NOCCommon(valPACK_NOCCommon.filter(
            obj => obj.PACK_NO === searchDataCCommon.PACK_NO));

        } else {
          setSearchDataCCommon((prev) => {
            return {
              ...prev,
              PACK_NO: [],
            };
          });
          setValPACK_NOCCommon([]);
        }
      }
    } else if (name == "ITEM_PARENT") {
      setFltrITP(fltrSort(fltrd_data, "ITEM_PARENT"));
      if (searchDataCCommon.ITEM_PARENT.length > 0) {
        var temp = []
        if (fltrd_data.length > 0) {
          fltrd_data.map((row) => { temp.push(row[name]) });
        } else {
          setSearchDataCCommon((prev) => {
            return {
              ...prev,
              ITEM_PARENT: [],
            };
          });
        }
      }
    } else if (name == "DIFF_ID") {
      setFltrDiff(fltrSort(fltrd_data, "DIFF_ID"));
      if (searchDataCCommon.DIFF_ID.length > 0) {
        var temp = []
        if (fltrd_data.length > 0) {
          fltrd_data.map((row) => { temp.push(row[name]) });
        } else {
          setSearchDataCCommon((prev) => {
            return {
              ...prev,
              DIFF_ID: [],
            };
          });
        }
      }
    } else if (name == "SKU") {
      setFltrSku(fltrSort(fltrd_data, "SKU"));
      if (searchDataCCommon.SKU.length > 0) {
        var temp = []
        if (fltrd_data.length > 0) {
          fltrd_data.map((row) => { temp.push(row[name]) });
        } else {
          setSearchDataCCommon((prev) => {
            return {
              ...prev,
              SKU: [],
            };
          });
        }
      }
    } else if (name == "VPN") {
      setFltrVPN(fltrSort(fltrd_data, "VPN"));
      if (searchDataCCommon.VPN.length > 0) {
        var temp = []
        if (fltrd_data.length > 0) {
          fltrd_data.map((row) => { temp.push(row[name]) });
        } else {
          setSearchDataCCommon((prev) => {
            return {
              ...prev,
              VPN: [],
            };
          });
        }
      }
      // } else if (name == "ASN") {
      //   setFltrASN(fltrSort(fltrd_data, "ASN"));
      //   if (searchDataCCommon.ASN.length > 0) {
      //     var temp = []
      //     if (fltrd_data.length > 0) {
      //       fltrd_data.map((row) => { temp.push(row[name]) });
      //     } else {
      //       setSearchDataCCommon((prev) => {
      //         return {
      //           ...prev,
      //           ASN: [],
      //         };
      //       });
      //     }
      //   }
      // } else if (name == "TSF") {
      //   setFltrTSF(fltrSort(fltrd_data, "TSF"));
      //   if (searchDataCCommon.ASN.length > 0) {
      //     var temp = []
      //     if (fltrd_data.length > 0) {
      //       fltrd_data.map((row) => { temp.push(row[name]) });
      //     } else {
      //       setSearchDataCCommon((prev) => {
      //         return {
      //           ...prev,
      //           TSF: [],
      //         };
      //       });
      //     }
      //   }
    } else if (name == "UDA") {
      //Filtering UDA_VALUE
      const filterUDAValue = fltrd_data.filter((item) => {
        return (searchDataCCommon.UDA).some((val) => {
          return item.UDA === val;
        });
      });
      if (searchDataCCommon.UDA_VALUE.length > 0) {
        const temp_UDAV = [...searchDataCCommon.UDA_VALUE];
        [...Array(temp_UDAV.length).keys()].map(val => {
          const temp_check = filterUDAValue.filter(row => (row.UDA_VALUE === temp_UDAV[val]));
          if (temp_check.length === 0) {
            const index = searchDataCCommon.UDA_VALUE.indexOf(temp_UDAV[val]);
            if (index > -1) {
              searchDataCCommon.UDA_VALUE.splice(index, 1);
            }
          }
        });
      }
      setFilterUDAValueCCommon(fltrSort(filterUDAValue, "UDA_VALUE"));
      setFltrUDA(fltrSort(fltrd_data, "UDA"));
      if (searchDataCCommon.UDA.length > 0) {
        var temp = []
        if (fltrd_data.length > 0) {
          fltrd_data.map((row) => { temp.push(row[name]) });
        } else {
          const filterUDAValue = (fltrUDA.length > 0 ? fltrUDA : udaData).filter((item) => {
            return (searchDataCCommon.UDA).some((val) => {
              return item.UDA === val;
            });
          });
          setFilterUDAValueCCommon(fltrSort(filterUDAValue, "UDA_VALUE"));
          setSearchDataCCommon((prev) => {
            return {
              ...prev,
              UDA: [],
            };
          });
        }
      }
    }
  }

  //REVERSE FILTERING ON UNSELECT
  const Rev_fltr = (key, data, name, fltr_name, selectData) => {
    var temp_name = ""
    if (name == "PACK_NO") {
      temp_name = name;
      name = "SKU"
    }
    const temp_data = data.filter((row => row[name] === key))
    var data_list = []
    temp_data.map(row => data_list.push(row[fltr_name]))
    const temp_UDAVal = [...searchDataCCommon.UDA_VALUE];
    if (fltr_name === "UDA") {

      var udaV_list = [];
      temp_data.map(row => udaV_list.push(row["UDA_VALUE"]));

      [...Array(temp_UDAVal.length).keys()].map(ind => {
        if (udaV_list.includes(temp_UDAVal[ind])) {
          const index = searchDataCCommon.UDA_VALUE.indexOf(temp_UDAVal[ind]);
          if (index > -1) {
            searchDataCCommon.UDA_VALUE.splice(index, 1);
          }
        }
      });
      // [...Array(temp_UDAVal.length).keys()].map(ind=>{
      //   valUDA_VALUECCommon.filter(row=>row.UDA_VALUE)
      //   temp_UDAVal[ind]
      // })
      const fltredUDAVal = valUDA_VALUECCommon.filter(row => (!temp_UDAVal.includes(row.UDA_VALUE)))
      setValUDA_VALUECCommon(fltredUDAVal)
    }
    if (temp_name != "") { name = temp_name }
    if (searchDataCCommon[fltr_name].length > 0 && searchDataCCommon[name].length > 1) {
      var index_list = []
      searchDataCCommon[fltr_name].map(
        val => {

          if (data_list.includes(val)) {
            const index = searchDataCCommon[fltr_name].indexOf(val);
            index_list.push(searchDataCCommon[fltr_name][index])
          }
        }
      )
      if (index_list.length > 0) {
        for (let ind = 0; ind < index_list.length; ind++) {
          const index = searchDataCCommon[fltr_name].indexOf(index_list[ind]);

          if (index > -1) {
            //if(!(fltr_name==="UDA" && data_list.length>1)){
            searchDataCCommon[fltr_name].splice(index, 1);//}
          }
        }
      }
      const fltr_select = selectData.filter((row => !data_list.includes(row[fltr_name])))
      if (fltr_name === "HIER2") {
        setValHIER2CCommon(fltr_select);
      } else if (fltr_name === "HIER3") {
        setValHIER3CCommon(fltr_select);
      } else if (fltr_name === "PACK_NO") {
        setValPACK_NOCCommon(fltr_select);
      } else if (fltr_name === "ITEM_PARENT") {
        setValITEM_PARENTCCommon(fltr_select);
      } else if (fltr_name === "DIFF_ID") {
        setValDIFF_IDCCommon(fltr_select);
      } else if (fltr_name === "SKU") {
        setValSKUCCommon(fltr_select);
      } else if (fltr_name === "VPN") {
        setValVPNCCommon(fltr_select);
      } else if (fltr_name === "UDA") {
        setValUDACCommon(fltr_select);
        // } else if (fltr_name === "ASN") {
        //   setValASNCASN(fltr_select);
        // } else if (fltr_name === "TSF") {
        //   setValTSFCTSF(fltr_select);

      }
    } else {
      if (fltr_name === "HIER3") {
        setFltrH3([])
      } else if (fltr_name === "PACK_NO") {
        setFltrPACK([]);
      } else if (fltr_name === "ITEM_PARENT") {
        setFltrITP([]);
      } else if (fltr_name === "SKU") {
        setFltrSku([]);
      } else if (fltr_name === "VPN") {
        setFltrVPN([]);
      } else if (fltr_name === "UDA") {
        setFltrUDA([]);
      } else if (fltr_name === "DIFF_ID") {
        setFltrDiff([]);
        // } else if (fltr_name === "ASN") {
        //   setFltrASN([]);
        // } else if (fltr_name === "TSF") {
        //   setFltrTSF([]);
      }
    }
  }

  //SORTING FILTERED DATA
  const fltrSort = (data, name) => {
    data.sort((a, b) => {

      if (!isNaN(a[name]) && !isNaN(b[name])) {
        return a[name] - b[name];
      }
      else {
        let fa = String(a[name]).toLowerCase(),
          fb = String(b[name]).toLowerCase();


        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      }
    });
    return data;
  }

  /* 
          ##################################################
          ##### MULTI SELECT CODE FOR PURSCHASE ORDER ######
          ##################################################
  */

  const selectHIER1 = (event, value) => {
    let updatedData = []
    let selectedDataOptions = []
    event.map((res) => {
      selectedDataOptions.push(res.HIER1)
    })
    updatedData = hierData.filter((res) => !selectedDataOptions.includes(res.HIER1))
    const temp1 = stableSort(event, getComparator("asc", "HIER1"))
    const temp2 = stableSort(updatedData, getComparator("asc", "HIER1"))
    updatedData = [...temp1, ...temp2];
    setHierData(updatedData)

    let selectedHIER1 = [];
    if (value.option) {
      valHIER1CCommon.push(value.option);
      if (String(value.option.HIER1).includes(inputHIER1CCommon)) {
        setInputHIER1CCommon("");
      }
      if (String(value.option.HIER1).substring(inputHIER1CCommon)) {
        setInputHIER1CCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valHIER1CCommon.length; i++) {
        if (valHIER1CCommon[i]["HIER1"] === value.removedValue.HIER1) {
          index = i;
          break;
        }
      }
      if (value.action === "deselect-option") {

      }
      // Reverse Filtering
      Rev_fltr(valHIER1CCommon[index].HIER1, hier2Data, "HIER1", "HIER2", valHIER2CCommon);
      Rev_fltr(valHIER1CCommon[index].HIER1, fltrH3.length > 0 ? fltrH3 : hier3Data, "HIER1", "HIER3", valHIER3CCommon);
      Rev_fltr(valHIER1CCommon[index].HIER1, fltrITP.length > 0 ? fltrITP : itemParentData, "HIER1", "ITEM_PARENT", valITEM_PARENTCCommon);
      Rev_fltr(valHIER1CCommon[index].HIER1, fltrPACK.length > 0 ? fltrPACK : packNoData, "HIER1", "PACK_NO", valPACK_NOCCommon);
      Rev_fltr(valHIER1CCommon[index].HIER1, fltrDiff.length > 0 ? fltrDiff : diffData, "HIER1", "DIFF_ID", valDIFF_IDCCommon);
      Rev_fltr(valHIER1CCommon[index].HIER1, fltrSku.length > 0 ? fltrSku : skuData, "HIER1", "SKU", valSKUCCommon);
      Rev_fltr(valHIER1CCommon[index].HIER1, fltrVPN.length > 0 ? fltrVPN : vpnData, "HIER1", "VPN", valVPNCCommon);
      Rev_fltr(valHIER1CCommon[index].HIER1, fltrUDA.length > 0 ? fltrUDA : udaData, "HIER1", "UDA", valUDACCommon);
      // Rev_fltr(valHIER1CCommon[index].HIER1, fltrASN.length > 0 ? fltrASN : asnData, "HIER1", "ASN", valASNCASN);
      // Rev_fltr(valHIER1CCommon[index].HIER1, fltrTSF.length > 0 ? fltrTSF : tsfData, "HIER1", "TSF", valTSFCTSF);
      valHIER1CCommon.splice(index, 1);

    } else if (value.action === "clear") {
      valHIER1CCommon.splice(0, valHIER1CCommon.length);
    }
    // if (value.action === "deselect-option") {
    //   valHIER1CCommon.splice(0, valHIER1CCommon.length);
    //   valHIER1CCommon.push(...event);
    // }
    //SELECTION
    if (valHIER1CCommon.length > 0 && typeof valHIER1CCommon[0]['HIER1'] !== "undefined") {
      valHIER1CCommon.map(
        (item) => {
          selectedHIER1.push(item.HIER1);
        }
      )
      // if(searchDataCCommon.UDA.length>0){
      //   var temp={}
      //   if(searchDataCCommon.HIER3.length>0){
      //     temp["HIER3"]=[...searchDataCCommon.HIER3]
      //   }else if(searchDataCCommon.HIER2.length>0){
      //     temp["HIER2"]=[...searchDataCCommon.HIER2]
      //   }else if(searchDataCCommon.HIER1.length>0){
      //     temp["HIER1"]=[...selectedHIER1]
      //   }
      //   if(Object.keys(temp).length>0){
      //   filteringData(udaData,temp,"UDAV"); // Filtering UDA
      //   }
      // }
      // setUDAVCheck(true);
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          HIER1: selectedHIER1,
        };
      });
      setInputHIER1CCommon("");
      // dISPATCH CALL ON SELECTED HIER1 VALUES
      var temp = {};
      temp["HIER1"] = selectedHIER1;
      dispatch(getHIER2Request([temp]));
      dispatch(getHIER3Request([temp]));
      dispatch(getITEMPARENTRequest([temp]));
      dispatch(getSKURequest([temp]));
      dispatch(getDIFFRequest([temp]));
      dispatch(getVPNRequest([temp]));
      dispatch(getUDARequest([temp]));
      // dispatch(getASNRequest([temp]));
      if (searchDataCCommon.HIER2.length === 0) {
        filteringData(packNoData, temp, "PACK_NO"); // Filtering pack
      }
      // dispatch(getTSFRequest([temp]));

    } else {
      initialDataPO.HIER1 = "";
      //CLEARING DATA WHEN HIER1 IS EMPTY
      setHier2Data([]);
      setHier3Data([]);
      setItemParentData([]);
      // setPackNoData([]);
      setUdaData([]);
      setVpnData([]);
      setSkuData([]);
      setDIffData([]);
      // setAsnData([]);
      // setTsfData([]);
      //filter variables data
      setFltrH3([]);
      setFltrITP([]);
      setFltrPACK([]);
      setFltrVPN([]);
      setFltrDiff([]);
      setFltrUDA([]);
      // setFltrTSF([]);
      // setFltrASN([]);

      setValSKUCCommon([])
      setValVPNCCommon([]);
      setValUDACCommon([]);
      setValUDA_VALUECCommon([]);
      setValPACK_NOCCommon([]);
      setValITEM_PARENTCCommon([]);
      setValHIER3CCommon([]);
      setValHIER2CCommon([]);
      setValDIFF_IDCCommon([]);
      // setValASNCASN([]);
      // setValTSFCTSF([]);

      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          HIER1: [],
          HIER2: [],
          HIER3: [],
          // PACK_NO: [],
          ITEM_PARENT: [],
          DIFF_ID: [],
          SKU: [],
          VPN: [],
          UDA: [],
          UDA_VALUE: [],
          EXCLUDE_UDA: [],
          EXCLUDE_UDA_VALUE: [],
          // ASN: [],
          // TSF: [],
        };
      });
      setInputHIER1CCommon("");
    }
  }

  const selectHIER2 = (event, value) => {
    let updatedData = []
    let selectedDataOptions = []
    event.map((res) => {
      selectedDataOptions.push(res.HIER2)
    })
    updatedData = hier2Data.filter((res) => !selectedDataOptions.includes(res.HIER2))
    const temp1 = stableSort(event, getComparator("asc", "HIER2"))
    const temp2 = stableSort(updatedData, getComparator("asc", "HIER2"))
    updatedData = [...temp1, ...temp2];
    setHier2Data(updatedData)

    let selectedHIER2 = [];
    let temp_Arr = []
    if (value.option) {
      valHIER2CCommon.push(value.option);
      if (String(value.option.HIER2).includes(inputHIER2CCommon)) {
        setInputHIER2CCommon("");
      }
      if (String(value.option.HIER2).substring(inputHIER2CCommon)) {
        setInputHIER2CCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valHIER2CCommon.length; i++) {
        if (valHIER2CCommon[i]["HIER2"] === value.removedValue.HIER2) {
          index = i;
          break;
        }
      }
      // Reverse Filtering

      Rev_fltr(valHIER2CCommon[index].HIER2, fltrH3, "HIER2", "HIER3", valHIER3CCommon);
      Rev_fltr(valHIER2CCommon[index].HIER2, fltrITP, "HIER2", "ITEM_PARENT", valITEM_PARENTCCommon);
      Rev_fltr(valHIER2CCommon[index].HIER2, fltrDiff, "HIER2", "DIFF_ID", valDIFF_IDCCommon);
      Rev_fltr(valHIER2CCommon[index].HIER2, fltrSku, "HIER2", "SKU", valSKUCCommon);
      Rev_fltr(valHIER2CCommon[index].HIER2, fltrVPN, "HIER2", "VPN", valVPNCCommon);
      Rev_fltr(valHIER2CCommon[index].HIER2, fltrUDA, "HIER2", "UDA", valUDACCommon);
      Rev_fltr(valHIER2CCommon[index].HIER2, fltrPACK, "HIER2", "PACK_NO", valPACK_NOCCommon);
      // Rev_fltr(valHIER2CCommon[index].HIER2, asnData, "HIER2", "ASN", valASNCASN);
      // Rev_fltr(valHIER2CCommon[index].HIER2, tsfData, "HIER2", "TSF", valTSFCTSF);
      valHIER2CCommon.splice(index, 1);
    } else if (value.action === "clear") {
      valHIER2CCommon.splice(0, valHIER2CCommon.length);
    }
    // SELECTING AND FILTERING
    if (valHIER2CCommon.length > 0 && typeof valHIER2CCommon[0]['HIER2'] !== "undefined") {
      valHIER2CCommon.map(
        (item) => {
          selectedHIER2.push(item.HIER2);
        }
      )
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          HIER2: selectedHIER2,
        };
      });
      setInputHIER2CCommon("");
      //FILTERING BASED ON HIER2 SELECTION
      var temp = {}
      temp["HIER2"] = selectedHIER2;
      if (searchDataCCommon.HIER2.length === 0) {
        filteringData(UniqSubClass, temp, "HIER3"); // Filtering Subclass
      }
      if (searchDataCCommon.HIER3.length === 0) {
        // filteringData(packNoData, temp, "PACK_NO"); // Filtering Pack no
        filteringData(itemParentData, temp, "ITEM_PARENT"); // Filtering ITEM_PARENT
        filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
        filteringData(skuData, temp, "SKU"); // Filtering SKU
        filteringData(UniqVPN, temp, "VPN"); // Filtering VPN
        filteringData(udaData, temp, "UDA"); // Filtering UDA
        filteringData(packNoData, temp, "PACK_NO"); // Filtering pack
        // filteringData(asnData, temp, "ASN"); // Filtering ASN
        // filteringData(tsfData, temp, "TSF"); // Filtering TSF
      }
    } else {
      initialDataPO.HIER2 = "";
      setFltrH3([]);
      setFltrUDA([]);
      setFltrDiff([]);
      setFltrSku([]);
      setFltrITP([]);
      // setFltrPACK([]);
      setFltrVPN([]);
      // setFltrTSF([]);
      // setFltrASN([]);
      setValHIER3CCommon([])
      setUDAVCheck(true);
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          HIER2: [],
          HIER3: [],
        };
      });
      setInputHIER2CCommon("");
      var temp = {}
      if (searchDataCCommon.HIER1.length > 0) {
        temp["HIER1"] = searchDataCCommon.HIER1;
        filteringData(packNoData, temp, "PACK_NO");
      }
    }
  }

  const selectHIER3 = (event, value) => {

    let updatedData = []
    let selectedDataOptions = []
    event.map((res) => {
      selectedDataOptions.push(res.HIER3)
    })
    updatedData = fltrH3.length > 0 ? fltrH3 : UniqSubClass.filter((res) => !selectedDataOptions.includes(res.HIER3))
    let Uniqh3 =
      updatedData.length > 0
        ? [...new Map(updatedData.map((item) => [item["HIER3"], item])).values()]
        : [];
    const temp1 = stableSort(event, getComparator("asc", "HIER3"))
    const temp2 = stableSort(updatedData, getComparator("asc", "HIER3"))
    updatedData = [...temp1, ...temp2];
    fltrH3.length === 0 ?
      setHier3Data(updatedData) :
      setFltrH3(Uniqh3)

    let selectedHIER3 = [];
    if (value.option) {
      valHIER3CCommon.push(value.option);
      if (String(value.option.HIER3).includes(inputHIER3CCommon)) {
        setInputHIER3CCommon("");
      }
      if (String(value.option.HIER3).substring(inputHIER3CCommon)) {
        setInputHIER3CCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valHIER3CCommon.length; i++) {
        if (valHIER3CCommon[i]["HIER3"] === value.removedValue.HIER3) {
          index = i;
          break;
        }
      }
      // Reverse Filtering
      if (valHIER3CCommon.length > 1) {
        // Rev_fltr(valHIER3CCommon[index].HIER3, fltrPACK, "HIER3", "PACK_NO", valPACK_NOCCommon);
        Rev_fltr(valHIER3CCommon[index].HIER3, fltrITP, "HIER3", "ITEM_PARENT", valITEM_PARENTCCommon);
        Rev_fltr(valHIER3CCommon[index].HIER3, fltrDiff, "HIER3", "DIFF_ID", valDIFF_IDCCommon);
        Rev_fltr(valHIER3CCommon[index].HIER3, fltrSku, "HIER3", "SKU", valSKUCCommon);
        Rev_fltr(valHIER3CCommon[index].HIER3, fltrVPN, "HIER3", "VPN", valVPNCCommon);
        Rev_fltr(valHIER3CCommon[index].HIER3, fltrUDA, "HIER3", "UDA", valUDACCommon);
        // Rev_fltr(valHIER3CCommon[index].HIER3, asnData, "HIER3", "ASN", valASNCASN);
        // Rev_fltr(valHIER3CCommon[index].HIER3, tsfData, "HIER3", "TSF", valTSFCTSF);
      }
      valHIER3CCommon.splice(index, 1);
    } else if (value.action === "clear") {
      valHIER3CCommon.splice(0, valHIER3CCommon.length);
    }

    if (valHIER3CCommon.length > 0 && typeof valHIER3CCommon[0]['HIER3'] !== "undefined") {
      valHIER3CCommon.map(
        (item) => {
          selectedHIER3.push(item.HIER3);
        }
      )
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          HIER3: selectedHIER3,
        };
      });
      setInputHIER3CCommon("");
      var temp = {}
      temp["HIER3"] = selectedHIER3;
      filteringData(packNoData, temp, "PACK_NO"); // Filtering Pack no
      filteringData(itemParentData, temp, "ITEM_PARENT"); // Filtering ITEM_PARENT
      filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
      filteringData(skuData, temp, "SKU"); // Filtering SKU
      filteringData(UniqVPN, temp, "VPN"); // Filtering VPN
      filteringData(udaData, temp, "UDA"); // Filtering UDA
      // filteringData(asnData, temp, "ASN"); // Filtering ASN
      // filteringData(tsfData, temp, "TSF"); // Filtering TSF
    } else {
      initialDataPO.HIER3 = "";
      var temp = {}
      if (searchDataCCommon.HIER2.length > 0) {
        temp["HIER2"] = searchDataCCommon.HIER2;
        filteringData(packNoData, temp, "PACK_NO");
        filteringData(UniqItemParent, temp, "ITEM_PARENT"); // Filtering ITEM_PARENT
        filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
        filteringData(skuData, temp, "SKU"); // Filtering SKU
        filteringData(UniqVPN, temp, "VPN"); // Filtering VPN
        filteringData(udaData, temp, "UDA"); // Filtering UDA
        // filteringData(asnData, temp, "ASN"); // Filtering ASN
        // filteringData(tsfData, temp, "TSF"); // Filtering TSF
      }
      setUDAVCheck(true);
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          HIER3: [],
        };
      });
      setInputHIER3CCommon("");
    }
  }

  const selectITEM_LIST = (event, value) => {
    let updatedData = []
    let selectedDataOptions = []
    event.map((res) => {
      selectedDataOptions.push(res.ITEM_LIST)
    })
    updatedData = itemListHeadData.filter((res) => !selectedDataOptions.includes(res.ITEM_LIST))
    const temp1 = stableSort(event, getComparator("asc", "ITEM_LIST"))
    const temp2 = stableSort(updatedData, getComparator("asc", "ITEM_LIST"))
    updatedData = [...temp1, ...temp2];
    setItemListHeadData(updatedData)

    let selectedITEM_LIST = [];
    if (value.option) {
      valITEM_LISTCCommon.push(value.option);
      if (String(value.option.ITEM_LIST).includes(inputITEM_LISTCCommon)) {
        setInputITEM_LISTCCommon("");
      }
      if (String(value.option.ITEM_LIST).substring(inputITEM_LISTCCommon)) {
        setInputITEM_LISTCCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valITEM_LISTCCommon.length; i++) {
        if (valITEM_LISTCCommon[i]["ITEM_LIST"] === value.removedValue.ITEM_LIST) {
          index = i;
          break;
        }
      }
      valITEM_LISTCCommon.splice(index, 1);
    } else if (value.action === "clear") {
      valITEM_LISTCCommon.splice(0, valITEM_LISTCCommon.length);
    }
    if (event === 0) {
      valITEM_LISTCCommon.push(value)
    }
    if (valITEM_LISTCCommon.length > 0 && typeof valITEM_LISTCCommon[0]['ITEM_LIST'] !== "undefined") {
      valITEM_LISTCCommon.map(
        (item) => {
          selectedITEM_LIST.push(item.ITEM_LIST);
        }
      )
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          ITEM_LIST: selectedITEM_LIST,
        };
      });
      setInputITEM_LISTCCommon("");
    } else if (value.length > 0) {
      setOpenDialog(true);
      setDialogData("Please choose valid ITEM_LIST");
    } else {
      initialDataPO.ITEM_LIST = "";
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          ITEM_LIST: [],
        };
      });
      setInputITEM_LISTCCommon("");
    }
  }

  const selectWH = (event, value) => {
    let updatedData = []
    let selectedDataOptions = []
    event.map((res) => {
      selectedDataOptions.push(res.WH)
    })
    updatedData = warehouseData.filter((res) => !selectedDataOptions.includes(res.WH))
    const temp1 = stableSort(event, getComparator("asc", "WH"))
    const temp2 = stableSort(updatedData, getComparator("asc", "WH"))
    updatedData = [...temp1, ...temp2];
    setWarehouseData(updatedData)

    let selectedWH = [];
    if (value.option) {
      valWHCCommon.push(value.option);
      if (String(value.option.WH).includes(inputWHCCommon)) {
        setInputWHCCommon("");
      }
      if (String(value.option.WH).substring(inputWHCCommon)) {
        setInputWHCCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valWHCCommon.length; i++) {
        if (valWHCCommon[i]["WH"] === value.removedValue.WH) {
          index = i;
          break;
        }
      }
      valWHCCommon.splice(index, 1);
    } else if (value.action === "clear") {
      valWHCCommon.splice(0, valWHCCommon.length);
    }
    if (event === 0) {
      valWHCCommon.push(value)
    }
    if (valWHCCommon.length > 0 && typeof valWHCCommon[0]['WH'] !== "undefined") {
      valWHCCommon.map(
        (item) => {
          selectedWH.push(item.WH);
        }
      )
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          WH: selectedWH,
        };
      });
      setInputWHCCommon("");
    } else if (value.length > 0) {
      setOpenDialog(true);
      setDialogData("Please choose valid WH");
    } else {
      initialDataPO.WH = "";
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          WH: [],
        };
      });
      setInputWHCCommon("");
    }
  }

  const selectSUPPLIER = (event, value) => {
    let updatedData = []
    let selectedDataOptions = []
    event.map((res) => {
      selectedDataOptions.push(res.SUPPLIER)
    })
    updatedData = supplierData.filter((res) => !selectedDataOptions.includes(res.SUPPLIER))
    const temp1 = stableSort(event, getComparator("asc", "SUPPLIER"))
    const temp2 = stableSort(updatedData, getComparator("asc", "SUPPLIER"))
    updatedData = [...temp1, ...temp2];
    setSupplierData(updatedData)

    let selectedSUPPLIER = [];
    if (value.option) {
      valSUPPLIERCCommon.push(value.option);
      if (String(value.option.SUPPLIER).includes(inputSUPPLIERCCommon)) {
        setInputSUPPLIERCCommon("");
      }
      if (String(value.option.SUPPLIER).substring(inputSUPPLIERCCommon)) {
        setInputSUPPLIERCCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valSUPPLIERCCommon.length; i++) {
        if (valSUPPLIERCCommon[i]["SUPPLIER"] === value.removedValue.SUPPLIER) {
          index = i;
          break;
        }
      }
      valSUPPLIERCCommon.splice(index, 1);
    } else if (value.action === "clear") {
      valSUPPLIERCCommon.splice(0, valSUPPLIERCCommon.length);
    }
    if (event === 0) {
      valSUPPLIERCCommon.push(value)
    }
    if (valSUPPLIERCCommon.length > 0 && typeof valSUPPLIERCCommon[0]['SUPPLIER'] !== "undefined") {
      valSUPPLIERCCommon.map(
        (item) => {
          selectedSUPPLIER.push(item.SUPPLIER);
        }
      )
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          SUPPLIER: selectedSUPPLIER,
        };
      });
      setInputSUPPLIERCCommon("");
    } else if (value.length > 0) {
      setOpenDialog(true);
      setDialogData("Please choose valid Supplier");
    } else {
      initialDataPO.SUPPLIER = "";
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          SUPPLIER: [],
        };
      });
      setInputSUPPLIERCCommon("");
    }
  }

  const selectSUPPLIER_SITE = (event, value) => {
    let updatedData = []
    let selectedDataOptions = []
    event.map((res) => {
      selectedDataOptions.push(res.SUPPLIER_SITE)
    })
    updatedData = supplerSiteData.filter((res) => !selectedDataOptions.includes(res.SUPPLIER_SITE))
    const temp1 = stableSort(event, getComparator("asc", "SUPPLIER_SITE"))
    const temp2 = stableSort(updatedData, getComparator("asc", "SUPPLIER_SITE"))
    updatedData = [...temp1, ...temp2];
    setSupplerSiteData(updatedData)

    let selectedSUPPLIER_SITE = [];
    if (value.option) {
      valSUPPLIER_SITECCommon.push(value.option);
      if (String(value.option.SUPPLIER_SITE).includes(inputSUPPLIER_SITECCommon)) {
        setInputSUPPLIER_SITECCommon("");
      }
      if (String(value.option.SUPPLIER_SITE).substring(inputSUPPLIER_SITECCommon)) {
        setInputSUPPLIER_SITECCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valSUPPLIER_SITECCommon.length; i++) {
        if (valSUPPLIER_SITECCommon[i]["SUPPLIER_SITE"] === value.removedValue.SUPPLIER_SITE) {
          index = i;
          break;
        }
      }
      valSUPPLIER_SITECCommon.splice(index, 1);
    } else if (value.action === "clear") {
      valSUPPLIER_SITECCommon.splice(0, valSUPPLIER_SITECCommon.length);
    }
    if (event === 0) {
      valSUPPLIER_SITECCommon.push(value)
    }
    if (valSUPPLIER_SITECCommon.length > 0 && typeof valSUPPLIER_SITECCommon[0]['SUPPLIER_SITE'] !== "undefined") {
      valSUPPLIER_SITECCommon.map(
        (item) => {
          selectedSUPPLIER_SITE.push(item.SUPPLIER_SITE);
        }
      )
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          SUPPLIER_SITE: selectedSUPPLIER_SITE,
        };
      });
      setInputSUPPLIER_SITECCommon("");
    } else if (value.length > 0) {
      setOpenDialog(true);
      setDialogData("Please choose valid Supplier Site");
    } else {
      initialDataPO.SUPPLIER_SITE = "";
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          SUPPLIER_SITE: [],
        };
      });
      setInputSUPPLIER_SITECCommon("");
    }
  }

  // const selectPACK_NO = (event, value) => {
  //   let updatedData = []
  //   let selectedDataOptions = []
  //   event.map((res) => {
  //     selectedDataOptions.push(res.PACK_NO)
  //   })
  //   updatedData = packNoData.filter((res) => !selectedDataOptions.includes(res.PACK_NO))
  //   const temp1 = stableSort(event, getComparator("asc", "PACK_NO"))
  //   const temp2 = stableSort(updatedData, getComparator("asc", "PACK_NO"))
  //   updatedData = [...temp1, ...temp2];
  //   setPackNoData(updatedData)

  //   let selectedPACK_NO = [];
  //   if (value.option) {
  //     valPACK_NOCCommon.push(value.option);
  //     if (String(value.option.PACK_NO).includes(inputPACK_NOCCommon)) {
  //       setInputPACK_NOCCommon("");
  //     }
  //     if (String(value.option.PACK_NO).substring(inputPACK_NOCCommon)) {
  //       setInputPACK_NOCCommon("");
  //     }
  //   } else if (value.removedValue) {
  //     let index = 0
  //     for (var i = 0; i < valPACK_NOCCommon.length; i++) {
  //       if (valPACK_NOCCommon[i]["PACK_NO"] === value.removedValue.PACK_NO) {
  //         index = i;
  //         break;
  //       }
  //     }
  //     // Reverse filtering
  //     Rev_fltr(valPACK_NOCCommon[index].PACK_NO, fltrDiff, "PACK_NO", "DIFF_ID", valDIFF_IDCCommon);
  //     Rev_fltr(valPACK_NOCCommon[index].PACK_NO, fltrVPN, "PACK_NO", "VPN", valVPNCCommon);
  //     Rev_fltr(valPACK_NOCCommon[index].PACK_NO, fltrUDA, "PACK_NO", "UDA", valUDACCommon);

  //     valPACK_NOCCommon.splice(index, 1);
  //   } else if (value.action === "clear") {

  //     valPACK_NOCCommon.splice(0, valPACK_NOCCommon.length);
  //   }
  //   if (valPACK_NOCCommon.length > 0 && typeof valPACK_NOCCommon[0]['PACK_NO'] !== "undefined") {
  //     valPACK_NOCCommon.map(
  //       (item) => {
  //         selectedPACK_NO.push(item.PACK_NO);
  //       }
  //     )
  //     setSearchDataCCommon((prev) => {
  //       return {
  //         ...prev,
  //         PACK_NO: selectedPACK_NO,
  //       };
  //     });
  //     var temp = {}
  //     temp["SKU"] = selectedPACK_NO;
  //     // Filtering on select 
  //     filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
  //     filteringData(UniqVPN, temp, "VPN"); // Filtering VPN
  //     filteringData(udaData, temp, "UDA"); // Filtering UDA
  //   } else {
  //     initialDataPO.PACK_NO = "";
  //     // Re-filtering when PACK_NO is empty
  //     var temp = {}
  //     if (searchDataCCommon.SKU.length > 0) {
  //       temp["SKU"] = searchDataCCommon.SKU
  //     } else if (searchDataCCommon.ITEM_PARENT.length > 0) {
  //       temp["ITEM_PARENT"] = searchDataCCommon.ITEM_PARENT
  //     } else if (searchDataCCommon.HIER3.length > 0) {
  //       temp["HIER3"] = searchDataCCommon.HIER3
  //     } else if (searchDataCCommon.HIER2.length > 0) {
  //       temp["HIER2"] = searchDataCCommon.HIER2
  //     }
  //     if (Object.keys(temp).length > 0) {
  //       filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
  //       filteringData(UniqVPN, temp, "VPN"); // Filtering VPN
  //       filteringData(udaData, temp, "UDA"); // Filtering UDA
  //     } else {
  //       setFltrDiff([]);
  //       setFltrVPN([]);
  //       setFltrUDA([]);
  //     }

  //     //setFltrPACK([]);

  //     setSearchDataCPO((prev) => {
  //       return {
  //         ...prev,
  //         PACK_NO: [],
  //       };
  //     });
  //     setSearchDataCCommon((prev) => {
  //       return {
  //         ...prev,
  //         PACK_NO: [],
  //       };
  //     });
  //   }
  // }
  const selectPACK_NO = (event, value) => {
    let updatedData = []
    let selectedDataOptions = []
    event.map((res) => {
      selectedDataOptions.push(res.PACK_NO)
    })
    updatedData = packNoData.filter((res) => !selectedDataOptions.includes(res.PACK_NO))
    const temp1 = stableSort(event, getComparator("asc", "PACK_NO"))
    const temp2 = stableSort(updatedData, getComparator("asc", "PACK_NO"))
    updatedData = [...temp1, ...temp2];
    setPackNoData(updatedData)

    let selectedPACK_NO = [];
    if (value.option) {
      valPACK_NOCCommon.push(value.option);
      if (String(value.option.SUPPLIER).includes(inputPACK_NOCCommon)) {
        setInputPACK_NOCCommon("");
      }
      if (String(value.option.SUPPLIER).substring(inputPACK_NOCCommon)) {
        setInputPACK_NOCCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valPACK_NOCCommon.length; i++) {
        if (valPACK_NOCCommon[i]["PACK_NO"] === value.removedValue.PACK_NO) {
          index = i;
          break;
        }
      }
      valPACK_NOCCommon.splice(index, 1);
    } else if (value.action === "clear") {
      valPACK_NOCCommon.splice(0, valPACK_NOCCommon.length);
    }
    if (event === 0) {
      valPACK_NOCCommon.push(value)
    }
    if (valPACK_NOCCommon.length > 0 && typeof valPACK_NOCCommon[0]['PACK_NO'] !== "undefined") {
      valPACK_NOCCommon.map(
        (item) => {
          selectedPACK_NO.push(item.PACK_NO);
        }
      )
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          PACK_NO: selectedPACK_NO,
        };
      });
      setInputPACK_NOCCommon("");
    } else if (value.length > 0) {
      setOpenDialog(true);
      setDialogData("Please choose valid Pack No");
    } else {
      initialDataPO.PACK_NO = "";
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          PACK_NO: [],
        };
      });
      setInputPACK_NOCCommon("");
    }
  }

  const selectITEM_PARENT = (event, value) => {

    let updatedData = []
    let selectedDataOptions = []
    event.map((res) => {
      selectedDataOptions.push(res.ITEM_PARENT)
    })
    updatedData = UniqItemParent.filter((res) => !selectedDataOptions.includes(res.ITEM_PARENT))
    const temp1 = stableSort(event, getComparator("asc", "ITEM_PARENT"))
    const temp2 = stableSort(updatedData, getComparator("asc", "ITEM_PARENT"))
    updatedData = [...temp1, ...temp2];
    setItemParentData(updatedData)

    let selectedITEM_PARENT = [];
    if (value.option) {
      valITEM_PARENTCCommon.push(value.option);
      if (String(value.option.ITEM_PARENT).includes(inputITEM_PARENTCCommon)) {
        setInputITEM_PARENTCCommon("");
      }
      if (String(value.option.ITEM_PARENT).substring(inputITEM_PARENTCCommon)) {
        setInputITEM_PARENTCCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valITEM_PARENTCCommon.length; i++) {
        if (valITEM_PARENTCCommon[i]["ITEM_PARENT"] === value.removedValue.ITEM_PARENT) {
          index = i;
          break;
        }
      }

      // Reverse filtering
      // Rev_fltr(valITEM_PARENTCCommon[index].ITEM_PARENT, fltrPACK, "ITEM_PARENT", "PACK_NO", valPACK_NOCCommon);
      Rev_fltr(valITEM_PARENTCCommon[index].ITEM_PARENT, fltrDiff, "ITEM_PARENT", "DIFF_ID", valDIFF_IDCCommon);
      Rev_fltr(valITEM_PARENTCCommon[index].ITEM_PARENT, fltrVPN, "ITEM_PARENT", "VPN", valVPNCCommon);
      Rev_fltr(valITEM_PARENTCCommon[index].ITEM_PARENT, fltrUDA, "ITEM_PARENT", "UDA", valUDACCommon);
      Rev_fltr(valITEM_PARENTCCommon[index].ITEM_PARENT, fltrSku, "ITEM_PARENT", "SKU", valSKUCCommon); //Reverse filtering SKU
      // Rev_fltr(valITEM_PARENTCCommon[index].ITEM_PARENT, fltrASN, "ITEM_PARENT", "ASN", valASNCASN);
      // Rev_fltr(valITEM_PARENTCCommon[index].ITEM_PARENT, fltrTSF, "ITEM_PARENT", "TSF", valTSFCTSF);
      valITEM_PARENTCCommon.splice(index, 1);
    } else if (value.action === "clear") {
      valITEM_PARENTCCommon.splice(0, valITEM_PARENTCCommon.length);
    }
    if (valITEM_PARENTCCommon.length > 0 && typeof valITEM_PARENTCCommon[0]['ITEM_PARENT'] !== "undefined") {
      valITEM_PARENTCCommon.map(
        (item) => {
          selectedITEM_PARENT.push(item.ITEM_PARENT);
        }
      )
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          ITEM_PARENT: selectedITEM_PARENT,
        };
      });
      setInputITEM_PARENTCCommon("");
      var temp = {};
      temp["ITEM_PARENT"] = selectedITEM_PARENT;
      // filteringData(packNoData, temp, "PACK_NO"); // Filtering Pack no
      filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
      filteringData(UniqVPN, temp, "VPN"); // Filtering VPN
      filteringData(udaData, temp, "UDA"); // Filtering UDA
      filteringData(skuData, temp, "SKU"); // Filtering SKU
      // filteringData(asnData, temp, "ASN"); // Filtering ASN
      // filteringData(tsfData, temp, "TSF"); // Filtering TSF
    } else {
      initialDataPO.ITEM_PARENT = "";
      // Re-filtering when ITEM_PARENT is empty
      var temp = {}
      if (searchDataCCommon.SKU.length > 0) {
        temp["SKU"] = searchDataCCommon.SKU
        // } else if (searchDataCCommon.PACK_NO.length > 0) {
        //   temp["PACK_NO"] = searchDataCCommon.PACK_NO
      } else if (searchDataCCommon.HIER3.length > 0) {
        temp["HIER3"] = searchDataCCommon.HIER3
      } else if (searchDataCCommon.HIER2.length > 0) {
        temp["HIER2"] = searchDataCCommon.HIER2
      }
      if (Object.keys(temp).length > 0) {
        if (Object.keys(temp).includes("HIER2") || Object.keys(temp).includes("HIER3")) {
          // filteringData(packNoData, temp, "PACK_NO"); // Filtering Pack no
          filteringData(skuData, temp, "SKU"); // Filtering SKU
        } else {
          setFltrSku([]);
          // setFltrPACK([]);
        }
        filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
        filteringData(UniqVPN, temp, "VPN"); // Filtering VPN
        filteringData(udaData, temp, "UDA"); // Filtering UDA
        // filteringData(asnData, temp, "ASN"); // Filtering ASN
        // filteringData(tsfData, temp, "TSF"); // Filtering TSF

      } else {
        setFltrSku([]);
        setFltrDiff([]);
        setFltrVPN([]);
        setFltrUDA([]);
        // setFltrPACK([]);
        // setFltrTSF([]);
        // setFltrASN([]);
      }
      //setFltrITP([]);
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          ITEM_PARENT: [],
        };
      });
      setInputITEM_PARENTCCommon("");
    }
  }

  const selectDIFF_ID = (event, value) => {
    let updatedData = []
    let selectedDataOptions = []
    event.map((res) => {
      selectedDataOptions.push(res.DIFF_ID)
    })
    updatedData = UniqDiff_id.filter((res) => !selectedDataOptions.includes(res.DIFF_ID))
    const temp1 = stableSort(event, getComparator("asc", "DIFF_ID"))
    const temp2 = stableSort(updatedData, getComparator("asc", "DIFF_ID"))
    updatedData = [...temp1, ...temp2];
    setDIffData(updatedData)

    let selectedDIFF_ID = [];
    if (value.option) {
      valDIFF_IDCCommon.push(value.option);
      if (String(value.option.DIFF_ID).substring(inputDIFF_IDCCommon)) {
        setInputDIFF_IDCCommon("");
      }
      if (String(value.option.DIFF_ID).includes(inputDIFF_IDCCommon)) {
        setInputDIFF_IDCCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valDIFF_IDCCommon.length; i++) {
        if (valDIFF_IDCCommon[i]["DIFF_ID"] === value.removedValue.DIFF_ID) {
          index = i;
          break;
        }
      }
      // Reverse filtering SKU when unselect
      Rev_fltr(valDIFF_IDCCommon[index].DIFF_ID, fltrSku, "DIFF_ID", "SKU", valSKUCCommon); //Reverse filtering SKU
      valDIFF_IDCCommon.splice(index, 1);
    } else if (value.action === "clear") {
      valDIFF_IDCCommon.splice(0, valDIFF_IDCCommon.length);
    }

    if (valDIFF_IDCCommon.length > 0 && typeof valDIFF_IDCCommon[0]['DIFF_ID'] !== "undefined") {
      valDIFF_IDCCommon.map(
        (item) => {
          selectedDIFF_ID.push(item.DIFF_ID);
        }
      )
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          DIFF_ID: selectedDIFF_ID,
        };
      });
      setInputDIFF_IDCCommon("");
      // Filtering on select
      var temp = {};
      //var data=[];
      temp["DIFF_ID"] = selectedDIFF_ID;

      filteringData(fltrSku.length > 0 ? fltrSku : skuData, temp, "SKU"); // Filtering SKU

    } else {
      initialDataPO.DIFF_ID = "";
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          DIFF_ID: [],
        };
      });
      setInputDIFF_IDCCommon("");
      // Re-filtering when diff is empty
      var temp = {}
      // if(searchDataCCommon.SKU.length>0){
      //   temp["SKU"]=searchDataCCommon.SKU
      // }else 
      if (searchDataCCommon.ITEM_PARENT.length > 0) {
        temp["ITEM_PARENT"] = searchDataCCommon.ITEM_PARENT
      } else if (searchDataCCommon.HIER3.length > 0) {
        temp["HIER3"] = searchDataCCommon.HIER3
      } else if (searchDataCCommon.HIER2.length > 0) {
        temp["HIER2"] = searchDataCCommon.HIER2
      }
      if (Object.keys(temp).length > 0) {
        filteringData(skuData, temp, "SKU"); // Filtering SKU

      } else {
        setFltrSku([]);
      }
    }
  }

  const selectSKU = (event, value) => {
    let updatedData = []
    let selectedDataOptions = []
    event.map((res) => {
      selectedDataOptions.push(res.SKU)
    })
    updatedData = UniqSKU.filter((res) => !selectedDataOptions.includes(res.SKU))
    const temp1 = stableSort(event, getComparator("asc", "SKU"))
    const temp2 = stableSort(updatedData, getComparator("asc", "SKU"))
    updatedData = [...temp1, ...temp2];
    setSkuData(updatedData)

    let selectedSKU = [];
    if (value.option) {
      valSKUCCommon.push(value.option);
      if (String(value.option.SKU).includes(inputSKUCCommon)) {
        setInputSKUCCommon("");
      }
      if (String(value.option.SKU).substring(inputSKUCCommon)) {
        setInputSKUCCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valSKUCCommon.length; i++) {
        if (valSKUCCommon[i]["SKU"] === value.removedValue.SKU) {
          index = i;
          break;
        }
      }
      // Reverse filtering
      Rev_fltr(valSKUCCommon[index].SKU, fltrDiff, "SKU", "DIFF_ID", valDIFF_IDCCommon);
      Rev_fltr(valSKUCCommon[index].SKU, fltrVPN, "SKU", "VPN", valVPNCCommon);
      Rev_fltr(valSKUCCommon[index].SKU, fltrUDA, "SKU", "UDA", valUDACCommon);
      // Rev_fltr(valSKUCCommon[index].SKU, fltrASN, "SKU", "ASN", valASNCASN);
      // Rev_fltr(valSKUCCommon[index].SKU, fltrTSF, "SKU", "TSF", valTSFCTSF);

      valSKUCCommon.splice(index, 1);
    } else if (value.action === "clear") {
      valSKUCCommon.splice(0, valSKUCCommon.length);
    }
    if (valSKUCCommon.length > 0 && typeof valSKUCCommon[0]['SKU'] !== "undefined") {
      valSKUCCommon.map(
        (item) => {
          selectedSKU.push(item.SKU);
        }
      )
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          SKU: selectedSKU,
        };
      });
      setInputSKUCCommon("");
      var temp = {};
      temp["SKU"] = selectedSKU;
      filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
      filteringData(UniqVPN, temp, "VPN"); // Filtering VPN
      filteringData(udaData, temp, "UDA"); // Filtering UDA
      // filteringData(asnData, temp, "ASN"); // Filtering ASN
      // filteringData(tsfData, temp, "TSF"); // Filtering TSF

    } else {
      initialDataPO.SKU = "";
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          SKU: [],
        };
      });
      setInputSKUCCommon("");
      // Re-filtering when SKU is empty
      var temp = {}
      if (searchDataCCommon.ITEM_PARENT.length > 0) {
        temp["ITEM_PARENT"] = searchDataCCommon.ITEM_PARENT
        // } else if (searchDataCCommon.PACK_NO.length > 0) {
        //   temp["PACK_NO"] = searchDataCCommon.PACK_NO
      } else if (searchDataCCommon.HIER3.length > 0) {
        temp["HIER3"] = searchDataCCommon.HIER3
      } else if (searchDataCCommon.HIER2.length > 0) {
        temp["HIER2"] = searchDataCCommon.HIER2
      }
      if (Object.keys(temp).length > 0) {
        filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
        filteringData(UniqVPN, temp, "VPN"); // Filtering VPN
        filteringData(udaData, temp, "UDA"); // Filtering UDA
        // filteringData(asnData, temp, "ASN"); // Filtering ASN
        // filteringData(tsfData, temp, "TSF"); // Filtering TSF
      } else {
        setFltrDiff([]);
        setFltrVPN([]);
        setFltrUDA([]);
        // setFltrTSF([]);
        // setFltrASN([]);
      }
      //setFltrSku([]);
    }
  }

  const selectVPN = (event, value) => {
    let updatedData = []
    let selectedDataOptions = []
    event.map((res) => {
      selectedDataOptions.push(res.VPN)
    })
    updatedData = UniqVPN.filter((res) => !selectedDataOptions.includes(res.VPN))
    const temp1 = stableSort(event, getComparator("asc", "VPN"))
    const temp2 = stableSort(updatedData, getComparator("asc", "VPN"))
    updatedData = [...temp1, ...temp2];
    setVpnData(updatedData)

    let selectedVPN = [];
    if (value.option) {
      valVPNCCommon.push(value.option);
      if (String(value.option.VPN).substring(inputVPNCCommon)) {
        setInputVPNCCommon("");
      }
      if (String(value.option.VPN).includes(inputVPNCCommon)) {
        setInputVPNCCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valVPNCCommon.length; i++) {
        if (valVPNCCommon[i]["VPN"] === value.removedValue.VPN) {
          index = i;
          break;
        }
      }
      valVPNCCommon.splice(index, 1);
    } else if (value.action === "clear") {
      valVPNCCommon.splice(0, valVPNCCommon.length);
    }

    if (valVPNCCommon.length > 0 && typeof valVPNCCommon[0]['VPN'] !== "undefined") {
      valVPNCCommon.map(
        (item) => {
          selectedVPN.push(item.VPN);
        }
      )
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          VPN: selectedVPN,
        };
      });
      setInputVPNCCommon("");
    } else {
      initialDataPO.VPN = "";
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          VPN: [],
        };
      });
      setInputVPNCCommon("");
    }
  }

  const selectPO = (event, value) => {
    let updatedData = []
    let selectedDataOptions = []
    event.map((res) => {
      selectedDataOptions.push(res.PO)
    })
    updatedData = UniqPO.filter((res) => !selectedDataOptions.includes(res.PO))
    const temp1 = stableSort(event, getComparator("asc", "PO"))
    const temp2 = stableSort(updatedData, getComparator("asc", "PO"))
    updatedData = [...temp1, ...temp2];
    setPoData(updatedData)

    let selectedPO = [];
    if (value.option) {
      valPOCPO.push(value.option);
      if (String(value.option.PO).includes(inputPOCPO)) {
        setInputPOCPO("");
      }
      if (String(value.option.PO).substring(inputPOCPO)) {
        setInputPOCPO("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valPOCPO.length; i++) {
        if (valPOCPO[i]["PO"] === value.removedValue.PO) {
          index = i;
          break;
        }
      }
      valPOCPO.splice(index, 1);
    } else if (value.action === "clear") {
      valPOCPO.splice(0, valPOCPO.length);
    }
    if (event === 0) {
      valPOCPO.push(value)
    }
    if (valPOCPO.length > 0 && typeof valPOCPO[0]['PO'] !== "undefined") {
      valPOCPO.map(
        (item) => {
          selectedPO.push(item.PO);
        }
      )
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          PO: selectedPO,
        };
      });
      setInputPOCPO("");
    } else if (value.length > 0) {
      setOpenDialog(true);
      setDialogData("Please choose valid PO");
    } else {
      initialDataPO.PO = "";
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          PO: [],
        };
      });
      setInputPOCPO("");
    }
  }

  const selectPO_TYPE = (val) => {
    if (val) {
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          PO_TYPE: val.PO_TYPE,
        };
      });
    }
    else {
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          PO_TYPE: "",
        };
      });
    }
  }

  const selectUDA = (e, value) => {
    let updatedData = []
    let selectedDataOptions = []
    e.map((res) => {
      selectedDataOptions.push(res.UDA)
    })
    updatedData = UniqUDA.filter((res) => !selectedDataOptions.includes(res.UDA))
    const temp1 = stableSort(e, getComparator("asc", "UDA"))
    const temp2 = stableSort(updatedData, getComparator("asc", "UDA"))
    updatedData = [...temp1, ...temp2];
    setUdaData(updatedData)

    if (e === "Filter") {
      valUDACCommon.splice(0, valUDACCommon.length);
      valUDACCommon.push(...value);
    }

    let selectedUDA = [];
    if (value.option) {
      valUDACCommon.push(value.option)
      if (String(value.option.UDA).includes(inputUDACCommon)) {
        setInputUDACCommon("");
      }
      if (String(value.option.UDA).substring(inputUDACCommon)) {
        setInputUDACCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valUDACCommon.length; i++) {
        if (valUDACCommon[i]["UDA"] === value.removedValue.UDA) {
          index = i;
          break;
        }
      }
      valUDACCommon.splice(index, 1);

    } else if (value.action === "clear") {
      valUDACCommon.splice(0, valUDACCommon.length);
      valUDA_VALUECCommon.splice(0, valUDA_VALUECCommon.length);
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          UDA_VALUE: [],
        };
      });
      setInputUDACCommon("");
    }
    //manual input handle input and filter itemdata
    //Filtering UDA_VALUE based on UDA
    if (valUDACCommon.length > 0) {
      const filterUDAValueCCommon = (fltrUDA.length > 0 ? fltrUDA : udaData).filter((item) => {
        return (valUDACCommon).some((val) => {
          return item.UDA === val.UDA;
        });
      });
      setFilterUDAValueCCommon(fltrSort(filterUDAValueCCommon, "UDA_VALUE"));
      valUDACCommon.map((item) => {
        selectedUDA.push(item.UDA);
      });

      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          UDA: selectedUDA,
        };
      });
      setInputUDACCommon("");
    } else {
      setFilterUDAValueCCommon([]);
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          UDA: [],
          UDA_VALUE: []
        };
      });
      setInputUDACCommon("");
    }
  }

  const selectUDA_VALUE = (e, value) => {
    let updatedData = []
    let selectedDataOptions = []
    e.map((res) => {
      selectedDataOptions.push(res.UDA_VALUE)
    })
    updatedData = filterUDAValueCCommon.filter((res) => !selectedDataOptions.includes(res.UDA_VALUE))
    const temp1 = stableSort(e, getComparator("asc", "UDA_VALUE"))
    const temp2 = stableSort(updatedData, getComparator("asc", "UDA_VALUE"))
    updatedData = [...temp1, ...temp2];
    setFilterUDAValueCCommon(updatedData)

    let selectedUDA_VALUE = [];
    if (value.option) {
      valUDA_VALUECCommon.push(value.option)
      if (String(value.option.UDA_VALUE).includes(inputUDA_VALUECCommon)) {
        setInputUDA_VALUECCommon("");
      }
      if (String(value.option.UDA_VALUE).substring(inputUDA_VALUECCommon)) {
        setInputUDA_VALUECCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valUDA_VALUECCommon.length; i++) {
        if (valUDA_VALUECCommon[i]["UDA_VALUE"] === value.removedValue.UDA_VALUE) {
          index = i;
          break;
        }
      }
      valUDA_VALUECCommon.splice(index, 1);

    } else if (value.action === "clear") {
      valUDA_VALUECCommon.splice(0, valUDA_VALUECCommon.length);
    }
    //manual input handle input and filter itemdata

    //Filtering UDA_VALUE based on UDA
    if (valUDA_VALUECCommon.length > 0) {

      valUDA_VALUECCommon.map((item) => {
        selectedUDA_VALUE.push(item.UDA_VALUE);
      });
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          UDA_VALUE: selectedUDA_VALUE,
        };
      });
      setInputUDA_VALUECCommon("");
    } else {
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          UDA_VALUE: selectedUDA_VALUE,
        };
      });
      setInputUDA_VALUECCommon("");
    }
  }

  const selectEXCLUDE_UDA = (e, value) => {
    let updatedData = []
    let selectedDataOptions = []

    if (value.action === "select-option") {
      Object.keys(e).map((res) => {
        selectedDataOptions.push(e["EXCLUDE_UDA"])
      })
      updatedData = UniqExcludeUDA.filter((res) => !selectedDataOptions.includes(res.EXCLUDE_UDA))
      const temp1 = stableSort(e, getComparator("asc", "EXCLUDE_UDA"))
      const temp2 = stableSort(updatedData, getComparator("asc", "EXCLUDE_UDA"))
      updatedData = [...temp1, ...temp2];
      setExcludeUdaData(updatedData)

      let var1 = [e]

      const filterEXCLUDE_UDAValueCCommon = excludeUdaData.filter((item) => {
        return (var1).some((val) => {
          return item.EXCLUDE_UDA === val.EXCLUDE_UDA;
        });
      });
      setFilterEXCLUDE_UDAValueCCommon(filterEXCLUDE_UDAValueCCommon);
    }

    if (e) {
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          // CONTEXT: val.CODE,
          EXCLUDE_UDA: e.EXCLUDE_UDA
        };
      });
    }
    // if (value.action === "clear") {
    else {
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          EXCLUDE_UDA: [],
          EXCLUDE_UDA_VALUE: [],
          // CONTEXT_CODE: "",
        };
      });
    }
  }

  const selectEXCLUDE_UDA_VALUE = (e, value) => {
    let updatedData = []
    let selectedDataOptions = []
    if (value.action === "select-option") {
      Object.keys(e).map((res) => {
        selectedDataOptions.push(e["EXCLUDE_UDA_VALUE"])
      })
      updatedData = filterEXCLUDE_UDAValueCCommon.filter((res) => !selectedDataOptions.includes(res.EXCLUDE_UDA_VALUE))
      const temp1 = stableSort(e, getComparator("asc", "EXCLUDE_UDA_VALUE"))
      const temp2 = stableSort(updatedData, getComparator("asc", "EXCLUDE_UDA_VALUE"))
      updatedData = [...temp1, ...temp2];
      setFilterEXCLUDE_UDAValueCCommon(updatedData)
    }

    if (e) {
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          // CONTEXT: val.CODE,
          EXCLUDE_UDA_VALUE: e.EXCLUDE_UDA_VALUE
        };
      });
    }
    // if (value.action === "clear") {
    else {
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          EXCLUDE_UDA_VALUE: [],
          // CONTEXT_CODE: "",
        };
      });
    }
  }

  const selectASNCASN = (event, value) => {
    let updatedData = []
    let selectedDataOptions = []
    event.map((res) => {
      selectedDataOptions.push(res.ASN)
    })
    updatedData = asnData.filter((res) => !selectedDataOptions.includes(res.ASN))
    const temp1 = stableSort(event, getComparator("asc", "ASN"))
    const temp2 = stableSort(updatedData, getComparator("asc", "ASN"))
    updatedData = [...temp1, ...temp2];
    setAsnData(updatedData)

    let selectedASN = [];
    if (value.option) {
      valASNCASN.push(value.option);
      if (String(value.option.ASN).substring(inputASNCASN)) {
        setInputASNCASN("");
      }
      if (String(value.option.ASN).includes(inputASNCASN)) {
        setInputASNCASN("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valASNCASN.length; i++) {
        if (valASNCASN[i]["ASN"] === value.removedValue.ASN) {
          index = i;
          break;
        }
      }
      valASNCASN.splice(index, 1);
    } else if (value.action === "clear") {
      valASNCASN.splice(0, valASNCASN.length);
    }
    if (event === 0) {
      valASNCASN.push(value)
    }
    if (valASNCASN.length > 0 && typeof valASNCASN[0]['ASN'] !== "undefined") {
      valASNCASN.map(
        (item) => {
          selectedASN.push(item.ASN);
        }
      )
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          ASN: selectedASN,
        };
      });
      setInputASNCASN("");
    } else if (value.length > 0) {
      setOpenDialog(true);
      setDialogData("Please choose valid ASN");
    } else {
      initialDataASN.ASN = "";
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          ASN: [],
        };
      });
      setInputASNCASN("");
    }
  }

  const selectTSFCTSF = (event, value) => {

    let updatedData = []
    let selectedDataOptions = []
    event.map((res) => {
      selectedDataOptions.push(res.TSF)
    })
    updatedData = tsfData.filter((res) => !selectedDataOptions.includes(res.TSF))
    const temp1 = stableSort(event, getComparator("asc", "TSF"))
    const temp2 = stableSort(updatedData, getComparator("asc", "TSF"))
    updatedData = [...temp1, ...temp2];
    setTsfData(updatedData)

    let selectedTSF = [];
    if (value.option) {
      valTSFCTSF.push(value.option);
      if (String(value.option.TSF).substring(inputTSFCTSF)) {
        setInputTSFCTSF("");
      }
      if (String(value.option.TSF).includes(inputTSFCTSF)) {
        setInputTSFCTSF("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valTSFCTSF.length; i++) {
        if (valTSFCTSF[i]["TSF"] === value.removedValue.TSF) {
          index = i;
          break;
        }
      }
      valTSFCTSF.splice(index, 1);
    } else if (value.action === "clear") {
      valTSFCTSF.splice(0, valTSFCTSF.length);
    }
    if (event === 0) {
      valTSFCTSF.push(value)
    }
    if (valTSFCTSF.length > 0 && typeof valTSFCTSF[0]['TSF'] !== "undefined") {
      valTSFCTSF.map(
        (item) => {
          selectedTSF.push(item.TSF);
        }
      )
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          TSF: selectedTSF,
        };
      });
      setInputTSFCTSF("");
    } else if (value.length > 0) {
      setOpenDialog(true);
      setDialogData("Please choose valid TSF");
    } else {
      initialDataTSF.TSF = "";
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          TSF: [],
        };
      });
      setInputTSFCTSF("");
    }
  }

  ///////////////////////////////////////////

  const handleClickOpenWH = (ValueAvail) => {
    if (ValueAvail[1] === "DIFF_ID") {
      setAvailValCheck(ValueAvail[0])

    }
    if (ValueAvail[1] === "WH") {
      setAvailValCheck(ValueAvail[0])
    }
    if (ValueAvail[1] === "HIER1") {
      setAvailValCheck(ValueAvail[0])

    }
    if (ValueAvail[1] === "HIER2") {
      setAvailValCheck(ValueAvail[0])
    }
    if (ValueAvail[1] === "HIER3") {
      setAvailValCheck(ValueAvail[0])
    }
    if (ValueAvail[1] === "ITEM") {
      setAvailValCheck(ValueAvail[0])
    }


    setOpenWH(true);
  };
  const handleCloseWH = () => {
    setOpenWH(false);
    setAvailValCheck("")
  };

  const SearchGridAvail = ({ ValueAvail }) => (
    <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} >
      <InfoIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em', color: "CadetBlue" }}
        onClick={() => handleClickOpenWH(ValueAvail)} size="small" variant="outlined" />
    </IconButton>
  )

  ///////////////////////////////////////
  //HTML CRITERIA//////////////////////
  ///////////////
  // const ValueComponent = ({ children, ...props }) => {
  //   const { getValue, hasValue } = props;
  //   const length = getValue().length;
  //   if (!hasValue) {
  //     return (
  //       <components.ValueContainer {...props}>
  //         {children}
  //       </components.ValueContainer>
  //     );
  //   }
  //   return (
  //     <components.ValueContainer {...props}>
  //       {`${length} options`}
  //     </components.ValueContainer>
  //   );
  // };

  const ValueContainer = ({ children, getValue, ...props }) => {
    let maxToShow = 1;
    var length = getValue().length;
    let displayChips = React.Children.toArray(children).slice(0, maxToShow);
    let shouldBadgeShow = length > maxToShow;
    let displayLength = length - maxToShow;

    return (
      <components.ValueContainer {...props}>
        {!props.selectProps.inputValue && displayChips}
        <div className="root">
          {shouldBadgeShow &&
            `+ ${displayLength} item${length != 1 ? "s" : ""} selected`}
        </div>
      </components.ValueContainer>
    );
  };

  // const Control = ({ children, ...props }) => (
  //   <components.Control {...props}>
  //     {children}
  //     <Button size="small" sx={{ margin: "0px", padding: "0px", minWidth: "0px" }} startIcon={<SearchIcon sx={{ padding: 0 }} />}>{//////////consolelog("cancel")}</Button>
  //   </components.Control>
  // )

  const SelectPO_Ind = (e) => {
    if (e.target.checked === true) { setSearchDataCCommon((prev) => { return { ...prev, PACK_IND: 'Y', }; }); }
    else { setSearchDataCCommon((prev) => { return { ...prev, PACK_IND: 'N', }; }); }
  }


  const SearchCriteria = () => (
    <Box
      display="inline-block"
      sx={{
        backgroundColor: "",
        height: "auto",
        // marginLeft: "5px",
        padding: "0rem 0rem",
        width: "100%",
        // border:"1px solid gray",
        // borderRadius:"5px",
      }}
    >
      <div className={CreateAllocationClasses.float_container}>
        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Hier1</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              // className= {CreateAllocationClasses.inputField}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.HIER1.toString()}-${option.HIER1_DESC.toString()}`}
              getOptionValue={option => option.HIER1}
              options={UniqDept.length > 0 ? UniqDept : []}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputHIER1CCommon(value); // <---
              }}
              inputValue={inputHIER1CCommon}
              onChange={selectHIER1}
              maxMenuHeight={180}
              // placeholder={"Choose a Dept"}
              hideSelectedOptions={false}
              styles={styleSelect}
              menuPlacement="auto"
              isSearchable={true}
              components={animatedComponents}
              isMulti
              // defaultValue={searchDataCCommon.HIER1.length>0 ? searchDataCCommon.HIER1[0]:[]}
              // components={{ ValueContainer }}
              // components={{ Control }}
              isClearable={true}
              value={UniqDept.filter(obj => searchDataCCommon?.HIER1.includes(obj.HIER1))}
              closeMenuOnSelect={false}
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)) || ApproveFreeseCheck
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Hier2</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              closeMenuOnSelect={false}
              // className= {CreateAllocationClasses.inputField}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.HIER2.toString()}-${option.HIER2_DESC.toString()}`}
              getOptionValue={option => option.HIER2}
              options={(UniqClass.length > 0) ? UniqClass : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputHIER2CCommon(value);
              }}
              inputValue={inputHIER2CCommon}
              onChange={selectHIER2}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a Class"}
              styles={styleSelect}
              components={animatedComponents}
              isMulti
              value={UniqClass.filter(obj => searchDataCCommon?.HIER2.includes(obj.HIER2))}
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    ? false : true)) || ApproveFreeseCheck
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Hier3</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              closeMenuOnSelect={false}
              // className= {CreateAllocationClasses.inputField}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.HIER3.toString()}-${option.HIER3_DESC.toString()}`}
              getOptionValue={option => option.HIER3}
              options={fltrH3.length > 0 || searchDataCCommon.HIER2.length > 0 ? fltrH3 : (UniqSubClass.length > 0) ? UniqSubClass : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputHIER3CCommon(value);
              }}
              inputValue={inputHIER3CCommon}
              onChange={selectHIER3}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Subclass"}
              styles={styleSelect}
              components={animatedComponents}
              isMulti
              // value={searchDataCPO.HIER3}
              value={fltrH3.length > 0 ? fltrH3.filter(obj => searchDataCCommon?.HIER3.includes(obj.HIER3))
                : UniqSubClass.filter(obj => searchDataCCommon?.HIER3.includes(obj.HIER3))}
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  && searchDataCCommon["HIER2"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    && searchDataCCommon["HIER2"].length
                    ? false : true)) || ApproveFreeseCheck
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              WH</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.WH.toString()}-(${option.WH_DESC.toString()})`}
              getOptionValue={option => option.WH}
              options={warehouseData.length > 0 ? warehouseData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputWHCCommon(value);
              }}
              inputValue={inputWHCCommon}
              onChange={selectWH}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={warehouseData.filter(obj => searchDataCCommon?.WH.includes(obj.WH))}
              isMulti
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)) || ApproveFreeseCheck ||
                searchHeaderData.ALLOC_CRITERIA === "Pre Buy"
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Supplier</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.SUPPLIER.toString()}-(${option.SUPPLIER_NAME.toString()})`}
              getOptionValue={option => option.SUPPLIER}
              options={supplierData.length > 0 ? supplierData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputSUPPLIERCCommon(value);
              }}
              inputValue={inputSUPPLIERCCommon}
              onChange={selectSUPPLIER}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={supplierData.filter(obj => searchDataCCommon?.SUPPLIER.includes(obj.SUPPLIER))}
              isMulti
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)) || ApproveFreeseCheck
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Supplier Site</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.SUPPLIER_SITE.toString()}-(${option.SUPPLIER_NAME.toString()})`}
              getOptionValue={option => option.SUPPLIER_SITE}
              options={supplerSiteData.length > 0 ? supplerSiteData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputSUPPLIER_SITECCommon(value);
              }}
              inputValue={inputSUPPLIER_SITECCommon}
              onChange={selectSUPPLIER_SITE}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // isClearable={true}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={supplerSiteData.filter(obj => searchDataCCommon?.SUPPLIER_SITE.includes(obj.SUPPLIER_SITE))}
              isMulti
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)) || ApproveFreeseCheck
              }
            />
          </div>
        </div>

        {searchHeaderData.ALLOC_LEVEL === "D" ? null :
          <div className={CreateAllocationClasses.float_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                Pack No</InputLabel>
            </div>
            <div>
              <Select
                closeMenuOnSelect={false}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.PACK_NO.toString()}`}
                getOptionValue={option => option.PACK_NO}
                options={fltrPACK.length > 0 || (searchDataCCommon.HIER2.length > 0 || searchDataCCommon.HIER3.length > 0) ?
                  fltrPACK.length > 0
                    ? [...new Map(fltrPACK.map((item) => [item["PACK_NO"], item])).values()]
                    : []
                  : packNoData.length > 0 ? packNoData : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputPACK_NOCCommon(value);
                }}
                inputValue={inputPACK_NOCCommon}
                onChange={selectPACK_NO}
                hideSelectedOptions={false}
                menuPlacement="auto"
                maxMenuHeight={180}
                // placeholder={"Choose a Warehouse"}
                styles={styleSelect}
                components={animatedComponents}
                value={packNoData.filter(obj => searchDataCCommon?.PACK_NO.includes(obj.PACK_NO))}
                isMulti
                isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      ? false : true)) || ApproveFreeseCheck
                }
              />
            </div>
          </div>}

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Style</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              //disabled={filterItem.length > 0 ?false:true}
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.ITEM_PARENT.toString()}`}
              getOptionValue={option => option.ITEM_PARENT}
              options={fltrITP.length > 0 || (searchDataCCommon.HIER2.length > 0 || searchDataCCommon.HIER3.length > 0) ?
                fltrITP.length > 0
                  ? [...new Map(fltrITP.map((item) => [item["ITEM_PARENT"], item])).values()]
                  : []
                : UniqItemParent.length > 0 ? UniqItemParent : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputITEM_PARENTCCommon(value);
              }}
              inputValue={inputITEM_PARENTCCommon}
              onChange={selectITEM_PARENT}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a ITEM"}
              styles={styleSelect}
              components={animatedComponents}
              isMulti
              value={UniqItemParent.filter(obj => searchDataCCommon?.ITEM_PARENT.includes(obj.ITEM_PARENT))}
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    ? false : true)) || ApproveFreeseCheck
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Variant</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.DIFF_ID.toString()}`}
              getOptionValue={option => option.DIFF_ID}
              options={fltrDiff.length > 0 || (searchDataCCommon.HIER2.length > 0 || searchDataCCommon.HIER3.length > 0) ?
                fltrDiff.length > 0
                  ? [...new Map(fltrDiff.map((item) => [item["DIFF_ID"], item])).values()]
                  : []
                : diffData.length > 0 ? UniqDiff_id : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputDIFF_IDCCommon(value);
              }}
              inputValue={inputDIFF_IDCCommon}
              onChange={selectDIFF_ID}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={diffData.filter(obj => searchDataCCommon?.DIFF_ID.includes(obj.DIFF_ID))}
              isMulti
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    ? false : true)) || ApproveFreeseCheck
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Sku</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.SKU.toString()}`}
              getOptionValue={option => option.SKU}
              options={fltrSku.length > 0 || (searchDataCCommon.HIER2.length > 0 || searchDataCCommon.HIER3.length > 0) ?
                fltrSku.length > 0
                  ? [...new Map(fltrSku.map((item) => [item["SKU"], item])).values()]
                  : []
                : UniqSKU.length > 0 ? UniqSKU : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputSKUCCommon(value);
              }}
              inputValue={inputSKUCCommon}
              onChange={selectSKU}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={skuData.filter(obj => searchDataCCommon?.SKU.includes(obj.SKU))}
              isMulti
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    ? false : true)) || ApproveFreeseCheck
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Sku List</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.ITEM_LIST.toString()}-${option.ITEM_LIST_DESC.toString()}`}
              getOptionValue={option => option.ITEM_LIST}
              options={itemListHeadData.length > 0 ? itemListHeadData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputITEM_LISTCCommon(value);
              }}
              inputValue={inputITEM_LISTCCommon}
              onChange={selectITEM_LIST}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={itemListHeadData.filter(obj => searchDataCCommon?.ITEM_LIST.includes(obj.ITEM_LIST))}
              isMulti
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)) || ApproveFreeseCheck
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              VPN</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.VPN.toString()}`}
              getOptionValue={option => option.VPN}
              options={fltrVPN.length > 0 || (searchDataCCommon.HIER2.length > 0 || searchDataCCommon.HIER3.length > 0) ?
                fltrVPN.length > 0
                  ? [...new Map(fltrVPN.map((item) => [item["VPN"], item])).values()]
                  : []
                : UniqVPN.length > 0 ? UniqVPN : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputVPNCCommon(value);
              }}
              inputValue={inputVPNCCommon}
              onChange={selectVPN}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={UniqVPN.filter(obj => searchDataCCommon?.VPN.includes(obj.VPN))}
              isMulti
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    ? false : true)) || ApproveFreeseCheck
              }
            />
          </div>
        </div>


        {searchHeaderData.ALLOC_CRITERIA === "Purchase Order" ? [
          <div className={CreateAllocationClasses.float_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                PO</InputLabel>
            </div>
            <div>
              <Select
                closeMenuOnSelect={false}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.PO.toString()}`}
                getOptionValue={option => option.PO}
                options={UniqPO.length > 0 ? UniqPO : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputPOCPO(value);
                }}
                inputValue={inputPOCPO}
                onChange={selectPO}
                hideSelectedOptions={false}
                menuPlacement="auto"
                maxMenuHeight={180}
                // placeholder={"Choose a Warehouse"}
                styles={styleSelect}
                components={animatedComponents}
                value={UniqPO.filter(obj => searchDataCCommon?.PO.includes(obj.PO))}
                isMulti
                isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      ? false : true)) || ApproveFreeseCheck
                }
              />
            </div>
          </div>,

          <div className={CreateAllocationClasses.float_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                PO Type</InputLabel>
            </div>
            <div>
              <Select
                closeMenuOnSelect={false}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.PO_TYPE.toString()}`}
                getOptionValue={option => option.PO_TYPE}
                options={UniqPOType.length > 0 ? UniqPOType : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputPO_TYPECPO(value);
                }}
                inputValue={inputPO_TYPECPO}
                onChange={selectPO_TYPE}
                hideSelectedOptions={false}
                menuPlacement="auto"
                maxMenuHeight={180}
                isClearable={true}
                // placeholder={"Choose a Warehouse"}
                styles={styleSelect}
                components={animatedComponents}
                value={UniqPOType.filter(obj => searchDataCCommon?.PO_TYPE.includes(obj.PO_TYPE))}
                // isMulti
                isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      ? false : true)) || ApproveFreeseCheck
                }
              />
            </div>
          </div>,

          <div className={CreateAllocationClasses.float_child}>
            <div>
              {(isValidCTEDT && searchDataCCommon["EISD_END_DATE"].length > 0 && searchDataCCommon["EISD_START_DATE"].length === 0) ||
                (isGreatCTEDF && isGreatCTEDT && searchDataCCommon["EISD_END_DATE"].length > 0 && searchDataCCommon["EISD_START_DATE"].length > 0) ?
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left', color: "#b22222" }}>
                  EISD From*</InputLabel> :
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                  EISD From</InputLabel>}
            </div>
            <div>
              <TextField
                size="small"
                variant="outlined"
                type="date"
                name="EISD_START_DATE"
                autoComplete='off'
                helperText=""
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0"
                  }
                }}
                onChange={onChangeCPO}
                value={searchDataCCommon.EISD_START_DATE}
                id="outlined-disabled"
                // label="EISD From"
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12, height: "32px" },
                  className: CreateAllocationClasses.inputFielddate,
                }}
                inputProps={{ sx: { backgroundColor: '#fff' } }}
                error={
                  (isValidCTEDT && searchDataCCommon["EISD_END_DATE"].length > 0 && searchDataCCommon["EISD_START_DATE"].length === 0) ||
                  (isGreatCTEDF && isGreatCTEDT && searchDataCCommon["EISD_END_DATE"].length > 0 && searchDataCCommon["EISD_START_DATE"].length > 0)
                }
                disabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      ? false : true)) || ApproveFreeseCheck
                }
              />
            </div>
          </div>,

          <div className={CreateAllocationClasses.float_child}>
            <div>
              {(isValidCTEDF && searchDataCCommon["EISD_START_DATE"].length > 0 && searchDataCCommon["EISD_END_DATE"].length === 0) ||
                (isGreatCTEDF && isGreatCTEDT && searchDataCCommon["EISD_END_DATE"].length > 0 && searchDataCCommon["EISD_START_DATE"].length > 0) ?
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left', color: "#b22222" }}>
                  EISD To*</InputLabel> :
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                  EISD To</InputLabel>}
            </div>
            <div>
              <TextField
                size="small"
                type="date"
                name="EISD_END_DATE"
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0"
                  }
                }}
                onChange={onChangeCPO}
                value={searchDataCCommon.EISD_END_DATE}
                autoComplete='off'
                id="outlined-disabled"
                // label="EISD To"
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12, height: "32px" },
                  className: CreateAllocationClasses.inputFielddate,
                }}
                inputProps={{ sx: { backgroundColor: '#fff' } }}
                error={(isValidCTEDF && searchDataCCommon["EISD_START_DATE"].length > 0 && searchDataCCommon["EISD_END_DATE"].length === 0) ||
                  (isGreatCTEDF && isGreatCTEDT && searchDataCCommon["EISD_END_DATE"].length > 0 && searchDataCCommon["EISD_START_DATE"].length > 0)
                }
                disabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      ? false : true)) || ApproveFreeseCheck
                }
              />
            </div>
          </div>,

          <div className={CreateAllocationClasses.float_child}>
            <div>
              {(isValidCTNDT && searchDataCCommon["END_DATE"].length > 0 && searchDataCCommon["START_DATE"].length === 0) ||
                (isGreatCTNDT && isGreatCTNDF && searchDataCCommon["START_DATE"].length > 0 && searchDataCCommon["END_DATE"].length > 0) ?
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left', color: "#b22222" }}>
                  Not Before Date From*</InputLabel> :
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                  Not Before Date From</InputLabel>}
            </div>
            <div>
              <TextField
                size="small"
                type="date"
                name="START_DATE"
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0"
                  }
                }}
                onChange={onChangeCPO}
                value={searchDataCCommon.START_DATE}
                id="outlined-disabled"
                autoComplete='off'
                // label="Not Before Date From"
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12, height: "32px" },
                  className: CreateAllocationClasses.inputFielddate,
                }}
                inputProps={{ sx: { backgroundColor: '#fff' } }}
                error={
                  (isValidCTNDT && searchDataCCommon["END_DATE"].length > 0 && searchDataCCommon["START_DATE"].length === 0) ||
                  (isGreatCTNDT && isGreatCTNDF && searchDataCCommon["START_DATE"].length > 0 && searchDataCCommon["END_DATE"].length > 0)
                }
                disabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      ? false : true)) || ApproveFreeseCheck
                }
              />
            </div>
          </div>,

          <div className={CreateAllocationClasses.float_child}>
            <div>
              {(isValidCTNDF && searchDataCCommon["START_DATE"].length > 0 && searchDataCCommon["END_DATE"].length === 0) ||
                (isGreatCTNDT && isGreatCTNDF && searchDataCCommon["START_DATE"].length > 0 && searchDataCCommon["END_DATE"].length > 0) ?
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left', color: "#b22222" }}>
                  Not Before Date To*</InputLabel> :
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                  Not Before Date To</InputLabel>}
            </div>
            <div>
              <TextField
                size="small"
                type="date"
                name="END_DATE"
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0"
                  }
                }}
                onChange={onChangeCPO}
                value={searchDataCCommon.END_DATE}
                id="outlined-disabled"
                autoComplete='off'
                // label="Not Before Date To"
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12, height: "32px" },
                  className: CreateAllocationClasses.inputFielddate,
                }}
                inputProps={{ sx: { backgroundColor: '#fff' } }}
                error={
                  (isValidCTNDF && searchDataCCommon["START_DATE"].length > 0 && searchDataCCommon["END_DATE"].length === 0) ||
                  (isGreatCTNDT && isGreatCTNDF && searchDataCCommon["START_DATE"].length > 0 && searchDataCCommon["END_DATE"].length > 0)
                }
                disabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      ? false : true)) || ApproveFreeseCheck
                }
              />
            </div>
          </div>
        ] : null}

        {(searchHeaderData.ALLOC_CRITERIA === "Warehouse" || searchHeaderData.ALLOC_CRITERIA === "Pre Buy") ? [
          <div className={CreateAllocationClasses.float_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                Avail Qty &gt;=</InputLabel>
            </div>
            <div>
              <TextField
                size="small"
                name="MIN_AVAIL_QTY"
                sx={{
                  // backgroundColor:"green",
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0",
                    borderRadius: "5px",
                    // height: "15px",
                  }
                }}
                onChange={onChangeCWH}
                value={searchDataCCommon.MIN_AVAIL_QTY}
                id="outlined-disabled"
                autoComplete='off'
                // label="Avail Qty &gt;="
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  className: CreateAllocationClasses.inputFielddate,
                  style: { fontSize: 12, height: "32px", backgroundColor: "white" },
                }}
                inputProps={{ sx: { backgroundColor: '#fff' } }}
                // style={{
                //   backgroundColor: "red"
                // }}
                // variant="outlined" 
                disabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    && searchDataCCommon["HIER1"].length
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      && searchDataCCommon["HIER1"].length
                      ? false : true)) || ApproveFreeseCheck ||
                  searchHeaderData.ALLOC_CRITERIA === "Pre Buy"
                }
              />
            </div>
          </div>,

          <div className={CreateAllocationClasses.float_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                Avail Qty &lt;=</InputLabel>
            </div>
            <div>
              <TextField
                size="small"
                name="MAX_AVAIL_QTY"
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0",
                    borderRadius: "5px",
                    height: "15px",
                  }
                }}
                onChange={onChangeCWH}
                value={searchDataCCommon.MAX_AVAIL_QTY}
                id="outlined-disabled"
                autoComplete='off'
                // label="Not Before Date To"
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12, height: "32px" },
                  className: CreateAllocationClasses.inputFielddate,
                }}
                inputProps={{ sx: { backgroundColor: '#fff' } }}
                disabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    && searchDataCCommon["HIER1"].length
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      && searchDataCCommon["HIER1"].length
                      ? false : true)) || ApproveFreeseCheck ||
                  searchHeaderData.ALLOC_CRITERIA === "Pre Buy"
                }
              />
            </div>
          </div>
        ] : null}

        {searchHeaderData.ALLOC_CRITERIA === "ASN" ?
          <div className={CreateAllocationClasses.float_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                ASN</InputLabel>
            </div>
            <div>
              <Select
                closeMenuOnSelect={false}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.ASN.toString()}`}
                getOptionValue={option => option.ASN}
                options={asnData.length > 0 ? asnData : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputASNCASN(value);
                }}
                inputValue={inputASNCASN}
                onChange={selectASNCASN}
                hideSelectedOptions={false}
                menuPlacement="auto"
                maxMenuHeight={180}
                // placeholder={"Choose a Warehouse"}
                styles={styleSelect}
                components={animatedComponents}
                value={asnData.filter(obj => searchDataCCommon?.ASN.includes(obj.ASN))}
                isMulti
                isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      ? false : true)) || ApproveFreeseCheck
                }
              />
            </div>
          </div>
          : null}

        {searchHeaderData.ALLOC_CRITERIA === "Transfer" ?
          <div className={CreateAllocationClasses.float_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                Transfer</InputLabel>
            </div>
            <div>
              <Select
                closeMenuOnSelect={false}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.TSF.toString()}`}
                getOptionValue={option => option.TSF}
                options={tsfData.length > 0 ? tsfData : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputTSFCTSF(value);
                }}
                inputValue={inputTSFCTSF}
                onChange={selectTSFCTSF}
                hideSelectedOptions={false}
                menuPlacement="auto"
                maxMenuHeight={180}
                // placeholder={"Choose a Warehouse"}
                styles={styleSelect}
                components={animatedComponents}
                value={tsfData.filter(obj => searchDataCCommon?.TSF.includes(obj.TSF))}
                isMulti
                isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      ? false : true)) || ApproveFreeseCheck
                }
              />
            </div>
          </div>
          : null}

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Extended Attribute</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.UDA.toString()}-${option.USER_ATTR_DESC.toString()}`}
              getOptionValue={option => option.UDA}
              options={fltrUDA.length > 0 || (searchDataCCommon.HIER2.length > 0 || searchDataCCommon.HIER3.length > 0) ?
                fltrUDA.length > 0
                  ? [...new Map(fltrUDA.map((item) => [item["UDA"], item])).values()]
                  : []
                : UniqUDA.length > 0 ? UniqUDA : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputUDACCommon(value);
              }}
              inputValue={inputUDACCommon}
              onChange={selectUDA}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              isOptionDisabled={() => valUDACCommon.length >= 3}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={UniqUDA.filter(obj => searchDataCCommon?.UDA.includes(obj.UDA))}
              isMulti
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    ? false : true)) || ApproveFreeseCheck
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Attribute Value</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.UDA_VALUE.toString()} (${option.USER_ATTR_VALUE_DESC.toString()})`}
              getOptionValue={option => option.UDA_VALUE}
              options={filterUDAValueCCommon.length > 0 ? filterUDAValueCCommon : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputUDA_VALUECCommon(value);
              }}
              inputValue={inputUDA_VALUECCommon}
              onChange={selectUDA_VALUE}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={filterUDAValueCCommon.filter(obj => searchDataCCommon?.UDA_VALUE.includes(obj.UDA_VALUE))}
              isMulti
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  && searchDataCCommon["UDA"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    && searchDataCCommon["UDA"].length
                    ? false : true)) || ApproveFreeseCheck
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Exclude UDA</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.EXCLUDE_UDA.toString()}-${option.USER_ATTR_DESC.toString()}`}
              getOptionValue={option => option.EXCLUDE_UDA}
              options={UniqExcludeUDA.length > 0 ? UniqExcludeUDA : []}
              isSearchable={true}
              // onInputChange={(value, action) => {
              //   if (action.action === "input-change") setInputEXCLUDE_UDACCommon(value);
              // }}
              // inputValue={inputEXCLUDE_UDACCommon}
              onChange={selectEXCLUDE_UDA}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              isClearable={true}
              // isOptionDisabled={() => valEXCLUDE_UDACCommon.length >= 3}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              // value={UniqExcludeUDA.filter(obj => searchDataCCommon?.EXCLUDE_UDA.includes(obj.EXCLUDE_UDA))}
              value={UniqExcludeUDA.filter(obj => searchDataCCommon?.EXCLUDE_UDA === (obj.EXCLUDE_UDA))}
              // isMulti
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  && searchDataCCommon["UDA"].length
                  && searchDataCCommon["UDA_VALUE"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    && searchDataCCommon["UDA"].length
                    && searchDataCCommon["UDA_VALUE"].length
                    ? false : true)) || ApproveFreeseCheck || searchHeaderData.ALLOC_LEVEL === "D"
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Exclude UDA Value</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.EXCLUDE_UDA_VALUE.toString()}-${option.USER_ATTR_VALUE_DESC.toString()}`}
              getOptionValue={option => option.EXCLUDE_UDA_VALUE}
              options={filterEXCLUDE_UDAValueCCommon.length > 0 ? filterEXCLUDE_UDAValueCCommon : []}
              isSearchable={true}
              // onInputChange={(value, action) => {
              //   if (action.action === "input-change") setInputEXCLUDE_UDA_VALUECCommon(value);
              // }}
              // inputValue={inputEXCLUDE_UDA_VALUECCommon}
              onChange={selectEXCLUDE_UDA_VALUE}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              isClearable={true}
              components={animatedComponents}
              // value={filterEXCLUDE_UDAValueCCommon.filter(obj => searchDataCCommon?.EXCLUDE_UDA_VALUE.includes(obj.EXCLUDE_UDA_VALUE))}
              value={filterEXCLUDE_UDAValueCCommon.filter(obj => searchDataCCommon?.EXCLUDE_UDA_VALUE === (obj.EXCLUDE_UDA_VALUE))}
              // isMulti
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  && searchDataCCommon["EXCLUDE_UDA"].toString().length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    && searchDataCCommon["EXCLUDE_UDA"].toString().length
                    ? false : true)) || ApproveFreeseCheck || searchHeaderData.ALLOC_LEVEL === "D"
              }
            />
          </div>
        </div>

        {searchHeaderData.ALLOC_CRITERIA === "Purchase Order" ?
          <div className={CreateAllocationClasses.float_child}>
            <div>
              <Button sx={{
                backgroundColor: "", fontSize: "12px",
                padding: "5px", fontFamily: "system-ui",
                width: "130px", height: "32px",
                marginLeft: "0px", paddingLeft: "0px", marginTop: "18px",
                '&.Mui-disabled': {
                  opacity: 0.5,
                  backgroundColor: 'DodgerBlue',
                  color: '#fff',
                },
              }}
                disabled={ApproveFreeseCheck}
                onClick={HandleClickMultiPO}
                startIcon={<SourceIcon />}
                variant="contained">PO Details</Button>
            </div>
          </div>
          : null}

        {/* <div className={CreateAllocationClasses.float_child}>
          <FormControlLabel
            size="small"
            sx={{
              padding: "0px 0px 2px 0px",
              margin: "0px 0px 0px 0px",
              // border:"1px solid red"
            }}
            control={
              <Checkbox
                size="small"
                sx={{
                  margin: "10px 0px 0px 0px",
                  padding: "2px",
                  // border:"1px solid red"
                }}
                // disabled
                checked={searchDataCCommon.PACK_IND === "Y"}
                onChange={SelectPO_Ind}
                inputProps={{ 'aria-label': 'controlled' }}
                disabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      ? false : true)) || ApproveFreeseCheck || searchHeaderData.ALLOC_LEVEL === "D"}
              />
            }
            label={<InputLabel
              sx={{
                fontWeight: "bold",
                fontSize: "12px",
                margin: "10px 0px 0px 0px",
                padding: "0px 0px 0px 0px",
                display: 'inline',
                float: 'left',
                // border:"1px solid red"
              }}>
              Pack Ind</InputLabel>} /></div> */}
      </div>

      <div className={CreateAllocationClasses.float_container}>
        <FormControlLabel
          size="small"
          sx={{
            padding: "0px 0px 2px 0px",
            margin: "0px 0px 0px 3px",
            // border:"1px solid red"
          }}
          control={
            <Checkbox
              size="small"
              sx={{
                margin: "5px 0px 0px 0px",
                padding: "2px",
                // border:"1px solid red"
              }}
              // disabled
              checked={searchDataCCommon.PACK_IND === "Y"}
              onChange={SelectPO_Ind}
              inputProps={{ 'aria-label': 'controlled' }}
              disabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)) || ApproveFreeseCheck || searchHeaderData.ALLOC_LEVEL === "D"}
            />
          }
          label={<InputLabel
            sx={{
              fontWeight: "bold",
              fontSize: "12px",
              margin: "5px 0px 0px 0px",
              padding: "0px 0px 0px 0px",
              display: 'inline',
              float: 'left',
              // border:"1px solid red"
            }}>
            Pack Ind</InputLabel>} /></div>
    </Box>
  )

  const SearchButtonGrid = () => (
    <Box
      display="flex"
      sx={{
        backgroundColor: "",
        height: "auto",
        width: "100%",
        padding: "0px 0px 0px 0px",
        justifyContent: "space-between",
        marginTop: "2px",
        marginLeft: "0.2rem"
      }}
    >
      <div className={CreateAllocationClasses.grid_container}>
        <div className={CreateAllocationClasses.grid_child1}>
          <Button
            sx={{
              backgroundColor: "", fontSize: "12px",
              padding: "5px", fontFamily: "system-ui",
              width: "100px",
              marginLeft: "5px", paddingLeft: "0px", marginTop: "2px",
              '&.Mui-disabled': {
                opacity: 0.5,
                backgroundColor: 'DodgerBlue',
                color: '#fff',
              },
            }}
            variant="contained"
            // className={CreateAllocationClasses.textField}
            type="submit"
            startIcon={<AddCircleOutlineIcon />}
            onClick={SubmitList}
            disabled={ApproveFreeseCheck}
          >
            Add</Button>
        </div>

        <div className={CreateAllocationClasses.grid_child1}>
          <Button
            sx={{
              backgroundColor: "", fontSize: "12px",
              padding: "5px", fontFamily: "system-ui",
              width: "100px", marginLeft: "5px", marginTop: "2px",
              '&.Mui-disabled': {
                opacity: 0.5,
                backgroundColor: 'DodgerBlue',
                color: '#fff',
              },
            }}
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            disabled={ApproveFreeseCheck}
          >Delete</Button>
        </div>

        <div className={CreateAllocationClasses.grid_child1}>
          <Button
            sx={{
              backgroundColor: "", fontSize: "12px",
              padding: "5px", fontFamily: "system-ui",
              width: "100px", marginLeft: "5px", marginTop: "2px",
              '&.Mui-disabled': {
                opacity: 0.5,
                backgroundColor: 'DodgerBlue',
                color: '#fff',
              },
            }}
            onClick={Split_Button_function}
            startIcon={<CallSplitIcon />}
            variant="contained" disabled={ApproveFreeseCheck}
          >Split</Button>


        </div>

        <div className={CreateAllocationClasses.grid_child1}>
          <Button
            sx={{
              backgroundColor: "", fontSize: "12px",
              padding: "5px", fontFamily: "system-ui",
              width: "100px", marginLeft: "5px", marginTop: "2px",
              '&.Mui-disabled': {
                opacity: 0.5,
                backgroundColor: 'DodgerBlue',
                color: '#fff',
              },
            }}
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={RefreshGrid}
            disabled={ApproveFreeseCheck}
          >Refresh</Button>
        </div>

        <div className={CreateAllocationClasses.grid_child1}>
          <Button
            sx={{
              backgroundColor: "", fontSize: "12px",
              padding: "5px", fontFamily: "system-ui",
              width: "125px", marginLeft: "5px", marginTop: "2px",
              '&.Mui-disabled': {
                opacity: 0.5,
                backgroundColor: 'DodgerBlue',
                color: '#fff',
              },
            }}
            variant="contained"
            startIcon={<RefreshIcon sx={{ padding: "0px" }} />}
            // startIcon={<CachedIcon  />}
            onClick={RefreshTableGrid}
            disabled={ApproveFreeseCheck}
          >Refresh Grid</Button>
        </div>

        <div className={CreateAllocationClasses.grid_child1}>
          <Button
            sx={{
              // cursor: isLoading ? 'wait' : 'pointer',
              // pointerEvents: isLoading ? 'none' : 'auto',
              backgroundColor: "", fontSize: "12px",
              padding: "5px", fontFamily: "system-ui",
              width: "100px", marginLeft: "5px", marginTop: "2px",
            }}
            startIcon={<ErrorIcon />}
            variant="contained"
            onClick={OpenErrorReport}
          > Errors</Button>

          {/* Screen Loading */}
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
        </div>

      </div>

      <div className={CreateAllocationClasses.float_container}>
        <div className={CreateAllocationClasses.grid_child1}>
          <Button
            sx={{
              fontSize: "12px",
              backgroundColor: "#228B22",
              padding: "5px", fontFamily: "system-ui",
              width: "100px", marginLeft: "5px", marginTop: "2px",
            }}
            startIcon={<DoneAllIcon />}
            onClick={handleOk}
            variant="contained">
            Ok</Button>
        </div>
        <div className={CreateAllocationClasses.grid_child1}>
          <Button
            sx={{
              backgroundColor: "maroon",
              fontSize: "12px", padding: "5px", fontFamily: "system-ui",
              width: "100px", marginLeft: "5px", marginTop: "2px",
            }}
            startIcon={<CancelIcon />}
            variant="contained"
            onClick={handleCancel}
          >Cancel</Button>
        </div>

      </div>
    </Box>
  )

  const TestButtoms = () => (
    <Box
      display="inline-block"
      sx={{
        backgroundColor: "",
        height: "auto",
        // marginLeft: "5px",
        padding: "0rem 0rem",
        width: "100%",
        // border:"1px solid gray",
        // borderRadius:"5px",
      }}
    >
      <div className={CreateAllocationClasses.float_container}>
        <div className={CreateAllocationClasses.grid_child1}>
          <Button
            sx={{
              backgroundColor: "", fontSize: "12px",
              padding: "5px", fontFamily: "system-ui",
              width: "100px",
              marginLeft: "5px", paddingLeft: "0px", marginTop: "2px",
              '&.Mui-disabled': {
                opacity: 0.5,
                backgroundColor: 'DodgerBlue',
                color: '#fff',
              },
            }}
            variant="contained"
            // className={CreateAllocationClasses.textField}
            type="submit"
            startIcon={<AddCircleOutlineIcon />}
            onClick={SubmitList}
            disabled={ApproveFreeseCheck}
          >
            Add</Button>
        </div>

        <div className={CreateAllocationClasses.grid_child1}>
          <Button
            sx={{
              backgroundColor: "", fontSize: "12px",
              padding: "5px", fontFamily: "system-ui",
              width: "100px", marginLeft: "5px", marginTop: "2px",
              '&.Mui-disabled': {
                opacity: 0.5,
                backgroundColor: 'DodgerBlue',
                color: '#fff',
              },
            }}
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            disabled={ApproveFreeseCheck}
          >Delete</Button>
        </div>

        <div className={CreateAllocationClasses.grid_child1}>
          <Button
            sx={{
              backgroundColor: "", fontSize: "12px",
              padding: "5px", fontFamily: "system-ui",
              width: "100px", marginLeft: "5px", marginTop: "2px",
              '&.Mui-disabled': {
                opacity: 0.5,
                backgroundColor: 'DodgerBlue',
                color: '#fff',
              },
            }}
            onClick={Split_Button_function}
            startIcon={<CallSplitIcon />}
            variant="contained" disabled={ApproveFreeseCheck}
          >Split</Button>
        </div>

        <div className={CreateAllocationClasses.grid_child1}>
          {/* Screen Loading */}
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
        </div>

      </div>
    </Box>
  )

  const TestCriteriaHIERARCHY = () => (
    <Box
      display="inline-block"
      sx={{
        backgroundColor: "",
        height: "auto",
        // marginLeft: "5px",
        padding: "0rem 0rem",
        width: "100%",
        // border:"1px solid gray",
        // borderRadius:"5px",
      }}
    >
      <div className={CreateAllocationClasses.float_container}>
        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Hier1</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              // className= {CreateAllocationClasses.inputField}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.HIER1.toString()}-${option.HIER1_DESC.toString()}`}
              getOptionValue={option => option.HIER1}
              options={UniqDept.length > 0 ? UniqDept : []}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputHIER1CCommon(value); // <---
              }}
              inputValue={inputHIER1CCommon}
              onChange={selectHIER1}
              maxMenuHeight={180}
              // placeholder={"Choose a Dept"}
              hideSelectedOptions={false}
              styles={styleSelect}
              menuPlacement="auto"
              isSearchable={true}
              components={animatedComponents}
              isMulti
              // defaultValue={searchDataCCommon.HIER1.length>0 ? searchDataCCommon.HIER1[0]:[]}
              // components={{ ValueContainer }}
              // components={{ Control }}
              isClearable={true}
              value={UniqDept.filter(obj => searchDataCCommon?.HIER1.includes(obj.HIER1))}
              closeMenuOnSelect={false}
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)) || ApproveFreeseCheck
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Hier2</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              closeMenuOnSelect={false}
              // className= {CreateAllocationClasses.inputField}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.HIER2.toString()}-${option.HIER2_DESC.toString()}`}
              getOptionValue={option => option.HIER2}
              options={(UniqClass.length > 0) ? UniqClass : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputHIER2CCommon(value);
              }}
              inputValue={inputHIER2CCommon}
              onChange={selectHIER2}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a Class"}
              styles={styleSelect}
              components={animatedComponents}
              isMulti
              value={UniqClass.filter(obj => searchDataCCommon?.HIER2.includes(obj.HIER2))}
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    ? false : true)) || ApproveFreeseCheck
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Hier3</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              closeMenuOnSelect={false}
              // className= {CreateAllocationClasses.inputField}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.HIER3.toString()}-${option.HIER3_DESC.toString()}`}
              getOptionValue={option => option.HIER3}
              options={fltrH3.length > 0 || searchDataCCommon.HIER2.length > 0 ? fltrH3 : (UniqSubClass.length > 0) ? UniqSubClass : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputHIER3CCommon(value);
              }}
              inputValue={inputHIER3CCommon}
              onChange={selectHIER3}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Subclass"}
              styles={styleSelect}
              components={animatedComponents}
              isMulti
              // value={searchDataCPO.HIER3}
              value={fltrH3.length > 0 ? fltrH3.filter(obj => searchDataCCommon?.HIER3.includes(obj.HIER3))
                : UniqSubClass.filter(obj => searchDataCCommon?.HIER3.includes(obj.HIER3))}
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  && searchDataCCommon["HIER2"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    && searchDataCCommon["HIER2"].length
                    ? false : true)) || ApproveFreeseCheck
              }
            />
          </div>
        </div>
      </div>
    </Box>
  )

  const TestCriteriaITEMATTRIBUTES = () => (
    <Box
      display="inline-block"
      sx={{
        backgroundColor: "",
        height: "auto",
        // marginLeft: "5px",
        padding: "0rem 0rem",
        width: "100%",
        // border:"1px solid gray",
        // borderRadius:"5px",
      }}
    >
      <div className={CreateAllocationClasses.float_container}>
        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Variant</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.DIFF_ID.toString()}`}
              getOptionValue={option => option.DIFF_ID}
              options={fltrDiff.length > 0 || (searchDataCCommon.HIER2.length > 0 || searchDataCCommon.HIER3.length > 0) ?
                fltrDiff.length > 0
                  ? [...new Map(fltrDiff.map((item) => [item["DIFF_ID"], item])).values()]
                  : []
                : diffData.length > 0 ? UniqDiff_id : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputDIFF_IDCCommon(value);
              }}
              inputValue={inputDIFF_IDCCommon}
              onChange={selectDIFF_ID}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={diffData.filter(obj => searchDataCCommon?.DIFF_ID.includes(obj.DIFF_ID))}
              isMulti
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    ? false : true)) || ApproveFreeseCheck
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              VPN</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.VPN.toString()}`}
              getOptionValue={option => option.VPN}
              options={fltrVPN.length > 0 || (searchDataCCommon.HIER2.length > 0 || searchDataCCommon.HIER3.length > 0) ?
                fltrVPN.length > 0
                  ? [...new Map(fltrVPN.map((item) => [item["VPN"], item])).values()]
                  : []
                : UniqVPN.length > 0 ? UniqVPN : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputVPNCCommon(value);
              }}
              inputValue={inputVPNCCommon}
              onChange={selectVPN}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={UniqVPN.filter(obj => searchDataCCommon?.VPN.includes(obj.VPN))}
              isMulti
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    ? false : true)) || ApproveFreeseCheck
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Extended Attribute</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.UDA.toString()}-${option.USER_ATTR_DESC.toString()}`}
              getOptionValue={option => option.UDA}
              options={fltrUDA.length > 0 || (searchDataCCommon.HIER2.length > 0 || searchDataCCommon.HIER3.length > 0) ?
                fltrUDA.length > 0
                  ? [...new Map(fltrUDA.map((item) => [item["UDA"], item])).values()]
                  : []
                : UniqUDA.length > 0 ? UniqUDA : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputUDACCommon(value);
              }}
              inputValue={inputUDACCommon}
              onChange={selectUDA}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              isOptionDisabled={() => valUDACCommon.length >= 3}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={UniqUDA.filter(obj => searchDataCCommon?.UDA.includes(obj.UDA))}
              isMulti
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    ? false : true)) || ApproveFreeseCheck
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Attribute Value</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.UDA_VALUE.toString()} (${option.USER_ATTR_VALUE_DESC.toString()})`}
              getOptionValue={option => option.UDA_VALUE}
              options={filterUDAValueCCommon.length > 0 ? filterUDAValueCCommon : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputUDA_VALUECCommon(value);
              }}
              inputValue={inputUDA_VALUECCommon}
              onChange={selectUDA_VALUE}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={filterUDAValueCCommon.filter(obj => searchDataCCommon?.UDA_VALUE.includes(obj.UDA_VALUE))}
              isMulti
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  && searchDataCCommon["UDA"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    && searchDataCCommon["UDA"].length
                    ? false : true)) || ApproveFreeseCheck
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Exclude UDA</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.EXCLUDE_UDA.toString()}-${option.USER_ATTR_DESC.toString()}`}
              getOptionValue={option => option.EXCLUDE_UDA}
              options={UniqExcludeUDA.length > 0 ? UniqExcludeUDA : []}
              isSearchable={true}
              // onInputChange={(value, action) => {
              //   if (action.action === "input-change") setInputEXCLUDE_UDACCommon(value);
              // }}
              // inputValue={inputEXCLUDE_UDACCommon}
              onChange={selectEXCLUDE_UDA}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              isClearable={true}
              // isOptionDisabled={() => valEXCLUDE_UDACCommon.length >= 3}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              // value={UniqExcludeUDA.filter(obj => searchDataCCommon?.EXCLUDE_UDA.includes(obj.EXCLUDE_UDA))}
              value={UniqExcludeUDA.filter(obj => searchDataCCommon?.EXCLUDE_UDA === (obj.EXCLUDE_UDA))}
              // isMulti
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  && searchDataCCommon["UDA"].length
                  && searchDataCCommon["UDA_VALUE"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    && searchDataCCommon["UDA"].length
                    && searchDataCCommon["UDA_VALUE"].length
                    ? false : true)) || ApproveFreeseCheck || searchHeaderData.ALLOC_LEVEL === "D"
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Exclude UDA Value</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.EXCLUDE_UDA_VALUE.toString()}-${option.USER_ATTR_VALUE_DESC.toString()}`}
              getOptionValue={option => option.EXCLUDE_UDA_VALUE}
              options={filterEXCLUDE_UDAValueCCommon.length > 0 ? filterEXCLUDE_UDAValueCCommon : []}
              isSearchable={true}
              // onInputChange={(value, action) => {
              //   if (action.action === "input-change") setInputEXCLUDE_UDA_VALUECCommon(value);
              // }}
              // inputValue={inputEXCLUDE_UDA_VALUECCommon}
              onChange={selectEXCLUDE_UDA_VALUE}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              isClearable={true}
              components={animatedComponents}
              // value={filterEXCLUDE_UDAValueCCommon.filter(obj => searchDataCCommon?.EXCLUDE_UDA_VALUE.includes(obj.EXCLUDE_UDA_VALUE))}
              value={filterEXCLUDE_UDAValueCCommon.filter(obj => searchDataCCommon?.EXCLUDE_UDA_VALUE === (obj.EXCLUDE_UDA_VALUE))}
              // isMulti
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  && searchDataCCommon["EXCLUDE_UDA"].toString().length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    && searchDataCCommon["EXCLUDE_UDA"].toString().length
                    ? false : true)) || ApproveFreeseCheck || searchHeaderData.ALLOC_LEVEL === "D"
              }
            />
          </div>
        </div>
      </div>
    </Box>
  )

  const TestCriteriaITEMSELECTION = () => (
    <Box
      display="inline-block"
      sx={{
        backgroundColor: "",
        height: "auto",
        // marginLeft: "5px",
        padding: "0rem 0rem",
        width: "100%",
        // border:"1px solid gray",
        // borderRadius:"5px",
      }}
    >
      <div className={CreateAllocationClasses.float_container}>
        {searchHeaderData.ALLOC_LEVEL === "D" ? null :
          <div className={CreateAllocationClasses.float_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                Pack No</InputLabel>
            </div>
            <div>
              <Select
                closeMenuOnSelect={false}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.PACK_NO.toString()}`}
                getOptionValue={option => option.PACK_NO}
                options={fltrPACK.length > 0 || (searchDataCCommon.HIER2.length > 0 || searchDataCCommon.HIER3.length > 0) ?
                  fltrPACK.length > 0
                    ? [...new Map(fltrPACK.map((item) => [item["PACK_NO"], item])).values()]
                    : []
                  : packNoData.length > 0 ? packNoData : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputPACK_NOCCommon(value);
                }}
                inputValue={inputPACK_NOCCommon}
                onChange={selectPACK_NO}
                hideSelectedOptions={false}
                menuPlacement="auto"
                maxMenuHeight={180}
                // placeholder={"Choose a Warehouse"}
                styles={styleSelect}
                components={animatedComponents}
                value={packNoData.filter(obj => searchDataCCommon?.PACK_NO.includes(obj.PACK_NO))}
                isMulti
                isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      ? false : true)) || ApproveFreeseCheck
                }
              />
            </div>
          </div>}

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Style</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              //disabled={filterItem.length > 0 ?false:true}
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.ITEM_PARENT.toString()}`}
              getOptionValue={option => option.ITEM_PARENT}
              options={fltrITP.length > 0 || (searchDataCCommon.HIER2.length > 0 || searchDataCCommon.HIER3.length > 0) ?
                fltrITP.length > 0
                  ? [...new Map(fltrITP.map((item) => [item["ITEM_PARENT"], item])).values()]
                  : []
                : UniqItemParent.length > 0 ? UniqItemParent : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputITEM_PARENTCCommon(value);
              }}
              inputValue={inputITEM_PARENTCCommon}
              onChange={selectITEM_PARENT}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a ITEM"}
              styles={styleSelect}
              components={animatedComponents}
              isMulti
              value={UniqItemParent.filter(obj => searchDataCCommon?.ITEM_PARENT.includes(obj.ITEM_PARENT))}
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    ? false : true)) || ApproveFreeseCheck
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Sku</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.SKU.toString()}`}
              getOptionValue={option => option.SKU}
              options={fltrSku.length > 0 || (searchDataCCommon.HIER2.length > 0 || searchDataCCommon.HIER3.length > 0) ?
                fltrSku.length > 0
                  ? [...new Map(fltrSku.map((item) => [item["SKU"], item])).values()]
                  : []
                : UniqSKU.length > 0 ? UniqSKU : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputSKUCCommon(value);
              }}
              inputValue={inputSKUCCommon}
              onChange={selectSKU}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={skuData.filter(obj => searchDataCCommon?.SKU.includes(obj.SKU))}
              isMulti
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    ? false : true)) || ApproveFreeseCheck
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Sku List</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.ITEM_LIST.toString()}-${option.ITEM_LIST_DESC.toString()}`}
              getOptionValue={option => option.ITEM_LIST}
              options={itemListHeadData.length > 0 ? itemListHeadData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputITEM_LISTCCommon(value);
              }}
              inputValue={inputITEM_LISTCCommon}
              onChange={selectITEM_LIST}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={itemListHeadData.filter(obj => searchDataCCommon?.ITEM_LIST.includes(obj.ITEM_LIST))}
              isMulti
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)) || ApproveFreeseCheck
              }
            />
          </div>
        </div>
      </div>
    </Box>
  )

  const TestCriteriaADDITIONALATTRIBUTES = () => (
    <Box
      display="inline-block"
      sx={{
        backgroundColor: "",
        height: "auto",
        // marginLeft: "5px",
        padding: "0rem 0rem",
        width: "100%",
        // border:"1px solid gray",
        // borderRadius:"5px",
      }}
    >
      <div className={CreateAllocationClasses.float_container}>
        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              WH</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.WH.toString()}-(${option.WH_DESC.toString()})`}
              getOptionValue={option => option.WH}
              options={warehouseData.length > 0 ? warehouseData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputWHCCommon(value);
              }}
              inputValue={inputWHCCommon}
              onChange={selectWH}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={warehouseData.filter(obj => searchDataCCommon?.WH.includes(obj.WH))}
              isMulti
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)) || ApproveFreeseCheck ||
                searchHeaderData.ALLOC_CRITERIA === "Pre Buy"
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Supplier</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.SUPPLIER.toString()}-(${option.SUPPLIER_NAME.toString()})`}
              getOptionValue={option => option.SUPPLIER}
              options={supplierData.length > 0 ? supplierData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputSUPPLIERCCommon(value);
              }}
              inputValue={inputSUPPLIERCCommon}
              onChange={selectSUPPLIER}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={supplierData.filter(obj => searchDataCCommon?.SUPPLIER.includes(obj.SUPPLIER))}
              isMulti
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)) || ApproveFreeseCheck
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Supplier Site</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.SUPPLIER_SITE.toString()}-(${option.SUPPLIER_NAME.toString()})`}
              getOptionValue={option => option.SUPPLIER_SITE}
              options={supplerSiteData.length > 0 ? supplerSiteData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputSUPPLIER_SITECCommon(value);
              }}
              inputValue={inputSUPPLIER_SITECCommon}
              onChange={selectSUPPLIER_SITE}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // isClearable={true}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={supplerSiteData.filter(obj => searchDataCCommon?.SUPPLIER_SITE.includes(obj.SUPPLIER_SITE))}
              isMulti
              isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)) || ApproveFreeseCheck
              }
            />
          </div>
        </div>

        {searchHeaderData.ALLOC_CRITERIA === "Purchase Order" ? [
          <div className={CreateAllocationClasses.float_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                PO</InputLabel>
            </div>
            <div>
              <Select
                closeMenuOnSelect={false}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.PO.toString()}`}
                getOptionValue={option => option.PO}
                options={UniqPO.length > 0 ? UniqPO : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputPOCPO(value);
                }}
                inputValue={inputPOCPO}
                onChange={selectPO}
                hideSelectedOptions={false}
                menuPlacement="auto"
                maxMenuHeight={180}
                // placeholder={"Choose a Warehouse"}
                styles={styleSelect}
                components={animatedComponents}
                value={UniqPO.filter(obj => searchDataCCommon?.PO.includes(obj.PO))}
                isMulti
                isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      ? false : true)) || ApproveFreeseCheck
                }
              />
            </div>
          </div>,

          <div className={CreateAllocationClasses.float_child}>
            <div>
              {(isValidCTEDT && searchDataCCommon["EISD_END_DATE"].length > 0 && searchDataCCommon["EISD_START_DATE"].length === 0) ||
                (isGreatCTEDF && isGreatCTEDT && searchDataCCommon["EISD_END_DATE"].length > 0 && searchDataCCommon["EISD_START_DATE"].length > 0) ?
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left', color: "#b22222" }}>
                  EISD From*</InputLabel> :
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                  EISD From</InputLabel>}
            </div>
            <div>
              <TextField
                size="small"
                variant="outlined"
                type="date"
                name="EISD_START_DATE"
                autoComplete='off'
                helperText=""
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0"
                  }
                }}
                onChange={onChangeCPO}
                value={searchDataCCommon.EISD_START_DATE}
                id="outlined-disabled"
                // label="EISD From"
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12, height: "32px" },
                  className: CreateAllocationClasses.inputFielddate,
                }}
                inputProps={{ sx: { backgroundColor: '#fff' } }}
                error={
                  (isValidCTEDT && searchDataCCommon["EISD_END_DATE"].length > 0 && searchDataCCommon["EISD_START_DATE"].length === 0) ||
                  (isGreatCTEDF && isGreatCTEDT && searchDataCCommon["EISD_END_DATE"].length > 0 && searchDataCCommon["EISD_START_DATE"].length > 0)
                }
                disabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      ? false : true)) || ApproveFreeseCheck
                }
              />
            </div>
          </div>,

          <div className={CreateAllocationClasses.float_child}>
            <div>
              {(isValidCTEDF && searchDataCCommon["EISD_START_DATE"].length > 0 && searchDataCCommon["EISD_END_DATE"].length === 0) ||
                (isGreatCTEDF && isGreatCTEDT && searchDataCCommon["EISD_END_DATE"].length > 0 && searchDataCCommon["EISD_START_DATE"].length > 0) ?
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left', color: "#b22222" }}>
                  EISD To*</InputLabel> :
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                  EISD To</InputLabel>}
            </div>
            <div>
              <TextField
                size="small"
                type="date"
                name="EISD_END_DATE"
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0"
                  }
                }}
                onChange={onChangeCPO}
                value={searchDataCCommon.EISD_END_DATE}
                autoComplete='off'
                id="outlined-disabled"
                // label="EISD To"
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12, height: "32px" },
                  className: CreateAllocationClasses.inputFielddate,
                }}
                inputProps={{ sx: { backgroundColor: '#fff' } }}
                error={(isValidCTEDF && searchDataCCommon["EISD_START_DATE"].length > 0 && searchDataCCommon["EISD_END_DATE"].length === 0) ||
                  (isGreatCTEDF && isGreatCTEDT && searchDataCCommon["EISD_END_DATE"].length > 0 && searchDataCCommon["EISD_START_DATE"].length > 0)
                }
                disabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      ? false : true)) || ApproveFreeseCheck
                }
              />
            </div>
          </div>,

          <div className={CreateAllocationClasses.float_child}>
            <div>
              {(isValidCTNDT && searchDataCCommon["END_DATE"].length > 0 && searchDataCCommon["START_DATE"].length === 0) ||
                (isGreatCTNDT && isGreatCTNDF && searchDataCCommon["START_DATE"].length > 0 && searchDataCCommon["END_DATE"].length > 0) ?
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left', color: "#b22222" }}>
                  Not Before Date From*</InputLabel> :
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                  Not Before Date From</InputLabel>}
            </div>
            <div>
              <TextField
                size="small"
                type="date"
                name="START_DATE"
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0"
                  }
                }}
                onChange={onChangeCPO}
                value={searchDataCCommon.START_DATE}
                id="outlined-disabled"
                autoComplete='off'
                // label="Not Before Date From"
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12, height: "32px" },
                  className: CreateAllocationClasses.inputFielddate,
                }}
                inputProps={{ sx: { backgroundColor: '#fff' } }}
                error={
                  (isValidCTNDT && searchDataCCommon["END_DATE"].length > 0 && searchDataCCommon["START_DATE"].length === 0) ||
                  (isGreatCTNDT && isGreatCTNDF && searchDataCCommon["START_DATE"].length > 0 && searchDataCCommon["END_DATE"].length > 0)
                }
                disabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      ? false : true)) || ApproveFreeseCheck
                }
              />
            </div>
          </div>,

          <div className={CreateAllocationClasses.float_child}>
            <div>
              {(isValidCTNDF && searchDataCCommon["START_DATE"].length > 0 && searchDataCCommon["END_DATE"].length === 0) ||
                (isGreatCTNDT && isGreatCTNDF && searchDataCCommon["START_DATE"].length > 0 && searchDataCCommon["END_DATE"].length > 0) ?
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left', color: "#b22222" }}>
                  Not Before Date To*</InputLabel> :
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                  Not Before Date To</InputLabel>}
            </div>
            <div>
              <TextField
                size="small"
                type="date"
                name="END_DATE"
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0"
                  }
                }}
                onChange={onChangeCPO}
                value={searchDataCCommon.END_DATE}
                id="outlined-disabled"
                autoComplete='off'
                // label="Not Before Date To"
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12, height: "32px" },
                  className: CreateAllocationClasses.inputFielddate,
                }}
                inputProps={{ sx: { backgroundColor: '#fff' } }}
                error={
                  (isValidCTNDF && searchDataCCommon["START_DATE"].length > 0 && searchDataCCommon["END_DATE"].length === 0) ||
                  (isGreatCTNDT && isGreatCTNDF && searchDataCCommon["START_DATE"].length > 0 && searchDataCCommon["END_DATE"].length > 0)
                }
                disabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      ? false : true)) || ApproveFreeseCheck
                }
              />
            </div>
          </div>,

          <div className={CreateAllocationClasses.float_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                PO Type</InputLabel>
            </div>
            <div>
              <Select
                closeMenuOnSelect={false}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.PO_TYPE.toString()}`}
                getOptionValue={option => option.PO_TYPE}
                options={UniqPOType.length > 0 ? UniqPOType : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputPO_TYPECPO(value);
                }}
                inputValue={inputPO_TYPECPO}
                onChange={selectPO_TYPE}
                hideSelectedOptions={false}
                menuPlacement="auto"
                maxMenuHeight={180}
                isClearable={true}
                // placeholder={"Choose a Warehouse"}
                styles={styleSelect}
                components={animatedComponents}
                value={UniqPOType.filter(obj => searchDataCCommon?.PO_TYPE.includes(obj.PO_TYPE))}
                // isMulti
                isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      ? false : true)) || ApproveFreeseCheck
                }
              />
            </div>
          </div>
        ] : null}

        {(searchHeaderData.ALLOC_CRITERIA === "Warehouse" || searchHeaderData.ALLOC_CRITERIA === "Pre Buy") ? [
          <div className={CreateAllocationClasses.float_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                Avail Qty &gt;=</InputLabel>
            </div>
            <div>
              <TextField
                size="small"
                name="MIN_AVAIL_QTY"
                sx={{
                  // backgroundColor:"green",
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0",
                    borderRadius: "5px",
                    // height: "15px",
                  }
                }}
                onChange={onChangeCWH}
                value={searchDataCCommon.MIN_AVAIL_QTY}
                id="outlined-disabled"
                autoComplete='off'
                // label="Avail Qty &gt;="
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  className: CreateAllocationClasses.inputFielddate,
                  style: { fontSize: 12, height: "32px", backgroundColor: "white" },
                }}
                inputProps={{ sx: { backgroundColor: '#fff' } }}
                // style={{
                //   backgroundColor: "red"
                // }}
                // variant="outlined" 
                disabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    && searchDataCCommon["HIER1"].length
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      && searchDataCCommon["HIER1"].length
                      ? false : true)) || ApproveFreeseCheck ||
                  searchHeaderData.ALLOC_CRITERIA === "Pre Buy"
                }
              />
            </div>
          </div>,

          <div className={CreateAllocationClasses.float_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                Avail Qty &lt;=</InputLabel>
            </div>
            <div>
              <TextField
                size="small"
                name="MAX_AVAIL_QTY"
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0",
                    borderRadius: "5px",
                    height: "15px",
                  }
                }}
                onChange={onChangeCWH}
                value={searchDataCCommon.MAX_AVAIL_QTY}
                id="outlined-disabled"
                autoComplete='off'
                // label="Not Before Date To"
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12, height: "32px" },
                  className: CreateAllocationClasses.inputFielddate,
                }}
                inputProps={{ sx: { backgroundColor: '#fff' } }}
                disabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    && searchDataCCommon["HIER1"].length
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      && searchDataCCommon["HIER1"].length
                      ? false : true)) || ApproveFreeseCheck ||
                  searchHeaderData.ALLOC_CRITERIA === "Pre Buy"
                }
              />
            </div>
          </div>
        ] : null}

        {searchHeaderData.ALLOC_CRITERIA === "ASN" ?
          <div className={CreateAllocationClasses.float_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                ASN</InputLabel>
            </div>
            <div>
              <Select
                closeMenuOnSelect={false}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.ASN.toString()}`}
                getOptionValue={option => option.ASN}
                options={asnData.length > 0 ? asnData : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputASNCASN(value);
                }}
                inputValue={inputASNCASN}
                onChange={selectASNCASN}
                hideSelectedOptions={false}
                menuPlacement="auto"
                maxMenuHeight={180}
                // placeholder={"Choose a Warehouse"}
                styles={styleSelect}
                components={animatedComponents}
                value={asnData.filter(obj => searchDataCCommon?.ASN.includes(obj.ASN))}
                isMulti
                isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      ? false : true)) || ApproveFreeseCheck
                }
              />
            </div>
          </div>
          : null}

        {searchHeaderData.ALLOC_CRITERIA === "Transfer" ?
          <div className={CreateAllocationClasses.float_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                Transfer</InputLabel>
            </div>
            <div>
              <Select
                closeMenuOnSelect={false}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.TSF.toString()}`}
                getOptionValue={option => option.TSF}
                options={tsfData.length > 0 ? tsfData : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputTSFCTSF(value);
                }}
                inputValue={inputTSFCTSF}
                onChange={selectTSFCTSF}
                hideSelectedOptions={false}
                menuPlacement="auto"
                maxMenuHeight={180}
                // placeholder={"Choose a Warehouse"}
                styles={styleSelect}
                components={animatedComponents}
                value={tsfData.filter(obj => searchDataCCommon?.TSF.includes(obj.TSF))}
                isMulti
                isDisabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      ? false : true)) || ApproveFreeseCheck
                }
              />
            </div>
          </div>
          : null}

        {searchHeaderData.ALLOC_CRITERIA === "Purchase Order" ?
          <div className={CreateAllocationClasses.float_child}>
            <div>
              <Button sx={{
                backgroundColor: "", fontSize: "12px",
                padding: "5px", fontFamily: "system-ui",
                width: "130px", height: "32px",
                marginLeft: "0px", paddingLeft: "0px", marginTop: "18px",
                '&.Mui-disabled': {
                  opacity: 0.5,
                  backgroundColor: 'DodgerBlue',
                  color: '#fff',
                },
              }}
                disabled={ApproveFreeseCheck}
                onClick={HandleClickMultiPO}
                startIcon={<SourceIcon />}
                variant="contained">PO Details</Button>
            </div>
          </div>
          : null}
      </div>

      {/* <div className={CreateAllocationClasses.float_container}>
        <FormControlLabel
          size="small"
          sx={{
            padding: "0px 0px 2px 0px",
            margin: "0px 0px 0px 3px",
            // border:"1px solid red"
          }}
          control={
            <Checkbox
              size="small"
              sx={{
                margin: "5px 0px 0px 0px",
                padding: "2px",
                // border:"1px solid red"
              }}
              // disabled
              checked={searchDataCCommon.PACK_IND === "Y"}
              onChange={SelectPO_Ind}
              inputProps={{ 'aria-label': 'controlled' }}
              disabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)) || ApproveFreeseCheck || searchHeaderData.ALLOC_LEVEL === "D"}
            />
          }
          label={<InputLabel
            sx={{
              fontWeight: "bold",
              fontSize: "12px",
              margin: "5px 0px 0px 0px",
              padding: "0px 0px 0px 0px",
              display: 'inline',
              float: 'left',
              // border:"1px solid red"
            }}>
            Pack Ind</InputLabel>} />
      </div> */}
    </Box>
  )

  const CreatescreenButtons = () => (
    <Box
      display="flex"
      sx={{
        backgroundColor: "",
        height: "auto",
        width: "100%",
        padding: "0px 0px 0px 0px",
        justifyContent: "space-between",
        marginTop: "2px",
        // marginLeft: "0.2rem",
        // border: "1px solid red"
      }}
    >
      <div>
        <div className={CreateAllocationClasses.grid_child1}>
          <Button
            sx={{
              backgroundColor: "", fontSize: "12px",
              padding: "5px", fontFamily: "system-ui",
              width: "125px", marginLeft: "5px", marginTop: "2px",
              '&.Mui-disabled': {
                opacity: 0.5,
                backgroundColor: 'DodgerBlue',
                color: '#fff',
              },
            }}
            variant="contained"
            startIcon={<RefreshIcon sx={{ padding: "0px" }} />}
            // startIcon={<CachedIcon  />}
            onClick={RefreshTableGrid}
            disabled={ApproveFreeseCheck}
          >Refresh Grid</Button>
        </div>

        <div className={CreateAllocationClasses.grid_child1}>
          <Button
            sx={{
              // cursor: isLoading ? 'wait' : 'pointer',
              // pointerEvents: isLoading ? 'none' : 'auto',
              backgroundColor: "", fontSize: "12px",
              padding: "5px", fontFamily: "system-ui",
              width: "100px", marginLeft: "5px", marginTop: "2px",
            }}
            startIcon={<ErrorIcon />}
            variant="contained"
            onClick={OpenErrorReport}
          > Errors</Button>
        </div>
        <div className={CreateAllocationClasses.grid_child1}>
          <Button
            sx={{
              backgroundColor: "", fontSize: "12px",
              padding: "5px", fontFamily: "system-ui",
              width: "100px", marginLeft: "5px", marginTop: "2px",
              '&.Mui-disabled': {
                opacity: 0.5,
                backgroundColor: 'DodgerBlue',
                color: '#fff',
              },
            }}
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            disabled={ApproveFreeseCheck}
          >Delete</Button>
        </div>

        <div className={CreateAllocationClasses.grid_child1}>
          <Button
            sx={{
              backgroundColor: "", fontSize: "12px",
              padding: "5px", fontFamily: "system-ui",
              width: "100px", marginLeft: "5px", marginTop: "2px",
              '&.Mui-disabled': {
                opacity: 0.5,
                backgroundColor: 'DodgerBlue',
                color: '#fff',
              },
            }}
            onClick={Split_Button_function}
            startIcon={<CallSplitIcon />}
            variant="contained" disabled={ApproveFreeseCheck}
          >Split</Button>
        </div>
      </div>
      <div className={CreateAllocationClasses.float_container}>
        {/* <div className={CreateAllocationClasses.grid_child1}>
          <Button
            // disableRipple
            variant="contained"
            sx={{
              backgroundColor: "", fontSize: "12px",
              padding: "5px", fontFamily: "system-ui",
              width: "100px", marginLeft: "5px", marginTop: "2px",
            }}
            onClick={toggleDrawer("right", true)}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </div> */}

        <div className={CreateAllocationClasses.grid_child1}>
          <Button
            sx={{
              fontSize: "12px",
              backgroundColor: "#228B22",
              padding: "5px", fontFamily: "system-ui",
              width: "100px", marginLeft: "5px", marginTop: "2px",
            }}
            startIcon={<DoneAllIcon />}
            onClick={handleOk}
            variant="contained">
            Ok</Button>
        </div>
        <div className={CreateAllocationClasses.grid_child1}>
          <Button
            sx={{
              backgroundColor: "maroon",
              fontSize: "12px", padding: "5px", fontFamily: "system-ui",
              width: "100px", marginLeft: "5px", marginTop: "2px",
            }}
            startIcon={<CancelIcon />}
            variant="contained"
            onClick={handleCancel}
          >Cancel</Button>
        </div>

      </div>
    </Box>
  )

  useEffect(() => {
    if (CreateAllocationData?.data?.CommitData?.status === 200 && (callMode === "VIEW" || callMode === "EDIT")) {
      dispatch(postSwitchASYRequest([{}]));
      //setCheck(false);
      setLoadCheckAllcSumm(false);
      setIsLoading(true);
      CreateAllocationData.data.CommitData.status = 0
    } else if (CreateAllocationData?.data?.CommitData?.status === 500 && (callMode === "VIEW" || callMode === "EDIT")) {
      dispatch(postSwitchASYRequest([{}]));
      setLoadCheckAllcSumm(false);
      setIsLoading(true);
      CreateAllocationData.data.CommitData.status = 0
    }
  }, [CreateAllocationData?.data]);

  const handleOk = () => {
    if (callMode === "VIEW" || callMode === "EDIT") {
      const saveData = {
        HEADER: {
          "ALLOC_NO": searchHeaderData.ALLOC_NO,
          "ALLOC_DESC": searchHeaderData.ALLOC_DESC
        }
      }

      dispatch(postCOMMITDATARequest([saveData, "ASM"]))
      // dispatch(postSwitchASYRequest([{}]));
      // //setCheck(false);
      // setLoadCheckAllcSumm(false);
      // setIsLoading(true);

    } else {
      const saveData = {
        HEADER: {
          "ALLOC_NO": searchHeaderData.ALLOC_NO,
          "ALLOC_DESC": searchHeaderData.ALLOC_DESC
        }
      }
      dispatch(postCOMMITDATARequest([saveData]));
      navigate(`/AllocDashboard`);
    }
  }
  const handleCancel = () => {
    if (callMode === "VIEW" || callMode === "EDIT") {
      dispatch(postCOMMITDATARequest([[], "ASM"]))
      // // dispatch(postSwitchASYRequest([{}]));
      // setLoadCheckAllcSumm(false);
      // setIsLoading(true);
    } else {
      dispatch(postCOMMITDATARequest([]))
      navigate(`/AllocDashboard`);
    }
  }
  const SearchButtonHeaderDesc = () => (
    <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} >
      <InfoIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em', color: "CadetBlue" }}
        onClick={() => {
          setOpenDialog(true);
          setDialogData(String(searchHeaderData.ALLOC_DESC));
        }}
      />
    </IconButton>

  )
  const [isSHovered, setIsHovered] = useState(false);
  const [isSHovered1, setIsHovered1] = useState(false);

  const handleSEnter = () => { setIsHovered(true); };
  const handleSEnter1 = () => { setIsHovered1(true); };

  const handleSLeave = () => { setIsHovered(false); };
  const handleSLeave1 = () => { setIsHovered1(false); };

  const [selectedDate, setSelectedDate] = useState(null);


  //console.log(searchHeaderData.RELEASE_DATE)

  const SearchHeader = () => (
    <Box
      // component="fieldset"
      display="inline-block"
      sx={{
        backgroundColor: "",
        height: "auto",
        width: "100%",
        // backgroundColor: "rgb(250, 250, 250)",
        // borderRadius: 1,

        // boxShadow: 2, border: 0,
        // borderBottom: 3,
        // border: "1px solid lightgrey",
        // border:"1px dotted gray",
        // borderRadius:"5px",

      }}
    >
      {/* <legend style={{ fontWeight: "bold", color: "#191970", }}>Header</legend> */}

      <div style={{ display: "flex" }}>
        <div className={CreateAllocationClasses.header_container} style={{ flex: "1 1 auto" }}>
          <div className={CreateAllocationClasses.header_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
                Allocation ID</InputLabel>
            </div>
            <div>
              <TextField
                size="small"
                sx={{
                  margin: "0px 0px 2px 2px", width: "100px"
                  , "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0",
                    borderRadius: "5px",
                    height: "15px",
                  }
                }}
                disabled
                name="ALLOC_NO"
                value={allocDetails.length > 0 ? allocDetails[0].ALLOC_NO : searchHeaderData.ALLOC_NO = allocNoData["ALLOC_NO"]}
                defaultValue={allocNoData["ALLOC_NO"]}
                // onChange={onChange}
                id="outlined-disabled"

                InputProps={{
                  style: { fontSize: 12, height: "30px" },
                  className: CreateAllocationClasses.input,
                }}
              />
            </div>
          </div>

          <div className={CreateAllocationClasses.header_child}>
            <div>
              {(isValid && searchHeaderData.ALLOC_DESC.length === 0) ?
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 0px", display: 'inline', float: 'left', color: "#b22222" }}>
                  Description*</InputLabel> :
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 0px", display: 'inline', float: 'left' }}>
                  Description</InputLabel>}
            </div>
            <div>
              <TextField
                size="small"
                sx={{
                  margin: "0px 0px 2px 0px", width: "25vh"
                  , "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0",
                    borderRadius: "5px",
                    height: "13px",
                  },
                  borderRadius: "5px",
                  boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                }}
                id="outlined-disabled"
                name="ALLOC_DESC"
                autoComplete='off'
                value={allocDetails.length > 0 ? allocDetails[0].ALLOC_DESC : searchHeaderData.ALLOC_DESC}
                defaultValue=""
                onChange={onChange}
                inputProps={{
                  maxLength: 100,
                }}
                required
                InputProps={{
                  endAdornment: <SearchButtonHeaderDesc />,
                  className: CreateAllocationClasses.input,
                  style: (!searchHeaderData.ALLOC_NO || ApproveFreeseCheck || CalcCheck) ? { fontSize: 12, backgroundColor: "#f0f0f0", height: "30px", } :
                    { fontSize: 12, backgroundColor: "white", height: "30px", },
                }}
                disabled={!searchHeaderData.ALLOC_NO || ApproveFreeseCheck || CalcCheck}
                error={searchHeaderData.ALLOC_DESC.length === 0 && isValid}
              />
            </div>
          </div>

          <div className={CreateAllocationClasses.header_child}>
            <div>
              {(isValid && searchHeaderData.CONTEXT.length === 0) ?
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left', color: "#b22222" }}>
                  Alloc Context*</InputLabel> :
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
                  Alloc Context</InputLabel>}
            </div>
            <div className={CreateAllocationClasses.multiselectfield}>
              <Select
                // className= {CreateAllocationClasses.inputField}
                classNamePrefix="mySelect"
                getOptionLabel={option =>
                  `${option.CONTEXT.toString()}`}
                getOptionValue={option => option.CONTEXT}
                options={contextTypeData.length > 0 ? contextTypeData : []}
                isSearchable={true}
                onChange={selectCONTEXT_TYPE}
                maxMenuHeight={180}
                // placeholder={"Choose a Dept"}
                styles={(isValid && searchHeaderData.CONTEXT.length === 0) ? styleSelect2 : styleSelect1}
                components={animatedComponents}
                // isClearable={true}
                value={
                  // (callMode === "VIEW" || callMode === "EDIT") && allocDetails.length > 0 ? allocDetails :
                  // allocDetails.length > 0 ?
                  //   contextTypeData.filter(obj => allocDetails[0]?.CONTEXT === (obj.CONTEXT)) :
                  contextTypeData.filter(obj => searchHeaderData?.CONTEXT_CODE === (obj.CONTEXT))

                }//aKHIL ASY
                closeMenuOnSelect={true}
                isDisabled={!searchHeaderData.ALLOC_NO || ApproveFreeseCheck || CalcCheck}
                theme={(isValid && searchHeaderData.CONTEXT.length === 0) ? theme => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    neutral50: '#b22222',  // Placeholder color //slategrey
                  },
                }) : false}
              />
            </div>
          </div>

          {searchHeaderData.CONTEXT_CODE === "Promotion" ?
            [
              <div className={CreateAllocationClasses.header_child}>
                <div>
                  {(isValid && searchHeaderData.PROMOTION.length === 0) ?
                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left', color: "#b22222" }}>
                      Promotion*</InputLabel> :
                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
                      Promotion</InputLabel>}
                </div>
                <div className={CreateAllocationClasses.multiselectfield}>
                  <Select
                    // className= {CreateAllocationClasses.inputField}
                    classNamePrefix="mySelect"
                    getOptionLabel={option =>
                      `${option.PROMOTION.toString()} -${option.DESCRIPTION.toString()} (${option.START_DATE.toString()})-(${option.END_DATE.toString()})`}
                    getOptionValue={option => option.PROMOTION}
                    options={promotionData.length > 0 ? promotionData : []}
                    isSearchable={true}
                    onChange={selectPROMOTION}
                    maxMenuHeight={180}
                    // placeholder={"Choose a Dept"}
                    styles={(isValid && searchHeaderData.PROMOTION.length === 0) ? styleSelect2 : styleSelect1}
                    components={animatedComponents}
                    // isClearable={true}
                    value={
                      // (callMode === "VIEW" || callMode === "EDIT") && allocDetails.length > 0 ? allocDetails :
                      // allocDetails.length > 0 ?
                      //   promotionData.filter(obj => allocDetails[0]?.PROMOTION === obj.PROMOTION) :
                      promotionData.filter(obj => searchHeaderData?.PROMOTION_CODE === obj.PROMOTION)}
                    closeMenuOnSelect={true}
                    isDisabled={headerDis || ApproveFreeseCheck}
                    theme={(isValid && searchHeaderData.PROMOTION.length === 0) ? theme => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        neutral50: '#b22222',  // Placeholder color //slategrey
                      },
                    }) : false}
                  />
                </div>
              </div>
            ] : null}


          <div className={CreateAllocationClasses.header_child}>
            <div >
              {(isValid && searchHeaderData.ALLOC_LEVEL.length === 0) ?
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left', color: "#b22222" }}>
                  Alloc Level*</InputLabel> :
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
                  Alloc Level</InputLabel>}
            </div>
            <div className={CreateAllocationClasses.multiselectfield}>
              <Select
                classNamePrefix="mySelect"
                getOptionLabel={option =>
                  `${option.ALLOC_LEVEL.toString()}`}
                getOptionValue={option => option.ALLOC_LEVEL}
                options={allocLevelData.length > 0 ? allocLevelData : []}
                isSearchable={true}
                onChange={selectALLOC_LEVEL}
                maxMenuHeight={180}
                // placeholder={"Choose a Dept"}
                styles={(isValid && searchHeaderData.ALLOC_LEVEL.length === 0) ? styleSelect2 : styleSelect1}
                components={animatedComponents}
                // isClearable={true}
                value={
                  // (callMode === "VIEW" || callMode === "EDIT") && allocDetails.length > 0 ? allocDetails :
                  // allocDetails.length > 0 ?
                  //   allocLevelData.filter(obj => allocDetails[0]?.ALLOC_LEVEL === (obj.ALLOC_LEVEL)) :
                  allocLevelData.filter(obj => searchHeaderData?.ALLOC_LEVEL === (obj.CODE))}
                closeMenuOnSelect={true}
                isDisabled={totalData.length > 0 ? true : (headerDis || !searchHeaderData.ALLOC_NO || ApproveFreeseCheck)}
                theme={(isValid && searchHeaderData.ALLOC_LEVEL.length === 0) ? theme => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    neutral50: '#b22222',  // Placeholder color //slategrey
                  },
                }) : false}
              />
            </div>
          </div>

          <div className={CreateAllocationClasses.header_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 0px", display: 'inline', float: 'left' }}>
                Release Date</InputLabel>
            </div>
            <div>
              <DatePicker
                autoComplete="off"
                placeholderText="MM-DD-YY"
                selected={initialDateR}
                //selected={convertDateFormat(searchHeaderData.RELEASE_DATE)}
                //  onChange={(date) => //handleDateChangePicker("RELEASE_DATE_FROM", date)
                //  //console.log("date",date,new Date(
                //   Number('20' + ("06-28-23")[2]), // Year
                //   Number((("06-28-23"))[0]) - 1, // Month (0-based index)
                //   Number((("06-28-23"))[1])))// , moment(date).format('DD-MMM-YYYY'))
                // }
                minDate={new Date()}
                onChange={(date) => handleDatePicker("RELEASE_DATE", date)}
                onChangeRaw={(event) => {
                  if (validateDateInput(event.target.value)) {
                    // //console.log("Valid date format:1", event.target.value, new Date());
                    // Additional logic for handling the valid date input
                  } else {
                    // //console.log("Valid date format:2", event.target.value);
                    setOpenDialog(true);
                    setDialogData("Invalid Release Date Input1");
                    // Additional logic for handling the invalid date input
                  }
                }}
                // onBlur={HandleReleaseDate}
                dateFormat="MM-dd-yy"
                className={CreateAllocationClasses.inputFielddate} // Pass the class name to apply styles
                disabled={!searchHeaderData.ALLOC_NO || ApproveFreeseCheck || CalcCheck}
                customInput={

                  <TextField
                    size="small"
                    variant="outlined"
                    type="text"
                    name="RELEASE_DATE_FROM"
                    autoComplete='off'
                    helperText=""
                    sx={{
                      width: "140px",
                      "& .MuiInputBase-input.Mui-disabled": {
                        backgroundColor: "#f0f0f0",
                        height: "13px", borderRadius: "5px"
                      },
                    }}
                    id="outlined-disabled"
                    InputLabelProps={{
                      style: { fontSize: "12px", },
                      shrink: true,
                    }}
                    InputProps={{
                      style: (!searchHeaderData.ALLOC_NO || ApproveFreeseCheck || CalcCheck) ? sharedInputClassDis : sharedInputClass,
                      endAdornment: (
                        <CalendarTodayIcon
                          style={{ fontSize: "11px", }}
                        />
                      )
                    }}
                    inputProps={{
                      // min: new Date().toISOString().slice(0, 10),
                      sx: { backgroundColor: '#fff', height: "13px", borderRadius: "5px" }
                    }}
                    disabled={!searchHeaderData.ALLOC_NO || ApproveFreeseCheck || CalcCheck}
                  />

                }
              //showYearDropdown // Display the year dropdown
              //yearDropdownItemNumber={10} // Display 10 years in the dropdown (adjust as needed)
              />
              {/* <TextField
                variant="outlined"
                type="date"
                size="small"
                name="RELEASE_DATE"
                format="yyyy/MM/dd"
                autoComplete='off'
                inputProps={{ min: new Date().toISOString().slice(0, 10), }}
                sx={{
                  margin: "0px 0px 2px 0px"
                  , "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0",
                    borderRadius: "5px",
                    height: "15px",
                  },
                  input: {
                    background: "white"
                  }
                }}
                id="outlined-disabled"
                disabled={!searchHeaderData.ALLOC_NO || ApproveFreeseCheck || CalcCheck}
                label=""
                value={searchHeaderData.RELEASE_DATE}
                onChange={onChange}
                onBlur={HandleReleaseDate}
                // helperText={(searchHeaderData.RELEASE_DATE.length===0 && isValid)=== true ? null : null}
                InputProps={{
                  style: { fontSize: 12, height: "30px" },
                  shrink: true,
                  className: CreateAllocationClasses.input,
                }}
              /> */}
            </div>
          </div>

          <div className={CreateAllocationClasses.header_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
                Status</InputLabel>
            </div>
            <div className={CreateAllocationClasses.multiselectfield}>
              <Select
                classNamePrefix="mySelect"
                getOptionLabel={option => `${option.STATUS.toString()}`}
                getOptionValue={option => option.STATUS}
                options={statusData.filter(option => option.CODE === 'APV' || option.CODE === 'WS' || option.CODE === 'RSV')}
                isSearchable={true}
                onChange={selectSTATUS}
                maxMenuHeight={180}
                styles={styleSelect1}
                components={animatedComponents}
                value={statusData.filter(obj => searchHeaderData?.STATUS === obj.CODE)}
                closeMenuOnSelect={true}
                isDisabled={!searchHeaderData.ALLOC_NO || (String(searchHeaderData.ALLOC_CRITERIA) === "Pre Buy" ? true : (String(searchHeaderData.STATUS).length === 0 ? true :
                  !["WS", "APV", "RSV"].includes(searchHeaderData.STATUS) ? true :
                    ApproveFreeseCheck ? (typeof callMode === "undefined" ? String(searchHeaderData.STATUS) === "APV" : (callMode === "VIEW" ? true :
                      ValidWorkSheetCheck ? false : String(searchHeaderData.STATUS) === "APV")) : false))}
                isOptionDisabled={option => (String(searchHeaderData.STATUS) === "APV" ? option.CODE === "RSV" : false)
                  || String(searchHeaderData.STATUS) === option.CODE}
              />

            </div>
          </div>

          <div className={CreateAllocationClasses.header_child}>
            <div>
              {(isValid && searchHeaderData.ALLOC_TYPE.length === 0) ?
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left', color: "#b22222" }}>
                  Alloc Type*</InputLabel> :
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
                  Alloc Type</InputLabel>}
            </div>
            <div className={CreateAllocationClasses.multiselectfield}>
              <Select
                closeMenuOnSelect={true}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.ALLOC_TYPE.toString()}`}
                getOptionValue={option => option.ALLOC_TYPE}
                options={allocTypeData.length > 0 ? allocTypeData : []}
                isSearchable={true}
                onChange={selectALLOC_TYPE}
                maxMenuHeight={180}
                // isClearable={true}
                // placeholder={"Choose a Warehouse"}
                styles={(isValid && searchHeaderData.ALLOC_TYPE.length === 0) ? styleSelect2 : styleSelect1}
                components={animatedComponents}
                value={(callMode === "VIEW" || callMode === "EDIT") && allocDetails.length > 0 ? allocDetails :
                  allocDetails.length > 0 ?
                    allocTypeData.filter(obj => allocDetails[0]?.ALLOC_TYPE === (obj.ALLOC_TYPE)) :
                    allocTypeData.filter(obj => searchHeaderData?.ALLOC_TYPE_CODE === (obj.ALLOC_TYPE))}
                // isMulti 
                // isDisabled={totalData.length > 0 ? true : (headerDis || !searchHeaderData.ALLOC_NO || ApproveFreeseCheck)}
                theme={(isValid && searchHeaderData.ALLOC_TYPE.length === 0) ? theme => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    neutral50: '#b22222',  // Placeholder color //slategrey
                  },
                }) : false}
                isDisabled
              />
            </div>
          </div>

          <div className={CreateAllocationClasses.header_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 0px", display: 'inline', float: 'left' }}>
                Allocator</InputLabel>
            </div>
            <div>
              <TextField
                variant="outlined"
                size="small"
                sx={{
                  margin: "0px 0px 2px 0px", width: "140px"
                  , "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0",
                    borderRadius: "5px",
                    height: "15px",
                  }
                }}
                disabled
                name="CREATE_ID"
                id="outlined-disabled"
                autoComplete='off'
                value={allocDetails.length > 0 ? allocDetails[0].ALLOCATOR : searchHeaderData.CREATE_ID}
                onChange={onChange}
                InputProps={{
                  style: { fontSize: 12, height: "30px" },
                  className: CreateAllocationClasses.input,
                }}
              />
            </div>
          </div>
        </div>
        {/* <div style={{
          flex: "0 0 5%",
          overflow: "hidden"
        }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              style={{
                backgroundColor: isSHovered ? '#f5f5f5' : 'white',
                borderRadius: '50%',
                padding: "10px"
              }}
              title="Search"
              onMouseEnter={handleSEnter}
              onMouseLeave={handleSLeave}
              onClick={toggleDrawer("right", true)}
            >
              <ManageSearchIcon
                variant="contained"
                style={{
                  backgroundColor: isSHovered ? '#f5f5f5' : 'white',
                }}
                title="Search"
              />
            </div>
          </div>
        </div> */}
      </div>
    </Box>
  )

  const SearchAvailQty = () => (
    <Box
      display="inline-block"
      sx={{
        height: "auto",
        marginLeft: "0px",
        marginTop: "0px",
        padding: "0px 4px 10px 7px",
        //backgroundColor: "#F5F5F5",
        backgroundColor: "white",
        borderRadius: 1,
        //width: "100%",
        width: "fit-content",
        //width:"",
        boxShadow: 2, border: 0,
        borderBottom: 3, borderColor: "black"
      }}
    >
      <div >
        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 2px", display: 'inline', float: 'left' }}>
              Hier1</InputLabel>
          </div>
          <div className={CreateAllocationClasses.float_container}>
            {/* <Tooltip title={availSearch.length > 0 ? availSearch[0].HIER1_DESC : null} placement="top"> */}
            <TextField id="filled-disabled" size="small" variant="outlined"
              sx={{
                margin: "0px 0px 2px 2px", width: "60px"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "white",
                  borderRadius: "5px",
                  height: "13px",
                },
                borderRadius: "5px",
                // boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
              }}
              inputProps={{ sx: { backgroundColor: '#fff', height: "14px", } }}
              value={availSearch.length > 0 ? availSearch[0].HIER1 : null}
              InputProps={{
                readOnly: true,
                className: CreateAllocationClasses.inputFieldTable,
                style: { fontSize: 12, height: "30px", backgroundColor: "white", },
              }}
            />
            <TextField
              size="small"
              sx={{
                margin: "0px 0px 2px 2px", width: "130px"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "white",
                  borderRadius: "5px",
                  height: "13px",
                },
                borderRadius: "5px",
                boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
              }}
              value={availSearch.length > 0 ? (
                String(availSearch[0].HIER1_DESC).length > 0 && String(availSearch[0].HIER1_DESC).length < 12 ?
                  availSearch[0].HIER1_DESC === "NULL" ? null : availSearch[0].HIER1_DESC
                  : String(availSearch[0].HIER1_DESC).substring(0, 12) + "..."
              ) : null}
              // onChange={onChange}
              inputProps={{ maxLength: 100, }}
              InputProps={{
                readOnly: true,
                endAdornment: <SearchGridAvail ValueAvail={availSearch.length > 0 ? [availSearch[0].HIER1_DESC, "HIER1"] : ""} />,
                className: CreateAllocationClasses.input,
                style: { fontSize: 12, height: "30px", backgroundColor: "white", },
              }}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 2px", display: 'inline', float: 'left' }}>
              Style</InputLabel>
          </div>
          <div className={CreateAllocationClasses.float_container}>
            <TextField id="filled-disabled" size="small" variant="outlined"
              sx={{
                margin: "0px 0px 2px 2px", width: "120px"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "white",
                  borderRadius: "5px",
                  height: "13px",
                },
                borderRadius: "5px",
                // boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
              }}
              inputProps={{ sx: { backgroundColor: '#fff', height: "14px", } }}
              value={availSearch.length > 0 ? availSearch[0].ITEM : null}
              InputProps={{
                readOnly: true,
                className: CreateAllocationClasses.inputFieldTable,
                style: { fontSize: 12, height: "30px", backgroundColor: "white", },
              }}
            />
            <TextField
              size="small"
              sx={{
                margin: "0px 0px 2px 2px", width: "130px"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "white",
                  borderRadius: "5px",
                  height: "13px",
                },
                borderRadius: "5px",
                boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
              }}
              value={availSearch.length > 0 ? (
                String(availSearch[0].ITEM_DESC).length > 0 && String(availSearch[0].ITEM_DESC).length < 10 ?
                  availSearch[0].ITEM_DESC === "NULL" ? null : availSearch[0].ITEM_DESC
                  : String(availSearch[0].ITEM_DESC).substring(0, 10) + "..."
              ) : null}
              // onChange={onChange}
              inputProps={{ maxLength: 100, }}
              InputProps={{
                readOnly: true,
                endAdornment: <SearchGridAvail ValueAvail={availSearch.length > 0 ? [availSearch[0].ITEM_DESC, "ITEM"] : ""} />,
                className: CreateAllocationClasses.input,
                style: { fontSize: 12, height: "30px", backgroundColor: "white", },
              }}
            />
            {/* <Tooltip title={availSearch.length > 0 ? availSearch[0].HIER2_DESC : null} placement="top"> */}
            {/* </Tooltip> */}
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 2px", display: 'inline', float: 'left' }}>
              Criteria Key</InputLabel>
          </div>
          <div>
            <TextField id="filled-disabled" size="small" variant="outlined"
              sx={{
                margin: "0px 0px 2px 2px", width: "180px"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "white",
                  borderRadius: "5px",
                  height: "13px",
                },
                borderRadius: "5px",
                // boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
              }}
              inputProps={{ sx: { backgroundColor: '#fff', height: "14px", } }}
              value={availSearch.length > 0 ? (availSearch[0].PO) : null}
              InputProps={{
                readOnly: true,
                className: CreateAllocationClasses.inputFieldTable,
                style: { fontSize: 12, height: "30px", backgroundColor: "white", borderRadius: "5px", },
              }}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 2px", display: 'inline', float: 'left' }}>
              Avail Qty</InputLabel>
          </div>
          <div>
            <TextField id="filled-disabled" size="small" variant="outlined"
              sx={{
                margin: "0px 0px 2px 2px", width: "180px"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "white",
                  borderRadius: "5px",
                  height: "13px",
                },
                borderRadius: "5px",
                // boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
              }}
              inputProps={{ sx: { backgroundColor: '#fff', height: "14px", } }}
              value={availSearch.length > 0 ? availSearch[0].AVAIL_QTY : null}
              InputProps={{
                readOnly: true,
                className: CreateAllocationClasses.inputFieldTable,
                style: { fontSize: 12, height: "30px", backgroundColor: "white", },
              }}
            />
          </div>
        </div>
      </div>

      <div >
        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 2px", display: 'inline', float: 'left' }}>
              Hier2</InputLabel>
          </div>
          <div className={CreateAllocationClasses.float_container}>
            <TextField id="filled-disabled" size="small" variant="outlined"
              sx={{
                margin: "0px 0px 2px 2px", width: "60px"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "white",
                  borderRadius: "5px",
                  height: "13px",
                },
                borderRadius: "5px",
                // boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
              }}
              inputProps={{ sx: { backgroundColor: '#fff', height: "14px", } }}
              value={availSearch.length > 0 ? availSearch[0].HIER2 : null}
              InputProps={{
                readOnly: true,
                className: CreateAllocationClasses.inputFieldTable,
                style: { fontSize: 12, height: "30px", backgroundColor: "white", },
              }}
            />
            <TextField
              size="small"
              sx={{
                margin: "0px 0px 2px 2px", width: "130px"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "white",
                  borderRadius: "5px",
                  height: "13px",
                },
                borderRadius: "5px",
                boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
              }}
              value={availSearch.length > 0 ? (
                String(availSearch[0].HIER2_DESC).length > 0 && String(availSearch[0].HIER2_DESC).length < 12 ?
                  availSearch[0].HIER2_DESC === "NULL" ? null : availSearch[0].HIER2_DESC
                  : String(availSearch[0].HIER2_DESC).substring(0, 12) + "..."
              ) : null}
              // onChange={onChange}
              inputProps={{ maxLength: 100, }}
              InputProps={{
                readOnly: true,
                endAdornment: <SearchGridAvail ValueAvail={availSearch.length > 0 ? [availSearch[0].HIER2_DESC, "HIER2"] : ""} />,
                className: CreateAllocationClasses.input,
                style: { fontSize: 12, height: "30px", backgroundColor: "white", },
              }}
            />
            {/* <Tooltip title={availSearch.length > 0 ? availSearch[0].HIER2_DESC : null} placement="top"> */}
            {/* </Tooltip> */}
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 2px", display: 'inline', float: 'left' }}>
              Variant</InputLabel>
          </div>
          <div className={CreateAllocationClasses.float_container}>
            <TextField id="filled-disabled" size="small" variant="outlined"
              sx={{
                margin: "0px 0px 2px 2px", width: "120px"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "white",
                  borderRadius: "5px",
                  height: "13px",
                },
                borderRadius: "5px",
                // boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
              }}
              inputProps={{ sx: { backgroundColor: '#fff', height: "14px", } }}
              value={availSearch.length > 0 ? availSearch[0].DIFF_ID : null}
              InputProps={{
                readOnly: true,
                className: CreateAllocationClasses.inputFieldTable,
                style: { fontSize: 12, height: "30px", backgroundColor: "white", },
              }}
            />
            <TextField
              size="small"
              sx={{
                margin: "0px 0px 2px 2px", width: "130px"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "white",
                  borderRadius: "5px",
                  height: "13px",
                },
                borderRadius: "5px",
                boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
              }}
              value={availSearch.length > 0 ? (
                String(availSearch[0].DIFF_DESC).length > 0 && String(availSearch[0].DIFF_DESC).length < 12 ?
                  availSearch[0].DIFF_DESC === "NULL" ? null : availSearch[0].DIFF_DESC
                  : String(availSearch[0].DIFF_DESC).substring(0, 12) + "..."
              ) : null}
              // onChange={onChange}
              inputProps={{ maxLength: 100, }}
              InputProps={{
                readOnly: true,
                endAdornment: <SearchGridAvail ValueAvail={availSearch.length > 0 ? [availSearch[0].DIFF_DESC, "DIFF_ID"] : ""} />,
                className: CreateAllocationClasses.input,
                style: { fontSize: 12, height: "30px", backgroundColor: "white", },
              }}
            />
            {/* <Tooltip title={availSearch.length > 0 ? availSearch[0].HIER2_DESC : null} placement="top"> */}
            {/* </Tooltip> */}
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 2px", display: 'inline', float: 'left' }}>
              Alloc Criteria</InputLabel>
          </div>
          <div>
            <TextField id="filled-disabled" size="small" variant="outlined"
              sx={{
                margin: "0px 0px 2px 2px", width: "180px"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "white",
                  borderRadius: "5px",
                  height: "13px",
                },
                borderRadius: "5px",
                // boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
              }}
              inputProps={{ sx: { backgroundColor: '#fff', height: "14px", } }}
              value={availSearch.length > 0 ? (availSearch[0].ALLOC_CRITERIA === 'W' ? "Warehouse" : ((availSearch[0].ALLOC_CRITERIA === 'P' ? "Purchase Order" :
                (availSearch[0].ALLOC_CRITERIA === 'T' ? "Transfer" : (availSearch[0].ALLOC_CRITERIA === 'A' ? "ASN" : (availSearch[0].ALLOC_CRITERIA === 'F' ? "What If" : null)))))) : null}
              InputProps={{
                readOnly: true,
                className: CreateAllocationClasses.inputFieldTable,
                style: { fontSize: 12, height: "30px", backgroundColor: "white", },
              }}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 2px", display: 'inline', float: 'left' }}>
              Inactive Qty</InputLabel>
          </div>
          <div>
            <TextField id="filled-disabled" size="small" variant="outlined"
              sx={{
                margin: "0px 0px 2px 2px", width: "180px"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "white",
                  borderRadius: "5px",
                  height: "13px",
                },
                borderRadius: "5px",
                // boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
              }}
              inputProps={{ sx: { backgroundColor: '#fff', height: "14px", } }}
              value={availSearch.length > 0 ? availSearch[0].INACTIVE_QTY : null}
              InputProps={{
                readOnly: true,
                className: CreateAllocationClasses.inputFieldTable,
                style: { fontSize: 12, height: "30px", backgroundColor: "white", },
              }}
            />
          </div>
        </div>

      </div>


      <div>
        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 2px", display: 'inline', float: 'left' }}>
              Hier3</InputLabel>
          </div>
          <div className={CreateAllocationClasses.float_container}>
            <TextField id="filled-disabled" size="small" variant="outlined"
              sx={{
                margin: "0px 0px 2px 2px", width: "60px"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "white",
                  borderRadius: "5px",
                  height: "13px",
                },
                borderRadius: "5px",
                // boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
              }}
              inputProps={{ sx: { backgroundColor: '#fff', height: "14px", } }}
              value={availSearch.length > 0 ? availSearch[0].HIER3 : null}
              InputProps={{
                readOnly: true,
                className: CreateAllocationClasses.inputFieldTable,
                style: { fontSize: 12, height: "30px", backgroundColor: "white", },
              }}
            />
            <TextField
              size="small"
              sx={{
                margin: "0px 0px 2px 2px", width: "130px"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "white",
                  borderRadius: "5px",
                  height: "13px",
                },
                borderRadius: "5px",
                boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
              }}
              value={availSearch.length > 0 ? (
                String(availSearch[0].HIER3_DESC).length > 0 && String(availSearch[0].HIER3_DESC).length < 12 ?
                  availSearch[0].HIER3_DESC === "NULL" ? null : availSearch[0].HIER3_DESC
                  : String(availSearch[0].HIER3_DESC).substring(0, 12) + "..."
              ) : null}
              // onChange={onChange}
              inputProps={{ maxLength: 100, }}
              InputProps={{
                readOnly: true,
                endAdornment: <SearchGridAvail ValueAvail={availSearch.length > 0 ? [availSearch[0].HIER3_DESC, "HIER3"] : ""} />,
                className: CreateAllocationClasses.input,
                style: { fontSize: 12, height: "30px", backgroundColor: "white", },
              }}
            />
            {/* </Tooltip> */}
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 2px", display: 'inline', float: 'left' }}>
              WH</InputLabel>
          </div>
          <div className={CreateAllocationClasses.float_container}>
            <TextField id="filled-disabled" size="small" variant="outlined"
              sx={{
                margin: "0px 0px 2px 2px", width: "120px"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "white",
                  borderRadius: "5px",
                  height: "13px",
                },
                borderRadius: "5px",
                // boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
              }}
              inputProps={{ sx: { backgroundColor: '#fff', height: "14px", } }}
              value={availSearch.length > 0 ? availSearch[0].WH : null}
              InputProps={{
                readOnly: true,
                className: CreateAllocationClasses.inputFieldTable,
                style: { fontSize: 12, height: "30px", backgroundColor: "white", },
              }}
            />
            <TextField
              size="small"
              sx={{
                margin: "0px 0px 2px 2px", width: "130px"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "white",
                  borderRadius: "5px",
                  height: "13px",
                },
                borderRadius: "5px",
                boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
              }}
              value={availSearch.length > 0 ? (
                String(availSearch[0].WH_DESC).length > 0 && String(availSearch[0].WH_DESC).length < 12 ?
                  availSearch[0].WH_DESC === "NULL" ? null : availSearch[0].WH_DESC
                  : String(availSearch[0].WH_DESC).substring(0, 12) + "..."
              ) : null}
              // onChange={onChange}
              inputProps={{ maxLength: 100, }}
              InputProps={{
                readOnly: true,
                endAdornment: <SearchGridAvail ValueAvail={availSearch.length > 0 ? [availSearch[0].WH_DESC, "WH"] : ""} />,
                className: CreateAllocationClasses.input,
                style: { fontSize: 12, height: "30px", backgroundColor: "white", },
              }}
            />
            {/* </Tooltip> */}
          </div>
        </div>
      </div>

      <div>
      </div>
    </Box>
  )

  if (searchHeaderData.ALLOC_LEVEL === "D") {
    headCells.map((option) => { if (option.label === "Sku") { option.label = "Style" } })
  } else if (searchHeaderData.ALLOC_LEVEL === "T") {
    headCells.map((option) => { if (option.label === "Style") { option.label = "Sku" } })
  }


  function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead className={CreateAllocationClasses.TitleHead}>
        <TableRow className={CreateAllocationClasses.TitleRow}>
          <StyledTableCell padding="checkbox" style={{
            whiteSpace: "nowrap", padding: "0px", margin: "0px", width: "10px"
            // border: "1px solid red"
          }}
          >
            <Checkbox
              color="primary"
              size="small"
              disabled={ApproveFreeseCheck}
              // indeterminate={selected.length > 0 && selected.length < totalData.length}
              // checked={totalData.length > 0 && selected.length === totalData.length}
              indeterminate={Object.keys(selected[0]).length > 0
                && Object.keys(selected[0]).includes(String(page))
                && selected[0][page].length < currentPageData.length}
              checked={currentPageData.length > 0 && Object.keys(selected[0]).length > 0
                && Object.keys(selected[0]).includes(String(page))
                && selected[0][page].length === currentPageData.length}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all data',
              }}
              style={{
                color: "#fff",
                padding: "3px 0px 3px 2px",
                textAlign: "center",
                '&.Mui-disabled': {
                  opacity: 0.5,
                  backgroundColor: 'DodgerBlue',
                  color: '#fff',
                },
                // margin: "0px 0px 0px 5px",
              }}
            />
          </StyledTableCell >
          {headCells.map((headCell) => (ManageHeaderData.includes(headCell.id) &&
            (headCell.id !== "SIZE_PRF_IND" ?
              (headCell.id !== "SUBSTITUTE_IND" ?
                (headCell.id !== "INVENT_IND" ?
                  (headCell.id !== "PACK_IND" ?
                    ((headCell.id !== "SPLIT_IND") ?
                      (searchHeaderData.ALLOC_CRITERIA === "Pre Buy" ?
                        ((headCell.id !== "LOC") ?
                          <StyledTableCell
                            // className={CreateAllocationClasses.TableCell}
                            size="small"
                            key={headCell.id}
                            sortDirection={orderBy === headCell.id ? order : false}
                            style={["ITEM", "ITEM_DESC", "DIFF_ID", "VPN"].includes(headCell.id) ?
                              { whiteSpace: "nowrap", paddingLeft: "3px", paddingRight: "15px", } :
                              { whiteSpace: "nowrap", paddingLeft: "3px", }}
                          >
                            <TableSortLabel
                              active={orderBy === headCell.id}
                              direction={orderBy === headCell.id ? order : 'asc'}
                              onClick={createSortHandler(headCell.id)}
                              sx={{
                                "&.MuiTableSortLabel-root": {
                                  color: "white",
                                  fontSize: "0.775rem",
                                },
                                "&.MuiTableSortLabel-root:hover": {
                                  color: "#fff",
                                },
                                "&.Mui-active": {
                                  color: "#fff",
                                },
                                "& .MuiTableSortLabel-icon": {
                                  color: "#fff !important",
                                },
                              }}
                            >
                              {headCell.label}
                              {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                              ) : null}
                            </TableSortLabel>
                          </StyledTableCell >
                          :
                          <StyledTableCell
                            size="small"
                            style={{
                              whiteSpace: "nowrap", padding: "0px 3px 0px 3px",
                              "&.Mui-active": {
                                color: "#fff",
                              }, color: "#fff",
                            }}
                          >{headCell.label}
                          </StyledTableCell >)
                        :
                        /* MAIN */
                        <StyledTableCell
                          // className={CreateAllocationClasses.TableCell}
                          size="small"
                          key={headCell.id}
                          sortDirection={orderBy === headCell.id ? order : false}
                          style={
                            ["ITEM", "ITEM_DESC", "DIFF_ID", "VPN"].includes(headCell.id) ?
                              {
                                whiteSpace: "nowrap",
                                paddingLeft: "3px",
                                //paddingRight: "15px",
                                ...(headCell.id === "ITEM" ? { paddingRight: "25px" } : { paddingRight: "15px" }),
                              } :
                              {
                                whiteSpace: "nowrap",
                                paddingLeft: "3px",
                              }
                          }

                        >
                          <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            sx={{
                              "&.MuiTableSortLabel-root": {
                                color: "white",
                                fontSize: "0.775rem",
                              },
                              "&.MuiTableSortLabel-root:hover": {
                                color: "#fff",
                              },
                              "&.Mui-active": {
                                color: "#fff",
                              },
                              "& .MuiTableSortLabel-icon": {
                                color: "#fff !important",
                              },
                            }}
                          >
                            {headCell.label === "Sku" ? (allocDetails.length > 0 && allocDetails[0].ALLOC_LEVEL_CODE === 'D' ? "Style" : "Sku")
                              : headCell.label}
                            {orderBy === headCell.id ? (
                              <Box component="span" sx={visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                              </Box>
                            ) : null}
                          </TableSortLabel>
                        </StyledTableCell >)
                      :
                      <StyledTableCell
                        size="small"
                        style={{
                          whiteSpace: "nowrap", padding: "0px 3px 0px 3px",
                          "&.Mui-active": {
                            color: "#fff",
                          }, color: "#fff",
                        }}
                      >{headCell.label}
                        <Checkbox
                          color="primary"
                          size="small"
                          disabled={ApproveFreeseCheck}
                          indeterminate={selectedSplit.length > 0 && selectedSplit.length < totalData.length}
                          checked={totalData.length > 0 && selectedSplit.length === totalData.length}
                          onChange={handleSelectSplitAllClick}
                          inputProps={{
                            'aria-label': 'select all data',
                          }}
                          style={{
                            color: "#fff",
                            padding: "3px 0px 3px 2px",
                            textAlign: "center",
                            '&.Mui-disabled': {
                              opacity: 0.5,
                              backgroundColor: 'DodgerBlue',
                              color: '#fff',
                            },
                            // margin: "0px 0px 0px 5px",
                          }}
                        />
                      </StyledTableCell >)
                    :
                    <StyledTableCell
                      size="small"
                      style={{
                        whiteSpace: "nowrap", padding: "0px 3px 0px 3px",
                        "&.Mui-active": {
                          color: "#fff",
                        }, color: "#fff",
                      }}
                    >{headCell.label}</StyledTableCell>)
                  :
                  <StyledTableCell
                    size="small"
                    style={{
                      whiteSpace: "nowrap", padding: "0px 3px 0px 3px",
                      "&.Mui-active": {
                        color: "#fff",
                      }, color: "#fff",
                    }}
                  >{headCell.label}</StyledTableCell>)
                :
                <StyledTableCell
                  size="small"
                  style={{
                    whiteSpace: "nowrap", padding: "0px 3px 0px 3px",
                    "&.Mui-active": {
                      color: "#fff",
                    }, color: "#fff",
                  }}
                >{headCell.label}</StyledTableCell>)
              :
              <StyledTableCell
                size="small"
                style={{
                  whiteSpace: "nowrap", padding: "0px 3px 0px 3px",
                  "&.Mui-active": {
                    color: "#fff",
                  }, color: "#fff",
                }}
              >{headCell.label}
              </StyledTableCell>)
          )
          )}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  function descendingComparator(a, b, orderBy) {
    let c, d;
    if (orderBy == "SR_NO") {
      c = (b[orderBy]);
      d = (a[orderBy]);
    } else {
      c = isNaN(b[orderBy]) ? b[orderBy] : parseInt(b[orderBy]);
      d = isNaN(a[orderBy]) ? a[orderBy] : parseInt(a[orderBy]);
    }
    if (c === "NULL" || d === "NULL") {
      if (c === "NULL" && d !== "NULL") {
        return -1
      }
      else if (d === "NULL" && c !== "NULL") {
        return 1
      }
      else {
        return 1
      }
    }
    else {
      if (c < d) {
        return -1;
      }
      if (c > d) {
        return 1;
      }
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const [sortCheck, setSortCheck] = useState(false)
  const [sortValue, setSortValue] = useState("")

  useEffect(() => {
    if (sortCheck) {
      if (order === "asc") {
        const sortedData = stableSort(currentPageData, getComparator("asc", sortValue));
        sortedData.forEach((item, index) => { totalData[startIndex + index] = item; });
        setcurrentPageData(sortedData);
      }
      if (order === "desc") {
        const sortedData = stableSort(currentPageData, getComparator("desc", sortValue));
        sortedData.forEach((item, index) => { totalData[startIndex + index] = item; });
        setcurrentPageData(sortedData);
      }
      setTotalData(totalData);
      setTabledata(totalData);
      setSortCheck(false);
    }
  }, [totalData, order, orderBy]);

  const handleRequestSort = (event, property) => {
    if (event) {
      setSortCheck(true)
      setSortValue(String(property))
    }
    const isAsc = (orderBy === property && order === 'asc');
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    const lastPage = Math.ceil((totalData.length) / rowsPerPage);
    // const filteredArray = totalData.slice((page * rowsPerPage),
    //   ((page * rowsPerPage) +
    //     (page === lastPage - 1 ? (totalData.length - (page * rowsPerPage)) : rowsPerPage)
    //   ));
    const filteredArray = currentPageData
    const newSelected = filteredArray.map((n) => n.SR_NO);
    const pageselected = { [page]: newSelected };

    if ((Object.keys(selected[0]).length > 0 && !Object.keys(selected[0]).includes(String(page)))
    ) {

      const sortedArray = ((selected && Object.keys(selected[0]).length > 0) ? [{ ...selected[0], ...pageselected }] : [pageselected]).sort((a, b) => {
        const keyA = Object.keys(a)[0];
        const keyB = Object.keys(b)[0];
        return keyA - keyB;
      });
      setSelected(sortedArray);
      const combinedList = Object.values(sortedArray[0]).flat()
      const temp = totalData.filter(item => combinedList.includes(item.SR_NO))
      setAllPageSelected(combinedList);
      setSelData(temp);
      return;
    } else if (Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) {
      const updatedArray = selected.map((obj) => {
        if (obj.hasOwnProperty(page)) {
          delete obj[page];
        }
        return obj;
      });
      updatedArray.sort((a, b) => {
        const keyA = Object.keys(a)[0];
        const keyB = Object.keys(b)[0];
        return keyA - keyB;
      });
      setSelected(updatedArray);
      //console.log("pageselected:2 ", updatedArray);
      const combinedList = Object.values(updatedArray[0]).flat()
      const temp = totalData.filter(item => combinedList.includes(item.SR_NO))
      setAllPageSelected(combinedList);
      setSelData(temp);
      return;
    } else if ((Object.keys(selected[0]).length === 0)) {

      setSelected([pageselected]);
      const combinedList = Object.values(pageselected[0]).flat()
      const temp = totalData.filter(item => combinedList.includes(item.SR_NO))
      setAllPageSelected(combinedList);
      setSelData(temp);
      return;
    }
    setSelected([{}]);
    setSelData([])
    setAllPageSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))
      ? selected[0][page].indexOf(name)
      : -1;
    let newSelected = [];

    if (selectedIndex === -1) {
      if (Object.keys(selected[0]).length > 0 && !Object.keys(selected[0]).includes(String(page))) {
        newSelected = [{ ...selected[0], [page]: [name] }];
      } else if (Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) {
        newSelected = selected;
        newSelected[0][page].push(name);
      } else if (Object.keys(selected[0]).length === 0) {
        const pageselected = { [page]: [name] };
        newSelected.push(pageselected);
      }
    } else {
      if (selected[0][page].length === 1) {
        newSelected = selected.map((obj) => {
          if (obj.hasOwnProperty(String(page))) {
            const newObj = { ...obj };
            delete newObj[String(page)];
            return newObj;
          }
          return obj;
        });

      } else if (selected[0][page].length > 1) {
        selected.forEach((obj) => {
          if (obj.hasOwnProperty(page)) {
            const index = obj[page].indexOf(name);
            obj[page].splice(index, 1);
          }
        });
        newSelected = selected;
      }
    }
    setSelected(newSelected);
    const combinedList = Object.values(newSelected[0]).flat()
    const temp = totalData.filter(item => combinedList.includes(item.SR_NO))
    setSelData(temp);
    setAllPageSelected(combinedList);
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked && selected.length === 0) {
  //     const newSelected = totalData.map((n) => n.SR_NO);
  //     setSelected(newSelected);
  //     if (newSelected.length > 0) {
  //       var temp = [];
  //       newSelected.map((val) => {
  //         temp.push((totalData.filter(obj => obj.SR_NO === val))[0]);
  //       });
  //       setSelData(temp);
  //     }
  //     return;
  //   }
  //   setSelected([]);
  //   setSelData([]);
  // };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1),
  //     );
  //   }
  //   if (newSelected.length > 0) {
  //     var temp = [];
  //     newSelected.map((val) => {
  //       temp.push(totalData[val - 1]);
  //     });
  //     setSelData(temp);
  //   }
  //   else {
  //     setSelData([]);
  //   }
  //   setSelected(newSelected);
  // };

  const isSelected = (name) => (Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) ? selected[0][page].indexOf(name) !== -1 : false;

  const onTableCellChange = (e, value) => {
    const updatedData = [...totalData];
    updatedData.forEach((row) => {
      if (row.SR_NO === value) {
        row.AVAIL_QTY = e.target.textContent;
      }
    });
    setTotalData(updatedData);
  };

  const onTableCellChange1 = (e, value) => {
    const updatedData = [...totalData];
    updatedData.forEach((row) => {
      if (row.SR_NO === value) {
        row.HOLDBACK_QTY = e.target.textContent;
      }
    });
    setTotalData(updatedData);
  };


  const onTableCellChange3 = (e, value, name) => {

    if (Object.is(e, null) === false) {
      if (name === "SOM_TYPE") {
        totalData.map((row) => {
          if (row.SR_NO === value) {
            row["SOM_TYPE"] = e.CODE
          }
        })
      }

      if (name === "HOLDBACK_TYPE") {
        totalData.map((row) => {
          if (row.SR_NO === value) {
            row["HOLDBACK_TYPE"] = e.CODE
          }
        })
      }
    }
    if (Object.is(e, null) === true) {
      if (name === "SOM_TYPE") {
        totalData.map((row) => {
          if (row.SR_NO === value) {
            row["SOM_TYPE"] = ""
          }
        })
      }

      if (name === "HOLDBACK_TYPE") {
        totalData.map((row) => {
          if (row.SR_NO === value) {
            row["HOLDBACK_TYPE"] = ""
            if (row.HOLDBACK_QTY.length > 0) {
              row["HOLDBACK_QTY"] = ""
            }
          }
        })
      }
    }
    setTotalData(totalData);
    setSampleVal([])
  };
  const RulesLocationData = useSelector(
    (state) => state.RulesLocationReducers
  );

  useEffect(() => {
    if (RulesLocationData?.data?.rtvrldata
      // && Array.isArray(RulesLocationData?.data?.rtvrldata)
    ) {
      let merged = { ...searchDataCWH, ...searchHeaderData, ...searchDataCCommon }
      if (searchHeaderData.ALLOC_CRITERIA === "Pre Buy") {
        dispatch(getSWITCHTABFUNCRequest([{
          "ALLOC_NO": allocNoData.ALLOC_NO, "UPDATE": selData, "TAB": 1, "HEADER": merged,
          "CHANGE_CREATE_GRID": selData, "CHANGE_CREATE_AVAIL_GRID": selData,
          "SPLIT_IND": selSplitData, "RECALC_IND": "Y"
        }]));
      } else {
        dispatch(getSWITCHTABFUNCRequest([{
          "ALLOC_NO": allocNoData.ALLOC_NO, "UPDATE": selData, "TAB": 1, "HEADER": merged,
          "CHANGE_CREATE_GRID": selData, "CHANGE_CREATE_AVAIL_GRID": [],
          "SPLIT_IND": selSplitData, "RECALC_IND": "Y"
        }]));
      }
      if (RulesLocationData?.data?.rtvrldata?.status === 200) {
        if (RulesLocationData?.data?.rtvrldata?.message[0].DATA === 0) {
          setrtvrldata([])
        } else if (RulesLocationData?.data?.rtvrldata?.message[0].DATA === 1) {
          setrtvrldata([RulesLocationData?.data?.rtvrldata?.message[0].ALLOC_RULE, RulesLocationData?.data?.rtvrldata?.message[0].ALLOC_LOCATION])
        }
      } else {
        setrtvrldata([])
      }
      setLoading(false);
    }
  }, [RulesLocationData?.data]);

  const handleSelectInd = (val) => {
    setTabCond(true); //?????
    setRTabCond(true); //?????
    setDisCond(val); //?????
    setSwitchVal(val); //?????
    // setLIMData([]);
    limData.splice(0, limData.length);
    setIsLoading(true);
    let merged = { ...searchDataCWH, ...searchHeaderData, ...searchDataCCommon }
    if (val !== 1) {
      if (searchHeaderData.ALLOC_CRITERIA === "Pre Buy") {
        dispatch(getSWITCHTABFUNCRequest([{
          "ALLOC_NO": allocNoData.ALLOC_NO, "UPDATE": selData, "TAB": val, "HEADER": merged,
          "CHANGE_CREATE_GRID": selData, "CHANGE_CREATE_AVAIL_GRID": selData,
          "SPLIT_IND": selSplitData, "RECALC_IND": "Y"
        }]));
      } else {
        dispatch(getSWITCHTABFUNCRequest([{
          "ALLOC_NO": allocNoData.ALLOC_NO, "UPDATE": selData, "TAB": val, "HEADER": merged,
          "CHANGE_CREATE_GRID": selData, "CHANGE_CREATE_AVAIL_GRID": [],
          "SPLIT_IND": selSplitData, "RECALC_IND": "Y"
        }]));
      }
    }
    if (val === 1) {
      setrtvrldata([])
      dispatch(getRTVRLDATARequest([allocNoData]));
    }
  }

  const handleTabChange = (event, newValue) => {
    if (newValue !== "2" && newValue !== "3" && newValue !== "4" && newValue !== "5") {
      setTab(newValue);
    }
    if (newValue === "3") {
      setLimCheck(true);
    } else if (newValue === "4") {
      setLimCheck(true);
    }
    if (newValue === "5") { setAllocDtlscreenTabColor(true); }
    if (newValue === "6") { setWhatIfSummscreenTabColor(true); }
    if (newValue === "8") { setSizeDtlscreenTabColor(true); }
    setLIMData([]);
  }

  const handleCloseAvailDialog = () => {
    setOpenAvailDialog(false);
  };


  const showAvailDialog = (e, values) => {
    if (searchHeaderData.ALLOC_TYPE !== "S" && searchHeaderData.ALLOC_LEVEL === "D") {
      if (values) {
        setPUpLoad(true);
        dispatch(getALLOC_AVAIL_QTYRequest([{ "ALLOC_NO": allocNoData.ALLOC_NO, "DIFF_ID": values.DIFF_ID, "ITEM": values.ITEM, "WAREHOUSE": values.LOC }]));
        dispatch(getALLOC_AVAIL_SEARCHRequest([{ "ALLOC_NO": allocNoData.ALLOC_NO, "DIFF_ID": values.DIFF_ID, "ITEM": values.ITEM, "WAREHOUSE": values.LOC }]));
        setAvailQty([]);
        setOpenAvailDialog(true);
        setAvailSearch([]);
      }
    }
  }
  if (availCheck) {
    let availQtyVal = 0;
    let InactiveQty = 0;
    availQty.map((data) => {
      if (data.AVAILABLE_QTY === "" || data.AVAILABLE_QTY === "NULL" || data.AVAILABLE_QTY === "NaN") {
        data.AVAILABLE_QTY = 0
        availQtyVal = availQtyVal + data.AVAILABLE_QTY;
      } else {
        availQtyVal = availQtyVal + data.AVAILABLE_QTY;
      }
      if (data.INACTIVE_QTY === "" || data.INACTIVE_QTY === "NULL" || data.INACTIVE_QTY === "NaN") {
        data.INACTIVE_QTY = 0
        InactiveQty = InactiveQty + data.INACTIVE_QTY;
      } else {
        InactiveQty = InactiveQty + data.INACTIVE_QTY;
      }
    })
    availSearch.map(obj =>
      obj.AVAIL_QTY = availQtyVal
    )
    availSearch.map(obj =>
      obj.INACTIVE_QTY = InactiveQty
    )
    setAvailSearch(availSearch)
    // setTotalAvailQty(availQtyVal);
    setAvailCheck(false);
  }

  //// Paginations ??:: // 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    const temp = totalData.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
    setcurrentPageData(temp);
    setcurrentPageRows(temp);
    setInputValue([]);
    setInputValue1({});
    setSampleVal(totalData);
    setCopyValue(initialCopyValues);
    setInputValue({});
    setInputValue1({})
    setLockCheck(false);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /*
               ############################################
               ######### SPLIT BUTTON FUNCTION  ###########
               ############################################
  */

  const handleSelectSplitAllClick = (event) => {
    if (event.target.checked && selectedSplit.length === 0) {
      const newSelected = totalData.map((n) => n.SR_NO);
      setSelectedSplit(newSelected);
      if (newSelected.length > 0) {
        const temp = totalData.filter(item => newSelected.includes(item.SR_NO))
        setSelSplitData(temp);
      }
      return;
    }
    setSelectedSplit([]);
    setSelSplitData([]);
  };

  const handleClickSplit = (event, name) => {
    const selectedIndex = selectedSplit.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedSplit, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedSplit.slice(1));
    } else if (selectedIndex === selectedSplit.length - 1) {
      newSelected = newSelected.concat(selectedSplit.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedSplit.slice(0, selectedIndex),
        selectedSplit.slice(selectedIndex + 1),
      );
    }
    if (newSelected.length > 0) {
      const temp = totalData.filter(item => newSelected.includes(item.SR_NO))
      setSelSplitData(temp);
    }
    else {
      setSelSplitData([]);
    }
    setSelectedSplit(newSelected);
  };

  const Split_Button_function = () => {
    setIsLoading(true);
    if (selSplitData.length > 0) {
      if (selSplitData.length === totalData.length) {
        setOpenDialog(true);
        setDialogData("All records cannot be selected for split.");
        setIsLoading(false);
      }
      else {
        if (searchHeaderData.ALLOC_CRITERIA === "Pre Buy") {
          dispatch(getSPLITCREATEFUNCTIONRequest([{
            "ALLOC_NO": allocNoData.ALLOC_NO, "UPDATE": selData,
            "CHANGE_CREATE_GRID": selData, "CHANGE_CREATE_AVAIL_GRID": selData,
            "SPLIT_IND": selSplitData, "ALLOCATOR": JSON.parse(localStorage.getItem("userData"))?.username
          }]));
        } else {
          dispatch(getSPLITCREATEFUNCTIONRequest([{
            "ALLOC_NO": allocNoData.ALLOC_NO, "UPDATE": selData,
            "CHANGE_CREATE_GRID": selData, "CHANGE_CREATE_AVAIL_GRID": [],
            "SPLIT_IND": selSplitData, "ALLOCATOR": JSON.parse(localStorage.getItem("userData"))?.username
          }]));
        }
      }
    } else {
      setOpenDialog(true);
      setDialogData("Please select the records.");
      setIsLoading(false);
    }
  }

  /*
               #########################################
               ######### CALCULATION POP-UP  ###########
               #########################################
  */

  useEffect(() => {
    if ((CreateAllocationData?.data?.calcRes) && calculateFunctionCall) {
      setIsLoading(false);
      setOpenDialog(true);
      setDialogData(String(CreateAllocationData?.data?.calcRes?.message));
      setCalculateFunctionCall(false);
      dispatch(postCREATEGRIDDFRequest([allocNoData])); // asy akhil
      if (CreateAllocationData?.data?.calcRes?.status === 201) {
        setIsValidQtyLimits(true);
        dispatch(postAPPROVEVALIDFUNCTIONRequest([allocNoData]));// asy akhil
        setCalcCheck(true); //????
        setCalcStatus(true);
        setValidSizeDetailCheck(false); // For Enabling the Size details Tab
        setValidAllocDetailCheck(false); // For Enabling the Alloc details Tab
        setValidWhatIfSummCheck(false); // For Enabling the What If Summary details Tab
      } else if (CreateAllocationData?.data?.calcRes?.status === 500) {
        setCalcCheck(false);//????
        setValidSizeDetailCheck(true); // For Disabling the Size details Tab
        setValidAllocDetailCheck(true); // For Disabling the Alloc details Tab
        setValidWhatIfSummCheck(true); // For Disabling the What If Summary details Tab
      }
      CreateAllocationData.data.calcRes.status = 0
    }
  }, [CreateAllocationData?.data?.calcRes]);

  const Calc_func = () => {
    setIsLoading(true);
    setCalculateFunctionCall(true);
    let merged = { ...searchDataCWH, ...searchHeaderData, ...searchDataCCommon }
    if (searchHeaderData.ALLOC_CRITERIA === "Pre Buy") {
      dispatch(postCALCRequest([{
        "ALLOC_NO": allocNoData.ALLOC_NO, "UPDATE": selData, "HEADER": merged,
        "CHANGE_CREATE_GRID": selData, "CHANGE_CREATE_AVAIL_GRID": selData,
        "SPLIT_IND": selSplitData,
      }]));
    } else {
      dispatch(postCALCRequest([{
        "ALLOC_NO": allocNoData.ALLOC_NO, "UPDATE": selData, "HEADER": merged,
        "CHANGE_CREATE_GRID": selData, "CHANGE_CREATE_AVAIL_GRID": [],
        "SPLIT_IND": selSplitData,
      }]));
    }

  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }
  /*
                  #########################################
                  ############ APPROVE POP-UP  ############
                  #########################################
    */

  useEffect(() => {
    if (CreateAllocationData?.data?.APPROVEVALIDFUNCTION?.status) {
      if (CreateAllocationData?.data?.APPROVEVALIDFUNCTION?.status === 200) {
        if (searchHeaderData.ALLOC_CRITERIA === 'Pre Buy' || searchHeaderData.ALLOC_CRITERIA === 'F') {
          setValidCalculateDataCheck(false); //Disabling the Approve Tab
          setValidReserveDataCheck(false); //Disabling the Reserve Tab
        } else {
          setValidCalculateDataCheck(true); //enabling the Approve Tab
          setValidReserveDataCheck(true); //enabling the Reserve Tab
        }
        setCalculatescreenTabColor(false); // Tab color green for Calculation
      } else if (CreateAllocationData?.data?.APPROVEVALIDFUNCTION?.status === 500) {
        setValidCalculateDataCheck(false); //Disabling the Approve Tab
        setValidReserveDataCheck(false); //Disabling the Reserve Tab
        setCalculatescreenTabColor(true); // Tab color red for Calculation
      }
    }
  }, [CreateAllocationData?.data?.APPROVEVALIDFUNCTION]);

  useEffect(() => {
    if (CreateAllocationData?.data?.ApproveFunction?.status) {
      setIsLoading(false);
      setOpenDialog(true);
      setDialogData(String(CreateAllocationData?.data?.ApproveFunction?.message));
      if (CreateAllocationData?.data?.ApproveFunction?.status === 201) {
        setValidCalculateDataCheck(false); // Disabling the Approve Tab
        setValidReserveDataCheck(false); // Disabling the Reserve Tab
        setValidCalculateTabCheck(true);  // Disabling the Calculation Tab
        setValidWorkSheetCheck(false); // Disabling the Back to Worksheet Tab
        setValidWorkSheetDataCheck(true);
        setValidWorkSheetApproveCheck(true);  // Disabling the Back to Worksheet Tab while Approve in Alloc summary
        setApproveFreeseCheck(true); // Enabling the Freese of all buttons.
        setWhatIfSummscreenTabColor(true);
        setAllocDtlscreenTabColor(true);
        setSizeDtlscreenTabColor(true);
        setApprovescreenTabColor(true);
        dispatch(getALLOCHEADDETAILSRequest([allocNoData])); //Asy alloccall
        setAllocDetails([]);
      } else {
        if (allocDetailsData.length > 0 && allocDetailsData[0].STATUS_CODE === "RSV") {
          statusData.map((option) => {
            ////console.log("statusCreateDataCheck: 4");
            if (option.CODE === "RSV") { setSearchHeaderData((prev) => { return { ...prev, STATUS: option.CODE, STATUS_CODE: option.STATUS }; }) }
          })
        }
        else {
          statusData.map((option) => {
            ////console.log("statusCreateDataCheck: 5");
            if (option.CODE === "WS") { setSearchHeaderData((prev) => { return { ...prev, STATUS: option.CODE, STATUS_CODE: option.STATUS }; }) }
          })
        }
      }
      CreateAllocationData.data.ApproveFunction.status = 0
    }
  }, [CreateAllocationData?.data?.ApproveFunction]);

  const APPROVE_func = () => {
    swal({
      text: 'Updating Allocation to Approve status. Do you want to continue?',
      icon: 'warning',

      buttons: {

        confirm: {
          text: 'Yes',
          value: true,
          className: CreateASwal.button,
          visible: true,
          closeModal: true,
        }, cancel: {
          text: 'No',
          value: false,
          className: CreateASwal.cancelButton,
          visible: true,
          closeModal: true,
        },
      },
      closeOnClickOutside: false,
      customClass: {
        icon: CreateASwal.customIcon,
      },
    }).then((ok) => {
      // Handle the user's choice
      if (ok) {
        setIsLoading(true);
        dispatch(postAPPROVEFUNCTIONRequest([allocNoData]));
      } else {
        if (allocDetailsData.length > 0 && allocDetailsData[0].STATUS_CODE === "RSV") {
          statusData.map((option) => {
            ////console.log("statusCreateDataCheck: 6");
            if (option.CODE === "RSV") { setSearchHeaderData((prev) => { return { ...prev, STATUS: option.CODE, STATUS_CODE: option.STATUS }; }) }
          })
        }
        else {
          statusData.map((option) => {
            ////console.log("statusCreateDataCheck: 7");
            if (option.CODE === "WS") { setSearchHeaderData((prev) => { return { ...prev, STATUS: option.CODE, STATUS_CODE: option.STATUS }; }) }
          })
        }
      }
    });

  }

  /*
                  #########################################
                  ############ RESERVE POP-UP  ############
                  #########################################
  */

  useEffect(() => {
    if (CreateAllocationData?.data?.ReserveFunction?.status) {
      setIsLoading(false);
      setOpenDialog(true);
      setDialogData(String(CreateAllocationData?.data?.ReserveFunction?.message));
      if (CreateAllocationData?.data?.ReserveFunction?.status === 201) {
        // setApproveCheck(false)
        setValidReserveDataCheck(false); // Disabling the Reserve Tab
        setValidCalculateTabCheck(true);  // Disabling the Calculation Tab
        setValidWorkSheetCheck(false); // Disabling the Back to Worksheet Tab
        setValidWorkSheetDataCheck(true);
        setValidWorkSheetApproveCheck(true);  // Disabling the Back to Worksheet Tab while Approve in Alloc summary
        setApproveFreeseCheck(true); // Enabling the Freese of all buttons.
        setWhatIfSummscreenTabColor(true);
        setAllocDtlscreenTabColor(true);
        setSizeDtlscreenTabColor(true);
        setReservescreenTabColor(true);
        dispatch(getALLOCHEADDETAILSRequest([allocNoData])); //Asy alloccall
        setAllocDetails([]);
      } else {
        statusData.map((option) => {
          ////console.log("statusCreateDataCheck: 8");
          if (option.CODE === "WS") { setSearchHeaderData((prev) => { return { ...prev, STATUS: option.CODE, STATUS_CODE: option.STATUS }; }) }
        })
      }
      CreateAllocationData.data.ReserveFunction.status = 0
    }
  }, [CreateAllocationData?.data?.ReserveFunction]);

  const REVERSE_func = () => {
    swal({
      text: 'Updating Allocation to Reserve status. Do you want to continue?',
      icon: 'warning',

      buttons: {

        confirm: {
          text: 'Yes',
          value: true,
          className: CreateASwal.button,
          visible: true,
          closeModal: true,
        }, cancel: {
          text: 'No',
          value: false,
          className: CreateASwal.cancelButton,
          visible: true,
          closeModal: true,
        },
      },
      closeOnClickOutside: false,
      customClass: {
        icon: CreateASwal.customIcon,
      },
    }).then((ok) => {
      // Handle the user's choice
      if (ok) {
        setIsLoading(true);
        dispatch(postRESERVEFUNCTIONRequest([allocNoData]));
      } else {
        statusData.map((option) => {
          ////console.log("statusCreateDataCheck: 9");
          if (option.CODE === "WS") { setSearchHeaderData((prev) => { return { ...prev, STATUS: option.CODE, STATUS_CODE: option.STATUS }; }) }
        })
      }
    });
  }

  /*
                  #########################################
                  ############ WORKSHEET POP-UP  ############
                  #########################################
  */

  useEffect(() => {
    if (CreateAllocationData?.data?.WorksheetFunction) {
      setIsLoading(false);
      setOpenDialog(true);
      setDialogData(String(CreateAllocationData?.data?.WorksheetFunction?.message));
      if (CreateAllocationData?.data?.WorksheetFunction?.status === 201) {
        dispatch(postAPPROVEVALIDFUNCTIONRequest([allocNoData]))
        setValidCalculateDataCheck(false); // Disabling the Approve Tab
        setValidReserveDataCheck(false); // Disabling the Reserve Tab
        setValidCalculateTabCheck(true);  // Enabling the Calculation Tab
        setCalculatescreenTabColor(true); // Tab color red for Calculation 
        setValidWorkSheetCheck(false); // Disabling the Back to Worksheet Tab
        setValidWorkSheetApproveCheck(true);  // Enabling the Back to Worksheet Tab while Approve in Alloc summary
        // setWorksheetCheck(true);  //??????
        setWhatIfSummscreenTabColor(false);
        setAllocDtlscreenTabColor(false);
        setSizeDtlscreenTabColor(false);
        setWorksheetscreenTabColor(true);
        setValidWorkSheetDataCheck(true);
        setApproveFreeseCheck(false); // Disabling the Freese of all buttons.
        dispatch(getALLOCHEADDETAILSRequest([allocNoData])); //Asy alloccall
        setAllocDetails([]);
      }
      CreateAllocationData.data.WorksheetFunction.status = 0
    }
  }, [CreateAllocationData?.data?.WorksheetFunction]);

  const Worksheet_func = () => {
    swal({
      text: 'Updating Allocation to worksheet status. Do you want to continue?',
      icon: 'warning',

      buttons: {

        confirm: {
          text: 'Yes',
          value: true,
          className: CreateASwal.button,
          visible: true,
          closeModal: true,
        }, cancel: {
          text: 'No',
          value: false,
          className: CreateASwal.cancelButton,
          visible: true,
          closeModal: true,
        },
      },
      closeOnClickOutside: false,
      customClass: {
        icon: CreateASwal.customIcon,
      },
    }).then((ok) => {
      // Handle the user's choice
      if (ok) {
        setCallWksht(false);
        setIsLoading(true);
        dispatch(postWORKSHEETFUNCTIONRequest([allocNoData]));
      }
    });

  }

  if (HeaderCheck && tab === "1") {
    setAllocDetails([])
    setHeaderCheck(false)
  }
  /*
                  #########################################
                  ############ TAB SCROLLING  #############
                  #########################################
    */


  const MyTabScrollButton = withStyles(theme => ({
    root: {
      width: 50,
      overflow: 'hidden',
      transition: 'width 0.5s',
      '&.Mui-disabled': {
        width: 0,
      },
    },
  }))(TabScrollButton);


  /*
                    ########################################################
                    #########   SCHEDULE & ERROR REPORT POP-UP   ###########
                    ########################################################
  */

  useEffect(() => {
    if (CreateAllocationData?.data?.errRptData?.status === 500) {
      setIsLoading(false);
      setOpenDialog(true);
      setDialogData(String(CreateAllocationData?.data?.errRptData?.message));
      CreateAllocationData.data.errRptData.status = 0
    }

  }, [CreateAllocationData?.data?.errRptData]);

  const OpenSchedule = () => {
    dispatch(postSchdlrtvRequest([allocNoData]));
    setIsLoading(true);
    //setOpen_Schdl(true);
  };
  const OpenErrorReport = () => {
    setIsLoading(true);
    if (callMode === "VIEW" && allocDetails.length > 0) {
      dispatch(postErrReportRequest([{ "ALLOC_NO": callData[0].ALLOC_NO }]));//asy
    } else {
      dispatch(postErrReportRequest([allocNoData]));
    }
  };
  // const handleMouseMove = (event) => {
  //   setMousePosition({ x: event.clientX, y: event.clientY });
  // };

  /*
                   #########################################################
                   #########   ALLOC DETAILS SCREEN VALIDATION   ###########
                   #########################################################
  */
  useEffect(() => {
    if ((CreateAllocationData?.data?.allocdtlval?.status) === 500 || (CreateAllocationData?.data?.allocdtlval?.status) === 501) {
      if (CreateAllocationData?.data?.allocdtlval?.status === 501) {
        setOpenDialog(true);
        setDialogData(String(CreateAllocationData?.data?.allocdtlval?.message));
        setIsLoading(false);
      } else {
        setOpenDialog(true);
        setDialogData("ERROR : FAILED TO RETRIEVE DATA");
        setIsLoading(false);
      }
      setValAD(false);
      setTab('1');
    } else if ((CreateAllocationData?.data?.allocdtlval?.status) === 200) {
      setValAD(true);
      setDisCond(5);
    }
    if ((ADPackCreateData?.data?.aDPkData?.status) === 500 || (ADPackCreateData?.data?.aDPkData?.status) === 501) {
      if (ADPackCreateData?.data?.aDPkData?.status === 501) {
        setOpenDialog(true);
        setDialogData(String(ADPackCreateData?.data?.aDPkData?.message));
        setIsLoading(false);
      } else {
        setOpenDialog(true);
        setDialogData("ERROR : FAILED TO RETRIEVE DATA");
        setIsLoading(false);
      }
      setValAD(false);
      setTab('1');
    } else if ((ADPackCreateData?.data?.aDPkData?.status) === 200) {
      setValAD(true);
      setDisCond(9);
    }
  }, [CreateAllocationData?.data, ADPackCreateData?.data]);

  const Validate_AllocDetails = () => {
    if (totalData.length === 0 || allPageSelected.length === 0) {
      setOpenDialog(true);
      setDialogData("Add item(s) to continue");
      return;
    }
    const pack_check = selData.filter(obj => obj.PACK_IND === "Y")
    if (pack_check.length > 0) {
      dispatch(postRTVADPACKRequest([allocNoData]));
      setIsLoading(true);
    } else {
      dispatch(postALLOCDTLTABRequest([allocNoData]));
      setIsLoading(true);
    }
  };
  const handleRowClick = (rowId) => {
    setSelectedRow(rowId);
  };

  const resetFilter = () => {
    setInputValue([]);
    if (inputValue.length === 0) {
      setTotalData(totalData);
      setSampleVal(totalData);
      setCopyValue(initialCopyValues);
      setInputValue([]);
      setInputValue1({})
    } else {
      setTotalData(totalData);
      setSampleVal(totalData);
      setCopyValue(initialCopyValues);
      setInputValue([]);
      setInputValue1({})
    }
    setLockCheck(false)
  }

  /*
                   #########################################################
                   ##################   COLORING THE TABS   ################
                   #########################################################
  */

  if (ApprovescreenTabColor) {
    tabStyleCalcDisApprove['&.Mui-selected'].color = '#46923C';
    tabStyleCalcDisReserve['&.Mui-selected'].color = '';
    setApprovescreenTabColor(false);
  }

  if (ReservescreenTabColor) {
    tabStyleCalcDisReserve['&.Mui-selected'].color = '#46923C';
    setReservescreenTabColor(false);
  }

  if (WorksheetscreenTabColor) {
    tabStyleCalcDisApprove['&.Mui-selected'].color = '';
    tabStyleCalcDisReserve['&.Mui-selected'].color = '';
    setWorksheetscreenTabColor(false);
  }

  /*
                   #########################################################
                   #########   SORTING AND INLINE FILTERS GRID   ###########
                   #########################################################
  */

  const testChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    setSampleVal((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))

  }

  const InlineChange = (e) => {
    if (e.target.checked) {
      const editData = tabledata.filter((item) => {
        return selectedSplit.some((val) => {
          return item.SR_NO === val;
        });
      });
      setTotalData(editData)
    } else {
      setTotalData(tabledata)
    }
  }

  const InlineChangeSizeProf = (e) => {
    if (Object.is(e, null) === false) {
      setInputValue((prev) => ({ ...prev, "SIZE_PRF_IND": e.id, }))
      setSampleVal((prev) => ({ ...prev, "SIZE_PRF_IND": e.id, }))
    }
    if (Object.is(e, null) === true) {
      setInputValue((prev) => ({ ...prev, "SIZE_PRF_IND": "", }))
      setSampleVal((prev) => ({ ...prev, "SIZE_PRF_IND": "", }))
    }
  }

  const InlineChangeSubsInd = (e) => {
    if (Object.is(e, null) === false) {
      setInputValue((prev) => ({ ...prev, "SUBSTITUTE_IND": e.id, }))
      setSampleVal((prev) => ({ ...prev, "SUBSTITUTE_IND": e.id, }))
    }
    if (Object.is(e, null) === true) {
      setInputValue((prev) => ({ ...prev, "SUBSTITUTE_IND": "", }))
      setSampleVal((prev) => ({ ...prev, "SUBSTITUTE_IND": "", }))
    }
  }

  const InlineChangeInvInd = (e) => {
    if (Object.is(e, null) === false) {
      setInputValue((prev) => ({ ...prev, "INVENT_IND": e.id, }))
      setSampleVal((prev) => ({ ...prev, "INVENT_IND": e.id, }))
    }
    if (Object.is(e, null) === true) {
      setInputValue((prev) => ({ ...prev, "INVENT_IND": "", }))
      setSampleVal((prev) => ({ ...prev, "INVENT_IND": "", }))
    }
  }

  const InlineChangePackInd = (e) => {
    if (Object.is(e, null) === false) {
      setInputValue((prev) => ({ ...prev, "PACK_IND": e.id, }))
      setSampleVal((prev) => ({ ...prev, "PACK_IND": e.id, }))
    }
    if (Object.is(e, null) === true) {
      setInputValue((prev) => ({ ...prev, "PACK_IND": "", }))
      setSampleVal((prev) => ({ ...prev, "PACK_IND": "", }))
    }
  }

  const handleChangeWeight = (e, name) => {
    if (e) {
      if (e.target.name === "AVAIL_QTY") {
        setCopyValue((prev) => ({
          ...prev,
          [e.target.name]: e.target.value
        }))
      }
      if (e.target.name === "HOLDBACK_QTY") {
        setCopyValue((prev) => ({
          ...prev,
          [e.target.name]: e.target.value
        }))
      }
    }
  }

  const handleChangeWeight1 = (e, name) => {
    if (e) {
      if (e.target.name === "AVAIL_QTY") {
        setInputValue1((prev) => ({
          ...prev,
          [e.target.name]: e.target.value
        }))
      }
      if (e.target.name === "HOLDBACK_QTY") {
        setInputValue1((prev) => ({
          ...prev,
          [e.target.name]: e.target.value
        }))
      }
    }
  }

  useEffect(() => {
    if (inputValue) {
      for (const key in inputValue) {
        if (inputValue[key] === '') {
          delete inputValue[key];
        }
      }
    }
    if (inputValue) {
      for (let i = 0; i < Object.keys(inputValue).length; i++) {
        var temp_dict = {}
        if (inputValue[Object.keys(inputValue)[i]].includes("&") || inputValue[Object.keys(inputValue)[i]].includes("%")) {
          inputValue[Object.keys(inputValue)[i]].slice(1)
          temp_dict[Object.keys(inputValue)[i]] = inputValue[Object.keys(inputValue)[i]].slice(1)
          if (temp_dict) {
            for (const key in temp_dict) {
              if (temp_dict[key] === '') {
                delete temp_dict[key];
              }
            }
          }
          const temp = currentPageRows.filter((props) => String(props[Object.keys(inputValue)[i]]).toLowerCase() === String(temp_dict[Object.keys(inputValue)[i]]).toLowerCase())
          setcurrentPageData(temp);
        }
        else {
          const filteredTable = currentPageRows.filter((props) =>
            Object.entries(inputValue).every(
              ([key, val]) =>
                !val.length ||
                props[key]
                  ?.toString()
                  .toLowerCase()
                  .includes(val?.toString().toLowerCase())
            )
          );
          setcurrentPageData(filteredTable);
        }
      }
    }
    if (Object.keys(inputValue).length === 0) {
      setcurrentPageData(currentPageRows)
    }

  }, [inputValue]);

  useEffect(() => {
    if (inputValue1) {
      for (const key in inputValue1) {
        if (inputValue1[key] === '') {
          delete inputValue1[key];
        }
      }
    }
    if (inputValue1) {
      for (let i = 0; i < Object.keys(inputValue1).length; i++) {
        var temp_dict = {}
        if (inputValue1[Object.keys(inputValue1)[i]].includes("&") || inputValue1[Object.keys(inputValue1)[i]].includes("%")) {
          inputValue1[Object.keys(inputValue1)[i]].slice(1)
          temp_dict[Object.keys(inputValue1)[i]] = inputValue1[Object.keys(inputValue1)[i]].slice(1)
          if (temp_dict) {
            for (const key in temp_dict) {
              if (temp_dict[key] === '') {
                delete temp_dict[key];
              }
            }
          }
          const temp = currentPageRows.filter((props) => String(props[Object.keys(inputValue1)[i]]).toLowerCase() === String(temp_dict[Object.keys(inputValue1)[i]]).toLowerCase())
          setcurrentPageData(temp);
        }
        else {
          const filteredTable = currentPageRows.filter((props) =>
            Object.entries(inputValue1).every(
              ([key, val]) =>
                !val.length ||
                props[key]
                  ?.toString()
                  .toLowerCase()
                  .includes(val?.toString().toLowerCase())
            )
          );
          setcurrentPageData(filteredTable);
        }
      }
    }
    if (Object.keys(inputValue1).length === 0) {
      setcurrentPageData(currentPageRows)
    }
  }, [inputValue1]);

  const SearchButtonAvail = () => (
    [
      <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} disabled={ApproveFreeseCheck}>
        {LockCheck ?
          <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }}
            onClick={handleCopyDown} disabled={ApproveFreeseCheck}
          />
          : <LockIcon fontSize="small" sx={{ height: '0.6em', width: '0.6em' }} onClick={handleLockFilter}
            disabled={ApproveFreeseCheck}
          />}
      </IconButton>
      ,
      <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} disabled={ApproveFreeseCheck}>
        <BsFillEraserFill fontSize="small"
          onClick={eraseValAvail} disabled={ApproveFreeseCheck}
        />
      </IconButton>
    ]
  )

  const SearchButtonHoldBack = () => (
    [
      <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} disabled={ApproveFreeseCheck || searchHeaderData.ALLOC_CRITERIA === "Pre Buy"}>
        {LockCheck ?
          <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }}
            onClick={handleCopyDown} disabled={ApproveFreeseCheck || searchHeaderData.ALLOC_CRITERIA === "Pre Buy"}
          />
          : <LockIcon fontSize="small" sx={{ height: '0.6em', width: '0.6em' }} onClick={handleLockFilter}
            disabled={ApproveFreeseCheck || searchHeaderData.ALLOC_CRITERIA === "Pre Buy"}
          />}
      </IconButton>
      ,
      <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} disabled={ApproveFreeseCheck || searchHeaderData.ALLOC_CRITERIA === "Pre Buy"}>
        <BsFillEraserFill fontSize="small"
          onClick={eraseValHoldback} disabled={ApproveFreeseCheck || searchHeaderData.ALLOC_CRITERIA === "Pre Buy"}
        />
      </IconButton>
    ]
  )

  const SearchButtonHoldback_Type = () => (
    [
      <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} disabled={ApproveFreeseCheck || searchHeaderData.ALLOC_CRITERIA === "Pre Buy"}>
        {LockCheck ?
          <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }}
            onClick={handleCopyDown} disabled={ApproveFreeseCheck || searchHeaderData.ALLOC_CRITERIA === "Pre Buy"}
          />
          : <LockIcon fontSize="small" sx={{ height: '0.6em', width: '0.6em' }} onClick={handleLockFilter}
            disabled={ApproveFreeseCheck || searchHeaderData.ALLOC_CRITERIA === "Pre Buy"}
          />}
      </IconButton>
      ,
      <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} disabled={ApproveFreeseCheck || searchHeaderData.ALLOC_CRITERIA === "Pre Buy"}>
        <BsFillEraserFill fontSize="small"
          onClick={eraseValHoldback_Type}
          disabled={ApproveFreeseCheck || searchHeaderData.ALLOC_CRITERIA === "Pre Buy"}
        />
      </IconButton>
    ]
  )

  const SearchButtonSOM_Type = () => (
    // [
    <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} disabled={ApproveFreeseCheck}>
      {LockCheck ?
        <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }}
          onClick={handleCopyDown} disabled={ApproveFreeseCheck}
        />
        : <LockIcon fontSize="small" sx={{ height: '0.6em', width: '0.6em' }} onClick={handleLockFilter}
          disabled={ApproveFreeseCheck}
        />}
    </IconButton>
    // ,
    // <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} disabled={ApproveFreeseCheck}>
    //   <BsFillEraserFill fontSize="small"
    //     onClick={eraseValSOM_Type}
    //     disabled={ApproveFreeseCheck}
    //   />
    // </IconButton>
    // ]
  )

  const handleLockFilter = (e) => {
    setLockCheck(true);
  }

  const handleCopyDown = (e) => {
    for (const key in copyValue) {
      if (copyValue[key] === '') {
        delete copyValue[key];
      }
    }
    if (Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) {
      if (selected[0][page].length > 0) {
        const editData = tabledata.filter((item) => {
          return selected[0][page].some((val) => {
            return item.SR_NO === val;
          });
        });

        const copyUpdate = editData.map(item => {
          Object.assign(item, copyValue);
          return item;
        })
        const updatedTableData = tabledata.map(obj1 => {
          const copyObj = copyUpdate.find(obj => obj["SR_NO"] === obj1["SR_NO"]);
          return copyObj ? { ...obj1, ...copyObj } : obj1;
        });

        setTotalData(updatedTableData)
        setTabledata(updatedTableData)
        const temp = updatedTableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
        setcurrentPageData(temp);
        setcurrentPageRows(temp);
        const combinedList = Object.values(selected[0]).flat()
        const temp1 = totalData.filter(item => combinedList.includes(item.SR_NO))
        setSelData(temp1);
      }
    }
    // setTotalData(totalData);
    setLockCheck(false);
    setCopyValue(initialCopyValues)
    setSampleVal([]);
    setInputValue({});
    setInputValue1({});

  }

  const eraseValAvail = (e) => {
    for (const key in copyValue) {
      if (copyValue[key] === '') {
        delete copyValue[key];
      }
    }
    if (Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) {
      if (selected[0][page].length > 0) {
        const editData = tabledata.filter((item) => {
          return selected[0][page].some((val) => {
            return item.SR_NO === val;
          });
        });


        editData.map((row) => {
          if (Object.keys(row).includes("AVAIL_QTY")) {
            row["AVAIL_QTY"] = ""
          }
        }
        )
        const updatedTableData = tabledata.map(obj1 => {
          const copyObj = editData.find(obj => obj["SR_NO"] === obj1["SR_NO"]);
          return copyObj ? { ...obj1, ...copyObj } : obj1;
        });

        setTotalData(updatedTableData)
        setTabledata(updatedTableData)
        const temp = updatedTableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
        setcurrentPageData(temp);
        setcurrentPageRows(temp);
        const combinedList = Object.values(selected[0]).flat()
        const temp1 = totalData.filter(item => combinedList.includes(item.SR_NO))
        setSelData(temp1);
      }
    }
    setSampleVal([]);
  }

  const eraseValHoldback = (e) => {
    for (const key in copyValue) {
      if (copyValue[key] === '') {
        delete copyValue[key];
      }
    }

    if (Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) {
      if (selected[0][page].length > 0) {
        const editData = tabledata.filter((item) => {
          return selected[0][page].some((val) => {
            return item.SR_NO === val;
          });
        });


        editData.map((row) => {
          if (Object.keys(row).includes("HOLDBACK_QTY")) {
            row["HOLDBACK_QTY"] = ""
            row["HOLDBACK_TYPE"] = ""
          }
        }
        )
        const updatedTableData = tabledata.map(obj1 => {
          const copyObj = editData.find(obj => obj["SR_NO"] === obj1["SR_NO"]);
          return copyObj ? { ...obj1, ...copyObj } : obj1;
        });

        setTotalData(updatedTableData)
        setTabledata(updatedTableData)
        const temp = updatedTableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
        setcurrentPageData(temp);
        setcurrentPageRows(temp);
        const combinedList = Object.values(selected[0]).flat()
        const temp1 = totalData.filter(item => combinedList.includes(item.SR_NO))
        setSelData(temp1);
      }
    }
    setSampleVal([]);
  }

  const eraseValHoldback_Type = (e) => {
    for (const key in copyValue) {
      if (copyValue[key] === '') {
        delete copyValue[key];
      }
    }

    if (Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) {
      if (selected[0][page].length > 0) {
        const editData = tabledata.filter((item) => {
          return selected[0][page].some((val) => {
            return item.SR_NO === val;
          });
        });

        editData.map((row) => {
          if (Object.keys(row).includes("HOLDBACK_TYPE")) {
            row["HOLDBACK_TYPE"] = ""
            row["HOLDBACK_QTY"] = ""
          }
        }
        )
        const updatedTableData = tabledata.map(obj1 => {
          const copyObj = editData.find(obj => obj["SR_NO"] === obj1["SR_NO"]);
          return copyObj ? { ...obj1, ...copyObj } : obj1;
        });

        setTotalData(updatedTableData)
        setTabledata(updatedTableData)
        const temp = updatedTableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
        setcurrentPageData(temp);
        setcurrentPageRows(temp);
        const combinedList = Object.values(selected[0]).flat()
        const temp1 = totalData.filter(item => combinedList.includes(item.SR_NO))
        setSelData(temp1);
      }
    }
    setSampleVal([]);
  }

  const handleChangeValue = (e, name) => {
    if (Object.is(e, null) === false) {
      if (name.name === "SOM_TYPE") {
        setCopyValue((prev) => ({
          ...prev,
          [name.name]: e.CODE,
        }))
      }
      if (name.name === "HOLDBACK_TYPE") {
        setCopyValue((prev) => ({
          ...prev,
          [name.name]: e.CODE,
        }))
      }
    }

    if (Object.is(e, null) === true) {
      if (name.name === "SOM_TYPE") {
        setCopyValue((prev) => ({
          ...prev,
          [name.name]: "",
        }))
      }
      if (name.name === "HOLDBACK_TYPE") {
        setCopyValue((prev) => ({
          ...prev,
          [name.name]: "",
        }))
      }
    }
    // setSampleVal([])
  }

  const testChange1 = (e, name) => {
    if (Object.is(e, null) === false) {
      if (name === "SOM_TYPE") {
        setInputValue1((prev) => ({
          ...prev,
          [name]: e.CODE,
        }))
        setSampleVal((prev) => ({
          ...prev,
          [name]: e.CODE,
        }))
      }
      if (name === "HOLDBACK_TYPE") {
        setInputValue1((prev) => ({
          ...prev,
          [name]: e.CODE,
        }))
        setSampleVal((prev) => ({
          ...prev,
          [name]: e.CODE,
        }))
      }
    }

    if (Object.is(e, null) === true) {
      if (name === "SOM_TYPE") {
        setInputValue1((prev) => ({
          ...prev,
          [name]: "",
        }))
        setSampleVal((prev) => ({
          ...prev,
          [name]: "",
        }))
      }
      if (name === "HOLDBACK_TYPE") {
        setInputValue1((prev) => ({
          ...prev,
          [name]: "",
        }))
        setSampleVal((prev) => ({
          ...prev,
          [name]: "",
        }))
      }
    }
    setSampleVal1([])

  }
  const MemoizedDialog = React.memo(Dialog, (prevProps, nextProps) => {
    // Only re-render if the open prop has changed
    return prevProps.open === nextProps.open;
  });
  if (open_Schdl) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'visible';
  }

  /*
        #################################################
        ############ ERROR POP-UP MESSAGE ###############
        #################################################
  */

  const handleCloseDialog = (e) => {
    setOpenDialog(false);
    setDialogData("")
  }

  /*
        #################################################
        ############ MULTI PO CREATE POP-UP  ############
        #################################################
  */
  const handleCloseMultiPO = () => {
    setOpenMultiPO(false);
    setMultiPOData([]);
    setTableMultiPOData([]);
    setIsLoading(false);
  };

  const HandleClickMultiPO = () => {
    setSelectedMultiPO([])
    dispatch(postMULTIPOCREATERequest([{}]));
    setMultiPOData([]);
    setTableMultiPOData([]);
    setIsLoading(true);
  }

  const handleSelectClickMultiPO = (event, name) => {
    const selectedIndex = selectedMultiPO.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedMultiPO, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedMultiPO.slice(1));
    } else if (selectedIndex === selectedMultiPO.length - 1) {
      newSelected = newSelected.concat(selectedMultiPO.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedMultiPO.slice(0, selectedIndex),
        selectedMultiPO.slice(selectedIndex + 1),
      );
    }
    setSelectedMultiPO(newSelected);
  };

  const handleOkMultiPO = (e) => {
    const temp = MultiPOData.filter(obj => selectedMultiPO.includes(obj.SR_NO))
    const temp1 = MultiPOData.filter(obj => !selectedMultiPO.includes(obj.SR_NO))
    var Po_list = []
    temp.map(row => Po_list.push(row.ORDER_NO))
    var Po_list_uncheck = []
    temp1.map(row => Po_list_uncheck.push(row.ORDER_NO))
    const filteredList = Po_list_uncheck.filter(item => !Po_list.includes(item))
    const uniqueListCheck = Array.from(new Set(Po_list))
    const uniqueListUncheck = Array.from(new Set(Po_list_uncheck))
    const po_search_list = searchDataCCommon.PO
    const filteredList1 = po_search_list.filter(item => !uniqueListUncheck.includes(item))
    var combinedList = Array.from(new Set(filteredList1.concat(uniqueListCheck)))
    const temp2 = UniqPO.filter(obj => combinedList.includes(obj.PO))
    setValPOCPO(temp2)
    let updatedData = []
    let selectedDataOptions = []
    temp2.map((res) => {
      selectedDataOptions.push(res.PO)
    })
    updatedData = UniqPO.filter((res) => !selectedDataOptions.includes(res.PO))
    const temp3 = stableSort(temp2, getComparator("asc", "PO"))
    const temp4 = stableSort(updatedData, getComparator("asc", "PO"))
    updatedData = [...temp3, ...temp4];
    setPoData(updatedData)
    setSearchDataCCommon((prev) => {
      return {
        ...prev,
        PO: combinedList,
      };
    });
    setOpenMultiPO(false);
    setMultiPOData([]);
    setTableMultiPOData([]);
    setSelectedMultiPO([]);
    setIsLoading(false);
  }

  const testMultiPOChange = (e) => {
    setInputMultiPO((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    setSampleVal((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const resetMultiPOFilter = () => {
    setInputMultiPO({});
    if (inputValue.length === 0) {
      setMultiPOData(TableMultiPOData);
      setSampleVal(TableMultiPOData);
      setInputMultiPO({});
    } else {
      setMultiPOData(TableMultiPOData);
      setSampleVal(TableMultiPOData);
      setInputMultiPO({});
    }
    setLockCheck(false);
  }

  useEffect(() => {
    if (inputMultiPO) {
      for (const key in inputMultiPO) {
        if (inputMultiPO[key] === '') {
          delete inputMultiPO[key];
        }
      }
    }
    if (inputMultiPO) {
      for (let i = 0; i < Object.keys(inputMultiPO).length; i++) {
        var temp_dict = {}
        if (inputMultiPO[Object.keys(inputMultiPO)[i]].includes("&") || inputMultiPO[Object.keys(inputMultiPO)[i]].includes("%")) {
          inputMultiPO[Object.keys(inputMultiPO)[i]].slice(1)
          temp_dict[Object.keys(inputMultiPO)[i]] = inputMultiPO[Object.keys(inputMultiPO)[i]].slice(1)
          if (temp_dict) {
            for (const key in temp_dict) {
              if (temp_dict[key] === '') {
                delete temp_dict[key];
              }
            }
          }
          const temp = TableMultiPOData.filter((props) => String(props[Object.keys(inputMultiPO)[i]]).toLowerCase() === String(temp_dict[Object.keys(inputMultiPO)[i]]).toLowerCase())
          setMultiPOData(temp);
        }
        else {
          const filteredTable = TableMultiPOData.filter((props) =>
            Object.entries(inputMultiPO).every(
              ([key, val]) =>
                !val.length ||
                props[key]
                  ?.toString()
                  .toLowerCase()
                  .includes(val?.toString().toLowerCase())
            )
          );
          setMultiPOData(filteredTable);
        }
      }
    }
    if (Object.keys(inputMultiPO).length === 0) {
      setMultiPOData(TableMultiPOData)
    }

  }, [inputMultiPO]);

  /*
        #################################################
        ############ VALIDATIONS FOR TABS  ##############
        #################################################
  */
  if (isValidQtyLimits) {
    setrtvrldata([]);
    setValidRLCheckData([]);
    dispatch(postVALIDRLCHECKDATARequest([allocNoData]));
    setIsValidQtyLimits(false);
  }

  ///What If summary Ok button///
  if (checkOkWhatIfSummCheck) {
    setValidWorkSheetDataCheck(true);
    dispatch(getALLOCHEADDETAILSRequest([allocNoData]));
    setCheckOkWhatIfSummCheck(false);
    setAllocDetails([]);
  }
  /*
         #################################################
         ###########  TAB DROPDOWN HANDLING  #############
         #################################################
   */

  const tableContainerRef = useRef(null);
  const selectRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [disableBlur, setDisableBlur] = useState(false);

  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    if (!disableBlur) {
      setIsDropdownOpen(false);
    }
    setDisableBlur(false);

  };
  const handleMouseDown = () => {
    setDisableBlur(true);
  };

  /*
         #################################################
         ##########  MANAGE COLUMNS IN TABLE  ############
         #################################################
   */


  const [ManageHeaderCheck, setManageHeaderCheck] = useState(true);
  const [ManageHeaderData, setManageHeaderData] = useState([]);

  if (ManageHeaderCheck) {
    var temp = []
    headCells.map(row => temp.push(row.id));
    const temp1 = ['INACTIVE_QTY', 'REF_2', 'SUBSTITUTE_IND', 'INNER_SIZE', 'CASE_SIZE', 'SEASON']
    const temp2 = temp.filter(value => !temp1.includes(value));
    setManageHeaderData(temp2);
    setManageHeaderCheck(false);
  }

  const HandleManageHeader = () => {
    setOpenDialogManage(true);
  }
  const handleCloseDialogManage = (e) => {
    setOpenDialogManage(false);
  }

  const handleManageHeaderClick = (e, name) => {
    ////console.log("headCells:2:", e, name);
    if (e.target.checked === true) {
      const updatedManageHeaderData = [...ManageHeaderData, name];
      ////console.log("headCells:3:", updatedManageHeaderData);
      setManageHeaderData(updatedManageHeaderData)
    } else {
      const updatedManageHeaderData = ManageHeaderData.filter(item => item !== name);
      ////console.log("headCells:4:", updatedManageHeaderData);
      setManageHeaderData(updatedManageHeaderData)
    }
  }

  const handleShowAllManageHeader = () => {
    var temp = []
    headCells.map(row => temp.push(row.id));
    setManageHeaderData(temp);
  }

  const headerManage = () => (
    <Box display="inline-block"
      sx={{ backgroundColor: "", height: "auto", padding: "0rem 0rem", width: "100%", }}>
      <div>
        {headCells.map((key) => (
          <div key={key.id}>
            <FormControlLabel
              size="small"
              sx={{ padding: "0px", margin: "0px 0px 0px 0px", }}
              control={
                <Checkbox
                  sx={{ margin: "0px 0px 0px 0px", padding: "2px", paddingTop: "0px" }}
                  color="primary"
                  size="small"
                  onClick={(event) => [handleManageHeaderClick(event, key?.id)]}
                  checked={ManageHeaderData.includes(key.id)}
                  style={{ padding: "0px", textAlign: "center", }}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label={<InputLabel
                sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 0px 0px", padding: "0px 0px 0px 0px", display: 'inline', float: 'left', }}>
                {key.label}</InputLabel>}
            /></div>
        ))}
      </div>
    </Box>
  )

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };


  const handleExpandClick = () => {
    setExpanded(!isExpanded);
  };

  const handleExpandClickHier = () => {
    setExpanded1(!isExpanded1);
  };

  const handleExpandClickItemAttr = () => {
    setExpanded2(!isExpanded2);
  };

  const handleExpandClickItemSelect = () => {
    setExpanded3(!isExpanded3);
  };

  const handleExpandClickAddAttr = () => {
    setExpanded4(!isExpanded4);
  };

  // const [showButtons, setShowButtons] = useState(false);

  // const handleMouseEnterB = () => {
  //   setShowButtons(true);
  // };

  // const handleMouseLeaveB = () => {
  //   setShowButtons(false);
  // };


  const searchPanel = () => (
    <Box
      sx={{ width: 430, marginTop: "80px", padding: "0px 0px 0px 15px", }}
    // role="presentation"
    // component="form"
    >
      <div>
        {/* <legend style={{ fontWeight: "bold", color: "#191970", fontSize: "16px", padding: "0px 0px 5px 0px" }}>{searchHeaderData.ALLOC_CRITERIA + ": "}</legend> */}

        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ position: 'relative', padding: "0px 0px 10px 0px" }}
        >
          <Typography
            style={{
              bgcolor: '',
              fontSize: "14px",
              fontWeight: "bold",
              position: "static",
              padding: "0px"
            }}
          >
            CRITERIA: {searchHeaderData.ALLOC_CRITERIA}
          </Typography>
          <div className={`${CreateAllocationClasses.menuContent} ${isHovered ? CreateAllocationClasses.menuContentVisible : ''}`}>
            {options.map((option, index) => (<Typography>
              <MenuItem
                dense="true"
                sx={{
                  // backgroundColor: "lightgray",
                  display: "inline-block",
                  padding: "0px 0px 1px 0px",
                  whiteSpace: "nowrap"
                }}
                value={option.value}
                key={option.value}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
                disabled={totalData.length > 0 || ApproveFreeseCheck || searchHeaderData.ALLOC_TYPE === "S" ||
                  (searchHeaderData["CONTEXT"] === "PROM" ? (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      && searchHeaderData["PROMOTION"].toString().length > 0
                      ? false : true)
                    :
                    (
                      searchHeaderData["ALLOC_DESC"].length > 0
                        && searchHeaderData["ALLOC_LEVEL"].length > 0
                        && searchHeaderData["CONTEXT"].length > 0
                        && searchHeaderData["ALLOC_TYPE"].length > 0
                        && searchHeaderData["RELEASE_DATE"].length > 0
                        ? false : true))}
              >
                <RadioGroup
                  size="small"
                  value={option.value}
                  // aria-labelledby="demo-row-radio-buttons-group-label"
                  defaultValue={option.value}
                // name="row-radio-buttons-group"
                // sx={{
                //   backgroundColor: "#f0f0f0",
                //   padding: "0px",
                //   border: "1px solid blue",
                //   // whiteSpace: "nowrap"
                // }}
                >
                  <FormControlLabel
                    value={searchHeaderData.ALLOC_CRITERIA}
                    onClick={handleMouseLeave}
                    sx={{
                      // border: "1px solid black",
                      padding: "0px",
                      paddingLeft: "5px",
                      whiteSpace: "nowrap"
                    }}
                    control={
                      <Radio size="small"
                        sx={{
                          // border:"1px solid orange",
                          padding: "5px 2px 0px 10px"
                        }}
                        onClick={handleMouseLeave}
                        className={CreateAllocationClasses.formRadio} />
                    }
                    label={<Typography
                      sx={{
                        fontSize: "12px",
                        //  padding: "0px",
                        marginTop: "5px",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        // border: "1px solid green",
                      }}
                    >
                      {option.value}
                    </Typography>} />
                </RadioGroup>
              </MenuItem>
            </Typography>))}
          </div>
        </div>

        <Box
          sx={{
            padding: "0px 0px 0px 0px", margin: "0px 0px 0px 5px"
          }}
        >
          <div className={CreateAllocationClasses.drawerDiv}>

            <Typography
              variant="body1"
              style={{
                cursor: 'pointer', fontSize: "14px", fontWeight: "bold", position: "static", padding: "0px",
                backgroundColor: !isExpanded1 ? "#f5f5f5" : 'transparent', // Apply background color when expanded 
                color: isExpanded1 ? '#191970' : 'inherit',
                borderRadius: isExpanded1 ? '5px' : '0', // Add border radius when expanded
              }}
              onClick={handleExpandClickHier}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                {isExpanded1 ? (
                  <>
                    <span> HIERARCHY</span>
                    <ExpandLessRoundedIcon style={{ marginLeft: '5px', }} />
                  </>
                ) : (
                  <>
                    <span> HIERARCHY</span>
                    <ExpandMoreRoundedIcon style={{ marginLeft: '5px', }} />
                  </>
                )}
              </div>
            </Typography>
            {isExpanded1 && (
              <div >
                {TestCriteriaHIERARCHY()}
              </div>
            )}
          </div>

          <div className={CreateAllocationClasses.drawerDiv}>
            <Typography
              variant="body1"
              style={{
                cursor: 'pointer', fontSize: "14px", fontWeight: "bold", position: "static", padding: "0px",
                backgroundColor: !isExpanded3 ? "#f5f5f5" : 'transparent', // Apply background color when expanded 
                color: isExpanded3 ? '#191970' : 'inherit',
                borderRadius: isExpanded3 ? '5px' : '0', // Add border radius when expanded
              }}
              onClick={handleExpandClickItemSelect}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                {isExpanded3 ? (
                  <>
                    <span> ITEM SELECTION</span>
                    <ExpandLessRoundedIcon style={{ marginLeft: '5px', }} />
                  </>
                ) : (
                  <>
                    <span> ITEM SELECTION</span>
                    <ExpandMoreRoundedIcon style={{ marginLeft: '5px', }} />
                  </>
                )}
              </div>
            </Typography>
            {isExpanded3 && (
              <div >
                {TestCriteriaITEMSELECTION()}
              </div>
            )}
          </div>

          <div className={CreateAllocationClasses.drawerDiv}>
            <Typography
              variant="body1"
              style={{
                cursor: 'pointer', fontSize: "14px", fontWeight: "bold", position: "static", padding: "0px",
                backgroundColor: !isExpanded2 ? "#f5f5f5" : 'transparent', // Apply background color when expanded 
                color: isExpanded2 ? '#191970' : 'inherit',
                borderRadius: isExpanded2 ? '5px' : '0', // Add border radius when expanded
              }}
              onClick={handleExpandClickItemAttr}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                {isExpanded2 ? (
                  <>
                    <span> ITEM ATTRIBUTES</span>
                    <ExpandLessRoundedIcon style={{ marginLeft: '5px', }} />
                  </>
                ) : (
                  <>
                    <span> ITEM ATTRIBUTES</span>
                    <ExpandMoreRoundedIcon style={{ marginLeft: '5px', }} />
                  </>
                )}
              </div>
            </Typography>
            {isExpanded2 && (
              <div >
                {TestCriteriaITEMATTRIBUTES()}
              </div>
            )}
          </div>

          <div className={CreateAllocationClasses.drawerDiv}>
            <Typography
              variant="body1"
              style={{
                cursor: 'pointer', fontSize: "14px", fontWeight: "bold", position: "static", padding: "0px",
                backgroundColor: !isExpanded4 ? "#f5f5f5" : 'transparent', // Apply background color when expanded 
                color: isExpanded4 ? '#191970' : 'inherit',
                borderRadius: isExpanded4 ? '5px' : '0', // Add border radius when expanded
              }}
              onClick={handleExpandClickAddAttr}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                {isExpanded4 ? (
                  <>
                    <span> ADDITIONAL ATTRIBUTES</span>
                    <ExpandLessRoundedIcon style={{ marginLeft: '5px', }} />
                  </>
                ) : (
                  <>
                    <span> ADDITIONAL ATTRIBUTES</span>
                    <ExpandMoreRoundedIcon style={{ marginLeft: '5px', }} />
                  </>
                )}
              </div>
            </Typography>
            {isExpanded4 && (
              <div >
                {TestCriteriaADDITIONALATTRIBUTES()}
              </div>
            )}
          </div>

          {/* <div className={CreateAllocationClasses.drawerDiv}>
            <Typography
              variant="body1"
              style={{
                cursor: 'pointer', fontSize: "14px", fontWeight: "bold", position: "static", padding: "0px",
                backgroundColor: !isExpanded ? "#f5f5f5" : 'transparent', // Apply background color when expanded 
                color: isExpanded ? '#191970' : 'inherit',
                borderRadius: isExpanded ? '5px' : '0', // Add border radius when expanded
              }}
              onClick={handleExpandClick}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                {isExpanded ? (
                  <>
                    <span> ACTIONS</span>
                    <ExpandLessRoundedIcon style={{ marginLeft: '5px', }} />
                  </>
                ) : (
                  <>
                    <span> ACTIONS</span>
                    <ExpandMoreRoundedIcon style={{ marginLeft: '5px', }} />
                  </>
                )}
              </div>
            </Typography>
            {isExpanded && (
              <div >
                {TestButtoms()}
              </div>
            )}
          </div> */}
          <div className={CreateAllocationClasses.float_container}>
            <FormControlLabel
              size="small"
              sx={{
                padding: "0px 0px 2px 0px",
                margin: "0px 0px 0px 3px",
                // border:"1px solid red"
              }}
              control={
                <Checkbox
                  size="small"
                  sx={{
                    margin: "5px 0px 0px 0px",
                    padding: "2px",
                    // border:"1px solid red"
                  }}
                  // disabled
                  checked={searchDataCCommon.PACK_IND === "Y"}
                  onChange={SelectPO_Ind}
                  inputProps={{ 'aria-label': 'controlled' }}
                  disabled={((searchHeaderData["CONTEXT"] === "PROM") ? (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      && searchHeaderData["PROMOTION"].toString().length > 0
                      ? false : true)
                    :
                    (
                      searchHeaderData["ALLOC_DESC"].length > 0
                        && searchHeaderData["ALLOC_LEVEL"].length > 0
                        && searchHeaderData["CONTEXT"].length > 0
                        && searchHeaderData["ALLOC_TYPE"].length > 0
                        && searchHeaderData["RELEASE_DATE"].length > 0
                        ? false : true)) || ApproveFreeseCheck || searchHeaderData.ALLOC_LEVEL === "D"}
                />
              }
              label={<InputLabel
                sx={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  margin: "5px 0px 0px 0px",
                  padding: "0px 0px 0px 0px",
                  display: 'inline',
                  float: 'left',
                  // border:"1px solid red"
                }}>
                Pack Ind</InputLabel>} />
          </div>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: 'fit-content' }}
        >
          {/* <Box
            onMouseEnter={handleMouseEnterB}
            onMouseLeave={handleMouseLeaveB}
            position="relative"
            sx={{ width: "fit-content" }}
          > */}
          <Button
            sx={{
              backgroundColor: "", fontSize: "12px",
              padding: "5px", fontFamily: "system-ui",
              width: "100px",
              marginLeft: "5px", paddingLeft: "0px", marginTop: "2px",
              '&.Mui-disabled': {
                opacity: 0.5,
                backgroundColor: 'DodgerBlue',
                color: '#fff',
              },
            }}
            variant="contained"
            // className={CreateAllocationClasses.textField}
            type="submit"
            startIcon={<AddCircleOutlineIcon />}
            onClick={SubmitList}
            disabled={ApproveFreeseCheck}
          >
            Add</Button>

          {/* </Box> */}
          <Button
            sx={{
              backgroundColor: "", fontSize: "12px",
              padding: "5px", fontFamily: "system-ui",
              width: "100px", marginLeft: "5px", marginTop: "2px",
              '&.Mui-disabled': {
                opacity: 0.5,
                backgroundColor: 'DodgerBlue',
                color: '#fff',
              },
            }}
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={RefreshGrid}
            disabled={ApproveFreeseCheck}
          >Refresh</Button>
        </Box>
        {/* {showButtons && (
          <Box
            style={{
              flexDirection: 'row',
              alignItems: 'left',
              gap: '10px',
              transition: 'opacity 0.3s ease',
              opacity: 1,
              paddingTop: "5px",
            }}
            onMouseEnter={handleMouseEnterB}
            onMouseLeave={handleMouseLeaveB}
          >
            <Button
              sx={{
                backgroundColor: "", fontSize: "12px",
                padding: "5px", fontFamily: "system-ui",
                width: "100px",
                marginLeft: "5px", paddingLeft: "0px", marginTop: "2px",
                '&.Mui-disabled': {
                  opacity: 0.5,
                  backgroundColor: 'DodgerBlue',
                  color: '#fff',
                },
              }}
              variant="contained"
              // className={CreateAllocationClasses.textField}
              type="submit"
              startIcon={<AddCircleOutlineIcon />}
              onClick={SubmitList}
              disabled={ApproveFreeseCheck}
            >
              Add</Button>
            <Button
              sx={{
                backgroundColor: "", fontSize: "12px",
                padding: "5px", fontFamily: "system-ui",
                width: "100px", marginLeft: "5px", marginTop: "2px",
                '&.Mui-disabled': {
                  opacity: 0.5,
                  backgroundColor: 'DodgerBlue',
                  color: '#fff',
                },
              }}
              onClick={Split_Button_function}
              startIcon={<CallSplitIcon />}
              variant="contained" disabled={ApproveFreeseCheck}
            >Split</Button>
          </Box>

        )} */}


        {/*  <Box display="flex" justifyContent="flex-end">
          <div className={CreateAllocationClasses.grid_child1}>
            <Button
              sx={{
                backgroundColor: "", fontSize: "12px",
                padding: "5px", fontFamily: "system-ui",
                width: "100px", marginLeft: "5px", marginTop: "2px",
                '&.Mui-disabled': {
                  opacity: 0.5,
                  backgroundColor: 'DodgerBlue',
                  color: '#fff',
                },
              }}
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={RefreshGrid}
              disabled={ApproveFreeseCheck}
            >Refresh</Button>
          </div>
        </Box> */}
      </div>
    </Box >
  )

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };



  return (
    <Box className={CreateAllocationClasses.maindiv}>
      <Box sx={{ paddingTop: "70px" }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleTabChange} aria-label="lab API tabs example"
              sx={{
                margin: "0px 0px 0px 10px",
              }}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              ScrollButtonComponent={MyTabScrollButton}
            // scrollButtons="auto"
            // scrollButtons={false}
            >
              <Tab label="CREATE ALLOCATION" value="1" disabled={tab !== "1" ? true : false}
                sx={{ border: "solid 1px", borderRadius: '12px 12px 0px 0px', marginRight: '5px', fontWeight: "bold", color: '#3792CB', }}
              />

              <Tab label="RULES AND LOCATION" value="2" sx={RLscreenTabColor ? tabStyleRed : tabStyleGreen}
                disabled={tab !== "1" ? true : allPageSelected.length === 0} onClick={() => { handleSelectInd(1) }} />

              <Tab label="LIKE ITEM MAP" value="3"
                sx={LIMscreenTabColor ? tabStyleBlue : tabStyleGreen}
                disabled={tab !== "1" ? true : allPageSelected.length === 0} onClick={() => { handleSelectInd(2) }} />

              <Tab label="QUANITITY LIMITS" value="4"
                sx={QLscreenTabColor ? tabStyleRed : tabStyleGreen}
                disabled={tab !== "1" ? true : (allPageSelected.length === 0 ? true :
                  (ValidQtyTabCheck ? true : (ValidRLCheckData.length > 0 ? ValidRLCheckData[0].RULE_TYPE === "M" : true)))}
                onClick={() => { handleSelectInd(3) }} />

              {(searchHeaderData.ALLOC_TYPE === "S" || searchHeaderData.ALLOC_TYPE === "Scheduled") ?
                <Tab label="SCHEDULE" value="1"
                  sx={tab !== "1" ? tabStyleCalcDis : (allPageSelected.length === 0 ? tabStyleCalcDis : (searchHeaderData.ALLOC_TYPE === "S" ?
                    (ValidQtyTabCheck ? tabStyleCalcDis : (SchedulescreenTabColor ? tabStyleCalcRed : tabStyleCalcGreen)) : tabStyleCalcDis))}
                  disabled={tab !== "1" ? true : (allPageSelected.length === 0 ? true : (searchHeaderData.ALLOC_TYPE === "S" ? ValidQtyTabCheck : true))}
                  onClick={OpenSchedule} /> : null}

              {searchHeaderData.ALLOC_TYPE === "S" ? null :
                <Tab label="CALCULATE" value="1" activeSx={activeTabStyle}
                  sx={tab !== "1" ? tabStyleCalcDis : (allPageSelected.length === 0 ? tabStyleCalcDis : (searchHeaderData.ALLOC_TYPE === "S" ? tabStyleCalcDis : (ValidCalculateTabCheck ? tabStyleCalcDis :
                    (CalculatescreenTabColor ? tabStyleCalcRed : tabStyleCalcGreen))))}
                  disabled={tab !== "1" ? true : (allPageSelected.length === 0 ? true : (searchHeaderData.ALLOC_TYPE === "S" ? true : ValidCalculateTabCheck))}
                  onClick={() => { Calc_func() }} onKeyDown={handleKeyDown}
                />}
              {searchHeaderData.ALLOC_TYPE === "S" ? null :
                <Tab label="ALLOCATION DETAILS" value="5"
                  sx={AllocDtlscreenTabColor ? tabStyleGreen : tabStyleBlue}
                  disabled={tab !== "1" ? true : (allPageSelected.length === 0 ? true : (searchHeaderData.ALLOC_TYPE === "S" ? true : ValidAllocDetailCheck))}
                  onClick={() => { Validate_AllocDetails() }}
                />}
              {/* <Tab label="APPROVE" value="1" activeSx={activeTabStyle}
                sx={tab !== "1" ? tabStyleCalcDisApprove : (selected.length === 0 ? tabStyleCalcDisApprove : (searchHeaderData.ALLOC_TYPE === "S" ? tabStyleCalcDisApprove : (ValidCalculateDataCheck ? tabStyleCalcDisApprove : tabStyleCalcDisBlue)))}
                disabled={tab !== "1" ? true : (selected.length === 0 ? true : (searchHeaderData.ALLOC_TYPE === "S" ? true : ValidCalculateDataCheck))}
                onClick={() => { APPROVE_func() }}
              />

              <Tab label="RESERVE" value="1" activeSx={activeTabStyle}
                sx={tab !== "1" ? tabStyleCalcDisReserve : (selected.length === 0 ? tabStyleCalcDisReserve : (searchHeaderData.ALLOC_TYPE === "S" ? tabStyleCalcDisReserve : (ValidReserveDataCheck ? tabStyleCalcDisReserve : tabStyleCalcDisBlue)))}
                disabled={tab !== "1" ? true : (selected.length === 0 ? true : (searchHeaderData.ALLOC_TYPE === "S" ? true : ValidReserveDataCheck))}
                onClick={() => { REVERSE_func() }}
              />

              <Tab label="WORKSHEET" value="1" activeSx={activeTabStyle}
                sx={tab !== "1" ? tabStyleCalcDis : (selected.length === 0 ? tabStyleCalcDis : (searchHeaderData.ALLOC_TYPE === "S" ? tabStyleCalcDis : (ValidWorkSheetCheck ? tabStyleCalcDis : tabStyleCalcDisBlue)))}
                disabled={tab !== "1" ? true : (selected.length === 0 ? true : (searchHeaderData.ALLOC_TYPE === "S" ? true : ValidWorkSheetCheck))}
                onClick={() => { Worksheet_func() }}
              /> */}

              {(searchHeaderData.ALLOC_CRITERIA === "Pre Buy" || searchHeaderData.ALLOC_CRITERIA === "F") && searchHeaderData.ALLOC_TYPE !== "S" ?
                <Tab label="PRE BUY SUMMARY" value="6" sx={WhatIfSummscreenTabColor ? tabStyleGreen : tabStyleBlue}
                  disabled={tab !== "1" ? true : (allPageSelected.length === 0 ? true : (searchHeaderData.ALLOC_TYPE === "S" ? true :
                    (searchHeaderData.ALLOC_CRITERIA !== "Pre Buy" ? true : ValidWhatIfSummCheck)))}
                /> : null}

              {searchHeaderData.ALLOC_LEVEL === "D" && searchHeaderData.ALLOC_TYPE !== "S" ?
                <Tab label="SIZE DETAILS" value="8" sx={SizeDtlscreenTabColor ? tabStyleGreen : tabStyleBlue}
                  disabled={tab !== "1" ? true : (allPageSelected.length === 0 ? true : (searchHeaderData.ALLOC_TYPE === "S" ? true :
                    (searchHeaderData.ALLOC_LEVEL !== "D" ? true : ValidSizeDetailCheck)))}
                /> : null}
            </TabList>
          </Box>

          <TabPanel value="1" sx={{ padding: '2px 20px 0px 10px' }}>
            <Grid >
              {/* <Box
                display="inline-block"
                sx={{
                  backgroundColor: "",
                  width: "100%",
                  height: "auto",
                  border:"1px solid red"
                }}
              >
                <div sx={{ display: "flex", flexDirection: "column" }}>
                  <Grid id="top-row" container spacing={0} > */}
              <Box
                component="fieldset"
                display="inline-block"
                sx={{
                  backgroundColor: "",
                  height: "auto",
                  width: "100%",
                  // backgroundColor: "rgb(250, 250, 250)",
                  borderRadius: 1,

                  boxShadow: 2, border: 0,
                  borderBottom: 3,
                  border: "1px solid lightgrey",
                  // border:"1px dotted gray",
                  // borderRadius:"5px",
                }}
              ><legend style={{ fontWeight: "bold", color: "#191970", }}>Header</legend>
                <div className={CreateAllocationClasses.course_box}>
                  {SearchHeader()}
                </div>

                <div className={CreateAllocationClasses.course_box}>
                  {CreatescreenButtons()}
                </div>
              </Box>

              <Drawer
                anchor={"right"}
                open={state["right"]}
                onClose={toggleDrawer("right", false)}
                transitionDuration={300}
                PaperProps={{
                  style: { width: "450px" } // Set the desired width value
                }}
              >
                {searchPanel("right")}
              </Drawer>
              {/* </Grid>
                </div>
              </Box> */}
            </Grid>

            <Grid>
              <Box
                display="inline-block"
                sx={{
                  backgroundColor: "",
                  margin: "5px 0px 0px 2px",
                  width: "100%",
                  height: "auto",
                  borderRadius: 1,

                  boxShadow: 2, border: 0,
                  borderBottom: 3,
                  border: "1px solid lightgrey",
                }}
              >
                <Box display="flex" justifyContent="flex-end" sx={{}}>
                  {/* <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                    style={{ display: "flex", alignItems: "center", padding: "0px 0px 0px 10px" }}>
                    <Typography
                      style={{
                        bgcolor: '',
                        fontSize: "14px",
                        fontWeight: "bold",
                        position: "static",
                        padding: "0px 0px 0px 0px"
                      }}
                    >
                      CRITERIA: {searchHeaderData.ALLOC_CRITERIA}
                    </Typography>
                    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ position: 'relative', margin: "0px 0px 0px 10px", }} >
                      <div className={`${CreateAllocationClasses.menuContent} ${isHovered ? CreateAllocationClasses.menuContentVisible : ''}`}>
                        <div style={{ display: "flex", alignItems: "center", padding: "0px" }}>
                          {options.map((option, index) => (
                            <Typography sx={{ padding: "0px" }}
                            >
                              <MenuItem
                                // dense="true"
                                sx={{
                                  display: "flex", alignItems: "center", padding: "0px",
                                  // display: "inline-block",
                                  //  height: "15px",
                                  // padding: "0px", //maxHeight: "15px",
                                  whiteSpace: "nowrap", //border: "1px solid yellow"
                                }}
                                value={option.value}
                                key={option.value}
                                selected={index === selectedIndex}
                                onClick={(event) => handleMenuItemClick(event, index)}
                                disabled={totalData.length > 0 || ApproveFreeseCheck || searchHeaderData.ALLOC_TYPE === "S" ||
                                  (searchHeaderData["CONTEXT"] === "PROM" ? (
                                    searchHeaderData["ALLOC_DESC"].length > 0
                                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                                      && searchHeaderData["CONTEXT"].length > 0
                                      && searchHeaderData["ALLOC_TYPE"].length > 0
                                      && searchHeaderData["RELEASE_DATE"].length > 0
                                      && searchHeaderData["PROMOTION"].toString().length > 0
                                      ? false : true)
                                    :
                                    (
                                      searchHeaderData["ALLOC_DESC"].length > 0
                                        && searchHeaderData["ALLOC_LEVEL"].length > 0
                                        && searchHeaderData["CONTEXT"].length > 0
                                        && searchHeaderData["ALLOC_TYPE"].length > 0
                                        && searchHeaderData["RELEASE_DATE"].length > 0
                                        ? false : true))}
                              >
                                <RadioGroup
                                  size="small"
                                  value={option.value}
                                  defaultValue={option.value}
                                >
                                  <FormControlLabel
                                    value={searchHeaderData.ALLOC_CRITERIA}
                                    onClick={handleMouseLeave}
                                    sx={{
                                      padding: "0px",
                                      paddingLeft: "5px",
                                      whiteSpace: "nowrap",
                                    }}
                                    control={
                                      <Radio size="small"
                                        sx={{ padding: "2px 2px 0px 10px" }}
                                        onClick={handleMouseLeave}
                                        className={CreateAllocationClasses.formRadio} />
                                    }
                                    label={<Typography
                                      sx={{
                                        fontSize: "12px",
                                        marginTop: "2px",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap",
                                      }}
                                    >{option.value}
                                    </Typography>} />
                                </RadioGroup>
                              </MenuItem>
                            </Typography>))}
                        </div>
                      </div>
                    </div>
                  </div> */}
                  {/* <div style={{
                    flex: "0 0 5%",
                    overflow: "hidden"
                  }}>*/}
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div
                      style={{
                        flex: "1",
                        backgroundColor: isSHovered ? '#f5f5f5' : 'white',
                        borderRadius: '20%',
                        padding: "0px 8px 0px 8px",
                        marginRight: "2px", height: "30px", minHeight: "30px",
                        //border:"1px solid red"
                      }}
                      title="Search"
                      onMouseEnter={handleSEnter}
                      onMouseLeave={handleSLeave}
                      onClick={toggleDrawer("right", true)}
                    >
                      <ManageSearchIcon
                        variant="contained"
                        style={{
                          backgroundColor: isSHovered ? '#f5f5f5' : 'white',
                          //border:"1px solid blue",
                          marginTop: "2px"
                        }}
                        title="Search"
                      />
                    </div>

                    <div
                      style={{
                        flex: "1",
                        backgroundColor: isSHovered1 ? '#f5f5f5' : 'white',
                        borderRadius: '20%',
                        padding: "0px 8px 0px 8px",
                        marginRight: "10px",
                        // border: "1px solid red",
                        height: "30px", minHeight: "30px",
                      }}
                      title="Manage Columns"
                      onMouseEnter={handleSEnter1}
                      onMouseLeave={handleSLeave1}
                    >
                      <ViewColumnIcon style={{ padding: "0px", backgroundColor: isSHovered1 ? '#f5f5f5' : 'white', marginTop: "2px", color: "DodgerBlue" }} onClick={HandleManageHeader} title="Manage Columns" />
                    </div>
                  </div>
                </Box>
                <div sx={{ display: "flex", flexDirection: "row" }}>
                  <Grid id="top-row" container spacing={0}>
                    <Box
                      sx={{
                        backgroundColor: "",
                        // width: "99.4%",
                        width: "100%",
                        height: "auto",
                        margin: "0px 0px 5px 5px"
                      }}
                    >
                      <Paper sx={{ width: "99.4%", mb: 0 }}>
                        <TableContainer style={{ maxHeight: 550, borderRadius: '7px', }}
                          className={CreateAllocationClasses.TitleHead} ref={tableContainerRef}
                          onScroll={() => {
                            if (isDropdownOpen && !disableBlur) {
                              setIsDropdownOpen(false);
                            }
                          }}
                        >
                          <Table
                            aria-labelledby="tableTitle"
                          >
                            <EnhancedTableHead
                              numSelected={allPageSelected.length}
                              order={order}
                              orderBy={orderBy}
                              onSelectAllClick={handleSelectAllClick}
                              onRequestSort={handleRequestSort}
                              rowCount={totalData.length}
                            />
                            <TableBody >
                              <TableCell padding="checkbox" className={CreateAllocationClasses.TitleHead} sx={{ padding: "0px", width: "10px", margin: "0px" }} >
                                <IconButton small="small" onClick={resetFilter} sx={{ padding: "0px" }}>
                                  <RestartAltIcon small="small" sx={{ padding: "0px" }} />
                                </IconButton>
                              </TableCell>
                              {ManageHeaderData.includes('LOC') ?
                                <TableCell sx={{ padding: "0px" }} className={CreateAllocationClasses.TitleHead}>
                                  <TextField
                                    name="LOC"
                                    value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("LOC") > 0 ? inputValue.LOC : ""}
                                    onChange={testChange}
                                    placeholder="WH"
                                    autoComplete="off"
                                    InputProps={{
                                      style: { fontSize: 12, height: "20px" },
                                    }}
                                    variant="standard"
                                    inputProps={{
                                      // maxLength: 5,
                                      sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                    }}
                                    disabled={LockCheck}
                                  />
                                </TableCell> : null}

                              {ManageHeaderData.includes('ITEM') ?
                                <TableCell sx={{ padding: "0px" }} className={CreateAllocationClasses.TitleHead}>
                                  <TextField
                                    name="ITEM"
                                    value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("ITEM") > 0 ? inputValue.ITEM : ""}
                                    onChange={testChange}
                                    placeholder={searchHeaderData.ALLOC_LEVEL === 'D' ? "Style" : "Sku"}
                                    autoComplete="off"
                                    InputProps={{
                                      style: { fontSize: 12, height: "20px" },
                                    }}
                                    variant="standard"
                                    inputProps={{
                                      // maxLength: 5,
                                      sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                    }}
                                    disabled={LockCheck}
                                  />
                                </TableCell> : null}

                              {ManageHeaderData.includes('ITEM_DESC') ?
                                <TableCell sx={{ padding: "0px" }} className={CreateAllocationClasses.TitleHead}>
                                  <TextField
                                    name="ITEM_DESC"
                                    value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("ITEM_DESC") > 0 ? inputValue.ITEM_DESC : ""}
                                    onChange={testChange}
                                    placeholder="Description"
                                    autoComplete="off"
                                    InputProps={{
                                      style: { fontSize: 12, height: "20px" },
                                    }}
                                    variant="standard"
                                    inputProps={{
                                      // maxLength: 5,
                                      sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                    }}
                                    disabled={LockCheck}
                                  />
                                </TableCell> : null}

                              {ManageHeaderData.includes('DIFF_ID') ?
                                <TableCell sx={{ padding: "0px" }} className={CreateAllocationClasses.TitleHead}>
                                  <TextField
                                    name="DIFF_ID"
                                    value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("DIFF_ID") > 0 ? inputValue.DIFF_ID : ""}
                                    onChange={testChange}
                                    placeholder="Variant"
                                    autoComplete="off"
                                    InputProps={{
                                      style: { fontSize: 12, height: "20px" },
                                    }}
                                    variant="standard"
                                    inputProps={{
                                      // maxLength: 5,
                                      sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                    }}
                                    disabled={LockCheck}
                                  />
                                </TableCell> : null}

                              {ManageHeaderData.includes('VPN') ?
                                <TableCell sx={{ padding: "0px" }} className={CreateAllocationClasses.TitleHead}>
                                  <TextField
                                    name="VPN"
                                    value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("VPN") > 0 ? inputValue.VPN : ""}
                                    onChange={testChange}
                                    placeholder="VPN"
                                    autoComplete="off"
                                    InputProps={{
                                      style: { fontSize: 12, height: "20px" },
                                    }}
                                    variant="standard"
                                    inputProps={{
                                      // maxLength: 5,
                                      sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                    }}
                                    disabled={LockCheck}
                                  />
                                </TableCell> : null}

                              {ManageHeaderData.includes('HIER1') ?
                                <TableCell sx={{ padding: "0px" }} className={CreateAllocationClasses.TitleHead}>
                                  <TextField
                                    name="HIER1"
                                    value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("HIER1") > 0 ? inputValue.HIER1 : ""}
                                    onChange={testChange}
                                    placeholder="Hier1"
                                    autoComplete="off"
                                    InputProps={{
                                      style: { fontSize: 12, height: "20px" },
                                    }}
                                    variant="standard"
                                    inputProps={{
                                      // maxLength: 5,
                                      sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                    }}
                                    disabled={LockCheck}
                                  />
                                </TableCell> : null}

                              {ManageHeaderData.includes('HIER2') ?
                                <TableCell sx={{ padding: "0px" }} className={CreateAllocationClasses.TitleHead}>
                                  <TextField
                                    name="HIER2"
                                    value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("HIER2") > 0 ? inputValue.HIER2 : ""}
                                    onChange={testChange}
                                    placeholder="Hier2"
                                    autoComplete="off"
                                    InputProps={{
                                      style: { fontSize: 12, height: "20px" },
                                    }}
                                    variant="standard"
                                    inputProps={{
                                      // maxLength: 5,
                                      sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                    }}
                                    disabled={LockCheck}
                                  />
                                </TableCell> : null}

                              {ManageHeaderData.includes('HIER3') ?
                                <TableCell sx={{ padding: "0px" }} className={CreateAllocationClasses.TitleHead}>
                                  <TextField
                                    name="HIER3"
                                    value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("HIER3") > 0 ? inputValue.HIER3 : ""}
                                    onChange={testChange}
                                    placeholder="Hier3"
                                    autoComplete="off"
                                    InputProps={{
                                      style: { fontSize: 12, height: "20px" },
                                    }}
                                    variant="standard"
                                    inputProps={{
                                      // maxLength: 5,
                                      sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                    }}
                                    disabled={LockCheck}
                                  />
                                </TableCell> : null}

                              {ManageHeaderData.includes('HOLDBACK_QTY') ?
                                <TableCell sx={{ padding: "0px" }}>
                                  <TextField
                                    name="HOLDBACK_QTY"
                                    onChange={LockCheck ? handleChangeWeight : handleChangeWeight1}
                                    InputProps={{ endAdornment: <SearchButtonHoldBack />, style: { fontSize: 12, height: "20px" } }}
                                    autoComplete="off"
                                    placeholder="Holdback Qty"
                                    variant="standard"
                                    value={LockCheck ?
                                      Object.keys(copyValue).length > 0 && Object.keys(copyValue).includes("HOLDBACK_QTY") > 0 ? copyValue.HOLDBACK_QTY : "" :
                                      Object.keys(inputValue1).length > 0 && Object.keys(inputValue1).includes("HOLDBACK_QTY") > 0 ? inputValue1.HOLDBACK_QTY : ""
                                    }
                                    disabled={searchHeaderData.ALLOC_CRITERIA === "Pre Buy"}
                                    inputProps={{
                                      maxLength: 10, sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                    }}
                                  />
                                </TableCell> : null}

                              {ManageHeaderData.includes('HOLDBACK_TYPE') ?
                                <TableCell sx={{ padding: "0px" }}>
                                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto" }}>
                                    <Select
                                      name="HOLDBACK_TYPE"
                                      placeholder="Hold.."
                                      maxMenuHeight={150}
                                      classNamePrefix="mySelect"
                                      getOptionLabel={option =>
                                        `${option.CODE_DESC.toString()}`}
                                      getOptionValue={option => option.CODE_DESC}
                                      options={optionsHoldback}
                                      isSearchable={true}
                                      onChange={LockCheck ? handleChangeValue : (e) => testChange1(e, "HOLDBACK_TYPE")}
                                      menuPlacement="bottom"
                                      isClearable={true}
                                      closeMenuOnSelect={true}
                                      hideSelectedOptions={false}
                                      value={LockCheck ?
                                        optionsHoldback.filter(obj => copyValue?.HOLDBACK_TYPE === (obj.CODE)) :
                                        optionsHoldback.filter(obj => inputValue1?.HOLDBACK_TYPE === (obj.CODE))
                                      }
                                      styles={styleSelect3}
                                      style={{ maxWidth: '20px' }}
                                      isDisabled={searchHeaderData.ALLOC_CRITERIA === "Pre Buy"}
                                    />
                                    <SearchButtonHoldback_Type />
                                  </div>
                                </TableCell> : null}

                              {ManageHeaderData.includes('AVAIL_QTY') ?
                                searchHeaderData.ALLOC_CRITERIA !== "Pre Buy" ?
                                  <TableCell sx={{ padding: "0px" }} className={CreateAllocationClasses.TitleHead}>
                                    <TextField
                                      name="AVAIL_QTY"
                                      value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("AVAIL_QTY") > 0 ? inputValue.AVAIL_QTY : ""}
                                      onChange={testChange}
                                      placeholder="Avail Qty"
                                      autoComplete="off"
                                      InputProps={{
                                        style: { fontSize: 12, height: "20px" },
                                      }}
                                      variant="standard"
                                      inputProps={{
                                        // maxLength: 5,
                                        sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                      }}
                                      disabled={LockCheck}
                                    />
                                  </TableCell>
                                  :
                                  <TableCell sx={{ padding: "0px" }}>
                                    <TextField
                                      name="AVAIL_QTY"
                                      onChange={LockCheck ? handleChangeWeight : handleChangeWeight1}
                                      InputProps={{ endAdornment: <SearchButtonAvail />, style: { fontSize: 12, height: "20px" } }}
                                      autoComplete="off"
                                      placeholder="Avail Qty"
                                      variant="standard"
                                      value={LockCheck ?
                                        Object.keys(copyValue).length > 0 && Object.keys(copyValue).includes("AVAIL_QTY") > 0 ? copyValue.AVAIL_QTY : "" :
                                        Object.keys(inputValue1).length > 0 && Object.keys(inputValue1).includes("AVAIL_QTY") > 0 ? inputValue1.AVAIL_QTY : ""
                                      }
                                      inputProps={{
                                        maxLength: 10, sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                      }}
                                    />
                                  </TableCell> : null}

                              {ManageHeaderData.includes('INACTIVE_QTY') ?
                                <TableCell sx={{ padding: "0px" }} className={CreateAllocationClasses.TitleHead}>
                                  <TextField
                                    name="INACTIVE_QTY"
                                    value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("INACTIVE_QTY") > 0 ? inputValue.INACTIVE_QTY : ""}
                                    onChange={testChange}
                                    placeholder="Inactive Qty"
                                    autoComplete="off"
                                    InputProps={{
                                      style: { fontSize: 12, height: "20px" },
                                    }}
                                    variant="standard"
                                    inputProps={{
                                      // maxLength: 5,
                                      sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                    }}
                                    disabled={LockCheck}
                                  />
                                </TableCell> : null}

                              {ManageHeaderData.includes('PACK_IND') ?
                                <TableCell sx={{ padding: "0px" }}>
                                  <Select
                                    classNamePrefix="mySelect"
                                    getOptionLabel={option =>
                                      `${option.id.toString()}`}
                                    getOptionValue={option => option.id}
                                    options={PackIndOptions}
                                    isSearchable={true}
                                    isClearable={true}
                                    placeholder="Pack.."
                                    onChange={InlineChangePackInd}
                                    maxMenuHeight={180}
                                    styles={styleSelect4}
                                    value={PackIndOptions.filter(obj => inputValue?.PACK_IND === (obj.id))}
                                  />
                                </TableCell> : null}

                              {ManageHeaderData.includes('REF_2') ?
                                <TableCell sx={{ padding: "0px" }} className={CreateAllocationClasses.TitleHead}>
                                  <TextField
                                    name="REF_2"
                                    value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("REF_2") > 0 ? inputValue.REF_2 : ""}
                                    onChange={testChange}
                                    placeholder="Criteria Key"
                                    autoComplete="off"
                                    InputProps={{
                                      style: { fontSize: 12, height: "20px" },
                                    }}
                                    variant="standard"
                                    inputProps={{
                                      // maxLength: 5,
                                      sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                    }}
                                    disabled={LockCheck}
                                  />
                                </TableCell> : null}

                              {ManageHeaderData.includes('ALLOC_CRITERIA') ?
                                <TableCell sx={{ padding: "0px" }} className={CreateAllocationClasses.TitleHead}>
                                  <TextField
                                    name="ALLOC_CRITERIA"
                                    value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("ALLOC_CRITERIA") > 0 ? inputValue.ALLOC_CRITERIA : ""}
                                    onChange={testChange}
                                    placeholder="Alloc Criteria"
                                    autoComplete="off"
                                    InputProps={{
                                      style: { fontSize: 12, height: "20px" },
                                    }}
                                    variant="standard"
                                    inputProps={{
                                      // maxLength: 5,
                                      sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                    }}
                                    disabled={LockCheck}
                                  />
                                </TableCell> : null}

                              {ManageHeaderData.includes('PO_TYPE') ?
                                <TableCell sx={{ padding: "0px" }} className={CreateAllocationClasses.TitleHead}>
                                  <TextField
                                    name="PO_TYPE"
                                    value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("PO_TYPE") > 0 ? inputValue.PO_TYPE : ""}
                                    onChange={testChange}
                                    placeholder="PO Type"
                                    autoComplete="off"
                                    InputProps={{
                                      style: { fontSize: 12, height: "20px" },
                                    }}
                                    variant="standard"
                                    inputProps={{
                                      // maxLength: 5,
                                      sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                    }}
                                    disabled={LockCheck}
                                  />
                                </TableCell> : null}

                              {ManageHeaderData.includes('SIZE_PRF_IND') ?
                                <TableCell sx={{ padding: "0px" }}>
                                  <Select
                                    classNamePrefix="mySelect"
                                    getOptionLabel={option =>
                                      `${option.id.toString()}`}
                                    getOptionValue={option => option.id}
                                    options={PackIndOptions}
                                    isSearchable={true}
                                    isClearable={true}
                                    placeholder="Siz..."
                                    onChange={InlineChangeSizeProf}
                                    maxMenuHeight={180}
                                    styles={styleSelect4}
                                    isDisabled={searchHeaderData.ALLOC_LEVEL !== 'D'}
                                    value={PackIndOptions.filter(obj => inputValue?.SIZE_PRF_IND === (obj.id))}
                                  />
                                </TableCell> : null}

                              {ManageHeaderData.includes('SUBSTITUTE_IND') ?
                                <TableCell sx={{ padding: "0px" }} >
                                  <Select
                                    classNamePrefix="mySelect"
                                    getOptionLabel={option =>
                                      `${option.id.toString()}`}
                                    getOptionValue={option => option.id}
                                    options={PackIndOptions}
                                    isSearchable={true}
                                    isClearable={true}
                                    placeholder="Subs.."
                                    onChange={InlineChangeSubsInd}
                                    maxMenuHeight={180}
                                    styles={styleSelect4}
                                    value={PackIndOptions.filter(obj => inputValue?.SUBSTITUTE_IND === (obj.id))}
                                  />
                                </TableCell> : null}

                              {ManageHeaderData.includes('INVENT_IND') && false ?
                                <TableCell sx={{ padding: "0px" }}>
                                  {/* <div style={{
                                    borderRadius: "0px",
                                    border: "0",
                                    borderBottom: "1px solid gray",
                                    boxShadow: "none", // Remove the box shadow
                                    margin: "-3px 0 0 0", // Apply negative margin on the top
                                    "&:hover": {
                                      borderColor: "black", // Apply a border color on hover
                                      borderBottom: state.isFocused ? "2px solid dodgerblue" : "2px solid black",
                                    },
                                  }}>
                                    <Checkbox
                                      disabled={ApproveFreeseCheck}
                                      color="primary"
                                      size="small"
                                      onClick={(event) => InlineChangeInvInd(event)}
                                      name="INVENT_IND"
                                      style={{ padding: "0px", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', }}
                                    />
                                  </div> */}
                                  <Select
                                    classNamePrefix="mySelect"
                                    getOptionLabel={option =>
                                      `${option.id.toString()}`}
                                    getOptionValue={option => option.id}
                                    options={PackIndOptions}
                                    isSearchable={true}
                                    isClearable={true}
                                    placeholder="Inv.."
                                    onChange={InlineChangeInvInd}
                                    maxMenuHeight={180}
                                    styles={styleSelect4}
                                    value={PackIndOptions.filter(obj => inputValue?.INVENT_IND === (obj.id))}
                                  />
                                </TableCell> : null}


                              {ManageHeaderData.includes('INNER_SIZE') ?
                                <TableCell sx={{ padding: "0px" }} className={CreateAllocationClasses.TitleHead}>
                                  <TextField
                                    name="INNER_SIZE"
                                    value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("INNER_SIZE") > 0 ? inputValue.INNER_SIZE : ""}
                                    onChange={testChange}
                                    placeholder="Inner"
                                    autoComplete="off"
                                    InputProps={{
                                      style: { fontSize: 12, height: "20px" },
                                    }}
                                    variant="standard"
                                    inputProps={{
                                      // maxLength: 5,
                                      sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                    }}
                                    disabled={LockCheck}
                                  />
                                </TableCell> : null}

                              {ManageHeaderData.includes('CASE_SIZE') ?
                                <TableCell sx={{ padding: "0px" }} className={CreateAllocationClasses.TitleHead}>
                                  <TextField
                                    name="CASE_SIZE"
                                    value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("CASE_SIZE") > 0 ? inputValue.CASE_SIZE : ""}
                                    onChange={testChange}
                                    placeholder="Case"
                                    autoComplete="off"
                                    InputProps={{
                                      style: { fontSize: 12, height: "20px" },
                                    }}
                                    variant="standard"
                                    inputProps={{
                                      // maxLength: 5,
                                      sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                    }}
                                    disabled={LockCheck}
                                  />
                                </TableCell> : null}

                              {ManageHeaderData.includes('SOM_TYPE') ?
                                <TableCell sx={{ padding: "0px" }}>
                                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto" }}>
                                    <Select
                                      name="SOM_TYPE"
                                      placeholder="Store.."
                                      maxMenuHeight={150}
                                      classNamePrefix="mySelect"
                                      getOptionLabel={option =>
                                        `${option.CODE_DESC.toString()}`}
                                      getOptionValue={option => option.CODE_DESC}
                                      options={optionssom}
                                      isSearchable={true}
                                      onChange={LockCheck ? handleChangeValue : (e) => testChange1(e, "SOM_TYPE")}
                                      menuPlacement="bottom"
                                      isClearable={true}
                                      closeMenuOnSelect={true}
                                      hideSelectedOptions={false}
                                      value={LockCheck ?
                                        optionssom.filter(obj => copyValue?.SOM_TYPE === (obj.CODE)) :
                                        optionssom.filter(obj => inputValue1?.SOM_TYPE === (obj.CODE))
                                      }
                                      styles={styleSelect3}
                                      style={{ maxWidth: '20px' }}
                                    />
                                    <SearchButtonSOM_Type />
                                  </div>
                                </TableCell> : null}

                              {ManageHeaderData.includes('SEASON') ?
                                <TableCell sx={{ padding: "0px" }} className={CreateAllocationClasses.TitleHead}>
                                  <TextField
                                    name="SEASON"
                                    value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("SEASON") > 0 ? inputValue.SEASON : ""}
                                    onChange={testChange}
                                    placeholder="Season"
                                    autoComplete="off"
                                    InputProps={{
                                      style: { fontSize: 12, height: "20px" },
                                    }}
                                    variant="standard"
                                    inputProps={{
                                      // maxLength: 5,
                                      sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                    }}
                                    disabled={LockCheck}
                                  />
                                </TableCell> : null}

                              {ManageHeaderData.includes('SPLIT_IND') ?
                                <TableCell sx={{ padding: "0px" }} className={CreateAllocationClasses.TitleHead}>
                                  <div style={{
                                    borderRadius: "0px",
                                    border: "0",
                                    borderBottom: "1px solid gray",
                                    boxShadow: "none", // Remove the box shadow
                                    margin: "-3px 0 0 0", // Apply negative margin on the top
                                    "&:hover": {
                                      borderBottom: "2px solid black", // Change the border color to solid black on hover
                                    },
                                  }}>
                                    <Checkbox
                                      disabled={ApproveFreeseCheck}
                                      color="primary"
                                      size="small"
                                      onClick={(event) => InlineChange(event)}
                                      name="SPLIT_IND"
                                      style={{ padding: "0px 0px 0px 3px", textAlign: "left", display: 'flex', justifyContent: 'center', alignItems: 'center', }}
                                    />
                                  </div>
                                </TableCell> : null}

                              {ManageHeaderData.includes('ERR_MESSAGE') ?
                                <TableCell sx={{ padding: "0px" }} className={CreateAllocationClasses.TitleHead}>
                                  <TextField
                                    name="ERR_MESSAGE"
                                    value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("ERR_MESSAGE") > 0 ? inputValue.ERR_MESSAGE : ""}
                                    onChange={testChange}
                                    placeholder="Error Message"
                                    autoComplete="off"
                                    InputProps={{
                                      style: { fontSize: 12, height: "20px" },
                                    }}
                                    variant="standard"
                                    inputProps={{
                                      // maxLength: 5,
                                      sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                    }}
                                    disabled={LockCheck}
                                  />
                                </TableCell> : null}


                              {currentPageData.length > 0 ?
                                // stableSort(totalData, getComparator(order, orderBy))
                                currentPageData.map((row, index) => {
                                  const isItemSelected = isSelected(row.SR_NO);
                                  const labelId = `enhanced-table-checkbox-${index}`;
                                  return (
                                    <StyledTableRow
                                      align="left"
                                      hover
                                      role="checkbox"
                                      aria-checked={isItemSelected}
                                      tabIndex={-1}
                                      key={row.SR_NO}
                                      selected={isItemSelected}
                                      onClick={() => handleRowClick(row.SR_NO)}
                                      style={
                                        selectedRow === row.SR_NO ? { backgroundColor: "#CDF0FF" }//"#CDF0FF"
                                          : row.ERR_IND === 'E' ? { backgroundColor: "#FF6666" }
                                            : row.ERR_IND === 'W' ? { backgroundColor: "#FADA5E" }
                                              : {}
                                      }
                                    >
                                      <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px", width: "1%" }}>
                                        <Checkbox
                                          disabled={ApproveFreeseCheck}
                                          color="primary"
                                          size="small"
                                          onClick={(event) => [handleClick(event, row?.SR_NO)]}
                                          checked={isItemSelected}
                                          inputProps={{
                                            'aria-labelledby': labelId,
                                          }}
                                          style={{ padding: "0px", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', }}
                                          sx={allPageSelected.includes(row.SR_NO) ? {
                                            '&.Mui-disabled': {
                                              opacity: 0.5,
                                              color: 'DodgerBlue',
                                            },
                                          } : null
                                          }
                                        />
                                      </TableCell>

                                      {ManageHeaderData.includes('LOC') ?
                                        <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px", padding: "1px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}
                                          disabled={searchHeaderData.ALLOC_CRITERIA === "Pre Buy"}
                                        >
                                          {searchHeaderData.ALLOC_CRITERIA === "Pre Buy" ? null : (row.LOC === "NULL" ? null : row.LOC)}
                                        </TableCell> : null}

                                      {ManageHeaderData.includes('ITEM') ?
                                        <TableCell sx={{ padding: "0px 3px 0px 3px", textAlign: "left", fontSize: "12px", width: "150px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.ITEM === "NULL" ? null : row.ITEM}
                                        </TableCell> : null}

                                      {ManageHeaderData.includes('ITEM_DESC') ?
                                        <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}
                                        >
                                          <Box
                                            display="flex"
                                            justifyContent="space-between"
                                            alignItems="center" // Align items vertically
                                            sx={{
                                              paddingRight: "0px",
                                              width: "100%",
                                              boxSizing: "border-box",
                                            }}
                                          >
                                            <InputLabel
                                              sx={{
                                                paddingBottom: "2px",
                                                fontSize: "12px",
                                                fontFamily: "system-ui",
                                                color: "rgb(10, 10, 10)",
                                                paddingLeft: "2px",
                                                flexGrow: 1, // Expand the label to take available space
                                                marginRight: "8px", // Add a small margin on the right
                                              }}
                                            >
                                              {row.ITEM_DESC}
                                            </InputLabel>

                                            <Button sx={{
                                              backgroundColor: "",
                                              "&:hover": {
                                                backgroundColor: "",
                                              },
                                              border: 0,
                                              color: "CadetBlue",
                                              padding: "1px",
                                              minWidth: 0, // Remove the minimum width
                                            }}
                                              style={{
                                                maxWidth: '25px', minWidth: '25px', justifyContent: "flex-start",
                                              }}
                                              size='small'
                                              className={CreateAllocationClasses.textField}
                                              onClick={() => {
                                                setOpenDialog(true);
                                                setDialogData(String(row.ITEM_DESC));
                                              }}
                                              startIcon={<InfoIcon style={{ fontSize: 16, backgroundColor: "" }} />}
                                            >
                                            </Button>
                                          </Box>
                                        </TableCell> : null}

                                      {ManageHeaderData.includes('DIFF_ID') ?
                                        <TableCell sx={{ padding: "0px 3px 0px 3px", textAlign: "left", fontSize: "12px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.DIFF_ID === "NULL" ? null : row.DIFF_ID}
                                        </TableCell> : null}

                                      {ManageHeaderData.includes('VPN') ?
                                        <TableCell
                                          sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {/* {row.VPN === "NULL" ? null : row.VPN} */}
                                          <Box
                                            display="flex"
                                            justifyContent="space-between"

                                          >
                                            <InputLabel
                                              sx={{
                                                paddingBottom: "2px",
                                                fontSize: "12px",
                                                fontFamily: "system-ui",

                                                color: "rgb(10, 10, 10)",
                                                paddingLeft: "2px",
                                                paddingRight: "0px",
                                              }}
                                            >
                                              {row.VPN}
                                            </InputLabel>

                                            <Button sx={{
                                              backgroundColor: "",
                                              '&:hover': {
                                                backgroundColor: "",
                                              },
                                              border: 0, color: "CadetBlue", padding: "1px"
                                            }}
                                              style={{
                                                maxWidth: '25px', minWidth: '25px', justifyContent: "flex-start",
                                              }}
                                              size='small'
                                              className={CreateAllocationClasses.textField}
                                              onClick={() => {
                                                setOpenDialog(true);
                                                setDialogData(String(row.VPN));
                                              }}
                                              startIcon={<InfoIcon style={{ fontSize: 16, backgroundColor: "" }} />}
                                            >
                                            </Button>
                                          </Box>
                                        </TableCell> : null}

                                      {ManageHeaderData.includes('HIER1') ?
                                        <TableCell align="right" sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.HIER1 === "NULL" ? null : row.HIER1}
                                        </TableCell> : null}

                                      {ManageHeaderData.includes('HIER2') ?
                                        <TableCell align="right" sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.HIER2 === "NULL" ? null : row.HIER2}
                                        </TableCell> : null}

                                      {ManageHeaderData.includes('HIER3') ?
                                        <TableCell align="right" sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.HIER3 === "NULL" ? null : row.HIER3}
                                        </TableCell> : null}

                                      {ManageHeaderData.includes('HOLDBACK_QTY') ?
                                        <TableCell sx={{
                                          padding: "0px",
                                          textAlign: "left",
                                          fontSize: "12px",
                                          outline: "none",
                                          verticalAlign: "left",
                                          // backgroundColor: '#fff',
                                          margin: "0px 0px 0px 0px",
                                        }}
                                          disabled={searchHeaderData.ALLOC_CRITERIA === "Pre Buy" || ApproveFreeseCheck}
                                          className={CreateAllocationClasses.SpecificCell}
                                          contentEditable={(searchHeaderData.ALLOC_CRITERIA === "Pre Buy" || ApproveFreeseCheck) ? false : true}
                                          onBlur={(e) => {
                                            onTableCellChange1(e, row.SR_NO)
                                          }
                                          }
                                          onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                              e.preventDefault();
                                            }
                                          }}
                                          onInput={(e) => {
                                            const valid = /^\d+$/.test(e.target.textContent)
                                            if (!valid && e.target.textContent !== "") {
                                              setOpenDialog(true);
                                              setDialogData("Only Numberic values are accepted");
                                              e.target.textContent = ""
                                            }
                                            else if (parseInt(e.target.textContent) < 1 && e.target.textContent !== "") {
                                              setOpenDialog(true);
                                              setDialogData("Values should be greater than zero*");
                                              e.target.textContent = ""
                                            }
                                            else if (e.target.textContent.length > 0 && row.HOLDBACK_QTY.length === 0) {
                                              row["HOLDBACK_QTY"] = optionsHoldback[0].CODE
                                            }
                                            else if (e.target.textContent.length === 0 && row.HOLDBACK_QTY.length > 0) {
                                              row["HOLDBACK_QTY"] = ""
                                            }
                                            if (e.target.textContent.length > 10) {
                                              e.target.textContent = e.target.textContent.substring(0, 10);
                                              row["HOLDBACK_QTY"] = e.target.textContent
                                              setOpenDialog(true);
                                              setDialogData("The maximum length for HOLDBACK_QTY has been exceeded");
                                            }
                                          }}
                                          suppressContentEditableWarning={true}
                                        >
                                          <Box sx={searchHeaderData.ALLOC_CRITERIA === "Pre Buy" ? {
                                            backgroundColor: '#f0f0f0',
                                            padding: "1px 0px 0px 3px",
                                            height: "22px",
                                            border: "1px solid lightgrey",
                                            borderRadius: "3px",
                                            //  textAlign: "center",
                                            fontSize: 12,
                                            margin: "0px"
                                          } : {
                                            backgroundColor: '#fff',
                                            padding: "1px 0px 0px 3px",
                                            height: "22px",
                                            border: "1px solid lightgrey",
                                            borderRadius: "3px",
                                            //  textAlign: "center",
                                            fontSize: 12,
                                            margin: "0px"
                                          }
                                          }>
                                            {row.HOLDBACK_QTY}
                                          </Box>
                                        </TableCell> : null}

                                      {ManageHeaderData.includes('HOLDBACK_TYPE') ?
                                        <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "12px", position: 'relative', }}
                                          onDoubleClick={(event) => {
                                            showAvailDialog(event, row);
                                          }}>
                                          <Select
                                            name="HOLDBACK_TYPE"
                                            isDisabled={ApproveFreeseCheck || searchHeaderData.ALLOC_CRITERIA === "Pre Buy"}
                                            maxMenuHeight={150}
                                            classNamePrefix="mySelect"
                                            getOptionLabel={option =>
                                              `${option.CODE_DESC.toString()}`}
                                            getOptionValue={option => option.CODE_DESC}
                                            options={optionsHoldback}
                                            isSearchable={true}
                                            onChange={(e) =>
                                              onTableCellChange3(e, row.SR_NO, "HOLDBACK_TYPE")
                                            }
                                            menuPosition="fixed"
                                            value={optionsHoldback.filter(obj => row?.HOLDBACK_TYPE === (obj.CODE))}
                                            isClearable={true}
                                            closeMenuOnSelect={true}
                                            hideSelectedOptions={false}
                                            styles={styleSelect5}
                                            style={{ maxWidth: '20px' }}
                                            isOptionDisabled={option => searchHeaderData.ALLOC_LEVEL === "D" && option.CODE === "U"}
                                            onFocus={handleDropdownOpen}
                                            onBlur={handleDropdownClose}
                                            onMouseDown={handleMouseDown} // Add onMouseDown event
                                            ref={selectRef}
                                          />
                                        </TableCell> : null}

                                      {ManageHeaderData.includes('AVAIL_QTY') ?
                                        searchHeaderData.ALLOC_CRITERIA === "Pre Buy" ?
                                          <TableCell sx={{
                                            padding: "0px",
                                            textAlign: "left",
                                            fontSize: "12px",
                                            outline: "none",
                                            verticalAlign: "center",
                                            // backgroundColor: '#fff',
                                            margin: "0px 0px 0px 0px",
                                          }}
                                            disabled={ApproveFreeseCheck}
                                            className={CreateAllocationClasses.SpecificCell}
                                            contentEditable={ApproveFreeseCheck ? false : true}
                                            onBlur={(e) =>
                                              onTableCellChange(e, row.SR_NO)
                                            }
                                            onKeyDown={(e) => {
                                              if (e.key === "Enter") {
                                                e.preventDefault();
                                              }
                                            }}
                                            onInput={(e) => {
                                              const valid = /^\d+$/.test(e.target.textContent)
                                              if (!valid && e.target.textContent !== "") {
                                                setOpenDialog(true);
                                                setDialogData("Only Numberic values are accepted");
                                                e.target.textContent = ""
                                              }
                                              if (parseInt(e.target.textContent) < 1 && e.target.textContent !== "") {
                                                setOpenDialog(true);
                                                setDialogData("Values should be greater than zero*");
                                                e.target.textContent = ""
                                              }
                                              if (e.target.textContent.length > 10) {
                                                e.target.textContent = e.target.textContent.substring(0, 10);
                                                row["AVAIL_QTY"] = e.target.textContent
                                                setOpenDialog(true);
                                                setDialogData("The maximum length for AVAIL_QTY has been exceeded*")
                                              }
                                            }}
                                            suppressContentEditableWarning={true}
                                          >
                                            <Box sx={{
                                              backgroundColor: '#fff',
                                              padding: "1px 0px 0px 3px",
                                              height: "22px",
                                              border: "1px solid lightgrey",
                                              borderRadius: "3px",
                                              //  textAlign: "center",
                                              fontSize: 12,
                                              margin: "0px"
                                            }}>
                                              {row.AVAIL_QTY}
                                            </Box>
                                          </TableCell>
                                          :
                                          <TableCell align="right" sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}
                                            onDoubleClick={(event) => showAvailDialog(event, row)}>
                                            {(row.AVAIL_QTY === "NULL" || row.AVAIL_QTY < 0) ? "0" : row.AVAIL_QTY}
                                          </TableCell> : null}

                                      {ManageHeaderData.includes('INACTIVE_QTY') ?
                                        <TableCell align="right" sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {(row.INACTIVE_QTY === "NULL" || row.INACTIVE_QTY < 0) ? "0" : row.INACTIVE_QTY}
                                        </TableCell> : null}

                                      {ManageHeaderData.includes('PACK_IND') ?
                                        <TableCell sx={{ padding: "0px", textAlign: "center", fontSize: "12px", }}>
                                          <Checkbox
                                            disabled
                                            color="primary"
                                            size="small"
                                            checked={selectedPackInd.includes(row.SR_NO)}
                                            style={{ padding: "0px", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 0 }}
                                            sx={selectedPackInd.includes(row.SR_NO) ? {
                                              '&.Mui-disabled': { opacity: 0.5, color: 'DodgerBlue', },
                                            } : null
                                            }
                                          />
                                        </TableCell> : null}

                                      {ManageHeaderData.includes('REF_2') ?
                                        <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {/* {row.REF_1 === "NULL" ? null : row.REF_1} */}
                                          {String(row.REF_2).length > 0 ?
                                            <Box
                                              display="flex"
                                              justifyContent="space-between"

                                            >
                                              <InputLabel
                                                sx={{
                                                  paddingBottom: "2px",
                                                  fontSize: "12px",
                                                  fontFamily: "system-ui",

                                                  color: "rgb(10, 10, 10)",
                                                  paddingLeft: "2px",
                                                  paddingRight: "0px",
                                                }}
                                              >
                                                {row.REF_2}
                                              </InputLabel>

                                              <Button sx={{
                                                backgroundColor: "",
                                                '&:hover': {
                                                  backgroundColor: "",
                                                },
                                                border: 0, color: "CadetBlue", padding: "1px"
                                              }}
                                                style={{
                                                  maxWidth: '25px', minWidth: '25px', justifyContent: "flex-start",
                                                }}
                                                size='small'
                                                className={CreateAllocationClasses.textField}
                                                onClick={() => {
                                                  setOpenDialog(true);
                                                  setDialogData(String(row.REF_2));
                                                }}
                                                startIcon={<InfoIcon style={{ fontSize: 16, backgroundColor: "" }} />}
                                              >
                                              </Button>
                                            </Box>
                                            : null}
                                        </TableCell> : null}

                                      {ManageHeaderData.includes('ALLOC_CRITERIA') ?
                                        <TableCell align="right" sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.ALLOC_CRITERIA === "NULL" ? null : row.ALLOC_CRITERIA}
                                        </TableCell> : null}

                                      {ManageHeaderData.includes('PO_TYPE') ?
                                        <TableCell align="right" sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.PO_TYPE === "NULL" ? null : row.PO_TYPE}
                                        </TableCell> : null}

                                      {ManageHeaderData.includes('SIZE_PRF_IND') ?
                                        <TableCell sx={{ padding: "0px", textAlign: "center", fontSize: "12px", position: "relative" }}>
                                          <Checkbox
                                            disabled
                                            color="primary"
                                            size="small"
                                            checked={selectedSizeProfile.includes(row.SR_NO)}
                                            style={{ padding: "0px", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', }}
                                            // position: 'absolute', top: '50%', transform: 'translateY(-50%)', padding: "0px", textAlign: "center", left: '100%', marginLeft: '10px', zIndex: 1
                                            sx={selectedSizeProfile.includes(row.SR_NO) ? {
                                              position: "relative",
                                              '&.Mui-disabled': {
                                                opacity: 0.5,
                                                color: 'DodgerBlue',
                                              }
                                            } : null
                                            }
                                          />
                                        </TableCell> : null}

                                      {ManageHeaderData.includes('SUBSTITUTE_IND') ?
                                        <TableCell sx={{ padding: "0px", textAlign: "center", fontSize: "12px", position: "relative" }}>
                                          <Checkbox
                                            disabled
                                            color="primary"
                                            size="small"
                                            checked={selectedSubsInd.includes(row.SR_NO)}
                                            style={{ padding: "0px", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', }}
                                            // position: 'absolute', top: '50%', transform: 'translateY(-50%)', padding: "0px", textAlign: "center", left: '100%', marginLeft: '10px', zIndex: 1
                                            sx={selectedSubsInd.includes(row.SR_NO) ? {
                                              position: "relative",
                                              '&.Mui-disabled': {
                                                opacity: 0.5,
                                                color: 'DodgerBlue',
                                              },
                                            } : null
                                            }
                                          />
                                        </TableCell> : null}

                                      {ManageHeaderData.includes('INVENT_IND') && false ?
                                        <TableCell sx={{ padding: "0px", textAlign: "center", fontSize: "12px", position: "relative", zIndex: 0 }}>
                                          <Checkbox
                                            disabled
                                            color="primary"
                                            size="small"
                                            checked={selectedInvInd.includes(row.SR_NO)}
                                            style={{ padding: "0px", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', }}
                                            // position: 'absolute', top: '50%', transform: 'translateY(-50%)', padding: "0px", textAlign: "center", left: '100%', marginLeft: '10px', zIndex: 1
                                            sx={selectedInvInd.includes(row.SR_NO) ? {
                                              position: "relative",
                                              '&.Mui-disabled': {
                                                opacity: 0.5,
                                                color: 'DodgerBlue',
                                              },
                                            } : null
                                            }
                                          />
                                        </TableCell> : null}

                                      {ManageHeaderData.includes('INNER_SIZE') ?
                                        <TableCell align="right" sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.INNER_SIZE === "NULL" ? null : row.INNER_SIZE}
                                        </TableCell> : null}

                                      {ManageHeaderData.includes('CASE_SIZE') ?
                                        <TableCell align="right" sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.CASE_SIZE === "NULL" ? null : row.CASE_SIZE}
                                        </TableCell> : null}

                                      {ManageHeaderData.includes('SOM_TYPE') ?
                                        <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "12px", position: 'relative', }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          <Select
                                            name="SOM_TYPE"
                                            isDisabled={ApproveFreeseCheck}
                                            maxMenuHeight={150}
                                            classNamePrefix="mySelect"
                                            getOptionLabel={option =>
                                              `${option.CODE_DESC.toString()}`}
                                            getOptionValue={option => option.CODE_DESC}
                                            options={optionssom}
                                            isSearchable={true}
                                            onChange={(e) =>
                                              onTableCellChange3(e, row.SR_NO, "SOM_TYPE")
                                            }
                                            menuPlacement="bottom"
                                            value={optionssom.filter(obj => row?.SOM_TYPE === (obj.CODE))}
                                            isClearable={false}
                                            closeMenuOnSelect={true}
                                            hideSelectedOptions={false}
                                            styles={styleSelect5}
                                            style={{ maxWidth: '20px', position: 'absolute', }}
                                            menuPosition="fixed"
                                            onFocus={handleDropdownOpen}
                                            onBlur={handleDropdownClose}
                                            ref={selectRef}
                                          />
                                          {/* {row.SOM_TYPE === "NULL" ? null : row.SOM_TYPE} */}
                                        </TableCell> : null}

                                      {ManageHeaderData.includes('SEASON') ?
                                        <TableCell align="right" sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.SEASON === "NULL" ? null : row.SEASON}
                                        </TableCell> : null}

                                      {ManageHeaderData.includes('SPLIT_IND') ?
                                        <TableCell sx={{ padding: "0px", textAlign: "center", fontSize: "12px", position: "relative" }}>
                                          <Checkbox
                                            disabled={ApproveFreeseCheck}
                                            color="primary"
                                            size="small"
                                            onClick={(event) => handleClickSplit(event, row?.SR_NO)}
                                            checked={selectedSplit.includes(row.SR_NO)}
                                            style={{ padding: "0px", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', }}
                                            // position: 'absolute', top: '50%', transform: 'translateY(-50%)', padding: "0px", textAlign: "center", left: '100%', marginLeft: '10px', zIndex: 1
                                            sx={selectedSplit.includes(row.SR_NO) ? {
                                              position: "relative",
                                              '&.Mui-disabled': {
                                                opacity: 0.5,
                                                color: 'DodgerBlue',
                                              },
                                            } : null
                                            }
                                          />
                                        </TableCell> : null}

                                      {/* {ManageHeaderData.includes('ERR_IND') ?
                                        <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.ERR_IND === "NULL" ? null : row.ERR_IND}
                                        </TableCell> : null} */}

                                      {ManageHeaderData.includes('ERR_MESSAGE') ?
                                        <TableCell align="right" sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.ERR_MESSAGE.length > 0 ?
                                            <Box
                                              display="flex"
                                              justifyContent="space-between"

                                            >
                                              <InputLabel
                                                sx={{
                                                  paddingBottom: "2px",
                                                  fontSize: "12px",
                                                  fontFamily: "system-ui",

                                                  color: "rgb(10, 10, 10)",
                                                  paddingLeft: "2px",
                                                  paddingRight: "0px",
                                                }}
                                              >
                                                {row.ERR_MESSAGE}
                                              </InputLabel>

                                              <Button sx={{
                                                backgroundColor: "",
                                                '&:hover': {
                                                  backgroundColor: "",
                                                },
                                                border: 0, color: "CadetBlue", padding: "1px"
                                              }}
                                                style={{
                                                  maxWidth: '25px', minWidth: '25px', justifyContent: "flex-start",
                                                }}
                                                size='small'
                                                className={CreateAllocationClasses.textField}
                                                onClick={() => {
                                                  setOpenDialog(true);
                                                  setDialogData(String(row.ERR_MESSAGE));
                                                }}
                                                startIcon={<InfoIcon style={{ fontSize: 16, backgroundColor: "" }} />}
                                              >
                                              </Button>
                                            </Box>
                                            : null}

                                        </TableCell> : null}

                                    </StyledTableRow >
                                  );
                                })
                                : null}


                              {currentPageData.length < 20 ?
                                [...Array(20 - (currentPageData.length)).keys()].map(val => (
                                  <StyledTableRow >
                                    <TableCell padding="checkbox" sx={{ padding: "0px", width: "1%" }}>
                                      <Checkbox style={{ padding: "0px", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', }}
                                        color="primary" size="small" disabled={true} />
                                    </TableCell>
                                    {ManageHeaderData.map((row, index) => {
                                      return (
                                        <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>)
                                    })}
                                    {/* <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                      <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                      <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                      <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                      <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                      <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                      <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                      <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                      <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                      <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                      <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                      <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                      <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                      <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                      <TableCell padding="checkbox" sx={{ padding: "0px", width: "1%" }}>
                                        <Checkbox sx={{ padding: "3px 0px 3px 0px" }} color="primary" size="small" disabled={true} />
                                      </TableCell>
                                      <TableCell padding="checkbox" sx={{ padding: "0px", width: "1%" }}>
                                        <Checkbox sx={{ padding: "3px 0px 3px 0px" }} color="primary" size="small" disabled={true} />
                                      </TableCell>
                                      <TableCell padding="checkbox" sx={{ padding: "0px", width: "1%" }}>
                                        <Checkbox sx={{ padding: "3px 0px 3px 0px" }} color="primary" size="small" disabled={true} />
                                      </TableCell>
                                      <TableCell padding="checkbox" sx={{ padding: "0px", width: "1%" }}>
                                        <Checkbox sx={{ padding: "3px 0px 3px 0px" }} color="primary" size="small" disabled={true} />
                                      </TableCell>
                                      <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                      <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                      <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                      <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                      <TableCell padding="checkbox" sx={{ padding: "0px", width: "1%" }}>
                                        <Checkbox sx={{ padding: "3px 0px 3px 0px" }} color="primary" size="small" disabled={true} />
                                      </TableCell>
                                      <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                      <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell> */}
                                  </StyledTableRow>
                                )) : false}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <div style={{ display: 'flex', alignItems: '', justifyContent: "space-between", }}>
                          <span
                            style={{
                              margin: '13px 0px 0px 15px', fontSize: '14px',
                              fontFamily: 'Arial, sans-serif',
                            }}
                          >
                            {Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))
                              ? "Selected : " + String(selected[0][page].length)
                              : null}
                          </span>
                          <div>
                            <div className={CreateAllocationClasses.header_child}>
                              <span
                                style={{
                                  margin: '13px 0px 0px 15px', fontSize: '14px',
                                  fontFamily: 'Arial, sans-serif',
                                }}
                              >
                                {"Total Selected: " + String(allPageSelected.length)}
                              </span>
                            </div>
                            <div className={CreateAllocationClasses.header_child}>
                              <TablePagination
                                rowsPerPageOptions={[30]}
                                component="div"
                                count={totalData.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                sx={{ '& .MuiToolbar-root': { minHeight: '20px', }, }}
                              />
                            </div>
                          </div>
                        </div>
                        {/* {totalData.length > 0 ? <EnhancedTableToolbar numSelected={totalData.length} /> : null} */}
                      </Paper>
                    </Box>
                  </Grid>
                </div>
              </Box>
            </Grid>
          </TabPanel>

          <TabPanel value="2" sx={{ padding: '2px 20px 0px 5px' }} >
            <RulesAndLocation
              allocNoData={allocNoData}
              setTab={setTab}
              setIsValidQtyLimits={setIsValidQtyLimits} //Ok button in RL screen
              setRTabCond={setRTabCond} // Disable the create screen tab
              setDisCond={setDisCond} //?????
              rtvrldata={rtvrldata}
              setrtvrldata={setrtvrldata} //remove this and put the condition in validation RL check data webservice 
              setIsLoading={setIsLoading}
              ApproveFreeseCheck={ApproveFreeseCheck}
              setHeaderCheck={setHeaderCheck}
              setOpenDialog={setOpenDialog}
              setDialogData={setDialogData}
            />
          </TabPanel>

          <TabPanel value="3" sx={{ padding: '2px 20px 0px 5px' }}>
            <LikeItemMap
              allocNoData={allocNoData}
              setIsValidQtyLimits={setIsValidQtyLimits} //Ok button in LIM screen
              tab={tab}
              setTab={setTab}
              setRTabCond={setRTabCond}
              setDisCond={setDisCond}
              limData={limData}
              ApproveFreeseCheck={ApproveFreeseCheck}
              setHeaderCheck={setHeaderCheck}
              setOpenDialog={setOpenDialog}
              setDialogData={setDialogData}
            />
          </TabPanel>

          <TabPanel value="4" sx={{ padding: '2px 20px 0px 10px' }}>
            <QuantityLimits
              allocNoData={allocNoData}
              setIsValidQtyLimits={setIsValidQtyLimits} //Ok button in Ql screen
              tab={tab}
              setTab={setTab}
              setRTabCond={setRTabCond}
              setDisCond={setDisCond}
              limData={limData}
              setIsLoading={setIsLoading}
              ApproveFreeseCheck={ApproveFreeseCheck}
              setHeaderCheck={setHeaderCheck}
              setOpenDialog={setOpenDialog}
              setDialogData={setDialogData}
            />
          </TabPanel>

          <TabPanel value="5" sx={{ padding: '12px 20px 0px 10px' }}>
            {valAD && adSwtich === 1 ? (
              <AllocDetails
                allocNoData={allocNoData}
                setTab={setTab}
                setDisCond={setDisCond}
                ApproveFreeseCheck={ApproveFreeseCheck}
                adData={adData}
                setADData={setADData}
                setValAD={setValAD}
                setIsLoading={setIsLoading}
                setADSwitch={setADSwitch}
              />
            ) : valAD && adSwtich === 2 ? (
              <AllocDetailsPack
                allocNoData={allocNoData}
                setTab={setTab}
                setDisCond={setDisCond}
                ApproveFreeseCheck={ApproveFreeseCheck}
                packADData={packADData}
                setPackADData={setPackADData}
                setValAD={setValAD}
                setADSwitch={setADSwitch}
              />
            ) : null}
          </TabPanel>

          <TabPanel value="6" sx={{ padding: '12px 20px 0px 10px' }}>
            <WhatIFSummary
              ApproveFreeseCheck={ApproveFreeseCheck}
              allocNoData={allocNoData}
              setTab={setTab}
              setOpenDialog={setOpenDialog}
              setDialogData={setDialogData}
              setCheckOkWhatIfSummCheck={setCheckOkWhatIfSummCheck}
              setApproveFreeseCheck={setApproveFreeseCheck}
              callMode={callMode}

            />
          </TabPanel>

          <TabPanel value="7" sx={{ padding: '12px 20px 0px 10px' }}>
            <WhatIFPO />
          </TabPanel>

          <TabPanel value="8" sx={{ padding: '12px 20px 0px 10px' }}>
            <SizeDetails
              ApproveFreeseCheck={ApproveFreeseCheck}
              allocNoData={allocNoData}
              setTab={setTab}
            />

          </TabPanel>
        </TabContext >
      </Box >
      <div>
        <Dialog
          fullWidth={true}
          maxWidth="xs"
          open={openWH}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
          disableBackdropClick
        >
          <DialogTitle id="responsive-dialog-title" sx={{ fontSize: "16px", userSelect: 'text', padding: "10px 10px 0px 10px", }}>
            {availSearch.length > 0 ? availValCheck : null}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseWH} autoFocus variant="contained" startIcon={<DoneAllIcon />}
              sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 5px 0px 0px", width: "100px" }}
            > Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      { /*
          ##############################
          ### POP-UP ON DOUBLE CLICK ###
          ##############################  
       */}
      < div >

        <Dialog open={openAvailDialog}
          onClose={(event, reason) => {
            if (reason !== 'backdropClick') {

              setOpenAvailDialog(false);
            }
          }}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
          maxWidth="md" //fullWidth
          disableBackdropClick
        >
          <Modal open={pUpLoad}>
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
          <DialogTitle style={{
            //cursor: 'move'
            fontSize: '18px', // Modify the font size here
            // color:"1px solid black",
            height: '25px', // Adjust the height here
            paddingTop: '2px',// Adjust the paddingTop here
          }}
            id="draggable-dialog-title">
            Available quantity details by size
          </DialogTitle>
          <DialogContent
            style={{
              paddingBottom: "0px", paddingTop: "6px", paddingLeft: "20px", width: "fit-content",
              height: "auto",
            }}
          >
            <DialogContentText>
              <SearchAvailQty />
              <Box
                component="fieldset"
                display="inline-block"
                sx={{
                  height: "auto",
                  marginLeft: "0px",
                  padding: "0px",
                  marginTop: "5px",
                  backgroundColor: "white",
                  borderRadius: 2,
                  width: "calc(100% - 0px)",
                  boxShadow: 2,
                  border: 0,
                  borderBottom: "3px solid black",

                }}
              >

                <div className={CreateAllocationClasses.TableBody}>
                  <Paper sx={{
                    margin: "0px 0px 0px 0px", mb: 0, height: "auto", width: "calc(100% - 0px)",

                    // borderRadius: 2, boxShadow: 2, border: 0, borderBottom: 3,
                  }}

                  >
                    {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                    <TableContainer style={{
                      maxHeight: 270, width: "calc(100% - 0px)"
                    }} component={Paper}>
                      <Table aria-label="customized table">


                        <TableHead className={CreateAllocationClasses.TitleHead}>
                          <StyledTableRow >
                            <StyledTableCell align="right" style={{ whiteSpace: "nowrap", paddingLeft: "3px", color: "#fff", width: "100px", maxWidth: "100px", borderLeft: "1px solid white" }}>Sku</StyledTableCell>
                            <StyledTableCell align="right" style={{ whiteSpace: "nowrap", paddingLeft: "3px", color: "#fff", width: "100px", maxWidth: "100px", borderLeft: "1px solid white" }}>Variant1</StyledTableCell>
                            <StyledTableCell align="right" style={{ whiteSpace: "nowrap", paddingLeft: "3px", color: "#fff", width: "100px", maxWidth: "100px", borderLeft: "1px solid white" }}>Variant2</StyledTableCell>
                            <StyledTableCell align="right" style={{ whiteSpace: "nowrap", paddingLeft: "3px", color: "#fff", width: "100px", maxWidth: "100px", borderLeft: "1px solid white" }}>Variant3</StyledTableCell>
                            <StyledTableCell align="right" style={{ whiteSpace: "nowrap", paddingLeft: "3px", color: "#fff", width: "100px", maxWidth: "100px", borderLeft: "1px solid white" }}>Variant4</StyledTableCell>
                            <StyledTableCell align="right" style={{ whiteSpace: "nowrap", paddingLeft: "3px", color: "#fff", width: "80px", maxWidth: "80px", borderLeft: "1px solid white" }}>Avail Qty</StyledTableCell>
                            <StyledTableCell align="right" style={{ whiteSpace: "nowrap", paddingLeft: "3px", color: "#fff", width: "80px", maxWidth: "80px", borderLeft: "1px solid white" }}>Inactive Qty</StyledTableCell>
                          </StyledTableRow>
                        </TableHead>
                        <TableBody >
                          {availQty.map((row) => {
                            return (
                              <TableRow>
                                <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "12px", height: "20px" }}>
                                  {row.ITEM === "NULL" ? null : row.ITEM}</TableCell>
                                <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                  {row.DIFF1 === "NULL" ? null : row.DIFF1}</TableCell>
                                <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                  {row.DIFF2 === "NULL" ? null : row.DIFF2}</TableCell>
                                <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                  {row.DIFF3 === "NULL" ? null : row.DIFF3}</TableCell>
                                <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                  {row.DIFF4 === "NULL" ? null : row.DIFF4}</TableCell>
                                <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                  {row.AVAILABLE_QTY === "NULL" ? null : row.AVAILABLE_QTY}</TableCell>
                                <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                  {row.INACTIVE_QTY === "NULL" ? null : row.INACTIVE_QTY}</TableCell>
                              </TableRow>
                            )
                          })}
                          {/* </StyledTableRow> */}
                          {availQty.length < 10 ?
                            [...Array(10 - (availQty.length)).keys()].map(val => (
                              <TableRow >
                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "20px" }}></TableCell>
                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}></TableCell>
                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} ></TableCell>
                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                              </TableRow>
                            )) : false}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                  </Paper>
                </div>
              </Box>


            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: "", paddingTop: "2px" }}>
            <Button autoFocus onClick={handleCloseAvailDialog} startIcon={<DoneAllIcon />}
              variant="contained" sx={{

                height: "fit-content", width: "100px", padding: "5px", margin: "5px 0px 0px 0px",
                backgroundColor: "green", '&:hover': {
                  backgroundColor: "#228B22", textShadow: "0 0 #000"
                }, fontSize: "12px", margin: "0px 15px 0px 0px",
              }}
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div >

      { /*
          ##############################
          ###    SCHEDULE POP-UP     ###
          ##############################  
       */}
      <Modal
        open={open_Schdl}
        onClose={() => setOpen_Schdl(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open_Schdl}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <div
              style={{
                backgroundColor: 'white',
                padding: '20px',
                width: '892px',
                boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)',
              }}
            >
              <DialogContentText>
                <div>
                  <ScheduleAlloc
                    allocNoData={allocNoData}
                    setOpen_Schdl={setOpen_Schdl}
                    setRTabCond={setRTabCond}
                    setDisCond={setDisCond}
                    setTab={setTab}
                    tab={tab}
                    searchHeaderData={searchHeaderData}
                    setIsLoading={setIsLoading}
                    schdlData={schdlData}
                    ApproveFreeseCheck={ApproveFreeseCheck}
                    setSchedulescreenTabColor={setSchedulescreenTabColor}
                    setOkScheduleCheck={setOkScheduleCheck}
                  />
                </div>
              </DialogContentText>
            </div>
          </div>
        </Fade>
      </Modal>

      { /*
          ###############################
          ###   ERROR REPORT POP-UP   ###
          ###############################  
       */}
      <div >
        <Dialog open={open_ErrReport}
          // onClose={(event, reason) => {
          //   if (reason !== 'backdropClick') {

          //     setOpen_ErrReport(false);
          //   }
          // }}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
          maxWidth="lg" fullWidth
          disableBackdropClick
        >
          <DialogTitle style={{
            paddingTop: '0px',// Adjust the paddingTop here
            paddingBottom: '5px',
            //backgroundColor:"violet"
          }}
            id="draggable-dialog-title">
          </DialogTitle>
          <DialogContent
            style={{
              paddingBottom: "0px", paddingTop: "0px", paddingLeft: "20px"
            }}
          >
            <DialogContentText>
              <ErrorReportScreen
                setOpen_ErrReport={setOpen_ErrReport}
                errReportData={errReportData}
                allocNoData={allocNoData}
                searchHeaderData={searchHeaderData}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          </DialogActions>
        </Dialog>
      </div>

      <div >
        <Dialog
          fullWidth={true}
          maxWidth="sm"
          open={openMultiPO}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
          disableBackdropClick={true}
        >
          <DialogTitle id="responsive-dialog-title" sx={{ padding: "5px 0px 0px 10px", margin: "0px" }}>
            Multi PO Selection
          </DialogTitle>
          <DialogContent
            sx={{ padding: "0px 8px 0px 8px", margin: "0px" }}
          >
            <DialogContentText>
              <Paper sx={{ margin: "0px 0px 0px 0px", mb: 0, height: "auto", width: "calc(100% - 0px)", borderRadius: 1, boxShadow: 2, border: 0, borderBottom: 3, }}>
                <TableContainer style={{ maxHeight: 365, borderRadius: 1, boxShadow: 2, border: 0, borderBottom: 3, }} className={CreateAllocationClasses.TitleHead}>
                  <Table
                    aria-labelledby="tableTitle"
                  >
                    <TableHead className={CreateAllocationClasses.TitleHead}>
                      <StyledTableRow >
                        <StyledTableCell align="right" style={{ whiteSpace: "nowrap", paddingLeft: "3px", color: "#fff", width: "30px", maxWidth: "30px", borderLeft: "1px solid white" }}>
                          Sel</StyledTableCell>
                        <StyledTableCell align="right" style={{ whiteSpace: "nowrap", paddingLeft: "3px", color: "#fff", width: "100px", maxWidth: "100px", borderLeft: "1px solid white" }}>
                          PO's </StyledTableCell>
                        <StyledTableCell align="right" style={{ whiteSpace: "nowrap", paddingLeft: "3px", color: "#fff", width: "150px", maxWidth: "150px", borderLeft: "1px solid white" }}>
                          Po Desc</StyledTableCell>
                        <StyledTableCell align="right" style={{ whiteSpace: "nowrap", paddingLeft: "3px", color: "#fff", width: "50px", maxWidth: "50px", borderLeft: "1px solid white" }}>
                          WH</StyledTableCell>
                        <StyledTableCell align="right" style={{ whiteSpace: "nowrap", paddingLeft: "3px", color: "#fff", width: "100px", maxWidth: "100px", borderLeft: "1px solid white" }}>
                          EISD</StyledTableCell>
                        <StyledTableCell align="right" style={{ whiteSpace: "nowrap", paddingLeft: "3px", color: "#fff", width: "100px", maxWidth: "100px", borderLeft: "1px solid white" }}>
                          Supplier Site</StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      <TableCell padding="checkbox" className={CreateAllocationClasses.TitleHead} sx={{ padding: "0px", width: "10px", margin: "0px" }} >
                        <IconButton small="small" onClick={resetMultiPOFilter} sx={{ padding: "0px" }}>
                          <RestartAltIcon small="small" sx={{ padding: "0px" }} />
                        </IconButton>
                      </TableCell>

                      <TableCell sx={{ padding: "0px", height: "auto" }}>
                        <TextField
                          name="ORDER_NO"
                          onChange={testMultiPOChange}
                          value={Object.keys(inputMultiPO).length > 0 && Object.keys(inputMultiPO).includes("ORDER_NO") > 0 ? inputMultiPO.ORDER_NO : ""}
                          placeholder="PO No"
                          autoComplete="off"
                          InputProps={{ sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", } }}
                          sx={{ width: "100%", }}
                          variant="standard"
                          inputProps={{ sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px" }, }, }}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: "0px", height: "auto" }}>
                        <TextField
                          name="COMMENT_DESC"
                          onChange={testMultiPOChange}
                          value={Object.keys(inputMultiPO).length > 0 && Object.keys(inputMultiPO).includes("COMMENT_DESC") > 0 ? inputMultiPO.COMMENT_DESC : ""}
                          placeholder="PO Desc"
                          autoComplete="off"
                          InputProps={{ sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", } }}
                          sx={{ width: "100%", }}
                          variant="standard"
                          inputProps={{ sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px" }, }, }}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: "0px", height: "auto" }}>
                        <TextField
                          name="LOCATION"
                          onChange={testMultiPOChange}
                          value={Object.keys(inputMultiPO).length > 0 && Object.keys(inputMultiPO).includes("LOCATION") > 0 ? inputMultiPO.LOCATION : ""}
                          placeholder="WH"
                          autoComplete="off"
                          InputProps={{ sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", } }}
                          sx={{ width: "100%", }}
                          variant="standard"
                          inputProps={{ sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px" }, }, }}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: "0px", height: "auto" }}>
                        <TextField
                          name="ESTIMATED_INSTOCK_DATE"
                          onChange={testMultiPOChange}
                          value={Object.keys(inputMultiPO).length > 0 && Object.keys(inputMultiPO).includes("ESTIMATED_INSTOCK_DATE") > 0 ? inputMultiPO.ESTIMATED_INSTOCK_DATE : ""}
                          placeholder="EISD"
                          autoComplete="off"
                          InputProps={{ sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", } }}
                          sx={{ width: "100%", }}
                          variant="standard"
                          inputProps={{ sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px" }, }, }}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: "0px", height: "auto" }}>
                        <TextField
                          name="SUPPLIER"
                          onChange={testMultiPOChange}
                          value={Object.keys(inputMultiPO).length > 0 && Object.keys(inputMultiPO).includes("SUPPLIER") > 0 ? inputMultiPO.SUPPLIER : ""}
                          placeholder="Supplier"
                          autoComplete="off"
                          InputProps={{ sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", } }}
                          sx={{ width: "100%", }}
                          variant="standard"
                          inputProps={{ sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px" }, }, }}
                        />
                      </TableCell>
                    </TableBody>
                    <TableBody >
                      {MultiPOData.map((row) => {
                        return (
                          <TableRow>
                            <TableCell sx={{ padding: "0px", textAlign: "center", fontSize: "12px" }}>
                              <Checkbox
                                disabled={ApproveFreeseCheck}
                                color="primary"
                                size="small"
                                onClick={(event) => [handleSelectClickMultiPO(event, row?.SR_NO)]}
                                checked={selectedMultiPO.includes(row.SR_NO)}
                                style={{ padding: "0px", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', }}
                                sx={selectedMultiPO.includes(row.SR_NO) ? {
                                  '&.Mui-disabled': {
                                    opacity: 0.5,
                                    color: 'DodgerBlue',
                                  },
                                } : null
                                }
                              />
                            </TableCell>
                            <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                              {row.ORDER_NO === "NULL" ? null : row.ORDER_NO}</TableCell>
                            <TableCell sx={{ padding: '0px 0px 0px 0px', textAlign: 'left', fontSize: '12px' }}>
                              {String(row.COMMENT_DESC).length > 0 ?
                                <Box
                                  display="flex"
                                  justifyContent="space-between"
                                  sx={{ border: 0, padding: "0px 3px 0px 0px", }}
                                >
                                  <InputLabel
                                    sx={{
                                      paddingTop: "3px", fontSize: "12px", fontFamily: "system-ui",
                                      color: "rgb(10, 10, 10)", paddingLeft: "2px", paddingRight: "0px",
                                    }}
                                  >
                                    {String(row.COMMENT_DESC).length > 0 && String(row.COMMENT_DESC).length < 25 ?
                                      row.COMMENT_DESC === "NULL" ? null : row.COMMENT_DESC
                                      : String(row.COMMENT_DESC).substring(0, 25) + ".."}
                                  </InputLabel>
                                  <Button sx={{ backgroundColor: "", '&:hover': { backgroundColor: "", }, border: 0, color: "CadetBlue", padding: "0px", }}
                                    style={{ maxWidth: '0px', minWidth: '0px', justifyContent: "flex-start" }}
                                    size='small'
                                    className={CreateAllocationClasses.textField}
                                    onClick={() => {
                                      setOpenDialog(true);
                                      setDialogData(String(row.COMMENT_DESC));
                                    }}
                                    startIcon={<InfoIcon style={{ fontSize: 16, backgroundColor: "" }} />}
                                  >
                                  </Button>
                                </Box> : null}
                            </TableCell>
                            <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                              {row.LOCATION === "NULL" ? null : row.LOCATION}</TableCell>
                            <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                              {row.ESTIMATED_INSTOCK_DATE === "NULL" ? null : row.ESTIMATED_INSTOCK_DATE}</TableCell>
                            <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                              {row.SUPPLIER === "NULL" ? null : row.SUPPLIER}</TableCell>
                          </TableRow>
                        )
                      })}
                      {MultiPOData.length < 15 ?
                        [...Array(15 - (MultiPOData.length)).keys()].map(val => (
                          <TableRow >
                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "20px" }}></TableCell>
                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}></TableCell>
                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} ></TableCell>
                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                          </TableRow>
                        )) : false}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Toolbar
                  sx={{
                    pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, ...(MultiPOData.length > 0 && {
                      minHeight: { minHeight: "25px !important", },
                      bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }), padding: "0px",
                  }}
                >
                  {MultiPOData.length > 0 && (
                    <Typography
                      sx={{ flex: "1 1 100%", display: "flex", justifyContent: "flex-end", padding: "0px 5px 0px 0px", fontSize: "14px", fontFamily: "system-ui", }}
                      color="inherit" variant="subtitle1" component="div"
                    >Rows {selectedMultiPO.length} of {MultiPOData.length}
                    </Typography>)}
                </Toolbar>
              </Paper>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                fontSize: "12px",
                backgroundColor: "#228B22",
                padding: "5px", fontFamily: "system-ui",
                width: "100px", marginLeft: "5px", marginTop: "2px",
              }}
              startIcon={<DoneAllIcon />}
              onClick={handleOkMultiPO}
              variant="contained">
              Ok</Button>
            <Button
              sx={{
                backgroundColor: "maroon",
                fontSize: "12px", padding: "5px", fontFamily: "system-ui",
                width: "100px", marginLeft: "5px", marginTop: "2px",
              }}
              startIcon={<CancelIcon />}
              variant="contained"
              onClick={handleCloseMultiPO}
            >Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>

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
            {DialogData}
          </DialogContent>
          <DialogActions>
            <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 5px 0px 0px", width: "100px", }}
              onClick={handleCloseDialog} autoFocus variant="contained" startIcon={<DoneAllIcon />}>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      { /*
          ################################
          ###   MANAGE COLUMN POP-UP   ###
          ################################ 
       */}

      <div>
        <Dialog
          // fullWidth={true}
          maxWidth="xs"
          open={openDialogManage}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
          disableBackdropClick
        >
          <DialogTitle sx={{
            fontSize: '18px', // Modify the font size here

            height: '25px', // Adjust the height here
            padding: '2px 0px 2px 12px',// Adjust the paddingTop here
            margin: "0px 0px 0px 0px",
          }}>Manage Columns</DialogTitle>
          <DialogContent id="draggable-dialog-title" sx={{
            fontSize: "16px", userSelect: 'text', padding: "0px 0px 0px 10px", height: "240px", margin: "0px 10px 0px 0px",
            '&::-webkit-scrollbar': { width: '8px', },
            '&::-webkit-scrollbar-thumb': { backgroundColor: '#bdbdbd', borderRadius: '4px', },
            '&::-webkit-scrollbar-track': { backgroundColor: '#f5f5f5', borderRadius: '4px', },
          }} >
            {headerManage()}
          </DialogContent>
          <DialogActions sx={{ display: "flex", justifyContent: "space-between", }}>
            <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 5px 0px 0px", width: "125px" }}
              onClick={handleShowAllManageHeader} autoFocus variant="contained" startIcon={<AnimationIcon />}>
              Show All
            </Button>

            <Box>
              <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 0px 0px 0px", width: "100px" }}
                onClick={handleCloseDialogManage} autoFocus variant="contained" startIcon={<DoneAllIcon />}>
                Ok
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      </div>

      <Modal open={LoadingAllocSummCheck}>
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
    </Box >
  );
};

export default CreateAllocation;
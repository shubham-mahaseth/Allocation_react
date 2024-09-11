import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import Table from "../../Components/Table/index";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";
// import InfoIcon from '@mui/icons-material/Info';
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import InputLabel from '@mui/material/InputLabel';
import Drawer from "@mui/material/Drawer";
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
  getHIERRequest,
  getEXCLUDEUDARequest,
  getALLOC_LEVELRequest,
  getALLOC_TYPERequest,
  getCONTEXT_TYPERequest,
  getPROMOTIONRequest,
  getSTATUSRequest,
  postALLOCRESULTRequest,
  getALLOC_CRITERIARequest,
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
} from "../../Redux/Action/createAllocation";
import CircularProgress from "@mui/material/CircularProgress";
// import { headCells } from "./tableHead";
import SearchIcon from "@mui/icons-material/Search";
import { alpha } from "@mui/material/styles";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SendIcon from "@mui/icons-material/Send";
//import { trnType } from "./transType.js";
// import { errorList } from "./errorType.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import swal from '@sweetalert/with-react';
// import TrnTypeList from "../TRNTYPE";
import Select from 'react-select';
import makeAnimated, { Input } from 'react-select/animated';
import { ConstructionOutlined } from "@mui/icons-material";
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
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { headCells } from "./tableHead";
import TableSortLabel from '@mui/material/TableSortLabel';
import PropTypes from 'prop-types';
import Toolbar from "@mui/material/Toolbar";
import Tab from "@mui/material/Tab";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from '@mui/icons-material/Info';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DataGrid } from '@mui/x-data-grid';
import ForwardIcon from '@mui/icons-material/Forward';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Card, CardContent, ListItemIcon } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { height } from "@mui/system";
//import "./index.css";
import QuantityLimits from "../QuantityLimits/index";
import LikeItemMap from "../LikeItem/index";
import RulesAndLocation from "../Rules/index";
import ScheduleAlloc from "../ScheduleAlloc";
// import { GET_SWITCHTABFUNC_REQUEST } from "../../Redux/constant";
// import { set } from "immer/dist/internal";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const animatedComponents = makeAnimated();

const styleSelect = {
  control: base => ({
    ...base,
    width: "200px",
    fontSize: "14px",
    // This line disable the blue border
    borderRadius: "0",
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
  })
  ,
  dropdownIndicator: (base) => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  clearIndicator: (base) => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  valueContainer: (provided) => ({
    ...provided,
    // minHeight: '1px',
    // height: '40px',
    paddingTop: '0',
    paddingBottom: '0',
  }),
  singleValue: (provided) => ({
    ...provided,
    // minHeight: '1px',
    // paddingBottom: '0px',

  }),
  input: (provided) => ({
    ...provided,
    width: "100%",
    // minHeight: '1px',
  }),
  option: provided => ({
    ...provided,
    // color: 'blue',
    fontSize: "12px",
  }),
};

// const tabStyle = { border: "solid 1px", borderRadius: '12px 12px 0px 0px', marginRight: '5px' }

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
    height: 37.8,
    // background: "rgb(255, 255, 255)",
    '& input + fieldset': {
      // borderColor: 'gray',
      borderRadius: "0",
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
      color: "green"
    },
    "& .MuiFilledInput-root": {
      backgroundColor: "rgb(255, 255, 255)"
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
      borderRadius: "0",
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
    },
  },
  inputFielddate: {
    width: "200px",
    // margin:"10px 0px 0px 0px",
    height: 38,
    border: 0,

    // backgroundColor:"#f0f0f0",
    '& input + fieldset': {
      // borderColor: 'gray',
      borderRadius: "0",
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
    margin: "0.2rem",
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
    padding: "0rem 0.5rem",
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
    border: "2px solid #0087ff",
    padding: "0px 5px 2px 5px",
    // verticalAlign: "middle",
  },
  TableCell: {
    color: "#fff",
    padding: "6px 6px !important",
    lineHeight: "1.2rem !important",
  },
  TitleHead: {
    // height: "25px",
    position: "sticky",
    top: -1,
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
  Button_parent: {
    display: "flex",
    // flexDirection:"row",
    justifyContent: "space-between",
  },
  Button_child: {
    border: "1px solid blue",
    display: "flex",
    justifyContent: "space-between"
  },
  Button_child1: {
    border: "1px solid Red",
    display: "flex",
    justifyContent: "space-between"
  },
});


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-container": {
    "& .MuiPaper-root": {
      width: "100%",
      maxWidth: "1000px",  // Set your width here
    },
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}


// const initialDataCCommon = {
//   HIER1: [],
//   HIER2: [],
//   HIER3: [],
//   WH: [],
//   SUPPLIER: [],
//   SUPPLIER_SITE: [],
//   PACK_NO: [],
//   ITEM_PARENT: [],
//   DIFF_ID: [],
//   SKU: [],
//   ITEM_LIST_NO: [],
//   VPN: [],
//   UDA: [],
//   UDA: [],
//   UDA_VALUE: [],
//   EXCLUDE_UDA: [],
//   EXCLUDE_UDA_VALUE: [],
// }

// const initialDataPO = {
//   PO: [],
//   PO_TYPE: [],
//   ESID_FROM: [],
//   ESID_TO: [],
//   NOT_BEFORE_DATE_FROM: [],
//   NOT_BEFORE_DATE_TO: [],
// }

// const initialDataWH = {
//   AVAIL_QTY_GREATER: "",
//   AVAIL_QTY_LESS: "",
// }

// const initialDataASN = {
//   ASN: [],
// }

// const initialDataTSF = {
//   TSF: [],
// }

// const initialHeaderData = {
//   ALLOC_CRITERIA: "",
//   CONTEXT: "",
//   ALLOC_LEVEL: "",
//   ALLOC_TYPE: "",
//   STATUS: "",
//   PROMOTION: "",
//   CREATE_ID: JSON.parse(localStorage.getItem("userData"))?.username,
//   ALLOC_DESC: "",
//   RELEASE_DATE: new Date().toISOString().slice(0, 10),
//   ALLOC_NO: "",
//   ALLOC_LEVEL_CODE: "",
//   ALLOC_TYPE_CODE: "",
//   STATUS_CODE: "",
//   PROMOTION_CODE: "",
//   CONTEXT_CODE: "",
// }

// const options = [
//   // { value: "None" },
//   { value: "PURCHASE_ORDER" },
//   { value: "WAREHOUSE" },
//   { value: "ASN" },
//   { value: "TRANSFER" },
//   { value: "WHAT_IF" },
// ];




const CreateAllocationScreen = (
  {
    searchDataCCommon, setSearchDataCCommon, searchDataCPO, setSearchDataCPO, searchDataCWH,
    setSearchDataCWH, searchDataCASN, setSearchDataCASN, searchDataCTSF, setSearchDataCTSF,
    isSearch, setSearch, loading, setLoading, isSubmit, setSubmit, tabledata,
    setTabledata, totalData, setTotalData, allData, setAllData, order, setOrder,
    orderBy, setOrderBy, selected, setSelected, searchHeaderData, setSearchHeaderData,
    headerDis, setHeaderDis, isError, setIsError, isSuccess, setIsSuccess, isValid,
    setIsValid, tab, setTab, isValidCTEDF, setIsValidCTEDF, isValidCTNDF, setIsValidCTNDF,
    isValidCTEDT, setIsValidCTEDT, isValidCTNDT, setIsValidCTNDT, isGreatCTEDF,
    setIsGreatCTEDF, isGreatCTNDF, setIsGreatCTNDF, isGreatCTEDT, setIsGreatCTEDT,
    isGreatCTNDT, setIsGreatCTNDT, warehouseData, setWarehouseData, supplierData,
    setSupplierData, supplerSiteData, setSupplerSiteData, packNoData, setPackNoData,
    diffData, setDIffData, skuData, setSkuData, itemListHeadData, setItemListHeadData,
    vpnData, setVpnData, udaData, setUdaData, poData, setPoData, hierData, setHierData,
    hier2Data, setHier2Data, hier3Data, setHier3Data, excludeUdaData, setExcludeUdaData,
    allocLevelData, setAllocLevelData, allocTypeData, setAllocTypeData, contextTypeData,
    setContextTypeData, promotionData, setPromotionData, statusData, setStatusData, asnData,
    setAsnData, tsfData, setTsfData, criteriaData, setCriteriaData, totalDataCPO,
    setTotalDataCPO, itemParentData, setItemParentData, totalDataCWH, setTotalDataCWH,
    totalDataCASN, setTotalDataCASN, totalDataCTSF, setTotalDataCTSF, allocNoData,
    setAllocNoData, statusCreateData, setStatusCreateData, availQty, setAvailQty,
    availSearch, setAvailSearch, valAvailQty, setValAvailQty, openAvailDialog,
    setOpenAvailDialog, availCheck, setAvailCheck, totalAvailQty, setTotalAvailQty,
    valueSelIndCreate, setValueSelIndCreate, UpdateSelIndCreate, setUpdateSelIndCreate,
    deleteCreateGrid, setDeleteCreateGrid, isValidQtyLimits, setIsValidQtyLimits,
    inputHIER1CCommon, setInputHIER1CCommon, inputHIER2CCommon, setInputHIER2CCommon,
    inputHIER3CCommon, setInputHIER3CCommon, inputITEM_PARENTCCommon, setInputITEM_PARENTCCommon,
    valHIER1CCommon, setValHIER1CCommon, valHIER2CCommon, setValHIER2CCommon,
    valHIER3CCommon, setValHIER3CCommon, valITEM_PARENTCCommon, setValITEM_PARENTCCommon,
    inputWHCCommon, setInputWHCCommon, valWHCCommon, setValWHCCommon, inputSUPPLIERCCommon,
    setInputSUPPLIERCCommon, valSUPPLIERCCommon, setValSUPPLIERCCommon, inputSUPPLIER_SITECCommon,
    setInputSUPPLIER_SITECCommon, valSUPPLIER_SITECCommon, setValSUPPLIER_SITECCommon,
    inputPACK_NOCCommon, setInputPACK_NOCCommon, valPACK_NOCCommon, setValPACK_NOCCommon,
    inputDIFF_IDCCommon, setInputDIFF_IDCCommon, valDIFF_IDCCommon, setValDIFF_IDCCommon,
    inputSKUCCommon, setInputSKUCCommon, valSKUCCommon, setValSKUCCommon, inputITEM_LIST_NOCCommon,
    setInputITEM_LIST_NOCCommon, valITEM_LIST_NOCCommon, setValITEM_LIST_NOCCommon, inputVPNCCommon,
    setInputVPNCCommon, valVPNCCommon, setValVPNCCommon, inputUDACCommon, setInputUDACCommon,
    valUDACCommon, setValUDACCommon, inputUDA_VALUECCommon, setInputUDA_VALUECCommon,
    valUDA_VALUECCommon, setValUDA_VALUECCommon, filterUDAValueCCommon, setFilterUDAValueCCommon,
    inputEXCLUDE_UDACCommon, setInputEXCLUDE_UDACCommon, valEXCLUDE_UDACCommon, setValEXCLUDE_UDACCommon,
    filterEXCLUDE_UDAValueCCommon, setFilterEXCLUDE_UDAValueCCommon, inputEXCLUDE_UDA_VALUECCommon,
    setInputEXCLUDE_UDA_VALUECCommon, valEXCLUDE_UDA_VALUECCommon, setValEXCLUDE_UDA_VALUECCommon,
    inputPOCPO, setInputPOCPO, valPOCPO, setValPOCPO, inputPO_TYPECPO, setInputPO_TYPECPO,
    valPO_TYPECPO, setValPO_TYPECPO, inputASNCASN, setInputASNCASN, valASNCASN, setValASNCASN,
    inputTSFCTSF, setInputTSFCTSF, valTSFCTSF, setValTSFCTSF, selData, setSelData, openItem,
    setOpenItem, openDept, setOpenDept, openClass, setOpenClass, openSubclass, setOpenSubclass,
    openDiffID, setOpenDiffID, openWH, setOpenWH, initialDataCCommon, initialDataPO, initialDataWH,
    initialDataASN, initialDataTSF, initialHeaderData, options, anchorEl, setAnchorEl,
    selectedIndex, setSelectedIndex
  }
) => {

  var check = false;

  const CreateAllocationClasses = useStyles();

  const CreateAllocationData = useSelector(
    (state) => state.CreateAllocationReducers
  );

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Create Allocation';
  }, []);


  var valPost = [];

  useEffect(() => {
    setLoading(true);
    dispatch(getWarehouseRequest([{}]));
    dispatch(getSUPPLIERRequest([{}]));
    dispatch(getSUPPLIERSITERequest([{}]));
    dispatch(getPACKNORequest([{}]));
    dispatch(getDIFFRequest([{}]));
    dispatch(getSKURequest([{}]));
    dispatch(getITEM_LIST_HEADRequest([{}]));
    dispatch(getVPNRequest([{}]));
    dispatch(getUDARequest([{}]));
    dispatch(getPORequest([{}]));
    dispatch(getHIERRequest([{}]));
    dispatch(getEXCLUDEUDARequest([{}]));
    dispatch(getALLOC_LEVELRequest([{}]));
    dispatch(getALLOC_TYPERequest([{}]));
    dispatch(getCONTEXT_TYPERequest([{}]));
    dispatch(getPROMOTIONRequest([{}]));
    dispatch(getSTATUSRequest([{}]));
    dispatch(getALLOC_CRITERIARequest([{}]));
    dispatch(getITEMPARENTRequest([{}]));
    dispatch(getHIER2Request([{}]));
    dispatch(getHIER3Request([{}]));
    dispatch(getASNRequest([{}]));
    dispatch(getTSFRequest([{}]));

    setTotalData([]);
    setTotalDataCPO([]);
    setTotalDataCWH([]);
    setTotalDataCASN([]);
    setTotalDataCTSF([]);
  }, [""]);


  useEffect(() => {
    // setLoading(true);
    if (!check) {
      dispatch(getALLOCNORequest([{}]));
      check = true
    }
  }, [""]);



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


  /* 
      ####################################################
        ### Dispatch assigning the data to variables ###
      ####################################################
  */

  useEffect(() => {
    // ////////console.log("CreateAllocationData?.data?.Data:",CreateAllocationData?.data?.totalData)
    if (CreateAllocationData?.data?.totalData && Array.isArray(CreateAllocationData?.data?.totalData)) {
      // ////////console.log("CreateAllocationData?.data?.Data:",CreateAllocationData?.data?.totalData)
      setTotalData([]);
      setTotalDataCWH([]);
      setTotalDataCASN([]);
      setTotalDataCTSF([]);
      setTabledata(serializedata(CreateAllocationData?.data?.totalData));
      setAllData(serializedata(CreateAllocationData?.data?.totalData));
      setTotalData(serializedata(CreateAllocationData?.data?.totalData))
      setTotalDataCPO(serializedata(CreateAllocationData?.data?.totalData))
      setLoading(false);
      setSubmit(false);
      setSearch(false);
    }
    else if (CreateAllocationData?.data?.totalData && Array.isArray(CreateAllocationData?.data?.totalData)) {
      setTotalData([]);
      setTotalDataCPO([]);
      setTotalDataCASN([]);
      setTotalDataCTSF([]);
      setTabledata(serializedata(CreateAllocationData?.data?.totalData));
      setAllData(serializedata(CreateAllocationData?.data?.totalData));
      setTotalData(serializedata(CreateAllocationData?.data?.totalData))
      setTotalDataCWH(serializedata(CreateAllocationData?.data?.totalData))
      setLoading(false);
      setSubmit(false);
      setSearch(false);
    }
    else if (CreateAllocationData?.data?.totalData && Array.isArray(CreateAllocationData?.data?.totalData)) {
      // ////////console.log("CreateAllocationData?.data?.Data:",CreateAllocationData?.data?.totalData)
      setTotalData([]);
      setTotalDataCPO([]);
      setTotalDataCWH([]);
      setTotalDataCTSF([]);
      setTabledata(serializedata(CreateAllocationData?.data?.totalData));
      setAllData(serializedata(CreateAllocationData?.data?.totalData));
      setTotalData(serializedata(CreateAllocationData?.data?.totalData))
      setTotalDataCASN(serializedata(CreateAllocationData?.data?.totalData))
      setLoading(false);
      setSubmit(false);
      setSearch(false);
    }
    else if (CreateAllocationData?.data?.totalData && Array.isArray(CreateAllocationData?.data?.totalData)) {
      // ////////console.log("CreateAllocationData?.data?.Data:",CreateAllocationData?.data?.totalData)
      setTotalData([]);
      setTotalDataCPO([]);
      setTotalDataCWH([]);
      setTotalDataCASN([]);
      setTabledata(serializedata(CreateAllocationData?.data?.totalData));
      setAllData(serializedata(CreateAllocationData?.data?.totalData));
      setTotalData(serializedata(CreateAllocationData?.data?.totalData))
      setTotalDataCTSF(serializedata(CreateAllocationData?.data?.totalData))
      setLoading(false);
      setSubmit(false);
      setSearch(false);
    }
    else if (CreateAllocationData?.data?.warehouseData && Array.isArray(CreateAllocationData?.data?.warehouseData)
    ) {
      //////////console.log("CreateAllocationData?.data?.warehouseData:",CreateAllocationData?.data?.warehouseData)
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
      ////////console.log("CreateAllocationData?.data?.diffData:",CreateAllocationData?.data)
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
      CreateAllocationData?.data?.statusData.map((option) => { if (option.STATUS === "Worksheet") { setStatusCreateData(option) } })
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
      setAllocNoData(CreateAllocationData?.data?.allocNoData);
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
      setAvailSearch(CreateAllocationData?.data?.availSearch);
      setLoading(false);
    } else {
      setSearch(false);
    }
  }, [CreateAllocationData?.data]);

  /* 
      ##############################################
        ### Error or Success Message useEffect ###
      ##############################################
  */

  useEffect(() => {
    if (CreateAllocationData.isError) {
      setIsError(true)
      if (totalData.length === 0) {
        swal(
          <div>
            <p>{CreateAllocationData["message"]}</p>
          </div>
        )
      }
      CreateAllocationData.isError = false;
    } else if (CreateAllocationData.isSuccess) {
      setIsSuccess(true);
      if (CreateAllocationData?.data?.totalData) {
        if (CreateAllocationData?.data?.totalData?.message) {
          setHeaderDis(false);
          swal(
            <div>
              <p>{CreateAllocationData?.data?.totalData["message"]}</p>
            </div>
          )
        }
        setLoading(true);
      }

    } else {
      setIsError(false)
      setTabledata("")
    }
  }, [CreateAllocationData])

  /* 
      ################################################
        ### CSS React Multi select CSS functions ###
      ################################################
  */

  const styleSelect1 = {
    control: base => ({
      ...base,
      width: "200px",
      fontSize: "14px",
      margin: "0px 0px 10px 0px",
      borderRadius: "0",
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
    })
    ,
    dropdownIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    clearIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    valueContainer: (provided) => ({
      ...provided,
      paddingTop: '0',
      paddingBottom: '0',
    }),
    singleValue: (provided) => ({
      ...provided,
    }),
    input: (provided) => ({
      ...provided,
      width: "100%",
    }),
    option: provided => ({
      ...provided,
      fontSize: "12px",
    }),
  };

  const styleSelect2 = {
    control: base => ({
      ...base,
      width: "200px",
      fontSize: "14px",
      margin: "0px 0px 10px 0px",
      // This line disable the blue border
      borderRadius: "0",
      border: "1px solid #b22222",
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
    })
    ,
    dropdownIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    clearIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    valueContainer: (provided) => ({
      ...provided,
      paddingTop: '0',
      paddingBottom: '0',
    }),
    singleValue: (provided) => ({
      ...provided,
    }),
    input: (provided) => ({
      ...provided,
      width: "100%",
    }),
    option: provided => ({
      ...provided,
      fontSize: "12px",
    }),
  };

  /* 
      ######################################
        ### ADD Button submit function ###
      ######################################
  */

  const SubmitList = () => {
    setLoading(true);
    setTotalData([]);
    setHeaderDis(true);
    setIsValid(false);
    if (searchHeaderData["CONTEXT"] === "PROM") {
      if (searchHeaderData["ALLOC_DESC"].length === 0 || searchHeaderData["ALLOC_LEVEL"].length === 0 || searchHeaderData["RELEASE_DATE"].length === 0 || searchHeaderData["CONTEXT"].length === 0 || searchHeaderData["ALLOC_TYPE"].length === 0 || searchHeaderData["PROMOTION"].length === 0) {
        setIsError(true)
        swal(
          <div>
            <p>All fields are required in Header*</p>
          </div>
        )
        setHeaderDis(false);
        setLoading(true);
        setIsValid(true);
      }
      else {
        if (searchHeaderData.ALLOC_CRITERIA === "PURCHASE_ORDER") {
          if (
            searchDataCCommon["HIER1"].length === 0 &&
            searchDataCCommon["HIER2"].length === 0 &&
            searchDataCCommon["HIER3"].length === 0 &&
            searchDataCCommon["WH"].length === 0 &&
            searchDataCCommon["SUPPLIER"].length === 0 &&
            searchDataCCommon["SUPPLIER_SITE"].length === 0 &&
            searchDataCCommon["PACK_NO"].length === 0 &&
            searchDataCCommon["ITEM_PARENT"].length === 0 &&
            searchDataCCommon["DIFF_ID"].length === 0 &&
            searchDataCCommon["SKU"].length === 0 &&
            searchDataCCommon["ITEM_LIST_NO"].length === 0 &&
            searchDataCCommon["VPN"].length === 0 &&
            searchDataCPO["PO"].length === 0 &&
            searchDataCPO["PO_TYPE"].length === 0 &&
            searchDataCPO["ESID_FROM"].length === 0 &&
            searchDataCPO["ESID_TO"].length === 0 &&
            searchDataCPO["NOT_BEFORE_DATE_FROM"].length === 0 &&
            searchDataCPO["NOT_BEFORE_DATE_TO"].length === 0 &&
            searchDataCCommon["UDA"].length === 0 &&
            searchDataCCommon["UDA_VALUE"].length === 0 &&
            searchDataCCommon["EXCLUDE_UDA"].length === 0 &&
            searchDataCCommon["EXCLUDE_UDA_VALUE"].length === 0
          ) {
            swal(
              <div>
                <p>Give any Criteria input field*</p>
              </div>
            )
            setHeaderDis(false);
            setLoading(true);
          }
          if (
            searchDataCCommon["HIER1"].length > 0 ||
            searchDataCCommon["HIER2"].length > 0 ||
            searchDataCCommon["HIER3"].length > 0 ||
            searchDataCCommon["WH"].length > 0 ||
            searchDataCCommon["SUPPLIER"].length > 0 ||
            searchDataCCommon["SUPPLIER_SITE"].length > 0 ||
            searchDataCCommon["PACK_NO"].length > 0 ||
            searchDataCCommon["ITEM_PARENT"].length > 0 ||
            searchDataCCommon["DIFF_ID"].length > 0 ||
            searchDataCCommon["SKU"].length > 0 ||
            searchDataCCommon["ITEM_LIST_NO"].length > 0 ||
            searchDataCCommon["VPN"].length > 0 ||
            searchDataCPO["PO"].length > 0 ||
            searchDataCPO["PO_TYPE"].length > 0 ||
            searchDataCPO["ESID_FROM"].length > 0 ||
            searchDataCPO["ESID_TO"].length > 0 ||
            searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 ||
            searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0 ||
            searchDataCCommon["UDA"].length > 0 ||
            searchDataCCommon["UDA_VALUE"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA_VALUE"].length > 0) {
            if (searchDataCPO["ESID_FROM"].length > 0 && searchDataCPO["ESID_TO"].length === 0) {
              swal(
                <div>
                  <p>"ESID To is required"</p>
                </div>
              )
              setIsValidCTEDF(true);
            }
            else if (searchDataCPO["ESID_TO"].length > 0 && searchDataCPO["ESID_FROM"].length === 0) {
              swal(
                <div>
                  <p>"ESID From is required"</p>
                </div>
              )
              setIsValidCTEDT(true);
            }
            else if (searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_TO"].length === 0) {
              swal(
                <div>
                  <p>"Not Before Date To is required"</p>
                </div>
              )
              setIsValidCTNDF(true);
            }
            else if (searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_FROM"].length === 0) {
              swal(
                <div>
                  <p>"Not Before Date From is required"</p>
                </div>
              )
              setIsValidCTNDT(true);
            }
            else if ((searchDataCPO.ESID_FROM.length) > 0 && (searchDataCPO.ESID_TO.length) > 0 &&
              searchDataCPO.ESID_TO.toString().slice(8, 10) < searchDataCPO.ESID_FROM.toString().slice(8, 10)) {
              var Date_From = searchDataCPO.ESID_FROM.toString().slice(8, 10)
              var Date_To = searchDataCPO.ESID_TO.toString().slice(8, 10)
              if (Date_To < Date_From) {
                swal(
                  <div>
                    <p>ESID From is not greater than ESID To</p>
                  </div>
                )
                setIsGreatCTEDF(true);
                setIsGreatCTEDT(true);
              }
            }
            else if ((searchDataCPO.NOT_BEFORE_DATE_FROM.length) > 0 && (searchDataCPO.NOT_BEFORE_DATE_TO.length) > 0
              && searchDataCPO.NOT_BEFORE_DATE_TO.toString().slice(8, 10) < searchDataCPO.NOT_BEFORE_DATE_FROM.toString().slice(8, 10)) {
              var Date_From = searchDataCPO.NOT_BEFORE_DATE_FROM.toString().slice(8, 10)
              var Date_To = searchDataCPO.NOT_BEFORE_DATE_TO.toString().slice(8, 10)
              if (Date_To < Date_From) {
                swal(
                  <div>
                    <p>Not Before Date From is not greater than Not Before Date To</p>
                  </div>
                )
                setIsGreatCTNDF(true);
                setIsGreatCTNDT(true);
              }
            }
            else {
              if (searchHeaderData["CONTEXT"] === "PROM") {
                if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length && searchHeaderData["PROMOTION"].length) > 0) {
                  let merged = { ...searchHeaderData, ...searchDataCPO, ...searchDataCCommon }
                  dispatch(postALLOCRESULTRequest([merged]));
                  setIsValid(false);
                }
              }
              else {
                if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length) > 0) {
                  let merged = { ...searchHeaderData, ...searchDataCPO, ...searchDataCCommon }
                  dispatch(postALLOCRESULTRequest([merged]));
                  setIsValid(false);
                }
              }
            }
          }
        }

        if (searchHeaderData.ALLOC_CRITERIA === "WAREHOUSE") {
          if (
            searchDataCCommon["HIER1"].length === 0 &&
            searchDataCCommon["HIER2"].length === 0 &&
            searchDataCCommon["HIER3"].length === 0 &&
            searchDataCCommon["WH"].length === 0 &&
            searchDataCCommon["SUPPLIER"].length === 0 &&
            searchDataCCommon["SUPPLIER_SITE"].length === 0 &&
            searchDataCCommon["PACK_NO"].length === 0 &&
            searchDataCCommon["ITEM_PARENT"].length === 0 &&
            searchDataCCommon["DIFF_ID"].length === 0 &&
            searchDataCCommon["SKU"].length === 0 &&
            searchDataCCommon["ITEM_LIST_NO"].length === 0 &&
            searchDataCCommon["VPN"].length === 0 &&
            searchDataCWH["AVAIL_QTY_GREATER"].length === 0 &&
            searchDataCWH["AVAIL_QTY_LESS"].length === 0 &&
            searchDataCCommon["UDA"].length === 0 &&
            searchDataCCommon["UDA_VALUE"].length === 0 &&
            searchDataCCommon["EXCLUDE_UDA"].length === 0 &&
            searchDataCCommon["EXCLUDE_UDA_VALUE"].length === 0
          ) {
            swal(
              <div>
                <p>Give any Criteria input field*</p>
              </div>
            )
            setHeaderDis(false);
            setLoading(true);
          }
          if (
            searchDataCCommon["HIER1"].length > 0 ||
            searchDataCCommon["HIER2"].length > 0 ||
            searchDataCCommon["HIER3"].length > 0 ||
            searchDataCCommon["WH"].length > 0 ||
            searchDataCCommon["SUPPLIER"].length > 0 ||
            searchDataCCommon["SUPPLIER_SITE"].length > 0 ||
            searchDataCCommon["PACK_NO"].length > 0 ||
            searchDataCCommon["ITEM_PARENT"].length > 0 ||
            searchDataCCommon["DIFF_ID"].length > 0 ||
            searchDataCCommon["SKU"].length > 0 ||
            searchDataCCommon["ITEM_LIST_NO"].length > 0 ||
            searchDataCCommon["VPN"].length > 0 ||
            searchDataCWH["AVAIL_QTY_GREATER"].length > 0 ||
            searchDataCWH["AVAIL_QTY_LESS"].length > 0 ||
            searchDataCCommon["UDA"].length > 0 ||
            searchDataCCommon["UDA_VALUE"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA_VALUE"].length > 0
          ) {
            if (searchHeaderData["CONTEXT"] === "PROM") {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length && searchHeaderData["PROMOTION"].length) > 0) {
                let merged = { ...searchDataCWH, ...searchHeaderData, ...searchDataCCommon }
                dispatch(postALLOCRESULTCWHRequest([merged]));
                setIsValid(false);
              }
            }
            else {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length) > 0) {
                let merged = { ...searchDataCWH, ...searchHeaderData, ...searchDataCCommon }
                dispatch(postALLOCRESULTCWHRequest([merged]));
                setIsValid(false);
              }
            }
          }
        }

        if (searchHeaderData.ALLOC_CRITERIA === "ASN") {
          if (
            searchDataCCommon["HIER1"].length === 0 &&
            searchDataCCommon["HIER2"].length === 0 &&
            searchDataCCommon["HIER3"].length === 0 &&
            searchDataCCommon["WH"].length === 0 &&
            searchDataCCommon["SUPPLIER"].length === 0 &&
            searchDataCCommon["SUPPLIER_SITE"].length === 0 &&
            searchDataCCommon["PACK_NO"].length === 0 &&
            searchDataCCommon["ITEM_PARENT"].length === 0 &&
            searchDataCCommon["DIFF_ID"].length === 0 &&
            searchDataCCommon["SKU"].length === 0 &&
            searchDataCCommon["ITEM_LIST_NO"].length === 0 &&
            searchDataCCommon["VPN"].length === 0 &&
            searchDataCASN["ASN"].length === 0 &&
            searchDataCCommon["UDA"].length === 0 &&
            searchDataCCommon["UDA_VALUE"].length === 0 &&
            searchDataCCommon["EXCLUDE_UDA"].length === 0 &&
            searchDataCCommon["EXCLUDE_UDA_VALUE"].length === 0
          ) {
            swal(
              <div>
                <p>Give any Criteria input field*</p>
              </div>
            )
            setHeaderDis(false);
            setLoading(true);
          }
          if (
            searchDataCCommon["HIER1"].length > 0 ||
            searchDataCCommon["HIER2"].length > 0 ||
            searchDataCCommon["HIER3"].length > 0 ||
            searchDataCCommon["WH"].length > 0 ||
            searchDataCCommon["SUPPLIER"].length > 0 ||
            searchDataCCommon["SUPPLIER_SITE"].length > 0 ||
            searchDataCCommon["PACK_NO"].length > 0 ||
            searchDataCCommon["ITEM_PARENT"].length > 0 ||
            searchDataCCommon["DIFF_ID"].length > 0 ||
            searchDataCCommon["SKU"].length > 0 ||
            searchDataCCommon["ITEM_LIST_NO"].length > 0 ||
            searchDataCCommon["VPN"].length > 0 ||
            searchDataCASN["ASN"].length > 0 ||
            searchDataCCommon["UDA"].length > 0 ||
            searchDataCCommon["UDA_VALUE"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA_VALUE"].length > 0
          ) {
            if (searchHeaderData["CONTEXT"] === "PROM") {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length && searchHeaderData["PROMOTION"].length) > 0) {
                let merged = { ...searchDataCASN, ...searchHeaderData, ...searchDataCCommon }
                dispatch(postALLOCRESULTCASNRequest([merged]));
                setIsValid(false);
              }
            }
            else {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length) > 0) {
                let merged = { ...searchDataCASN, ...searchHeaderData, ...searchDataCCommon }
                dispatch(postALLOCRESULTCASNRequest([merged]));
                setIsValid(false);
              }
            }
          }
        }

        if (searchHeaderData.ALLOC_CRITERIA === "TRANSFER") {
          if (
            searchDataCTSF["HIER1"].length === 0 &&
            searchDataCTSF["HIER2"].length === 0 &&
            searchDataCTSF["HIER3"].length === 0 &&
            searchDataCTSF["WH"].length === 0 &&
            searchDataCTSF["SUPPLIER"].length === 0 &&
            searchDataCTSF["SUPPLIER_SITE"].length === 0 &&
            searchDataCTSF["PACK_NO"].length === 0 &&
            searchDataCTSF["ITEM_PARENT"].length === 0 &&
            searchDataCTSF["DIFF_ID"].length === 0 &&
            searchDataCTSF["SKU"].length === 0 &&
            searchDataCTSF["ITEM_LIST_NO"].length === 0 &&
            searchDataCTSF["VPN"].length === 0 &&
            searchDataCTSF["UDA"].length === 0 &&
            searchDataCTSF["TSF"].length === 0 &&
            searchDataCTSF["UDA"].length === 0 &&
            searchDataCTSF["UDA_VALUE"].length === 0 &&
            searchDataCTSF["EXCLUDE_UDA"].length === 0 &&
            searchDataCTSF["EXCLUDE_UDA_VALUE"].length === 0
          ) {
            swal(
              <div>
                <p>Give any Criteria input field*</p>
              </div>
            )
            setHeaderDis(false);
            setLoading(true);
          }
          if (
            searchDataCCommon["HIER1"].length > 0 ||
            searchDataCCommon["HIER2"].length > 0 ||
            searchDataCCommon["HIER3"].length > 0 ||
            searchDataCCommon["WH"].length > 0 ||
            searchDataCCommon["SUPPLIER"].length > 0 ||
            searchDataCCommon["SUPPLIER_SITE"].length > 0 ||
            searchDataCCommon["PACK_NO"].length > 0 ||
            searchDataCCommon["ITEM_PARENT"].length > 0 ||
            searchDataCCommon["DIFF_ID"].length > 0 ||
            searchDataCCommon["SKU"].length > 0 ||
            searchDataCCommon["ITEM_LIST_NO"].length > 0 ||
            searchDataCCommon["VPN"].length > 0 ||
            searchDataCTSF["TSF"].length > 0 ||
            searchDataCCommon["UDA"].length > 0 ||
            searchDataCCommon["UDA_VALUE"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA_VALUE"].length > 0
          ) {
            if (searchHeaderData["CONTEXT"] === "PROM") {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length && searchHeaderData["PROMOTION"].length) > 0) {
                let merged = { ...searchDataCTSF, ...searchHeaderData, ...searchDataCCommon }
                dispatch(postALLOCRESULTCTSFRequest([merged]));
                setIsValid(false);
              }
            }
            else {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length) > 0) {
                let merged = { ...searchDataCTSF, ...searchHeaderData, ...searchDataCCommon }
                dispatch(postALLOCRESULTCTSFRequest([merged]));
                setIsValid(false);
              }
            }
          }
        }
      }
    }
    else {
      if (searchHeaderData["ALLOC_DESC"].length === 0 || searchHeaderData["ALLOC_LEVEL"].length === 0 || searchHeaderData["RELEASE_DATE"].length === 0 || searchHeaderData["CONTEXT"].length === 0 || searchHeaderData["ALLOC_TYPE"].length === 0) {
        setIsError(true)
        swal(
          <div>
            <p>All fields are required in Header*</p>
          </div>
        )
        setHeaderDis(false);
        setLoading(true);
        setIsValid(true);
      }
      else {
        if (searchHeaderData.ALLOC_CRITERIA === "PURCHASE_ORDER") {
          if (
            searchDataCCommon["HIER1"].length === 0 &&
            searchDataCCommon["HIER2"].length === 0 &&
            searchDataCCommon["HIER3"].length === 0 &&
            searchDataCCommon["WH"].length === 0 &&
            searchDataCCommon["SUPPLIER"].length === 0 &&
            searchDataCCommon["SUPPLIER_SITE"].length === 0 &&
            searchDataCCommon["PACK_NO"].length === 0 &&
            searchDataCCommon["ITEM_PARENT"].length === 0 &&
            searchDataCCommon["DIFF_ID"].length === 0 &&
            searchDataCCommon["SKU"].length === 0 &&
            searchDataCCommon["ITEM_LIST_NO"].length === 0 &&
            searchDataCCommon["VPN"].length === 0 &&
            searchDataCPO["PO"].length === 0 &&
            searchDataCPO["PO_TYPE"].length === 0 &&
            searchDataCPO["ESID_FROM"].length === 0 &&
            searchDataCPO["ESID_TO"].length === 0 &&
            searchDataCPO["NOT_BEFORE_DATE_FROM"].length === 0 &&
            searchDataCPO["NOT_BEFORE_DATE_TO"].length === 0 &&
            searchDataCCommon["UDA"].length === 0 &&
            searchDataCCommon["UDA_VALUE"].length === 0 &&
            searchDataCCommon["EXCLUDE_UDA"].length === 0 &&
            searchDataCCommon["EXCLUDE_UDA_VALUE"].length === 0
          ) {
            swal(
              <div>
                <p>Give any Criteria input field*</p>
              </div>
            )
            setHeaderDis(false);
            setLoading(true);
          }
          if (
            searchDataCCommon["HIER1"].length > 0 ||
            searchDataCCommon["HIER2"].length > 0 ||
            searchDataCCommon["HIER3"].length > 0 ||
            searchDataCCommon["WH"].length > 0 ||
            searchDataCCommon["SUPPLIER"].length > 0 ||
            searchDataCCommon["SUPPLIER_SITE"].length > 0 ||
            searchDataCCommon["PACK_NO"].length > 0 ||
            searchDataCCommon["ITEM_PARENT"].length > 0 ||
            searchDataCCommon["DIFF_ID"].length > 0 ||
            searchDataCCommon["SKU"].length > 0 ||
            searchDataCCommon["ITEM_LIST_NO"].length > 0 ||
            searchDataCCommon["VPN"].length > 0 ||
            searchDataCPO["PO"].length > 0 ||
            searchDataCPO["PO_TYPE"].length > 0 ||
            searchDataCPO["ESID_FROM"].length > 0 ||
            searchDataCPO["ESID_TO"].length > 0 ||
            searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 ||
            searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0 ||
            searchDataCCommon["UDA"].length > 0 ||
            searchDataCCommon["UDA_VALUE"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA_VALUE"].length > 0) {
            if (searchDataCPO["ESID_FROM"].length > 0 && searchDataCPO["ESID_TO"].length === 0) {
              swal(
                <div>
                  <p>ESID To is required</p>
                </div>
              )
              setIsValidCTEDF(true);
            }
            else if (searchDataCPO["ESID_TO"].length > 0 && searchDataCPO["ESID_FROM"].length === 0) {
              swal(
                <div>
                  <p>ESID From is required</p>
                </div>
              )
              setIsValidCTEDT(true);
            }
            else if (searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_TO"].length === 0) {
              swal(
                <div>
                  <p>Not Before Date To is required</p>
                </div>
              )
              setIsValidCTNDF(true);
            }
            else if (searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_FROM"].length === 0) {
              swal(
                <div>
                  <p>Not Before Date From is required</p>
                </div>
              )
              setIsValidCTNDT(true);
            }
            else if ((searchDataCPO.ESID_FROM.length) > 0 && (searchDataCPO.ESID_TO.length) > 0 &&
              searchDataCPO.ESID_TO.toString().slice(8, 10) < searchDataCPO.ESID_FROM.toString().slice(8, 10)) {
              var Date_From = searchDataCPO.ESID_FROM.toString().slice(8, 10)
              var Date_To = searchDataCPO.ESID_TO.toString().slice(8, 10)
              if (Date_To < Date_From) {
                swal(
                  <div>
                    <p>ESID From is not greater than ESID To</p>
                  </div>
                )
                setIsGreatCTEDF(true);
                setIsGreatCTEDT(true);
              }
            }
            else if ((searchDataCPO.NOT_BEFORE_DATE_FROM.length) > 0 && (searchDataCPO.NOT_BEFORE_DATE_TO.length) > 0
              && searchDataCPO.NOT_BEFORE_DATE_TO.toString().slice(8, 10) < searchDataCPO.NOT_BEFORE_DATE_FROM.toString().slice(8, 10)) {
              var Date_From = searchDataCPO.NOT_BEFORE_DATE_FROM.toString().slice(8, 10)
              var Date_To = searchDataCPO.NOT_BEFORE_DATE_TO.toString().slice(8, 10)
              if (Date_To < Date_From) {
                swal(
                  <div>
                    <p>Not Before Date From is not greater than Not Before Date To</p>
                  </div>
                )
                setIsGreatCTNDF(true);
                setIsGreatCTNDT(true);
              }
            }
            else {
              if (searchHeaderData["CONTEXT"] === "PROM") {
                if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length && searchHeaderData["PROMOTION"].length) > 0) {
                  let merged = { ...searchDataCPO, ...searchHeaderData, ...searchDataCCommon }
                  dispatch(postALLOCRESULTRequest([merged]));
                  setIsValid(false);
                }
              }
              else {
                if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length) > 0) {
                  let merged = { ...searchDataCPO, ...searchHeaderData, ...searchDataCCommon }
                  dispatch(postALLOCRESULTRequest([merged]));
                  setIsValid(false);
                }
              }
            }
          }
        }

        if (searchHeaderData.ALLOC_CRITERIA === "WAREHOUSE") {
          if (
            searchDataCCommon["HIER1"].length === 0 &&
            searchDataCCommon["HIER2"].length === 0 &&
            searchDataCCommon["HIER3"].length === 0 &&
            searchDataCCommon["WH"].length === 0 &&
            searchDataCCommon["SUPPLIER"].length === 0 &&
            searchDataCCommon["SUPPLIER_SITE"].length === 0 &&
            searchDataCCommon["PACK_NO"].length === 0 &&
            searchDataCCommon["ITEM_PARENT"].length === 0 &&
            searchDataCCommon["DIFF_ID"].length === 0 &&
            searchDataCCommon["SKU"].length === 0 &&
            searchDataCCommon["ITEM_LIST_NO"].length === 0 &&
            searchDataCCommon["VPN"].length === 0 &&
            searchDataCWH["AVAIL_QTY_GREATER"].length === 0 &&
            searchDataCWH["AVAIL_QTY_LESS"].length === 0 &&
            searchDataCCommon["UDA"].length === 0 &&
            searchDataCCommon["UDA_VALUE"].length === 0 &&
            searchDataCCommon["EXCLUDE_UDA"].length === 0 &&
            searchDataCCommon["EXCLUDE_UDA_VALUE"].length === 0
          ) {
            swal(
              <div>
                <p>Give any Criteria input field*</p>
              </div>
            )
            setHeaderDis(false);
            setLoading(true);
          }
          if (
            searchDataCCommon["HIER1"].length > 0 ||
            searchDataCCommon["HIER2"].length > 0 ||
            searchDataCCommon["HIER3"].length > 0 ||
            searchDataCCommon["WH"].length > 0 ||
            searchDataCCommon["SUPPLIER"].length > 0 ||
            searchDataCCommon["SUPPLIER_SITE"].length > 0 ||
            searchDataCCommon["PACK_NO"].length > 0 ||
            searchDataCCommon["ITEM_PARENT"].length > 0 ||
            searchDataCCommon["DIFF_ID"].length > 0 ||
            searchDataCCommon["SKU"].length > 0 ||
            searchDataCCommon["ITEM_LIST_NO"].length > 0 ||
            searchDataCCommon["VPN"].length > 0 ||
            searchDataCWH["AVAIL_QTY_GREATER"].length > 0 ||
            searchDataCWH["AVAIL_QTY_LESS"].length > 0 ||
            searchDataCCommon["UDA"].length > 0 ||
            searchDataCCommon["UDA_VALUE"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA_VALUE"].length > 0
          ) {
            if (searchHeaderData["CONTEXT"] === "PROM") {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length && searchHeaderData["PROMOTION"].length) > 0) {
                let merged = { ...searchDataCWH, ...searchHeaderData, ...searchDataCCommon }
                dispatch(postALLOCRESULTCWHRequest([merged]));
                setIsValid(false);
              }
            }
            else {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length) > 0) {
                let merged = { ...searchDataCWH, ...searchHeaderData, ...searchDataCCommon }
                dispatch(postALLOCRESULTCWHRequest([merged]));
                setIsValid(false);
              }
            }
          }
        }

        if (searchHeaderData.ALLOC_CRITERIA === "ASN") {
          if (
            searchDataCCommon["HIER1"].length === 0 &&
            searchDataCCommon["HIER2"].length === 0 &&
            searchDataCCommon["HIER3"].length === 0 &&
            searchDataCCommon["WH"].length === 0 &&
            searchDataCCommon["SUPPLIER"].length === 0 &&
            searchDataCCommon["SUPPLIER_SITE"].length === 0 &&
            searchDataCCommon["PACK_NO"].length === 0 &&
            searchDataCCommon["ITEM_PARENT"].length === 0 &&
            searchDataCCommon["DIFF_ID"].length === 0 &&
            searchDataCCommon["SKU"].length === 0 &&
            searchDataCCommon["ITEM_LIST_NO"].length === 0 &&
            searchDataCCommon["VPN"].length === 0 &&
            searchDataCASN["ASN"].length === 0 &&
            searchDataCCommon["UDA"].length === 0 &&
            searchDataCCommon["UDA_VALUE"].length === 0 &&
            searchDataCCommon["EXCLUDE_UDA"].length === 0 &&
            searchDataCCommon["EXCLUDE_UDA_VALUE"].length === 0
          ) {
            swal(
              <div>
                <p>Give any Criteria input field*</p>
              </div>
            )
            setHeaderDis(false);
            setLoading(true);
          }
          if (
            searchDataCCommon["HIER1"].length > 0 ||
            searchDataCCommon["HIER2"].length > 0 ||
            searchDataCCommon["HIER3"].length > 0 ||
            searchDataCCommon["WH"].length > 0 ||
            searchDataCCommon["SUPPLIER"].length > 0 ||
            searchDataCCommon["SUPPLIER_SITE"].length > 0 ||
            searchDataCCommon["PACK_NO"].length > 0 ||
            searchDataCCommon["ITEM_PARENT"].length > 0 ||
            searchDataCCommon["DIFF_ID"].length > 0 ||
            searchDataCCommon["SKU"].length > 0 ||
            searchDataCCommon["ITEM_LIST_NO"].length > 0 ||
            searchDataCCommon["VPN"].length > 0 ||
            searchDataCASN["ASN"].length > 0 ||
            searchDataCCommon["UDA"].length > 0 ||
            searchDataCCommon["UDA_VALUE"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA_VALUE"].length > 0
          ) {
            if (searchHeaderData["CONTEXT"] === "PROM") {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length && searchHeaderData["PROMOTION"].length) > 0) {
                let merged = { ...searchDataCASN, ...searchHeaderData, ...searchDataCCommon }
                dispatch(postALLOCRESULTCASNRequest([merged]));
                setIsValid(false);
              }
            }
            else {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length) > 0) {
                let merged = { ...searchDataCASN, ...searchHeaderData, ...searchDataCCommon }
                dispatch(postALLOCRESULTCASNRequest([merged]));
                setIsValid(false);
              }
            }
          }
        }

        if (searchHeaderData.ALLOC_CRITERIA === "TRANSFER") {
          if (
            searchDataCTSF["HIER1"].length === 0 &&
            searchDataCTSF["HIER2"].length === 0 &&
            searchDataCTSF["HIER3"].length === 0 &&
            searchDataCTSF["WH"].length === 0 &&
            searchDataCTSF["SUPPLIER"].length === 0 &&
            searchDataCTSF["SUPPLIER_SITE"].length === 0 &&
            searchDataCTSF["PACK_NO"].length === 0 &&
            searchDataCTSF["ITEM_PARENT"].length === 0 &&
            searchDataCTSF["DIFF_ID"].length === 0 &&
            searchDataCTSF["SKU"].length === 0 &&
            searchDataCTSF["ITEM_LIST_NO"].length === 0 &&
            searchDataCTSF["VPN"].length === 0 &&
            searchDataCTSF["UDA"].length === 0 &&
            searchDataCTSF["TSF"].length === 0 &&
            searchDataCTSF["UDA"].length === 0 &&
            searchDataCTSF["UDA_VALUE"].length === 0 &&
            searchDataCTSF["EXCLUDE_UDA"].length === 0 &&
            searchDataCTSF["EXCLUDE_UDA_VALUE"].length === 0
          ) {
            swal(
              <div>
                <p>Give any Criteria input field*</p>
              </div>
            )
            setHeaderDis(false);
            setLoading(true);
          }
          if (
            searchDataCCommon["HIER1"].length > 0 ||
            searchDataCCommon["HIER2"].length > 0 ||
            searchDataCCommon["HIER3"].length > 0 ||
            searchDataCCommon["WH"].length > 0 ||
            searchDataCCommon["SUPPLIER"].length > 0 ||
            searchDataCCommon["SUPPLIER_SITE"].length > 0 ||
            searchDataCCommon["PACK_NO"].length > 0 ||
            searchDataCCommon["ITEM_PARENT"].length > 0 ||
            searchDataCCommon["DIFF_ID"].length > 0 ||
            searchDataCCommon["SKU"].length > 0 ||
            searchDataCCommon["ITEM_LIST_NO"].length > 0 ||
            searchDataCCommon["VPN"].length > 0 ||
            searchDataCTSF["TSF"].length > 0 ||
            searchDataCCommon["UDA"].length > 0 ||
            searchDataCCommon["UDA_VALUE"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA_VALUE"].length > 0
          ) {
            if (searchHeaderData["CONTEXT"] === "PROM") {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length && searchHeaderData["PROMOTION"].length) > 0) {
                let merged = { ...searchDataCTSF, ...searchHeaderData, ...searchDataCCommon }
                dispatch(postALLOCRESULTCTSFRequest([merged]));
                setIsValid(false);
              }
            }
            else {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length) > 0) {
                let merged = { ...searchDataCTSF, ...searchHeaderData, ...searchDataCCommon }
                dispatch(postALLOCRESULTCTSFRequest([merged]));
                setIsValid(false);
              }
            }
          }
        }
      }
    }
  }

  /* 
      ######################################
        ### Delete Button submit function ###
      ######################################
  */

  const handleDelete = () => {
    const id = selected;
    const data = [...totalData];
    const updatedTable = data.filter((val) => {
      return !id.includes(val.SR_NO);
    });
    setTabledata(updatedTable)
    setTotalData(updatedTable)
    dispatch(getDELETECREATEGRIDRequest(selData));
    setSelected([]);
    setSelData([]);
  };

  /* 
      ###################################
        ### Criteria Menu functions ###
      ###################################
  */

  const open = Boolean(anchorEl);

  const handleClickListItem = (event) => {
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
    setTotalDataCPO([]);
    setTotalDataCWH([]);
    setTotalDataCASN([]);
    setTotalDataCTSF([]);

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
    setInputITEM_LIST_NOCCommon("");
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
    setValITEM_LIST_NOCCommon([]);
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

  /* 
      ################################################
        ### TableCell and TableRow CSS functions ###
      ################################################
  */

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.root}`]: {
      height: "30px",
      padding: 0,
    },
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "DodgerBlue",
      color: theme.palette.common.black,
      fontSize: 14,
      textAlign: "left"
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
      textAlign: "left"
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    root: {
      height: "30px",
    },
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  /* 
      ######################################
        ### TextField Values functions ###
      ######################################
  */

  const onChange = (e) => {
    setSearchHeaderData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onChangeCPO = (e) => {
    setSearchDataCPO((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onChangeCWH = (e) => {
    setSearchDataCWH((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  /* 
      #########################################
        ### Single React select functions ###
      #########################################
  */

  const selectALLOC_LEVEL = (val) => {
    if (val) {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          ALLOC_LEVEL: val.CODE,
          ALLOC_LEVEL_CODE: val.ALLOC_LEVEL
        };
      });
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

  /* 
      #########################################
        ### Multi React select functions ###
      #########################################
  */

  const selectHIER1 = (event, value) => {
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
      valHIER1CCommon.splice(index, 1);
    } else if (value.action === "clear") {
      valHIER1CCommon.splice(0, valHIER1CCommon.length);
    }

    if (event === 0) {
      valHIER1CCommon.push(value)
    }

    if (valHIER1CCommon.length > 0 && typeof valHIER1CCommon[0]['HIER1'] !== "undefined") {
      valHIER1CCommon.map(
        (item) => {
          selectedHIER1.push(item.HIER1);
        }
      )
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          HIER1: selectedHIER1,
        };
      });

      if (valHIER1CCommon.length > 0 || valHIER2CCommon.length > 0 || valHIER3CCommon.length > 0 || valITEM_PARENTCCommon.length > 0 || valPACK_NOCCommon.length > 0 || valSKUCCommon.length > 0 || valDIFF_IDCCommon.length > 0 || valVPNCCommon.length > 0 || valUDACCommon.length > 0) {
        valPost = [...valHIER1CCommon, ...valHIER2CCommon, ...valHIER3CCommon, ...valITEM_PARENTCCommon, ...valPACK_NOCCommon, ...valSKUCCommon, ...valDIFF_IDCCommon, ...valVPNCCommon, ...valUDACCommon]
        dispatch(getHIER2Request(valPost));
        dispatch(getHIER3Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
        dispatch(getTSFRequest(valPost));
      } else {
        valPost = [...valHIER1CCommon]
        dispatch(getHIER3Request(valPost));
        dispatch(getHIER2Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
        dispatch(getTSFRequest(valPost));
      }
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid HIER1"}</p>
        </div>
      )
    } else {
      initialDataPO.HIER1 = "";
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          HIER1: [],
        };
      });
      if (valHIER1CCommon.length > 0 || valHIER2CCommon.length > 0 || valHIER3CCommon.length > 0 || valITEM_PARENTCCommon.length > 0 || valPACK_NOCCommon.length > 0 || valSKUCCommon.length > 0 || valDIFF_IDCCommon.length > 0 || valVPNCCommon.length > 0 || valUDACCommon.length > 0) {
        valPost = [...valHIER1CCommon, ...valHIER2CCommon, ...valHIER3CCommon, ...valITEM_PARENTCCommon, ...valPACK_NOCCommon, ...valSKUCCommon, ...valDIFF_IDCCommon, ...valVPNCCommon, ...valUDACCommon]
        dispatch(getHIER2Request(valPost));
        dispatch(getHIER3Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
        dispatch(getTSFRequest(valPost));
      } else {
        dispatch(getHIER2Request([{}]));
        dispatch(getHIER3Request([{}]));
        dispatch(getITEMPARENTRequest([{}]));
        dispatch(getPACKNORequest([{}]));
        dispatch(getSKURequest([{}]));
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
        dispatch(getASNRequest([{}]));
        dispatch(getTSFRequest([{}]));
      }
    }
  }


  const selectHIER2 = (event, value) => {
    let selectedHIER2 = [];
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
      valHIER2CCommon.splice(index, 1);
    } else if (value.action === "clear") {
      valHIER2CCommon.splice(0, valHIER2CCommon.length);
    }
    if (event === 0) {
      valHIER2CCommon.push(value)
    }
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
      if (valHIER1CCommon.length > 0 || valHIER2CCommon.length > 0 || valHIER3CCommon.length > 0 || valITEM_PARENTCCommon.length > 0 || valPACK_NOCCommon.length > 0 || valSKUCCommon.length > 0 || valDIFF_IDCCommon.length > 0 || valVPNCCommon.length > 0 || valUDACCommon.length > 0) {
        valPost = [...valHIER1CCommon, ...valHIER2CCommon, ...valHIER3CCommon, ...valITEM_PARENTCCommon, ...valPACK_NOCCommon, ...valSKUCCommon, ...valDIFF_IDCCommon, ...valVPNCCommon, ...valUDACCommon]
        dispatch(getHIER3Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
        dispatch(getTSFRequest(valPost));
      } else {
        valPost = [...valHIER2CCommon]
        dispatch(getHIER3Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
        dispatch(getTSFRequest(valPost));
      }
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid HIER2"}</p>
        </div>
      )
    } else {
      initialDataPO.HIER2 = "";
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          HIER2: [],
        };
      });
      if (valHIER1CCommon.length > 0 || valHIER2CCommon.length > 0 || valHIER3CCommon.length > 0 || valITEM_PARENTCCommon.length > 0 || valPACK_NOCCommon.length > 0 || valSKUCCommon.length > 0 || valDIFF_IDCCommon.length > 0 || valVPNCCommon.length > 0 || valUDACCommon.length > 0) {
        valPost = [...valHIER1CCommon, ...valHIER2CCommon, ...valHIER3CCommon, ...valITEM_PARENTCCommon, ...valPACK_NOCCommon, ...valSKUCCommon, ...valDIFF_IDCCommon, ...valVPNCCommon, ...valUDACCommon]
        dispatch(getHIER3Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
        dispatch(getTSFRequest(valPost));
      } else {
        dispatch(getHIER3Request([{}]));
        dispatch(getITEMPARENTRequest([{}]));
        dispatch(getPACKNORequest([{}]));
        dispatch(getSKURequest([{}]));
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
        dispatch(getASNRequest([{}]));
        dispatch(getTSFRequest([{}]));
      }
    }
  }


  const selectHIER3 = (event, value) => {
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
      valHIER3CCommon.splice(index, 1);
    } else if (value.action === "clear") {
      valHIER3CCommon.splice(0, valHIER3CCommon.length);
    }
    if (event === 0) {
      valHIER3CCommon.push(value)
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

      if (valHIER1CCommon.length > 0 || valHIER2CCommon.length > 0 || valHIER3CCommon.length > 0 || valITEM_PARENTCCommon.length > 0 || valPACK_NOCCommon.length > 0 || valSKUCCommon.length > 0 || valDIFF_IDCCommon.length > 0 || valVPNCCommon.length > 0 || valUDACCommon.length > 0) {
        valPost = [...valHIER1CCommon, ...valHIER2CCommon, ...valHIER3CCommon, ...valITEM_PARENTCCommon, ...valPACK_NOCCommon, ...valSKUCCommon, ...valDIFF_IDCCommon, ...valVPNCCommon, ...valUDACCommon]
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
        dispatch(getTSFRequest(valPost));
      } else {
        valPost = [...valHIER3CCommon]
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
        dispatch(getTSFRequest(valPost));
      }

    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid HIER3"}</p>
        </div>
      )
    } else {
      initialDataPO.HIER3 = "";
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          HIER3: [],
        };
      });
      if (valHIER1CCommon.length > 0 || valHIER2CCommon.length > 0 || valHIER3CCommon.length > 0 || valITEM_PARENTCCommon.length > 0 || valPACK_NOCCommon.length > 0 || valSKUCCommon.length > 0 || valDIFF_IDCCommon.length > 0 || valVPNCCommon.length > 0 || valUDACCommon.length > 0) {
        valPost = [...valHIER1CCommon, ...valHIER2CCommon, ...valHIER3CCommon, ...valITEM_PARENTCCommon, ...valPACK_NOCCommon, ...valSKUCCommon, ...valDIFF_IDCCommon, ...valVPNCCommon, ...valUDACCommon]
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
        dispatch(getTSFRequest(valPost));
      } else {
        dispatch(getITEMPARENTRequest([{}]));
        dispatch(getPACKNORequest([{}]));
        dispatch(getSKURequest([{}]));
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
        dispatch(getASNRequest([{}]));
        dispatch(getTSFRequest([{}]));
      }
    }
  }


  const selectITEM_PARENT = (event, value) => {
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
      valITEM_PARENTCCommon.splice(index, 1);
    } else if (value.action === "clear") {
      valITEM_PARENTCCommon.splice(0, valITEM_PARENTCCommon.length);
    }
    if (event === 0) {
      valITEM_PARENTCCommon.push(value)
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
      if (valHIER1CCommon.length > 0 || valHIER2CCommon.length > 0 || valHIER3CCommon.length > 0 || valITEM_PARENTCCommon.length > 0 || valPACK_NOCCommon.length > 0 || valSKUCCommon.length > 0 || valDIFF_IDCCommon.length > 0 || valVPNCCommon.length > 0 || valUDACCommon.length > 0) {
        valPost = [...valHIER1CCommon, ...valHIER2CCommon, ...valHIER3CCommon, ...valITEM_PARENTCCommon, ...valPACK_NOCCommon, ...valSKUCCommon, ...valDIFF_IDCCommon, ...valVPNCCommon, ...valUDACCommon]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getASNRequest(valPost));
        dispatch(getTSFRequest(valPost));

      } else {
        valPost = [...valITEM_PARENTCCommon]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getASNRequest(valPost));
        dispatch(getTSFRequest(valPost));
      }

    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid ITEM_PARENT"}</p>
        </div>
      )
    } else {
      initialDataPO.ITEM_PARENT = "";
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          ITEM_PARENT: [],
        };
      });
      if (valHIER1CCommon.length > 0 || valHIER2CCommon.length > 0 || valHIER3CCommon.length > 0 || valITEM_PARENTCCommon.length > 0 || valPACK_NOCCommon.length > 0 || valSKUCCommon.length > 0 || valDIFF_IDCCommon.length > 0 || valVPNCCommon.length > 0 || valUDACCommon.length > 0) {
        valPost = [...valHIER1CCommon, ...valHIER2CCommon, ...valHIER3CCommon, ...valITEM_PARENTCCommon, ...valPACK_NOCCommon, ...valSKUCCommon, ...valDIFF_IDCCommon, ...valVPNCCommon, ...valUDACCommon]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getASNRequest(valPost));
        dispatch(getTSFRequest(valPost));
      } else {
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
        dispatch(getPACKNORequest([{}]));
        dispatch(getASNRequest([{}]));
        dispatch(getTSFRequest([{}]));
      }
    }
  }


  const selectWH = (event, value) => {
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
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid WH"}</p>
        </div>
      )
    } else {
      initialDataPO.WH = "";
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          WH: [],
        };
      });
    }
  }


  const selectSUPPLIER = (event, value) => {
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
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid SUPPLIER"}</p>
        </div>
      )
    } else {
      initialDataPO.SUPPLIER = "";
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          SUPPLIER: [],
        };
      });
    }
  }


  const selectSUPPLIER_SITE = (event, value) => {
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
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid SUPPLIER_SITE"}</p>
        </div>
      )
    } else {
      initialDataPO.SUPPLIER_SITE = "";
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          SUPPLIER_SITE: [],
        };
      });
    }
  }


  const selectPACK_NO = (event, value) => {
    let selectedPACK_NO = [];
    if (value.option) {
      valPACK_NOCCommon.push(value.option);
      if (String(value.option.PACK_NO).includes(inputPACK_NOCCommon)) {
        setInputPACK_NOCCommon("");
      }
      if (String(value.option.PACK_NO).substring(inputPACK_NOCCommon)) {
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
      if (valHIER1CCommon.length > 0 || valHIER2CCommon.length > 0 || valHIER3CCommon.length > 0 || valITEM_PARENTCCommon.length > 0 || valPACK_NOCCommon.length > 0 || valSKUCCommon.length > 0 || valDIFF_IDCCommon.length > 0 || valVPNCCommon.length > 0 || valUDACCommon.length > 0) {
        valPost = [...valHIER1CCommon, ...valHIER2CCommon, ...valHIER3CCommon, ...valITEM_PARENTCCommon, ...valPACK_NOCCommon, ...valSKUCCommon, ...valDIFF_IDCCommon, ...valVPNCCommon, ...valUDACCommon]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
        dispatch(getTSFRequest(valPost));
      } else {
        valPost = [...valPACK_NOCCommon]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
        dispatch(getTSFRequest(valPost));
      }

    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid PACK_NO"}</p>
        </div>
      )
    } else {
      initialDataPO.PACK_NO = "";
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          PACK_NO: [],
        };
      });
      if (valHIER1CCommon.length > 0 || valHIER2CCommon.length > 0 || valHIER3CCommon.length > 0 || valITEM_PARENTCCommon.length > 0 || valPACK_NOCCommon.length > 0 || valSKUCCommon.length > 0 || valDIFF_IDCCommon.length > 0 || valVPNCCommon.length > 0 || valUDACCommon.length > 0) {
        valPost = [...valHIER1CCommon, ...valHIER2CCommon, ...valHIER3CCommon, ...valITEM_PARENTCCommon, ...valPACK_NOCCommon, ...valSKUCCommon, ...valDIFF_IDCCommon, ...valVPNCCommon, ...valUDACCommon]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
        dispatch(getTSFRequest(valPost));
      } else {
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
        dispatch(getASNRequest([{}]));
        dispatch(getTSFRequest([{}]));
      }
    }
  }


  const selectDIFF_ID = (event, value) => {
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
      valDIFF_IDCCommon.splice(index, 1);
    } else if (value.action === "clear") {
      valDIFF_IDCCommon.splice(0, valDIFF_IDCCommon.length);
    }
    if (event === 0) {
      valDIFF_IDCCommon.push(value)
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
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid DIFF_ID"}</p>
        </div>
      )
    } else {
      initialDataPO.DIFF_ID = "";
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          DIFF_ID: [],
        };
      });
    }
  }


  const selectSKU = (event, value) => {
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
      valSKUCCommon.splice(index, 1);
    } else if (value.action === "clear") {
      valSKUCCommon.splice(0, valSKUCCommon.length);
    }
    if (event === 0) {
      valSKUCCommon.push(value)
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
      if (valHIER1CCommon.length > 0 || valHIER2CCommon.length > 0 || valHIER3CCommon.length > 0 || valITEM_PARENTCCommon.length > 0 || valPACK_NOCCommon.length > 0 || valSKUCCommon.length > 0 || valDIFF_IDCCommon.length > 0 || valVPNCCommon.length > 0 || valUDACCommon.length > 0) {
        valPost = [...valHIER1CCommon, ...valHIER2CCommon, ...valHIER3CCommon, ...valITEM_PARENTCCommon, ...valPACK_NOCCommon, ...valSKUCCommon, ...valDIFF_IDCCommon, ...valVPNCCommon, ...valUDACCommon]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
        dispatch(getTSFRequest(valPost));
      } else {
        valPost = [...valSKUCCommon]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
        dispatch(getTSFRequest(valPost));

      }
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid SKU"}</p>
        </div>
      )
    } else {
      initialDataPO.SKU = "";
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          SKU: [],
        };
      });
      if (valHIER1CCommon.length > 0 || valHIER2CCommon.length > 0 || valHIER3CCommon.length > 0 || valITEM_PARENTCCommon.length > 0 || valPACK_NOCCommon.length > 0 || valSKUCCommon.length > 0 || valDIFF_IDCCommon.length > 0 || valVPNCCommon.length > 0 || valUDACCommon.length > 0) {
        valPost = [...valHIER1CCommon, ...valHIER2CCommon, ...valHIER3CCommon, ...valITEM_PARENTCCommon, ...valPACK_NOCCommon, ...valSKUCCommon, ...valDIFF_IDCCommon, ...valVPNCCommon, ...valUDACCommon]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
        dispatch(getTSFRequest(valPost));
      } else {
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
        dispatch(getASNRequest([{}]));
        dispatch(getTSFRequest([{}]));
      }
    }
  }


  const selectITEM_LIST_NO = (event, value) => {
    let selectedITEM_LIST_NO = [];
    if (value.option) {
      valITEM_LIST_NOCCommon.push(value.option);
      if (String(value.option.ITEM_LIST_NO).includes(inputITEM_LIST_NOCCommon)) {
        setInputITEM_LIST_NOCCommon("");
      }
      if (String(value.option.ITEM_LIST_NO).substring(inputITEM_LIST_NOCCommon)) {
        setInputITEM_LIST_NOCCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valITEM_LIST_NOCCommon.length; i++) {
        if (valITEM_LIST_NOCCommon[i]["ITEM_LIST_NO"] === value.removedValue.ITEM_LIST_NO) {
          index = i;
          break;
        }
      }
      valITEM_LIST_NOCCommon.splice(index, 1);
    } else if (value.action === "clear") {
      valITEM_LIST_NOCCommon.splice(0, valITEM_LIST_NOCCommon.length);
    }
    if (event === 0) {
      valITEM_LIST_NOCCommon.push(value)
    }
    if (valITEM_LIST_NOCCommon.length > 0 && typeof valITEM_LIST_NOCCommon[0]['ITEM_LIST_NO'] !== "undefined") {
      valITEM_LIST_NOCCommon.map(
        (item) => {
          selectedITEM_LIST_NO.push(item.ITEM_LIST_NO);
        }
      )
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          ITEM_LIST_NO: selectedITEM_LIST_NO,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid ITEM_LIST_NO"}</p>
        </div>
      )
    } else {
      initialDataPO.ITEM_LIST_NO = "";
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          ITEM_LIST_NO: [],
        };
      });
    }
  }


  const selectVPN = (event, value) => {
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
    if (event === 0) {
      valVPNCCommon.push(value)
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
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid VPN"}</p>
        </div>
      )
    } else {
      initialDataPO.VPN = "";
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          VPN: [],
        };
      });
    }
  }


  const selectPO = (event, value) => {
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
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          PO: selectedPO,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid PO"}</p>
        </div>
      )
    } else {
      initialDataPO.PO = "";
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          PO: [],
        };
      });
    }
  }


  const selectPO_TYPE = (event, value) => {
    let selectedPO_TYPE = [];
    if (value.option) {
      valPO_TYPECPO.push(value.option);
      if (String(value.option.PO_TYPE).substring(inputPO_TYPECPO)) {
        setInputPO_TYPECPO("");
      }
      if (String(value.option.PO_TYPE).includes(inputPO_TYPECPO)) {
        setInputPO_TYPECPO("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valPO_TYPECPO.length; i++) {
        if (valPO_TYPECPO[i]["PO_TYPE"] === value.removedValue.PO_TYPE) {
          index = i;
          break;
        }
      }
      valPO_TYPECPO.splice(index, 1);
    } else if (value.action === "clear") {
      valPO_TYPECPO.splice(0, valPO_TYPECPO.length);
    }
    if (event === 0) {
      valPO_TYPECPO.push(value)
    }
    if (valPO_TYPECPO.length > 0 && typeof valPO_TYPECPO[0]['PO_TYPE'] !== "undefined") {
      valPO_TYPECPO.map(
        (item) => {
          selectedPO_TYPE.push(item.PO_TYPE);
        }
      )
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          PO_TYPE: selectedPO_TYPE,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid PO_TYPE"}</p>
        </div>
      )
    } else {
      initialDataPO.PO_TYPE = "";
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          PO_TYPE: [],
        };
      });
    }
  }


  const selectUDA = (e, value) => {
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
    }
    if (e === 0) {
      valUDACCommon.push(value)
    }
    if (valUDACCommon.length > 0) {
      const filterUDAValueCCommon = udaData.filter((item) => {
        return (valUDACCommon).some((val) => {
          return item.UDA === val.UDA;
        });
      });
      setFilterUDAValueCCommon(filterUDAValueCCommon);
      valUDACCommon.map((item) => {
        selectedUDA.push(item.UDA);
      });
      if (e !== "Filter") {
        setSearchDataCCommon((prev) => {
          return {
            ...prev,
            UDA: selectedUDA,
          };
        });
      }
      var filter_rem1 = selectedUDA.filter(function (i) {
        return this.indexOf(i) < 0;
      },
        searchDataCCommon.UDA)

      var filter_rem2 = searchDataCCommon.UDA.filter(function (i) {
        return this.indexOf(i) < 0;
      },
        selectedUDA)
      if (filter_rem1.length > 0 || filter_rem2.length > 0) {
        var temp = [];
        filter_rem1.length > 0 ? temp = [...filter_rem1] : temp = [...filter_rem2]
        for (var i = 0; i < temp.length; i++) {
          const index = searchDataCCommon.UDA.indexOf(temp[i]);
          if (index > -1) {
            searchDataCCommon.UDA.splice(index, 1);
          }
        }
      }
    } else {
      setFilterUDAValueCCommon([]);
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          UDA: []
        };
      });
    }
  }


  const selectUDA_VALUE = (e, value) => {
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
    if (e === 0) {
      valUDA_VALUECCommon.push(value);
    }
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
    } else {
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          UDA_VALUE: selectedUDA_VALUE,
        };
      });
    }
  }


  const selectEXCLUDE_UDA = (e, value) => {
    if (e === "Filter") {
      valEXCLUDE_UDACCommon.splice(0, valEXCLUDE_UDACCommon.length);
      valEXCLUDE_UDACCommon.push(...value);
    }

    let selectedEXCLUDE_UDA = [];
    if (value.option) {
      valEXCLUDE_UDACCommon.push(value.option)
      if (String(value.option.EXCLUDE_UDA).includes(inputEXCLUDE_UDACCommon)) {
        setInputEXCLUDE_UDACCommon("");
      }
      if (String(value.option.EXCLUDE_UDA).substring(inputEXCLUDE_UDACCommon)) {
        setInputEXCLUDE_UDACCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valEXCLUDE_UDACCommon.length; i++) {
        if (valEXCLUDE_UDACCommon[i]["EXCLUDE_UDA"] === value.removedValue.EXCLUDE_UDA) {
          index = i;
          break;
        }
      }
      valEXCLUDE_UDACCommon.splice(index, 1);

    } else if (value.action === "clear") {
      valEXCLUDE_UDACCommon.splice(0, valEXCLUDE_UDACCommon.length);
      valEXCLUDE_UDA_VALUECCommon.splice(0, valEXCLUDE_UDA_VALUECCommon.length);
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          EXCLUDE_UDA_VALUE: [],
        };

      });
    }
    if (e === 0) {
      valEXCLUDE_UDACCommon.push(value)
    }
    if (valEXCLUDE_UDACCommon.length > 0) {
      const filterEXCLUDE_UDAValueCCommon = excludeUdaData.filter((item) => {
        return (valEXCLUDE_UDACCommon).some((val) => {
          return item.EXCLUDE_UDA === val.EXCLUDE_UDA;
        });
      });
      setFilterEXCLUDE_UDAValueCCommon(filterEXCLUDE_UDAValueCCommon);
      valEXCLUDE_UDACCommon.map((item) => {
        selectedEXCLUDE_UDA.push(item.EXCLUDE_UDA);
      });
      if (e !== "Filter") {
        setSearchDataCCommon((prev) => {
          return {
            ...prev,
            EXCLUDE_UDA: selectedEXCLUDE_UDA,
          };
        });
      }
      var filter_rem1 = selectedEXCLUDE_UDA.filter(function (i) {
        return this.indexOf(i) < 0;
      },
        searchDataCCommon.EXCLUDE_UDA)

      var filter_rem2 = searchDataCCommon.EXCLUDE_UDA.filter(function (i) {
        return this.indexOf(i) < 0;
      },
        selectedEXCLUDE_UDA)
      if (filter_rem1.length > 0 || filter_rem2.length > 0) {
        var temp = [];
        filter_rem1.length > 0 ? temp = [...filter_rem1] : temp = [...filter_rem2]
        for (var i = 0; i < temp.length; i++) {
          const index = searchDataCCommon.EXCLUDE_UDA.indexOf(temp[i]);
          if (index > -1) {
            searchDataCCommon.EXCLUDE_UDA.splice(index, 1);
          }
        }
      }
    } else {
      setFilterEXCLUDE_UDAValueCCommon([]);
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          EXCLUDE_UDA: []
        };
      });
    }
  }


  const selectEXCLUDE_UDA_VALUE = (e, value) => {
    let selectedEXCLUDE_UDA_VALUE = [];
    if (value.option) {
      valEXCLUDE_UDA_VALUECCommon.push(value.option)
      if (String(value.option.EXCLUDE_UDA_VALUE).includes(inputEXCLUDE_UDA_VALUECCommon)) {
        setInputEXCLUDE_UDA_VALUECCommon("");
      }
      if (String(value.option.EXCLUDE_UDA_VALUE).substring(inputEXCLUDE_UDA_VALUECCommon)) {
        setInputEXCLUDE_UDA_VALUECCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valEXCLUDE_UDA_VALUECCommon.length; i++) {
        if (valEXCLUDE_UDA_VALUECCommon[i]["EXCLUDE_UDA_VALUE"] === value.removedValue.EXCLUDE_UDA_VALUE) {
          index = i;
          break;
        }
      }
      valEXCLUDE_UDA_VALUECCommon.splice(index, 1);

    } else if (value.action === "clear") {
      valEXCLUDE_UDA_VALUECCommon.splice(0, valEXCLUDE_UDA_VALUECCommon.length);
    }
    if (e === 0) {
      valEXCLUDE_UDA_VALUECCommon.push(value);
    }
    if (valEXCLUDE_UDA_VALUECCommon.length > 0) {

      valEXCLUDE_UDA_VALUECCommon.map((item) => {
        selectedEXCLUDE_UDA_VALUE.push(item.EXCLUDE_UDA_VALUE);
      });
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          EXCLUDE_UDA_VALUE: selectedEXCLUDE_UDA_VALUE,
        };
      });
    } else {
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          EXCLUDE_UDA_VALUE: selectedEXCLUDE_UDA_VALUE,
        };
      });
    }
  }


  const selectASNCASN = (event, value) => {
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
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          ASN: selectedASN,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid ASN"}</p>
        </div>
      )
    } else {
      initialDataASN.ASN = "";
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          ASN: [],
        };
      });
    }
  }


  const selectTSFCTSF = (event, value) => {
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
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          TSF: selectedTSF,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid TSF"}</p>
        </div>
      )
    } else {
      initialDataTSF.TSF = "";
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          TSF: [],
        };
      });
    }
  }

  /* 
      #########################################################################
        ### Dialog box and Info Button functions for Available Qty Screen ###
      #########################################################################
  */

  /**** Dialog box for Item TextField ****/
  const handleClickOpenItem = () => {
    setOpenItem(true);
  };
  const handleCloseItem = () => {
    setOpenItem(false);
  };

  const SearchGridAvailITEM = () => (
    <IconButton sx={{ padding: "0px", margin: "0px", border: 0, borderRadius: 0 }} size="small">
      <InfoIcon onClick={handleClickOpenItem} size="small" variant="outlined" sx={{ height: '0.7em', width: '0.7em', color: "CadetBlue" }} />
    </IconButton>
  )

  /**** Dialog box for Dept TextField ****/
  const handleClickOpenDept = () => {
    setOpenDept(true);
  };
  const handleCloseDept = () => {
    setOpenDept(false);
  };

  const SearchGridAvailDept = () => (
    <IconButton sx={{ padding: "0px", margin: "0px", border: 0, borderRadius: 0 }} size="small">
      <InfoIcon onClick={handleClickOpenDept} size="small" variant="outlined" sx={{ height: '0.7em', width: '0.7em', color: "CadetBlue" }} />
    </IconButton>
  )

  /**** Dialog box for Class TextField ****/
  const handleClickOpenClass = () => {
    setOpenClass(true);
  };
  const handleCloseClass = () => {
    setOpenClass(false);
  };

  const SearchGridAvailClass = () => (
    <IconButton sx={{ padding: "0px", margin: "0px", border: 0, borderRadius: 0 }} size="small">
      <InfoIcon onClick={handleClickOpenClass} size="small" variant="outlined" sx={{ height: '0.7em', width: '0.7em', color: "CadetBlue" }} />
    </IconButton>
  )

  /**** Dialog box for Subclass TextField ****/
  const handleClickOpenSubclass = () => {
    setOpenSubclass(true);
  };
  const handleCloseSubclass = () => {
    setOpenSubclass(false);
  };

  const SearchGridAvailSubclass = () => (
    <IconButton sx={{ padding: "0px", margin: "0px", border: 0, borderRadius: 0 }} size="small">
      <InfoIcon onClick={handleClickOpenSubclass} size="small" variant="outlined" sx={{ height: '0.7em', width: '0.7em', color: "CadetBlue" }} />
    </IconButton>
  )


  /**** Dialog box for DiffID TextField ****/
  const handleClickOpenDiffID = () => {
    setOpenDiffID(true);
  };
  const handleCloseDiffID = () => {
    setOpenDiffID(false);
  };

  const SearchGridAvailDiffID = () => (
    <IconButton sx={{ padding: "0px", margin: "0px", border: 0, borderRadius: 0 }} size="small">
      <InfoIcon onClick={handleClickOpenDiffID} size="small" variant="outlined" sx={{ height: '0.7em', width: '0.7em', color: "CadetBlue" }} />
    </IconButton>
  )


  /**** Dialog box for Warehouse TextField ****/
  const handleClickOpenWH = () => {
    setOpenWH(true);
  };
  const handleCloseWH = () => {
    setOpenWH(false);
  };

  const SearchGridAvailWH = () => (
    <IconButton sx={{ padding: "0px", margin: "0px", border: 0, borderRadius: 0 }} size="small">
      <InfoIcon onClick={handleClickOpenWH} size="small" variant="outlined" sx={{ height: '0.7em', width: '0.7em', color: "CadetBlue" }} />
    </IconButton>
  )

  /* 
      ###################################
        ### HTML Header functions ###
      ###################################
  */

  const SearchHeader = () => (
    <Box
      component="fieldset"
      display="inline-block"
      sx={{
        backgroundColor: "",
        height: "auto",
        width: "100%",
        borderRadius: 1,

        boxShadow: 2, border: 0,
        borderBottom: 3,
        border: "1px solid lightgrey",
      }}
    >
      <legend style={{ fontWeight: "bold" }}>Header</legend>

      <div className={CreateAllocationClasses.header_container}>
        <div className={CreateAllocationClasses.header_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Allocation ID</InputLabel>
          </div>
          <div>
            <TextField
              size="small"
              sx={{
                margin: "0px 0px 10px 2px", width: "200px"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "#f0f0f0"
                }
              }}
              disabled
              name="ALLOC_NO"
              value={searchHeaderData.ALLOC_NO = allocNoData["ALLOC_NO"]}
              id="outlined-disabled"
              defaultValue={allocNoData["ALLOC_NO"]}
              InputProps={{
                style: { fontSize: 12 },
                className: CreateAllocationClasses.input,
              }}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.header_child}>
          <div>
            {(isValid && searchHeaderData.ALLOC_DESC.length === 0) ?
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left', color: "#b22222" }}>
                Desc*</InputLabel> :
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                Desc</InputLabel>}
          </div>
          <div>
            <TextField
              size="small"
              sx={{
                margin: "0px 0px 10px 2px", width: "30vh"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "#f0f0f0"
                },

              }}
              id="outlined-disabled"
              name="ALLOC_DESC"
              autoComplete='off'
              value={searchHeaderData.ALLOC_DESC}
              defaultValue=""
              onChange={onChange}
              inputProps={{
                maxLength: 100,
              }}
              required
              InputProps={{
                endAdornment: <SearchButtonTrend />,
                className: CreateAllocationClasses.input,
                style: { fontSize: 12 },

              }}
              disabled={headerDis || !searchHeaderData.ALLOC_NO}
              error={searchHeaderData.ALLOC_DESC.length === 0 && isValid}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.header_child}>
          <div>
            {(isValid && searchHeaderData.CONTEXT.length === 0) ?
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left', color: "#b22222" }}>
                Context Type*</InputLabel> :
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                Context Type</InputLabel>}
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.CONTEXT.toString()}`}
              getOptionValue={option => option.CONTEXT}
              options={contextTypeData.length > 0 ? contextTypeData : []}
              isSearchable={true}
              onChange={selectCONTEXT_TYPE}
              maxMenuHeight={180}
              styles={(isValid && searchHeaderData.CONTEXT.length === 0) ? styleSelect2 : styleSelect1}
              components={animatedComponents}
              value={contextTypeData.filter(obj => searchHeaderData?.CONTEXT_CODE === (obj.CONTEXT))}
              closeMenuOnSelect={true}
              isDisabled={headerDis || !searchHeaderData.ALLOC_NO}
              theme={(isValid && searchHeaderData.CONTEXT.length === 0) ? theme => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  neutral50: '#b22222',
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
                  <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left', color: "#b22222" }}>
                    Promotion*</InputLabel> :
                  <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                    Promotion</InputLabel>}
              </div>
              <div className={CreateAllocationClasses.multiselectfield}>
                <Select
                  classNamePrefix="mySelect"
                  getOptionLabel={option =>
                    `${option.PROMOTION.toString()} -${option.DESCRIPTION.toString()} (${option.START_DATE.toString()})-(${option.END_DATE.toString()})`}
                  getOptionValue={option => option.PROMOTION}
                  options={promotionData.length > 0 ? promotionData : []}
                  isSearchable={true}
                  onChange={selectPROMOTION}
                  maxMenuHeight={180}
                  styles={(isValid && searchHeaderData.PROMOTION.length === 0) ? styleSelect2 : styleSelect1}
                  components={animatedComponents}
                  value={promotionData.filter(obj => searchHeaderData?.PROMOTION_CODE === obj.PROMOTION)}
                  closeMenuOnSelect={true}
                  isDisabled={headerDis}
                  theme={(isValid && searchHeaderData.PROMOTION.length === 0) ? theme => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      neutral50: '#b22222',
                    },
                  }) : false}
                />
              </div>
            </div>
          ] : null}


        <div className={CreateAllocationClasses.header_child}>
          <div >
            {(isValid && searchHeaderData.ALLOC_LEVEL.length === 0) ?
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left', color: "#b22222" }}>
                Alloc Level*</InputLabel> :
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
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
              styles={(isValid && searchHeaderData.ALLOC_LEVEL.length === 0) ? styleSelect2 : styleSelect1}
              components={animatedComponents}
              value={allocLevelData.filter(obj => searchHeaderData?.ALLOC_LEVEL_CODE === (obj.ALLOC_LEVEL))}
              closeMenuOnSelect={true}
              isDisabled={headerDis || !searchHeaderData.ALLOC_NO}
              theme={(isValid && searchHeaderData.ALLOC_LEVEL.length === 0) ? theme => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  neutral50: '#b22222',
                },
              }) : false}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.header_child}>
          <div>
            {(isValid && searchHeaderData.RELEASE_DATE.length === 0) ?
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left', color: "#b22222" }}>
                Release Date*</InputLabel> :
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                Release Date</InputLabel>}
          </div>
          <div>
            <TextField
              variant="outlined"
              type="date"
              size="small"
              name="RELEASE_DATE"
              format="yyyy/MM/dd"
              autoComplete='off'
              inputProps={{ min: new Date().toISOString().slice(0, 10) }}
              sx={{
                margin: "0px 0px 10px 2px"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "#f0f0f0",

                },
                input: {
                  background: "white"
                }
              }}
              id="outlined-disabled"
              disabled={headerDis || !searchHeaderData.ALLOC_NO}
              label=""
              value={searchHeaderData.RELEASE_DATE}
              onChange={onChange}
              error={searchHeaderData.RELEASE_DATE.length === 0 && isValid}
              InputProps={{
                style: { fontSize: 12 },
                shrink: true,
                className: CreateAllocationClasses.input,
              }}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.header_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Status</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <TextField
              size="small"
              sx={{
                margin: "0px 0px 10px 2px", width: "200px"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "#f0f0f0"
                }
              }}
              disabled
              name="STATUS"
              value={(searchHeaderData.STATUS = statusCreateData.CODE) && (searchHeaderData.STATUS_CODE = statusCreateData.STATUS)}
              id="outlined-disabled"
              autoComplete='off'
              defaultValue={statusCreateData.STATUS}
              InputProps={{
                style: { fontSize: 12 },
                className: CreateAllocationClasses.input,
              }}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.header_child}>
          <div>
            {(isValid && searchHeaderData.ALLOC_TYPE.length === 0) ?
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left', color: "#b22222" }}>
                Alloc Type*</InputLabel> :
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
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
              styles={(isValid && searchHeaderData.ALLOC_TYPE.length === 0) ? styleSelect2 : styleSelect1}
              components={animatedComponents}
              value={allocTypeData.filter(obj => searchHeaderData?.ALLOC_TYPE_CODE === (obj.ALLOC_TYPE))}
              isDisabled={headerDis || !searchHeaderData.ALLOC_NO}
              theme={(isValid && searchHeaderData.ALLOC_TYPE.length === 0) ? theme => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  neutral50: '#b22222',
                },
              }) : false}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.header_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Allocator</InputLabel>
          </div>
          <div>
            <TextField
              variant="outlined"
              size="small"
              sx={{
                margin: "0px 0px 10px 2px", width: "14vh"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "#f0f0f0"
                }
              }}
              disabled
              name="CREATE_ID"
              id="outlined-disabled"
              autoComplete='off'
              value={searchHeaderData.CREATE_ID}
              onChange={onChange}
              InputProps={{
                style: { fontSize: 12 },
                className: CreateAllocationClasses.input,
              }}
            />
          </div>
        </div>
      </div>
    </Box>
  )

  /* 
      ###################################
        ### HTML Criteria functions ###
      ###################################
  */

  const SearchCriteria = () => (
    <Box
      display="inline-block"
      sx={{
        backgroundColor: "",
        height: "auto",
        padding: "0rem 0rem",
        width: "100%",
      }}
    >
      <div className={CreateAllocationClasses.float_container}>
        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Dept</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.HIER1.toString()}-${option.HIER1_DESC.toString()}`}
              getOptionValue={option => option.HIER1}
              options={UniqDept.length > 0 ? UniqDept : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputHIER1CCommon(value); // <---
              }}
              inputValue={inputHIER1CCommon}
              onChange={selectHIER1}
              maxMenuHeight={180}
              styles={styleSelect}
              components={animatedComponents}
              isMulti
              isClearable={true}
              value={UniqDept.filter(obj => searchDataCCommon?.HIER1.includes(obj.HIER1))}
              closeMenuOnSelect={true}
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
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
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Class:</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              closeMenuOnSelect={true}
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
              maxMenuHeight={180}
              styles={styleSelect}
              components={animatedComponents}
              isMulti
              value={UniqClass.filter(obj => searchDataCCommon?.HIER2.includes(obj.HIER2))}
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
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
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Subclass:</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              closeMenuOnSelect={true}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.HIER3.toString()}-${option.HIER3_DESC.toString()}`}
              getOptionValue={option => option.HIER3}
              options={(UniqSubClass.length > 0) ? UniqSubClass : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputHIER3CCommon(value);
              }}
              inputValue={inputHIER3CCommon}
              onChange={selectHIER3}
              maxMenuHeight={180}
              styles={styleSelect}
              components={animatedComponents}
              isMulti
              value={UniqSubClass.filter(obj => searchDataCCommon?.HIER3.includes(obj.HIER3))}
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
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
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              WH:</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              closeMenuOnSelect={true}
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
              maxMenuHeight={180}
              styles={styleSelect}
              components={animatedComponents}
              value={warehouseData.filter(obj => searchDataCCommon?.WH.includes(obj.WH))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
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
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Supplier:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
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
              maxMenuHeight={180}
              styles={styleSelect}
              components={animatedComponents}
              value={supplierData.filter(obj => searchDataCCommon?.SUPPLIER.includes(obj.SUPPLIER))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
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
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Supplier Site:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
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
              maxMenuHeight={180}
              styles={styleSelect}
              components={animatedComponents}
              value={supplerSiteData.filter(obj => searchDataCCommon?.SUPPLIER_SITE.includes(obj.SUPPLIER_SITE))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
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
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Pack No:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.PACK_NO.toString()}`}
              getOptionValue={option => option.PACK_NO}
              options={packNoData.length > 0 ? packNoData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputPACK_NOCCommon(value);
              }}
              inputValue={inputPACK_NOCCommon}
              onChange={selectPACK_NO}
              maxMenuHeight={180}
              styles={styleSelect}
              components={animatedComponents}
              value={packNoData.filter(obj => searchDataCCommon?.PACK_NO.includes(obj.PACK_NO))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
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
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Item Parent:</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.ITEM_PARENT.toString()}`}
              getOptionValue={option => option.ITEM_PARENT}
              options={(UniqItemParent.length > 0) ? UniqItemParent : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputITEM_PARENTCCommon(value);
              }}
              inputValue={inputITEM_PARENTCCommon}
              onChange={selectITEM_PARENT}
              maxMenuHeight={180}
              styles={styleSelect}
              components={animatedComponents}
              isMulti
              value={UniqItemParent.filter(obj => searchDataCCommon?.ITEM_PARENT.includes(obj.ITEM_PARENT))}
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
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
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Diff ID:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.DIFF_ID.toString()}`}
              getOptionValue={option => option.DIFF_ID}
              options={diffData.length > 0 ? diffData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputDIFF_IDCCommon(value);
              }}
              inputValue={inputDIFF_IDCCommon}
              onChange={selectDIFF_ID}
              maxMenuHeight={180}
              styles={styleSelect}
              components={animatedComponents}
              value={diffData.filter(obj => searchDataCCommon?.DIFF_ID.includes(obj.DIFF_ID))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
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
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Sku:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.SKU.toString()}`}
              getOptionValue={option => option.SKU}
              options={skuData.length > 0 ? skuData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputSKUCCommon(value);
              }}
              inputValue={inputSKUCCommon}
              onChange={selectSKU}
              maxMenuHeight={180}
              styles={styleSelect}
              components={animatedComponents}
              value={skuData.filter(obj => searchDataCCommon?.SKU.includes(obj.SKU))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
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
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Item List:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.ITEM_LIST_NO.toString()}-${option.ITEM_LIST_DESC.toString()}`}
              getOptionValue={option => option.ITEM_LIST_NO}
              options={itemListHeadData.length > 0 ? itemListHeadData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputITEM_LIST_NOCCommon(value);
              }}
              inputValue={inputITEM_LIST_NOCCommon}
              onChange={selectITEM_LIST_NO}
              maxMenuHeight={180}
              styles={styleSelect}
              components={animatedComponents}
              value={itemListHeadData.filter(obj => searchDataCCommon?.ITEM_LIST_NO.includes(obj.ITEM_LIST_NO))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
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
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              VPN:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.VPN.toString()}`}
              getOptionValue={option => option.VPN}
              options={UniqVPN.length > 0 ? UniqVPN : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputVPNCCommon(value);
              }}
              inputValue={inputVPNCCommon}
              onChange={selectVPN}
              maxMenuHeight={180}
              styles={styleSelect}
              components={animatedComponents}
              value={UniqVPN.filter(obj => searchDataCCommon?.VPN.includes(obj.VPN))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
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
                    ? false : true)
              }
            />
          </div>
        </div>

        {searchHeaderData.ALLOC_CRITERIA === "PURCHASE_ORDER" ? [
          <div className={CreateAllocationClasses.float_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                PO:</InputLabel>
            </div>
            <div>
              <Select
                closeMenuOnSelect={true}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.PO.toString()}`}
                getOptionValue={option => option.PO}
                options={poData.length > 0 ? poData : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputPOCPO(value);
                }}
                inputValue={inputPOCPO}
                onChange={selectPO}
                maxMenuHeight={180}
                styles={styleSelect}
                components={animatedComponents}
                value={poData.filter(obj => searchDataCPO?.PO.includes(obj.PO))}
                isMulti
                isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
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
                      ? false : true)
                }
              />
            </div>
          </div>,

          <div className={CreateAllocationClasses.float_child}>
            <div>
              {(isValidCTEDT && searchDataCPO["ESID_TO"].length > 0 && searchDataCPO["ESID_FROM"].length === 0) ||
                (isGreatCTEDF && isGreatCTEDT && searchDataCPO["ESID_TO"].length > 0 && searchDataCPO["ESID_FROM"].length > 0) ?
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left', color: "#b22222" }}>
                  EISD From*</InputLabel> :
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                  EISD From:</InputLabel>}
            </div>
            <div>
              <TextField
                size="small"
                variant="outlined"
                type="date"
                name="ESID_FROM"
                autoComplete='off'
                helperText=""
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0"
                  }
                }}
                onChange={onChangeCPO}
                value={searchDataCPO.ESID_FROM}
                id="outlined-disabled"
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12 },
                  className: CreateAllocationClasses.inputFielddate,
                }}
                error={
                  (isValidCTEDT && searchDataCPO["ESID_TO"].length > 0 && searchDataCPO["ESID_FROM"].length === 0) ||
                  (isGreatCTEDF && isGreatCTEDT && searchDataCPO["ESID_TO"].length > 0 && searchDataCPO["ESID_FROM"].length > 0)
                }
                disabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    && searchDataCPO["PO"].length > 0
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      && searchDataCPO["PO"].length > 0
                      ? false : true)
                }
              />
            </div>
          </div>,

          <div className={CreateAllocationClasses.float_child}>
            <div>
              {(isValidCTEDF && searchDataCPO["ESID_FROM"].length > 0 && searchDataCPO["ESID_TO"].length === 0) ||
                (isGreatCTEDF && isGreatCTEDT && searchDataCPO["ESID_TO"].length > 0 && searchDataCPO["ESID_FROM"].length > 0) ?
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left', color: "#b22222" }}>
                  EISD To*</InputLabel> :
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                  EISD To:</InputLabel>}
            </div>
            <div>
              <TextField
                size="small"
                type="date"
                name="ESID_TO"
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0"
                  }
                }}
                onChange={onChangeCPO}
                value={searchDataCPO.ESID_TO}
                autoComplete='off'
                id="outlined-disabled"
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12 },
                  className: CreateAllocationClasses.inputFielddate,
                }}
                error={(isValidCTEDF && searchDataCPO["ESID_FROM"].length > 0 && searchDataCPO["ESID_TO"].length === 0) ||
                  (isGreatCTEDF && isGreatCTEDT && searchDataCPO["ESID_TO"].length > 0 && searchDataCPO["ESID_FROM"].length > 0)
                }
                disabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    && searchDataCPO["PO"].length > 0
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      && searchDataCPO["PO"].length > 0
                      ? false : true)
                }
              />
            </div>
          </div>,

          <div className={CreateAllocationClasses.float_child}>
            <div>
              {(isValidCTNDT && searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_FROM"].length === 0) ||
                (isGreatCTNDT && isGreatCTNDF && searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0) ?
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left', color: "#b22222" }}>
                  Not Before Date From*</InputLabel> :
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                  Not Before Date From:</InputLabel>}
            </div>
            <div>
              <TextField
                size="small"
                type="date"
                name="NOT_BEFORE_DATE_FROM"
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0"
                  }
                }}
                onChange={onChangeCPO}
                value={searchDataCPO.NOT_BEFORE_DATE_FROM}
                id="outlined-disabled"
                autoComplete='off'
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12 },
                  className: CreateAllocationClasses.inputFielddate,
                }}
                error={
                  (isValidCTNDT && searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_FROM"].length === 0) ||
                  (isGreatCTNDT && isGreatCTNDF && searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0)
                }
                disabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    && searchDataCPO["PO"].length > 0
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      && searchDataCPO["PO"].length > 0
                      ? false : true)
                }
              />
            </div>
          </div>,

          <div className={CreateAllocationClasses.float_child}>
            <div>
              {(isValidCTNDF && searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_TO"].length === 0) ||
                (isGreatCTNDT && isGreatCTNDF && searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0) ?
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left', color: "#b22222" }}>
                  Not Before Date To*</InputLabel> :
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                  Not Before Date To:</InputLabel>}
            </div>
            <div>
              <TextField
                size="small"
                type="date"
                name="NOT_BEFORE_DATE_TO"
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0"
                  }
                }}
                onChange={onChangeCPO}
                value={searchDataCPO.NOT_BEFORE_DATE_TO}
                id="outlined-disabled"
                autoComplete='off'
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12 },
                  className: CreateAllocationClasses.inputFielddate,
                }}
                error={
                  (isValidCTNDF && searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_TO"].length === 0) ||
                  (isGreatCTNDT && isGreatCTNDF && searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0)
                }
                disabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    && searchDataCPO["PO"].length > 0
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      && searchDataCPO["PO"].length > 0
                      ? false : true)
                }
              />
            </div>
          </div>,

          <div className={CreateAllocationClasses.float_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                PO Type:</InputLabel>
            </div>
            <div>
              <Select
                closeMenuOnSelect={true}
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
                maxMenuHeight={180}
                styles={styleSelect}
                components={animatedComponents}
                value={UniqPOType.filter(obj => searchDataCPO?.PO_TYPE.includes(obj.PO_TYPE))}
                isMulti
                isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
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
                      ? false : true)
                }
              />
            </div>
          </div>
        ] : null}

        {searchHeaderData.ALLOC_CRITERIA === "WAREHOUSE" ? [
          <div className={CreateAllocationClasses.float_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                Avail Qty &gt;=</InputLabel>
            </div>
            <div>
              <TextField
                size="small"
                name="AVAIL_QTY_GREATER"
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0"
                  }
                }}
                onChange={onChangeCWH}
                value={searchDataCWH.AVAIL_QTY_GREATER}
                id="outlined-disabled"
                autoComplete='off'
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12 },
                  className: CreateAllocationClasses.inputFielddate,
                }}
                disabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
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
                      ? false : true)
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
                name="AVAIL_QTY_LESS"
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0"
                  }
                }}
                onChange={onChangeCWH}
                value={searchDataCWH.AVAIL_QTY_LESS}
                id="outlined-disabled"
                autoComplete='off'
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12 },
                  className: CreateAllocationClasses.inputFielddate,
                }}
                disabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
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
                      ? false : true)
                }
              />
            </div>
          </div>
        ] : null}

        {searchHeaderData.ALLOC_CRITERIA === "ASN" ?
          <div className={CreateAllocationClasses.float_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                ASN:</InputLabel>
            </div>
            <div>
              <Select
                closeMenuOnSelect={true}
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
                maxMenuHeight={180}
                styles={styleSelect}
                components={animatedComponents}
                value={asnData.filter(obj => searchDataCASN?.ASN.includes(obj.ASN))}
                isMulti
                isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
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
                      ? false : true)
                }
              />
            </div>
          </div>
          : null}

        {searchHeaderData.ALLOC_CRITERIA === "TRANSFER" ?
          <div className={CreateAllocationClasses.float_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                Transfer:</InputLabel>
            </div>
            <div>
              <Select
                closeMenuOnSelect={true}
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
                maxMenuHeight={180}
                styles={styleSelect}
                components={animatedComponents}
                value={tsfData.filter(obj => searchDataCTSF?.TSF.includes(obj.TSF))}
                isMulti
                isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
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
                      ? false : true)
                }
              />
            </div>
          </div>
          : null}

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              UDA:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.UDA.toString()}-${option.USER_ATTR_DESC.toString()}`}
              getOptionValue={option => option.UDA}
              options={UniqUDA.length > 0 ? UniqUDA : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputUDACCommon(value);
              }}
              inputValue={inputUDACCommon}
              onChange={selectUDA}
              maxMenuHeight={180}
              isOptionDisabled={() => valUDACCommon.length >= 3}
              styles={styleSelect}
              components={animatedComponents}
              value={UniqUDA.filter(obj => searchDataCCommon?.UDA.includes(obj.UDA))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
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
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              UDA Value:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
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
              maxMenuHeight={180}
              styles={styleSelect}
              components={animatedComponents}
              value={filterUDAValueCCommon.filter(obj => searchDataCCommon?.UDA_VALUE.includes(obj.UDA_VALUE))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
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
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Exclude UDA:</InputLabel>
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
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputEXCLUDE_UDACCommon(value);
              }}
              inputValue={inputEXCLUDE_UDACCommon}
              onChange={selectEXCLUDE_UDA}
              maxMenuHeight={180}
              styles={styleSelect}
              components={animatedComponents}
              value={UniqExcludeUDA.filter(obj => searchDataCCommon?.EXCLUDE_UDA.includes(obj.EXCLUDE_UDA))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
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
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Exclude UDA Value:</InputLabel>
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
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputEXCLUDE_UDA_VALUECCommon(value);
              }}
              inputValue={inputEXCLUDE_UDA_VALUECCommon}
              onChange={selectEXCLUDE_UDA_VALUE}
              maxMenuHeight={180}
              styles={styleSelect}
              components={animatedComponents}
              value={filterEXCLUDE_UDAValueCCommon.filter(obj => searchDataCCommon?.EXCLUDE_UDA_VALUE.includes(obj.EXCLUDE_UDA_VALUE))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  && searchDataCCommon["EXCLUDE_UDA"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    && searchDataCCommon["EXCLUDE_UDA"].length
                    ? false : true)
              }
            />
          </div>
        </div>

      </div>
    </Box>
  )

  /* 
      ###################################
        ### HTML Buttons functions ###
      ###################################
  */

  const SearchButtonGrid = () => (
    <Box
      display="flex"
      sx={{
        backgroundColor: "",
        height: "auto",
        width: "100%",
        padding: "5px 0px 0px 0px",
        // justifyContent:"space-between"
      }}
    >
      {/* <div className={CreateAllocationClasses.header_child}> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            // width: "40%"
          }}
        >
          <div className={CreateAllocationClasses.grid_container}>
            <div className={CreateAllocationClasses.grid_child}>
              <Button sx={{ backgroundColor: "", fontSize: "12px" }}
                variant="contained"
                className={CreateAllocationClasses.textField}
                type="submit"
                onClick={SubmitList}
              >
                Add</Button>
            </div>

            <div className={CreateAllocationClasses.grid_child}>
              <Button
                sx={{
                  backgroundColor: "", fontSize: "12px"
                }}
                variant="contained"
                onClick={handleDelete}
              >Delete</Button>
            </div>

            <div className={CreateAllocationClasses.grid_child}>
              <Button
                sx={{ backgroundColor: "", fontSize: "12px" }}
                variant="contained">
                Errors
              </Button>
            </div>

            <div className={CreateAllocationClasses.grid_child}>
              <Button
                sx={{ backgroundColor: "", fontSize: "12px" }}
                variant="contained">
                Split
              </Button>
            </div>

            <div className={CreateAllocationClasses.grid_child}>
              <Button
                sx={{
                  backgroundColor: "", fontSize: "12px"
                }}
                variant="contained"
              // onClick={RefreshTableGrid}
              >Refresh Grid</Button>
            </div>
          </div>
        </Box>
      {/* </div> */}

      {/* <div className={CreateAllocationClasses.header_child}> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            // width: "30%"
          }}
        >
          <div className={CreateAllocationClasses.float_container}>
            <div className={CreateAllocationClasses.grid_child}>
              <Button
                sx={{
                  fontSize: "12px",
                  backgroundColor: "MediumSeaGreen",
                }}
                variant="contained">
                Submit</Button>
            </div>
            <div className={CreateAllocationClasses.grid_child}>
              <Button sx={{ backgroundColor: "rgb(255, 0, 9)", fontSize: "12px" }} variant="contained">Cancel</Button>
            </div>
            <div className={CreateAllocationClasses.grid_child}>
              <Button
                sx={{
                  backgroundColor: "", fontSize: "12px"
                }}
                variant="contained"
              // onClick={RefreshGrid}
              >Refresh</Button>
            </div>
          </div>
        </Box>
      {/* </div> */}
    </Box>
  )

  // const SearchButton = () => (
  //   <Box
  //     display="inline-block"
  //     sx={{
  //       backgroundColor: "",
  //       height: "auto",
  //       margin: "0rem",
  //       padding: "5px 0px 10px 0px",
  //       width: "100%",
  //     }}
  //   >
  //     <div className={CreateAllocationClasses.float_container}>
  //       <div className={CreateAllocationClasses.grid_child}>
  //         <Button
  //           sx={{
  //             fontSize: "12px",
  //             backgroundColor: "MediumSeaGreen",
  //           }}
  //           variant="contained">
  //           Submit</Button>
  //       </div>
  //       <div className={CreateAllocationClasses.grid_child}>
  //         <Button sx={{ backgroundColor: "rgb(255, 0, 9)", fontSize: "12px" }} variant="contained">Cancel</Button>
  //       </div>
  //       <div className={CreateAllocationClasses.grid_child}>
  //         <Button
  //           sx={{
  //             backgroundColor: "", fontSize: "12px"
  //           }}
  //           variant="contained"
  //           onClick={RefreshGrid}
  //         >Refresh</Button>
  //       </div>
  //     </div>
  //   </Box>
  // )

  /* 
      ###################################
        ### HTML Buttons functions ###
      ###################################
  */
  const SearchButtonTrend = () => (
    <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} >
      <InfoIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em', color: "CadetBlue" }}
        onClick={() => {
          swal(
            <div>
              <p>{searchHeaderData.ALLOC_DESC}</p>
            </div>
          )
        }}
      />
    </IconButton>
  )

  /* 
      ########################################################
        ### HTML Available Qty by size details functions ###
      ########################################################
  */

  const SearchAvailQty = () => (
    <Box
      display="inline-block"
      sx={{
        backgroundColor: "",
        height: "auto",
        width: "100%",
      }}
    >
      <div className={CreateAllocationClasses.float_container}>
        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Dept</InputLabel>
          </div>
          <div>
            <TextField id="filled-disabled" size="small" variant="outlined"
              value={availSearch.length > 0 ? [(availSearch[0].HIER1) + (" - ") + (
                String(availSearch[0].HIER1_DESC).length > 0 && String(availSearch[0].HIER1_DESC).length < 8 ?
                  availSearch[0].HIER1_DESC === "NULL" ? null : availSearch[0].HIER1_DESC
                  : String(availSearch[0].HIER1_DESC).substring(0, 8) + "..."
              )
              ] : null}
              InputProps={{
                readOnly: true,
                style: {
                  fontSize: 12,
                  border: 0,
                  borderRadius: "0px",
                  boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                  padding: '0px 0px 0px 0px'
                },
                endAdornment: <SearchGridAvailDept />,
                className: CreateAllocationClasses.inputFieldTable,
              }}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Class</InputLabel>
          </div>
          <div>
            <TextField id="filled-disabled" size="small" variant="outlined"
              value={availSearch.length > 0 ? [(availSearch[0].HIER2) + (" - ") + (
                String(availSearch[0].HIER2_DESC).length > 0 && String(availSearch[0].HIER2_DESC).length < 8 ?
                  availSearch[0].HIER2_DESC === "NULL" ? null : availSearch[0].HIER2_DESC
                  : String(availSearch[0].HIER2_DESC).substring(0, 8) + "..."
              )
              ] : null}
              InputProps={{
                readOnly: true,
                style: {
                  fontSize: 12,
                  border: 0,
                  borderRadius: "0px",
                  boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                  padding: '0px 0px 0px 0px'
                },
                endAdornment: <SearchGridAvailClass />,
                className: CreateAllocationClasses.inputFieldTable,
              }}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Subclass</InputLabel>
          </div>
          <div>
            <TextField id="filled-disabled" size="small" variant="outlined"
              value={availSearch.length > 0 ? [(availSearch[0].HIER3) + (" - ") + (
                String(availSearch[0].HIER3_DESC).length > 0 && String(availSearch[0].HIER3_DESC).length < 8 ?
                  availSearch[0].HIER3_DESC === "NULL" ? null : availSearch[0].HIER3_DESC
                  : String(availSearch[0].HIER3_DESC).substring(0, 8) + "..."
              )
              ] : null}
              InputProps={{
                readOnly: true,
                style: {
                  fontSize: 12,
                  border: 0,
                  borderRadius: "0px",
                  boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                  padding: '0px 0px 0px 0px'
                },
                endAdornment: <SearchGridAvailSubclass />,
                className: CreateAllocationClasses.inputFieldTable,
              }}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Item Parent</InputLabel>
          </div>
          <div>
            <TextField id="filled-disabled" size="small" variant="outlined"
              value={availSearch.length > 0 ? [(availSearch[0].ITEM) + (" - ") + (
                String(availSearch[0].ITEM_DESC).length > 0 && String(availSearch[0].ITEM_DESC).length < 8 ?
                  availSearch[0].ITEM_DESC === "NULL" ? null : availSearch[0].ITEM_DESC
                  : String(availSearch[0].ITEM_DESC).substring(0, 12) + "..."
              )
              ] : null}
              InputProps={{
                readOnly: true,
                style: {
                  fontSize: 12,
                  border: 0,
                  borderRadius: "0px",
                  boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                  padding: '0px 0px 0px 0px'
                },
                endAdornment: <SearchGridAvailITEM />,
                className: CreateAllocationClasses.inputFieldTable,
              }}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Diff ID</InputLabel>
          </div>
          <div>
            <TextField id="filled-disabled" size="small" variant="outlined"
              value={availSearch.length > 0 ? [(availSearch[0].DIFF_ID) + (" - ") + (
                String(availSearch[0].DIFF_DESC).length > 0 && String(availSearch[0].DIFF_DESC).length < 8 ?
                  availSearch[0].DIFF_DESC === "NULL" ? null : availSearch[0].DIFF_DESC
                  : String(availSearch[0].DIFF_DESC).substring(0, 12) + "..."
              )
              ] : null}
              InputProps={{
                readOnly: true,
                style: {
                  fontSize: 12,
                  border: 0,
                  borderRadius: "0px",
                  boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                  padding: '0px 0px 0px 0px'
                },
                endAdornment: <SearchGridAvailDiffID />,
                className: CreateAllocationClasses.inputFieldTable,
              }}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Doc No</InputLabel>
          </div>
          <div>
            <TextField id="filled-disabled" size="small" variant="outlined"
              InputProps={{
                readOnly: true,
                style: { fontSize: 12 },
                className: CreateAllocationClasses.inputField,
              }}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Doc Type</InputLabel>
          </div>
          <div>
            <TextField id="filled-disabled" size="small" variant="outlined"
              InputProps={{
                readOnly: true,
                style: { fontSize: 12 },
                className: CreateAllocationClasses.inputField,
              }}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              WH</InputLabel>
          </div>
          <div>
            <TextField id="filled-disabled" size="small" variant="outlined"
              value={availSearch.length > 0 ? [(availSearch[0].LOC) + (" - ") + (
                String(availSearch[0].WH_DESC).length > 0 && String(availSearch[0].WH_DESC).length < 8 ?
                  availSearch[0].WH_DESC === "NULL" ? null : availSearch[0].WH_DESC
                  : String(availSearch[0].WH_DESC).substring(0, 12) + "..."
              )
              ] : null}
              InputProps={{
                readOnly: true,
                style: {
                  fontSize: 12,
                  border: 0,
                  borderRadius: "0px",
                  boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                  padding: '0px 0px 0px 0px'
                },
                endAdornment: <SearchGridAvailWH />,
                className: CreateAllocationClasses.inputFieldTable,
              }}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Avail Qty</InputLabel>
          </div>
          <div>
            <TextField value={totalAvailQty} id="filled-disabled" size="small"
              variant="outlined"
              InputProps={{
                readOnly: true,
                style: { fontSize: 12 },
                className: CreateAllocationClasses.inputField,
              }}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Inactive Qty</InputLabel>
          </div>
          <div>
            <TextField id="filled-disabled" size="small" variant="outlined"
              InputProps={{
                readOnly: true,
                style: { fontSize: 12 },
                className: CreateAllocationClasses.inputField,
              }}
            />
          </div>
        </div>
      </div>
    </Box>
  )

  /* 
      #######################################
        ### Table Grid Header functions ###
      #######################################
  */
  function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead className={CreateAllocationClasses.TitleHead}>
        <TableRow >
          <StyledTableCell padding="checkbox" style={{
            whiteSpace: "nowrap",
          }}
          >
            <Checkbox
              color="primary"
              indeterminate={selected.length > 0 && selected.length < totalData.length}
              checked={totalData.length > 0 && selected.length === totalData.length}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all data',
              }}
              style={{
                color: "#fff",
              }}
            />
          </StyledTableCell>
          {headCells.map((headCell) => (
            <StyledTableCell
              className={CreateAllocationClasses.TableCell}
              size="small"
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
              style={{
                whiteSpace: "nowrap"
              }}
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
            </StyledTableCell>
          ))}
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

  function EnhancedTableToolbar(props) {
    const { numSelected } = props;
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(totalData.length > 0 && {
            minHeight: {
              minHeight: "40px !important",
            },
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
          padding: "0px"
        }}
      >
        {totalData.length > 0 && (
          <Typography
            sx={{
              flex: "1 1 100%",
              display: "flex",
              justifyContent: "flex-end",
              padding: "0px 20px 0px 0px"
            }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            Rows {selected.length} of {totalData.length}
          </Typography>
        )}
      </Toolbar>
    );
  }

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

  const handleRequestSort = (event, property) => {
    const isAsc = (orderBy === property && order === 'asc');
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked && selected.length === 0) {
      const newSelected = totalData.map((n) => n.SR_NO);
      setSelected(newSelected);
      if (newSelected.length > 0) {
        var temp = [];
        newSelected.map((val) => {
          temp.push(totalData[val - 1]);
        });
        setSelData(temp);
      }
      return;
    }
    setSelected([]);
    setSelData([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    if (newSelected.length > 0) {
      var temp = [];
      newSelected.map((val) => {
        temp.push(totalData[val - 1]);
      });
      setSelData(temp);
    }
    else {
      setSelData([]);
    }
    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  /* 
      ###################################
        ### If conditions functions ###
      ###################################
  */

  /**** Header Alloc Type Child condition ****/
  if (searchHeaderData.ALLOC_TYPE_CODE === "Child") {
    swal(
      <div>
        <p>Cannot select the Child*</p>
      </div>
    )
    setSearchHeaderData((prev) => {
      return {
        ...prev,
        ALLOC_TYPE_CODE: "Ad-Hoc",
        ALLOC_TYPE: "A",
      };
    })
  }

  /**** By Default Criteria is set to Warehouse ****/
  useEffect(() => {
    setLoading(true);
    setSearchHeaderData((prev) => {
      return {
        ...prev,
        ALLOC_CRITERIA: options[selectedIndex].value,
      };
    })
  }, [""]);

  /**** Header Alloc Level Input condition ****/
  if (searchHeaderData.ALLOC_LEVEL_CODE === "Style Diff") {
    headCells.map((option) => { if (option.label === "Item") { option.label = "Item parent" } })
  } else if (searchHeaderData.ALLOC_LEVEL_CODE === "Sku") {
    headCells.map((option) => { if (option.label === "Item parent") { option.label = "Item" } })
  }

  /**** Available Qty by size screen, Addition of AVAILABLE_QTY condition ****/
  if (availCheck) {
    let availQtyVal = 0;
    availQty.map((data) => {
      availQtyVal = availQtyVal + data.AVAILABLE_QTY;
    })
    setTotalAvailQty(availQtyVal);
    setAvailCheck(false);
  }

  /* 
        #####################################################################
          ### To open Dialog Box Available Qty by size screen functions ###
        #####################################################################
    */

  const handleCloseAvailDialog = () => {
    setOpenAvailDialog(false);
  };


  const showAvailDialog = (e, values) => {
    setOpenAvailDialog(true);
    if (values) {
      dispatch(getALLOC_AVAIL_QTYRequest([{ DIFF_ID: values.DIFF_ID, ITEM: values.ITEM }]));
      dispatch(getALLOC_AVAIL_SEARCHRequest([{ DIFF_ID: values.DIFF_ID, ITEM: values.ITEM }]));
    }
  }

  /* 
      ##############################################
        ### To fetch API data unique functions ###
      ##############################################
  */

  let UniqTableCPO =
    totalData.length > 0
      ? [...new Map(totalData.map((item) => [item["ITEM"], item])).values()]
      : [];

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
    poData.length > 0
      ? [...new Map(poData.map((item) => [item["PO_TYPE"], item])).values()]
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


  return (
    <Box className={CreateAllocationClasses.maindiv}>
      <Grid >
        <Box
          display="inline-block"
          sx={{
            backgroundColor: "",
            width: "100%",
            height: "auto",
          }}
        >
          <div sx={{ display: "flex", flexDirection: "column" }}>
            <Grid id="top-row" container spacing={0} >
              <div className={CreateAllocationClasses.course_box}>
                {SearchHeader()}
              </div>
            </Grid>
          </div>
        </Box>
      </Grid>

      <Grid>
        <Box
          component="fieldset"
          display="inline-block"
          sx={{
            backgroundColor: "",
            width: "100%",
            height: "auto",
            marginTop: "10px",
            borderRadius: 1,

            boxShadow: 2, border: 0,
            borderBottom: 3,
            border: "1px solid lightgrey",
          }}
        >
          <div sx={{ display: "flex", flexDirection: "row" }}>
            <Grid id="top-row" container spacing={0}>
              <div className={CreateAllocationClasses.course_box}>
                <Box
                  display="inline-block"
                  sx={{
                    backgroundColor: "",
                    width: "100%",
                    height: "auto"
                  }}
                >
                  <div className={CreateAllocationClasses.grid_block}>
                    <Box
                      sx={{
                        backgroundColor: "",
                        height: "auto",
                        margin: "0.2rem 0rem",
                        width: "100%",
                        marginLeft: "",
                      }}
                    >
                      <List
                        component="nav"
                        size="small"
                        aria-label="comment"
                        sx={{
                          bgcolor: '',
                          width: "100%",
                          padding: "0px",
                          margin: "0px"
                        }}
                        MenuListProps={{
                          disablePadding: "true",
                        }}
                      >
                        <ListItem
                          button
                          id="lock-button"
                          aria-label="Criteria"
                          onClick={handleClickListItem}
                          onMouseOver={handleClickListItem}
                          onMouseDown={handleClose}
                        >
                          <ListItemText
                            primary={<Typography type="body2" style={{ bgcolor: '', fontSize: "14px", fontWeight: "bold", position: "static" }}>
                              CRITERIA: {options[selectedIndex].value}</Typography>}

                          />
                        </ListItem>
                      </List>
                      <Menu
                        id="simple-menu"
                        className={CreateAllocationClasses.listdropdown}
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        onMouseLeave={handleClose}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        disableScrollLock={true}
                        PaperProps={{
                          style: {
                            width: "auto",
                            height: "auto",
                            margin: "0.2rem 0.2rem",
                          }
                        }}
                        MenuListProps={{
                          disablePadding: "true",
                          'aria-labelledby': 'lock-button',
                          role: 'li  stbox',
                        }}

                      >
                        {options.map((option, index) => (
                          <MenuItem
                            dense="true"
                            sx={{
                              backgroundColor: "",
                              display: "inline-block",
                              padding: "0px 0px 0px 1px",
                            }}
                            value={option.value}
                            key={option.value}
                            selected={index === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}
                            disabled={UniqTableCPO.length > 0}
                          >
                            <RadioGroup
                              sx={{ backgroundColor: "white", padding: "0px 0px 0px 0px" }}
                              size="small"
                              value={option.value}
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              defaultValue={option.value}
                              name="row-radio-buttons-group"
                            >
                              <FormControlLabel
                                value={searchHeaderData.ALLOC_CRITERIA}
                                onClick={handleClickListItem}
                                control={
                                  <Radio size="small"
                                    onClick={handleClickListItem}
                                    className={CreateAllocationClasses.formRadio} />
                                }
                                label={<Typography sx={{ fontSize: "12px", padding: "0px 0px 0px 0px", fontWeight: "bold" }}>{option.value}</Typography>} />

                            </RadioGroup>
                          </MenuItem>
                        ))}
                      </Menu>
                    </Box>
                  </div>

                  <div className={CreateAllocationClasses.course_list}>
                    <Box
                      onMouseOver={handleClose}
                      sx={{
                        backgroundColor: "",
                        borderBottom: "1px dotted gray",
                      }}
                    >
                      <div className={CreateAllocationClasses.grid_block}>
                        <div> {SearchCriteria()}</div>
                        {/* <div className={CreateAllocationClasses.grid_block}>
                          {SearchButton()}
                        </div> */}
                      </div>
                    </Box>
                  </div>
                </Box>
                <div className={CreateAllocationClasses.course_list}>
                  {SearchButtonGrid()}
                </div>
              </div>
            </Grid>
          </div>
        </Box>
      </Grid>

      <Grid>
        <Box
          display="inline-block"
          sx={{
            backgroundColor: "",
            marginTop: "10px",
            width: "100%",
            height: "auto",
            borderRadius: 1,

            boxShadow: 2, border: 0,
            borderBottom: 3,
            border: "1px solid lightgrey",
          }}
        >
          <div sx={{ display: "flex", flexDirection: "row" }}>
            <Grid id="top-row" container spacing={0}>
              <Box
                sx={{
                  backgroundColor: "",
                  width: "100%",
                  height: "auto",
                  margin: "0px 0px 5px 0px"
                }}
              >
                <Paper sx={{ width: '100%', mb: 0 }}>
                  <TableContainer style={{ maxHeight: 300, borderRadius: '5px' }} className={CreateAllocationClasses.TitleHead}>
                    <Table
                      aria-labelledby="tableTitle"
                    >
                      <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={UniqTableCPO.length}
                      />
                      <TableBody >
                        {UniqTableCPO.length > 0 ?
                          stableSort(UniqTableCPO, getComparator(order, orderBy))
                            .map((row, index) => {
                              const isItemSelected = isSelected(row?.SR_NO ? row?.SR_NO : row?.ITEM);
                              const labelId = `enhanced-table-checkbox-${index}`;
                              return (
                                <StyledTableRow
                                  hover
                                  role="checkbox"
                                  aria-checked={isItemSelected}
                                  tabIndex={-1}
                                  key={row?.SR_NO ? row?.SR_NO : row?.ITEM}
                                  selected={isItemSelected}
                                >
                                  <StyledTableCell padding="checkbox">
                                    <Checkbox
                                      color="primary"
                                      onClick={(event) => [handleClick(event, row?.SR_NO)]}
                                      checked={isItemSelected}
                                      inputProps={{
                                        'aria-labelledby': labelId,
                                      }}
                                    />
                                  </StyledTableCell>

                                  <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>{row.LOC === "NULL" ? null : row.LOC}</StyledTableCell>
                                  <StyledTableCell align="right" onClick={(event) => showAvailDialog(event, row)}>{row.ITEM === "NULL" ? null : row.ITEM}</StyledTableCell>
                                  <StyledTableCell align="right" >
                                    <Box
                                      display="flex"
                                      justifyContent="space-between"
                                      sx={{ border: 0, }}>
                                      <p>{String(row.ITEM_DESC).length > 0 && String(row.ITEM_DESC).length < 5 ?
                                        row.ITEM_DESC === "NULL" ? null : row.ITEM_DESC
                                        : String(row.ITEM_DESC).substring(0, 8) + "..."}</p>
                                      <Button sx={{
                                        backgroundColor: "", '&:hover': {
                                          backgroundColor: "",
                                        }, border: 0, color: "CadetBlue"
                                      }}
                                        style={{
                                          maxWidth: '25px', minWidth: '25px', justifyContent: "flex-start"
                                        }}
                                        size='small'
                                        className={CreateAllocationClasses.textField}
                                        onClick={() => {
                                          swal(
                                            <div>
                                              <p>{row.ITEM_DESC}</p>
                                            </div>
                                          )
                                        }}
                                        startIcon={<InfoIcon />}
                                      >
                                      </Button>
                                    </Box>
                                  </StyledTableCell>
                                  <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                    {row.DIFF_ID === "NULL" ? null : row.DIFF_ID}
                                  </StyledTableCell>
                                  <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                    {row.VPN === "NULL" ? null : row.VPN}
                                  </StyledTableCell>
                                  <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                    {row.HIER1 === "NULL" ? null : row.HIER1}
                                  </StyledTableCell>
                                  <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                    {row.HIER2 === "NULL" ? null : row.HIER2}
                                  </StyledTableCell>
                                  <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                    {row.HIER3 === "NULL" ? null : row.HIER3}
                                  </StyledTableCell>
                                  <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                    {row.AVAIL_QTY === "NULL" ? null : row.AVAIL_QTY}
                                  </StyledTableCell>
                                  <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                    {row.INACTIVE_QTY === "NULL" ? null : row.INACTIVE_QTY}
                                  </StyledTableCell>
                                  <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                    {row.REF_1 === "NULL" ? null : row.REF_1}
                                  </StyledTableCell>
                                  <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                    {row.ALLOC_CRITERIA === "NULL" ? null : row.ALLOC_CRITERIA}
                                  </StyledTableCell>
                                  <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                    {row.PO_TYPE === "NULL" ? null : row.PO_TYPE}
                                  </StyledTableCell>
                                  <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                    {row.INVENT_IND === "NULL" ? null : row.INVENT_IND}
                                  </StyledTableCell>
                                  <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                    {row.SOM_TYPE === "NULL" ? null : row.SOM_TYPE}
                                  </StyledTableCell>
                                  <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                    {row.SOM_QTY === "NULL" ? null : row.SOM_QTY}
                                  </StyledTableCell>
                                  <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                    {row.HOLDBACK_QTY === "NULL" ? null : row.HOLDBACK_QTY}
                                  </StyledTableCell>
                                  <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                    {row.ERR_IND === "NULL" ? null : row.ERR_IND}
                                  </StyledTableCell>
                                  <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                    {row.ERR_MESSAGE === "NULL" ? null : row.ERR_MESSAGE}
                                  </StyledTableCell>
                                </StyledTableRow >
                              );
                            })
                          : null}

                        {UniqTableCPO.length < 5 ?
                          [...Array(5 - (UniqTableCPO.length)).keys()].map(val => (
                            <StyledTableRow >
                              <StyledTableCell padding="checkbox"> <Checkbox color="primary" disabled={true} /></StyledTableCell>
                              <StyledTableCell align="right"></StyledTableCell>
                              <StyledTableCell align="right"></StyledTableCell>
                              <StyledTableCell align="right"></StyledTableCell>
                              <StyledTableCell align="right"></StyledTableCell>
                              <StyledTableCell align="right"></StyledTableCell>
                              <StyledTableCell align="right"></StyledTableCell>
                              <StyledTableCell align="right"></StyledTableCell>
                              <StyledTableCell align="right"></StyledTableCell>
                              <StyledTableCell align="right"></StyledTableCell>
                              <StyledTableCell align="right"></StyledTableCell>
                              <StyledTableCell align="right"></StyledTableCell>
                              <StyledTableCell align="right"></StyledTableCell>
                              <StyledTableCell align="right"></StyledTableCell>
                              <StyledTableCell align="right"></StyledTableCell>
                              <StyledTableCell align="right"></StyledTableCell>
                              <StyledTableCell align="right"></StyledTableCell>
                              <StyledTableCell align="right"></StyledTableCell>
                              <StyledTableCell align="right"></StyledTableCell>
                              <StyledTableCell align="right"></StyledTableCell>
                            </StyledTableRow>
                          )) : false}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
                {totalData.length > 0 ? <EnhancedTableToolbar numSelected={totalData.length} /> : null}
              </Box>
            </Grid>
          </div>
        </Box>
      </Grid>

      <div>
        <BootstrapDialog
          onClose={handleCloseAvailDialog}
          aria-labelledby="customized-dialog-title"
          open={openAvailDialog}
          fullWidth={true}
          maxWidth="md"
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseAvailDialog}>
            Available quantity details by size
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Card >
              <CardContent>
                <Grid container spacing={1}>
                  <div>{SearchAvailQty()}</div>
                </Grid>
              </CardContent>
            </Card>

            <br></br>

            <Card >
              <CardContent sx={{ maxHeight: '200px', overflowY: 'scroll' }}>
                <TableContainer style={{ maxHeight: 300 }} className={CreateAllocationClasses.TitleHead}>
                  <Table
                    aria-labelledby="tableTitle"
                  >
                    <TableHead className={CreateAllocationClasses.TitleHead}>
                      <StyledTableRow >
                        <StyledTableCell align="right">Item</StyledTableCell>
                        <StyledTableCell align="right">Diff1 ID</StyledTableCell>
                        <StyledTableCell align="right">Diff2 ID</StyledTableCell>
                        <StyledTableCell align="right">Diff3 ID</StyledTableCell>
                        <StyledTableCell align="right">Diff4 ID</StyledTableCell>
                        <StyledTableCell align="right">Avail Qty</StyledTableCell>
                        <StyledTableCell align="right">Inactive Qty</StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody >
                      <StyledTableRow>
                        {availQty.map((row) => (
                          <>
                            <StyledTableCell align="right">{row.ITEM === "NULL" ? null : row.ITEM}</StyledTableCell>
                            <StyledTableCell align="right">{row.DIFF1 === "NULL" ? null : row.DIFF1}</StyledTableCell>
                            <StyledTableCell align="right">{row.DIFF2 === "NULL" ? null : row.DIFF2}</StyledTableCell>
                            <StyledTableCell align="right">{row.DIFF3 === "NULL" ? null : row.DIFF3}</StyledTableCell>
                            <StyledTableCell align="right">{row.DIFF4 === "NULL" ? null : row.DIFF4}</StyledTableCell>
                            <StyledTableCell align="right">{row.AVAILABLE_QTY === "NULL" ? null : row.AVAILABLE_QTY}</StyledTableCell>
                            <StyledTableCell align="right">{row.INACTIVE_QTY === "NULL" ? null : row.INACTIVE_QTY}</StyledTableCell>
                          </>
                        ))}
                      </StyledTableRow>
                      {availQty.length < 3 ?
                        [...Array(3 - (availQty.length)).keys()].map(val => (
                          <StyledTableRow >
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                          </StyledTableRow>
                        )) : false}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseAvailDialog}>
              Ok
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>

      <div>
        <Dialog
          fullWidth={true}
          maxWidth="xs"
          open={openItem}
          onClose={handleCloseItem}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {availSearch.length > 0 ? (availSearch[0].ITEM_DESC) : null}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseItem} autoFocus variant="contained">
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullWidth={true}
          maxWidth="xs"
          open={openDept}
          onClose={handleCloseDept}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {availSearch.length > 0 ? (availSearch[0].HIER1_DESC) : null}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseDept} autoFocus variant="contained">
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullWidth={true}
          maxWidth="xs"
          open={openClass}
          onClose={handleCloseClass}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {availSearch.length > 0 ? (availSearch[0].HIER2_DESC) : null}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseClass} autoFocus variant="contained">
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullWidth={true}
          maxWidth="xs"
          open={openSubclass}
          onClose={handleCloseSubclass}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {availSearch.length > 0 ? (availSearch[0].HIER3_DESC) : null}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseSubclass} autoFocus variant="contained">
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullWidth={true}
          maxWidth="xs"
          open={openDiffID}
          onClose={handleCloseDiffID}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {availSearch.length > 0 ? (availSearch[0].DIFF_DESC) : null}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseDiffID} autoFocus variant="contained">
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullWidth={true}
          maxWidth="xs"
          open={openWH}
          onClose={handleCloseWH}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {availSearch.length > 0 ? (availSearch[0].WH_DESC) : null}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseWH} autoFocus variant="contained">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  )

}
export default CreateAllocationScreen;


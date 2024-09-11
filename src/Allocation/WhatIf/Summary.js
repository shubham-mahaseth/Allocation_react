import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import Table from "../../Components/Table/index";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
// import TextField from "@material-ui/core/TextField";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import InputLabel from '@mui/material/InputLabel';
import Drawer from "@mui/material/Drawer";
import { makeStyles, withStyles } from "@mui/styles";
// import { headCells } from "./tableHead";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SendIcon from "@mui/icons-material/Send";
//import { trnType } from "./transType.js";
// import { errorList } from "./errorType.js";
import { alpha } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import swal from '@sweetalert/with-react';
// import TrnTypeList from "../TRNTYPE";
import Select, { useStateManager } from 'react-select';
import CreateAllocation from "../CreateScreen/index"
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
import Switch from '@mui/material/Switch';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import Toolbar from "@mui/material/Toolbar";
// import SearchTableData from "../Search";
import { visuallyHidden } from '@mui/utils';
// import { ItemWHDetailsHeader } from "./tableHead";
import TableSortLabel from '@mui/material/TableSortLabel';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import ForwardIcon from '@mui/icons-material/Forward';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Card, CardContent, ListItemIcon } from "@mui/material";
import { height } from "@mui/system";
import { BsFillEraserFill } from 'react-icons/bs';
import ClearIcon from '@mui/icons-material/Clear';
import PassAllocNoScreen from "../CreateScreen/index";
import InfoIcon from '@mui/icons-material/Info';
import LockIcon from '@mui/icons-material/Lock';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import AnimationIcon from '@mui/icons-material/Animation';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import {
    postPOTYPEWHATIFRequest,
    postSUPPLIERWHATIFRequest,
    postORIGINCRTYWHATIFRequest,
    postRETRIEVEWHATIFRequest,
    postSUBMITWHATIFRequest,
    postRtvPoPrvRequest, postUpdatePORequest
} from "../../Redux/Action/whatIF";
import {
    getALLOCHEADDETAILSRequest,
} from "../../Redux/Action/quantityLimits";
import Draggable from 'react-draggable';
import WhatIFPO from './PO'

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

const useStyles = makeStyles({
    maindiv: {
        position: "relative",
        // backgroundColor:"yellow",
        // width:"100%",
        width: "calc(95vw - 0px)",
        "& table": {
            "& tr": {
                "& td:nth-child(26)": {
                    display: "none",
                },
                "& td:nth-child(27)": {
                    display: "none",
                },
                "& td:nth-child(28)": {
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
    TitleHead: {
        // height: "25px",
        position: "sticky",
        top: -1,
        width: "100%",
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
        // backgroundColor:"#f0f0f0",
        '& input + fieldset': {
            // borderColor: 'gray',
            // borderRadius: "0",
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
            boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
        },
    },
    header_container: {
        display: "inline-block",
        width: "100%",
    },
    header_child: {
        display: "inline-block",
        // border: "1px solid red",
        padding: "0rem 0.2rem",
        verticalAlign: "middle",
    },
    inputtable: {
        height: "30px"
    },
    float_child: {
        display: "inline-block",
        // marginBottom: "0.2rem",
        // marginLeft: "20px"
        // padding: "0rem 0rem",
        // verticalAlign: "middle",
    },
    sample: {
        border: "1px solid red"
    },
    TableCell: {
        color: "#fff",
        padding: "6px 6px !important",
        lineHeight: "1.2rem !important",
    },
    TitleRow: {
        height: 15,
        width: "100%",
    },
    inputPlaceHolder: {
        // border:"1px solid red",
        "&::placeholder": {
            color: "red",
            textAlign: "left"
        }
    },
    course_box: {
        // backgroundColor:"lightgray"
        // border:"2px solid red",
    },
    TableBoby: {
        marginBottom: "0px"
    },
    grid_block: {
        margin: "0px 0px 0px 5px",
        // backgroundColor:"lightgray"
    },
    TableTotalBoby: {
        // border:"1px solid red",
        padding: "0px",
        margin: "0px",
    },
    multiselectfield: {
        display: "inline-block",
        // border: "1px solid red",
        margin: "0rem",
        padding: "0rem 0rem",
        verticalAlign: "middle",
    },
    tableTable: {
        // position: 'relative', // <-- Make sure the table has a position property set
        // overflowY: 'scroll',
        // transform: 'none',
        // zIndex: 1,
    }

});

const styleSelect = {
    control: base => ({
        ...base,
        width: "100%",
        //   maxWidth:100,
        fontSize: "12px",
        minHeight: "20px",
        margin: "0px 0px 0px 0px",
        // This line disable the blue border
        borderRadius: "5px",
        //   border:0,
        //   borderBottom:"1px solid gray",
        // backgroundColor:"#f0f0f0",
        //border:"1px solid red",
        // boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
        // (isValid && searchHeaderData.CONTEXT.length===0)
        // '& input + fieldset': {
        //   // borderColor: 'gray',
        //   // borderRadius:"0",
        //   // boxShadow:"rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
        // },
    })
    ,
    dropdownIndicator: (base) => ({
        ...base,
        padding: 0,
        // paddingBottom: 0,
    }),
    clearIndicator: (base) => ({
        ...base,
        padding: 0,
    }),
    valueContainer: (provided) => ({
        ...provided,
        // minHeight: '1px',
        height: '20px',
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
        //justifyContent:"right",


        //textAlign:"center"
        // minHeight: '1px',
    }),
    placeholder: (provided, state) => ({
        ...provided,
        // marginTop: '-30px',
        color: "gray"
    }),
    option: provided => ({
        ...provided,
        // color: 'blue',
        fontSize: "12px",
    }),
    menu: base => ({
        ...base,
        // override border radius to match the box
        borderRadius: 0,
        // backgroundColor: 'black',
        // kill the gap
        marginTop: 0,
        // position: "relative"
    }),
    menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 0,
        width: "100%",
        // position: "relative"
    }),
    menu: provided => ({
        ...provided,
        // zIndex: 9999,
        // // position: "static".
        // overflowY: 'auto',
    }),
    // menuPortal: base => ({ ...base, zIndex: 9999 })
};

const styleSelect1 = {
    control: base => ({
        ...base,
        width: "180px",
        fontSize: "12px",
        margin: "0px 0px 5px 0px",
        // height: "25px",
        minHeight: "30px",
        border: "1px solid rgb(180, 180, 180)",
        // This line disable the blue border
        // borderRadius: "0",
        // backgroundColor:"#f0f0f0",
        //border:"1px solid red",
        boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
        // (isValid && searchHeaderData.CONTEXT.length===0)
        // '& input + fieldset': {
        //   // borderColor: 'gray',
        //   // borderRadius:"0",
        //   // boxShadow:"rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
        // },
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
        height: '20px',
    }),
    option: provided => ({
        ...provided,
        // color: 'blue',
        fontSize: "12px",
    }),
    placeholder: (provided, state) => ({
        ...provided,
        // marginTop: '-30px',
        color: "gray"
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
    menu: provided => ({ ...provided, zIndex: 9999 }),
    menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 0,
        // border:"1px solid pink"
    })
};

const styleSelect3 = {
    control: base => ({
        ...base,
        width: "100px",
        fontSize: "12px",
        minHeight: "20px",
        margin: "0px 0px 0px 0px",
        // This line disable the blue border
        borderRadius: "0px",
        border: 0,
        borderBottom: "1px solid gray"
        // backgroundColor:"#f0f0f0",
        //border:"1px solid red",
        // boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
        // (isValid && searchHeaderData.CONTEXT.length===0)
        // '& input + fieldset': {
        //   // borderColor: 'gray',
        //   // borderRadius:"0",
        //   // boxShadow:"rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
        // },
    })
    ,
    dropdownIndicator: (base) => ({
        ...base,
        padding: 0,
        // paddingBottom: 0,
    }),
    clearIndicator: (base) => ({
        ...base,
        paddingTop: 0,
        paddingBottom: 0,
    }),
    valueContainer: (provided) => ({
        ...provided,
        // minHeight: '1px',
        height: '20px',
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
        justifyContent: "right"
        // minHeight: '1px',
    }),
    option: provided => ({
        ...provided,
        // color: 'blue',
        fontSize: "12px",
    }),
    menu: base => ({
        ...base,
        // override border radius to match the box
        borderRadius: 0,
        // backgroundColor: 'black',
        // kill the gap
        marginTop: 0
    }),
    menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 0
    })
};

const styleSelect4 = {
    control: base => ({
        ...base,
        width: "180px",
        fontSize: "12px",
        minHeight: "20px",
        margin: "0px 0px 0px 0px",
        // This line disable the blue border
        borderRadius: "0px",
        border: 0,
        borderBottom: "1px solid gray"
        // backgroundColor:"#f0f0f0",
        //border:"1px solid red",
        // boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
        // (isValid && searchHeaderData.CONTEXT.length===0)
        // '& input + fieldset': {
        //   // borderColor: 'gray',
        //   // borderRadius:"0",
        //   // boxShadow:"rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
        // },
    })
    ,
    dropdownIndicator: (base) => ({
        ...base,
        padding: 0,
        // paddingBottom: 0,
    }),
    clearIndicator: (base) => ({
        ...base,
        paddingTop: 0,
        paddingBottom: 0,
    }),
    valueContainer: (provided) => ({
        ...provided,
        // minHeight: '1px',
        height: '20px',
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
        justifyContent: "right"
        // minHeight: '1px',
    }),
    option: provided => ({
        ...provided,
        // color: 'blue',
        fontSize: "12px",
    }),
    menu: base => ({
        ...base,
        // override border radius to match the box
        borderRadius: 0,
        // backgroundColor: 'black',
        // kill the gap
        marginTop: 0
    }),
    menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 0
    })
};


const LocGroupItemDetailsHeader = [
    { id: "TRAN_ITEM", label: "Sku", width: 80, height: "auto", maxWidth: 80 },
    { id: "TRAN_ITEM_DESC", label: "Description", width: 250, height: "auto", maxWidth: 250 },
    { id: "WH_ID", label: "Location", width: 80, height: "auto", maxWidth: 80 },
    { id: "LOC_TYPE", label: "Location Type", width: 90, height: "auto", maxWidth: 90 },
    { id: "FINAL_ALLOCATION", label: "Final Alloc", width: 80, height: "auto", maxWidth: 80 },
    { id: "STOCK_ON_HAND", label: "SOH", width: 80, height: "auto", maxWidth: 80 },
    { id: "FUTURE_FULFILL_QTY", label: "On Order", width: 80, height: "auto", maxWidth: 80 },
    { id: "PO_QTY", label: "PO Qty", width: 80, height: "auto", maxWidth: 80 },
    { id: "MESSAGE", label: "Message", width: 250, height: "auto", maxWidth: 250 },
]

const ItemWHData = [
    { ITEM_PARENT: "12345001", ITEM_DESC: "Test Style1", DIFF_ID: "BLUE", LOC: "1001", LOC_TYPE: "W", FINAL_ALLOCATION: "20", SOH: "396", FUTURE_FULFILL: "234", PO_QTY: "16", FINAL_PO_QTY: "", SUPPLIER: "45000", SUPPLIER_DESC: "Test Supplier1", ORIGIN_CTY: "CN", PO: "", PO_TYPE: "Warehouse" },
    { ITEM_PARENT: "12345002", ITEM_DESC: "Test Style2", DIFF_ID: "BLACK", LOC: "1001", LOC_TYPE: "W", FINAL_ALLOCATION: "32", SOH: "374", FUTURE_FULFILL: "0", PO_QTY: "0", FINAL_PO_QTY: "", SUPPLIER: "46000", SUPPLIER_DESC: "Test Supplier2", ORIGIN_CTY: "BN", PO: "", PO_TYPE: "Warehouse" }
]

const LocData = [
    { ITEM_ID: "1234501", ITEM_DESC: "Test Item-MEDIUM", LOC: "1001", LOC_TYPE: "W", FINAL_ALLOC: "5", SOH: "80", FUTURE_FULFILL: "96", PO_QTY: "16", MESSAGE: "" },
    { ITEM_ID: "1234502", ITEM_DESC: "Test Item-SMALL", LOC: "1001", LOC_TYPE: "W", FINAL_ALLOC: "5", SOH: "83", FUTURE_FULFILL: "78", PO_QTY: "0", MESSAGE: "" },
    { ITEM_ID: "1234503", ITEM_DESC: "Test Item-LARGE", LOC: "1001", LOC_TYPE: "W", FINAL_ALLOC: "8", SOH: "156", FUTURE_FULFILL: "60", PO_QTY: "0", MESSAGE: "" },
    { ITEM_ID: "1234504", ITEM_DESC: "Test Item-XSMALL", LOC: "1001", LOC_TYPE: "W", FINAL_ALLOC: "2", SOH: "77", FUTURE_FULFILL: "0", PO_QTY: "0", MESSAGE: "" }
]



const WhatIFSummary = ({ ApproveFreeseCheck, allocNoData, setTab, setOpenDialog, setDialogData, setCheckOkWhatIfSummCheck, setApproveFreeseCheck, callMode
}) => {
    const initialdata = {
        PO_TYPE: "",
        PO_TYPE_DESC: "",
        MULTI_WAREHOUSE: "N",
        ALLOC_NO: allocNoData.ALLOC_NO,
    }
    const [allocDetails, setAllocDetails] = useState([])
    const [ItemWHDetailsData, setItemWHDetailsData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [LocGroupItemDetailsData, setLocGroupItemDetailsData] = useState([]);
    const [tableDataLoc, setTableDataLoc] = useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [order1, setOrder1] = React.useState('asc');
    const [orderBy1, setOrderBy1] = React.useState('');
    const [selected, setSelected] = useState([]);
    const [searchData, setSearchData] = useState(initialdata)
    const [multiWHCheck, setMultiWHCheck] = useState(false);

    const [isSearch, setSearch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState({});
    const [inputValue2, setInputValue2] = useState({});
    const [inputValueLoc, setInputValueLoc] = useState({});
    const [copyValue, setCopyValue] = useState([]);
    const [sampleVal, setSampleVal] = useState([]);

    const [valMultiWHCheck, setvalMultiWHCheck] = useState(0);
    const [valPOTypeCheck, setvalPOTypeCheck] = useState(false);

    const [POTypeWhatIFData, setPOTypeWhatIFData] = useState([]);
    const [SupplierWhatIFData, setSupplierWhatIFData] = useState([]);
    const [OriginCrtyWhatIFData, setOriginCrtyWhatIFData] = useState([]);
    const [SupplierWhatIFDataCheck, setSupplierWhatIFDataCheck] = useState(false);

    const [LockCheck, setLockCheck] = useState(false);
    const [LoadCheck, setLoadCheck] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});

    const [SubmitLoadCheck, setSubmitLoadCheck] = useState(false);
    const [allocDetailsCheck, setAllocDetailsCheck] = useState(false)

    const [LocGroupItemDetailsDataSample, setLocGroupItemDetailsDataSample] = useState([]);
    const [LocGroupItemDetailsDataCheck, setLocGroupItemDetailsDataCheck] = useState(false);

    // Error popup message
    const [openDialogWIS, setOpenDialogWIS] = useState(false);
    const [DialogDataWIS, setDialogDataWIS] = useState("")

    // Manage columns popup in Table Grid
    const [openDialogManageItemWHDtl, setOpenDialogManageItemWHDtl] = useState(false);
    const [openDialogManageLocGroup, setOpenDialogManageLocGroup] = useState(false);

    const [isSHovered1, setIsHovered1] = useState(false);
    const [isSHovered2, setIsHovered2] = useState(false);

    const handleSEnter1 = () => { setIsHovered1(true); };
    const handleSEnter2 = () => { setIsHovered2(true); };

    const handleSLeave1 = () => { setIsHovered1(false); };
    const handleSLeave2 = () => { setIsHovered2(false); };

    const [ManageHeaderCheck, setManageHeaderCheck] = useState(true);
    const [ManageHeaderDataItemWHDtl, setManageHeaderDataItemWHDtl] = useState([]);
    const [ManageHeaderDataLocGroup, setManageHeaderDataLocGroup] = useState([]);

    // PO PREVIEW SCREEN
    const [openPoPrv, setOpenPoPrv] = useState(false);
    const [poPrvData, setPoPrvData] = useState([]);
    const [poEnable, setPoEnable] = useState(false);
    const [rtvOnSuccess, setRtvOnSuccess] = useState(false)
    const WhatIFSummaryClasses = useStyles();
    // CHECK OK/CANCEL CLICK
    var okButtonClicked = false;
    var cancelButtonClicked = false;
    const [closeOnBlur, setCloseOnBlur] = useState("");
    const ItemWHDetailsHeader = [
        { id: "SOURCE_ITEM", label: allocDetails.length > 0 && allocDetails[0].ALLOC_LEVEL_CODE === 'D' ? "Style" : "Sku", width: "100px", height: "auto", maxWidth: "120px" },
        { id: "SOURCE_ITEM_DESC", label: "Description", width: "180px", height: "auto", maxWidth: "180px" },
        { id: "DIFF_ID", label: "Variant", width: "100px", height: "auto", maxWidth: "100px" },
        { id: "WH_ID", label: "Location", width: 85, height: "auto", maxWidth: 85 },
        { id: "LOC_TYPE", label: "Location Type", width: 100, height: "auto", maxWidth: 100 },
        { id: "FINAL_ALLOCATION", label: "Final Allocation", width: 110, height: "auto", maxWidth: 110 },
        { id: "STOCK_ON_HAND", label: "SOH", width: 85, height: "auto", maxWidth: 85 },
        { id: "FUTURE_FULFILL_QTY", label: "On Order", width: 90, height: "auto", maxWidth: 95 },
        { id: "PO_QTY", label: "PO Qty", width: 85, height: "auto", maxWidth: 100 },
        { id: "FINAL_PO_QTY", label: "Final PO Qty", width: 90, height: "auto", maxWidth: 98 },
        { id: "SUPPLIER", label: "Supplier", width: 90, height: "auto", maxWidth: 90 },
        { id: "SUPPLIER_DESC", label: "Supplier Desc", width: "180px", height: "auto", maxWidth: "180px" },
        { id: "ORIGIN_COUNTRY_ID", label: "Origin Cty", width: 90, height: "auto", maxWidth: 90 },
        { id: "ORDER_NO", label: "PO", width: 85, height: "auto", maxWidth: 85 },
        { id: "ORDER_TYPE", label: "PO Type", width: 85, height: "auto", maxWidth: 85 },
    ]

    useEffect(() => {
        document.title = 'Pre Buy Summary';
    }, []);

    const WhatIFSummaryData = useSelector(
        (state) => state.WhatIFReducers
    );

    const dispatch = useDispatch();

    var check = false;

    useEffect(() => {
        setLoading(true);
        dispatch(getALLOCHEADDETAILSRequest([allocNoData]));
    }, [""]);

    useEffect(() => {
        if (!check) {
            setLoading(true);
            // dispatch(getQTYLIMITSRequest([{ ...allocNoData, ...I_MODE }]));
            dispatch(postPOTYPEWHATIFRequest([{}]));
            check = true
        }
    }, [""]);

    const serializedata = (datatable) => {
        let newTabledata = [];
        let count = 1;
        if (datatable.length > 0) {
            datatable.map(item => {
                item['SR_NO'] = count;
                count++;
                const reorder = {
                    "ALLOC_NO": "",
                    "DIFF_ID": "",
                    "FINAL_ALLOCATION": "",
                    "FINAL_PO_QTY": "",
                    "FUTURE_FULFILL_QTY": "",
                    "LOC_TYPE": "",
                    "MULTI_WH_IND": "",
                    "ORDER_NO": "",
                    "ORDER_TYPE": "",
                    "ORIGIN_COUNTRY_ID": "",
                    "PO_QTY": "",
                    "SEL_IND": "",
                    "SOURCE_ITEM": "",
                    "SOURCE_ITEM_DESC": "",
                    "STOCK_ON_HAND": "",
                    "SUPPLIER": "",
                    "SUPPLIER_DESC": "",
                    "WH_ID": "",
                }

                let test = Object.assign(reorder, item);
                newTabledata.push(test);
            })
            // setTabledataclone(newTabledata)
            return newTabledata;
        }
    }

    if (allocDetails.length > 0 && allocDetailsCheck) {
        if (allocDetails[0].ALLOC_LEVEL_CODE === "D") {
            ItemWHDetailsHeader.map((option) => { if (option.label === "Item") { option.label = "Item parent" } })
        } else if (allocDetails[0].ALLOC_LEVEL_CODE === "T") {
            ItemWHDetailsHeader.map((option) => { if (option.label === "Item parent") { option.label = "Item" } })
        }
        setAllocDetailsCheck(false);
    }


    useEffect(() => {
        if (
            WhatIFSummaryData?.data?.POTypeWhatIFData
            && Array.isArray(WhatIFSummaryData?.data?.POTypeWhatIFData)
        ) {
            setSubmitLoadCheck(false);
            setPOTypeWhatIFData(WhatIFSummaryData?.data?.POTypeWhatIFData);
            setLoading(false);
        } else if (
            WhatIFSummaryData?.data?.ItemWHDetailsData
            && Array.isArray(WhatIFSummaryData?.data?.ItemWHDetailsData)
        ) {
            if (String(WhatIFSummaryData?.data?.ItemWHDetailsData[2]).length > 0) {
                setOpenDialog(true);
                setDialogData(String(WhatIFSummaryData?.data?.ItemWHDetailsData[2]));
                setLoadCheck(false);
            }
            if (WhatIFSummaryData?.data?.ItemWHDetailsData[0].length > 0) {
                var temp11 = stableSort(WhatIFSummaryData?.data?.ItemWHDetailsData[0], getComparator("asc", "SOURCE_ITEM"))
                setItemWHDetailsData(serializedata(temp11));
                setTableData(serializedata(temp11));

                let UniqITEM =
                    WhatIFSummaryData?.data?.ItemWHDetailsData[0].length > 0
                        ? [...new Map(WhatIFSummaryData?.data?.ItemWHDetailsData[0].map((item) => [item["SOURCE_ITEM"], item])).values()]
                        : [];

                const temp = []
                if (UniqITEM.length > 0) {
                    UniqITEM.map((obj) => { temp.push(obj.SOURCE_ITEM) })
                }

                setSupplierWhatIFData([])
                dispatch(postSUPPLIERWHATIFRequest([{ ITEM: temp }]));
            }

            if (WhatIFSummaryData?.data?.ItemWHDetailsData[1].length > 0 && WhatIFSummaryData?.data?.ItemWHDetailsData[0].length > 0) {
                setLocGroupItemDetailsDataCheck(true)
                var temp12 = stableSort(WhatIFSummaryData?.data?.ItemWHDetailsData[0], getComparator("asc", "WH_ID"))
                var Var1 = temp12[0].SOURCE_ITEM
                var Var2 = temp12[0].WH_ID
                var Var3 = temp12[0].LOC_TYPE
                var Var4 = temp12[0].DIFF_ID
                const temp5 = WhatIFSummaryData?.data?.ItemWHDetailsData[1].filter(row =>
                    row.SOURCE_ITEM === Var1 && row.WH_ID === Var2 && row.LOC_TYPE === Var3 && row.DIFF_ID === Var4)
                setLocGroupItemDetailsData(temp5);
                setTableDataLoc(temp5);
                setSelectedRow(temp12[0].SR_NO)
                setLocGroupItemDetailsDataCheck(false);
                setLocGroupItemDetailsDataSample(WhatIFSummaryData?.data?.ItemWHDetailsData[1])
                // setTableDataLoc(WhatIFSummaryData?.data?.ItemWHDetailsData[1])
            }
            setSubmitLoadCheck(false);
            setLoading(false);
            setLoadCheck(false)
        } else if (
            WhatIFSummaryData?.data?.SupplierWhatIFData
            && Array.isArray(WhatIFSummaryData?.data?.SupplierWhatIFData)
        ) {
            setSupplierWhatIFData(WhatIFSummaryData?.data?.SupplierWhatIFData);
            setSupplierWhatIFDataCheck(true);
            setLoading(false);
            if (ItemWHDetailsData.length > 0) {
                let UniqITEM =
                    ItemWHDetailsData.length > 0
                        ? [...new Map(ItemWHDetailsData.map((item) => [item["SOURCE_ITEM"], item])).values()]
                        : [];

                const temp = []
                if (UniqITEM.length > 0) {
                    UniqITEM.map((obj) => { temp.push(obj.SOURCE_ITEM) })
                }

                setOriginCrtyWhatIFData([])
                dispatch(postORIGINCRTYWHATIFRequest([{ ITEM: temp }]));
            }
            setSubmitLoadCheck(false);
        } else if (
            WhatIFSummaryData?.data?.OriginCrtyWhatIFData
            && Array.isArray(WhatIFSummaryData?.data?.OriginCrtyWhatIFData)
        ) {
            setOriginCrtyWhatIFData(WhatIFSummaryData?.data?.OriginCrtyWhatIFData);
            setLoading(false);
        } else if (
            WhatIFSummaryData?.data?.allocDetails
            && Array.isArray(WhatIFSummaryData?.data?.allocDetails)
        ) {
            setAllocDetails(WhatIFSummaryData?.data?.allocDetails);
            setAllocDetailsCheck(true);
            setLoading(false);
        } else if (
            WhatIFSummaryData?.data?.SubmitItemWHDetailsData
        ) {
            if (WhatIFSummaryData?.data?.SubmitItemWHDetailsData?.status === 200) {
                setLoadCheck(false);
            } else if (WhatIFSummaryData?.data?.SubmitItemWHDetailsData?.status === 500) {
                setOpenDialog(true);
                setDialogData(String(WhatIFSummaryData?.data?.SubmitItemWHDetailsData?.message));
                setLoadCheck(false);
            }
            setSubmitLoadCheck(true);
        } else {
            setSearch(false);
        }
        if (
            WhatIFSummaryData?.data?.poPrvData
        ) {

            if (
                WhatIFSummaryData?.data?.poPrvData
                && Array.isArray(WhatIFSummaryData?.data?.poPrvData)
            ) {
                setPoPrvData((WhatIFSummaryData?.data?.poPrvData)[0])
                setPoEnable((WhatIFSummaryData?.data?.poPrvData)[1])
            } else if (WhatIFSummaryData?.data?.poPrvData?.status === 500) {
                setOpenDialog(true);
                setDialogData(String(WhatIFSummaryData?.data?.poPrvData?.message));
                setPoEnable(false);
            }
            setLoadCheck(false);
            setOpenPoPrv(true);
            WhatIFSummaryData.data.poPrvData = false;
        }
    }, [WhatIFSummaryData?.data]);


    if (ItemWHDetailsData.length > 0 && LocGroupItemDetailsData.length > 0 && SubmitLoadCheck) {
        setLocGroupItemDetailsData([])
        setItemWHDetailsData([])
        setSubmitLoadCheck(false);
        setTab("1");
        setCheckOkWhatIfSummCheck(true);
    }


    if (SupplierWhatIFData.length > 0 && SupplierWhatIFDataCheck) {
        if (SupplierWhatIFData.length > 0) {
            ItemWHDetailsData.map((row) => {
                SupplierWhatIFData.map(obj => {
                    if (row.SOURCE_ITEM === obj.ITEM && row.SUPPLIER === obj.SUPPLIER) {
                        row["SUPPLIER_DESC"] = obj.SUPPLIER_DESC
                    }
                })
            })
            setItemWHDetailsData(ItemWHDetailsData);
            setTableData(ItemWHDetailsData)
        }
        setSupplierWhatIFDataCheck(false);
    }
    // //console.log(" Hello :::", ItemWHDetailsData)
    // if (LocGroupItemDetailsDataSample.length && LocGroupItemDetailsDataCheck && ItemWHDetailsData.length) {
    //     ////console.log("LocGroupItemDetailsDataSample: ", LocGroupItemDetailsDataSample, ItemWHDetailsData[0]);
    //     var Var1 = ItemWHDetailsData[0].SOURCE_ITEM
    //     var Var2 = ItemWHDetailsData[0].WH_ID
    //     var Var3 = ItemWHDetailsData[0].LOC_TYPE
    //     const temp = LocGroupItemDetailsDataSample.filter(row =>
    //         row.SOURCE_ITEM === Var1 && row.WH_ID === Var2 && row.LOC_TYPE === Var3)
    //     ////console.log("LocGroupItemDetailsDataSample:1:  ", temp, Var1, Var2, Var3);
    //     setLocGroupItemDetailsDataSample(temp);
    //     setTableDataLoc(temp);
    //     setLocGroupItemDetailsDataCheck(false);
    // }
    const SelectRowSize = (e, value) => {
        const temp5 = LocGroupItemDetailsDataSample.filter(row =>
            row.SOURCE_ITEM === value.SOURCE_ITEM && row.WH_ID === value.WH_ID && row.LOC_TYPE === value.LOC_TYPE && row.DIFF_ID === value.DIFF_ID)
        setLocGroupItemDetailsData(temp5);
        setTableDataLoc(temp5);
        setSelectedRow(value.SR_NO);
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.root}`]: {
            height: "10px",
            padding: "0px",
        },
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "DodgerBlue",
            color: theme.palette.common.black,
            fontSize: "12px",
            textAlign: "left"
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: "11px",
            textAlign: "left"
        },
        root: {
            width: "calc(100%/3)"
        }
    }));

    const SearchButtonHeaderDesc = () => (
        <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} >
            <InfoIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em', color: "CadetBlue" }}
                onClick={() => {
                    setOpenDialogWIS(true);
                    setDialogDataWIS(String(allocDetails[0].ALLOC_DESC));
                }}
            />
        </IconButton>
    )

    const SearchHeader = () => (
        <Box
            component="fieldset"
            display="flex"
            sx={{
                backgroundColor: "",
                height: "auto",
                // width: "100%",
                width: "calc(93vw - 0px)",
                borderRadius: 1,

                boxShadow: 2, border: 0,
                borderBottom: 3,
                border: "1px solid lightgrey",
                // width: "100%",
            }}
        >

            <legend style={{ fontWeight: "bold" }}>Header</legend>

            <div className={WhatIFSummaryClasses.header_container}>
                <div className={WhatIFSummaryClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Allocation ID</InputLabel>
                    </div>
                    <div>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 2px",
                                width: "100px",
                                "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "5px",
                                    height: "15px",
                                }
                            }}
                            id="outlined-disabled"
                            name="ALLOC_NO"

                            //   value={searchHeaderData.ALLOC_DESC}
                            value={allocDetails.length > 0 ? allocDetails[0].ALLOC_NO : null}
                            defaultValue={allocDetails.length > 0 ? allocDetails[0].ALLOC_NO : null}
                            inputProps={{
                                maxLength: 100,
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: WhatIFSummaryClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={WhatIFSummaryClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
                            Description</InputLabel>
                    </div>
                    <div>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 0px", width: "25vh"
                                , "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "5px",
                                    height: "14px",
                                },
                                borderRadius: "5px",
                                boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                            }}
                            id="outlined-disabled"
                            name="ALLOC_DESC"
                            autoComplete='off'
                            value={allocDetails.length > 0 ? allocDetails[0].ALLOC_DESC : null}
                            defaultValue={allocDetails.length > 0 ? allocDetails[0].ALLOC_DESC : null}
                            // onChange={onChange}
                            inputProps={{
                                maxLength: 100,
                            }}
                            InputProps={{
                                endAdornment: <SearchButtonHeaderDesc />,
                                className: WhatIFSummaryClasses.input,
                                style: { fontSize: 12, height: "30px", backgroundColor: "#f0f0f0", }
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={WhatIFSummaryClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
                            Alloc Context</InputLabel>
                    </div>
                    <div className={WhatIFSummaryClasses.multiselectfield}>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 0px", width: "20vh"
                                , "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "5px",
                                    height: "15px",
                                }
                            }}
                            id="outlined-disabled"
                            name="CONTEXT_TYPE"
                            value={allocDetails.length > 0 ? allocDetails[0].CONTEXT : null}
                            defaultValue={allocDetails.length > 0 ? allocDetails[0].CONTEXT : null}
                            inputProps={{
                                maxLength: 100, sx: { backgroundColor: '#fff' },
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: WhatIFSummaryClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                {allocDetails.length > 0 ? (allocDetails[0].CONTEXT === "Promotion" ?
                    [
                        <div className={WhatIFSummaryClasses.header_child}>
                            <div>
                                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
                                    Promotion</InputLabel>
                            </div>
                            <div className={WhatIFSummaryClasses.multiselectfield}>
                                <TextField
                                    size="small"
                                    sx={{
                                        margin: "0px 0px 2px 0px", width: "20vh"
                                        , "& .MuiInputBase-input.Mui-disabled": {
                                            backgroundColor: "#f0f0f0",
                                            borderRadius: "5px",
                                            height: "15px",
                                        }
                                    }}
                                    id="outlined-disabled"
                                    name="PROMOTION"

                                    value={allocDetails.length > 0 ? allocDetails[0].PROMOTION : null}
                                    defaultValue={allocDetails.length > 0 ? allocDetails[0].PROMOTION : null}
                                    inputProps={{
                                        maxLength: 100,
                                    }}
                                    InputProps={{
                                        style: { fontSize: 12 },
                                        className: WhatIFSummaryClasses.input,
                                    }}
                                    disabled
                                />
                            </div>
                        </div>
                    ] : null)
                    : null}


                <div className={WhatIFSummaryClasses.header_child}>
                    <div >
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
                            Alloc Level</InputLabel>
                    </div>
                    <div className={WhatIFSummaryClasses.multiselectfield}>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 0px", width: "20vh"
                                , "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "5px",
                                    height: "15px",
                                }
                            }}
                            id="outlined-disabled"
                            name="ALLOC_LEVEL"

                            value={allocDetails.length > 0 ? allocDetails[0].ALLOC_LEVEL : null}
                            defaultValue={allocDetails.length > 0 ? allocDetails[0].ALLOC_LEVEL : null}
                            inputProps={{
                                maxLength: 100,
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: WhatIFSummaryClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={WhatIFSummaryClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
                            Release Date</InputLabel>
                    </div>
                    <div>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 0px", width: "20vh"
                                , "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "5px",
                                    height: "15px",
                                }
                            }}
                            id="outlined-disabled"
                            name="RELEASE_DATE"

                            value={allocDetails.length > 0 ? allocDetails[0].RELEASE_DATE : null}
                            defaultValue={allocDetails.length > 0 ? allocDetails[0].RELEASE_DATE : null}
                            inputProps={{
                                maxLength: 100,
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: WhatIFSummaryClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={WhatIFSummaryClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
                            Status</InputLabel>
                    </div>
                    <div className={WhatIFSummaryClasses.multiselectfield}>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 0px", width: "20vh"
                                , "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "5px",
                                    height: "15px",
                                }
                            }}
                            disabled
                            name="STATUS"
                            value={allocDetails.length > 0 ? allocDetails[0].STATUS : null}
                            defaultValue={allocDetails.length > 0 ? allocDetails[0].STATUS : null}
                            id="outlined-disabled"
                            InputProps={{
                                style: { fontSize: 12 },
                                className: WhatIFSummaryClasses.input,
                            }}
                        />
                    </div>
                </div>

                <div className={WhatIFSummaryClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
                            Alloc Type</InputLabel>
                    </div>
                    <div className={WhatIFSummaryClasses.multiselectfield}>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 0px", width: "20vh"
                                , "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "5px",
                                    height: "15px",
                                }
                            }}
                            id="outlined-disabled"
                            name="ALLOC_TYPE"

                            value={allocDetails.length > 0 ? allocDetails[0].ALLOC_TYPE : null}
                            defaultValue={allocDetails.length > 0 ? allocDetails[0].ALLOC_TYPE : null}
                            inputProps={{
                                maxLength: 100,
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: WhatIFSummaryClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={WhatIFSummaryClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
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
                            value={allocDetails.length > 0 ? allocDetails[0].ALLOCATOR : null}
                            defaultValue={allocDetails.length > 0 ? allocDetails[0].ALLOCATOR : null}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: WhatIFSummaryClasses.input,
                            }}
                        />
                    </div>
                </div>
            </div>
        </Box>
    )


    const selectPOTYPE = (val) => {
        if (val) {
            setItemWHDetailsData([])
            setTableData([])
            setLocGroupItemDetailsData([])
            setTableDataLoc([])

            setSearchData((prev) => {
                return {
                    ...prev,
                    PO_TYPE: val.CODE,
                    PO_TYPE_DESC: val.CODE_DESC
                };
            });
            if (val.CODE === "DSD") {
                setSearchData((prev) => {
                    return {
                        ...prev,
                        MULTI_WAREHOUSE: "N",
                    };
                });
                setMultiWHCheck(false)
            }
            setvalPOTypeCheck(true)
            setvalMultiWHCheck(1)
            setLoadCheck(true);
        }
        else {
            setSearchData((prev) => {
                return {
                    ...prev,
                    PO_TYPE: "",
                    PO_TYPE_DESC: "",
                };
            });
            setItemWHDetailsData([]);
            setTableData([]);
            setLocGroupItemDetailsData([]);
            setTableDataLoc([]);
            setSupplierWhatIFData([]);
            setOriginCrtyWhatIFData([]);
            setLocGroupItemDetailsDataSample([]);
            setvalPOTypeCheck(false)
            setvalMultiWHCheck(0)
        }
        setInputValue({});
        setInputValue2({});
        setInputValueLoc({});
        setCopyValue([]);
    }

    const handleChangeMultiWH = (e) => {
        if (e.target.checked) {
            setSearchData((prev) => {
                return {
                    ...prev,
                    MULTI_WAREHOUSE: "Y",
                };
            });
        }
        else {
            setSearchData((prev) => {
                return {
                    ...prev,
                    MULTI_WAREHOUSE: "N",
                };
            });
        }
        setMultiWHCheck(e.target.checked)
        if (valMultiWHCheck === 1) {
            setvalPOTypeCheck(true)
            setLoadCheck(true)
        }
    }

    const SubmitValueList = (e) => {
        const temp = ItemWHDetailsData.filter(obj => (obj.SUPPLIER === "" || obj.ORIGIN_COUNTRY_ID === ""))
        if (temp.length > 0) {
            setOpenDialogWIS(true);
            setDialogDataWIS("Invalid country of sourcing for this item/supplier combination*");
        }
        else {
            const temp1 = ItemWHDetailsData.filter(obj => selected.includes(obj.SR_NO))
            ItemWHDetailsData.map(obj => {
                temp1.map(row => {
                    if (row.SR_NO === obj.SR_NO) {
                        obj.SEL_IND = 'Y'
                    }
                })
            })
            dispatch(postSUBMITWHATIFRequest([ItemWHDetailsData, LocGroupItemDetailsDataSample, [searchData]]));
            setLoadCheck(true);
        }
        okButtonClicked = false;
    }

    // const [countVal,setCountVal]=useState(0)
    useEffect(() => {
        if (valPOTypeCheck && valMultiWHCheck === 1) {
            dispatch(postRETRIEVEWHATIFRequest([{ ...searchData, ...{ "COUNT": 1 } }]));
            setvalPOTypeCheck(false)
        }
    }, [searchData]);

    /*
    ///////////////////////////////////////
    **************************************
    Item WH Details Table Grid
    **************************************
    ///////////////////////////////////////
    */

    useEffect(() => {
        if (inputValue) {
            for (const key in inputValue) {
                if (inputValue[key] === '') {
                    delete inputValue[key];
                }
            }
        }
        if (inputValue) {
            for (const col in inputValue) {
                var temp_dict = {}
                if (inputValue[col].includes("&") || inputValue[col].includes("%")) {
                    inputValue[col].slice(1)
                    temp_dict[col] = inputValue[col].slice(1)
                    if (temp_dict) {
                        for (const key in temp_dict) {
                            if (temp_dict[key] === '') {
                                delete temp_dict[key];
                            }
                        }
                    }
                    if (col === "SOURCE_ITEM") {
                        const temp = tableData.filter((props) => String(props.SOURCE_ITEM).toLowerCase() === String(temp_dict.SOURCE_ITEM).toLowerCase())
                        setItemWHDetailsData(temp);
                    }
                    else if (col === "SOURCE_ITEM_DESC") {
                        const temp = tableData.filter((props) => String(props.SOURCE_ITEM_DESC).toLowerCase() === String(temp_dict.SOURCE_ITEM_DESC).toLowerCase())
                        setItemWHDetailsData(temp);
                    }
                    else if (col === "DIFF_ID") {
                        const temp = tableData.filter((props) => String(props.DIFF_ID).toLowerCase() === String(temp_dict.DIFF_ID).toLowerCase())
                        setItemWHDetailsData(temp);
                    }
                    else if (col === "WH_ID") {
                        const temp = tableData.filter((props) => String(props.WH_ID).toLowerCase() === String(temp_dict.WH_ID).toLowerCase())
                        setItemWHDetailsData(temp);
                    }
                    else if (col === "LOC_TYPE") {
                        const temp = tableData.filter((props) => String(props.LOC_TYPE).toLowerCase() === String(temp_dict.LOC_TYPE).toLowerCase())
                        setItemWHDetailsData(temp);
                    }
                    else if (col === "FINAL_ALLOCATION") {
                        const temp = tableData.filter((props) => String(props.FINAL_ALLOCATION).toLowerCase() === String(temp_dict.FINAL_ALLOCATION).toLowerCase())
                        setItemWHDetailsData(temp);
                    }
                    else if (col === "STOCK_ON_HAND") {
                        const temp = tableData.filter((props) => String(props.STOCK_ON_HAND).toLowerCase() === String(temp_dict.STOCK_ON_HAND).toLowerCase())
                        setItemWHDetailsData(temp);
                    }
                    else if (col === "FUTURE_FULFILL_QTY") {
                        const temp = tableData.filter((props) => String(props.FUTURE_FULFILL_QTY).toLowerCase() === String(temp_dict.FUTURE_FULFILL_QTY).toLowerCase())
                        setItemWHDetailsData(temp);
                    }
                    else if (col === "PO_QTY") {
                        const temp = tableData.filter((props) => String(props.PO_QTY).toLowerCase() === String(temp_dict.PO_QTY).toLowerCase())
                        setItemWHDetailsData(temp);
                    }
                    else if (col === "FINAL_PO_QTY") {
                        const temp = tableData.filter((props) => String(props.FINAL_PO_QTY).toLowerCase() === String(temp_dict.FINAL_PO_QTY).toLowerCase())
                        setItemWHDetailsData(temp);
                    }
                    else if (col === "SUPPLIER") {
                        const temp = tableData.filter((props) => String(props.SUPPLIER).toLowerCase() === String(temp_dict.SUPPLIER).toLowerCase())
                        setItemWHDetailsData(temp);
                    }
                    else if (col === "SUPPLIER_DESC") {
                        const temp = tableData.filter((props) => String(props.SUPPLIER_DESC).toLowerCase() === String(temp_dict.SUPPLIER_DESC).toLowerCase())
                        setItemWHDetailsData(temp);
                    }
                    else if (col === "ORIGIN_COUNTRY_ID") {
                        const temp = tableData.filter((props) => String(props.ORIGIN_COUNTRY_ID).toLowerCase() === String(temp_dict.ORIGIN_COUNTRY_ID).toLowerCase())
                        setItemWHDetailsData(temp);
                    }
                    else if (col === "ORDER_NO") {
                        const temp = tableData.filter((props) => String(props.ORDER_NO).toLowerCase() === String(temp_dict.ORDER_NO).toLowerCase())
                        setItemWHDetailsData(temp);
                    }
                    else if (col === "PO_TYPE") {
                        const temp = tableData.filter((props) => String(props.PO_TYPE).toLowerCase() === String(temp_dict.PO_TYPE).toLowerCase())
                        setItemWHDetailsData(temp);
                    }

                }
                else {
                    const filteredTable = tableData.filter((props) =>
                        Object.entries(inputValue).every(
                            ([key, val]) =>
                                !val.length ||
                                props[key]
                                    ?.toString()
                                    .toLowerCase()
                                    .includes(val?.toString().toLowerCase())
                        )
                    );
                    setItemWHDetailsData(filteredTable);
                }
            }
        }
        if (Object.keys(inputValue).length === 0) {
            setItemWHDetailsData(tableData)
        }

    }, [inputValue]);

    function ItemWHDetailsTableHead(props) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <>
                <TableHead
                    className={WhatIFSummaryClasses.TitleHead}
                    sx={{ width: "calc(100% - 0px)" }}
                >
                    <TableRow className={WhatIFSummaryClasses.TitleRow}
                    // sx={{ border: "1px solid red" }}

                    >
                        <StyledTableCell padding="checkbox" style={{
                            whiteSpace: "nowrap", padding: "0px", width: "10px"
                        }}
                        >
                            <Checkbox
                                color="primary"
                                size="small"
                                indeterminate={selected.length > 0 && selected.length < ItemWHDetailsData.length}
                                checked={ItemWHDetailsData.length > 0 && selected.length === ItemWHDetailsData.length}
                                onChange={onSelectAllClick}
                                inputProps={{
                                    'aria-label': 'select all data',
                                }}
                                style={{
                                    color: "#fff",
                                    padding: "2px",
                                    // border: "1px solid black"
                                }}
                            />
                        </StyledTableCell>

                        {ItemWHDetailsHeader.map((headCell) => (
                            ManageHeaderDataItemWHDtl.includes(headCell.id) &&
                            <StyledTableCell
                                key={headCell.id}
                                // className={WhatIFSummaryClasses.TableCell}
                                size="small"
                                sortDirection={orderBy === headCell.id ? order : false}
                                style={{
                                    whiteSpace: "nowrap", paddingLeft: "3px",
                                    width: headCell.width,
                                    // display: headCell.display,
                                    maxWidth: headCell.maxWidth,
                                    // border: "1px solid black"
                                }}
                            >
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : "asc"}
                                    onClick={createSortHandler(headCell.id)}
                                    size="small"
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
                                            marginLeft: "0px",
                                        },
                                        padding: "0px",
                                    }}
                                >
                                    {headCell.label}
                                    {orderBy === headCell.id ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === "desc"
                                                ? "sorted descending"
                                                : "sorted ascending"}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>

            </>
        );
    }

    ItemWHDetailsTableHead.propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };

    function ItemWHDetailsTableHeadToolbar(props) {
        const { numSelected } = props;
        return (
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(ItemWHDetailsData.length > 0 &&
                    {
                        minHeight: {
                            minHeight: "25px !important",
                        },
                        // border:"2px solid black", 
                        bgcolor: (theme) =>
                            alpha(
                                theme.palette.primary.main,
                                theme.palette.action.activatedOpacity
                            ),
                    }),
                    padding: "0px",
                }}
            >
                {ItemWHDetailsData.length > 0 && (
                    <Typography
                        sx={{
                            flex: "1 1 100%", display: "flex",
                            justifyContent: "flex-end",
                            padding: "0px 20px 0px 0px",
                            fontSize: "14px",
                            fontFamily: "system-ui",
                        }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        Rows {selected.length} of {ItemWHDetailsData.length}
                    </Typography>
                )}
            </Toolbar>
        );
    }

    function descendingComparator(a, b, orderBy) {
        let c, d;
        if (orderBy == "SUPPLIER_DESC") {
            c = String(b[orderBy]);
            d = String(a[orderBy]);
        }
        else if (orderBy == "ITEM_PARENT" || orderBy == "LOC" || orderBy == "WH_ID" ||
            orderBy == "LOC_TYPE" || orderBy == "FINAL_ALLOCATION" || orderBy == "SOH" ||
            orderBy == "FUTURE_FULFILL" || orderBy == "PO_QTY" || orderBy == "FINAL_PO_QTY" ||
            orderBy == "SUPPLIER" || orderBy == "PO" ||
            orderBy == "PO_TYPE"
        ) {
            c = parseInt(b[orderBy]);
            d = parseInt(a[orderBy]);
            c = isNaN(c) ? c : parseInt(c);
            d = isNaN(d) ? d : parseInt(d);
            c = isNaN(c) ? 0 : parseInt(c);
            d = isNaN(d) ? 0 : parseInt(d);
        }
        else {
            c = isNaN(b[orderBy]) ? b[orderBy] : parseInt(b[orderBy]);
            d = isNaN(a[orderBy]) ? a[orderBy] : parseInt(a[orderBy]);
        }
        // ////console.log("sort heck",typeof(c),d)
        if (c === "NULL" || d === "NULL") {
            if (c === "NULL" && d !== "NULL") {
                return -1
            }
            else if (d === "NULL" && c !== "NULL") {
                return 1
            }
            else if (d !== "" && c === "") {
                return -1
            }
            else if (d === "" && c !== "") {
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

    const [sortCheck, setSortCheck] = useState(false)
    const [sortValue, setSortValue] = useState("");

    useEffect(() => {
        if (rtvOnSuccess) {
            dispatch(postRETRIEVEWHATIFRequest([{ ...searchData, ...{ "COUNT": 2 } }]));
            setLoadCheck(true);
            setRtvOnSuccess(false);
        }
    }, [rtvOnSuccess]);

    useEffect(() => {
        if (sortCheck) {
            if (order === "asc") {
                const sortedData = stableSort(ItemWHDetailsData, getComparator("asc", sortValue));
                setItemWHDetailsData(sortedData);
            }
            if (order === "desc") {
                const sortedData = stableSort(ItemWHDetailsData, getComparator("desc", sortValue));
                setItemWHDetailsData(sortedData);
            }
            setSortCheck(false)
        }
    }, [ItemWHDetailsData, order, orderBy]);

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
        //////console.log("event::",event)
        if (event.target.checked && selected.length === 0) {
            const newSelected = ItemWHDetailsData
                .filter(n => n.ORDER_NO === '')
                .map(n => n.SR_NO);
            //const valid = ItemWHDetailsData.filter(obj => obj.SR_NO === name && obj.ORDER_NO ==='')
            //console.log("selected :::", newSelected)
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        const valid = ItemWHDetailsData.filter(obj => obj.SR_NO === name && obj.ORDER_NO === '')
        if (valid.length === 0) {
            setOpenDialog(true);
            setDialogData("PO is already created.");
            return;
        }

        // if 
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

        setSelected(newSelected);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

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

    useEffect(() => {
        // ////console.log("inputValue::", Object.values(inputValue), Object.keys(inputValue).filter(data => inputValue[data].includes("&")))
        if (Object.keys(inputValue2).length > 0) {
            for (const key in inputValue2) {
                if (inputValue2[key] === '') {
                    delete inputValue2[key];
                }
            }
        }
        if (Object.keys(inputValue2).length > 0) {
            const filteredTable = tableData.filter((props) =>
                Object.entries(inputValue2).every(
                    ([key, val]) =>
                        (props[key].toString().toLowerCase())
                            .includes(val.toString().toLowerCase())
                )

            );
            setItemWHDetailsData(filteredTable);
        }
        if (Object.keys(inputValue2).length === 0) {
            setItemWHDetailsData(tableData)
        }

    }, [inputValue2]);

    const testChange2 = (e, name) => {
        ////console.log("testChange2: ", e, name, OriginCrtyWhatIFData);
        if (name === "SUPPLIER") {
            if (e) {
                setInputValue2((prev) => {
                    return {
                        ...prev,
                        SUPPLIER: e.SUPPLIER,
                    }
                })
                setSampleVal((prev) => {
                    return {
                        ...prev,
                        SUPPLIER: e.SUPPLIER,
                    }
                })
            } else {
                setInputValue2((prev) => {
                    return {
                        ...prev,
                        SUPPLIER: "",
                    }
                })
                setSampleVal((prev) => {
                    return {
                        ...prev,
                        SUPPLIER: "",
                    }
                })
            }
        }
        if (name === "SUPPLIER_DESC") {
            if (e) {
                setInputValue2((prev) => {
                    return {
                        ...prev,
                        SUPPLIER_DESC: e.SUPPLIER_DESC,
                    }
                })
                setSampleVal((prev) => {
                    return {
                        ...prev,
                        SUPPLIER_DESC: e.SUPPLIER_DESC,
                    }
                })
            } else {
                setInputValue2((prev) => {
                    return {
                        ...prev,
                        SUPPLIER_DESC: "",
                    }
                })
                setSampleVal((prev) => {
                    return {
                        ...prev,
                        SUPPLIER_DESC: "",
                    }
                })
            }
        }
        if (name === "ORIGIN_COUNTRY_ID") {
            if (e) {
                setInputValue2((prev) => {
                    return {
                        ...prev,
                        ORIGIN_COUNTRY_ID: e.ORIGIN_COUNTRY_ID,
                    }
                })
                setSampleVal((prev) => {
                    return {
                        ...prev,
                        ORIGIN_COUNTRY_ID: e.ORIGIN_COUNTRY_ID,
                    }
                })
            } else {
                setInputValue2((prev) => {
                    return {
                        ...prev,
                        ORIGIN_COUNTRY_ID: "",
                    }
                })
                setSampleVal((prev) => {
                    return {
                        ...prev,
                        ORIGIN_COUNTRY_ID: "",
                    }
                })
            }
        }
    }

    ////console.log("filteredTable: 2221:", inputValue2);

    const onTableCellChangeWH = (e, value1, value2, value3, name) => {
        ////console.log("HandleClickSupplier3::", e, value1, value2, name, Object.is(e, null))

        if (Object.is(e, null) === false) {
            if (name === "SUPPLIER") {
                ItemWHDetailsData.map((row) => {
                    if (row.SOURCE_ITEM === value1 && row.WH_ID === value2 && row.DIFF_ID === value3) {

                        if (String(row["SUPPLIER"]).length > 0 && String(row["ORIGIN_COUNTRY_ID"]).length > 0) {

                            row["SUPPLIER"] = e.SUPPLIER
                            row["SUPPLIER_DESC"] = e.SUPPLIER_DESC
                            row["ORIGIN_COUNTRY_ID"] = ""
                        }
                        else {

                            row["SUPPLIER"] = e.SUPPLIER
                            row["SUPPLIER_DESC"] = e.SUPPLIER_DESC
                        }
                    }
                })
            }
            if (name === "ORIGIN_COUNTRY_ID") {
                ItemWHDetailsData.map((row) => {
                    if (row.SOURCE_ITEM === value1 && row.WH_ID === value2 && row.DIFF_ID === value3) {
                        ////console.log("HandleClickSupplier::1", ItemWHDetailsData, row.SOURCE_ITEM === value1 && row.WH_ID === value2)
                        if (String(row["SUPPLIER"]).length > 0 && String(row["ORIGIN_COUNTRY_ID"]).length > 0) {
                            ////console.log("HandleClickSupplier::2", ItemWHDetailsData, String(row["SUPPLIER"]).length, String(row["ORIGIN_COUNTRY_ID"]).length, String(row["SUPPLIER"]), String(row["ORIGIN_COUNTRY_ID"]))
                            row["ORIGIN_COUNTRY_ID"] = e.ORIGIN_COUNTRY_ID
                            row["SUPPLIER"] = ""
                            row["SUPPLIER_DESC"] = ""
                        }
                        else {
                            ////console.log("HandleClickSupplier::3", ItemWHDetailsData, String(row["SUPPLIER"]).length, String(row["ORIGIN_COUNTRY_ID"]).length, String(row["SUPPLIER"]), String(row["ORIGIN_COUNTRY_ID"]))
                            row["ORIGIN_COUNTRY_ID"] = e.ORIGIN_COUNTRY_ID
                        }
                    }
                })
            }
        }
        if (Object.is(e, null) === true) {
            // ////console.log("inputValue; aty:::::::12345:::", totalData, e, value, name, Object.is(e, null))
            if (name === "SUPPLIER") {
                ItemWHDetailsData.map((row) => {
                    if (row.SOURCE_ITEM === value1 && row.WH_ID === value2 && row.DIFF_ID === value3) {
                        row["SUPPLIER"] = ""
                        row["SUPPLIER_DESC"] = ""
                    }
                })
            }
            if (name === "ORIGIN_COUNTRY_ID") {
                ItemWHDetailsData.map((row) => {
                    if (row.SOURCE_ITEM === value1 && row.WH_ID === value2 && row.DIFF_ID === value3) {
                        row["ORIGIN_COUNTRY_ID"] = ""
                    }
                })
            }
            ////console.log("HandleClickSupplier:7 ", ItemWHDetailsData);
        }
        ////console.log("HandleClickSupplier:5 ", ItemWHDetailsData);
        let updatedData = []
        let selectedDataOptions = []
        ItemWHDetailsData.map((res) => {
            selectedDataOptions.push(res.SR_NO)
        })
        updatedData = tableData.filter((res) => !selectedDataOptions.includes(res.SR_NO))
        updatedData = [...ItemWHDetailsData, ...updatedData];

        setItemWHDetailsData(ItemWHDetailsData);
        setTableData(updatedData)
        setSampleVal([])
    };

    // ////console.log("HandleClickSupplier: ", SupplierWhatIFData, ItemWHDetailsData);
    /*
    ///////////////////////////////////////
    **************************************
    Loc/Group Item Details Table Grid
    **************************************
    ///////////////////////////////////////
    */

    useEffect(() => {
        // ////console.log("inputValueLoc::", Object.values(inputValueLoc), Object.keys(inputValueLoc).filter(data => inputValueLoc[data].includes("&")))
        if (inputValueLoc) {
            for (const key in inputValueLoc) {
                if (inputValueLoc[key] === '') {
                    delete inputValueLoc[key];
                }
            }
        }
        if (inputValueLoc) {
            for (const col in inputValueLoc) {
                var temp_dict = {}
                if (inputValueLoc[col].includes("&") || inputValueLoc[col].includes("%")) {
                    inputValueLoc[col].slice(1)
                    temp_dict[col] = inputValueLoc[col].slice(1)
                    if (temp_dict) {
                        for (const key in temp_dict) {
                            if (temp_dict[key] === '') {
                                delete temp_dict[key];
                            }
                        }
                    }
                    if (col === "TRAN_ITEM") {
                        const temp = tableDataLoc.filter((props) => String(props.TRAN_ITEM) === String(temp_dict.TRAN_ITEM))
                        setLocGroupItemDetailsData(temp);
                    }
                    else if (col === "TRAN_ITEM_DESC") {
                        const temp = tableDataLoc.filter((props) => String(props.TRAN_ITEM_DESC) === String(temp_dict.TRAN_ITEM_DESC))
                        setLocGroupItemDetailsData(temp);
                    }
                    else if (col === "MESSAGE") {
                        const temp = tableDataLoc.filter((props) => String(props.MESSAGE) === String(temp_dict.MESSAGE))
                        setLocGroupItemDetailsData(temp);
                    }
                    else if (col === "WH_ID") {
                        const temp = tableDataLoc.filter((props) => String(props.WH_ID) === String(temp_dict.WH_ID))
                        setLocGroupItemDetailsData(temp);
                    }
                    else if (col === "LOC_TYPE") {
                        const temp = tableDataLoc.filter((props) => String(props.LOC_TYPE) === String(temp_dict.LOC_TYPE))
                        setLocGroupItemDetailsData(temp);
                    }
                    else if (col === "FINAL_ALLOCATION") {
                        const temp = tableDataLoc.filter((props) => String(props.FINAL_ALLOCATION) === String(temp_dict.FINAL_ALLOCATION))
                        setLocGroupItemDetailsData(temp);
                    }
                    else if (col === "STOCK_ON_HAND") {
                        const temp = tableDataLoc.filter((props) => String(props.STOCK_ON_HAND) === String(temp_dict.STOCK_ON_HAND))
                        setLocGroupItemDetailsData(temp);
                    }
                    else if (col === "FUTURE_FULFILL_QTY") {
                        const temp = tableDataLoc.filter((props) => String(props.FUTURE_FULFILL_QTY) === String(temp_dict.FUTURE_FULFILL_QTY))
                        setLocGroupItemDetailsData(temp);
                    }
                    else if (col === "PO_QTY") {
                        const temp = tableDataLoc.filter((props) => String(props.PO_QTY) === String(temp_dict.PO_QTY))
                        setLocGroupItemDetailsData(temp);
                    }

                    // ////console.log("inputValueLoc:3:",key);
                }
                else {
                    const filteredTable = tableDataLoc.filter((props) =>
                        Object.entries(inputValueLoc).every(
                            ([key, val]) =>
                                !val.length ||
                                props[key]
                                    ?.toString()
                                    .toLowerCase()
                                    .includes(val?.toString().toLowerCase())
                        )
                    );
                    setLocGroupItemDetailsData(filteredTable);
                }
            }
        }
        if (Object.keys(inputValueLoc).length === 0) {
            setLocGroupItemDetailsData(tableDataLoc)
        }

    }, [inputValueLoc]);

    function LocGroupItemDetailsTableHead(props) {
        const { onSelectAllClick, order1, orderBy1, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <>
                <TableHead className={WhatIFSummaryClasses.TitleHead}
                    sx={{ position: "sticky", top: -1, }}
                >
                    <TableRow className={WhatIFSummaryClasses.TitleRow}>


                        {LocGroupItemDetailsHeader.map((headCell) => (
                            ManageHeaderDataLocGroup.includes(headCell.id) &&
                            <StyledTableCell
                                key={headCell.id}
                                // className={WhatIFSummaryClasses.TableCell}
                                size="small"
                                sortDirection={orderBy1 === headCell.id ? order1 : false}
                                style={{
                                    whiteSpace: "nowrap", padding: "0px", margin: "0px", paddingLeft: "3px",
                                    width: headCell.width,
                                    maxWidth: headCell.maxWidth,
                                }}
                            >
                                <TableSortLabel
                                    active={orderBy1 === headCell.id}
                                    direction={orderBy1 === headCell.id ? order1 : "asc"}
                                    onClick={createSortHandler(headCell.id)}
                                    sx={{
                                        "&.MuiTableSortLabel-root": {
                                            color: "white",
                                            fontSize: "0.775rem",
                                        },
                                        "&.MuiTableSortLabel-root:hover": {
                                            color: "#fff",
                                            padding: "0px"
                                        },
                                        "&.Mui-active": {
                                            color: "#fff",
                                        },
                                        "& .MuiTableSortLabel-icon": {
                                            color: "#fff !important",
                                            marginLeft: "0px",
                                            // border:"1px solid red"
                                        },
                                        padding: "0px", margin: "0px"
                                    }}
                                >
                                    {headCell.label}
                                    {orderBy1 === headCell.id ? (
                                        <Box component="span" sx={visuallyHidden} >
                                            {order1 === "desc"
                                                ? "sorted descending"
                                                : "sorted ascending"}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>

            </>
        );
    }

    LocGroupItemDetailsTableHead.propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order1: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy1: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };

    function LocGroupItemDetailsTableHeadToolbar(props) {
        const { numSelected } = props;
        return (
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(LocGroupItemDetailsData.length > 0 &&
                    {
                        minHeight: {
                            minHeight: "25px !important",
                        },
                        // border:"2px solid black", 
                        bgcolor: (theme) =>
                            alpha(
                                theme.palette.primary.main,
                                theme.palette.action.activatedOpacity
                            ),
                    }),
                    padding: "0px",
                }}
            >
                {LocGroupItemDetailsData.length > 0 && (
                    <Typography
                        sx={{
                            flex: "1 1 100%", display: "flex",
                            justifyContent: "flex-end",
                            padding: "0px 20px 0px 0px",
                            fontSize: "14px",
                            fontFamily: "system-ui",
                        }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        Rows : {LocGroupItemDetailsData.length}
                    </Typography>
                )}
            </Toolbar>
        );
    }

    function descendingComparator1(a, b, orderBy1) {
        let c, d;
        // if (orderBy == "ITEM_DESC" || orderBy == "SUPPLIER_DESC") {
        //     c = b[orderBy].slice(b[orderBy].indexOf("-") + 1);
        //     d = a[orderBy].slice(a[orderBy].indexOf("-") + 1);
        //     c = isNaN(c) ? c : parseInt(c);
        //     d = isNaN(d) ? d : parseInt(d);
        //     c = isNaN(c) ? 0 : parseInt(c);
        //     d = isNaN(d) ? 0 : parseInt(d);
        // }
        // else
        if (orderBy1 == "LOC" || orderBy1 == "ITEM_ID" ||
            orderBy1 == "LOC_LIST" || orderBy1 == "FINAL_ALLOC" || orderBy1 == "SOH" ||
            orderBy1 == "FUTURE_FULFILL" || orderBy1 == "PO_QTY" || orderBy1 == "FINAL_PO_QTY"
        ) {
            c = parseInt(b[orderBy1]);
            d = parseInt(a[orderBy1]);
            c = isNaN(c) ? c : parseInt(c);
            d = isNaN(d) ? d : parseInt(d);
            c = isNaN(c) ? 0 : parseInt(c);
            d = isNaN(d) ? 0 : parseInt(d);
        }
        else {
            c = isNaN(b[orderBy1]) ? b[orderBy1] : parseInt(b[orderBy1]);
            d = isNaN(a[orderBy1]) ? a[orderBy1] : parseInt(a[orderBy1]);
        }
        // ////console.log("sort heck",typeof(c),d)
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

    function getComparator1(order1, orderBy1) {
        return order1 === 'desc'
            ? (a, b) => descendingComparator1(a, b, orderBy1)
            : (a, b) => -descendingComparator1(a, b, orderBy1);

    }

    function stableSort1(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order1 = comparator(a[0], b[0]);
            if (order1 !== 0) {
                return order1;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const [sortCheck1, setSortCheck1] = useState(false)
    const [sortValue1, setSortValue1] = useState("")

    useEffect(() => {
        if (sortCheck1) {
            if (order1 === "asc") {
                const sortedData = stableSort1(LocGroupItemDetailsData, getComparator1("asc", sortValue1));
                setLocGroupItemDetailsData(sortedData);
            }
            if (order1 === "desc") {
                const sortedData = stableSort1(LocGroupItemDetailsData, getComparator1("desc", sortValue1));
                setLocGroupItemDetailsData(sortedData);
            }
            setSortCheck1(false)
        }
    }, [LocGroupItemDetailsData, order1, orderBy1]);

    const handleRequestSort1 = (event, property) => {
        if (event) {
            setSortCheck1(true)
            setSortValue1(String(property))
        }
        const isAsc = (orderBy1 === property && order1 === 'asc');
        setOrder1(isAsc ? 'desc' : 'asc');
        setOrderBy1(property);
    };

    const testChange1 = (e) => {
        setInputValueLoc((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
        setSampleVal((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))

    }

    const handleCopyLoc = (e, name) => {
        if (e) {
            if (e.target.name === "PO_QTY") {
                setCopyValue((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value
                }))
            }
        }
    }

    const handleLockFilter = (e) => {
        setLockCheck(true);
    }

    const handleCopyDown = (e) => {
        for (const key in copyValue) {
            if (copyValue[key] === '') {
                delete copyValue[key];
            }
        }

        const copyUpdate = tableDataLoc.map(item => {
            Object.assign(item, copyValue);
            return item;
        })

        copyUpdate.map((obj) => {
            if (Object.keys(obj).includes("TRAN_ITEM")) {
                const temp = tableDataLoc.filter((obj1) =>
                    obj1["TRAN_ITEM"] === obj["TRAN_ITEM"]
                )
            }
        })

        setLocGroupItemDetailsData(tableDataLoc)
        setCopyValue([]);

        const copyUpdate1 = tableData.map(item => {
            Object.assign(item, copyValue);
            return item;
        })

        copyUpdate1.map((obj) => {
            if (Object.keys(obj).includes("SOURCE_ITEM")) {
                const temp = tableData.filter((obj1) =>
                    obj1["SOURCE_ITEM"] === obj["SOURCE_ITEM"]
                )
            }
        })
        setItemWHDetailsData(tableData)
        setLockCheck(false)
        setSampleVal([]);
        // if (selected.length > 0) {
        //     setLockCheck(false);
        //     if (inputValue.length === 0) {
        //         setTotalData(totalData);
        //         setSampleVal(totalData);
        //         setCopyValue(initialCopyValues);
        //         setInputValue([]);
        //         setInputValue1({})
        //     } else {
        //         setTotalData(totalData);
        //         setSampleVal(totalData);
        //         setCopyValue(initialCopyValues);
        //         setInputValue([]);
        //         setInputValue1({})
        //     }
        // }

    }

    const eraseValPoQty = (e) => {
        for (const key in copyValue) {
            if (copyValue[key] === '') {
                delete copyValue[key];
            }
        }

        tableDataLoc.map((row) => {
            if (Object.keys(row).includes("PO_QTY")) {
                row["PO_QTY"] = ""
            }
        }
        )

        tableDataLoc.map((obj) => {
            if (Object.keys(obj).includes("TRAN_ITEM")) {
                const temp = tableDataLoc.filter((obj1) =>
                    obj1["TRAN_ITEM"] === obj["TRAN_ITEM"]

                )
            }
        })

        tableData.map((row) => {
            if (Object.keys(row).includes("PO_QTY")) {
                row["PO_QTY"] = ""
            }
        }
        )

        tableData.map((obj) => {
            if (Object.keys(obj).includes("SOURCE_ITEM")) {
                const temp = tableDataLoc.filter((obj1) =>
                    obj1["SOURCE_ITEM"] === obj["SOURCE_ITEM"]

                )
            }
        })

        setItemWHDetailsData(tableData)
        setLocGroupItemDetailsData(tableDataLoc)
        setSampleVal([]);
    }

    const handleCopyCancel = (e) => {
        setLockCheck(false);
        setCopyValue([])
    };

    const handleCancel = (e) => {
        setLocGroupItemDetailsData([])
        setItemWHDetailsData([])
        setLockCheck(false);
        setTab("1");
        setCheckOkWhatIfSummCheck(true);
        cancelButtonClicked = false;
    }

    const handlePreview = (e) => {
        if (e) {
            // const temp1 = ItemWHDetailsData.filter(obj => selected.includes(obj.SR_NO))
            const temp = ItemWHDetailsData.filter(obj => selected.includes(obj.SR_NO) && (obj.SUPPLIER === "" || obj.ORIGIN_COUNTRY_ID === ""))
            if (selected.length === 0) {
                setOpenDialogWIS(true);
                setDialogDataWIS("There is no record selected to proceed.");
                return
            }
            else if (temp.length > 0) {
                setOpenDialogWIS(true);
                setDialogDataWIS("Invalid country of sourcing for this item/supplier combination*");
                return
            }
            setLoadCheck(true);
            const temp1 = ItemWHDetailsData.filter(obj => selected.includes(obj.SR_NO))
            const temp2 = ItemWHDetailsData.filter(obj => !selected.includes(obj.SR_NO))
            ItemWHDetailsData.map(obj => {
                temp1.map(row => {
                    if (row.SR_NO === obj.SR_NO) {
                        obj.SEL_IND = 'Y'
                        //console.log("CHeck ITEM :: ", obj.SOURCE_ITEM);
                    }
                })
            })
            ItemWHDetailsData.map(obj => {
                temp2.map(row => {
                    if (row.SR_NO === obj.SR_NO) {
                        obj.SEL_IND = 'N'
                    }
                })
            })
            dispatch(postRtvPoPrvRequest([ItemWHDetailsData, LocGroupItemDetailsDataSample, [searchData]]));

        }
    }

    const SearchButtonPO_QTY = () => (
        [
            <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} >
                {LockCheck ?
                    <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }}
                        onClick={handleCopyDown}
                    />
                    : <LockIcon fontSize="small" sx={{ height: '0.6em', width: '0.6em' }} onClick={handleLockFilter} />}
            </IconButton>
            ,
            <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} >
                {LockCheck ?
                    <CancelOutlinedIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }}
                        onClick={handleCopyCancel}
                    />
                    : <BsFillEraserFill fontSize="small"
                        onClick={eraseValPoQty}
                    />}
            </IconButton>
        ]
    )

    const onTableChange = (e, value1, value2) => {
        if (e.target.name === "PO_QTY") {
            tableDataLoc.map((row) => {
                if (row.TRAN_ITEM === value1 && row.WH_ID === value2) {
                    row["PO_QTY"] = e.target.value
                }
            })
            tableData.map((row) => {
                if (row.SOURCE_ITEM === value1 && row.WH_ID === value2) {
                    row["PO_QTY"] = e.target.value
                }
            })
            LocGroupItemDetailsDataSample.map((row) => {
                if (row.SOURCE_ITEM === value1 && row.WH_ID === value2) {
                    row["PO_QTY"] = e.target.value
                }
            })
        }
        setLocGroupItemDetailsDataSample(LocGroupItemDetailsDataSample)
        setItemWHDetailsData(tableData)
        setLocGroupItemDetailsData(tableDataLoc)
        setSampleVal([])
    };

    const handleCloseDialog = (e) => {
        setOpenDialogWIS(false);
        setDialogDataWIS("")
    }

    const handleOkButtonMouseDown = () => {
        okButtonClicked = true;
    };
    const handleCancelButtonMouseDown = () => {
        cancelButtonClicked = true;
    };
    const [poQty, setPoQty] = useState("");
    useEffect(() => {
        if (WhatIFSummaryData?.data?.updatePO) {
            if (WhatIFSummaryData?.data?.updatePO?.status === 200) {

                tableDataLoc.map((row) => {
                    if (row.TRAN_ITEM === poQty.TRAN_ITEM && row.WH_ID === poQty.WH_ID && row.DIFF_ID === poQty.DIFF_ID) {
                        row["PO_QTY"] = poQty.PO_QTY;
                    }
                });
                // tableData.map((row) => {
                //     if (row.SOURCE_ITEM === poQty.SOURCE_ITEM && row.WH_ID === poQty.WH_ID) {
                //         row["PO_QTY"] = poQty.PO_QTY;
                //     }
                // });
                LocGroupItemDetailsDataSample.map((row) => {
                    if (row.TRAN_ITEM === poQty.TRAN_ITEM && row.WH_ID === poQty.WH_ID && row.DIFF_ID === poQty.DIFF_ID) {
                        row["PO_QTY"] = poQty.PO_QTY;
                    }
                });

                let availPOQtyVal = 0;
                LocGroupItemDetailsDataSample.map((data) => {
                    if (data.SOURCE_ITEM === poQty.SOURCE_ITEM && data.WH_ID === poQty.WH_ID && data.DIFF_ID === poQty.DIFF_ID) {
                        if (data.PO_QTY === "" || data.PO_QTY === "NULL" || data.PO_QTY === "NaN") {
                            data.PO_QTY = 0
                            availPOQtyVal = availPOQtyVal + parseInt(data.PO_QTY);
                        } else {
                            availPOQtyVal = availPOQtyVal + parseInt(data.PO_QTY);
                        }
                    }
                })

                tableData.map((row) => {
                    if (row.SOURCE_ITEM === poQty.SOURCE_ITEM && row.WH_ID === poQty.WH_ID && row.DIFF_ID === poQty.DIFF_ID) {
                        row["PO_QTY"] = availPOQtyVal;
                    }
                });

                setLocGroupItemDetailsDataSample(LocGroupItemDetailsDataSample);
                setItemWHDetailsData(tableData);
                setLocGroupItemDetailsData(tableDataLoc);
                setSampleVal([]);
            } else if (WhatIFSummaryData?.data?.updatePO?.status === 500) {

                setLocGroupItemDetailsDataSample(LocGroupItemDetailsDataSample);
                setItemWHDetailsData(tableData);
                setLocGroupItemDetailsData(tableDataLoc);
                setOpenDialogWIS(true);
                setDialogDataWIS(String(WhatIFSummaryData?.data?.updatePO?.message));
            }
            WhatIFSummaryData.data.updatePO.status = 0;
            setPoQty("");
            setLoadCheck(false);
            if (okButtonClicked) {
                SubmitValueList();
                okButtonClicked = false; // Reset the flag after handling the OK button click
            }
        }

    }, [WhatIFSummaryData?.data]);
    const handlePOQtyChangeGrid = (e, row) => {
        if (cancelButtonClicked) {
            handleCancel();
            cancelButtonClicked = false;
            return;
        }
        const reqData = {
            "ALLOC_NO": row.ALLOC_NO,
            "WH_ID": row.WH_ID,
            "SOURCE_ITEM": row.SOURCE_ITEM,
            "TRAN_ITEM": row.TRAN_ITEM,
            "DIFF_ID": row.DIFF_ID,
            "SOM_QTY": row.SOM_QTY,
            "PO_QTY": e.target.textContent
        };
        setPoQty(reqData);
        setLoadCheck(true);
        dispatch(postUpdatePORequest([reqData]));
        // if (okButtonClicked) {
        //     handleG2Ok();
        //     okButtonClicked = false; // Reset the flag after handling the OK button click
        // }
    }
    /*

         #################################################
         ##########  MANAGE COLUMNS IN TABLE  ############
         #################################################
   */

    if (ManageHeaderCheck) {
        var temp2 = []
        ItemWHDetailsHeader.map(row => temp2.push(row.id));
        var temp3 = []
        LocGroupItemDetailsHeader.map(row => temp3.push(row.id));
        setManageHeaderDataItemWHDtl(temp2);
        setManageHeaderDataLocGroup(temp3);
        setManageHeaderCheck(false);
    }

    const HandleManageHeaderItemWHDtl = () => {
        setOpenDialogManageItemWHDtl(true);
    }
    const HandleManageHeaderLocGroup = () => {
        setOpenDialogManageLocGroup(true);
    }

    const handleCloseDialogManageItemWHDtl = (e) => {
        if (ManageHeaderDataItemWHDtl.length > 0) { setOpenDialogManageItemWHDtl(false); }
        else { setOpenDialogWIS(true); setDialogDataWIS("Table must contain atleast one column."); }
    }
    const handleCloseDialogManageLocGroup = (e) => {
        if (ManageHeaderDataLocGroup.length > 0) { setOpenDialogManageLocGroup(false); }
        else { setOpenDialogWIS(true); setDialogDataWIS("Table must contain atleast one column."); }
    }

    const handleManageHeaderClickItemWHDtl = (e, name) => {
        if (e.target.checked === true) {
            const updatedManageHeaderData = [...ManageHeaderDataItemWHDtl, name]; setManageHeaderDataItemWHDtl(updatedManageHeaderData)
        } else {
            const updatedManageHeaderData = ManageHeaderDataItemWHDtl.filter(item => item !== name); setManageHeaderDataItemWHDtl(updatedManageHeaderData)
        }
    }
    const handleManageHeaderClickLocGroup = (e, name) => {
        if (e.target.checked === true) {
            const updatedManageHeaderData = [...ManageHeaderDataLocGroup, name]; setManageHeaderDataLocGroup(updatedManageHeaderData)
        } else {
            const updatedManageHeaderData = ManageHeaderDataLocGroup.filter(item => item !== name); setManageHeaderDataLocGroup(updatedManageHeaderData)
        }
    }

    const handleShowAllManageHeaderItemWHDtl = () => {
        var temp = []
        ItemWHDetailsHeader.map(row => temp.push(row.id));
        setManageHeaderDataItemWHDtl(temp);
    }
    const handleShowAllManageHeaderLocGroup = () => {
        var temp = []
        LocGroupItemDetailsHeader.map(row => temp.push(row.id));
        setManageHeaderDataLocGroup(temp);
    }

    const headerManageItemWHDtl = () => (
        <Box display="inline-block"
            sx={{ backgroundColor: "", height: "auto", padding: "0rem 0rem", width: "100%", }}>
            <div>
                {ItemWHDetailsHeader.map((key) => (
                    <div key={key.id}>
                        <FormControlLabel
                            size="small"
                            sx={{ padding: "0px", margin: "0px 0px 0px 0px", }}
                            control={
                                <Checkbox
                                    sx={{ margin: "0px 0px 0px 0px", padding: "2px", paddingTop: "0px" }}
                                    color="primary"
                                    size="small"
                                    onClick={(event) => [handleManageHeaderClickItemWHDtl(event, key?.id)]}
                                    checked={ManageHeaderDataItemWHDtl.includes(key.id)}
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
    const headerManageLocGroup = () => (
        <Box display="inline-block"
            sx={{ backgroundColor: "", height: "auto", padding: "0rem 0rem", width: "100%", }}>
            <div>
                {LocGroupItemDetailsHeader.map((key) => (
                    <div key={key.id}>
                        <FormControlLabel
                            size="small"
                            sx={{ padding: "0px", margin: "0px 0px 0px 0px", }}
                            control={
                                <Checkbox
                                    sx={{ margin: "0px 0px 0px 0px", padding: "2px", paddingTop: "0px" }}
                                    color="primary"
                                    size="small"
                                    onClick={(event) => [handleManageHeaderClickLocGroup(event, key?.id)]}
                                    checked={ManageHeaderDataLocGroup.includes(key.id)}
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
    return (
        <div>
            {openPoPrv ?
                <div>
                    < WhatIFPO
                        setOpenPoPrv={setOpenPoPrv}
                        allocDetails={allocDetails}
                        setOpenDialog={setOpenDialog}
                        setDialogData={setDialogData}
                        poPrvData={poPrvData}
                        poEnable={poEnable}
                        ApproveFreeseCheck={ApproveFreeseCheck}
                        setRtvOnSuccess={setRtvOnSuccess}
                        setSelected={setSelected}
                        allocNoData={allocNoData}
                        setAllocDetails={setAllocDetails}
                        setApproveFreeseCheck={setApproveFreeseCheck}
                        callMode={callMode}

                    />
                </div >
                :
                <Box className={WhatIFSummaryClasses.maindiv} sx={{ width: "100%" }}>
                    <div >
                        {SearchHeader()}
                    </div>

                    <div >
                        <Box
                            display="inline-block"
                            sx={{
                                backgroundColor: "",
                                height: "auto",
                                width: "calc(93vw - 0px)",
                                borderRadius: 1,

                                boxShadow: 2, border: 0,
                                borderBottom: 3,
                                border: "1px solid lightgrey",
                                margin: "5px 0px 0px 2px"
                            }}
                        >
                            <div className={WhatIFSummaryClasses.course_box}>

                                <Box
                                    display="flex"
                                    sx={{
                                        backgroundColor: "",
                                        margin: "5px 0px 0px 5px",
                                        justifyContent: "space-between",
                                        width: "calc(92vw - 0px)",
                                    }}

                                >
                                    <div>
                                        <div className={WhatIFSummaryClasses.float_child}>
                                            <InputLabel
                                                sx={{
                                                    fontWeight: "bold",
                                                    fontSize: "14px",
                                                    margin: "5px 5px 0px 10px",
                                                    display: 'inline',
                                                    float: 'left',
                                                    color: "black",
                                                    padding: "0px 0px 0px 0px"
                                                }}>
                                                PO Type:</InputLabel>
                                        </div>
                                        <div className={WhatIFSummaryClasses.multiselectfield}>
                                            <Select
                                                // className= {CreateAllocationClasses.inputField}
                                                classNamePrefix="mySelect"
                                                getOptionLabel={option =>
                                                    `${option.CODE_DESC.toString()}`}
                                                getOptionValue={option => option.CODE_DESC}
                                                options={POTypeWhatIFData}
                                                isSearchable={true}
                                                onChange={selectPOTYPE}
                                                maxMenuHeight={180}
                                                isClearable={true}
                                                // placeholder={"Choose a Dept"}
                                                styles={styleSelect1}
                                                sx={{
                                                    // border:"1px solid red"
                                                }}
                                                // components={animatedComponents}
                                                // isClearable={true}
                                                value={POTypeWhatIFData.filter(obj => searchData?.PO_TYPE_DESC === (obj.CODE_DESC))}
                                                closeMenuOnSelect={true}
                                            />
                                            <Modal open={LoadCheck}>
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

                                        <div className={WhatIFSummaryClasses.float_child}>
                                            <FormControlLabel
                                                size="small"
                                                sx={{
                                                    padding: "0px",
                                                    margin: "0px 0px 0px 20px",
                                                    // border:"1px solid red"
                                                }}
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        sx={{
                                                            margin: "0px 0px 0px 0px",
                                                            padding: "2px",
                                                            paddingTop: "0px"
                                                            // border:"1px solid red"
                                                        }}
                                                        disabled={searchData.PO_TYPE === "DSD"}
                                                        checked={multiWHCheck ? true : false}
                                                        onChange={handleChangeMultiWH}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                }
                                                label={<InputLabel
                                                    sx={{
                                                        fontWeight: "bold",
                                                        fontSize: "12px",
                                                        margin: "0px 0px 0px 0px",
                                                        padding: "0px 0px 0px 0px",
                                                        display: 'inline',
                                                        float: 'left',
                                                        // border:"1px solid red"
                                                    }}>
                                                    Multi Warehouse</InputLabel>}
                                            />
                                        </div>
                                    </div>

                                    <div className={WhatIFSummaryClasses.float_child}>
                                        <Button
                                            sx={{
                                                fontSize: "12px",
                                                backgroundColor: "#228B22",
                                                padding: "5px", fontFamily: "system-ui",
                                                width: "100px", marginLeft: "5px", marginTop: "2px",
                                                '&:hover': {
                                                    backgroundColor: '#3CB371', // Change this to the desired "light maroon" color
                                                },
                                            }}
                                            variant="contained"
                                            // className={WhatIFSummaryClasses.textField}
                                            onMouseDown={handleOkButtonMouseDown}
                                            type="submit"
                                            onClick={SubmitValueList}
                                            startIcon={<DoneAllIcon />}
                                        >
                                            Ok</Button>

                                        <Button
                                            sx={{
                                                backgroundColor: "maroon",
                                                fontSize: "12px", padding: "5px", fontFamily: "system-ui",
                                                width: "100px", marginLeft: "5px", marginTop: "2px",
                                                '&:hover': {
                                                    backgroundColor: '#8B0000', // Change this to the desired "light maroon" color
                                                },
                                            }}
                                            variant="contained"
                                            // className={WhatIFSummaryClasses.textField}
                                            type="submit"
                                            onMouseDown={handleCancelButtonMouseDown}
                                            onClick={handleCancel}
                                            startIcon={<CancelIcon />}
                                        >
                                            Cancel</Button>

                                        <Button
                                            sx={{
                                                backgroundColor: "",
                                                fontSize: "12px", padding: "5px", fontFamily: "system-ui",
                                                width: "210px", marginLeft: "5px", marginTop: "2px",
                                            }}
                                            variant="contained"
                                            // className={WhatIFSummaryClasses.textField}
                                            type="submit"
                                            onClick={handlePreview}
                                            startIcon={<VisibilityIcon />}
                                        >
                                            Preview Purchase Order</Button>
                                    </div>
                                </Box>

                                <Box
                                    // display='flex'
                                    sx={{
                                        // border: "1px solid lightgrey",
                                        boxShadow: 3,
                                        borderRadius: 1,
                                        width: "calc(92vw - 0px)",
                                        margin: "5px 0px 5px 5px",
                                        padding: "0px 0px 0px 0px"
                                    }}
                                >

                                    <div className={WhatIFSummaryClasses.TableTotalBoby} display="flex">
                                        <Box
                                            display='flex' justifyContent='space-between'
                                        >
                                            <InputLabel sx={{
                                                fontWeight: "bold",
                                                fontSize: "14px",
                                                margin: "5px 0px 10px 10px",
                                                display: 'inline',
                                                float: 'left',
                                                color: "black",
                                            }}>
                                                Item WH Details
                                            </InputLabel>
                                            {/* <Button
                                                autoFocus
                                                variant="contained"
                                                onClick={HandleManageHeaderItemWHDtl}
                                                sx={{
                                                    backgroundColor: "",
                                                    padding: "1px",
                                                    margin: "2px 4px",
                                                    alignItems: "center",
                                                    width: "fit-content",
                                                    // border: "1px solid yellow",
                                                }}
                                                title="Manage Columns"
                                            ><ViewColumnIcon style={{ padding: "0px" }} /></Button> */}
                                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                                <div
                                                    style={{
                                                        flex: "1", backgroundColor: isSHovered1 ? '#f5f5f5' : 'white',
                                                        borderRadius: '20%', padding: "0px 8px 0px 8px",
                                                        margin: "2px 0px 0px 0px", // border: "1px solid red",
                                                        height: "30px", minHeight: "30px",
                                                    }}
                                                    title="Manage Columns"
                                                    onMouseEnter={handleSEnter1}
                                                    onMouseLeave={handleSLeave1}
                                                >
                                                    <ViewColumnIcon style={{ padding: "0px", backgroundColor: isSHovered1 ? '#f5f5f5' : 'white', marginTop: "2px", color: "DodgerBlue" }} onClick={HandleManageHeaderItemWHDtl} title="Manage Columns" />
                                                </div>
                                            </div>

                                        </Box>

                                        <div className={WhatIFSummaryClasses.TableBoby}>
                                            <Paper sx={{ margin: "0px 0px 0px 0px", mb: 0, height: "auto", width: "calc(92vw - 0px)", borderRadius: 1, boxShadow: 2, border: 0, borderBottom: 3, }}>
                                                {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                                                <TableContainer style={{ maxHeight: 300, width: "calc(100% - 0px)" }}
                                                    component={Paper}
                                                //  sx={{ position: "sticky", top: -1, }}
                                                >
                                                    <Table aria-label="customized table" className={WhatIFSummaryClasses.tableTable}>
                                                        <ItemWHDetailsTableHead
                                                            numSelected={selected.length}
                                                            order={order}
                                                            orderBy={orderBy}
                                                            onSelectAllClick={handleSelectAllClick}
                                                            onRequestSort={handleRequestSort}
                                                            rowCount={ItemWHDetailsData.length}
                                                        // sx={{height: "auto",border:"2px solid blue"}}
                                                        />
                                                        <TableBody
                                                        >
                                                            <TableCell padding="checkbox" sx={{ padding: "0px", textAlign: "left", fontSize: "12px", width: "10px" }} >
                                                                <Grid item xs={1} style={{ padding: "0px", margin: "0px 0px 0px 0px" }}>
                                                                    <IconButton small="small" sx={{ padding: "0px" }}>
                                                                        <RestartAltIcon small="small" sx={{ padding: "0px" }} />
                                                                    </IconButton>
                                                                </Grid>
                                                            </TableCell>

                                                            {ManageHeaderDataItemWHDtl.includes('SOURCE_ITEM') ?
                                                                <TableCell sx={{
                                                                    padding: "0px",
                                                                }}>
                                                                    <TextField
                                                                        name="SOURCE_ITEM"
                                                                        onChange={testChange}
                                                                        value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("SOURCE_ITEM") > 0 ? inputValue.SOURCE_ITEM : ""}
                                                                        placeholder={allocDetails.length > 0 && allocDetails[0].ALLOC_LEVEL_CODE === 'D' ? "Style" : "Sku"}
                                                                        // label="Location"
                                                                        autoComplete="off"
                                                                        InputProps={{
                                                                            sx: { fontSize: 12, padding: "0px", height: "20px", textAlign: "left", }
                                                                        }}
                                                                        sx={{
                                                                            width: "100%"
                                                                        }}
                                                                        variant="standard"
                                                                        inputProps={{
                                                                            // maxLength: 5,
                                                                            sx: {
                                                                                fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left",
                                                                                "&::placeholder": { textAlign: "left", padding: "0px", },
                                                                            },
                                                                        }}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderDataItemWHDtl.includes('SOURCE_ITEM_DESC') ?
                                                                <TableCell sx={{
                                                                    padding: "0px"
                                                                    , height: "auto"
                                                                }}>
                                                                    <TextField
                                                                        name="SOURCE_ITEM_DESC"
                                                                        onChange={testChange}
                                                                        value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("SOURCE_ITEM_DESC") > 0 ? inputValue.SOURCE_ITEM_DESC : ""}
                                                                        placeholder="Description"
                                                                        autoComplete="off"
                                                                        InputProps={{
                                                                            style: { fontSize: 12, height: "20px" },
                                                                        }}
                                                                        sx={{
                                                                            width: "100%"
                                                                        }}
                                                                        variant="standard"
                                                                        inputProps={{
                                                                            // maxLength: 5,
                                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                        }}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderDataItemWHDtl.includes('DIFF_ID') ?
                                                                <TableCell sx={{
                                                                    padding: "0px"
                                                                    , height: "auto"
                                                                }}>
                                                                    <TextField
                                                                        name="DIFF_ID"
                                                                        onChange={testChange}
                                                                        value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("DIFF_ID") > 0 ? inputValue.DIFF_ID : ""}
                                                                        autoComplete="off"
                                                                        placeholder="Variant"
                                                                        InputProps={{
                                                                            style: { fontSize: 12, height: "20px", textAlign: "left", },
                                                                        }}
                                                                        sx={{
                                                                            width: "100%"
                                                                        }}
                                                                        variant="standard"
                                                                        inputProps={{
                                                                            // maxLength: 5,
                                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                        }}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderDataItemWHDtl.includes('WH_ID') ?
                                                                <TableCell sx={{
                                                                    padding: "0px"
                                                                    , height: "auto"
                                                                }}>
                                                                    <TextField
                                                                        name="WH_ID"
                                                                        onChange={testChange}
                                                                        value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("WH_ID") > 0 ? inputValue.WH_ID : ""}
                                                                        autoComplete="off"
                                                                        placeholder="Location"
                                                                        InputProps={{
                                                                            style: { fontSize: 12, height: "20px", textAlign: "left", },
                                                                        }}
                                                                        sx={{
                                                                            width: "100%"
                                                                        }}
                                                                        variant="standard"
                                                                        inputProps={{
                                                                            // maxLength: 5,
                                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                        }}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderDataItemWHDtl.includes('LOC_TYPE') ?
                                                                <TableCell sx={{
                                                                    padding: "0px"
                                                                    , height: "auto"
                                                                }}>
                                                                    <TextField
                                                                        name="LOC_TYPE"
                                                                        onChange={testChange}
                                                                        value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("LOC_TYPE") > 0 ? inputValue.LOC_TYPE : ""}
                                                                        autoComplete="off"
                                                                        placeholder="Location Type"
                                                                        InputProps={{
                                                                            style: { fontSize: 12, height: "20px" },
                                                                        }}
                                                                        sx={{
                                                                            width: "100%"
                                                                        }}
                                                                        variant="standard"
                                                                        inputProps={{
                                                                            // maxLength: 5,
                                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                        }}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderDataItemWHDtl.includes('FINAL_ALLOCATION') ?
                                                                <TableCell sx={{
                                                                    padding: "0px"
                                                                    , height: "auto"
                                                                }}>
                                                                    <TextField
                                                                        name="FINAL_ALLOCATION"
                                                                        onChange={testChange}
                                                                        value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("FINAL_ALLOCATION") > 0 ? inputValue.FINAL_ALLOCATION : ""}
                                                                        autoComplete="off"
                                                                        placeholder="Final Allocation"
                                                                        InputProps={{
                                                                            style: { fontSize: 12, height: "20px" },
                                                                        }}
                                                                        sx={{
                                                                            width: "100%"
                                                                        }}
                                                                        variant="standard"
                                                                        inputProps={{
                                                                            // maxLength: 5,
                                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                        }}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderDataItemWHDtl.includes('STOCK_ON_HAND') ?
                                                                <TableCell sx={{
                                                                    padding: "0px"
                                                                    , height: "auto"
                                                                }}>
                                                                    <TextField
                                                                        name="STOCK_ON_HAND"
                                                                        onChange={testChange}
                                                                        value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("STOCK_ON_HAND") > 0 ? inputValue.STOCK_ON_HAND : ""}
                                                                        autoComplete="off"
                                                                        placeholder="SOH"
                                                                        InputProps={{
                                                                            style: { fontSize: 12, height: "20px" },
                                                                        }}
                                                                        sx={{
                                                                            width: "100%"
                                                                        }}
                                                                        variant="standard"
                                                                        inputProps={{
                                                                            // maxLength: 5,
                                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                        }}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderDataItemWHDtl.includes('FUTURE_FULFILL_QTY') ?
                                                                <TableCell sx={{
                                                                    padding: "0px"
                                                                    , height: "auto"
                                                                }}>
                                                                    <TextField
                                                                        name="FUTURE_FULFILL_QTY"
                                                                        onChange={testChange}
                                                                        value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("FUTURE_FULFILL_QTY") > 0 ? inputValue.FUTURE_FULFILL_QTY : ""}
                                                                        autoComplete="off"
                                                                        placeholder="On Order"
                                                                        InputProps={{
                                                                            style: { fontSize: 12, height: "20px" },
                                                                        }}
                                                                        sx={{
                                                                            width: "100%"
                                                                        }}
                                                                        variant="standard"
                                                                        inputProps={{
                                                                            // maxLength: 5,
                                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                        }}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderDataItemWHDtl.includes('PO_QTY') ?
                                                                <TableCell sx={{
                                                                    padding: "0px"
                                                                    , height: "auto"
                                                                }}>
                                                                    <TextField
                                                                        name="PO_QTY"
                                                                        onChange={testChange}
                                                                        value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("PO_QTY") > 0 ? inputValue.PO_QTY : ""}
                                                                        autoComplete="off"
                                                                        placeholder="PO Qty"
                                                                        InputProps={{
                                                                            style: { fontSize: 12, height: "20px" },
                                                                        }}
                                                                        sx={{
                                                                            width: "100%"
                                                                        }}
                                                                        variant="standard"
                                                                        inputProps={{
                                                                            // maxLength: 5,
                                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                        }}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderDataItemWHDtl.includes('FINAL_PO_QTY') ?
                                                                <TableCell sx={{
                                                                    padding: "0px"
                                                                    , height: "auto"
                                                                }}>
                                                                    <TextField
                                                                        name="FINAL_PO_QTY"
                                                                        onChange={testChange}
                                                                        value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("FINAL_PO_QTY") > 0 ? inputValue.FINAL_PO_QTY : ""}
                                                                        autoComplete="off"
                                                                        placeholder="Final PO Qty"
                                                                        InputProps={{
                                                                            style: { fontSize: 12, height: "20px" },
                                                                        }}
                                                                        sx={{
                                                                            width: "100%"
                                                                        }}
                                                                        variant="standard"
                                                                        inputProps={{
                                                                            // maxLength: 5,
                                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                        }}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderDataItemWHDtl.includes('SUPPLIER') ?
                                                                <TableCell sx={{ padding: "0px" }}>
                                                                    <div style={{ display: "flex" }}>
                                                                        <Select
                                                                            // name="SUPPLIER"
                                                                            placeholder="Supplier"
                                                                            maxMenuHeight={150}
                                                                            classNamePrefix="mySelect"
                                                                            getOptionLabel={option =>
                                                                                `${option.SUPPLIER.toString()}`}
                                                                            getOptionValue={option => option.SUPPLIER}
                                                                            options={SupplierWhatIFData}
                                                                            isSearchable={true}
                                                                            onChange={(e) => testChange2(e, "SUPPLIER")}
                                                                            menuPlacement="bottom"
                                                                            isClearable={true}
                                                                            closeMenuOnSelect={true}
                                                                            hideSelectedOptions={false}
                                                                            value={
                                                                                SupplierWhatIFData.filter(obj => inputValue2?.SUPPLIER === (obj.SUPPLIER))
                                                                            }
                                                                            styles={styleSelect3}
                                                                            style={{ maxWidth: '20px' }}
                                                                        />
                                                                    </div>
                                                                </TableCell> : null}

                                                            {ManageHeaderDataItemWHDtl.includes('SUPPLIER_DESC') ?
                                                                <TableCell sx={{ padding: "0px" }}>
                                                                    <div style={{ display: "flex" }}>
                                                                        <Select
                                                                            // name="SUPPLIER"
                                                                            placeholder="Supplier Desc"
                                                                            maxMenuHeight={150}
                                                                            classNamePrefix="mySelect"
                                                                            getOptionLabel={option =>
                                                                                `${option.SUPPLIER_DESC.toString()}`}
                                                                            getOptionValue={option => option.SUPPLIER_DESC}
                                                                            options={SupplierWhatIFData}
                                                                            isSearchable={true}
                                                                            onChange={(e) => testChange2(e, "SUPPLIER_DESC")}
                                                                            menuPlacement="bottom"
                                                                            isClearable={true}
                                                                            closeMenuOnSelect={true}
                                                                            hideSelectedOptions={false}
                                                                            value={
                                                                                SupplierWhatIFData.filter(obj => inputValue2?.SUPPLIER_DESC === (obj.SUPPLIER_DESC))
                                                                            }
                                                                            styles={styleSelect4}
                                                                            style={{ maxWidth: '20px' }}
                                                                        />
                                                                    </div>
                                                                </TableCell> : null}

                                                            {ManageHeaderDataItemWHDtl.includes('ORIGIN_COUNTRY_ID') ?
                                                                <TableCell sx={{ padding: "0px" }}>
                                                                    <div style={{ display: "flex" }}>
                                                                        <Select
                                                                            // name="SUPPLIER"
                                                                            placeholder="Origin Cty"
                                                                            maxMenuHeight={150}
                                                                            classNamePrefix="mySelect"
                                                                            getOptionLabel={option =>
                                                                                `${option.ORIGIN_COUNTRY_ID.toString()}`}
                                                                            getOptionValue={option => option.ORIGIN_COUNTRY_ID}
                                                                            options={OriginCrtyWhatIFData.length > 0 ? [...new Map(OriginCrtyWhatIFData.map((item) => [item["ORIGIN_COUNTRY_ID"], item])).values()] : []}
                                                                            isSearchable={true}
                                                                            onChange={(e) => testChange2(e, "ORIGIN_COUNTRY_ID")}
                                                                            menuPlacement="bottom"
                                                                            isClearable={true}
                                                                            closeMenuOnSelect={true}
                                                                            hideSelectedOptions={false}
                                                                            value={
                                                                                OriginCrtyWhatIFData.filter(obj => inputValue2?.ORIGIN_COUNTRY_ID === (obj.ORIGIN_COUNTRY_ID))
                                                                            }
                                                                            styles={styleSelect3}
                                                                            style={{ maxWidth: '20px' }}
                                                                        />
                                                                    </div>
                                                                </TableCell> : null}

                                                            {ManageHeaderDataItemWHDtl.includes('ORDER_NO') ?
                                                                <TableCell sx={{
                                                                    padding: "0px"
                                                                    , height: "auto"
                                                                }}>
                                                                    <TextField
                                                                        name="ORDER_NO"
                                                                        onChange={testChange}
                                                                        value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("ORDER_NO") > 0 ? inputValue.ORDER_NO : ""}
                                                                        autoComplete="off"
                                                                        placeholder="PO"
                                                                        InputProps={{
                                                                            style: { fontSize: 12, height: "20px" },
                                                                        }}
                                                                        sx={{
                                                                            width: "100%"
                                                                        }}
                                                                        variant="standard"
                                                                        inputProps={{
                                                                            // maxLength: 5,
                                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                        }}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderDataItemWHDtl.includes('ORDER_TYPE') ?
                                                                <TableCell sx={{
                                                                    padding: "0px"
                                                                    , height: "auto"
                                                                }}>
                                                                    <TextField
                                                                        name="ORDER_TYPE"
                                                                        onChange={testChange}
                                                                        value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("ORDER_TYPE") > 0 ? inputValue.ORDER_TYPE : ""}
                                                                        autoComplete="off"
                                                                        placeholder="PO Type"
                                                                        InputProps={{
                                                                            style: { fontSize: 12, height: "20px" },
                                                                        }}
                                                                        sx={{
                                                                            width: "100%"
                                                                        }}
                                                                        variant="standard"
                                                                        inputProps={{
                                                                            // maxLength: 5,
                                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                        }}
                                                                    />
                                                                </TableCell> : null}

                                                        </TableBody>

                                                        <TableBody>

                                                            {ItemWHDetailsData.length > 0 ? ItemWHDetailsData
                                                                .map((row, index) => {
                                                                    const isItemSelected = isSelected(row.SR_NO);
                                                                    const labelId = `enhanced-table-checkbox-${index}`;
                                                                    return (
                                                                        <TableRow
                                                                            hover
                                                                            role="checkbox"
                                                                            aria-checked={isItemSelected}
                                                                            tabIndex={-1}
                                                                            key={row.SR_NO}
                                                                            selected={isItemSelected}
                                                                            onClick={(e) => SelectRowSize(e, row)}
                                                                            style={selectedRow === row.SR_NO ? { backgroundColor: "#CDF0FF" } : null}
                                                                        >
                                                                            <TableCell padding="checkbox" sx={{ padding: "0px", textAlign: "left", fontSize: "12px", width: "10px" }}>
                                                                                <Checkbox
                                                                                    size="small"
                                                                                    onClick={(event) => handleClick(event, row?.SR_NO)}
                                                                                    color="primary"
                                                                                    checked={isItemSelected}
                                                                                    inputProps={{
                                                                                        'aria-labelledby': labelId,
                                                                                    }}
                                                                                    style={{ padding: "0px", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', }}
                                                                                />
                                                                            </TableCell>

                                                                            {ManageHeaderDataItemWHDtl.includes('SOURCE_ITEM') ? <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}>
                                                                                {row.SOURCE_ITEM}
                                                                            </TableCell> : null}

                                                                            {ManageHeaderDataItemWHDtl.includes('SOURCE_ITEM_DESC') ? <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px', height: "20px" }}>
                                                                                <Box
                                                                                    display="flex"
                                                                                    justifyContent="space-between"
                                                                                    sx={{ border: 0, }}
                                                                                >
                                                                                    <InputLabel
                                                                                        sx={{
                                                                                            paddingTop: "3px",
                                                                                            fontSize: "12px",
                                                                                            fontFamily: "system-ui",
                                                                                            // fontWeight:"bold",
                                                                                            color: "rgb(10, 10, 10)",
                                                                                            paddingLeft: "0px",
                                                                                            paddingRight: "0px",
                                                                                            // width:"70px"
                                                                                        }}
                                                                                    >
                                                                                        {row.SOURCE_ITEM_DESC}
                                                                                    </InputLabel>
                                                                                    <Button sx={{
                                                                                        backgroundColor: "", '&:hover': {
                                                                                            backgroundColor: "",
                                                                                        }, border: 0, color: "CadetBlue", padding: "0px"
                                                                                    }}
                                                                                        style={{
                                                                                            maxWidth: '25px', minWidth: '25px', justifyContent: "flex-start"
                                                                                        }}
                                                                                        size='small'
                                                                                        className={WhatIFSummaryClasses.textField}
                                                                                        onClick={() => {
                                                                                            setOpenDialogWIS(true);
                                                                                            setDialogDataWIS(String(row.SOURCE_ITEM_DESC));
                                                                                        }}
                                                                                        startIcon={<InfoIcon style={{ fontSize: 16 }} />}
                                                                                    >
                                                                                    </Button>
                                                                                </Box>
                                                                            </TableCell> : null}

                                                                            {ManageHeaderDataItemWHDtl.includes('DIFF_ID') ? <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }} >
                                                                                {row.DIFF_ID}
                                                                            </TableCell> : null}

                                                                            {ManageHeaderDataItemWHDtl.includes('WH_ID') ? <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}>
                                                                                {row.WH_ID}
                                                                            </TableCell> : null}

                                                                            {ManageHeaderDataItemWHDtl.includes('LOC_TYPE') ? <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}>
                                                                                {row.LOC_TYPE}
                                                                            </TableCell> : null}

                                                                            {ManageHeaderDataItemWHDtl.includes('FINAL_ALLOCATION') ? <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}>
                                                                                {row.FINAL_ALLOCATION}
                                                                            </TableCell> : null}

                                                                            {ManageHeaderDataItemWHDtl.includes('STOCK_ON_HAND') ? <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }} >
                                                                                {row.STOCK_ON_HAND}
                                                                            </TableCell> : null}

                                                                            {ManageHeaderDataItemWHDtl.includes('FUTURE_FULFILL_QTY') ? <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}>
                                                                                {row.FUTURE_FULFILL_QTY}
                                                                            </TableCell> : null}

                                                                            {ManageHeaderDataItemWHDtl.includes('PO_QTY') ? <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}>
                                                                                {row.PO_QTY}
                                                                            </TableCell> : null}

                                                                            {ManageHeaderDataItemWHDtl.includes('FINAL_PO_QTY') ? <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}>
                                                                                {row.FINAL_PO_QTY}
                                                                            </TableCell> : null}

                                                                            {ManageHeaderDataItemWHDtl.includes('SUPPLIER') ? <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px", }}
                                                                            // onClick={(e) => HandleClickSupplier(e, row.SOURCE_ITEM)}
                                                                            >
                                                                                <Select
                                                                                    classNamePrefix="mySelect"
                                                                                    maxMenuHeight={180}
                                                                                    isClearable={false}
                                                                                    styles={styleSelect}
                                                                                    getOptionLabel={option =>
                                                                                        `${option.SUPPLIER.toString()}`}
                                                                                    getOptionValue={option => option.SUPPLIER}
                                                                                    // options={SupplierWhatIFData.length > 0 ? SupplierWhatIFData.filter(obj => row?.SOURCE_ITEM === (obj.ITEM)) : null}
                                                                                    options={SupplierWhatIFData.length > 0 ? [...new Map(SupplierWhatIFData.map((item) => [item["SUPPLIER"], item])).values()] : []}

                                                                                    sx={{
                                                                                        // border:"1px solid red"
                                                                                    }}
                                                                                    onChange={(e) =>
                                                                                        // ////console.log("TREND::",e.target.value,e,row.ITEM,qtyLimitsData)
                                                                                        onTableCellChangeWH(e, row.SOURCE_ITEM, row.WH_ID, row.DIFF_ID, "SUPPLIER")
                                                                                    }
                                                                                    // defaultValue={row.SUPPLIER}
                                                                                    value={SupplierWhatIFData.filter(obj => row?.SUPPLIER === (obj.SUPPLIER))}
                                                                                    // value={row.SUPPLIER}
                                                                                    // menuPosition="fixed"
                                                                                    isDisabled={ApproveFreeseCheck}
                                                                                    menuPlacement="bottom"
                                                                                />
                                                                            </TableCell> : null}

                                                                            {ManageHeaderDataItemWHDtl.includes('SUPPLIER_DESC') ? <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px', height: "20px" }}>
                                                                                <Box
                                                                                    display="flex"
                                                                                    justifyContent="space-between"
                                                                                    sx={{ border: 0, }}
                                                                                >
                                                                                    <InputLabel
                                                                                        sx={{
                                                                                            paddingTop: "3px",
                                                                                            fontSize: "12px",
                                                                                            fontFamily: "system-ui",
                                                                                            // fontWeight:"bold",
                                                                                            color: "rgb(10, 10, 10)",
                                                                                            paddingLeft: "0px",
                                                                                            paddingRight: "0px",
                                                                                        }}
                                                                                    >
                                                                                        {String(row.SUPPLIER_DESC).length > 0 && String(row.SUPPLIER_DESC).length < 5 ?
                                                                                            row.SUPPLIER_DESC === "NULL" ? null : row.SUPPLIER_DESC
                                                                                            : String(row.SUPPLIER_DESC).substring(0, 20)}
                                                                                    </InputLabel>
                                                                                    <Button sx={{
                                                                                        backgroundColor: "", '&:hover': {
                                                                                            backgroundColor: "",
                                                                                        }, border: 0, color: "CadetBlue", padding: "0px"
                                                                                    }}
                                                                                        style={{
                                                                                            maxWidth: '25px', minWidth: '25px', justifyContent: "flex-start", paddingLeft: "0px", paddingRight: "0px"
                                                                                        }}
                                                                                        size='small'
                                                                                        className={WhatIFSummaryClasses.textField}
                                                                                        onClick={() => {
                                                                                            setOpenDialogWIS(true);
                                                                                            setDialogDataWIS(String(row.SUPPLIER_DESC));
                                                                                        }}
                                                                                        startIcon={<InfoIcon style={{ fontSize: 16, backgroundColor: "" }} />}
                                                                                    >
                                                                                    </Button>
                                                                                </Box>
                                                                            </TableCell>
                                                                                : null}

                                                                            {ManageHeaderDataItemWHDtl.includes('ORIGIN_COUNTRY_ID') ? <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                                                                <Select
                                                                                    classNamePrefix="mySelect"
                                                                                    maxMenuHeight={180}
                                                                                    isClearable={false}
                                                                                    styles={styleSelect}
                                                                                    getOptionLabel={option =>
                                                                                        `${option.ORIGIN_COUNTRY_ID.toString()}`}
                                                                                    getOptionValue={option => option.ORIGIN_COUNTRY_ID}
                                                                                    options={OriginCrtyWhatIFData.length > 0 ? [...new Map(OriginCrtyWhatIFData.map((item) => [item["ORIGIN_COUNTRY_ID"], item])).values()] : []}
                                                                                    sx={{
                                                                                        // border:"1px solid red"
                                                                                    }}
                                                                                    onChange={(e) =>
                                                                                        // ////console.log("TREND::",e.target.value,e,row.ITEM,qtyLimitsData)
                                                                                        onTableCellChangeWH(e, row.SOURCE_ITEM, row.WH_ID, row.DIFF_ID, "ORIGIN_COUNTRY_ID")
                                                                                    }
                                                                                    // defaultValue={row.SUPPLIER}
                                                                                    value={OriginCrtyWhatIFData.filter(obj => row?.ORIGIN_COUNTRY_ID === (obj.ORIGIN_COUNTRY_ID))}
                                                                                    // value={row.SUPPLIER}
                                                                                    // menuPosition="fixed"
                                                                                    isDisabled={ApproveFreeseCheck}
                                                                                    menuPlacement="bottom"
                                                                                />
                                                                            </TableCell> : null}

                                                                            {ManageHeaderDataItemWHDtl.includes('ORDER_NO') ? <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}>
                                                                                {row.ORDER_NO}
                                                                            </TableCell> : null}

                                                                            {ManageHeaderDataItemWHDtl.includes('ORDER_TYPE') ? <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }} >
                                                                                {row.ORDER_TYPE}
                                                                            </TableCell> : null}

                                                                        </TableRow >
                                                                    );
                                                                })
                                                                : null}


                                                            {ItemWHDetailsData.length < 10 ?
                                                                [...Array(10 - (ItemWHDetailsData.length)).keys()].map(val => (
                                                                    <TableRow  >
                                                                        <TableCell padding="checkbox" sx={{ padding: "0px", width: "1%" }}>
                                                                            <Checkbox size="small" color="primary" disabled={true}
                                                                                style={{ padding: "0px", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', }}
                                                                            />
                                                                        </TableCell>
                                                                        {ManageHeaderDataItemWHDtl.map((row, index) => {
                                                                            return (
                                                                                <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>)
                                                                        })}
                                                                        {/* <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "20px" }}></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} ></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell> */}

                                                                    </TableRow >
                                                                )) : false}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                                <ItemWHDetailsTableHeadToolbar numSelected={selected.length} />
                                            </Paper>
                                        </div>

                                    </div>
                                    {/* </Box> */}

                                    <Box
                                        // display='flex'
                                        sx={{
                                            // border: "1px solid lightgrey",
                                            boxShadow: 3,
                                            borderRadius: 1,
                                            width: "calc(92vw - 0px)",
                                            margin: "5px 0px 5px 0px",
                                            padding: "0px 0px 0px 0px"
                                        }}
                                    >
                                        <div className={WhatIFSummaryClasses.TableTotalBoby} display="flex">
                                            <Box
                                                display='flex' justifyContent='space-between'
                                            >
                                                <InputLabel sx={{
                                                    fontWeight: "bold",
                                                    fontSize: "14px",
                                                    margin: "5px 0px 10px 5px",
                                                    display: 'flex',
                                                    float: 'left',
                                                    color: "black",
                                                }}>
                                                    Loc/Group Item Details
                                                </InputLabel>
                                                {/* <Button
                                                    autoFocus
                                                    variant="contained"
                                                    onClick={HandleManageHeaderLocGroup}
                                                    sx={{
                                                        backgroundColor: "",
                                                        padding: "1px",
                                                        margin: "2px 4px",
                                                        alignItems: "center",
                                                        width: "fit-content",
                                                        // border: "1px solid yellow",
                                                    }}
                                                    title="Manage Columns"
                                                ><ViewColumnIcon style={{ padding: "0px" }} /></Button> */}
                                                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                                    <div
                                                        style={{
                                                            flex: "1",
                                                            backgroundColor: isSHovered2 ? '#f5f5f5' : 'white',
                                                            borderRadius: '20%',
                                                            padding: "0px 8px 0px 8px",
                                                            margin: "2px 0px 0px 0px",
                                                            // border: "1px solid red",
                                                            height: "30px", minHeight: "30px",
                                                        }}
                                                        title="Manage Columns"
                                                        onMouseEnter={handleSEnter2}
                                                        onMouseLeave={handleSLeave2}
                                                    >
                                                        <ViewColumnIcon style={{ padding: "0px", backgroundColor: isSHovered2 ? '#f5f5f5' : 'white', marginTop: "2px", color: "DodgerBlue" }} onClick={HandleManageHeaderLocGroup} title="Manage Columns" />
                                                    </div>
                                                </div>
                                            </Box>

                                            <div className={WhatIFSummaryClasses.TableBoby}>
                                                <Paper sx={{ margin: "0px 0px 0px 0px", mb: 0, height: "auto", borderRadius: 1, boxShadow: 2, border: 0, borderBottom: 3, }}>
                                                    {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                                                    <TableContainer style={{ maxHeight: 280, width: "calc(100% - 0px)" }} component={Paper}>
                                                        <Table aria-label="customized table">
                                                            <LocGroupItemDetailsTableHead
                                                                // numSelected={selected.length}
                                                                order1={order1}
                                                                orderBy1={orderBy1}
                                                                // onSelectAllClick={handleSelectAllClick}
                                                                onRequestSort={handleRequestSort1}
                                                                rowCount={LocGroupItemDetailsData.length}
                                                            />
                                                            <TableBody
                                                            // sx={{ position: "sticky", top: -1,textAlign:"left" }}
                                                            // sx={{ height: "auto",border:"2px solid green" }}
                                                            >
                                                                {/* <TableCell padding="checkbox" sx={{ padding: "0px" }} >
                                                        <Grid item xs={1} style={{ padding: "0px", margin: "0px 0px 0px 0px" }}>
                                                            <IconButton small="small" sx={{ padding: "0px" }}>
                                                                <RestartAltIcon small="small" sx={{ padding: "0px" }} />
                                                            </IconButton>
                                                        </Grid>
                                                    </TableCell> */}
                                                                {ManageHeaderDataLocGroup.includes('TRAN_ITEM') ?
                                                                    <TableCell sx={{
                                                                        padding: "0px",
                                                                    }}>
                                                                        <TextField
                                                                            name="TRAN_ITEM"
                                                                            onChange={testChange1}
                                                                            value={Object.keys(inputValueLoc).length > 0 && Object.keys(inputValueLoc).includes("TRAN_ITEM") > 0 ? inputValueLoc.TRAN_ITEM : ""}
                                                                            placeholder="Sku"
                                                                            // label="Location"
                                                                            sx={{
                                                                                width: "100%"
                                                                            }}
                                                                            autoComplete="off"
                                                                            InputProps={{
                                                                                sx: { fontSize: 12, padding: "0px", height: "20px", textAlign: "left", }
                                                                            }}
                                                                            variant="standard"
                                                                            inputProps={{
                                                                                // maxLength: 5,
                                                                                sx: {
                                                                                    fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left",
                                                                                    "&::placeholder": { textAlign: "left", padding: "0px", },
                                                                                },
                                                                            }}
                                                                            disabled={LockCheck}
                                                                        />
                                                                    </TableCell> : null}

                                                                {ManageHeaderDataLocGroup.includes('TRAN_ITEM_DESC') ?
                                                                    <TableCell sx={{
                                                                        padding: "0px"
                                                                        , height: "auto"
                                                                    }}>
                                                                        <TextField
                                                                            name="TRAN_ITEM_DESC"
                                                                            onChange={testChange1}
                                                                            value={Object.keys(inputValueLoc).length > 0 && Object.keys(inputValueLoc).includes("TRAN_ITEM_DESC") > 0 ? inputValueLoc.TRAN_ITEM_DESC : ""}
                                                                            placeholder="Description"
                                                                            autoComplete="off"
                                                                            InputProps={{
                                                                                style: { fontSize: 12, height: "20px" },
                                                                            }}
                                                                            sx={{
                                                                                width: "100%"
                                                                            }}
                                                                            variant="standard"
                                                                            inputProps={{
                                                                                // maxLength: 5,
                                                                                sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                            }}
                                                                            disabled={LockCheck}
                                                                        />
                                                                    </TableCell> : null}

                                                                {ManageHeaderDataLocGroup.includes('WH_ID') ?
                                                                    <TableCell sx={{
                                                                        padding: "0px"
                                                                        , height: "auto"
                                                                    }}>
                                                                        <TextField
                                                                            name="WH_ID"
                                                                            onChange={testChange1}
                                                                            value={Object.keys(inputValueLoc).length > 0 && Object.keys(inputValueLoc).includes("WH_ID") > 0 ? inputValueLoc.WH_ID : ""}
                                                                            autoComplete="off"
                                                                            placeholder="Location"
                                                                            InputProps={{
                                                                                style: { fontSize: 12, height: "20px", textAlign: "left", },
                                                                            }}
                                                                            sx={{
                                                                                width: "100%"
                                                                            }}
                                                                            variant="standard"
                                                                            inputProps={{
                                                                                // maxLength: 5,
                                                                                sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                            }}
                                                                            disabled={LockCheck}
                                                                        />
                                                                    </TableCell> : null}

                                                                {ManageHeaderDataLocGroup.includes('LOC_TYPE') ?
                                                                    <TableCell sx={{
                                                                        padding: "0px"
                                                                        , height: "auto"
                                                                    }}>
                                                                        <TextField
                                                                            name="LOC_TYPE"
                                                                            onChange={testChange1}
                                                                            value={Object.keys(inputValueLoc).length > 0 && Object.keys(inputValueLoc).includes("LOC_TYPE") > 0 ? inputValueLoc.LOC_TYPE : ""}
                                                                            autoComplete="off"
                                                                            placeholder="Location Type"
                                                                            InputProps={{
                                                                                style: { fontSize: 12, height: "20px" },
                                                                            }}
                                                                            sx={{
                                                                                width: "100%"
                                                                            }}
                                                                            variant="standard"
                                                                            inputProps={{
                                                                                // maxLength: 5,
                                                                                sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                            }}
                                                                            disabled={LockCheck}
                                                                        />
                                                                    </TableCell> : null}

                                                                {ManageHeaderDataLocGroup.includes('FINAL_ALLOCATION') ?
                                                                    <TableCell sx={{
                                                                        padding: "0px"
                                                                        , height: "auto"
                                                                    }}>
                                                                        <TextField
                                                                            name="FINAL_ALLOCATION"
                                                                            onChange={testChange1}
                                                                            value={Object.keys(inputValueLoc).length > 0 && Object.keys(inputValueLoc).includes("FINAL_ALLOCATION") > 0 ? inputValueLoc.FINAL_ALLOCATION : ""}
                                                                            autoComplete="off"
                                                                            placeholder="Final Alloc"
                                                                            InputProps={{
                                                                                style: { fontSize: 12, height: "20px" },
                                                                            }}
                                                                            sx={{
                                                                                width: "100%"
                                                                            }}
                                                                            variant="standard"
                                                                            inputProps={{
                                                                                // maxLength: 5,
                                                                                sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                            }}
                                                                            disabled={LockCheck}
                                                                        />
                                                                    </TableCell> : null}

                                                                {ManageHeaderDataLocGroup.includes('STOCK_ON_HAND') ?
                                                                    <TableCell sx={{
                                                                        padding: "0px"
                                                                        , height: "auto"
                                                                    }}>
                                                                        <TextField
                                                                            name="STOCK_ON_HAND"
                                                                            onChange={testChange1}
                                                                            value={Object.keys(inputValueLoc).length > 0 && Object.keys(inputValueLoc).includes("STOCK_ON_HAND") > 0 ? inputValueLoc.STOCK_ON_HAND : ""}
                                                                            autoComplete="off"
                                                                            placeholder="SOH"
                                                                            InputProps={{
                                                                                style: { fontSize: 12, height: "20px" },
                                                                            }}
                                                                            sx={{
                                                                                width: "100%"
                                                                            }}
                                                                            variant="standard"
                                                                            inputProps={{
                                                                                // maxLength: 5,
                                                                                sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                            }}
                                                                            disabled={LockCheck}
                                                                        />
                                                                    </TableCell> : null}

                                                                {ManageHeaderDataLocGroup.includes('FUTURE_FULFILL_QTY') ?
                                                                    <TableCell sx={{
                                                                        padding: "0px"
                                                                        , height: "auto"
                                                                    }}>
                                                                        <TextField
                                                                            name="FUTURE_FULFILL_QTY"
                                                                            onChange={testChange1}
                                                                            value={Object.keys(inputValueLoc).length > 0 && Object.keys(inputValueLoc).includes("FUTURE_FULFILL_QTY") > 0 ? inputValueLoc.FUTURE_FULFILL_QTY : ""}
                                                                            autoComplete="off"
                                                                            placeholder="On Order"
                                                                            InputProps={{
                                                                                style: { fontSize: 12, height: "20px" },
                                                                            }}
                                                                            sx={{
                                                                                width: "100%"
                                                                            }}
                                                                            variant="standard"
                                                                            inputProps={{
                                                                                // maxLength: 5,
                                                                                sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                            }}
                                                                            disabled={LockCheck}
                                                                        />
                                                                    </TableCell> : null}

                                                                {ManageHeaderDataLocGroup.includes('PO_QTY') ?
                                                                    <TableCell sx={{
                                                                        padding: "0px"
                                                                        , height: "auto"
                                                                    }}>
                                                                        <TextField
                                                                            name="PO_QTY"
                                                                            placeholder="PO Qty"
                                                                            onChange={testChange1}
                                                                            InputProps={{ style: { fontSize: 12, height: "20px", textAlign: "left" } }} //endAdornment: <SearchButtonPO_QTY />,
                                                                            autoComplete="off"
                                                                            variant="standard"
                                                                            value={//LockCheck ?
                                                                                //     Object.keys(copyValue).length > 0 && Object.keys(copyValue).includes("PO_QTY") > 0 ? copyValue.PO_QTY : "" :
                                                                                Object.keys(inputValueLoc).length > 0 && Object.keys(inputValueLoc).includes("PO_QTY") > 0 ? inputValueLoc.PO_QTY : ""
                                                                            }
                                                                            inputProps={{ sx: { padding: "0px 0px 0px 3px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, } }}
                                                                        />
                                                                    </TableCell> : null}

                                                                {ManageHeaderDataLocGroup.includes('MESSAGE') ?
                                                                    <TableCell sx={{
                                                                        padding: "0px"
                                                                        , height: "auto"
                                                                    }}>
                                                                        <TextField
                                                                            name="MESSAGE"
                                                                            onChange={testChange1}
                                                                            value={Object.keys(inputValueLoc).length > 0 && Object.keys(inputValueLoc).includes("MESSAGE") > 0 ? inputValueLoc.MESSAGE : ""}
                                                                            autoComplete="off"
                                                                            placeholder="Message"
                                                                            InputProps={{
                                                                                style: { fontSize: 12, height: "20px" },
                                                                            }}
                                                                            sx={{
                                                                                width: "100%"
                                                                            }}
                                                                            variant="standard"
                                                                            inputProps={{
                                                                                // maxLength: 5,
                                                                                sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                            }}
                                                                            disabled={LockCheck}
                                                                        />
                                                                    </TableCell> : null}
                                                            </TableBody>

                                                            <TableBody
                                                            // sx={{ height: "auto",border:"2px solid green" }}
                                                            >

                                                                {LocGroupItemDetailsData.length > 0 ? LocGroupItemDetailsData
                                                                    .map((row, index) => {
                                                                        // const isItemSelected = isSelected(row.ITEM_ID);
                                                                        // const labelId = `enhanced-table-checkbox-${index}`;
                                                                        return (
                                                                            <TableRow
                                                                                hover
                                                                                role="checkbox"
                                                                            // aria-checked={isItemSelected}
                                                                            // tabIndex={-1}
                                                                            // key={row.ITEM_ID}
                                                                            // selected={isItemSelected}
                                                                            >
                                                                                {ManageHeaderDataLocGroup.includes('TRAN_ITEM') ?
                                                                                    <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px", height: "22px" }}>
                                                                                        {row.TRAN_ITEM}
                                                                                    </TableCell> : null}

                                                                                {ManageHeaderDataLocGroup.includes('TRAN_ITEM_DESC') ?
                                                                                    <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px', height: "20px" }}>
                                                                                        <Box
                                                                                            display="flex"
                                                                                            justifyContent="space-between"
                                                                                            sx={{ border: 0 }}
                                                                                        >
                                                                                            <InputLabel
                                                                                                sx={{
                                                                                                    paddingTop: "3px",
                                                                                                    fontSize: "12px",
                                                                                                    fontFamily: "system-ui",
                                                                                                    // fontWeight:"bold",
                                                                                                    color: "rgb(10, 10, 10)",
                                                                                                    paddingLeft: "0px",
                                                                                                    paddingRight: "0px",
                                                                                                    // width:"70px"
                                                                                                }}
                                                                                            >
                                                                                                {row.TRAN_ITEM_DESC}
                                                                                            </InputLabel>
                                                                                            <Button sx={{
                                                                                                backgroundColor: "", '&:hover': {
                                                                                                    backgroundColor: "",
                                                                                                }, border: 0, color: "CadetBlue", padding: "0px"
                                                                                            }}
                                                                                                style={{
                                                                                                    maxWidth: '25px', minWidth: '25px', justifyContent: "flex-start", paddingLeft: "0px", paddingRight: "0px"
                                                                                                }}
                                                                                                size='small'
                                                                                                className={WhatIFSummaryClasses.textField}
                                                                                                onClick={() => {
                                                                                                    setOpenDialogWIS(true);
                                                                                                    setDialogDataWIS(String(row.TRAN_ITEM_DESC));
                                                                                                }}
                                                                                                startIcon={<InfoIcon style={{ padding: "0px", fontSize: 16 }} />}
                                                                                            >
                                                                                            </Button>
                                                                                        </Box>
                                                                                    </TableCell> : null}

                                                                                {ManageHeaderDataLocGroup.includes('WH_ID') ?
                                                                                    <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}>
                                                                                        {row.WH_ID}
                                                                                    </TableCell> : null}

                                                                                {ManageHeaderDataLocGroup.includes('LOC_TYPE') ?
                                                                                    <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}>
                                                                                        {row.LOC_TYPE}
                                                                                    </TableCell> : null}

                                                                                {ManageHeaderDataLocGroup.includes('FINAL_ALLOCATION') ?
                                                                                    <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}>
                                                                                        {row.FINAL_ALLOCATION}
                                                                                    </TableCell> : null}

                                                                                {ManageHeaderDataLocGroup.includes('STOCK_ON_HAND') ?
                                                                                    <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }} >
                                                                                        {row.STOCK_ON_HAND}
                                                                                    </TableCell> : null}

                                                                                {ManageHeaderDataLocGroup.includes('FUTURE_FULFILL_QTY') ?
                                                                                    <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}>
                                                                                        {row.FUTURE_FULFILL_QTY}
                                                                                    </TableCell> : null}

                                                                                {ManageHeaderDataLocGroup.includes('PO_QTY') ?
                                                                                    < TableCell sx={{
                                                                                        padding: "0px",
                                                                                        textAlign: "left",
                                                                                        fontSize: "12px",
                                                                                        outline: "none",
                                                                                        verticalAlign: "center",
                                                                                        // backgroundColor: '#fff',
                                                                                        margin: "0px 0px 0px 0px",
                                                                                    }}
                                                                                        disabled={callMode === "VIEW" ? true : false}
                                                                                        // className={CreateAllocationClasses.SpecificCell}
                                                                                        // contentEditable={((alloc_Dtls.length ? alloc_Dtls[0].ALLOC_CRITERIA !== "F" : false) || ApproveFreeseCheck) ? true : false}
                                                                                        contentEditable={callMode === "VIEW" ? false : true}
                                                                                        onKeyDown={(e) => {
                                                                                            if (e.key === "Enter") {
                                                                                                e.preventDefault();
                                                                                            }
                                                                                        }}
                                                                                        onBlur={(e) => handlePOQtyChangeGrid(e, row)}
                                                                                        onInput={(e) => {
                                                                                            const valid = /^\d+$/.test(e.target.textContent)
                                                                                            if (!valid && e.target.textContent !== "") {
                                                                                                setOpenDialog(true);
                                                                                                setDialogData("Only Numberic values are accepted");
                                                                                                e.target.textContent = ""
                                                                                            }
                                                                                            else if (parseInt(e.target.textContent) < 0 && e.target.textContent !== "") {
                                                                                                setOpenDialog(true);
                                                                                                setDialogData("Values should be greater than zero*");
                                                                                                e.target.textContent = ""
                                                                                            }
                                                                                            else if (e.target.textContent.length === 0 && row.PO_QTY.length > 0) {
                                                                                                row["PO_QTY"] = ""
                                                                                            }
                                                                                        }}
                                                                                        suppressContentEditableWarning={true}
                                                                                    >
                                                                                        <Box sx={
                                                                                            (callMode === "VIEW") ? {
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
                                                                                            {row.PO_QTY}
                                                                                        </Box>
                                                                                    </TableCell> : null}

                                                                                {ManageHeaderDataLocGroup.includes('MESSAGE') ?
                                                                                    <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px', height: "20px" }}>
                                                                                        {row.MESSAGE}
                                                                                    </TableCell> : null}
                                                                            </TableRow >
                                                                        );
                                                                    })
                                                                    : null}

                                                                {LocGroupItemDetailsData.length < 10 ?
                                                                    [...Array(10 - (LocGroupItemDetailsData.length)).keys()].map(val => (
                                                                        <TableRow  >
                                                                            {ManageHeaderDataLocGroup.map((row, index) => {
                                                                                return (
                                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "22px" }}></TableCell>)
                                                                            })}
                                                                            {/* <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "22px" }}></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} ></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell> */}

                                                                        </TableRow >
                                                                    )) : false}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                    <LocGroupItemDetailsTableHeadToolbar numSelected={selected.length} />
                                                </Paper>
                                            </div>

                                        </div>
                                    </Box>

                                    {/* </div> */}
                                </Box>
                            </div>
                        </Box>
                    </div>
                    {/* ITEM WH DETAILS MANAGE COLUMNS POP-UP */}
                    <div>
                        <Dialog
                            // fullWidth={true}
                            maxWidth="xs"
                            open={openDialogManageItemWHDtl}
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
                            <DialogContent id="draggable-dialog-title" sx={{ fontSize: "16px", userSelect: 'text', padding: "0px 0px 0px 10px", height: "240px", margin: "0px 10px 0px 0px" }} >
                                {headerManageItemWHDtl()}
                            </DialogContent>
                            <DialogActions sx={{ display: "flex", justifyContent: "space-between", }}>
                                <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 5px 0px 0px", width: "125px" }}
                                    onClick={handleShowAllManageHeaderItemWHDtl} autoFocus variant="contained" startIcon={<AnimationIcon />}>
                                    Show All
                                </Button>

                                <Box>
                                    <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 0px 0px 0px", width: "100px" }}
                                        onClick={handleCloseDialogManageItemWHDtl} autoFocus variant="contained" startIcon={<DoneAllIcon />}>
                                        Ok
                                    </Button>
                                </Box>
                            </DialogActions>
                        </Dialog>
                    </div>

                    {/* LOC GROUP DETAILS MANAGE COLUMNS POP-UP */}
                    <div>
                        <Dialog
                            // fullWidth={true}
                            maxWidth="xs"
                            open={openDialogManageLocGroup}
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
                            <DialogContent id="draggable-dialog-title" sx={{ fontSize: "16px", userSelect: 'text', padding: "0px 0px 0px 10px", height: "240px", margin: "0px 10px 0px 0px" }} >
                                {headerManageLocGroup()}
                            </DialogContent>
                            <DialogActions sx={{ display: "flex", justifyContent: "space-between", }}>
                                <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 5px 0px 0px", width: "125px" }}
                                    onClick={handleShowAllManageHeaderLocGroup} autoFocus variant="contained" startIcon={<AnimationIcon />}>
                                    Show All
                                </Button>

                                <Box>
                                    <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 0px 0px 0px", width: "100px" }}
                                        onClick={handleCloseDialogManageLocGroup} autoFocus variant="contained" startIcon={<DoneAllIcon />}>
                                        Ok
                                    </Button>
                                </Box>
                            </DialogActions>
                        </Dialog>
                    </div>

                    <div>
                        <Dialog
                            fullWidth={true}
                            maxWidth="xs"
                            open={openDialogWIS}
                            PaperComponent={PaperComponent}
                            aria-labelledby="draggable-dialog-title"
                            disableBackdropClick
                        >
                            <DialogTitle sx={{ margin: "0px", padding: "15px 0px 0px 0px", }}></DialogTitle>
                            <DialogContent id="draggable-dialog-title" sx={{ fontSize: "16px", userSelect: 'text', padding: "0px 0px 0px 10px", }} >
                                {DialogDataWIS}
                            </DialogContent>
                            <DialogActions>
                                <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 5px 0px 0px", width: "100px" }}
                                    onClick={handleCloseDialog} autoFocus variant="contained" startIcon={<DoneAllIcon />}>
                                    Ok
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </Box>}
        </div>
    )

};

export default WhatIFSummary;
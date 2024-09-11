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
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import InputLabel from '@mui/material/InputLabel';
import Drawer from "@mui/material/Drawer";
import { makeStyles, withStyles } from "@mui/styles";
import CircularProgress from "@mui/material/CircularProgress";
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
import { Card, CardContent, ListItemIcon } from "@mui/material";
import { height } from "@mui/system";
import { BsFillEraserFill } from 'react-icons/bs';
import ClearIcon from '@mui/icons-material/Clear';
import PassAllocNoScreen from "../CreateScreen/index";
import InfoIcon from '@mui/icons-material/Info';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import {
    postSIZEDETAILSRequest,
    postSIZEHEADERDETAILSRequest,
    postSIZEUPDATEDETAILSRequest,
} from "../../Redux/Action/sizeDetails";
import {
    getALLOCHEADDETAILSRequest,
} from "../../Redux/Action/quantityLimits";
import {
    postSDSaveRequest
} from "../../Redux/Action/createAllocation";
import Draggable from 'react-draggable';
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

});

const styleSelect = {
    control: base => ({
        ...base,
        width: "180px",
        fontSize: "13px",
        minHeight: "30px",
        border: "1px solid rgb(170, 170, 170)",
        // This line disable the blue border
        // borderRadius:"0",
        // backgroundColor:"#f0f0f0",
        boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
        // '& input + fieldset': {
        //   // borderColor: 'gray',
        //   // borderRadius:"0",
        //   // boxShadow:"rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
        // },

    }
    )
    ,
    dropdownIndicator: (base) => ({
        ...base,
        paddingTop: 1,
        //paddingBottom: 0,

    }),
    clearIndicator: (base) => ({
        ...base,
        paddingTop: 0,
        //paddingBottom: 0,
        color: 'rgb(90,90,90)',
    }),
    //inside select
    valueContainer: (provided) => ({
        ...provided,
        minHeight: '30px',
        height: '30px',
        paddingTop: '0px',
        paddingBottom: '0px',

    }),
    singleValue: (provided) => ({
        ...provided,
        // height: '10px',
        // paddingBottom: '0px',

    }),
    input: (provided) => ({
        ...provided,
        width: "100%",
        //height:"30px"

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

const ItemDetailsHeader = [
    { id: "WH_ID", label: "WH", width: "40px", maxWidth: "40px" },
    { id: "SOURCE_ITEM", label: "Style", width: 100, maxWidth: 100 },
    { id: "SOURCE_ITEM_DESC", label: "Description", width: 200, maxWidth: 200 },
    { id: "DIFF_ID", label: "Variant", width: 100, maxWidth: 100 },
    { id: "AVAIL_QTY", label: "Avail Qty", width: "40px", maxWidth: "40px" },
    { id: "ALLOC_QTY", label: "Alloc Qty", width: "40px", maxWidth: "40px" },
    { id: "REMAIN_QTY", label: "Remain Qty", width: "40px", maxWidth: "40px" },
]

const SizeDistributionHeader = [
    { id: "TO_LOC", label: "Loc", width: "30px", maxWidth: "30px" },
    { id: "LOCATION_GROUP_ID", label: "Loc Group", width: "40px", maxWidth: "50px" },
    { id: "LOCATION_GROUP_DESC", label: "Loc Desc", width: "70px", maxWidth: "70px" },
    { id: "WH_ID", label: "Def WH", width: "40px", maxWidth: "45px" },
    { id: "SOURCE_ITEM", label: "Item", width: "50px", maxWidth: "45px" },
    { id: "DIFF_ID", label: "Diff ID", width: "40px", maxWidth: "40px" },
    { id: "TOTAL_SKU_CALC_QTY", label: "Total Qty", width: "50px", maxWidth: "50px" },
]

const SizeDistributionHeader1 = [
    { id: "OH_FF", label: "OH FF", width: "30px", maxWidth: "30px" },
    { id: "NET_NEED", label: "NN", width: "40px", maxWidth: "50px" },
    { id: "REMAIN_QTY", label: "Remain Qty", width: "70px", maxWidth: "70px" },
    { id: "CALC_QTY", label: "Calc Qty", width: "40px", maxWidth: "45px" },
]

const dumpData = [
    { LOC: "10", LOC_GROUP: "", LOC_DESC: "", DEF_WH: "1001", ITEM_PARENT: "123500", ITEM: "1234501", DIFF_ID: "MEDIUM", TOTAL_QTY: "6", OHFF: "2", NN: "3", REMAIN_QTY: "", CALC_QTY: "", DIFF_ID1: "BLACK", AVAIL_QTY: "396", ALLOC_QTY: "24" },
    { LOC: "35", LOC_GROUP: "", LOC_DESC: "", DEF_WH: "1001", ITEM_PARENT: "123500", ITEM: "1234501", DIFF_ID: "SMALL", TOTAL_QTY: "6", OHFF: "2", NN: "3", REMAIN_QTY: "", CALC_QTY: "", DIFF_ID1: "BLACK", AVAIL_QTY: "396", ALLOC_QTY: "24" },
    { LOC: "45", LOC_GROUP: "", LOC_DESC: "", DEF_WH: "1001", ITEM_PARENT: "123500", ITEM: "1234501", DIFF_ID: "LARGE", TOTAL_QTY: "6", OHFF: "2", NN: "3", REMAIN_QTY: "", CALC_QTY: "", DIFF_ID1: "BLACK", AVAIL_QTY: "396", ALLOC_QTY: "24" },
    { LOC: "100", LOC_GROUP: "", LOC_DESC: "", DEF_WH: "1001", ITEM_PARENT: "123500", ITEM: "1234501", DIFF_ID: "XSMALL", TOTAL_QTY: "6", OHFF: "2", NN: "3", REMAIN_QTY: "", CALC_QTY: "", DIFF_ID1: "BLACK", AVAIL_QTY: "396", ALLOC_QTY: "24" },
    { LOC: "10", LOC_GROUP: "", LOC_DESC: "", DEF_WH: "1001", ITEM_PARENT: "123501", ITEM: "3456890", DIFF_ID: "MEDIUM", TOTAL_QTY: "6", OHFF: "2", NN: "3", REMAIN_QTY: "", CALC_QTY: "", DIFF_ID1: "BLUE", AVAIL_QTY: "374", ALLOC_QTY: "25" },
]

const useStyles1 = makeStyles({
    table: {
        minWidth: 650,
    },
});

// const StaticColumns = ['Column 1', 'Column 2', 'Column 3', 'Column 4', 'Column 5', 'Column 6', 'Column 7'];
// const dynamicColumns = ['Item', 'Total Qty', 'Net Qty', 'Min Qty', 'Max Qty'];
// const staticColumns = ['Column 1', 'Column 2', 'Column 3', 'Column 4', 'Column 5', 'Column 6', 'Column 7'];

// const data = [
//     {
//         item: 'Item 1',
//         totalQty: 10,
//         netQty: 5,
//         minQty: 2,
//         maxQty: 20,
//     },
//     {
//         item: 'Item 2',
//         totalQty: 20,
//         netQty: 10,
//         minQty: 5,
//         maxQty: 30,
//     },
//     {
//         item: 'Item 3',
//         totalQty: 15,
//         netQty: 7,
//         minQty: 3,
//         maxQty: 25,
//     },
//     {
//         item: 'Item 4',
//         totalQty: 5,
//         netQty: 3,
//         minQty: 1,
//         maxQty: 10,
//     },
//     {
//         item: 'Item 5',
//         totalQty: 12,
//         netQty: 6,
//         minQty: 4,
//         maxQty: 15,
//     },
// ];

// const RowsData = [
//     { Item: 'Item 1', 'Total qty': 10, 'Net Qty': 8, 'Min Qty': 5, 'Max Qty': 15 },
//     { Item: 'Item 2', 'Total qty': 20, 'Net Qty': 15, 'Min Qty': 10, 'Max Qty': 25 },
//     { Item: 'Item 3', 'Total qty': 30, 'Net Qty': 25, 'Min Qty': 20, 'Max Qty': 35 },
// ];

// const StaticRowsData = [
//     { id: 1, name: 'John', age: 25, gender: 'Male' },
//     { id: 2, name: 'Jane', age: 30, gender: 'Female' },
//     { id: 3, name: 'Bob', age: 45, gender: 'Male' },
//     { id: 4, name: 'Alice', age: 28, gender: 'Female' },
// ];

const SizeDetails = ({ ApproveFreeseCheck, allocNoData, setTab, ScreenNameAllocDetails, sizeDData, setsizeDetailsScreen, setReload }) => {
    const [ItemDetailsData, setItemDetailsData] = useState([]);
    const [sizeDetailsData, setSizeDetailsData] = useState([]);
    const [sizeHeaderDetailsData, setSizeHeaderDetailsData] = useState([]);
    const [TableSizeHeaderDetailsData, setTableSizeHeaderDetailsData] = useState([]);

    const [sizeDetailsData1, setSizeDetailsData1] = useState([]);
    const [sizeDetailsDataHeader, setSizeDetailsDataHeader] = useState([]);
    const [sizeTempCheck, setSizeTempCheck] = useState(false);
    const [allocDetails, setAllocDetails] = useState([]);
    const [sizeTempDataUpdate, setSizeTempDataUpdate] = useState([]);
    const [sizeTempDataUpdateCheck, setSizeTempDataUpdateCheck] = useState(false);
    const [perviousUpdate, setPerviousUpdate] = useState(0);
    const [TotalAllocQty, setTotalAllocQty] = useState(0);

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');

    const [order1, setOrder1] = React.useState('asc');
    const [orderBy1, setOrderBy1] = React.useState('');

    const [inputValue, setInputValue] = useState([]);
    const [sampleVal, setSampleVal] = useState([]);
    const [selectedRow, setSelectedRow] = useState(1);

    const [isSearch, setSearch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSubmit, setSubmit] = useState(false);

    const [LoadCheck, setLoadCheck] = useState(false);
    // Error popup message
    const [openDialogSiD, setOpenDialogSiD] = useState(false);
    const [DialogDataSiD, setDialogDataSiD] = useState("")
    // CHECK OK/CANCEL CLICK
    var okButtonClicked = false;
    var cancelButtonClicked = false;
    const [closeOnBlur, setCloseOnBlur] = useState("");

    const AllocDetailsClasses = useStyles();

    const SizeDetailsData = useSelector(
        (state) => state.sizeDetailsReducers
    );
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = 'Size Details';
    }, []);

    var check = false;

    useEffect(() => {
        setLoading(true);
        if (!check) {

            setSizeDetailsData([])
            setSizeDetailsData1([])
            setSizeHeaderDetailsData([])
            setLoadCheck(true);
            setTableSizeHeaderDetailsData([]);
            if (typeof ScreenNameAllocDetails === "undefined") { dispatch(postSIZEHEADERDETAILSRequest([{ "ALLOC_NO": allocNoData.ALLOC_NO, "COUNT": 1 }])); } //1774963 //1768356
            else {
                dispatch(postSIZEHEADERDETAILSRequest([{ ...sizeDData[0], "COUNT": 1 }]));
            }
            dispatch(getALLOCHEADDETAILSRequest([{ "ALLOC_NO": allocNoData.ALLOC_NO }]));
            check = true
            setSubmit(true)
        }
    }, [""]);
    const [headList, setHeadList] = useState([])

    const handleOkButtonMouseDown = () => {
        okButtonClicked = true;
    };
    const handleCancelButtonMouseDown = () => {
        cancelButtonClicked = true;
    };
    const handleOk = () => {
        setSizeDetailsData([]);
        setSizeHeaderDetailsData([]);
        setTableSizeHeaderDetailsData([]);
        setSizeDetailsData1([]);
        setSizeDetailsDataHeader([]);
        setAllocDetails([]);
        setSizeTempDataUpdate([]);
        document.title = 'Create Allocation';
        dispatch(postSDSaveRequest(["SAVE"]));
        if (typeof ScreenNameAllocDetails === "undefined") {
            setTab('1');
        } else {
            setsizeDetailsScreen(false);
            setTab('5');
            setReload(true);
        }

    }

    const handleCancel = () => {
        dispatch(postSDSaveRequest(["CLOSE"]));
        document.title = 'Create Allocation';
        setSizeDetailsData([]);
        setSizeHeaderDetailsData([]);
        setTableSizeHeaderDetailsData([]);
        setSizeDetailsData1([]);
        setSizeDetailsDataHeader([]);
        setAllocDetails([]);
        setSizeTempDataUpdate([]);
        if (typeof ScreenNameAllocDetails === "undefined") {
            setTab('1');
        } else {
            setsizeDetailsScreen(false);
            setTab('5');
        }
    }
    useEffect(() => {
        if (
            SizeDetailsData?.data?.sizeHeaderDetailsData
            && Array.isArray(SizeDetailsData?.data?.sizeHeaderDetailsData)
        ) {
            if (SizeDetailsData?.data?.sizeHeaderDetailsData.length > 0) {
                setSizeHeaderDetailsData([]);
                setTableSizeHeaderDetailsData([]);
                setSizeHeaderDetailsData(serializedata(SizeDetailsData?.data?.sizeHeaderDetailsData));
                setTableSizeHeaderDetailsData(serializedata(SizeDetailsData?.data?.sizeHeaderDetailsData));
                var Alloc_qty = 0
                SizeDetailsData?.data?.sizeHeaderDetailsData.map(obj => {
                    Alloc_qty = Alloc_qty + obj.ALLOC_QTY
                })
                setTotalAllocQty(Alloc_qty)
                var check = false;
                if (SizeDetailsData?.data?.sizeHeaderDetailsData.length > 0) {
                    if (isSubmit) {
                        dispatch(postSIZEDETAILSRequest([SizeDetailsData?.data?.sizeHeaderDetailsData[0]]));
                        setLoadCheck(true);
                        setSubmit(false)
                    } else {
                        setLoadCheck(false);
                    }
                }
                setSizeTempDataUpdateCheck(true)
            }
            else {
                setLoadCheck(false);
                setTab('1');
                document.title = 'Create Allocation';
                setSizeDetailsData([]);
                setSizeHeaderDetailsData([]);
                setTableSizeHeaderDetailsData([]);
                setSizeDetailsData1([]);
                setSizeDetailsDataHeader([]);
                setAllocDetails([]);
                setSizeTempDataUpdate([]);
                setOpenDialogSiD(true);
                setDialogDataSiD("Please Re-calculate");
            }
            if (closeOnBlur === "OK") {
                setCloseOnBlur("");
                handleOk();
                okButtonClicked = false; // Reset the flag after handling the OK button click
            }
        }
        if (
            SizeDetailsData?.data?.sizeDetailsData
            && Array.isArray(SizeDetailsData?.data?.sizeDetailsData)
        ) {
            if (SizeDetailsData?.data?.sizeDetailsData[0].length > 0) {
                const df_data1 = SizeDetailsData?.data?.sizeDetailsData[0]
                const df_data2 = SizeDetailsData?.data?.sizeDetailsData[1]
                setSizeTempCheck(true)
                setLoading(false);
                setLoadCheck(false);
                setSizeDetailsData1(SizeDetailsData?.data?.sizeDetailsData)

                for (const row of df_data1) {
                    for (const col in row) {
                        if (row.hasOwnProperty(col) && !["DIFF_ID", "LOCATION_GROUP_DESC", "LOCATION_GROUP_ID"].includes(col)) {
                            if (row[col] !== "") {
                                row[col] = parseInt(parseFloat(row[col]));
                            }
                        }
                    }
                }
                for (const row of df_data1) {
                    let total = 0;
                    for (const [key, value] of Object.entries(row)) {
                        if (key.startsWith("CALC_QTY")) {
                            total += parseFloat(value);
                        }
                    }
                    row["TOTAL_SKU_CALC_QTY"] = total;
                }

                const orderedObj = {};
                for (const key in df_data1[0]) {
                    if (key === 'DIFF_ID') {
                        orderedObj[key] = df_data1[0][key];
                        orderedObj['TOTAL_SKU_CALC_QTY'] = df_data1[0]['TOTAL_SKU_CALC_QTY'];
                    } else if (key !== 'TOTAL_SKU_CALC_QTY') {
                        orderedObj[key] = df_data1[0][key];
                    }
                }

                const keys = Object.keys(orderedObj);
                const whIndex = keys.indexOf("WH_ID");
                keys.splice(whIndex, 1);
                keys.splice(keys.indexOf("LOCATION_GROUP_DESC") + 1, 0, "WH_ID");

                const newObject = {};
                for (const key of keys) {
                    newObject[key] = orderedObj[key];
                }

                const newDict = {};

                for (const key in newObject) {
                    if (key === 'TO_LOC') {
                        continue;
                    }

                    if (key === 'ORDER_NO') {
                        newDict['TO_LOC'] = newObject['TO_LOC'];
                    }

                    newDict[key] = newObject[key];
                }

                delete newDict.ALLOC_NO
                delete newDict.ASSIGN_DEFAULT_WH
                delete newDict.ORDER_NO
                delete newDict.TO_LOCATION
                delete newDict.TRAN_ITEM
                delete newDict.TRAN_SOURCE_ITEM

                const headColumns = Object.keys(newDict)

                const columnsToModify = ['CALC_QTY', 'REMAIN_QTY', 'OH_FF', 'NET_NEED'];

                const modifiedList = headColumns.map(column => {
                    for (const colToModify of columnsToModify) {
                        if (column.startsWith(colToModify)) {
                            const parts = column.split('_');
                            return parts.slice(0, 2).concat(parts.slice(3)).join('_');
                        }
                    }
                    return column;
                });


                setHeadList(modifiedList);

                const temp_list100 = []

                df_data1.map(row => {
                    const orderedObj = {};
                    for (const key in row) {
                        if (key === 'DIFF_ID') {
                            orderedObj[key] = row[key];
                            orderedObj['TOTAL_SKU_CALC_QTY'] = row['TOTAL_SKU_CALC_QTY'];
                        } else if (key !== 'TOTAL_SKU_CALC_QTY') {
                            orderedObj[key] = row[key];
                        }
                    }

                    const keys = Object.keys(orderedObj);
                    const whIndex = keys.indexOf("WH_ID");
                    keys.splice(whIndex, 1);
                    keys.splice(keys.indexOf("LOCATION_GROUP_DESC") + 1, 0, "WH_ID");

                    // const whIndex1 = keys.indexOf("TO_LOC");
                    // keys.splice(whIndex1, 1);
                    // keys.splice(keys.indexOf("LOCATION_GROUP_ID") + 1, 0, "TO_LOC");

                    const newObject = {};
                    for (const key of keys) {
                        newObject[key] = orderedObj[key];
                    }

                    const newDict = {};

                    for (const key in newObject) {
                        if (key === 'TO_LOC') {
                            continue;
                        }

                        if (key === 'ORDER_NO') {
                            newDict['TO_LOC'] = newObject['TO_LOC'];
                        }

                        newDict[key] = newObject[key];
                    }

                    delete newDict.ALLOC_NO
                    delete newDict.ASSIGN_DEFAULT_WH
                    delete newDict.ORDER_NO
                    delete newDict.TO_LOCATION
                    delete newDict.TRAN_ITEM
                    delete newDict.TRAN_SOURCE_ITEM
                    temp_list100.push(newDict)
                })

                setSizeDetailsData(temp_list100)


                const result = [];

                for (const key in temp_list100[0]) {
                    if (temp_list100[0].hasOwnProperty(key)) {
                        if (!['TO_LOC', 'LOCATION_GROUP_ID', 'LOCATION_GROUP_DESC', 'WH_ID', 'SOURCE_ITEM', 'DIFF_ID', 'TOTAL_SKU_CALC_QTY', 'TRAN_ITEM'].includes(key)) {
                            const parts = key.split('_');
                            if (parts.length > 2) {
                                result.push((parts[2]));
                            }
                        }
                    }
                }

                const uniqueList = Array.from(new Set(result))


                let result1 = []
                df_data2.map(obj => {
                    if (String(uniqueList).includes(String(obj.TRAN_ITEM))) {
                        let str = obj.TRAN_ITEM.toString() + ' - ' + obj.TRAN_DIFF_ID;
                        result1.push(str);
                    }
                })

                setSizeDetailsDataHeader(result1)
            } else {
                setHeadList([]);
                setSizeTempCheck(false);
                setLoadCheck(false);
                setSizeDetailsData1([]);
                setSizeDetailsData([]);
                setSizeDetailsDataHeader([]);
            }

        }
        if (
            SizeDetailsData?.data?.allocDetails
            && Array.isArray(SizeDetailsData?.data?.allocDetails)
        ) {
            setAllocDetails(SizeDetailsData?.data?.allocDetails);
            sizeDetailsData.splice(0, sizeDetailsData.length);
            sizeDetailsDataHeader.splice(0, sizeDetailsDataHeader.length);
            headList.splice(0, headList.length);
            setLoadCheck(true);
            setLoading(false);
        } else if (
            SizeDetailsData?.data?.sizeTempDataUpdate
        ) {
            setLoadCheck(false);
            if (SizeDetailsData?.data?.sizeTempDataUpdate?.status === 200) {
                setSizeTempDataUpdate(SizeDetailsData?.data?.sizeTempDataUpdate?.message);
                if (typeof ScreenNameAllocDetails === "undefined") { dispatch(postSIZEHEADERDETAILSRequest([{ "ALLOC_NO": allocNoData.ALLOC_NO, "COUNT": 2 }])); } //1774963 //1768356
                else {
                    dispatch(postSIZEHEADERDETAILSRequest([{ ...sizeDData[0], "COUNT": 2 }]));
                }
                // dispatch(postSIZEHEADERDETAILSRequest([{ "ALLOC_NO": allocNoData.ALLOC_NO, "COUNT": 2 }]));
                setSizeHeaderDetailsData([]);
                setTableSizeHeaderDetailsData([]);
                setLoadCheck(true);
                if (SizeDetailsData?.data?.sizeTempDataUpdate?.message.length > 0) {
                    const data = SizeDetailsData?.data?.sizeTempDataUpdate?.message
                    const substring = data[0].TRAN_ITEM
                    sizeDetailsData.map(obj => {
                        if (allocDetails[0].ALLOC_CRITERIA !== 'F') {
                            var Var2 = "REMAIN_QTY_" + substring
                            obj[Var2] = data[0].UPDATE_REMAIN_QTY
                        }
                        if (data[0].SOURCE_ITEM === obj.SOURCE_ITEM && data[0].TO_LOC === obj.TO_LOC && data[0].DIFF_ID === obj.DIFF_ID && data[0].WH_ID === obj.WH_ID) {
                            let sum = 0;
                            Object.keys(obj).map(col => {
                                if (col.includes("CALC_QTY")) {
                                    sum += Number(obj[col]);
                                }
                                obj["TOTAL_SKU_CALC_QTY"] = sum
                            })
                        }
                    })
                    setSizeDetailsData(sizeDetailsData)
                }
                setSizeTempDataUpdate([])
            } else if (SizeDetailsData?.data?.sizeTempDataUpdate?.status === 500) {
                if (SizeDetailsData?.data?.sizeTempDataUpdate?.message[1].length > 0) {
                    const data = SizeDetailsData?.data?.sizeTempDataUpdate?.message[1]
                    const substring = data[0].TRAN_ITEM
                    sizeDetailsData.map(obj => {
                        if (data[0].SOURCE_ITEM === obj.SOURCE_ITEM && data[0].TO_LOC === obj.TO_LOC && data[0].DIFF_ID === obj.DIFF_ID && data[0].WH_ID === obj.WH_ID) {
                            var Var2 = "CALC_QTY_" + substring
                            obj[Var2] = perviousUpdate
                        }
                    })
                    setSizeDetailsData(sizeDetailsData)
                }
                setPerviousUpdate(0);
                setSizeTempDataUpdate([]);
                setOpenDialogSiD(true);
                setDialogDataSiD(String(SizeDetailsData?.data?.sizeTempDataUpdate?.message[0]));
            }
            setLoading(false);
        }
    }, [SizeDetailsData?.data]);

    if (sizeTempCheck && ItemDetailsData.length > 0) {
        setSizeTempCheck(false)
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
    }));

    const CustomTableRow = styled(TableRow)(({ theme, isEvenRow }) => ({
        backgroundColor: isEvenRow ? '#F0F0F0' : 'lightgrey',
        '&:hover': {
            backgroundColor: '#f5f5f5',
        },
    }));


    const SearchButtonHeaderDesc = () => (
        <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} >
            <InfoIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em', color: "CadetBlue" }}
                onClick={() => {
                    setOpenDialogSiD(true);
                    setDialogDataSiD(String(allocDetails[0].ALLOC_DESC));
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

            <div className={AllocDetailsClasses.header_container}>
                <div className={AllocDetailsClasses.header_child}>
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
                                className: AllocDetailsClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.header_child}>
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
                                className: AllocDetailsClasses.input,
                                style: { fontSize: 12, backgroundColor: "#f0f0f0", height: "30px", },
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
                            Alloc Context</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
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
                                className: AllocDetailsClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                {allocDetails.length > 0 ? (allocDetails[0].CONTEXT === "Promotion" ?
                    [
                        <div className={AllocDetailsClasses.header_child}>
                            <div>
                                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
                                    Promotion</InputLabel>
                            </div>
                            <div className={AllocDetailsClasses.multiselectfield}>
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
                                        className: AllocDetailsClasses.input,
                                    }}
                                    disabled
                                />
                            </div>
                        </div>
                    ] : null)
                    : null}


                <div className={AllocDetailsClasses.header_child}>
                    <div >
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
                            Alloc Level</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
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
                                className: AllocDetailsClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.header_child}>
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
                                className: AllocDetailsClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
                            Status</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
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
                                className: AllocDetailsClasses.input,
                            }}
                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
                            Alloc Type</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
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
                                className: AllocDetailsClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.header_child}>
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
                                className: AllocDetailsClasses.input,
                            }}
                        />
                    </div>
                </div>
            </div>
        </Box>
    )

    function ItemDetailsTableHead(props) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <>
                <TableHead
                    className={AllocDetailsClasses.TitleHead}
                // sx={{ position: "sticky", top: 0, zIndex: "1" }}
                >
                    <TableRow className={AllocDetailsClasses.TitleRow}
                    // sx={{ border: "1px solid red" }}

                    >

                        {ItemDetailsHeader.map((headCell) => (
                            <StyledTableCell
                                key={headCell.id}
                                // className={AllocDetailsClasses.TableCell}
                                size="small"
                                sortDirection={orderBy === headCell.id ? order : false}
                                style={{
                                    whiteSpace: "nowrap", paddingLeft: "3px",
                                    width: headCell.width
                                    // border: "1px solid black"
                                }}
                            // colSpan={4}
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
                                        },
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

    ItemDetailsTableHead.propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };

    const [textValue, setTextValue] = useState('');

    const handleTextChange = (event) => {
        setTextValue(event.target.value);
    };
    const classes = useStyles1();

    const serializedata = (datatable) => {
        let newTabledata = [];
        let count = 1;
        if (datatable.length > 0) {
            datatable.map(item => {
                item['SR_NO'] = count;
                const reorder = {
                    'ALLOC_NO': "",
                    'ALLOC_QTY': "",
                    'AVAIL_QTY': "",
                    'WH_ID': "",
                    'SOURCE_ITEM': "",
                    'DIFF_ID': "",
                    'SOURCE_ITEM_DESC': "",
                    'ORDER_NO': "",
                    'REMAIN_QTY': "",
                }
                count++;

                let test = Object.assign(reorder, item);
                newTabledata.push(test);
            })
            return newTabledata;
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
                    const temp = TableSizeHeaderDetailsData.filter((props) => String(props[Object.keys(inputValue)[i]]).toLowerCase() === String(temp_dict[Object.keys(inputValue)[i]]).toLowerCase())
                    setSizeHeaderDetailsData(temp);
                }
                else {
                    const filteredTable = TableSizeHeaderDetailsData.filter((props) =>
                        Object.entries(inputValue).every(
                            ([key, val]) =>
                                !val.length ||
                                props[key]
                                    ?.toString()
                                    .toLowerCase()
                                    .includes(val?.toString().toLowerCase())
                        )
                    );
                    setSizeHeaderDetailsData(filteredTable);
                }
            }
        }
        if (Object.keys(inputValue).length === 0) {
            setSizeHeaderDetailsData(TableSizeHeaderDetailsData)
        }

    }, [inputValue]);

    function descendingComparator(a, b, orderBy) {
        let c, d;
        // if (orderBy == "LOC_DESC" || orderBy == "LIKE_LOC_DESC") {
        //     c = b[orderBy].slice(b[orderBy].indexOf("-") + 1);
        //     d = a[orderBy].slice(a[orderBy].indexOf("-") + 1);
        //     c = isNaN(c) ? c : parseInt(c);
        //     d = isNaN(d) ? d : parseInt(d);
        //     c = isNaN(c) ? 0 : parseInt(c);
        //     d = isNaN(d) ? 0 : parseInt(d);
        // }
        if (orderBy == "WH_ID" || orderBy == "SOURCE_ITEM"
            || orderBy == "AVAIL_QTY" || orderBy == "ALLOC_QTY" || orderBy == "REMAIN_QTY" ||
            orderBy == "TO_LOC" || orderBy == "LOCATION_GROUP_ID" || orderBy == "TOTAL_SKU_CALC_QTY"
            || orderBy == "OH_FF" || orderBy == "NET_NEED" || orderBy == "CALC_QTY") {
            c = parseInt(b[orderBy]);
            d = parseInt(a[orderBy]);
            c = isNaN(c) ? 0 : parseInt(c);
            d = isNaN(d) ? 0 : parseInt(d);
        }
        else if (orderBy == "SOURCE_ITEM_DESC" || orderBy == "DIFF_ID" || orderBy == "LOCATION_GROUP_DESC") {

            c = (b[orderBy]);
            d = (a[orderBy]);
            // c = isNaN(c) ? 0 : parseInt(c);
            // d = isNaN(d) ? 0 : parseInt(d);
        }
        else {
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
            else if (d !== "" && c === "") {
                return -1
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
                const sortedData = stableSort(sizeHeaderDetailsData, getComparator("asc", sortValue));
                setSizeHeaderDetailsData(sortedData);
            }
            if (order === "desc") {
                const sortedData = stableSort(sizeHeaderDetailsData, getComparator("desc", sortValue));
                setSizeHeaderDetailsData(sortedData);
            }
            setSortCheck(false)
        }
    }, [sizeHeaderDetailsData, order, orderBy]);

    const handleRequestSort = (event, property) => {
        if (event) {
            setSortCheck(true)
            setSortValue(String(property))
        }
        const isAsc = (orderBy === property && order === 'asc');
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleRequestSort1 = (event, property) => {
        const isAsc = (orderBy1 === property && order1 === 'asc');
        setOrder1(isAsc ? 'desc' : 'asc');
        setOrderBy1(property);
        if (isAsc) {
            const sortedData = stableSort(sizeDetailsData, getComparator("desc", property));
            setSizeDetailsData(sortedData);
        } else {
            const sortedData = stableSort(sizeDetailsData, getComparator("asc", property));
            setSizeDetailsData(sortedData);
        }
    };

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

    const SelectRowSize = (e, value) => {
        // const temp = Object.keys(sizeDetailsData[0]).map(obj => value.)

        if (allocDetails[0].ALLOC_CRITERIA === "F") {
            if (String(sizeDetailsData[0].SOURCE_ITEM) !== String(value.SOURCE_ITEM)) {
                if (String(sizeDetailsData[0].DIFF_ID) !== String(value.DIFF_ID)) {
                    dispatch(postSIZEDETAILSRequest([value]));
                    setHeadList([]);
                    setSizeDetailsData1([]);
                    setSizeDetailsData([]);
                    setSizeDetailsDataHeader([]);
                    setLoadCheck(true);
                    setSelectedRow(value.SR_NO);
                } else {
                    dispatch(postSIZEDETAILSRequest([value]));
                    setHeadList([]);
                    setSizeDetailsData1([]);
                    setSizeDetailsData([]);
                    setSizeDetailsDataHeader([]);
                    setLoadCheck(true);
                    setSelectedRow(value.SR_NO);
                }
            }
        } else {
            if (String(sizeDetailsData[0].SOURCE_ITEM) !== String(value.SOURCE_ITEM)
                || String(sizeDetailsData[0].DIFF_ID) !== String(value.DIFF_ID)
                || String(sizeDetailsData[0].WH_ID) !== String(value.WH_ID)) {
                dispatch(postSIZEDETAILSRequest([value]));
                setHeadList([]);
                setSizeDetailsData1([]);
                setSizeDetailsData([]);
                setSizeDetailsDataHeader([]);
                setLoadCheck(true);
                setSelectedRow(value.SR_NO);
            }
            // if (String(sizeDetailsData[0].SOURCE_ITEM) !== String(value.SOURCE_ITEM)) {
            //     if (String(sizeDetailsData[0].DIFF_ID) !== String(value.DIFF_ID)) {
            //         if (String(sizeDetailsData[0].WH_ID) !== String(value.WH_ID)) {
            //             dispatch(postSIZEDETAILSRequest([value]));
            //             setHeadList([]);
            //             setSizeDetailsData1([]);
            //             setSizeDetailsData([]);
            //             setSizeDetailsDataHeader([]);
            //             setLoadCheck(true);
            //             setSelectedRow(value.SR_NO);
            //         } else {
            //             dispatch(postSIZEDETAILSRequest([value]));
            //             setHeadList([]);
            //             setSizeDetailsData1([]);
            //             setSizeDetailsData([]);
            //             setSizeDetailsDataHeader([]);
            //             setLoadCheck(true);
            //             setSelectedRow(value.SR_NO);
            //         }
            //     } else {
            //         if (String(sizeDetailsData[0].WH_ID) !== String(value.WH_ID)) {
            //             dispatch(postSIZEDETAILSRequest([value]));
            //             setHeadList([]);
            //             setSizeDetailsData1([]);
            //             setSizeDetailsData([]);
            //             setSizeDetailsDataHeader([]);
            //             setLoadCheck(true);
            //             setSelectedRow(value.SR_NO);
            //         } else {
            //             dispatch(postSIZEDETAILSRequest([value]));
            //             setHeadList([]);
            //             setSizeDetailsData1([]);
            //             setSizeDetailsData([]);
            //             setSizeDetailsDataHeader([]);
            //             setLoadCheck(true);
            //             setSelectedRow(value.SR_NO);
            //         }
            //     }
            // }
            // else if (String(sizeDetailsData[0].SOURCE_ITEM) === String(value.SOURCE_ITEM)) {
            //     console.log ("grid chk1")
            //     if (String(sizeDetailsData[0].WH_ID) !== String(value.WH_ID)) {
            //         console.log ("grid chk2")
            //         dispatch(postSIZEDETAILSRequest([value]));
            //         setHeadList([]);
            //         setSizeDetailsData1([]);
            //         setSizeDetailsData([]);
            //         setSizeDetailsDataHeader([]);
            //         setLoadCheck(true);
            //         setSelectedRow(value.SR_NO);
            //     }

            // }
        }
    }

    const handleBlur = (e, value1, value2) => {
        if (e) {
            if (okButtonClicked) {
                setCloseOnBlur("OK");
                okButtonClicked = false; // Reset the flag after handling the OK button click
            } else if (cancelButtonClicked) {
                setCloseOnBlur("");
                handleCancel();
                cancelButtonClicked = false;
                return;
            }
            var Var1 = "0"
            sizeDetailsData.map(obj => {
                if (value2.SOURCE_ITEM === obj.SOURCE_ITEM && value2.TO_LOC === obj.TO_LOC && value2.DIFF_ID === obj.DIFF_ID && value2.WH_ID === obj.WH_ID) {
                    setPerviousUpdate(obj[value1])
                    if (e.target.textContent === "") {
                        obj[value1] = "0"
                    } else {
                        obj[value1] = e.target.textContent
                    }
                }
            })
            setSizeDetailsData(sizeDetailsData);
            if (e.target.textContent === "") {
                Var1 = "0"
            } else {
                Var1 = e.target.textContent
            }
            const CALC_QTY_column = value1.substring(9);
            setLoadCheck(true);
            dispatch(postSIZEUPDATEDETAILSRequest([{ ...value2, "CALC_QTY": Var1, "TRAN_ITEM": CALC_QTY_column, "ALLOC_NO": allocNoData.ALLOC_NO, "ORDER_NO": "" }]));
        }
    };



    const handleCloseDialog = (e) => {
        setOpenDialogSiD(false);
        setDialogDataSiD("")
    }

    return (
        <Box className={AllocDetailsClasses.maindiv} sx={{ width: "100%" }}>
            <div >
                {SearchHeader()}
            </div>



            <div  >
                <Box
                    display="inline-block"
                    sx={{
                        backgroundColor: "",
                        height: "auto",
                        width: "calc(93vw - 0px)",
                        // width: "100%",
                        // width:"calc(93vw - 0px)",
                        borderRadius: 1,

                        boxShadow: 2, border: 0,
                        borderBottom: 3,
                        border: "1px solid lightgrey",
                        margin: "5px 0px 0px 2px"
                    }}
                >
                    <div className={AllocDetailsClasses.course_box}>
                        <Box
                            display='flex'
                            sx={{
                                width: "calc(92vw - 0px)",
                                padding: "0px 0px 0px 0px",
                                justifyContent: "space-between",
                                margin: "10px 0px 0px 0px"
                            }}
                        >
                            <div>
                                <div className={AllocDetailsClasses.grid_block}>
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
                                </div>

                                <div className={AllocDetailsClasses.TableBoby}>
                                    <Paper sx={{ margin: "0px 0px 0px 5px", width: '100%', mb: 0, height: "auto", width: "calc(60vw - 0px)", borderRadius: 1, boxShadow: 2, border: 0, borderBottom: 3, }}>
                                        <TableContainer style={{ maxHeight: 280, width: "calc(100% - 0px)" }}
                                            component={Paper}
                                        >
                                            <Table aria-label="customized table">
                                                <ItemDetailsTableHead
                                                    // numSelected={selected.length}
                                                    order={order}
                                                    orderBy={orderBy}
                                                    // onSelectAllClick={handleSelectAllClick}
                                                    onRequestSort={handleRequestSort}
                                                // rowCount={qtyLimitsData.length}
                                                // sx={{height: "auto",border:"2px solid blue"}}
                                                />
                                                <TableBody
                                                >
                                                    <TableCell sx={{
                                                        padding: "0px"
                                                        , height: "auto"
                                                    }}>
                                                        <TextField
                                                            name="WH_ID"
                                                            onChange={testChange}
                                                            value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("WH_ID") > 0 ? inputValue.WH_ID : ""}
                                                            placeholder="WH"
                                                            autoComplete="off"
                                                            InputProps={{
                                                                sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", }
                                                            }}
                                                            sx={{ width: "100%", }}
                                                            variant="standard"
                                                            inputProps={{
                                                                sx: {
                                                                    fontSize: 12, padding: "0px 0px 0px 3px", height: "22px", textAlign: "left",
                                                                    "&::placeholder": { textAlign: "left", padding: "0px", },
                                                                },
                                                            }}
                                                        />
                                                    </TableCell>

                                                    <TableCell sx={{
                                                        padding: "0px",
                                                    }}>
                                                        <TextField
                                                            name="SOURCE_ITEM"
                                                            onChange={testChange}
                                                            value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("SOURCE_ITEM") > 0 ? inputValue.SOURCE_ITEM : ""}
                                                            placeholder="Style"
                                                            autoComplete="off"
                                                            InputProps={{
                                                                sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", }
                                                            }}
                                                            sx={{ width: "100%", }}
                                                            variant="standard"
                                                            inputProps={{
                                                                sx: {
                                                                    fontSize: 12, padding: "0px 0px 0px 3px", height: "22px", textAlign: "left",
                                                                    "&::placeholder": { textAlign: "left", padding: "0px", },
                                                                },
                                                            }}
                                                        />
                                                    </TableCell>

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
                                                                sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", }
                                                            }}
                                                            sx={{ width: "100%", }}
                                                            variant="standard"
                                                            inputProps={{
                                                                sx: {
                                                                    fontSize: 12, padding: "0px 0px 0px 3px", height: "22px", textAlign: "left",
                                                                    "&::placeholder": { textAlign: "left", padding: "0px", },
                                                                },
                                                            }}
                                                        />
                                                    </TableCell>

                                                    <TableCell sx={{
                                                        padding: "0px"
                                                        , height: "auto"
                                                    }}>
                                                        <TextField
                                                            name="DIFF_ID"
                                                            onChange={testChange}
                                                            value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("DIFF_ID") > 0 ? inputValue.DIFF_ID : ""}
                                                            placeholder="Variant"
                                                            autoComplete="off"
                                                            InputProps={{
                                                                sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", }
                                                            }}
                                                            sx={{ width: "100%", }}
                                                            variant="standard"
                                                            inputProps={{
                                                                sx: {
                                                                    fontSize: 12, padding: "0px 0px 0px 3px", height: "22px", textAlign: "left",
                                                                    "&::placeholder": { textAlign: "left", padding: "0px", },
                                                                },
                                                            }}
                                                        />
                                                    </TableCell>

                                                    <TableCell sx={{
                                                        padding: "0px"
                                                        , height: "auto"
                                                    }}>
                                                        <TextField
                                                            name="AVAIL_QTY"
                                                            onChange={testChange}
                                                            value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("AVAIL_QTY") > 0 ? inputValue.AVAIL_QTY : ""}
                                                            placeholder="Avail Qty"
                                                            autoComplete="off"
                                                            InputProps={{
                                                                sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", }
                                                            }}
                                                            sx={{ width: "100%", }}
                                                            variant="standard"
                                                            inputProps={{
                                                                sx: {
                                                                    fontSize: 12, padding: "0px 0px 0px 3px", height: "22px", textAlign: "left",
                                                                    "&::placeholder": { textAlign: "left", padding: "0px", },
                                                                },
                                                            }}
                                                        />
                                                    </TableCell>

                                                    <TableCell sx={{
                                                        padding: "0px"
                                                        , height: "auto"
                                                    }}>
                                                        <TextField
                                                            name="ALLOC_QTY"
                                                            onChange={testChange}
                                                            value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("ALLOC_QTY") > 0 ? inputValue.ALLOC_QTY : ""}
                                                            placeholder="Alloc Qty"
                                                            autoComplete="off"
                                                            InputProps={{
                                                                sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", }
                                                            }}
                                                            sx={{ width: "100%", }}
                                                            variant="standard"
                                                            inputProps={{
                                                                sx: {
                                                                    fontSize: 12, padding: "0px 0px 0px 3px", height: "22px", textAlign: "left",
                                                                    "&::placeholder": { textAlign: "left", padding: "0px", },
                                                                },
                                                            }}
                                                        />
                                                    </TableCell>

                                                    <TableCell sx={{
                                                        padding: "0px"
                                                        , height: "auto"
                                                    }}>
                                                        <TextField
                                                            name="REMAIN_QTY"
                                                            onChange={testChange}
                                                            value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("REMAIN_QTY") > 0 ? inputValue.REMAIN_QTY : ""}
                                                            placeholder="Remain Qty"
                                                            autoComplete="off"
                                                            InputProps={{
                                                                sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", }
                                                            }}
                                                            sx={{ width: "100%", }}
                                                            variant="standard"
                                                            inputProps={{
                                                                sx: {
                                                                    fontSize: 12, padding: "0px 0px 0px 3px", height: "22px", textAlign: "left",
                                                                    "&::placeholder": { textAlign: "left", padding: "0px", },
                                                                },
                                                            }}
                                                        />
                                                    </TableCell>
                                                </TableBody>

                                                <TableBody
                                                >
                                                    {sizeHeaderDetailsData.length > 0 ?
                                                        sizeHeaderDetailsData.map((row, index) => {
                                                            return (
                                                                <TableRow
                                                                    hover
                                                                    role="checkbox"
                                                                    tabIndex={-1}
                                                                    onClick={(e) => SelectRowSize(e, row)}
                                                                    style={selectedRow === row.SR_NO ? { backgroundColor: "#CDF0FF" } : null}
                                                                >


                                                                    <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px", height: "22px" }}
                                                                    // onClick={(event) => showAvailDialog(event, row)}
                                                                    >
                                                                        {row.WH_ID}
                                                                    </TableCell>

                                                                    <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}>
                                                                        {row.SOURCE_ITEM}
                                                                    </TableCell>

                                                                    <TableCell align="right" sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }} >
                                                                        <Box
                                                                            display="flex"
                                                                            justifyContent="space-between"
                                                                        >
                                                                            <InputLabel
                                                                                sx={{
                                                                                    paddingTop: "3px",
                                                                                    fontSize: "12px",
                                                                                    fontFamily: "system-ui",
                                                                                    // fontWeight:"bold",
                                                                                    color: "rgb(10, 10, 10)",
                                                                                    paddingLeft: "2px",
                                                                                    paddingRight: "0px",
                                                                                    //width: "fit-content"
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
                                                                                className={AllocDetailsClasses.textField}
                                                                                onClick={() => {
                                                                                    setOpenDialogSiD(true);
                                                                                    setDialogDataSiD(String(row.SOURCE_ITEM_DESC));
                                                                                }}
                                                                                startIcon={<InfoIcon style={{ fontSize: 16, backgroundColor: "" }} />}
                                                                            >
                                                                            </Button>
                                                                        </Box>
                                                                    </TableCell>

                                                                    <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}>
                                                                        {row.DIFF_ID}
                                                                    </TableCell>

                                                                    <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}>
                                                                        {row.AVAIL_QTY}
                                                                    </TableCell>

                                                                    <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}>
                                                                        {row.ALLOC_QTY}
                                                                    </TableCell>

                                                                    <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}>
                                                                        {row.REMAIN_QTY}
                                                                    </TableCell>

                                                                </TableRow >
                                                            );
                                                        }) : null}

                                                    {sizeHeaderDetailsData.length < 10 ?
                                                        [...Array(10 - (sizeHeaderDetailsData.length)).keys()].map(val => (
                                                            <TableRow  >
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "20px" }}></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} ></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>

                                                            </TableRow >
                                                        )) : false}
                                                </TableBody>

                                                <TableHead sx={{ position: "sticky", top: 0, }}>
                                                    <TableCell sx={{
                                                        backgroundColor: "white", height: "22px", border: 0,
                                                        padding: "0px", textAlign: "left", fontSize: "12px", height: "22px"
                                                    }} colSpan={5}></TableCell>
                                                    <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px", height: "22px", background: "#bc8f8f" }}>
                                                        {TotalAllocQty}</TableCell>
                                                    <TableCell sx={{
                                                        backgroundColor: "white", height: "22px", border: 0,
                                                        padding: "0px", textAlign: "left", fontSize: "12px", height: "22px"
                                                    }}></TableCell>
                                                </TableHead>
                                            </Table>
                                        </TableContainer>
                                    </Paper>
                                </div>
                            </div>


                            <div className={AllocDetailsClasses.float_child}>
                                <Button
                                    sx={{
                                        fontSize: "12px",
                                        backgroundColor: "#228B22",
                                        padding: "5px", fontFamily: "system-ui",
                                        width: "100px", marginLeft: "5px", marginTop: "2px",
                                    }}
                                    variant="contained"
                                    type="submit"
                                    startIcon={<DoneAllIcon />}
                                    onClick={handleOk}
                                    onMouseDown={handleOkButtonMouseDown}
                                >
                                    Ok</Button>

                                <Button
                                    sx={{
                                        backgroundColor: "maroon",
                                        fontSize: "12px", padding: "5px", fontFamily: "system-ui",
                                        width: "100px", marginLeft: "5px", marginTop: "2px",
                                    }}
                                    variant="contained"
                                    type="submit"
                                    startIcon={<CancelIcon />}
                                    onClick={handleCancel}
                                    onMouseDown={handleCancelButtonMouseDown}
                                >
                                    Cancel</Button>

                            </div>
                        </Box>

                        <Box
                            sx={{
                                boxShadow: 3,
                                borderRadius: 1,
                                width: "calc(92vw - 0px)",
                                margin: "5px 0px 5px 5px",
                                padding: "0px 0px 0px 0px"
                            }}
                        >
                            <div className={AllocDetailsClasses.TableTotalBoby} display="flex">
                                <Box
                                    display='flex'
                                >
                                    <InputLabel sx={{
                                        fontWeight: "bold",
                                        fontSize: "14px",
                                        margin: "5px 0px 10px 5px",
                                        display: 'flex',
                                        float: 'left',
                                        color: "black",
                                    }}>
                                        Size Distribution
                                    </InputLabel>
                                </Box>

                                <div>
                                    <TableContainer component={Paper} style={{ maxHeight: 300, width: "calc(92vw - 0px)" }}>

                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead sx={{
                                                position: "sticky",
                                                top: 0,
                                            }}>
                                                <TableRow>
                                                    <TableCell colSpan={7} sx={{
                                                        backgroundColor: "white", height: "22px", border: 0
                                                    }}>
                                                    </TableCell>
                                                    {sizeDetailsDataHeader.length > 0 ? sizeDetailsDataHeader.map((headCell) => (
                                                        <StyledTableCell
                                                            key={headCell}
                                                            // className={AllocDetailsClasses.TableCell}
                                                            size="small"
                                                            colSpan={4}
                                                            // sortDirection={orderBy === headCell.id ? order : false}
                                                            style={{
                                                                whiteSpace: "nowrap", padding: "0px", margin: "0px", paddingLeft: "3px", color: "#fff",
                                                                height: "25px"
                                                            }}
                                                        >
                                                            {headCell}
                                                        </StyledTableCell>
                                                    )) : null}
                                                </TableRow>

                                                <TableRow>
                                                    {headList.map((headCell, index) => (
                                                        <StyledTableCell key={index}
                                                            style={{
                                                                whiteSpace: "nowrap", padding: "0px 3px 0px 3px", margin: "0px", paddingLeft: "3px", color: "#fff"
                                                            }}
                                                        >
                                                            {headList.length > 0 ? (headCell === "OH_FF" ? "OH FF" : (headCell === "NET_NEED" ? "NN" :
                                                                (headCell === "REMAIN_QTY" ? "Remain Qty" : (headCell === "CALC_QTY" ? "Calc Qty" :
                                                                    (headCell === "TO_LOC" ? "Location" : (headCell === "LOCATION_GROUP_ID" ? "Location Group" :
                                                                        (headCell === "LOCATION_GROUP_DESC" ? "Description" : (headCell === "TOTAL_SKU_CALC_QTY" ? "Total Qty" :
                                                                            (headCell === "WH_ID" ? "Def WH" : (headCell === "SOURCE_ITEM" ? "Sku" :
                                                                                (headCell === "DIFF_ID" ? "Variant" : headCell))))))))))) : headCell}
                                                        </StyledTableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>


                                            {/* <TableHead sx={{
                                                position: "sticky",
                                                top: -1,
                                            }}>
                                                
                                            </TableHead> */}

                                            <TableHead
                                            >
                                                {sizeDetailsData.map((row, rowIndex) => {
                                                    const isEvenRow = rowIndex % 2 === 0;
                                                    return (
                                                        <CustomTableRow key={row.SOURCE_ITEM} isEvenRow={isEvenRow}>
                                                            {Object.keys(row).map((key, index) => (
                                                                <React.Fragment key={index}>
                                                                    {key.startsWith('CALC_QTY') ? (
                                                                        <TableCell sx={{
                                                                            padding: "0px",
                                                                            textAlign: "left",
                                                                            fontSize: "12px",
                                                                            outline: "none",
                                                                            verticalAlign: "center",
                                                                            // backgroundColor: '#fff',
                                                                            margin: "0px 0px 0px 0px",
                                                                        }}
                                                                            // disabled={searchHeaderData.ALLOC_CRITERIA === "WHAT_IF" || ApproveFreeseCheck}
                                                                            contentEditable={((allocDetails.length > 0 && allocDetails[0].ALLOC_CRITERIA === "F") || ApproveFreeseCheck) ? false : true}
                                                                            onBlur={(e) => {
                                                                                handleBlur(e, key, row)
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
                                                                                    setOpenDialogSiD(true);
                                                                                    setDialogDataSiD("Only Numberic values are accepted");
                                                                                    e.target.textContent = ""
                                                                                }
                                                                                else if (parseInt(e.target.textContent) < 0 && e.target.textContent !== "") {
                                                                                    setOpenDialogSiD(true);
                                                                                    setDialogDataSiD("Values should be greater than zero*");
                                                                                    e.target.textContent = ""
                                                                                }
                                                                            }}
                                                                            suppressContentEditableWarning={true}
                                                                        >
                                                                            <Box sx={{
                                                                                backgroundColor: '#fff',
                                                                                padding: "0px 0px 0px 3px",
                                                                                height: "22px",
                                                                                border: "1px solid lightgrey",
                                                                                borderRadius: "3px",
                                                                                textAlign: "left",
                                                                                fontSize: 12,
                                                                                margin: "0px 0px 0px 0px", display: "flex",
                                                                                justifyContent: "left",
                                                                                alignItems: "center",
                                                                            }
                                                                            }>
                                                                                {row[key]}
                                                                            </Box>
                                                                        </TableCell>
                                                                    ) : (
                                                                        <TableCell sx={{ padding: '0px 0px 0px 3px', textAlign: 'left', fontSize: '12px' }}>
                                                                            {key === "LOCATION_GROUP_DESC" ?
                                                                                (String(row.LOCATION_GROUP_DESC).length > 0 ?
                                                                                    <Box
                                                                                        display="flex"
                                                                                        justifyContent="space-between"
                                                                                    >
                                                                                        <InputLabel
                                                                                            sx={{
                                                                                                paddingTop: "3px",
                                                                                                fontSize: "12px",
                                                                                                fontFamily: "system-ui",
                                                                                                // fontWeight:"bold",
                                                                                                color: "rgb(10, 10, 10)",
                                                                                                paddingLeft: "2px",
                                                                                                paddingRight: "0px",
                                                                                                //width: "fit-content"
                                                                                            }}
                                                                                        >
                                                                                            {row.LOCATION_GROUP_DESC}
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
                                                                                            className={AllocDetailsClasses.textField}
                                                                                            onClick={() => {
                                                                                                setOpenDialogSiD(true);
                                                                                                setDialogDataSiD(String(row.LOCATION_GROUP_DESC));
                                                                                            }}
                                                                                            startIcon={<InfoIcon style={{ fontSize: 16, backgroundColor: "" }} />}
                                                                                        >
                                                                                        </Button>
                                                                                    </Box> : null)
                                                                                : row[key]}
                                                                        </TableCell>
                                                                    )}
                                                                </React.Fragment>
                                                            ))}
                                                        </CustomTableRow>
                                                    );
                                                })}

                                                {sizeDetailsData.length < 10 ?
                                                    [...Array(10 - (sizeDetailsData.length)).keys()].map((val, index) => (
                                                        <CustomTableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? '#F0F0F0' : 'lightgrey' }}>
                                                            {headList.map((obj, i) =>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "20px" }}></TableCell>
                                                            )}
                                                        </CustomTableRow >
                                                    )) : false}
                                            </TableHead>
                                        </Table>
                                    </TableContainer>
                                </div>


                            </div>
                        </Box>

                        {/* <div>
                            {sizeDetailsData1.length > 4 ?
                                <Box display="flex"
                                    sx={{
                                        justifyContent: "flex-end", width: "calc(92vw - 0px)",
                                        margin: "5px 0px 5px 5px",
                                        padding: "0px 0px 0px 0px"
                                    }}
                                >
                                    <Button
                                        sx={{
                                            backgroundColor: "lightgrey", padding: "0px", color: "black",
                                            width: "10px", marginTop: "2px", maxWidth: "10px"
                                        }}
                                        variant="contained"
                                        onClick={handleDoubleRightArrow}
                                        startIcon={<KeyboardDoubleArrowLeftIcon />}
                                    ></Button>
                                    <Button
                                        sx={{
                                            backgroundColor: "lightgrey", padding: "0px", color: "black",
                                            width: "10px", marginTop: "2px", maxWidth: "10px"
                                        }}
                                        variant="contained"
                                        onClick={handleRightArrow}
                                        startIcon={<KeyboardArrowLeftIcon />}
                                    ></Button>
                                    <Button
                                        sx={{
                                            backgroundColor: "lightgrey", padding: "0px", color: "black",
                                            fontSize: "12px", width: "10px", marginTop: "2px",
                                        }}
                                        variant="contained"
                                        onClick={handleLeftArrow}
                                        startIcon={<KeyboardArrowRightIcon />}
                                    ></Button>
                                    <Button
                                        sx={{
                                            backgroundColor: "lightgrey", padding: "0px", color: "black",
                                            width: "10px", marginTop: "2px", maxWidth: "10px"
                                        }}
                                        variant="contained"
                                        onClick={handleDoubleLeftArrow}
                                        startIcon={<KeyboardDoubleArrowRightIcon />}
                                    ></Button>
                                </Box>
                                : null}
                        </div> */}

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
                </Box>
            </div >
            <div>
                <Dialog
                    fullWidth={true}
                    maxWidth="xs"
                    open={openDialogSiD}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                    disableBackdropClick
                >
                    <DialogTitle sx={{ margin: "0px", padding: "15px 0px 0px 0px", }}></DialogTitle>
                    <DialogContent id="draggable-dialog-title" sx={{ fontSize: "16px", userSelect: 'text', padding: "0px 0px 0px 10px", }} >
                        {DialogDataSiD}
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 5px 0px 0px", width: "100px" }}
                            onClick={handleCloseDialog} autoFocus variant="contained" startIcon={<DoneAllIcon />}>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Box >
    )

}

export default SizeDetails;
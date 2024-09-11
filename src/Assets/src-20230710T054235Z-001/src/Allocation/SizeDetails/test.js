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
    postCOMMITDATARequest
} from "../../Redux/Action/createAllocation";



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
    { id: "SOURCE_ITEM", label: "Item", width: 100, maxWidth: 100 },
    { id: "SOURCE_ITEM_DESC", label: "Item Desc", width: 200, maxWidth: 200 },
    { id: "DIFF_ID", label: "Diff ID", width: 100, maxWidth: 100 },
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

const SizeDetails = () => {
    const [ItemDetailsData, setItemDetailsData] = useState([]);
    const [sizeDetailsData, setSizeDetailsData] = useState([]);
    const [sizeHeaderDetailsData, setSizeHeaderDetailsData] = useState([]);
    const [TableSizeHeaderDetailsData, setTableSizeHeaderDetailsData] = useState([]);

    const [sizeDetailsData1, setSizeDetailsData1] = useState([]);
    const [sizeTempCheck, setSizeTempCheck] = useState(false);
    const [sizeTempData, setSizeTempData] = useState([]);
    const [sizeTempDataTran_Item, setSizeTempDataTran_Item] = useState([]);
    const [allocDetails, setAllocDetails] = useState([]);
    const [sizeTempDataUpdate, setSizeTempDataUpdate] = useState([]);
    const [sizeTempDataUpdateCheck, setSizeTempDataUpdateCheck] = useState(false);

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

    const [sizeTempDataSample, setSizeTempDataSample] = useState([]);

    const [LoadCheck, setLoadCheck] = useState(false);

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
            dispatch(postSIZEHEADERDETAILSRequest([{ "ALLOC_NO": 3000, "COUNT": 1 }]));
            dispatch(getALLOCHEADDETAILSRequest([{ "ALLOC_NO": 3000 }]));
            check = true
            setSubmit(true)
        }
    }, [""]);

    var temp_arry = []
    var temp_dict = {}
    var count_list = []
    const [length_var, setlength_var] = useState(0)

    useEffect(() => {
        if (
            SizeDetailsData?.data?.sizeHeaderDetailsData
            && Array.isArray(SizeDetailsData?.data?.sizeHeaderDetailsData)
        ) {
            setSizeHeaderDetailsData([]);
            setTableSizeHeaderDetailsData([]);
            setSizeHeaderDetailsData(serializedata(SizeDetailsData?.data?.sizeHeaderDetailsData));
            setTableSizeHeaderDetailsData(serializedata(SizeDetailsData?.data?.sizeHeaderDetailsData));
            var check = false;
            if (SizeDetailsData?.data?.sizeHeaderDetailsData.length > 0) {
                if (isSubmit) {
                    dispatch(postSIZEDETAILSRequest([SizeDetailsData?.data?.sizeHeaderDetailsData[0]]));
                    setSubmit(false)
                } else {
                    setLoadCheck(false);
                }
            }
            setSizeTempDataUpdateCheck(true)
        }
        if (
            SizeDetailsData?.data?.sizeDetailsData
            && Array.isArray(SizeDetailsData?.data?.sizeDetailsData)
        ) {
            // setSizeDetailsData(serializedata(SizeDetailsData?.data?.sizeDetailsData));
            // let UniqsizeDetailsDataLOC =
            //     SizeDetailsData?.data?.sizeDetailsData.length > 0
            //         ? [...new Map(SizeDetailsData?.data?.sizeDetailsData.map((item) => [item["TO_LOC"], item])).values()]
            //         : [];
            // setSizeDetailsData1(serializedata(SizeDetailsData?.data?.sizeDetailsData));
            // setItemDetailsData(SizeDetailsData?.data?.sizeDetailsData[0]);
            setSizeTempCheck(true)
            setLoading(false);
            setLoadCheck(false);

            var temp = stableSort(SizeDetailsData?.data?.sizeDetailsData, getComparator("asc", "TRAN_ITEM"))
            setSizeDetailsData(serializedata(temp))
            setSizeDetailsData1(serializedata(temp))

            console.log("UniqsizeDetailsDataLOC: ", SizeDetailsData?.data?.sizeDetailsData);

            // if (SizeDetailsData?.data?.sizeDetailsData.length > 0) {
            //     setlength_var(0)
            //     SizeDetailsData?.data?.sizeDetailsData.map(
            //         obj => {
            //             if (Object.keys(temp_dict).length > 0) {
            //                 console.log("temp_Dict:2", temp_dict, obj.ITEM)
            //                 if (Object.keys(temp_dict).includes(obj.ITEM)) {
            //                     temp_dict[obj.ITEM] = temp_dict[obj.ITEM] + 1
            //                 }
            //                 else {
            //                     temp_dict[obj.ITEM] = 1
            //                 }
            //             }
            //             else {
            //                 temp_dict[obj.ITEM] = 1
            //             }
            //         }
            //     )
            //     Object.keys(temp_dict).map(item => count_list.push(temp_dict[item]))
            //     setlength_var(parseInt(Math.min(...count_list)))
            // }

            let UniqsizeDetailsDataTran_Item =
                temp.length > 0
                    ? [...new Map(temp.map((item) => [item["TRAN_ITEM"], item])).values()]
                    : [];
            var item_list = []
            UniqsizeDetailsDataTran_Item.map(item => item_list.push(item.TRAN_ITEM))
            console.log("UniqsizeDetailsDataTran_Item: ", UniqsizeDetailsDataTran_Item, item_list, temp);
            if (item_list.length > 4) {
                item_list = item_list.slice(0, 4)
                const temp1 = temp.filter(item => item_list.includes(item.TRAN_ITEM))
                setSizeTempData(temp1)
                let UniqsizeDetailsDataTran_Item_data =
                    temp1.length > 0
                        ? [...new Map(temp1.map((item) => [item["TRAN_ITEM"], item])).values()]
                        : [];
                setSizeTempDataTran_Item(UniqsizeDetailsDataTran_Item_data)
                console.log("UniqsizeDetailsDataTran_Item:1 ", UniqsizeDetailsDataTran_Item, item_list, temp1, UniqsizeDetailsDataTran_Item_data);
            } else {
                const temp1 = temp.filter(item => item_list.includes(item.TRAN_ITEM))
                setSizeTempData(temp1)
                let UniqsizeDetailsDataTran_Item_data =
                    temp1.length > 0
                        ? [...new Map(temp1.map((item) => [item["TRAN_ITEM"], item])).values()]
                        : [];
                setSizeTempDataTran_Item(UniqsizeDetailsDataTran_Item_data)
            }

            // if (SizeDetailsData?.data?.sizeDetailsData.length > 0) {
            //     // var temp_val = []
            //     // temp_val.push(SizeDetailsData?.data?.sizeDetailsData[0].SOURCE_ITEM)

            //     // const temp1 = SizeDetailsData?.data?.sizeDetailsData.filter(item => temp_val.includes(item.SOURCE_ITEM))
            //     // setSizeTempDataSr_no(serializedata(temp1))
            //     if (SizeDetailsData?.data?.sizeDetailsData.length > 4) {
            //         setSizeTempData(serializedata(SizeDetailsData?.data?.sizeDetailsData.slice(0, 4)))
            //     } else {
            //         setSizeTempData(serializedata(SizeDetailsData?.data?.sizeDetailsData))
            //     }
            // }

        }
        if (
            SizeDetailsData?.data?.allocDetails
            && Array.isArray(SizeDetailsData?.data?.allocDetails)
        ) {
            setAllocDetails(SizeDetailsData?.data?.allocDetails);
            setLoading(false);
        } else if (
            SizeDetailsData?.data?.sizeTempDataUpdate
        ) {
            setSizeTempDataUpdate(SizeDetailsData?.data?.sizeTempDataUpdate);
            dispatch(postSIZEHEADERDETAILSRequest([{ "ALLOC_NO": 3000, "COUNT": 2 }]));
            setSizeHeaderDetailsData([]);
            setTableSizeHeaderDetailsData([]);
            setLoadCheck(true);
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

    // if (sizeTempDataUpdateCheck && sizeTempDataUpdate.length > 0) {
    //     TableSizeHeaderDetailsData.map((row) => {
    //         if (row.SOURCE_ITEM === sizeTempDataUpdate[0].SOURCE_ITEM && row.WH_ID === sizeTempDataUpdate[0].WH_ID) {
    //             row["REMAIN_QTY"] = row.AVAIL_QTY - row.ALLOC_QTY
    //         }
    //     })
    //     setSizeHeaderDetailsData(TableSizeHeaderDetailsData);
    //     setSizeTempDataUpdate([])
    //     setSizeTempDataUpdateCheck(false)
    // }

    console.log("SizeDetailsData:6: ", sizeTempData);

    const SearchButtonHeaderDesc = () => (
        <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} >
            <InfoIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em', color: "CadetBlue" }}
                onClick={() => {
                    swal(
                        { text: allocDetails.length > 0 ? allocDetails[0].ALLOC_DESC : null }
                    )
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
                                width: "180px",
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
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Desc</InputLabel>
                    </div>
                    <div>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 2px", width: "180px"
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
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Context Type</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 2px", width: "180px"
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
                                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                                    Promotion</InputLabel>
                            </div>
                            <div className={AllocDetailsClasses.multiselectfield}>
                                <TextField
                                    size="small"
                                    sx={{
                                        margin: "0px 0px 2px 2px", width: "180px"
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
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Alloc Level</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 2px", width: "180px"
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
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Release Date</InputLabel>
                    </div>
                    <div>
                        <TextField
                            variant="outlined"
                            type="date"
                            size="small"
                            name="RELEASE_DATE"
                            format="yyyy/MM/dd"
                            //   inputProps={{ max: currentDate() }}
                            sx={{
                                margin: "0px 0px 2px 2px",
                                //  width: "180px", 
                                "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "5px",
                                    height: "15px",
                                }
                            }}
                            id="outlined-disabled"
                            disabled
                            inputProps={{
                                maxLength: 100, sx: { backgroundColor: '#fff' },
                            }}
                            label=""
                            value={allocDetails.length > 0 ? allocDetails[0].RELEASE_DATE : null}
                            defaultValue={allocDetails.length > 0 ? allocDetails[0].RELEASE_DATE : null}
                            InputProps={{
                                style: { fontSize: 12 },
                                shrink: true,
                                className: AllocDetailsClasses.input,
                            }}
                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Status</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 2px", width: "180px"
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
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Alloc Type</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 2px", width: "180px"
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
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Allocator</InputLabel>
                    </div>
                    <div>
                        <TextField
                            variant="outlined"
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 2px", width: "180px"
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

    let UniqsizeDetailsData =
        sizeDetailsData.length > 0
            ? [...new Map(sizeDetailsData.map((item) => [item["ITEM_PARENT"], item])).values()]
            : [];

    let UniqsizeDetailsDataITEM =
        sizeDetailsData.length > 0
            ? [...new Map(sizeDetailsData.map((item) => [item["TRAN_ITEM"], item])).values()]
            : [];

    let UniqsizeDetailsDataLOC =
        sizeDetailsData.length > 0
            ? [...new Map(sizeDetailsData1.map((item) => [item["TO_LOC"], item])).values()]
            : [];

    let UniqsizeDetailsDataTran_Item1 =
        sizeDetailsData.length > 0
            ? [...new Map(sizeDetailsData.map((item) => [item["TRAN_ITEM"], item])).values()]
            : [];

    console.log("UniqsizeDetailsDataTran_Item: UniqsizeDetailsDataLOC:", UniqsizeDetailsDataLOC);

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
                    'TO_LOC': "",
                    'LOCATION_GROUP_ID': "",
                    'LOCATION_GROUP_DESC': "",
                    'WH_ID': "",
                    'SOURCE_ITEM': "",
                    'DIFF_ID': "",
                    'SKU_CALC_QTY': "",
                    'TOTAL_SKU_CALC_QTY': "",
                    'OH_FF': "",
                    'NET_NEED': "",
                    'CALC_QTY': "",
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
        // console.log("inputValue::", Object.values(inputValue), Object.keys(inputValue).filter(data => inputValue[data].includes("&")))
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
        //console.log("sort:2112:", a, b, orderBy);
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
            //console.log("krishnasort123", c, d)
        }
        else {
            c = isNaN(b[orderBy]) ? b[orderBy] : parseInt(b[orderBy]);
            d = isNaN(a[orderBy]) ? a[orderBy] : parseInt(a[orderBy]);
        }
        //console.log("sort heck", typeof (c), d)
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

    // const [sortCheck1, setSortCheck1] = useState(false)
    // const [sortValue1, setSortValue1] = useState("")

    // useEffect(() => {
    //     console.log("handleRequestSort1:2 ", sortCheck1, sortValue1, order1);
    //     if (sortCheck1) {
    //         console.log("handleRequestSort1:3 ", sortCheck1, sortValue1, order1);
    //         if (order1 === "asc") {
    //             console.log("handleRequestSort1:4 ", sortCheck1, sortValue1, order1);
    //             const sortedData = stableSort(sizeDetailsData1, getComparator("asc", sortValue1));
    //             console.log("handleRequestSort1:6 ", sortedData);
    //             setSizeDetailsData1(sortedData);
    //         }
    //         if (order1 === "desc") {
    //             console.log("handleRequestSort1:5 ", sortCheck1, sortValue1, order1);
    //             const sortedData = stableSort(sizeDetailsData1, getComparator("desc", sortValue1));
    //             console.log("handleRequestSort1:7 ", sortedData);
    //             setSizeDetailsData1(sortedData);
    //         }
    //         setSortCheck1(false)
    //     }
    // }, [sizeDetailsData1, order, orderBy]);

    // console.log("handleRequestSort1: ", sortCheck1, sortValue1, sizeDetailsData1);

    const handleRequestSort1 = (event, property) => {
        // console.log("handleRequestSort1:7 ", event, property);
        // if (event) {
        //     setSortCheck1(true)
        //     setSortValue1(String(property))
        // }
        const isAsc = (orderBy1 === property && order1 === 'asc');
        setOrder1(isAsc ? 'desc' : 'asc');
        // console.log("handleRequestSort1:7 ", event, property,isAsc);
        setOrderBy1(property);
        if (isAsc) {
            const sortedData = stableSort(sizeDetailsData1, getComparator("desc", property));
            setSizeDetailsData1(sortedData);
            // setOrder1('asc')
        } else {
            const sortedData = stableSort(sizeDetailsData1, getComparator("asc", property));
            // console.log("handleRequestSort1:7 ", sortedData);
            setSizeDetailsData1(sortedData);
            // setOrder1('desc')
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

    const onTableChange = (e, value) => {

        var value1 = value.filter(item => item !== "")
        console.log("onTableChange: 2", e, value1, value, e.target.name, e.target.value);
        if (e.target.name === "CALC_QTY") {
            if (String(e.target.value).length > 0)
                sizeDetailsData1.map((row) => {
                    if (row.TRAN_ITEM === value1[0].TRAN_ITEM && row.TO_LOC === value1[0].TO_LOC && row.SOURCE_ITEM === value1[0].SOURCE_ITEM && row.WH_ID === value1[0].WH_ID) {
                        row["CALC_QTY"] = e.target.value
                    }
                })
            else {
                sizeDetailsData1.map((row) => {
                    if (row.TRAN_ITEM === value1[0].TRAN_ITEM && row.TO_LOC === value1[0].TO_LOC && row.SOURCE_ITEM === value1[0].SOURCE_ITEM && row.WH_ID === value1[0].WH_ID) {
                        row["CALC_QTY"] = ""
                    }
                })
            }
        }
        // let total_avail_qty = 0
        // sizeDetailsData1.map(obj => total_avail_qty = total_avail_qty + parseInt(String(obj.CALC_QTY).length > 0 ? obj.CALC_QTY : 0))
        // let head_total_avail_qty = 0
        // sizeHeaderDetailsData.map(obj => head_total_avail_qty = parseInt(String(obj.AVAIL_QTY).length > 0 ? obj.AVAIL_QTY : 0))
        // // if (head_total_avail_qty < total_avail_qty) {
        // //     sizeDetailsData1.map((row) => {
        // //         if (row.TRAN_ITEM === value1 && row.TO_LOC === value2 && row.SOURCE_ITEM === value3 && row.WH_ID === value4) {
        // //             row["CALC_QTY"] = ""
        // //         }
        // //     })
        // //     swal(
        // //         "Allocated units is greater than the remaining units."
        // //     )
        // // }
        // let total_avail_qty1 = 0
        // sizeDetailsData1.map(obj => total_avail_qty1 = total_avail_qty1 + parseInt(String(obj.CALC_QTY).length > 0 ? obj.CALC_QTY : 0))

        // let head_total_avail_qty1 = 0
        // sizeHeaderDetailsData.map(obj => head_total_avail_qty1 = parseInt(String(obj.AVAIL_QTY).length > 0 ? obj.AVAIL_QTY : 0))

        // sizeHeaderDetailsData.map((row) => {
        //     if (row.SOURCE_ITEM === value3 && row.WH_ID === value4) {
        //         row["ALLOC_QTY"] = total_avail_qty1
        //         row["REMAIN_QTY"] = head_total_avail_qty1 - total_avail_qty1
        //     }
        // })
        // const uniqSizeDetailsDataTranItem = [...new Map(sizeDetailsData1.map(item => [item.TRAN_ITEM, item])).values()];
        const uniqSizeTempDataTranItem = [...new Map(sizeTempData.map(item => [item.TRAN_ITEM, item])).values()];
        const itemList = uniqSizeTempDataTranItem.map(item => item.TRAN_ITEM);
        const temp1 = sizeDetailsData1.filter(item => itemList.includes(item.TRAN_ITEM))

        console.log("onTableChange: 3", sizeDetailsData1, temp1);
        setSizeDetailsData(sizeDetailsData1)
        setSizeDetailsData(sizeDetailsData1)
        setSizeTempData(temp1)
        setSampleVal([])
    };

    console.log("onTableChange: 1", sizeDetailsData1, sizeHeaderDetailsData, sizeTempData, selectedRow);

    // const SelectRowSize = (e, value) => {
    //     if (e) {
    //         setSizeTempData([])
    //         setSizeTempDataSr_no([])
    //     }
    //     sizeDetailsData1.map((row) => {
    //         if (Object.keys(row).includes("SR_NO")) {
    //             delete row["SR_NO"]
    //         }
    //     }
    //     )

    //     const temp1 = sizeDetailsData1.filter(item => value.includes(item.ITEM_PARENT))
    //     setSizeTempDataSr_no(serializedata(temp1))
    //     if (temp1.length > 4) {
    //         setSizeTempData(serializedata(temp1.slice(0, 4)))
    //     } else {
    //         setSizeTempData(serializedata(temp1))
    //     }
    // }
    const SelectRowSize = (e, value) => {
        if (e) {
            setSizeTempData([])
            // setSizeTempDataSr_no([])
        }
        dispatch(postSIZEDETAILSRequest([value]));
        setLoadCheck(true);
        setSelectedRow(value);
    }

    const handleBlur = (e, value) => {
        console.log("handleBlur: 1", e, value);
        if (value) {
            if (value[0].CALC_QTY === "") {
                value[0].CALC_QTY = "0"
                const itemList = value.map(item => item.TRAN_ITEM);
                const temp1 = sizeDetailsData1.filter(item => itemList.includes(item.TRAN_ITEM))

                console.log("handleBlur: 3", sizeDetailsData1, temp1, value);
                setSizeDetailsData(sizeDetailsData1)
                setSizeDetailsData(sizeDetailsData1)
                // setSizeTempData(temp1)
            }
        }
        dispatch(postSIZEUPDATEDETAILSRequest(value));
        setSizeTempDataSample(value);
        setSizeHeaderDetailsData([]);
        setTableSizeHeaderDetailsData([]);
        // Call your const function here
        // myConstFunction(value);
    };

    // const handleDoubleLeftArrow = (e) => {
    //     var Var1 = parseInt(sizeTempDataSr_no.length)
    //     if (Var1 > 4) {
    //         var Var3 = parseInt(sizeTempData.length)
    //         var Var2 = sizeTempData[sizeTempData.length - 1]
    //         const Var4 = sizeTempDataSr_no.filter(obj => obj.SR_NO === Var2.SR_NO + 1)
    //         let count_list = []
    //         count_list.push(Var4[0].SR_NO)
    //         for (let i = 0; i < 3; i++) {
    //             var Len_list = count_list[count_list.length - 1]
    //             count_list.push(Len_list + 1)
    //         }
    //         const Var5 = sizeTempDataSr_no.filter(obj => count_list.includes(obj.SR_NO))
    //         // let count_list1 = []
    //         // Var5.map(obj => count_list1.push(obj.SR_NO))
    //         if (Var5.length !== 4) {
    //             const lastFour = sizeTempDataSr_no.slice(-4)
    //             setSizeTempData(lastFour)
    //         }else{
    //             setSizeTempData(Var5)
    //         }
    //     }
    // }
    // const handleDoubleRightArrow = (e) => {
    //     var Var1 = parseInt(sizeTempDataSr_no.length)
    //     if (Var1 <= 4) {
    //         setSizeTempData(sizeTempDataSr_no);
    //         return;
    //     } if (Var1 > 4) {
    //         const Var2 = sizeTempData[0].SR_NO;
    //         const Var4 = sizeTempDataSr_no.filter(obj => obj.SR_NO === Var2 - 1);
    //         let count_list = [];
    //         count_list.push(Var4[0].SR_NO);
    //         for (let i = 0; i < 3; i++) {
    //             var Len_list = count_list[count_list.length - 1];
    //             if (Len_list > 1) {
    //                 count_list.push(Len_list - 1);
    //             }
    //         }
    //         const Var5 = sizeTempDataSr_no.filter(obj => count_list.includes(obj.SR_NO))
    //         if (Var5.length !== 4) {
    //             const firstFour = sizeTempDataSr_no.slice(0, 4);
    //             setSizeTempData(firstFour)
    //         } else {
    //             setSizeTempData(Var5)
    //         }
    //     }
    // }


    const handleDoubleRightArrow = (e) => {
        const uniqSizeDetailsDataTranItem = [...new Map(sizeDetailsData1.map(item => [item.TRAN_ITEM, item])).values()];
        const uniqSizeTempDataTranItem = [...new Map(sizeTempData.map(item => [item.TRAN_ITEM, item])).values()];
        const tranItemList = uniqSizeDetailsDataTranItem.map(item => item.TRAN_ITEM);
        const itemList = uniqSizeTempDataTranItem.map(item => item.TRAN_ITEM);
        const Var1 = itemList[0]
        const Var3 = tranItemList[0]

        let count_list = []
        var Var2 = parseInt(tranItemList.indexOf(Var1))
        for (let i = 0; i < 4; i++) {
            var Len_list = (Var2 - 1) - i
            if (Len_list >= 0) {
                count_list.push(tranItemList[Len_list]);
            }
        }
        if (Var1 !== Var3) {
            if (count_list.length !== 4) {
                var Var4 = tranItemList.slice(0, 4);
                const var5 = sizeDetailsData1.filter(obj => Var4.includes(obj.TRAN_ITEM));
                setSizeTempData(var5)
                const commonTranItem = [...new Map(var5.map(item => [item.TRAN_ITEM, item])).values()];
                setSizeTempDataTran_Item(commonTranItem);
            } else {
                const var5 = sizeDetailsData1.filter(obj => count_list.sort().includes(obj.TRAN_ITEM));
                setSizeTempData(var5)
                const commonTranItem = [...new Map(var5.map(item => [item.TRAN_ITEM, item])).values()];
                setSizeTempDataTran_Item(commonTranItem);
            }
        }
        // const Var1 = sizeDetailsData1.length;
        // if (Var1 <= 4) {
        //     setSizeTempData(sizeDetailsData1);
        //     return;
        // } else {
        //     const Var2 = sizeTempData[0].SR_NO;
        //     const Var4 = sizeDetailsData1.find(obj => obj.SR_NO === Var2 - 1);
        //     const count_list = [Var4.SR_NO];
        //     for (let i = 0; i < 3 && count_list[0] > 1; i++) {
        //         count_list.unshift(count_list[0] - 1);
        //     }
        //     const Var5 = sizeDetailsData1.filter(obj => count_list.includes(obj.SR_NO));
        //     setSizeTempData(Var5.length !== 4 ? sizeDetailsData1.slice(0, 4) : Var5);
        // }
    }

    const handleDoubleLeftArrow = (e) => {
        const uniqSizeDetailsDataTranItem = [...new Map(sizeDetailsData1.map(item => [item.TRAN_ITEM, item])).values()];
        const uniqSizeTempDataTranItem = [...new Map(sizeTempData.map(item => [item.TRAN_ITEM, item])).values()];
        const tranItemList = uniqSizeDetailsDataTranItem.map(item => item.TRAN_ITEM);
        const itemList = uniqSizeTempDataTranItem.map(item => item.TRAN_ITEM);
        const Var1 = itemList[parseInt(parseInt(itemList.length) - 1)]

        let count_list = []
        var Var2 = parseInt(tranItemList.indexOf(Var1) + 1)
        var Var6 = parseInt(tranItemList.length - 1)
        for (let i = 0; i < 4; i++) {
            var Len_list = Var2 + i
            if (Len_list <= Var6) { count_list.push(tranItemList[Len_list]); }
        }
        const Var3 = tranItemList[parseInt(parseInt(tranItemList.length) - 1)]
        if (Var3 !== Var1) {
            if (count_list.length !== 4) {
                var Var4 = tranItemList.slice(-4);
                const var5 = sizeDetailsData1.filter(obj => Var4.includes(obj.TRAN_ITEM));
                setSizeTempData(var5)
                const commonTranItem = [...new Map(var5.map(item => [item.TRAN_ITEM, item])).values()];
                setSizeTempDataTran_Item(commonTranItem);
            } else {
                const var5 = sizeDetailsData1.filter(obj => count_list.includes(obj.TRAN_ITEM));
                setSizeTempData(var5)
                const commonTranItem = [...new Map(var5.map(item => [item.TRAN_ITEM, item])).values()];
                setSizeTempDataTran_Item(commonTranItem);
            }
        }

        // console.log("handleDoubleLeftArrow: 1:", tranItemList, itemList, Var1, count_list, Var2);
        // const Var1 = sizeDetailsData1.length;
        // if (Var1 > 4) {
        //     const Var2 = sizeTempData[sizeTempData.length - 1];
        //     const Var3 = sizeDetailsData1.length;
        //     const Var4 = sizeDetailsData1.find(obj => obj.SR_NO === Var2.SR_NO + 1);
        //     const count_list = Array.from({ length: 4 }, (_, i) => Var4.SR_NO + i);
        //     const Var5 = sizeDetailsData1.filter(obj => count_list.includes(obj.SR_NO));
        //     setSizeTempData(Var5.length === 4 ? Var5 : sizeDetailsData1.slice(-4));
        // }
    }


    // const handleLeftArrow = (e) => {
    //     let UniqsizeDetailsDataTran_Item =
    //         sizeDetailsData1.length > 0
    //             ? [...new Map(sizeDetailsData1.map((item) => [item["TRAN_ITEM"], item])).values()]
    //             : [];

    //     let UniqsizeDetailsDataTran_Item1 =
    //         sizeTempData.length > 0
    //             ? [...new Map(sizeTempData.map((item) => [item["TRAN_ITEM"], item])).values()]
    //             : [];
    //     var tran_item_list = []
    //     UniqsizeDetailsDataTran_Item.map(item => tran_item_list.push(item.TRAN_ITEM))
    //     var Var1 = parseInt(UniqsizeDetailsDataTran_Item.length)
    //     if (Var1 > 4) {
    //         var item_list = []
    //         UniqsizeDetailsDataTran_Item1.map(item => item_list.push(item.TRAN_ITEM))
    //         var Var3 = parseInt(item_list.length)
    //         var Var2 = item_list[parseInt(Var3 - 1)]
    //         var Var4 = tran_item_list.indexOf(Var2)
    //         var Var5 = tran_item_list.length - 1
    //         if (Var5 > 4) {
    //             var Var6 = tran_item_list[parseInt(Var4 + 1)]
    //             var Var9 = tran_item_list.indexOf(Var6)
    //             if (Var5 !== Var9 - 1) {
    //                 const Var7 = sizeDetailsData1.filter(obj => Var6.includes(obj.TRAN_ITEM));
    //                 var Var8 = item_list.splice(0, 1)
    //                 const filteredArr = sizeTempData.filter((item) => item.TRAN_ITEM !== Var8[0]);
    //                 setSizeTempData([...filteredArr, ...Var7])
    //                 let CommonTran_Item = ([...filteredArr, ...Var7]).length > 0
    //                     ? [...new Map([...filteredArr, ...Var7].map((item) => [item["TRAN_ITEM"], item])).values()]
    //                     : [];
    //                 setSizeTempDataTran_Item(CommonTran_Item)
    //                 console.log("handleLeftArrow:1 ", Var6, Var7, Var8, filteredArr, [...filteredArr, ...Var7], CommonTran_Item, Var5, Var9);
    //             }

    //         }


    //         // console.log("handleLeftArrow: ", UniqsizeDetailsDataTran_Item, Var3, Var1, sizeTempData, Var2, UniqsizeDetailsDataTran_Item1, item_list, tran_item_list, Var4, Var5);
    //         // if (Var2.SR_NO !== Var1) {
    //         //     sizeTempData.splice(0, 1)
    //         //     const temp = [...sizeTempData, sizeDetailsData1[parseInt(sizeTempData[sizeTempData.length - 1].SR_NO)]]
    //         //     setSizeTempData(temp)
    //         // }
    //     }
    // }

    const handleLeftArrow = (e) => {
        const uniqSizeDetailsDataTranItem = [...new Map(sizeDetailsData1.map(item => [item.TRAN_ITEM, item])).values()];
        const uniqSizeTempDataTranItem = [...new Map(sizeTempData.map(item => [item.TRAN_ITEM, item])).values()];
        const tranItemList = uniqSizeDetailsDataTranItem.map(item => item.TRAN_ITEM);
        const var1 = uniqSizeDetailsDataTranItem.length;

        if (var1 > 4) {
            const itemList = uniqSizeTempDataTranItem.map(item => item.TRAN_ITEM);
            const var3 = itemList.length;
            const var2 = itemList[var3 - 1];
            const var4 = tranItemList.indexOf(var2);
            const var5 = tranItemList.length - 1;

            if (var5 > 4) {
                const var6 = tranItemList[var4 + 1];
                const var9 = tranItemList.indexOf(var6);

                if (var5 !== var9 - 1) {
                    const var7 = sizeDetailsData1.filter(obj => var6.includes(obj.TRAN_ITEM));
                    const var8 = itemList.splice(0, 1);
                    const filteredArr = sizeTempData.filter(item => item.TRAN_ITEM !== var8[0]);

                    setSizeTempData([...filteredArr, ...var7]);
                    const commonTranItem = [...new Map([...filteredArr, ...var7].map(item => [item.TRAN_ITEM, item])).values()];
                    setSizeTempDataTran_Item(commonTranItem);

                }
            }
        }
    };

    const handleRightArrow = (e) => {
        const uniqSizeDetailsDataTranItem = [...new Map(sizeDetailsData1.map(item => [item.TRAN_ITEM, item])).values()];
        const uniqSizeTempDataTranItem = [...new Map(sizeTempData.map(item => [item.TRAN_ITEM, item])).values()];
        const tranItemList = uniqSizeDetailsDataTranItem.map(item => item.TRAN_ITEM);
        const itemList = uniqSizeTempDataTranItem.map(item => item.TRAN_ITEM);

        const var1 = itemList.splice(0, 1);
        const var2 = tranItemList.indexOf(var1[0]);

        if (var2 > 0) {
            var Var3 = tranItemList[parseInt(var2 - 1)]
            const var4 = sizeDetailsData1.filter(obj => Var3.includes(obj.TRAN_ITEM));
            const Var5 = itemList[parseInt(parseInt(itemList.length) - 1)]
            const filteredArr = sizeTempData.filter(item => item.TRAN_ITEM !== Var5);
            setSizeTempData([...var4, ...filteredArr]);
            const commonTranItem = [...new Map([...var4, ...filteredArr].map(item => [item.TRAN_ITEM, item])).values()];
            setSizeTempDataTran_Item(commonTranItem);
        }
        // var Var3 = parseInt(sizeTempData.length)
        // if (parseInt(sizeTempData[0].SR_NO) !== 1) {
        //     sizeTempData.splice(Var3 - 1, 1)
        //     const temp = [...sizeDetailsData1.filter(obj => obj.SR_NO === (sizeTempData[0].SR_NO - 1)), ...sizeTempData]
        //     setSizeTempData(temp)
        // }
    }

    const handleOk = () => {
        dispatch(postCOMMITDATARequest([{}]));
        // setTab('1');
        // document.title = 'Create Allocation';
    }

    const handleCancel = () => {
        // setTab('1');
        // document.title = 'Create Allocation';
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
                                                                sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "center", }
                                                            }}
                                                            sx={{ width: "100%", }}
                                                            variant="standard"
                                                            inputProps={{
                                                                sx: {
                                                                    fontSize: 12, padding: "0px", height: "22px", textAlign: "center",
                                                                    "&::placeholder": { textAlign: "left" },
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
                                                            placeholder="Item"
                                                            autoComplete="off"
                                                            InputProps={{
                                                                sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "center", }
                                                            }}
                                                            sx={{ width: "100%", }}
                                                            variant="standard"
                                                            inputProps={{
                                                                sx: {
                                                                    fontSize: 12, padding: "0px", height: "22px", textAlign: "center",
                                                                    "&::placeholder": { textAlign: "left" },
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
                                                            placeholder="Item Desc"
                                                            autoComplete="off"
                                                            InputProps={{
                                                                sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "center", }
                                                            }}
                                                            sx={{ width: "100%", }}
                                                            variant="standard"
                                                            inputProps={{
                                                                sx: {
                                                                    fontSize: 12, padding: "0px", height: "22px", textAlign: "center",
                                                                    "&::placeholder": { textAlign: "left" },
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
                                                            placeholder="Diff ID"
                                                            autoComplete="off"
                                                            InputProps={{
                                                                sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "center", }
                                                            }}
                                                            sx={{ width: "100%", }}
                                                            variant="standard"
                                                            inputProps={{
                                                                sx: {
                                                                    fontSize: 12, padding: "0px", height: "22px", textAlign: "center",
                                                                    "&::placeholder": { textAlign: "left" },
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
                                                                sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "center", }
                                                            }}
                                                            sx={{ width: "100%", }}
                                                            variant="standard"
                                                            inputProps={{
                                                                sx: {
                                                                    fontSize: 12, padding: "0px", height: "22px", textAlign: "center",
                                                                    "&::placeholder": { textAlign: "left" },
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
                                                                sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "center", }
                                                            }}
                                                            sx={{ width: "100%", }}
                                                            variant="standard"
                                                            inputProps={{
                                                                sx: {
                                                                    fontSize: 12, padding: "0px", height: "22px", textAlign: "center",
                                                                    "&::placeholder": { textAlign: "left" },
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
                                                                sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "center", }
                                                            }}
                                                            sx={{ width: "100%", }}
                                                            variant="standard"
                                                            inputProps={{
                                                                sx: {
                                                                    fontSize: 12, padding: "0px", height: "22px", textAlign: "center",
                                                                    "&::placeholder": { textAlign: "left" },
                                                                },
                                                            }}
                                                        />
                                                    </TableCell>
                                                </TableBody>

                                                <TableBody
                                                >
                                                    {sizeHeaderDetailsData
                                                        .map((row, index) => {
                                                            return (
                                                                <TableRow
                                                                    hover
                                                                    role="checkbox"
                                                                    tabIndex={-1}
                                                                    onClick={(e) => SelectRowSize(e, row)}
                                                                    style={selectedRow === row.SR_NO ? { backgroundColor: "#bc8f8f" } : null}
                                                                >


                                                                    <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px", height: "22px" }}
                                                                    // onClick={(event) => showAvailDialog(event, row)}
                                                                    >
                                                                        {row.WH_ID}
                                                                    </TableCell>

                                                                    <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                                                        {row.SOURCE_ITEM}
                                                                    </TableCell>

                                                                    <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }} >
                                                                        <Box
                                                                            display="flex"
                                                                            justifyContent="space-around"
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
                                                                            >{String(row.SOURCE_ITEM_DESC).length > 0 && String(row.SOURCE_ITEM_DESC).length < 25 ?
                                                                                row.SOURCE_ITEM_DESC === "NULL" ? null : row.SOURCE_ITEM_DESC
                                                                                : String(row.SOURCE_ITEM_DESC).substring(0, 25) + ".."}
                                                                            </InputLabel>
                                                                            <Button sx={{
                                                                                backgroundColor: "", '&:hover': {
                                                                                    backgroundColor: "",
                                                                                }, border: 0, color: "CadetBlue", padding: "0px"
                                                                            }}
                                                                                style={{
                                                                                    maxWidth: '0px', minWidth: '4px', justifyContent: "flex-start", paddingLeft: "0px", paddingRight: "0px"
                                                                                }}
                                                                                size='small'
                                                                                className={AllocDetailsClasses.textField}
                                                                                onClick={() => {
                                                                                    swal(
                                                                                        <div>
                                                                                            <InputLabel
                                                                                                sx={{
                                                                                                    fontSize: "13px",
                                                                                                    fontFamily: "system-ui",
                                                                                                    color: "black",
                                                                                                }}
                                                                                            >
                                                                                                {row.SOURCE_ITEM_DESC}
                                                                                            </InputLabel>
                                                                                        </div>
                                                                                    )
                                                                                }}
                                                                                startIcon={<InfoIcon size="small" sx={{ padding: "0px" }} />}
                                                                            >
                                                                            </Button>
                                                                        </Box>
                                                                    </TableCell>

                                                                    <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                                                        {row.DIFF_ID}
                                                                    </TableCell>

                                                                    <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                                                        {row.AVAIL_QTY}
                                                                    </TableCell>

                                                                    <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                                                        {row.ALLOC_QTY}
                                                                    </TableCell>

                                                                    <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                                                        {row.REMAIN_QTY}
                                                                    </TableCell>

                                                                </TableRow >
                                                            );
                                                        })}

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
                                    <TableContainer component={Paper} style={{ maxHeight: 280, width: "calc(92vw - 0px)" }}>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead sx={{
                                                position: "sticky",
                                                top: -1,
                                            }}>
                                                <TableRow>
                                                    <TableCell colSpan={7} sx={{
                                                        backgroundColor: "white", height: "22px", border: 0
                                                    }}>
                                                    </TableCell>
                                                    {sizeTempDataTran_Item.length > 0 ? sizeTempDataTran_Item.map((headCell) => (
                                                        <StyledTableCell
                                                            key={headCell.TRAN_ITEM}
                                                            // className={AllocDetailsClasses.TableCell}
                                                            size="small"
                                                            colSpan={4}
                                                            // sortDirection={orderBy === headCell.id ? order : false}
                                                            style={{
                                                                whiteSpace: "nowrap", padding: "0px", margin: "0px", paddingLeft: "3px", color: "#fff",
                                                                height: "25px"
                                                            }}
                                                        >
                                                            {[headCell.TRAN_ITEM, " - ", headCell.DIFF_ID]}
                                                        </StyledTableCell>
                                                    )) : null}

                                                    {/* {UniqsizeDetailsDataITEM.length < 4 ? [...Array(4 - (UniqsizeDetailsDataITEM.length)).keys()].map((headCell) => {
                                                        console.log("StyledTableCell sizeTempData:1 ", sizeTempData, sizeTempData.length)
                                                        const cells = [
                                                            <StyledTableCell align="right" colSpan={4} sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, color: "#fff" }}
                                                                style={{
                                                                    whiteSpace: "nowrap", padding: "0px", margin: "0px", paddingLeft: "3px", color: "#fff"
                                                                }}
                                                                textAlign="right">ITEM</StyledTableCell>,
                                                        ]
                                                        return cells;
                                                    }
                                                    ) : null} */}
                                                </TableRow>

                                                <TableRow>
                                                    {SizeDistributionHeader.map((headCell, index) => (
                                                        <StyledTableCell key={index}
                                                            style={{
                                                                whiteSpace: "nowrap", padding: "0px", margin: "0px", paddingLeft: "3px", color: "#fff"
                                                            }}
                                                        >
                                                            {/* {headCell.label} */}
                                                            <TableSortLabel
                                                                active={orderBy1 === headCell.id}
                                                                direction={orderBy1 === headCell.id ? order1 : "asc"}
                                                                // onClick={createSortHandler1(headCell.id)}
                                                                // onRequestSort={handleRequestSort}
                                                                onClick={(e) => handleRequestSort1(e, headCell.id)}
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
                                                                {orderBy1 === headCell.id ? (
                                                                    <Box component="span" sx={visuallyHidden}>
                                                                        {order1 === "desc"
                                                                            ? "sorted descending"
                                                                            : "sorted ascending"}
                                                                    </Box>
                                                                ) : null}
                                                            </TableSortLabel>
                                                        </StyledTableCell>
                                                    ))}
                                                    {sizeTempDataTran_Item.length > 0 ? [...Array(sizeTempDataTran_Item.length).keys()].map((column) => (
                                                        SizeDistributionHeader1.map((headCell, index) => (
                                                            <StyledTableCell key={index}
                                                                style={{
                                                                    whiteSpace: "nowrap", padding: "0px", margin: "0px", paddingLeft: "3px", color: "#fff"
                                                                }}
                                                            >
                                                                {/* {column.label} */}
                                                                <TableSortLabel
                                                                    active={orderBy1 === headCell.id}
                                                                    direction={orderBy1 === headCell.id ? order1 : "asc"}
                                                                    // onRequestSort={handleRequestSort}
                                                                    // onClick={createSortHandler1(headCell.id)}
                                                                    onClick={(e) => handleRequestSort1(e, headCell.id)}
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
                                                                    {orderBy1 === headCell.id ? (
                                                                        <Box component="span" sx={visuallyHidden}>
                                                                            {order1 === "desc"
                                                                                ? "sorted descending"
                                                                                : "sorted ascending"}
                                                                        </Box>
                                                                    ) : null}
                                                                </TableSortLabel>
                                                            </StyledTableCell>
                                                        ))
                                                    )) : null}

                                                    {/* {sizeTempData.length < 4 ? [...Array(4 - (sizeTempData.length)).keys()].map((headCell) => {
                                                        const cells = [
                                                            <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}
                                                                style={{ whiteSpace: "nowrap", padding: "0px", margin: "0px", paddingLeft: "3px", color: "#fff" }} textAlign="right">
                                                                OH_FF</StyledTableCell>,
                                                            <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}
                                                                style={{ whiteSpace: "nowrap", padding: "0px", margin: "0px", paddingLeft: "3px", color: "#fff" }} textAlign="right">
                                                                NN</StyledTableCell>,
                                                            <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}
                                                                style={{ whiteSpace: "nowrap", padding: "0px", margin: "0px", paddingLeft: "3px", color: "#fff" }} textAlign="right">
                                                                REMAIN_QTY</StyledTableCell>,
                                                            <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}
                                                                style={{ whiteSpace: "nowrap", padding: "0px", margin: "0px", paddingLeft: "3px", color: "#fff" }} textAlign="right">
                                                                CALC_QTY</StyledTableCell>
                                                        ]
                                                        return cells;
                                                    }
                                                    ) : null} */}
                                                </TableRow>

                                                {/* <TableRow>
                                                    {SizeDistributionHeader.map((column, index) => (
                                                        <TableCell key={index} sx={{ padding: "0px", bgcolor: "#fff" }}>
                                                            <TextField
                                                                autoComplete="off"
                                                                placeholder={column.label}
                                                                InputProps={{
                                                                    style: { fontSize: 12, height: "20px" },
                                                                }}
                                                                sx={{
                                                                    width: "100%"
                                                                }}
                                                                variant="standard"
                                                                inputProps={{
                                                                    sx: { padding: "0px", height: "20px", textAlign: "center", bgcolor: "#fff" }
                                                                }}
                                                            />
                                                        </TableCell>
                                                    ))}
                                                    {sizeTempData.length > 0 ? [...Array((sizeTempData.length)).keys()].map((headCell) => (
                                                        SizeDistributionHeader1.map((column, index) => (
                                                            <TableCell key={index} sx={{ padding: "0px", bgcolor: "#fff" }}>
                                                                <TextField
                                                                    autoComplete="off"
                                                                    placeholder={column.label}
                                                                    InputProps={{
                                                                        style: { fontSize: 12, height: "20px" },
                                                                    }}
                                                                    sx={{
                                                                        width: "100%"
                                                                    }}
                                                                    variant="standard"
                                                                    inputProps={{
                                                                        sx: { padding: "0px", height: "20px", textAlign: "center", bgcolor: "#fff" }
                                                                    }}
                                                                />
                                                            </TableCell>
                                                        ))
                                                    )) : null}
                                                </TableRow> */}
                                            </TableHead>

                                            <TableBody>
                                                {UniqsizeDetailsDataLOC.length > 0 ? UniqsizeDetailsDataLOC.map((row) => {
                                                    return (
                                                        <TableRow key={row.ITEM}>
                                                            <TableCell sx={{
                                                                padding: "0px", textAlign: "left", fontSize: "12px",
                                                                height: "22px", margin: "0px",
                                                            }}>
                                                                {row.TO_LOC}
                                                            </TableCell>

                                                            <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                                                {row.LOCATION_GROUP_ID}
                                                            </TableCell>

                                                            <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }} >
                                                                <Box
                                                                    display="flex"
                                                                    justifyContent="space-around"
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
                                                                    >{UniqsizeDetailsDataITEM.length > 2 ?
                                                                        (String(row.LOCATION_GROUP_DESC).length > 0 && String(row.LOCATION_GROUP_DESC).length < 10 ?
                                                                            row.LOCATION_GROUP_DESC === "NULL" ? null : row.LOCATION_GROUP_DESC
                                                                            : String(row.LOCATION_GROUP_DESC).substring(0, 10) + "..") :
                                                                        (String(row.LOCATION_GROUP_DESC).length > 0 && String(row.LOCATION_GROUP_DESC).length < 20 ?
                                                                            row.LOCATION_GROUP_DESC === "NULL" ? null : row.LOCATION_GROUP_DESC
                                                                            : String(row.LOCATION_GROUP_DESC).substring(0, 20) + "..")}
                                                                    </InputLabel>
                                                                    <Button sx={{
                                                                        backgroundColor: "", '&:hover': {
                                                                            backgroundColor: "",
                                                                        }, border: 0, color: "CadetBlue", padding: "0px"
                                                                    }}
                                                                        style={{
                                                                            maxWidth: '0px', minWidth: '4px', justifyContent: "flex-start", paddingLeft: "0px", paddingRight: "0px"
                                                                        }}
                                                                        size='small'
                                                                        className={AllocDetailsClasses.textField}
                                                                        onClick={() => {
                                                                            swal(
                                                                                <div>
                                                                                    <InputLabel
                                                                                        sx={{
                                                                                            fontSize: "13px",
                                                                                            fontFamily: "system-ui",
                                                                                            color: "black",
                                                                                        }}
                                                                                    >
                                                                                        {row.LOCATION_GROUP_DESC}
                                                                                    </InputLabel>
                                                                                </div>
                                                                            )
                                                                        }}
                                                                        startIcon={<InfoIcon size="small" sx={{ padding: "0px" }} />}
                                                                    >
                                                                    </Button>
                                                                </Box>
                                                            </TableCell>

                                                            {/* <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }} >
                                                                {row.LOCATION_GROUP_DESC}
                                                            </TableCell> */}

                                                            <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                                                {row.WH_ID}
                                                            </TableCell>

                                                            <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                                                {row.SOURCE_ITEM}
                                                            </TableCell>


                                                            <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                                                {row.DIFF_ID}
                                                            </TableCell>

                                                            <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                                                {row.TOTAL_SKU_CALC_QTY}
                                                            </TableCell>

                                                            {sizeTempDataTran_Item.map((headcell) => {
                                                                const cells = [
                                                                    <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                                                        {sizeTempData.map(rowData => (row.SOURCE_ITEM === rowData.SOURCE_ITEM && row.TO_LOC === rowData.TO_LOC && headcell.TRAN_ITEM === rowData.TRAN_ITEM) ? rowData.OH_FF : null)}
                                                                    </TableCell>,

                                                                    <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                                                        {sizeTempData.map(rowData => (row.SOURCE_ITEM === rowData.SOURCE_ITEM && row.TO_LOC === rowData.TO_LOC && headcell.TRAN_ITEM === rowData.TRAN_ITEM) ? rowData.NET_NEED : null)}
                                                                    </TableCell>,

                                                                    <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                                                        {sizeTempData.map(rowData => (row.SOURCE_ITEM === rowData.SOURCE_ITEM && row.TO_LOC === rowData.TO_LOC && headcell.TRAN_ITEM === rowData.TRAN_ITEM) ? rowData.REMAIN_QTY : null)}
                                                                    </TableCell>,

                                                                    // <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                                                    //     {sizeTempData.map(rowData => (row.SOURCE_ITEM === rowData.SOURCE_ITEM && row.TO_LOC === rowData.TO_LOC && headcell.TRAN_ITEM === rowData.TRAN_ITEM) ? rowData.CALC_QTY : null)}
                                                                    // </TableCell>,

                                                                    <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px", maxWidth: "150px" }}>
                                                                        <TextField
                                                                            InputProps={{
                                                                                style: { fontSize: 12, height: "22px", padding: "0px", margin: "0px", width: "100px" },
                                                                            }}
                                                                            name="CALC_QTY"
                                                                            onChange={(e) => {
                                                                                onTableChange(e, sizeTempData.map(rowData =>
                                                                                    (row.SOURCE_ITEM === rowData.SOURCE_ITEM && row.TO_LOC === rowData.TO_LOC && headcell.TRAN_ITEM === rowData.TRAN_ITEM) ? rowData : "").filter(item => item !== ""))
                                                                            }
                                                                            }
                                                                            onBlur={(e) => handleBlur(e, sizeTempData.map(rowData =>
                                                                                (row.SOURCE_ITEM === rowData.SOURCE_ITEM && row.TO_LOC === rowData.TO_LOC && headcell.TRAN_ITEM === rowData.TRAN_ITEM) ? rowData : "").filter(item => item !== ""))}
                                                                            autoComplete="off"
                                                                            inputProps={{
                                                                                maxLength: 20,
                                                                                sx: { backgroundColor: '#fff', padding: "0px", height: "22px", textAlign: "center", width: "100px" }
                                                                            }}
                                                                            value={sizeTempData.map(rowData => (row.SOURCE_ITEM === rowData.SOURCE_ITEM && row.TO_LOC === rowData.TO_LOC && headcell.TRAN_ITEM === rowData.TRAN_ITEM) ?
                                                                                (
                                                                                    Array.isArray(rowData.CALC_QTY) && rowData.CALC_QTY.length > 0 ? rowData.CALC_QTY.filter(item => item !== null) : rowData.CALC_QTY
                                                                                ) : ""
                                                                            ).filter(item => item !== "")}
                                                                        />
                                                                    </TableCell>
                                                                ]
                                                                return cells;
                                                            })}


                                                            {/* {UniqsizeDetailsDataITEM.length < 4 ? [...Array(4 - (UniqsizeDetailsDataITEM.length)).keys()].map((rowData) => {
                                                                const cells = [
                                                                    // <React.Fragment key={index} >
                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>,
                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>,
                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>,
                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                                    // </React.Fragment>
                                                                ]
                                                                console.log("TableContainer: ", sizeTempData.length, rowData, row);
                                                                return cells;
                                                            }) : null} */}
                                                        </TableRow>
                                                    )
                                                })
                                                    : null}

                                                {UniqsizeDetailsDataLOC.length < 10 ?
                                                    [...Array(10 - (UniqsizeDetailsDataLOC.length)).keys()].map(val => (
                                                        <TableRow  >
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "20px" }}></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} ></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                            {/* {sizeTempData.length === 0 ? [...Array(4).keys()].map((headCell) => {
                                                                const cells = [
                                                                    // <React.Fragment key={index} >
                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>,
                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>,
                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>,
                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                                    // </React.Fragment>
                                                                ]
                                                                // console.log("TableContainer: ", sizeTempData.length - 1, cells);
                                                                return cells;
                                                            }) : [...Array(4).keys()].map((headCell) => {
                                                                const cells = [
                                                                    // <React.Fragment key={index} >
                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>,
                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>,
                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>,
                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                                    // </React.Fragment>
                                                                ]
                                                                // console.log("TableContainer:2 ", sizeTempData.length);
                                                                return cells;
                                                            })
                                                            } */}
                                                            {[...Array(sizeTempDataTran_Item.length).keys()].map((headCell) => {
                                                                const cells = [
                                                                    // <React.Fragment key={index} >
                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>,
                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>,
                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>,
                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                                    // </React.Fragment>
                                                                ]
                                                                // console.log("TableContainer: ", sizeTempData.length - 1, cells);
                                                                return cells;
                                                            })}
                                                        </TableRow >
                                                    )) : false}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Toolbar
                                        sx={{
                                            pl: { sm: 2 },
                                            pr: { xs: 1, sm: 1 },
                                            ...(UniqsizeDetailsDataLOC.length > 0 &&
                                            {
                                                minHeight: {
                                                    minHeight: "20px !important",
                                                },
                                                // border:"2px solid black", 
                                                bgcolor: (theme) =>
                                                    alpha(
                                                        theme.palette.primary.main,
                                                        theme.palette.action.activatedOpacity
                                                    ),
                                            }),
                                        }}
                                    >
                                        {UniqsizeDetailsDataLOC.length > 0 && (
                                            <Typography
                                                sx={{
                                                    flex: "1 1 100%", display: "flex",
                                                    justifyContent: "flex-end",
                                                    padding: "0px 20px 0px 0px"
                                                }}
                                                color="inherit"
                                                variant="subtitle1"
                                                component="div"
                                            >
                                                Rows: {UniqsizeDetailsDataLOC.length}
                                            </Typography>
                                        )}
                                    </Toolbar>
                                </div>
                            </div>
                        </Box>

                        <div>
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
                        </div>

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
        </Box >
    )

}

export default SizeDetails;
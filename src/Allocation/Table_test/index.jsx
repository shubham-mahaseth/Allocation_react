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
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Card, CardContent, ListItemIcon } from "@mui/material";
import { height } from "@mui/system";
import { BsFillEraserFill } from 'react-icons/bs';
import ClearIcon from '@mui/icons-material/Clear';
import PassAllocNoScreen from "../CreateScreen/index";
import InfoIcon from '@mui/icons-material/Info';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import CreateIcon from '@mui/icons-material/Create';
import { CSSTransition } from 'react-transition-group'
import "./ts.css"
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
const POPreview = [
    { id: "ITEM", label: "Item", width: "80px" },
    { id: "ITEM_DESC", label: "Item Desc", width: "150px" },
    { id: "ITEM_PARENT", label: "Item Parent", width: "80px" },
    { id: "DIFF_ID", label: "Diff ID", width: "80px" },
    { id: "LOCATION", label: "Location", width: "80px" },
    { id: "LOC_TYPE", label: "Loc Type", width: "80px" },
    { id: "PO_QTY", label: "PO Qty", width: "80px" },
    { id: "SUPPLIER", label: "Supplier", width: "80px" },
    { id: "ORIGIN_CTY", label: "Origin Cty", width: "80px" },
    { id: "PO_TYPE", label: "PO Type", width: "80px" },
    { id: "PO", label: "PO", width: "80px" },
    { id: "ERROR_MESSAGE", label: "Error Message", width: "150px" },
]
// const temp_data = [
//     {
//         ITEM: '1234501', ITEM_DESC: "Test Item-MEDIUM", ITEM_PARENT: '12345001', DIFF_ID: "BLUE", LOCATION: "1001",
//         LOC_TYPE: "W", PO_QTY: 18, SUPPLIER: 45000, ORIGIN_CTY: "CN", PO_TYPE: "Warehouse", PO: "91500", ERROR_MESSAGE: ""
//     },
// ]

const dump_data = [
    { ITEM: '1234501', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '12345001', DIFF_ID: 'BLUE', LOCATION: '1001', LOC_TYPE: 'W', PO_QTY: '18', SUPPLIER: '450001', ORIGIN_CTY: 'CN', PO_TYPE: 'Warehouse', PO: '91500', ERROR_MESSAGE: '' },
    { ITEM: '1234502', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '12345001', DIFF_ID: 'BLUE', LOCATION: '1001', LOC_TYPE: 'W', PO_QTY: '20', SUPPLIER: '450001', ORIGIN_CTY: 'CN', PO_TYPE: 'Warehouse', PO: '91500', ERROR_MESSAGE: '' },
    { ITEM: '1234503', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '12345001', DIFF_ID: 'BLUE', LOCATION: '1001', LOC_TYPE: 'W', PO_QTY: '22', SUPPLIER: '450001', ORIGIN_CTY: 'CN', PO_TYPE: 'Warehouse', PO: '91500', ERROR_MESSAGE: '' },
    { ITEM: '1234504', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '12345001', DIFF_ID: 'BLUE', LOCATION: '1001', LOC_TYPE: 'W', PO_QTY: '24', SUPPLIER: '450001', ORIGIN_CTY: 'CN', PO_TYPE: 'Warehouse', PO: '91500', ERROR_MESSAGE: '' },
    { ITEM: '1234505', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '12345001', DIFF_ID: 'BLUE', LOCATION: '1001', LOC_TYPE: 'W', PO_QTY: '26', SUPPLIER: '450001', ORIGIN_CTY: 'CN', PO_TYPE: 'Warehouse', PO: '91500', ERROR_MESSAGE: '' },
    { ITEM: '1234506', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '12345001', DIFF_ID: 'BLUE', LOCATION: '1001', LOC_TYPE: 'W', PO_QTY: '28', SUPPLIER: '450001', ORIGIN_CTY: 'CN', PO_TYPE: 'Warehouse', PO: '91500', ERROR_MESSAGE: '' },
    { ITEM: '1234507', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '12345001', DIFF_ID: 'BLUE', LOCATION: '1001', LOC_TYPE: 'W', PO_QTY: '30', SUPPLIER: '450001', ORIGIN_CTY: 'CN', PO_TYPE: 'Warehouse', PO: '91500', ERROR_MESSAGE: '' },
    { ITEM: '1234508', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '12345001', DIFF_ID: 'BLUE', LOCATION: '1001', LOC_TYPE: 'W', PO_QTY: '32', SUPPLIER: '450001', ORIGIN_CTY: 'CN', PO_TYPE: 'Warehouse', PO: '91500', ERROR_MESSAGE: '' },
    { ITEM: '1234509', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '12345001', DIFF_ID: 'BLUE', LOCATION: '1001', LOC_TYPE: 'W', PO_QTY: '34', SUPPLIER: '450001', ORIGIN_CTY: 'CN', PO_TYPE: 'Warehouse', PO: '91500', ERROR_MESSAGE: '' },
    { ITEM: '2222201', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '22222001', DIFF_ID: 'BLACK', LOCATION: '2001', LOC_TYPE: 'W', PO_QTY: '36', SUPPLIER: '540001', ORIGIN_CTY: 'US', PO_TYPE: 'Warehouse', PO: '15000', ERROR_MESSAGE: '' },
    { ITEM: '2222202', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '22222001', DIFF_ID: 'BLACK', LOCATION: '2001', LOC_TYPE: 'W', PO_QTY: '38', SUPPLIER: '540001', ORIGIN_CTY: 'US', PO_TYPE: 'Warehouse', PO: '15000', ERROR_MESSAGE: '' },
    { ITEM: '2222203', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '22222001', DIFF_ID: 'BLACK', LOCATION: '2001', LOC_TYPE: 'W', PO_QTY: '40', SUPPLIER: '540001', ORIGIN_CTY: 'US', PO_TYPE: 'Warehouse', PO: '15000', ERROR_MESSAGE: '' },
    { ITEM: '2222204', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '22222001', DIFF_ID: 'BLACK', LOCATION: '2001', LOC_TYPE: 'W', PO_QTY: '42', SUPPLIER: '540001', ORIGIN_CTY: 'US', PO_TYPE: 'Warehouse', PO: '15000', ERROR_MESSAGE: '' },
    { ITEM: '2222205', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '22222001', DIFF_ID: 'BLACK', LOCATION: '2001', LOC_TYPE: 'W', PO_QTY: '44', SUPPLIER: '540001', ORIGIN_CTY: 'US', PO_TYPE: 'Warehouse', PO: '15000', ERROR_MESSAGE: '' },
    { ITEM: '2222206', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '22222001', DIFF_ID: 'BLACK', LOCATION: '2001', LOC_TYPE: 'W', PO_QTY: '46', SUPPLIER: '540001', ORIGIN_CTY: 'US', PO_TYPE: 'Warehouse', PO: '15000', ERROR_MESSAGE: '' },
    { ITEM: '3333301', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '33333001', DIFF_ID: 'RED', LOCATION: '3001', LOC_TYPE: 'W', PO_QTY: '48', SUPPLIER: '650231', ORIGIN_CTY: 'BN', PO_TYPE: 'Warehouse', PO: '35000', ERROR_MESSAGE: '' },
    { ITEM: '3333302', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '33333001', DIFF_ID: 'RED', LOCATION: '3001', LOC_TYPE: 'W', PO_QTY: '50', SUPPLIER: '650231', ORIGIN_CTY: 'BN', PO_TYPE: 'Warehouse', PO: '35000', ERROR_MESSAGE: '' },
    { ITEM: '3333303', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '33333001', DIFF_ID: 'RED', LOCATION: '3001', LOC_TYPE: 'W', PO_QTY: '52', SUPPLIER: '650231', ORIGIN_CTY: 'BN', PO_TYPE: 'Warehouse', PO: '35000', ERROR_MESSAGE: '' },
    { ITEM: '3333304', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '33333001', DIFF_ID: 'RED', LOCATION: '3001', LOC_TYPE: 'W', PO_QTY: '54', SUPPLIER: '650231', ORIGIN_CTY: 'BN', PO_TYPE: 'Warehouse', PO: '35000', ERROR_MESSAGE: '' },
    { ITEM: '3333305', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '33333001', DIFF_ID: 'RED', LOCATION: '3001', LOC_TYPE: 'W', PO_QTY: '56', SUPPLIER: '650231', ORIGIN_CTY: 'BN', PO_TYPE: 'Warehouse', PO: '35000', ERROR_MESSAGE: '' },
]

const TestTab = () => {
    const [WhatIFPOdata, setWhatIFPOdata] = useState(dump_data);
    const [tableData, setTableData] = useState(dump_data);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');

    const [inputValue, setInputValue] = useState([]);
    const [sampleVal, setSampleVal] = useState([]);

    const WhatIFPOStyle = useStyles();

    const SearchButtonTrend = (input) => (

        <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} >
            <InfoIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em', color: "CadetBlue" }}
                onClick={() => {
                    swal(
                        //console.log("what if po",input)
                        input[(Object.keys(input))[0]]
                    )
                }}
            />
        </IconButton>
    )
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.root}`]: {
            height: "28px",
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

    const SearchHeader = () => (
        <Box
            component="fieldset"
            display="flex"
            sx={{
                backgroundColor: "red",
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

            <legend style={{ fontWeight: "bold", color: "#191970" }}>Header</legend>

            <div className={WhatIFPOStyle.header_container}>
                <div className={WhatIFPOStyle.header_child}>
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
                                },
                                input: {
                                    "&::placeholder": {
                                        opacity: 1,
                                    },
                                }
                            }}
                            value="1607"
                            id="outlined-disabled"
                            name="ALLOC_NO"
                            placeholder="ALLOC_NO"
                            inputProps={{
                                maxLength: 100, sx: { backgroundColor: '#fff' }
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: WhatIFPOStyle.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={WhatIFPOStyle.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Desc</InputLabel>
                    </div>
                    <div>
                        <TextField
                            size="small"
                            value="Allocation_test4"
                            sx={{
                                margin: "0px 0px 2px 2px", width: "180px"
                                , "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "5px",
                                    height: "14px",
                                    // padding:"0px"
                                },
                                // input: {
                                //     "&::placeholder": {
                                //         opacity: 1,
                                //     },
                                // },
                                borderRadius: "5px",
                                boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                            }}
                            id="outlined-disabled"
                            name="ALLOC_DESC"
                            placeholder="ALLOC_DESC"
                            //   value={searchHeaderData.ALLOC_DESC}
                            // value={allocDetails[0].ALLOC_DESC}
                            // defaultValue={allocDetails[0].ALLOC_DESC}
                            // InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                            // inputProps={{
                            //     maxLength: 100, sx: { backgroundColor: '#fff' },
                            // }}
                            InputProps={{
                                endAdornment: <SearchButtonTrend desc="DESC" />,
                                style: {
                                    fontSize: 12, backgroundColor: "white",//backgroundColor: "#f0f0f0",
                                },
                                className: WhatIFPOStyle.input,
                            }}

                        //disabled
                        />
                    </div>
                </div>
                <div className={WhatIFPOStyle.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Context Type</InputLabel>
                    </div>
                    <div className={WhatIFPOStyle.multiselectfield}>
                        <TextField
                            size="small"
                            value="Sales"
                            sx={{
                                margin: "0px 0px 2px 2px", width: "180px"
                                , "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "5px",
                                    height: "15px",
                                },
                                input: {
                                    "&::placeholder": {
                                        opacity: 1,
                                    },
                                }
                            }}
                            id="outlined-disabled"
                            name="CONTEXT_TYPE"
                            placeholder="CONTEXT_TYPE"
                            // value={allocDetails[0].CONTEXT}
                            // defaultValue={allocDetails[0].CONTEXT}
                            inputProps={{
                                maxLength: 100, sx: { backgroundColor: '#fff' },
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: WhatIFPOStyle.input,
                            }}
                        //disabled
                        />
                    </div>
                </div>

                <div className={WhatIFPOStyle.header_child}>
                    <div >
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Alloc Level</InputLabel>
                    </div>
                    <div className={WhatIFPOStyle.multiselectfield}>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 2px", width: "180px"
                                , "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "5px",
                                    height: "15px",
                                },
                                input: {
                                    "&::placeholder": {
                                        opacity: 1,
                                    },
                                }
                            }}
                            value="Style Diff"
                            id="outlined-disabled"
                            name="ALLOC_LEVEL"
                            placeholder="ALLOC_LEVEL"
                            // value={allocDetails[0].ALLOC_LEVEL}
                            // defaultValue={allocDetails[0].ALLOC_LEVEL}
                            inputProps={{
                                maxLength: 100, sx: { backgroundColor: '#fff' },
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: WhatIFPOStyle.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={WhatIFPOStyle.header_child}>
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
                            value="2023-02-22"
                            format="yyyy/MM/dd"
                            //   inputProps={{ max: currentDate() }}
                            sx={{
                                margin: "0px 0px 2px 2px",
                                //  width: "180px",
                                "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "5px",
                                    height: "15px",
                                },
                                input: {
                                    "&::placeholder": {
                                        opacity: 1,
                                    },
                                }
                            }}
                            id="outlined-disabled"
                            // disabled
                            label=""
                            // value={allocDetails[0].RELEASE_DATE}
                            // defaultValue={allocDetails[0].RELEASE_DATE}
                            InputProps={{
                                style: { fontSize: 12 },
                                shrink: true,
                                className: WhatIFPOStyle.input,
                            }}
                            inputProps={{ sx: { backgroundColor: '#fff' } }}
                        />
                    </div>
                </div>

                <div className={WhatIFPOStyle.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Status</InputLabel>
                    </div>
                    <div className={WhatIFPOStyle.multiselectfield}>
                        <TextField
                            size="small"
                            value="PO Create"
                            sx={{
                                margin: "0px 0px 2px 2px", width: "180px"
                                , "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "5px",
                                    height: "15px",
                                },
                                input: {
                                    "&::placeholder": {
                                        opacity: 1,
                                    },
                                }
                            }}
                            placeholder="STATUS"
                            name="STATUS"
                            // value={allocDetails[0].STATUS}
                            // defaultValue={allocDetails[0].STATUS}
                            id="outlined-disabled"
                            InputProps={{
                                style: { fontSize: 12, },
                                className: WhatIFPOStyle.input,
                            }}
                            inputProps={{ sx: { backgroundColor: '#fff' } }}
                            disabled
                        />
                    </div>
                </div>


                <div className={WhatIFPOStyle.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Allocator</InputLabel>
                    </div>
                    <div>
                        <TextField
                            variant="outlined"
                            size="small"
                            value="Admin"
                            sx={{
                                margin: "0px 0px 2px 2px", width: "180px"
                                , "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "5px",
                                    height: "15px",
                                },
                                input: {
                                    "&::placeholder": {
                                        opacity: 1,
                                    },
                                }
                            }}
                            placeholder="CREATE_ID"
                            name="CREATE_ID"
                            id="outlined-disabled"
                            // value={allocDetails[0].ALLOCATOR}
                            // defaultValue={allocDetails[0].ALLOCATOR}
                            inputProps={{ sx: { backgroundColor: '#fff' } }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: WhatIFPOStyle.input,
                            }}
                            disabled
                        />
                    </div>
                </div>
                {/* {allocDetails[0].CONTEXT === "Promotion" ?
                    [ */}
                {/* <div className={WhatIFPOStyle.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Promotion</InputLabel>
                    </div>
                    <div className={WhatIFPOStyle.multiselectfield}>

                        <TextField
                            size="small"

                            sx={{
                                margin: "0px 0px 2px 2px", width: "180px"
                                , "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "5px",
                                    height: "13px",
                                },
                                input: {
                                    "&::placeholder": {
                                        opacity: 1,
                                    },
                                },
                                borderRadius: "5px",
                                boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                            }}
                            id="outlined-disabled"
                            name="PROMOTION"
                            placeholder="PROMOTION"
                            //   value={searchHeaderData.ALLOC_DESC}
                            // value={allocDetails[0].ALLOC_DESC}
                            // defaultValue={allocDetails[0].ALLOC_DESC}
                            InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                            inputProps={{
                                maxLength: 100, sx: { backgroundColor: '#fff' },
                            }}
                            InputProps={{
                                endAdornment: <SearchButtonTrend Promo="PROMOTION" />,
                                style: { fontSize: 12, backgroundColor: "#f0f0f0", },
                                className: WhatIFPOStyle.input,
                            }}

                            disabled
                        />
                    </div>
                </div> */}
                {/* ] : null} */}
            </div>
        </Box>
    )


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
                    const temp = tableData.filter((props) => String(props[Object.keys(inputValue)[i]]).toLowerCase() === String(temp_dict[Object.keys(inputValue)[i]]).toLowerCase())
                    setWhatIFPOdata(temp);
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
                    setWhatIFPOdata(filteredTable);
                }
            }
        }
        if (Object.keys(inputValue).length === 0) {
            setWhatIFPOdata(tableData)
        }

    }, [inputValue]);

    function POPreviewTableHead(props) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <>
                <TableHead
                    className={WhatIFPOStyle.TitleHead}
                // sx={{ position: "sticky", top: 0, zIndex: "1" }}
                >
                    <TableRow className={WhatIFPOStyle.TitleRow}
                    // sx={{ border: "1px solid red" }}

                    >
                        {POPreview.map((headCell) => (
                            <StyledTableCell
                                key={headCell.id}
                                // className={WhatIFPOStyle.TableCell}
                                size="small"
                                sortDirection={orderBy === headCell.id ? order : false}
                                style={{
                                    whiteSpace: "nowrap", paddingLeft: "3px",
                                    width: headCell.width
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
                                        }, width: headCell.width,
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

    POPreviewTableHead.propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };

    function POPreviewTableHeadToolbar(props) {
        const { numSelected } = props;
        return (
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(WhatIFPOdata.length > 0 &&
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
                {WhatIFPOdata.length > 0 && (
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
                        Rows: {WhatIFPOdata.length}
                    </Typography>
                )}
            </Toolbar>
        );
    }

    function descendingComparator(a, b, orderBy) {
        let c, d;
        if (orderBy == "ITEM_DESC" || orderBy == "DIFF_ID"
            || orderBy == "ORIGIN_CTY" || orderBy == "ERROR_MESSAGE"
            || orderBy == "PO_TYPE") {
            c = String(b[orderBy]);
            d = String(a[orderBy]);
        }
        else if (orderBy == "ITEM_PARENT" || orderBy == "ITEM" ||
            orderBy == "LOC_TYPE" || orderBy == "LOCATION" ||
            orderBy == "PO_QTY" ||
            orderBy == "SUPPLIER" || orderBy == "PO"
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
        // console.log("sort heck",typeof(c),d)
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
    const [sortValue, setSortValue] = useState("")

    useEffect(() => {
        if (sortCheck) {
            if (order === "asc") {
                const sortedData = stableSort(WhatIFPOdata, getComparator("asc", sortValue));
                setWhatIFPOdata(sortedData);
            }
            if (order === "desc") {
                const sortedData = stableSort(WhatIFPOdata, getComparator("desc", sortValue));
                setWhatIFPOdata(sortedData);
            }
            setSortCheck(false)
        }
    }, [WhatIFPOdata, order, orderBy]);

    const handleRequestSort = (event, property) => {
        if (event) {
            setSortCheck(true)
            setSortValue(String(property))
        }
        const isAsc = (orderBy === property && order === 'asc');
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
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
    // Define your tab content components
    const TabContent1 = () => <div>Tab 1 content</div>;
    const TabContent2 = () => <div>Tab 2 content</div>;
    const TabContent3 = () => <div>Tab 3 content</div>;

    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <Box className={WhatIFPOStyle.maindiv} sx={{ width: "100%" }}>
            <div >
                {SearchHeader()}
            </div>
            <div>
                <div className="tab-header">

                    <div
                        className={`tab ${activeTab === 1 ? 'active' : ''}`}
                        onClick={() => handleTabClick(1)}
                    >
                        Tab 1
                    </div>
                    <div
                        className={`tab ${activeTab === 2 ? 'active' : ''}`}
                        onClick={() => handleTabClick(2)}
                    >
                        Tab 2
                    </div>
                    <div
                        className={`tab ${activeTab === 3 ? 'active' : ''}`}
                        onClick={() => handleTabClick(3)}
                    >
                        Tab 3
                    </div>
                </div>
                <div className="tab-content">
                    <CSSTransition
                        in={activeTab === 1}
                        timeout={300}
                        classNames="fade"
                        unmountOnExit
                    >
                        <TabContent1 />
                    </CSSTransition>
                    <CSSTransition
                        in={activeTab === 2}
                        timeout={300}
                        classNames="fade"
                        unmountOnExit
                    >
                        <TabContent2 />
                    </CSSTransition>
                    <CSSTransition
                        in={activeTab === 3}
                        timeout={300}
                        classNames="fade"
                        unmountOnExit
                    >
                        <TabContent3 />
                    </CSSTransition>
                </div>
            </div>
        </Box>
    )

};

export default TestTab;
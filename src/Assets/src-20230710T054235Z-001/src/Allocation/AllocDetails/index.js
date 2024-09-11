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
import { ItemWHDetailsHeader } from "./tableHead";
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
    }

});

const ItemDetailsHeader = [
    { id: "ITEM_ID", label: "Item" },
    { id: "ITEM_DESC", label: "Item Desc" },
    { id: "DIFF_ID", label: "Diff ID" },
    { id: "GROSS_NEED", label: "Gross Need" },
    { id: "OH", label: "OH" },
    { id: "FUTURE_FULFILL", label: "Future Fulfill" },
    { id: "NET_NEED", label: "Net Need" },
    { id: "CALC_QTY", label: "Calc Qty" },
    { id: "AVAIL_QTY", label: "Avail Qty" },
    { id: "ALLOC_QTY", label: "Alloc Qty" },
    { id: "REMAIN_QTY", label: "Remain Qty" },
]

// const ItemWHDetailsHeader = [
//     { id: "WH", label: "WH" },
//     { id: "ITEM_ID", label: "Item" },
//     { id: "ITEM_DESC", label: "Item Desc" },
//     { id: "DIFF_ID", label: "Diff ID" },
//     { id: "GROSS_NEED", label: "Gross Need" },
//     { id: "OH", label: "OH" },
//     { id: "FUTURE_FULFILL", label: "Future Fulfill" },
//     { id: "NET_NEED", label: "Net Need" },
//     { id: "CALC_QTY", label: "Calc Qty" },
//     { id: "AVAIL_QTY", label: "Avail Qty" },
//     { id: "ALLOC_QTY", label: "Alloc Qty" },
//     { id: "REMAIN_QTY", label: "Remain Qty" },
//     { id: "SPREAD_QTY", label: "Spread Qty" },
// ]

const LocGroupItemDetailsHeader = [
    { id: "LOC", label: "Loc" },
    { id: "LOC_LIST", label: "Loc List" },
    { id: "LOC_TRAIT", label: "Loc Trait" },
    { id: "DEF_WH", label: "Def WH" },
    { id: "ITEM_ID", label: "Item" },
    { id: "ITEM_DESC", label: "Item Desc" },
    { id: "DIFF_ID", label: "Diff ID" },
    { id: "SOM", label: "SOM" },
    { id: "GROSS_NEED", label: "Gross Need" },
    { id: "OH", label: "OH" },
    { id: "FUTURE_FULFILL", label: "Future Fulfill" },
    { id: "NET_NEED", label: "Net Need" },
    { id: "CALC_QTY", label: "Calc Qty" },
    { id: "ALLOC_QTY", label: "Alloc Qty" },
    { id: "VARIANCE", label: "Variance" },
]

const AllocDetails = () => {

    const [ItemDetailsData, setItemDetailsData] = useState([]);
    const [ItemWHDetailsData, setItemWHDetailsData] = useState([]);
    const [LocGroupItemDetailsData, setLocGroupItemDetailsData] = useState([]);

    const AllocDetailsClasses = useStyles();

    useEffect(() => {
        document.title = 'Alloc Details';
    }, []);

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

            <legend style={{ fontWeight: "bold",color:"#191970" }}>Header</legend>

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
                                },
                                input: {
                                    "&::placeholder": {
                                        opacity: 1,
                                    },
                                }
                            }}
                            id="outlined-disabled"
                            name="ALLOC_NO"
                            placeholder="ALLOC_NO"
                            //   value={searchHeaderData.ALLOC_DESC}
                            // value={allocDetails.length > 0 ? allocDetails[0].ALLOC_NO : null}
                            // defaultValue={allocDetails.length > 0 ? allocDetails[0].ALLOC_NO : null}
                            inputProps={{
                                maxLength: 100, sx: { backgroundColor: '#fff' }
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
                                    height: "15px",
                                },
                                input: {
                                    "&::placeholder": {
                                        opacity: 1,
                                    },
                                }
                            }}
                            id="outlined-disabled"
                            name="ALLOC_DESC"
                            placeholder="ALLOC_DESC"
                            //   value={searchHeaderData.ALLOC_DESC}
                            // value={allocDetails[0].ALLOC_DESC}
                            // defaultValue={allocDetails[0].ALLOC_DESC}
                            inputProps={{
                                maxLength: 100, sx: { backgroundColor: '#fff' },
                            }}
                            InputProps={{
                                // endAdornment: <SearchButtonHeaderDesc />,
                                style: { fontSize: 12, backgroundColor: "#f0f0f0", },
                                className: AllocDetailsClasses.input,
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
                                className: AllocDetailsClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                {/* {allocDetails[0].CONTEXT === "Promotion" ?
                    [ */}
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
                                },
                                input: {
                                    "&::placeholder": {
                                        opacity: 1,
                                    },
                                }
                            }}
                            id="outlined-disabled"
                            name="PROMOTION"
                            placeholder="PROMOTION"
                            // value={allocDetails[0].PROMOTION}
                            // defaultValue={allocDetails[0].PROMOTION}
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
                {/* ] : null} */}


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
                                },
                                input: {
                                    "&::placeholder": {
                                        opacity: 1,
                                    },
                                }
                            }}
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
                                },
                                input: {
                                    "&::placeholder": {
                                        opacity: 1,
                                    },
                                }
                            }}
                            id="outlined-disabled"
                            disabled
                            label=""
                            // value={allocDetails[0].RELEASE_DATE}
                            // defaultValue={allocDetails[0].RELEASE_DATE}
                            InputProps={{
                                style: { fontSize: 12 },
                                shrink: true,
                                className: AllocDetailsClasses.input,
                            }}
                            inputProps={{ sx: { backgroundColor: '#fff' } }}
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
                                className: AllocDetailsClasses.input,
                            }}
                            inputProps={{ sx: { backgroundColor: '#fff' } }}
                            disabled
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
                                },
                                input: {
                                    "&::placeholder": {
                                        opacity: 1,
                                    },
                                }
                            }}
                            id="outlined-disabled"
                            name="ALLOC_TYPE"
                            placeholder="ALLOC_TYPE"
                            // value={allocDetails[0].ALLOC_TYPE}
                            // defaultValue={allocDetails[0].ALLOC_TYPE}
                            inputProps={{
                                maxLength: 100, sx: { backgroundColor: '#fff' },
                            }}
                            InputProps={{
                                style: { fontSize: 12, },
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
                                className: AllocDetailsClasses.input,
                            }}
                            disabled
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
                <TableHead className={AllocDetailsClasses.TitleHead}
                    sx={{ position: "sticky", top: -1, }}
                >
                    <TableRow className={AllocDetailsClasses.TitleRow}
                        sx={{ border: "1px solid red" }}>

                        {ItemDetailsHeader.map((headCell) => (
                            <StyledTableCell
                                key={headCell.id}
                                // className={AllocDetailsClasses.TableCell}
                                size="small"
                                sortDirection={orderBy === headCell.id ? order : false}
                                style={{
                                    whiteSpace: "nowrap", paddingLeft: "3px",
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

    function ItemWHDetailsTableHead(props) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <>
                <TableHead className={AllocDetailsClasses.TitleHead}
                    sx={{ position: "sticky", top: -1, }}
                >
                    <TableRow className={AllocDetailsClasses.TitleRow}>
                        {/* <StyledTableCell padding="checkbox" style={{
                            whiteSpace: "nowrap", padding: "0px",
                        }}
                        >
                            <Checkbox
                                color="primary"
                                size="small"
                                // indeterminate={selected.length > 0 && selected.length < qtyLimitsData.length}
                                // checked={qtyLimitsData.length > 0 && selected.length === qtyLimitsData.length}
                                // onChange={onSelectAllClick}
                                inputProps={{
                                    'aria-label': 'select all data',
                                }}
                                style={{
                                    color: "#fff",
                                    padding: "3px",
                                    // border: "1px solid black"
                                }}
                            />
                        </StyledTableCell> */}


                        {ItemWHDetailsHeader.map((headCell) => (
                            <StyledTableCell
                                key={headCell.id}
                                // className={AllocDetailsClasses.TableCell}
                                size="small"
                                sortDirection={orderBy === headCell.id ? order : false}
                                style={{
                                    whiteSpace: "nowrap", paddingLeft: "3px", width: headCell.width
                                }}
                            >
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : "asc"}
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

    function LocGroupItemDetailsTableHead(props) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <>
                <TableHead className={AllocDetailsClasses.TitleHead}
                    sx={{ position: "sticky", top: -1, }}
                >
                    <TableRow className={AllocDetailsClasses.TitleRow}>
                        <StyledTableCell padding="checkbox" style={{
                            whiteSpace: "nowrap", padding: "0px",
                        }}
                        >
                            <Checkbox
                                color="primary"
                                size="small"
                                // indeterminate={selected.length > 0 && selected.length < qtyLimitsData.length}
                                // checked={qtyLimitsData.length > 0 && selected.length === qtyLimitsData.length}
                                // onChange={onSelectAllClick}
                                inputProps={{
                                    'aria-label': 'select all data',
                                }}
                                style={{
                                    color: "#fff",
                                    padding: "3px",
                                    // border: "1px solid black"
                                }}
                            />
                        </StyledTableCell>


                        {LocGroupItemDetailsHeader.map((headCell) => (
                            <StyledTableCell
                                key={headCell.id}
                                // className={AllocDetailsClasses.TableCell}
                                size="small"
                                sortDirection={orderBy === headCell.id ? order : false}
                                style={{
                                    whiteSpace: "nowrap", padding: "0px", margin: "0px", paddingLeft: "3px"
                                }}
                            >
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : "asc"}
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
                                        padding: "0px", margin: "0px"
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

    LocGroupItemDetailsTableHead.propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };


    return (
        <Box className={AllocDetailsClasses.maindiv} sx={{ width: "100%" }}>
            <div >
                {SearchHeader()}
            </div>

            <div  >
                <Box
                    // component="fieldset"
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
                    {/* <div sx={{ display: "flex", flexDirection: "row" }}>
                        <Grid id="top-row" container spacing={0}> */}
                    <div className={AllocDetailsClasses.course_box}>
                        <div className={AllocDetailsClasses.grid_block}>

                            <Box
                                display="flex"
                                sx={{
                                    backgroundColor: "",
                                    margin: "5px 0px 0px 5px",
                                    justifyContent: "flex-end",
                                    width: "calc(92vw - 0px)",
                                }}

                            >
                                <div>
                                    <div className={AllocDetailsClasses.float_child}>
                                        <Button
                                            sx={{
                                                fontSize: "12px",
                                                backgroundColor: "#228B22",
                                                padding: "5px", fontFamily: "system-ui",
                                                width: "100px", marginLeft: "5px", marginTop: "2px",
                                            }}
                                            variant="contained"
                                            // className={AllocDetailsClasses.textField}
                                            type="submit"
                                            // onClick={SubmitValueList}
                                            startIcon={<DoneAllIcon />}
                                        >
                                            Ok</Button>

                                        <Button
                                            sx={{
                                                backgroundColor: "maroon",
                                                fontSize: "12px", padding: "5px", fontFamily: "system-ui",
                                                width: "100px", marginLeft: "5px", marginTop: "2px",
                                            }}
                                            variant="contained"
                                            // className={AllocDetailsClasses.textField}
                                            type="submit"
                                            // onClick={handleCancel}
                                            startIcon={<CancelIcon />}
                                        >
                                            Cancel</Button>

                                    </div>
                                </div>
                            </Box>

                        </div>

                        <div className={AllocDetailsClasses.grid_block}>
                            <InputLabel sx={{
                                fontWeight: "bold",
                                fontSize: "14px",
                                margin: "5px 0px 10px 10px",
                                display: 'inline',
                                float: 'left',
                                color: "#191970",
                            }}>
                                Item Details
                            </InputLabel>
                        </div>

                        <div className={AllocDetailsClasses.TableBoby}>
                            <Paper sx={{ margin: "0px 0px 0px 5px", width: '100%', mb: 0, height: "auto", width: "calc(92vw - 0px)", borderRadius: 1, boxShadow: 2, border: 0, borderBottom: 3, }}>
                                {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                                <TableContainer style={{ maxHeight: 165, width: "calc(100% - 0px)" }} component={Paper}>
                                    <Table aria-label="customized table">
                                        <ItemDetailsTableHead
                                        // numSelected={selected.length}
                                        // order={order}
                                        // orderBy={orderBy}
                                        // onSelectAllClick={handleSelectAllClick}
                                        // onRequestSort={handleRequestSort}
                                        // rowCount={qtyLimitsData.length}
                                        // sx={{height: "auto",border:"2px solid blue"}}
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

                                            <TableCell sx={{
                                                padding: "0px",
                                            }}>
                                                <TextField
                                                    // name="Item"
                                                    // onChange={testChange}
                                                    // value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("LOCATION_ID") > 0 ? inputValue.LOCATION_ID : ""}
                                                    placeholder="Item"
                                                    // label="Location"
                                                    autoComplete="off"
                                                    InputProps={{
                                                        sx: { fontSize: 12, padding: "0px", height: "20px", textAlign: "center", }
                                                    }}
                                                    sx={{
                                                        width: "100%"
                                                    }}
                                                    variant="standard"
                                                    inputProps={{
                                                        // maxLength: 5,
                                                        sx: {
                                                            fontSize: 12, padding: "0px", height: "20px", textAlign: "center",
                                                            "&::placeholder": {
                                                                textAlign: "left"
                                                            },
                                                        },
                                                    }}
                                                />
                                            </TableCell>

                                            <TableCell sx={{
                                                padding: "0px"
                                                , height: "auto"
                                            }}>
                                                <TextField
                                                    // name="LOCATION_GROUP_ID"
                                                    // onChange={testChange}
                                                    // value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("LOCATION_GROUP_ID") > 0 ? inputValue.LOCATION_GROUP_ID : ""}
                                                    placeholder="Item Desc"
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
                                                        sx: { padding: "0px", height: "20px", textAlign: "center", }
                                                    }}
                                                />
                                            </TableCell>

                                            <TableCell sx={{
                                                padding: "0px"
                                                , height: "auto"
                                            }}>
                                                <TextField
                                                    // name="ASSIGN_DEFAULT_WH"
                                                    // onChange={testChange}
                                                    // value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("ASSIGN_DEFAULT_WH") > 0 ? inputValue.ASSIGN_DEFAULT_WH : ""}
                                                    autoComplete="off"
                                                    placeholder="Diff ID"
                                                    InputProps={{
                                                        style: { fontSize: 12, height: "20px", textAlign: "center", },
                                                    }}
                                                    sx={{
                                                        width: "100%"
                                                    }}
                                                    variant="standard"
                                                    inputProps={{
                                                        // maxLength: 5,
                                                        sx: { padding: "0px", height: "20px", textAlign: "center", }
                                                    }}
                                                />
                                            </TableCell>

                                            <TableCell sx={{
                                                padding: "0px"
                                                , height: "auto"
                                            }}>
                                                <TextField
                                                    // name="ITEM_ID"
                                                    // onChange={testChange}
                                                    // value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("ITEM_ID") > 0 ? inputValue.ITEM_ID : ""}
                                                    autoComplete="off"
                                                    placeholder="Gross Need"
                                                    InputProps={{
                                                        style: { fontSize: 12, height: "20px", textAlign: "center", },
                                                    }}
                                                    sx={{
                                                        width: "100%"
                                                    }}
                                                    variant="standard"
                                                    inputProps={{
                                                        // maxLength: 5,
                                                        sx: { padding: "0px", height: "20px", textAlign: "center", }
                                                    }}
                                                />
                                            </TableCell>

                                            <TableCell sx={{
                                                padding: "0px"
                                                , height: "auto"
                                            }}>
                                                <TextField
                                                    // name="ITEM_DESC"
                                                    // onChange={testChange}
                                                    // value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("ITEM_DESC") > 0 ? inputValue.ITEM_DESC : ""}
                                                    autoComplete="off"
                                                    placeholder="OH"
                                                    InputProps={{
                                                        style: { fontSize: 12, height: "20px" },
                                                    }}
                                                    sx={{
                                                        width: "100%"
                                                    }}
                                                    variant="standard"
                                                    inputProps={{
                                                        // maxLength: 5,
                                                        sx: { padding: "0px", height: "20px", textAlign: "center", }
                                                    }}
                                                />
                                            </TableCell>

                                            <TableCell sx={{
                                                padding: "0px"
                                                , height: "auto"
                                            }}>
                                                <TextField
                                                    // name="DIFF_ID"
                                                    // onChange={testChange}
                                                    // value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("DIFF_ID") > 0 ? inputValue.DIFF_ID : ""}
                                                    autoComplete="off"
                                                    placeholder="Future Fulfill"
                                                    InputProps={{
                                                        style: { fontSize: 12, height: "20px" },
                                                    }}
                                                    sx={{
                                                        width: "100%"
                                                    }}
                                                    variant="standard"
                                                    inputProps={{
                                                        // maxLength: 5,
                                                        sx: { padding: "0px", height: "20px", textAlign: "center", }
                                                    }}
                                                />
                                            </TableCell>

                                            <TableCell sx={{
                                                padding: "0px"
                                                , height: "auto"
                                            }}>
                                                <TextField
                                                    // name="SKU_COUNT"
                                                    // onChange={testChange}
                                                    // value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("SKU_COUNT") > 0 ? inputValue.SKU_COUNT : ""}
                                                    autoComplete="off"
                                                    placeholder="Net Need"
                                                    InputProps={{
                                                        style: { fontSize: 12, height: "20px" },
                                                    }}
                                                    sx={{
                                                        width: "100%"
                                                    }}
                                                    variant="standard"
                                                    inputProps={{
                                                        // maxLength: 5,
                                                        sx: { padding: "0px", height: "20px", textAlign: "center", }
                                                    }}
                                                />
                                            </TableCell>

                                            <TableCell sx={{
                                                padding: "0px"
                                                , height: "auto"
                                            }}>
                                                <TextField
                                                    // name="SOM_QTY"
                                                    // onChange={testChange}
                                                    // value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("SOM_QTY") > 0 ? inputValue.SOM_QTY : ""}
                                                    autoComplete="off"
                                                    placeholder="Calc Qty"
                                                    InputProps={{
                                                        style: { fontSize: 12, height: "20px" },
                                                    }}
                                                    sx={{
                                                        width: "100%"
                                                    }}
                                                    variant="standard"
                                                    inputProps={{
                                                        // maxLength: 5,
                                                        sx: { padding: "0px", height: "20px", textAlign: "center", }
                                                    }}
                                                />
                                            </TableCell>

                                            <TableCell sx={{
                                                padding: "0px"
                                                , height: "auto"
                                            }}>
                                                <TextField
                                                    // name="SOM_QTY"
                                                    // onChange={testChange}
                                                    // value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("SOM_QTY") > 0 ? inputValue.SOM_QTY : ""}
                                                    autoComplete="off"
                                                    placeholder="Avail Qty"
                                                    InputProps={{
                                                        style: { fontSize: 12, height: "20px" },
                                                    }}
                                                    sx={{
                                                        width: "100%"
                                                    }}
                                                    variant="standard"
                                                    inputProps={{
                                                        // maxLength: 5,
                                                        sx: { padding: "0px", height: "20px", textAlign: "center", }
                                                    }}
                                                />
                                            </TableCell>

                                            <TableCell sx={{
                                                padding: "0px"
                                                , height: "auto"
                                            }}>
                                                <TextField
                                                    // name="SOM_QTY"
                                                    // onChange={testChange}
                                                    // value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("SOM_QTY") > 0 ? inputValue.SOM_QTY : ""}
                                                    autoComplete="off"
                                                    placeholder="Alloc Qty"
                                                    InputProps={{
                                                        style: { fontSize: 12, height: "20px" },
                                                    }}
                                                    sx={{
                                                        width: "100%"
                                                    }}
                                                    variant="standard"
                                                    inputProps={{
                                                        // maxLength: 5,
                                                        sx: { padding: "0px", height: "20px", textAlign: "center", }
                                                    }}
                                                />
                                            </TableCell>

                                            <TableCell sx={{
                                                padding: "0px"
                                                , height: "auto"
                                            }}>
                                                <TextField
                                                    // name="SOM_QTY"
                                                    // onChange={testChange}
                                                    // value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("SOM_QTY") > 0 ? inputValue.SOM_QTY : ""}
                                                    autoComplete="off"
                                                    placeholder="Remain Qty"
                                                    InputProps={{
                                                        style: { fontSize: 12, height: "20px" },
                                                    }}
                                                    sx={{
                                                        width: "100%"
                                                    }}
                                                    variant="standard"
                                                    inputProps={{
                                                        // maxLength: 5,
                                                        sx: { padding: "0px", height: "20px", textAlign: "center", }
                                                    }}
                                                />
                                            </TableCell>
                                        </TableBody>

                                        <TableBody
                                        // sx={{ height: "auto",border:"2px solid green" }}
                                        >

                                            {ItemDetailsData.length < 5 ?
                                                [...Array(5 - (ItemDetailsData.length)).keys()].map(val => (
                                                    <TableRow  >
                                                        {/* <TableCell padding="checkbox" sx={{ padding: "0px", width: "1%" }}>
                                                            <Checkbox size="small" color="primary" disabled={true} sx={{ padding: "0px" }} />
                                                        </TableCell> */}
                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "20px" }}></TableCell>
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

                                                    </TableRow >
                                                )) : false}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                            </Paper>
                        </div>

                        <Box
                            // display='flex'
                            sx={{
                                // border: "1px solid lightgrey",
                                boxShadow: 3,
                                borderRadius: 1,
                                width: "calc(92vw - 0px)",
                                margin: "5px 0px 0px 5px",
                                padding: "0px 0px 0px 0px"
                            }}
                        >
                            <div className={AllocDetailsClasses.grid_block}>
                                <Box
                                    display='flex'
                                >
                                    <InputLabel sx={{
                                        fontWeight: "bold",
                                        fontSize: "14px",
                                        margin: "5px 0px 0px 5px",
                                        display: 'inline',
                                        float: 'left',
                                        color: "#191970",
                                    }}>
                                        Item WH Details</InputLabel>
                                </Box>
                            </div>

                            <div className={AllocDetailsClasses.TableTotalBoby}>
                                <Box
                                    display="flex"
                                    sx={{
                                        backgroundColor: "",
                                        margin: "5px 0px 2px 0px",
                                        justifyContent: "flex-end",
                                        width: "calc(92vw - 0px)",
                                        // border: "1px solid lightgrey",
                                        // borderBottom:"0px",
                                        // borderRadius:"5px"
                                    }}
                                >
                                    <div>
                                        <Button
                                            sx={{
                                                fontSize: "12px",
                                                backgroundColor: "",
                                                padding: "5px", fontFamily: "system-ui",
                                                width: "100%", marginLeft: "0px", marginTop: "2px",
                                            }}
                                            variant="contained"
                                            // className={AllocDetailsClasses.textField}
                                            type="submit"
                                        // onClick={SubmitValueList}
                                        // startIcon={<DoneAllIcon />}
                                        >
                                            Spread To All Locations</Button>
                                    </div>
                                </Box>
                            </div>

                            <div className={AllocDetailsClasses.TableBoby}>
                                <Paper sx={{ margin: "0px 0px 0px 0px", mb: 0, height: "auto", width: "calc(92vw - 0px)", borderRadius: 1, boxShadow: 2, border: 0, borderBottom: 3, }}>
                                    {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                                    <TableContainer style={{ maxHeight: 120, width: "calc(100% - 0px)" }} component={Paper}>
                                        <Table aria-label="customized table">
                                            <ItemWHDetailsTableHead
                                            // numSelected={selected.length}
                                            // order={order}
                                            // orderBy={orderBy}
                                            // onSelectAllClick={handleSelectAllClick}
                                            // onRequestSort={handleRequestSort}
                                            // rowCount={qtyLimitsData.length}
                                            // sx={{height: "auto",border:"2px solid blue"}}
                                            />
                                            <TableBody
                                            // sx={{ height: "auto",border:"2px solid green" }}
                                            >

                                                {ItemWHDetailsData.length < 3 ?
                                                    [...Array(3 - (ItemWHDetailsData.length)).keys()].map(val => (
                                                        <TableRow  >
                                                            {/* <TableCell padding="checkbox" sx={{ padding: "0px", width: "1%" }}>
                                                            <Checkbox size="small" color="primary" disabled={true} sx={{ padding: "0px" }} />
                                                        </TableCell> */}
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "20px" }}></TableCell>
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
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
                                                                <TextField
                                                                    sx={{
                                                                        width: "100%",
                                                                        "& .MuiInputBase-input.Mui-disabled": {
                                                                            backgroundColor: "#f0f0f0",
                                                                            borderRadius: "5px",
                                                                            // height: "15px",
                                                                        },
                                                                    }}

                                                                    InputProps={{
                                                                        style: {
                                                                            fontSize: 12, height: "20px", width: "100%",
                                                                            // border:"1px solid red"
                                                                        },
                                                                    }}
                                                                    disabled
                                                                    inputProps={{
                                                                        maxLength: 20,
                                                                        sx: { padding: "0px", height: "20px", width: "100%", backgroundColor: "#fff" }
                                                                    }}
                                                                />
                                                            </TableCell>

                                                        </TableRow >
                                                    )) : false}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                                </Paper>
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
                            <div className={AllocDetailsClasses.TableTotalBoby} display="flex">
                                <Box
                                    display='flex'
                                >
                                    <InputLabel sx={{
                                        fontWeight: "bold",
                                        fontSize: "14px",
                                        margin: "5px 0px 0px 5px",
                                        display: 'flex',
                                        float: 'left',
                                        color: "#191970",
                                    }}>
                                        Loc/Group Item Details
                                    </InputLabel>
                                </Box>

                                <div>
                                    <Box
                                        display="flex"
                                        sx={{
                                            backgroundColor: "",
                                            margin: "0px 0px 0px 5px",
                                            justifyContent: "space-between",
                                            // width: "calc(92vw - 0px)",
                                            // border:"1px solid red"
                                        }}
                                    >
                                        <div>
                                            <FormControlLabel
                                                size="small"
                                                sx={{
                                                    padding: "0px",
                                                    margin: "0px 0px 0px 18px",
                                                    // border:"1px solid red"
                                                }}
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        sx={{
                                                            margin: "0px 0px 0px 0px",
                                                            padding: "2px",
                                                            // border:"1px solid red"
                                                        }}
                                                        // disabled
                                                        // checked={checked?false:true}
                                                        // onChange={handleChangeSwitch}
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
                                                    View By Other Group</InputLabel>}
                                            />
                                        </div>

                                        <div>
                                            <div className={AllocDetailsClasses.float_child}>
                                                <Button
                                                    sx={{
                                                        fontSize: "12px",
                                                        backgroundColor: "",
                                                        padding: "5px", fontFamily: "system-ui",
                                                        width: "100px", marginRight: "0px", marginTop: "2px",
                                                        margin: "2px 5px 2px 0px"
                                                        // border:"1px solid red"
                                                    }}
                                                    variant="contained"
                                                    // className={AllocDetailsClasses.textField}
                                                    type="submit"
                                                // onClick={SubmitValueList}
                                                // startIcon={<DoneAllIcon />}
                                                >
                                                    Size Details</Button>
                                            </div>

                                            <div className={AllocDetailsClasses.float_child}>
                                                <Button
                                                    sx={{
                                                        fontSize: "12px",
                                                        backgroundColor: "",
                                                        padding: "5px", fontFamily: "system-ui",
                                                        width: "100px", marginLeft: "0px", marginTop: "2px",
                                                        margin: "2px 0px 2px 0px",
                                                        // border:"1px solid red"
                                                    }}
                                                    variant="contained"
                                                    // className={AllocDetailsClasses.textField}
                                                    type="submit"
                                                // onClick={SubmitValueList}
                                                // startIcon={<DoneAllIcon />}
                                                >
                                                    Size Profile</Button>
                                            </div>
                                        </div>
                                    </Box>
                                </div>

                                <div className={AllocDetailsClasses.TableBoby}>
                                    <Paper sx={{ margin: "0px 0px 0px 0px", mb: 0, height: "auto", borderRadius: 1, boxShadow: 2, border: 0, borderBottom: 3, }}>
                                        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                                        <TableContainer style={{ maxHeight: 280, width: "calc(100% - 0px)" }} component={Paper}>
                                            <Table aria-label="customized table">
                                                <LocGroupItemDetailsTableHead
                                                />
                                                <TableBody
                                                // sx={{ position: "sticky", top: -1,textAlign:"left" }}
                                                // sx={{ height: "auto",border:"2px solid green" }}
                                                >
                                                    <TableCell padding="checkbox" sx={{ padding: "0px" }} >
                                                        <Grid item xs={1} style={{ padding: "0px", margin: "0px 0px 0px 0px" }}>
                                                            <IconButton small="small" sx={{ padding: "0px" }}>
                                                                <RestartAltIcon small="small" sx={{ padding: "0px" }} />
                                                            </IconButton>
                                                        </Grid>
                                                    </TableCell>

                                                    <TableCell sx={{
                                                        padding: "0px",
                                                    }}>
                                                        <TextField
                                                            // name="Item"
                                                            // onChange={testChange}
                                                            // value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("LOCATION_ID") > 0 ? inputValue.LOCATION_ID : ""}
                                                            placeholder="Loc"
                                                            // label="Location"
                                                            autoComplete="off"
                                                            InputProps={{
                                                                sx: { fontSize: 12, padding: "0px", height: "20px", textAlign: "center", }
                                                            }}
                                                            sx={{
                                                                width: "100%"
                                                            }}
                                                            variant="standard"
                                                            inputProps={{
                                                                // maxLength: 5,
                                                                sx: {
                                                                    fontSize: 12, padding: "0px", height: "20px", textAlign: "center",
                                                                    "&::placeholder": {
                                                                        textAlign: "left"
                                                                    },
                                                                },
                                                            }}
                                                        />
                                                    </TableCell>



                                                    <TableCell sx={{
                                                        padding: "0px",
                                                    }}>
                                                        <TextField
                                                            // name="Item"
                                                            // onChange={testChange}
                                                            // value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("LOCATION_ID") > 0 ? inputValue.LOCATION_ID : ""}
                                                            placeholder="Loc List"
                                                            // label="Location"
                                                            autoComplete="off"
                                                            InputProps={{
                                                                sx: { fontSize: 12, padding: "0px", height: "20px", textAlign: "center", }
                                                            }}
                                                            sx={{
                                                                width: "100%"
                                                            }}
                                                            variant="standard"
                                                            inputProps={{
                                                                // maxLength: 5,
                                                                sx: {
                                                                    fontSize: 12, padding: "0px", height: "20px", textAlign: "center",
                                                                    "&::placeholder": {
                                                                        textAlign: "left"
                                                                    },
                                                                },
                                                            }}
                                                        />
                                                    </TableCell>

                                                    <TableCell sx={{
                                                        padding: "0px",
                                                    }}>
                                                        <TextField
                                                            // name="Item"
                                                            // onChange={testChange}
                                                            // value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("LOCATION_ID") > 0 ? inputValue.LOCATION_ID : ""}
                                                            placeholder="Loc Trait"
                                                            // label="Location"
                                                            autoComplete="off"
                                                            InputProps={{
                                                                sx: { fontSize: 12, padding: "0px", height: "20px", textAlign: "center", }
                                                            }}
                                                            sx={{
                                                                width: "100%"
                                                            }}
                                                            variant="standard"
                                                            inputProps={{
                                                                // maxLength: 5,
                                                                sx: {
                                                                    fontSize: 12, padding: "0px", height: "20px", textAlign: "center",
                                                                    "&::placeholder": {
                                                                        textAlign: "left"
                                                                    },
                                                                },
                                                            }}
                                                        />
                                                    </TableCell>

                                                    <TableCell sx={{
                                                        padding: "0px",
                                                    }}>
                                                        <TextField
                                                            // name="Item"
                                                            // onChange={testChange}
                                                            // value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("LOCATION_ID") > 0 ? inputValue.LOCATION_ID : ""}
                                                            placeholder="Def WH"
                                                            // label="Location"
                                                            autoComplete="off"
                                                            InputProps={{
                                                                sx: { fontSize: 12, padding: "0px", height: "20px", textAlign: "center", }
                                                            }}
                                                            sx={{
                                                                width: "100%"
                                                            }}
                                                            variant="standard"
                                                            inputProps={{
                                                                // maxLength: 5,
                                                                sx: {
                                                                    fontSize: 12, padding: "0px", height: "20px", textAlign: "center",
                                                                    "&::placeholder": {
                                                                        textAlign: "left"
                                                                    },
                                                                },
                                                            }}
                                                        />
                                                    </TableCell>

                                                    <TableCell sx={{
                                                        padding: "0px",
                                                    }}>
                                                        <TextField
                                                            // name="Item"
                                                            // onChange={testChange}
                                                            // value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("LOCATION_ID") > 0 ? inputValue.LOCATION_ID : ""}
                                                            placeholder="Item"
                                                            // label="Location"
                                                            autoComplete="off"
                                                            InputProps={{
                                                                sx: { fontSize: 12, padding: "0px", height: "20px", textAlign: "center", }
                                                            }}
                                                            sx={{
                                                                width: "100%"
                                                            }}
                                                            variant="standard"
                                                            inputProps={{
                                                                // maxLength: 5,
                                                                sx: {
                                                                    fontSize: 12, padding: "0px", height: "20px", textAlign: "center",
                                                                    "&::placeholder": {
                                                                        textAlign: "left"
                                                                    },
                                                                },
                                                            }}
                                                        />
                                                    </TableCell>

                                                    <TableCell sx={{
                                                        padding: "0px"
                                                        , height: "auto"
                                                    }}>
                                                        <TextField
                                                            // name="LOCATION_GROUP_ID"
                                                            // onChange={testChange}
                                                            // value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("LOCATION_GROUP_ID") > 0 ? inputValue.LOCATION_GROUP_ID : ""}
                                                            placeholder="Item Desc"
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
                                                                sx: { padding: "0px", height: "20px", textAlign: "center", }
                                                            }}
                                                        />
                                                    </TableCell>

                                                    <TableCell sx={{
                                                        padding: "0px"
                                                        , height: "auto"
                                                    }}>
                                                        <TextField
                                                            // name="ASSIGN_DEFAULT_WH"
                                                            // onChange={testChange}
                                                            // value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("ASSIGN_DEFAULT_WH") > 0 ? inputValue.ASSIGN_DEFAULT_WH : ""}
                                                            autoComplete="off"
                                                            placeholder="Diff ID"
                                                            InputProps={{
                                                                style: { fontSize: 12, height: "20px", textAlign: "center", },
                                                            }}
                                                            sx={{
                                                                width: "100%"
                                                            }}
                                                            variant="standard"
                                                            inputProps={{
                                                                // maxLength: 5,
                                                                sx: { padding: "0px", height: "20px", textAlign: "center", }
                                                            }}
                                                        />
                                                    </TableCell>

                                                    <TableCell sx={{
                                                        padding: "0px"
                                                        , height: "auto"
                                                    }}>
                                                        <TextField
                                                            // name="ASSIGN_DEFAULT_WH"
                                                            // onChange={testChange}
                                                            // value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("ASSIGN_DEFAULT_WH") > 0 ? inputValue.ASSIGN_DEFAULT_WH : ""}
                                                            autoComplete="off"
                                                            placeholder="SOM"
                                                            InputProps={{
                                                                style: { fontSize: 12, height: "20px", textAlign: "center", },
                                                            }}
                                                            sx={{
                                                                width: "100%"
                                                            }}
                                                            variant="standard"
                                                            inputProps={{
                                                                // maxLength: 5,
                                                                sx: { padding: "0px", height: "20px", textAlign: "center", }
                                                            }}
                                                        />
                                                    </TableCell>

                                                    <TableCell sx={{
                                                        padding: "0px"
                                                        , height: "auto"
                                                    }}>
                                                        <TextField
                                                            // name="ITEM_ID"
                                                            // onChange={testChange}
                                                            // value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("ITEM_ID") > 0 ? inputValue.ITEM_ID : ""}
                                                            autoComplete="off"
                                                            placeholder="Gross Need"
                                                            InputProps={{
                                                                style: { fontSize: 12, height: "20px", textAlign: "center", },
                                                            }}
                                                            sx={{
                                                                width: "100%"
                                                            }}
                                                            variant="standard"
                                                            inputProps={{
                                                                // maxLength: 5,
                                                                sx: { padding: "0px", height: "20px", textAlign: "center", }
                                                            }}
                                                        />
                                                    </TableCell>

                                                    <TableCell sx={{
                                                        padding: "0px"
                                                        , height: "auto"
                                                    }}>
                                                        <TextField
                                                            // name="ITEM_DESC"
                                                            // onChange={testChange}
                                                            // value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("ITEM_DESC") > 0 ? inputValue.ITEM_DESC : ""}
                                                            autoComplete="off"
                                                            placeholder="OH"
                                                            InputProps={{
                                                                style: { fontSize: 12, height: "20px" },
                                                            }}
                                                            sx={{
                                                                width: "100%"
                                                            }}
                                                            variant="standard"
                                                            inputProps={{
                                                                // maxLength: 5,
                                                                sx: { padding: "0px", height: "20px", textAlign: "center", }
                                                            }}
                                                        />
                                                    </TableCell>

                                                    <TableCell sx={{
                                                        padding: "0px"
                                                        , height: "auto"
                                                    }}>
                                                        <TextField
                                                            // name="DIFF_ID"
                                                            // onChange={testChange}
                                                            // value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("DIFF_ID") > 0 ? inputValue.DIFF_ID : ""}
                                                            autoComplete="off"
                                                            placeholder="Future Fulfill"
                                                            InputProps={{
                                                                style: { fontSize: 12, height: "20px" },
                                                            }}
                                                            sx={{
                                                                width: "100%"
                                                            }}
                                                            variant="standard"
                                                            inputProps={{
                                                                // maxLength: 5,
                                                                sx: { padding: "0px", height: "20px", textAlign: "center", }
                                                            }}
                                                        />
                                                    </TableCell>

                                                    <TableCell sx={{
                                                        padding: "0px"
                                                        , height: "auto"
                                                    }}>
                                                        <TextField
                                                            // name="SKU_COUNT"
                                                            // onChange={testChange}
                                                            // value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("SKU_COUNT") > 0 ? inputValue.SKU_COUNT : ""}
                                                            autoComplete="off"
                                                            placeholder="Net Need"
                                                            InputProps={{
                                                                style: { fontSize: 12, height: "20px" },
                                                            }}
                                                            sx={{
                                                                width: "100%"
                                                            }}
                                                            variant="standard"
                                                            inputProps={{
                                                                // maxLength: 5,
                                                                sx: { padding: "0px", height: "20px", textAlign: "center", }
                                                            }}
                                                        />
                                                    </TableCell>

                                                    <TableCell sx={{
                                                        padding: "0px"
                                                        , height: "auto"
                                                    }}>
                                                        <TextField
                                                            // name="SOM_QTY"
                                                            // onChange={testChange}
                                                            // value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("SOM_QTY") > 0 ? inputValue.SOM_QTY : ""}
                                                            autoComplete="off"
                                                            placeholder="Calc Qty"
                                                            InputProps={{
                                                                style: { fontSize: 12, height: "20px" },
                                                            }}
                                                            sx={{
                                                                width: "100%"
                                                            }}
                                                            variant="standard"
                                                            inputProps={{
                                                                // maxLength: 5,
                                                                sx: { padding: "0px", height: "20px", textAlign: "center", }
                                                            }}
                                                        />
                                                    </TableCell>

                                                    <TableCell sx={{
                                                        padding: "0px"
                                                        , height: "auto"
                                                    }}>
                                                        <TextField
                                                            // name="SOM_QTY"
                                                            // onChange={testChange}
                                                            // value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("SOM_QTY") > 0 ? inputValue.SOM_QTY : ""}
                                                            autoComplete="off"
                                                            placeholder="Alloc Qty"
                                                            InputProps={{
                                                                style: { fontSize: 12, height: "20px" },
                                                            }}
                                                            sx={{
                                                                width: "100%"
                                                            }}
                                                            variant="standard"
                                                            inputProps={{
                                                                // maxLength: 5,
                                                                sx: { padding: "0px", height: "20px", textAlign: "center", }
                                                            }}
                                                        />
                                                    </TableCell>

                                                    <TableCell sx={{
                                                        padding: "0px"
                                                        , height: "auto"
                                                    }}>
                                                        <TextField
                                                            // name="SOM_QTY"
                                                            // onChange={testChange}
                                                            // value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("SOM_QTY") > 0 ? inputValue.SOM_QTY : ""}
                                                            autoComplete="off"
                                                            placeholder="Variance"
                                                            InputProps={{
                                                                style: { fontSize: 12, height: "20px" },
                                                            }}
                                                            sx={{
                                                                width: "100%"
                                                            }}
                                                            variant="standard"
                                                            inputProps={{
                                                                // maxLength: 5,
                                                                sx: { padding: "0px", height: "20px", textAlign: "center", }
                                                            }}
                                                        />
                                                    </TableCell>
                                                </TableBody>

                                                <TableBody
                                                // sx={{ height: "auto",border:"2px solid green" }}
                                                >

                                                    {LocGroupItemDetailsData.length < 10 ?
                                                        [...Array(10 - (LocGroupItemDetailsData.length)).keys()].map(val => (
                                                            <TableRow  >
                                                                <TableCell padding="checkbox" sx={{ padding: "0px", width: "1%" }}>
                                                                    <Checkbox size="small" color="primary" disabled={true} sx={{ padding: "0px" }} />
                                                                </TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}></TableCell>
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
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
                                                                    <TextField
                                                                        sx={{
                                                                            width: "100%",
                                                                            "& .MuiInputBase-input.Mui-disabled": {
                                                                                backgroundColor: "#f0f0f0",
                                                                                borderRadius: "5px",
                                                                                // height: "15px",
                                                                            },
                                                                        }}

                                                                        InputProps={{
                                                                            style: {
                                                                                fontSize: 12, height: "20px", width: "100%",
                                                                                // border:"1px solid red"
                                                                            },
                                                                        }}
                                                                        disabled
                                                                        inputProps={{
                                                                            maxLength: 20,
                                                                            sx: { padding: "0px", height: "20px", width: "100%", backgroundColor: "#fff" }
                                                                        }}
                                                                    />
                                                                </TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>

                                                            </TableRow >
                                                        )) : false}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                                    </Paper>
                                </div>
                            </div>
                        </Box>

                    </div>
                </Box>
            </div>
        </Box>
    )

};

export default AllocDetails;
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
import {
    getALLOCHEADDETAILSRequest,
    getQTYLIMITSRequest,
    getUPDATEQTYLIMITSRequest,
    getOKQTYLIMITSSRNRequest,
} from "../../Redux/Action/quantityLimits";
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
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import Toolbar from "@mui/material/Toolbar";
// import SearchTableData from "../Search";
import { visuallyHidden } from '@mui/utils';
import { headCells } from "./tableHead";
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
import ClearAllIcon from '@mui/icons-material/ClearAll';
import WarningIcon from '@mui/icons-material/Warning';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import AnimationIcon from '@mui/icons-material/Animation';
// BsFillEraserFill
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

const animatedComponents = makeAnimated();



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
    TitleHead: {
        // height: "25px",
        position: "sticky",
        top: -1,
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
        // border: "1px solid green",
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
    inputtable: {
        height: "30px"
    },
    float_child: {
        display: "inline-block",
        marginBottom: "0.2rem",
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
        height: 20
    },
    inputPlaceHolder: {
        // border:"1px solid red",
        "&::placeholder": {
            color: "red",
            textAlign: "left"
        }
    },

});

const useStyles1 = makeStyles((theme) => ({
    input: {
        border: "1px solid black",
        "&::placeholder": {
            color: "red",
            textAlign: "center"
        }
    }
}));


const initialHeaderData = {
    ALLOC_CRITERIA: "",
    CONTEXT: "",
    ALLOC_LEVEL: "",
    ALLOC_TYPE: "",
    STATUS: "",
    PROMOTION: "",
    CREATE_ID: JSON.parse(localStorage.getItem("userData"))?.username,
    ALLOC_DESC: "",
    RELEASE_DATE: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
    ALLOC_NO: "",
    ALLOC_LEVEL_CODE: "",
    ALLOC_TYPE_CODE: "",
    STATUS_CODE: "",
    PROMOTION_CODE: "",
    CONTEXT_CODE: "",
}

const QtyHeader = [
    { id: "LOCATION_ID", label: "Location" },
    { id: "LOCATION_GROUP_ID", label: "Location Group" },
    { id: "ASSIGN_DEFAULT_WH", label: "Def WH" },
    { id: "ITEM_ID", label: "Sku" },
    { id: "ITEM_DESC", label: "Description" },
    { id: "DIFF_ID", label: "Variant" },
    { id: "SKU_COUNT", label: "No of Sku's" },
    { id: "SOM_QTY", label: "Store Packs Qty" },
    { id: "TREND", label: "Trend" },
    { id: "WOS", label: "WOS" },
    { id: "MIN", label: "Min" },
    { id: "TRESHOLD", label: "Threshold" },
    { id: "MAX", label: "Max" },
    { id: "MIN_NEED", label: "Min Need" },
]

const InlineHeader = {
    LOCATION: "",
    GROUP_ID: "",
    DEFAULT_WH: "",
    ITEM: "",
    ITEM_DESC: "",
    DIFF_ID: "",
    SKU_COUNT: "",
    SOM_QTY: "",
}

const initialCopyValues = {
    TREND: "",
    TRESHOLD: "",
    MIN: "",
    MIN_NEED: "",
    MAX: "",
    WOS: "",
}


const QuantityLimits = ({ allocNoData, tab, setTab, setRTabCond, setDisCond, limData, ApproveFreeseCheck, setHeaderCheck,
    setOpenDialog, setDialogData, setIsValidQtyLimits }) => {
    const [isSearch, setSearch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSubmit, setSubmit] = useState(false);
    const [searchHeaderData, setSearchHeaderData] = useState(initialHeaderData);

    const [allocDetails, setAllocDetails] = useState([{}]);
    const [selected, setSelected] = useState([{}]);
    const [tableData, setTableData] = useState([]);
    const [qtyLimitsData, setQtyLimitsData] = useState([]);
    const [inputValue, setInputValue] = useState({});
    const [inputValue1, setInputValue1] = useState({});
    const [copyValue, setCopyValue] = useState(initialCopyValues);
    // const [InCheck, setInCheck] = React.useState(false);
    const [checked, setChecked] = React.useState(true);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [eraseValue, setEraseValue] = useState([]);
    const [sampleVal, setSampleVal] = useState([]);
    const [updateQtyLimitsData, setUpdateQtyLimitsData] = useState([]);
    const [OkQtyLimitsData, setOkQtyLimitsData] = useState([]);

    const [validCheckQty, setvalidCheckQty] = React.useState(false);
    const [validCheckQtyData, setvalidCheckQtyData] = React.useState(false);
    const [validCheckQtyData1, setvalidCheckQtyData1] = React.useState(true);
    const [selectedRow, setSelectedRow] = useState(null);
    const [LoadCheck, setLoadCheck] = useState(false);

    const [LockCheck, setLockCheck] = useState(false);

    const [dialogOpen, setDialogOpen] = useState(false);
    // Error popup message
    const [openDialogQL, setOpenDialogQL] = useState(false);
    const [DialogDataQL, setDialogDataQL] = useState("");

    // Manage columns popup in Table Grid
    const [openDialogManage, setOpenDialogManage] = useState(false);
    const [ManageHeaderCheck, setManageHeaderCheck] = useState(true);
    const [ManageHeaderData, setManageHeaderData] = useState([]);

    const [rowsPerPage, setRowsPerPage] = React.useState(30);
    const [page, setPage] = React.useState(0);
    const [currentPageData, setcurrentPageData] = useState([]);
    const [currentPageRows, setcurrentPageRows] = useState([]);
    const [PageDataCheck, setPageDataCheck] = useState(false);
    const [allPageSelected, setAllPageSelected] = useState([]);

    const [isSHovered, setIsHovered] = useState(false);

    const handleSEnter = () => { setIsHovered(true); };

    const handleSLeave = () => { setIsHovered(false); };

    const QtyHeader = [
        { id: "LOCATION_ID", label: "Location" },
        { id: "LOCATION_GROUP_ID", label: "Location Group" },
        { id: "ASSIGN_DEFAULT_WH", label: "Def WH" },
        { id: "ITEM_ID", label: allocDetails.length > 0 && allocDetails[0].ALLOC_LEVEL_CODE === 'D' ? "Style" : "Sku" },
        { id: "ITEM_DESC", label: "Description" },
        { id: "DIFF_ID", label: "Variant" },
        { id: "SKU_COUNT", label: "No of Sku's" },
        { id: "SOM_QTY", label: "Store Packs Qty" },
        { id: "TREND", label: "Trend" },
        { id: "WOS", label: "WOS" },
        { id: "MIN", label: "Min" },
        { id: "TRESHOLD", label: "Threshold" },
        { id: "MAX", label: "Max" },
        { id: "MIN_NEED", label: "Min Need" },
    ]
    var I_MODE = { "I_MODE": "New" }

    const theme = useTheme();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const classesName = useStyles1();
    const QuantityLimitsClasses = useStyles();

    const QuantityLimitsData = useSelector(
        (state) => state.QuantityLimitsReducers
    );

    const dispatch = useDispatch();

    useEffect(() => {
        document.title = 'Quantity Limits';
    }, []);

    var check = false;

    useEffect(() => {
        if (!check) {
            setLoading(true);
            // dispatch(getQTYLIMITSRequest([{ ...allocNoData, ...I_MODE }]));
            dispatch(getALLOCHEADDETAILSRequest([allocNoData]));
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
                    'LOCATION': "",
                    'GROUP_ID': "",
                    'DEFAULT_WH': "",
                    'ITEM': "",
                    'ITEM_DESC': "",
                    'DIFF_ID': "",
                    'SKU_COUNT': "",
                    'SOM_QTY': "",
                    'TREND': "",
                    'WOS': "",
                    'MIN': "",
                    'TRESHOLD': "",
                    'MAX': "",
                    'MIN_NEED': "",
                }

                let test = Object.assign(reorder, item);
                newTabledata.push(test);
            })
            // setTabledataclone(newTabledata)
            return newTabledata;
        }
    }



    if (limData.length > 0 && validCheckQtyData1) {
        setSelectedRow((serializedata(limData))[0].SR_NO)
        setQtyLimitsData(serializedata(limData));
        setTableData(serializedata(limData));
        setvalidCheckQtyData1(false);
        setPageDataCheck(true);
    } else if (limData.length === 0 && validCheckQtyData1) {
        // setOpenDialogQL(true);
        // setDialogDataQL("No data found");
        setvalidCheckQtyData1(false)
    }
    const startIndex = page * rowsPerPage;
    // const endIndex = startIndex + rowsPerPage;
    // const currentPageData = qtyLimitsData.length > 0 ? qtyLimitsData.slice(startIndex, endIndex) : [];

    if (qtyLimitsData.length > 0 && PageDataCheck) {
        const temp = qtyLimitsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
        setcurrentPageData(temp);
        setcurrentPageRows(temp);
        setPageDataCheck(false);
    }

    useEffect(() => {
        if (
            QuantityLimitsData?.data?.allocDetails
            && Array.isArray(QuantityLimitsData?.data?.allocDetails)
        ) {
            setAllocDetails(QuantityLimitsData?.data?.allocDetails);
            setLoading(false);
        } else if (
            QuantityLimitsData?.data?.qtyLimitsData
            && Array.isArray(QuantityLimitsData?.data?.qtyLimitsData)
        ) {
            setQtyLimitsData(serializedata(QuantityLimitsData?.data?.qtyLimitsData));
            setTableData(serializedata(QuantityLimitsData?.data?.qtyLimitsData))
            setLoading(false);
        } else if (
            QuantityLimitsData?.data?.updateQtyLimitsData
            // && Array.isArray(QuantityLimitsData?.data?.updateQtyLimitsData)
        ) {
            setUpdateQtyLimitsData(QuantityLimitsData?.data?.updateQtyLimitsData);
            setLoading(false);
        } else if (
            QuantityLimitsData?.data?.OkQtyLimitsData
            // && Array.isArray(QuantityLimitsData?.data?.allocNoDtl)
        ) {
            setOkQtyLimitsData(QuantityLimitsData?.data?.OkQtyLimitsData);
            setLoading(false);
            setLoadCheck(false)
        } else {
            setSearch(false);
        }
    }, [QuantityLimitsData?.data]);


    const onTableCellChange = (e, value) => {
        if (Object.is(e, null) === false) {
            if (String(e.target.value).length > 0) {
                if (e.target.value < 1 && e.target.value != "") {
                    qtyLimitsData.map((row) => {
                        if (row.SR_NO === value) {
                            row[e.target.name] = ""
                        }
                    })
                    setOpenDialogQL(true);
                    setDialogDataQL("Values should be greater than zero*");
                    setSampleVal([])
                }
                var ValueTarget = ""
                if (e.target.value !== "0") {
                    ValueTarget = e.target.value
                }
                const valid = /^\d+$/.test(ValueTarget)
                if (valid) {
                    qtyLimitsData.map((row) => {
                        if (row.SR_NO === value) {
                            row[e.target.name] = e.target.value
                        }
                    })
                }
                else {
                    qtyLimitsData.map((row) => {
                        if (row.SR_NO === value) {
                            row[e.target.name] = ""
                        }
                    })
                    setOpenDialogQL(true);
                    setDialogDataQL("Only Numberic values are accepted");
                }
            }
            else {
                qtyLimitsData.map((row) => {
                    if (row.SR_NO === value) {
                        row[e.target.name] = ""
                    }
                })
            }
        }
        setQtyLimitsData(qtyLimitsData);
        setTableData(qtyLimitsData);
        setSampleVal([])
    };

    // }, [inputValue]);

    ///////////////////////////////////////////
    /////////CSS functions////////////////////
    ///////////////////////////////////////////

    const styleSelect1 = {
        control: base => ({
            ...base,
            width: "250px",
            fontSize: "14px",
            margin: "0px 0px 10px 0px",
            // This line disable the blue border
            borderRadius: "0",
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
            // minHeight: '1px',
        }),
        option: provided => ({
            ...provided,
            // color: 'blue',
            fontSize: "12px",
        }),
    };

    const handleChangeSwitch = (event) => {
        setChecked(event.target.checked);
    };

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

    const testChange = (e) => {
        setInputValue((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
        setSampleVal((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
        setLoadCheck(true);
    }


    function EnhancedTableHead(props) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };
        //console.log("currentPageData",currentPageData)
        return (
            <>
                <TableHead className={QuantityLimitsData.TitleHead}
                    sx={{ position: "sticky", top: -1, }}
                >
                    <TableRow className={QuantityLimitsData.TitleRow}>
                        <StyledTableCell padding="checkbox" style={{
                            whiteSpace: "nowrap", padding: "0px", width: "10px"
                        }}
                        >
                            <Checkbox
                                disabled={ApproveFreeseCheck}
                                color="primary"
                                size="small"
                                // indeterminate={selected.length > 0 && selected.length < qtyLimitsData.length}
                                // checked={qtyLimitsData.length > 0 && selected.length === qtyLimitsData.length}
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
                                    // border: "1px solid black"
                                }}
                            />
                        </StyledTableCell>


                        {QtyHeader.map((headCell) => (ManageHeaderData.includes(headCell.id) &&
                            <StyledTableCell
                                key={headCell.id}
                                className={QuantityLimitsData.TableCell}
                                size="small"
                                sortDirection={orderBy === headCell.id ? order : false}
                                style={{
                                    whiteSpace: "nowrap", paddingLeft: "3px",
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
                    if (col === "ASSIGN_DEFAULT_WH") {
                        const temp = currentPageRows.filter((props) => String(props.ASSIGN_DEFAULT_WH).toLowerCase() === String(temp_dict.ASSIGN_DEFAULT_WH).toLowerCase())
                        setcurrentPageData(temp);
                    }
                    else if (col === "LOCATION_ID") {
                        const temp = currentPageRows.filter((props) => String(props.LOCATION_ID).toLowerCase() === String(temp_dict.LOCATION_ID).toLowerCase())
                        setcurrentPageData(temp);
                    }
                    else if (col === "LOCATION_GROUP_ID") {
                        const temp = currentPageRows.filter((props) => String(props.LOCATION_GROUP_ID).toLowerCase() === String(temp_dict.LOCATION_GROUP_ID).toLowerCase())
                        setcurrentPageData(temp);
                    }
                    else if (col === "ITEM_ID") {
                        const temp = currentPageRows.filter((props) => String(props.ITEM_ID).toLowerCase() === String(temp_dict.ITEM_ID).toLowerCase())
                        setcurrentPageData(temp);
                    }
                    else if (col === "DIFF_ID") {
                        const temp = currentPageRows.filter((props) => String(props.DIFF_ID).toLowerCase() === String(temp_dict.DIFF_ID).toLowerCase())
                        setcurrentPageData(temp);
                    }
                    else if (col === "SOM_QTY") {
                        const temp = currentPageRows.filter((props) => String(props.SOM_QTY).toLowerCase() === String(temp_dict.SOM_QTY).toLowerCase())
                        setcurrentPageData(temp);
                    }

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
            setcurrentPageData(currentPageRows);
        }
        setLoadCheck(false);
    }, [inputValue]);

    const SubmitValueList = () => {
        const temp = qtyLimitsData.filter(obj =>
            ((typeof obj.MIN === 'string' && obj.MIN.length > 0)
            ? parseInt(obj.MIN)
            : (typeof obj.MIN === 'string' && obj.MIN.length === 0)
                ? 0
                : obj.MIN) < ((typeof obj.MIN_NEED === 'string' && obj.MIN_NEED.length > 0)
                ? parseInt(obj.MIN_NEED)
                : (typeof obj.MIN_NEED === 'string' && obj.MIN_NEED.length === 0)
                    ? 0
                    : obj.MIN_NEED));
        
        if (temp.length > 0) {
            if (allocDetails[0].ALLOC_LEVEL_CODE !== "D") {
                setLoading(true);
                setLoadCheck(true)
                dispatch(getOKQTYLIMITSSRNRequest(qtyLimitsData));
                setvalidCheckQty(true);
                setRTabCond(false);
                setDisCond(0);
                setOkQtyLimitsData([]);
                setHeaderCheck(true);
            } else {
                setDialogOpen(true);
            }
        } else {
            setLoading(true);
            setLoadCheck(true)
            dispatch(getOKQTYLIMITSSRNRequest(qtyLimitsData));
            setvalidCheckQty(true);
            setRTabCond(false);
            setDisCond(0);
            setOkQtyLimitsData([]);
            setHeaderCheck(true);
        }
    }

    if (validCheckQty) {
        if (OkQtyLimitsData.status === 201) {
            setTab("1");
            setvalidCheckQty(false);
            setIsValidQtyLimits(true);
            setOpenDialog(true);
            setDialogData("Quantity Limits: " + String(OkQtyLimitsData.message));
        } else if (OkQtyLimitsData.status === 500) {
            setTab("1");
            setvalidCheckQty(false);
            setIsValidQtyLimits(true);
            setOpenDialog(true);
            setDialogData("Quantity Limits: " + String(OkQtyLimitsData.message));
        }
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
                    ...(qtyLimitsData.length > 0 &&
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
                {qtyLimitsData.length > 0 && (
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
                        Rows {selected.length} of {qtyLimitsData.length}
                    </Typography>
                )}
            </Toolbar>
        );
    }

    function descendingComparator(a, b, orderBy) {
        let c, d;
        if (orderBy == "LOCATION_DESC" || orderBy == "LOCATION_GROUP_DESC") {
            c = b[orderBy].slice(b[orderBy].indexOf("-") + 1);
            d = a[orderBy].slice(a[orderBy].indexOf("-") + 1);
            c = isNaN(c) ? c : parseInt(c);
            d = isNaN(d) ? d : parseInt(d);
            c = isNaN(c) ? 0 : parseInt(c);
            d = isNaN(d) ? 0 : parseInt(d);
        }
        else if (orderBy == "LOCATION_ID" || orderBy == "LOCATION_GROUP_ID" || orderBy == "SIZE_COUNT" ||
            orderBy == "MIN_NEED" || orderBy == "MIN" || orderBy == "MAX" ||
            orderBy == "WOS" || orderBy == "TREND" || orderBy == "TRESHOLD"
        ) {
            c = parseInt(b[orderBy]);
            d = parseInt(a[orderBy]);
            c = isNaN(c) ? 0 : parseInt(c);
            d = isNaN(d) ? 0 : parseInt(d);
        }
        else {
            c = isNaN(b[orderBy]) ? b[orderBy] : parseInt(b[orderBy]);
            d = isNaN(a[orderBy]) ? a[orderBy] : parseInt(a[orderBy]);
        }
        // //console.log("sort heck",typeof(c),d)
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
                sortedData.forEach((item, index) => { qtyLimitsData[startIndex + index] = item; });
                setcurrentPageData(sortedData);
            }
            if (order === "desc") {
                const sortedData = stableSort(currentPageData, getComparator("desc", sortValue));
                sortedData.forEach((item, index) => { qtyLimitsData[startIndex + index] = item; });
                setcurrentPageData(sortedData);
            }
            setSortCheck(false)
        }
    }, [currentPageData, order, orderBy]);

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
        const lastPage = Math.ceil((qtyLimitsData.length) / rowsPerPage);

        // const filteredArray = qtyLimitsData.slice((page * rowsPerPage),
        //     ((page * rowsPerPage) +
        //         (page === lastPage - 1 ? (qtyLimitsData.length - (page * rowsPerPage)) : rowsPerPage)
        //     ));
        const filteredArray = currentPageData
        const newSelected = filteredArray.map((n) => n.SR_NO);
        const pageselected = { [page]: newSelected };

        if (event.target.checked && (Object.keys(selected[0]).length > 0 && !Object.keys(selected[0]).includes(String(page)))
        ) {

            const sortedArray = ((selected && Object.keys(selected[0]).length > 0) ? [{ ...selected[0], ...pageselected }] : [pageselected]).sort((a, b) => {
                const keyA = Object.keys(a)[0];
                const keyB = Object.keys(b)[0];
                return keyA - keyB;
            });
            setSelected(sortedArray);
            const combinedList = Object.values(sortedArray[0]).flat()
            setAllPageSelected(combinedList);
            return;
        } else if (event.target.checked && Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) {
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
            const combinedList = Object.values(updatedArray[0]).flat()
            setAllPageSelected(combinedList)
            return;
        } else if (event.target.checked && (Object.keys(selected[0]).length === 0)) {

            setSelected([pageselected]);
            const combinedList = Object.values(pageselected).flat()
            setAllPageSelected(combinedList);
            return;
        }
        setSelected([{}]);
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
        const combinedList = Object.values(newSelected[0]).flat()
        setAllPageSelected(combinedList);
        setSelected(newSelected);
    };

    const isSelected = (name) => (Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) ? selected[0][page].indexOf(name) !== -1 : false;



    const handleChangeValue = (e) => {
        if (e) {
            const valid = /^\d+$/.test(e.target.value)
            if (e.target.value.length > 0) {
                if (valid) {
                    if (e.target.value === "0") {
                        setCopyValue((prev) => ({
                            ...prev,
                            [e.target.name]: "",
                        }))
                        setOpenDialogQL(true);
                        setDialogDataQL("Values should be greater than zero*");
                    }
                    else {
                        setCopyValue((prev) => ({
                            ...prev,
                            [e.target.name]: e.target.value,
                        }))
                    }

                }
                else {
                    setCopyValue((prev) => ({
                        ...prev,
                        [e.target.name]: "",
                    }))
                    setOpenDialogQL(true);
                    setDialogDataQL("Only Numberic values are accepted");
                }
            }
            else {
                setCopyValue((prev) => ({
                    ...prev,
                    [e.target.name]: "",
                }))
            }
        }
    }


    const handleCopyDown = (e) => {
        // //console.log("handleCopyDown:1:", e, selected, copyValue, tableData);
        for (const key in copyValue) {
            if (copyValue[key] === '') {
                delete copyValue[key];
            }
        }
        if (Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) {
            if (selected[0][page].length > 0) {
                const editData = tableData.filter((item) => {
                    return selected[0][page].some((val) => {
                        return item.SR_NO === val;
                    });
                });

                const copyUpdate = editData.map(item => {
                    Object.assign(item, copyValue);
                    return item;
                })

                // copyUpdate.map((obj) => {
                //     if (Object.keys(obj).includes("SR_NO")) {
                //         tableData.map((obj1) =>
                //             obj1["SR_NO"] === obj["SR_NO"]
                //         )
                //     }
                // })

                const updatedTableData = tableData.map(obj1 => {
                    const copyObj = copyUpdate.find(obj => obj["SR_NO"] === obj1["SR_NO"]);
                    return copyObj ? { ...obj1, ...copyObj } : obj1;
                });

                //console.log("handleCopyDown: ", copyUpdate, tableData, editData, selected[0][page], updatedTableData);

                setQtyLimitsData(updatedTableData)
                setTableData(updatedTableData)
            }
        }
        // setQtyLimitsData(copyUpdate)
        setSampleVal([]);
        if (Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) {
            if (selected[0][page].length > 0) {
                setLockCheck(false);
                setSampleVal(tableData);
                setCopyValue(initialCopyValues);
                setInputValue({});
                setInputValue1({});
            }
        }
        setPageDataCheck(true);
    }

    const handleLockFilter = (e) => {
        setLockCheck(true);
        // setCopyValue(initialCopyValues);
        // setInputValue1({})
    }

    ////////////////////////////////////////
    //////ERASER COMPLETE///////////////////////
    ////////////////////////////////////////

    const columnNames = ["TREND", "WOS", "MIN", "TRESHOLD", "MAX", "MIN_NEED"]

    const eraseVal = (e) => {
        for (const key in copyValue) {
            if (copyValue[key] === '') {
                delete copyValue[key];
            }
        }
        if (Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) {
            if (selected[0][page].length > 0) {
                const editData = tableData.filter((item) => {
                    return selected[0][page].some((val) => {
                        return item.SR_NO === val;
                    });
                });

                columnNames.map((name) => editData.map((row) => {
                    if (Object.keys(row).includes(name)) {
                        row[name] = ""
                    }
                }
                ))

                editData.map((obj) => {
                    if (Object.keys(obj).includes("SR_NO")) {
                        qtyLimitsData.filter((obj1) =>
                            obj1["SR_NO"] === obj["SR_NO"]

                        )
                    }
                })
                setQtyLimitsData(qtyLimitsData);
                setTableData(qtyLimitsData);
            }
        }
        setSampleVal([]);
        setSelectedRow(null);
    }

    ////////////////////////////////////////
    //////INDIVIDUAL ERASER///////////////////////
    ////////////////////////////////////////

    const eraseValTrend = (e) => {
        for (const key in copyValue) {
            if (copyValue[key] === '') {
                delete copyValue[key];
            }
        }

        if (Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) {
            if (selected[0][page].length > 0) {
                const editData = tableData.filter((item) => {
                    return selected[0][page].some((val) => {
                        return item.SR_NO === val;
                    });
                });

                editData.map((row) => {
                    if (Object.keys(row).includes("TREND")) {
                        row["TREND"] = ""
                    }
                }
                )

                editData.map((obj) => {
                    if (Object.keys(obj).includes("SR_NO")) {
                        qtyLimitsData.filter((obj1) =>
                            obj1["SR_NO"] === obj["SR_NO"]

                        )
                    }
                })
                setQtyLimitsData(qtyLimitsData);
                setTableData(qtyLimitsData);
            }
        }
        setSampleVal([]);
    }

    const eraseValWOS = (e) => {
        for (const key in copyValue) {
            if (copyValue[key] === '') {
                delete copyValue[key];
            }
        }
        if (Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) {
            if (selected[0][page].length > 0) {
                const editData = tableData.filter((item) => {
                    return selected[0][page].some((val) => {
                        return item.SR_NO === val;
                    });
                });

                editData.map((row) => {
                    if (Object.keys(row).includes("WOS")) {
                        row["WOS"] = ""
                    }
                }
                )

                editData.map((obj) => {
                    if (Object.keys(obj).includes("SR_NO")) {
                        const temp = qtyLimitsData.filter((obj1) =>
                            obj1["SR_NO"] === obj["SR_NO"]

                        )
                    }
                })
                setQtyLimitsData(qtyLimitsData);
                setTableData(qtyLimitsData);
            }
        }
        setSampleVal([]);
    }

    const eraseValMIN = (e) => {
        for (const key in copyValue) {
            if (copyValue[key] === '') {
                delete copyValue[key];
            }
        }

        if (Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) {
            if (selected[0][page].length > 0) {
                const editData = tableData.filter((item) => {
                    return selected[0][page].some((val) => {
                        return item.SR_NO === val;
                    });
                });

                editData.map((row) => {
                    if (Object.keys(row).includes("MIN")) {
                        row["MIN"] = ""
                    }
                }
                )

                editData.map((obj) => {
                    if (Object.keys(obj).includes("SR_NO")) {
                        const temp = qtyLimitsData.filter((obj1) =>
                            obj1["SR_NO"] === obj["SR_NO"]

                        )
                    }
                })
                setQtyLimitsData(qtyLimitsData);
                setTableData(qtyLimitsData);
            }
        }
        setSampleVal([]);
    }

    const eraseValTreshold = (e) => {
        for (const key in copyValue) {
            if (copyValue[key] === '') {
                delete copyValue[key];
            }
        }

        if (Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) {
            if (selected[0][page].length > 0) {
                const editData = tableData.filter((item) => {
                    return selected[0][page].some((val) => {
                        return item.SR_NO === val;
                    });
                });

                editData.map((row) => {
                    if (Object.keys(row).includes("TRESHOLD")) {
                        row["TRESHOLD"] = ""
                    }
                }
                )

                editData.map((obj) => {
                    if (Object.keys(obj).includes("SR_NO")) {
                        const temp = qtyLimitsData.filter((obj1) =>
                            obj1["SR_NO"] === obj["SR_NO"]

                        )
                    }
                })
                setQtyLimitsData(qtyLimitsData);
                setTableData(qtyLimitsData); setQtyLimitsData(editData)
            }
        }
        setSampleVal([]);
    }

    const eraseValMAX = (e) => {
        for (const key in copyValue) {
            if (copyValue[key] === '') {
                delete copyValue[key];
            }
        }

        if (Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) {
            if (selected[0][page].length > 0) {
                const editData = tableData.filter((item) => {
                    return selected[0][page].some((val) => {
                        return item.SR_NO === val;
                    });
                });

                editData.map((row) => {
                    if (Object.keys(row).includes("MAX")) {
                        row["MAX"] = ""
                    }
                }
                )

                editData.map((obj) => {
                    if (Object.keys(obj).includes("SR_NO")) {
                        const temp = qtyLimitsData.filter((obj1) =>
                            obj1["SR_NO"] === obj["SR_NO"]

                        )
                    }
                })
                setQtyLimitsData(qtyLimitsData);
                setTableData(qtyLimitsData);
            }
        }
        setSampleVal([]);
    }

    const eraseValMIN_NEED = (e) => {
        for (const key in copyValue) {
            if (copyValue[key] === '') {
                delete copyValue[key];
            }
        }

        if (Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) {
            if (selected[0][page].length > 0) {
                const editData = tableData.filter((item) => {
                    return selected[0][page].some((val) => {
                        return item.SR_NO === val;
                    });
                });

                editData.map((row) => {
                    if (Object.keys(row).includes("MIN_NEED")) {
                        row["MIN_NEED"] = ""
                    }
                }
                )

                editData.map((obj) => {
                    if (Object.keys(obj).includes("SR_NO")) {
                        const temp = qtyLimitsData.filter((obj1) =>
                            obj1["SR_NO"] === obj["SR_NO"]

                        )
                    }
                })
                setQtyLimitsData(qtyLimitsData);
                setTableData(qtyLimitsData);
            }
        }
        setSampleVal([]);
    }

    ////////////////////////////////////////////////////////////////////
    //////INDIVIDUAL INLINE FILTER COPY AND ERASER///////////////////////
    ///////////////////////////////////////////////////////////////////////


    const SearchButtonTrend = () => (
        [
            <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} disabled={ApproveFreeseCheck}>
                {LockCheck ?
                    <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }} onClick={handleCopyDown} disabled={ApproveFreeseCheck} />
                    : <LockIcon fontSize="small" sx={{ height: '0.6em', width: '0.6em' }} onClick={handleLockFilter}
                        disabled={ApproveFreeseCheck}
                    />}
            </IconButton>
            ,
            <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} disabled={ApproveFreeseCheck}>
                <BsFillEraserFill fontSize="small" onClick={eraseValTrend} disabled={ApproveFreeseCheck} />
            </IconButton>
        ]
    )

    const SearchButtonWOS = () => (
        [
            <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} disabled={ApproveFreeseCheck}>
                {LockCheck ?
                    <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }} onClick={handleCopyDown} disabled={ApproveFreeseCheck} />
                    : <LockIcon fontSize="small" sx={{ height: '0.6em', width: '0.6em' }} onClick={handleLockFilter}
                        disabled={ApproveFreeseCheck}
                    />}
            </IconButton>
            ,
            <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} disabled={ApproveFreeseCheck}>
                <BsFillEraserFill fontSize="small"
                    // onClick={eraseValWOS}
                    onClick={(e) => eraseValWOS(e)} disabled={ApproveFreeseCheck}
                />
            </IconButton>
        ]
    )

    const SearchButtonMIN = () => (
        [
            <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} disabled={ApproveFreeseCheck}>
                {LockCheck ?
                    <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }} onClick={handleCopyDown} disabled={ApproveFreeseCheck} />
                    : <LockIcon fontSize="small" sx={{ height: '0.6em', width: '0.6em' }} onClick={handleLockFilter}
                        disabled={ApproveFreeseCheck}
                    />}
            </IconButton>
            ,
            <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} disabled={ApproveFreeseCheck}>
                <BsFillEraserFill fontSize="small" onClick={eraseValMIN} disabled={ApproveFreeseCheck} />
            </IconButton>
        ]
    )

    const SearchButtonTreshold = () => (
        [
            <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} disabled={ApproveFreeseCheck}>
                {LockCheck ?
                    <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }} onClick={handleCopyDown} disabled={ApproveFreeseCheck} />
                    : <LockIcon fontSize="small" sx={{ height: '0.6em', width: '0.6em' }} onClick={handleLockFilter}
                        disabled={ApproveFreeseCheck}
                    />}
            </IconButton>
            ,
            <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} disabled={ApproveFreeseCheck}>
                <BsFillEraserFill fontSize="small" onClick={eraseValTreshold} disabled={ApproveFreeseCheck} />
            </IconButton>
        ]
    )

    const SearchButtonMAX = () => (
        [
            <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} disabled={ApproveFreeseCheck}>
                {LockCheck ?
                    <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }} onClick={handleCopyDown} disabled={ApproveFreeseCheck} />
                    : <LockIcon fontSize="small" sx={{ height: '0.6em', width: '0.6em' }} onClick={handleLockFilter}
                        disabled={ApproveFreeseCheck}
                    />}
            </IconButton>
            ,
            <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} disabled={ApproveFreeseCheck}>
                <BsFillEraserFill fontSize="small" onClick={eraseValMAX} disabled={ApproveFreeseCheck} />
            </IconButton>
        ]
    )

    const SearchButtonMIN_NEED = () => (
        [
            <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} disabled={ApproveFreeseCheck}>
                {LockCheck ?
                    <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }} onClick={handleCopyDown} disabled={ApproveFreeseCheck} />
                    : <LockIcon fontSize="small" sx={{ height: '0.6em', width: '0.6em' }} onClick={handleLockFilter}
                        disabled={ApproveFreeseCheck}
                    />}
            </IconButton>
            ,
            <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} disabled={ApproveFreeseCheck}>
                <BsFillEraserFill fontSize="small" onClick={eraseValMIN_NEED} disabled={ApproveFreeseCheck} />
            </IconButton>
        ]
    )

    ////////////////////////////////////////
    //////HTML HEADER///////////////////////
    ////////////////////////////////////////
    const SearchButtonHeaderDesc = () => (
        <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} >
            <InfoIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em', color: "CadetBlue" }}
                onClick={() => {
                    setOpenDialogQL(true);
                    setDialogDataQL(String(allocDetails[0].ALLOC_DESC));
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
                width: "100%",
                borderRadius: 1,

                boxShadow: 2, border: 0,
                borderBottom: 3,
                border: "1px solid lightgrey",
                // width: "100%",
            }}
        >

            <legend style={{ fontWeight: "bold" }}>Header</legend>

            <div className={QuantityLimitsClasses.header_container}>
                <div className={QuantityLimitsClasses.header_child}>
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
                                className: QuantityLimitsClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={QuantityLimitsClasses.header_child}>
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
                            value={allocDetails[0].ALLOC_DESC}
                            defaultValue={allocDetails[0].ALLOC_DESC}
                            // onChange={onChange}
                            inputProps={{
                                maxLength: 100,
                            }}
                            InputProps={{
                                endAdornment: <SearchButtonHeaderDesc />,
                                className: QuantityLimitsClasses.input,
                                style: { fontSize: 12, height: "30px", backgroundColor: "#f0f0f0", },
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={QuantityLimitsClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
                            Alloc Context</InputLabel>
                    </div>
                    <div className={QuantityLimitsClasses.multiselectfield}>
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

                            value={allocDetails[0].CONTEXT}
                            defaultValue={allocDetails[0].CONTEXT}
                            inputProps={{
                                maxLength: 100, sx: { backgroundColor: "#f0f0f0", },
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: QuantityLimitsClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                {allocDetails[0].CONTEXT === "Promotion" ?
                    [
                        <div className={QuantityLimitsClasses.header_child}>
                            <div>
                                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
                                    Promotion</InputLabel>
                            </div>
                            <div className={QuantityLimitsClasses.multiselectfield}>
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

                                    value={allocDetails[0].PROMOTION}
                                    defaultValue={allocDetails[0].PROMOTION}
                                    inputProps={{
                                        maxLength: 100,
                                    }}
                                    InputProps={{
                                        style: { fontSize: 12 },
                                        className: QuantityLimitsClasses.input,
                                    }}
                                    disabled
                                />
                            </div>
                        </div>
                    ] : null}


                <div className={QuantityLimitsClasses.header_child}>
                    <div >
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
                            Alloc Level</InputLabel>
                    </div>
                    <div className={QuantityLimitsClasses.multiselectfield}>
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

                            value={allocDetails[0].ALLOC_LEVEL}
                            defaultValue={allocDetails[0].ALLOC_LEVEL}
                            inputProps={{
                                maxLength: 100,
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: QuantityLimitsClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={QuantityLimitsClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
                            Release Date</InputLabel>
                    </div>
                    <div>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 0px", width: "140px"
                                , "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "5px",
                                    height: "15px",
                                }
                            }}
                            id="outlined-disabled"
                            name="RELEASE_DATE"

                            value={allocDetails[0].RELEASE_DATE}
                            defaultValue={allocDetails[0].RELEASE_DATE}
                            inputProps={{
                                maxLength: 100,
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: QuantityLimitsClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={QuantityLimitsClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
                            Status</InputLabel>
                    </div>
                    <div className={QuantityLimitsClasses.multiselectfield}>
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
                            value={allocDetails[0].STATUS}
                            defaultValue={allocDetails[0].STATUS}
                            id="outlined-disabled"
                            InputProps={{
                                style: { fontSize: 12 },
                                className: QuantityLimitsClasses.input,
                            }}
                        />
                    </div>
                </div>

                <div className={QuantityLimitsClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
                            Alloc Type</InputLabel>
                    </div>
                    <div className={QuantityLimitsClasses.multiselectfield}>
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

                            value={allocDetails[0].ALLOC_TYPE}
                            defaultValue={allocDetails[0].ALLOC_TYPE}
                            inputProps={{
                                maxLength: 100,
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: QuantityLimitsClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={QuantityLimitsClasses.header_child}>
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
                            value={allocDetails[0].ALLOCATOR}
                            defaultValue={allocDetails[0].ALLOCATOR}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: QuantityLimitsClasses.input,
                            }}
                        />
                    </div>
                </div>
            </div>
        </Box>
    )


    const handleCancel = () => {
        setTableData([]);
        setQtyLimitsData([]);
        setInputValue([]);
        setSelected([]);
        setAllPageSelected([]);
        setCopyValue([]);
        setOkQtyLimitsData([]);
        setSampleVal([]);
        setTab('1');
        setRTabCond(false);
        setDisCond(0);
        setChecked(true)
        setHeaderCheck(true)
        //window.location.reload();
    }

    const resetFilter = () => {
        setInputValue([]);
        setInputValue1({});
        setTableData(tableData);
        setSampleVal(tableData);
        setCopyValue(initialCopyValues);
        setInputValue({});
        setInputValue1({})
        setLockCheck(false);
    }

    const handleInlineFilters = (e, name) => {
        if (e) {
            setInputValue1((prev) => ({
                ...prev,
                [e.target.name]: e.target.value
            }))
        }
    }

    useEffect(() => {
        if (inputValue1) {
            for (const key in inputValue1) {
                if (inputValue1[key] === '') {
                    delete inputValue1[key];
                }
            }
        }
        if (inputValue1) {
            if (tableData.length > 0) {
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
    }, [inputValue1]);

    const ViewModeFunction = () => {
        setTab('1');
        setRTabCond(false);
        setDisCond(0);
    }
    const handleRowClick = (rowId) => {
        setSelectedRow(rowId);
    };

    const handleDialogClose = (e) => {
        setDialogOpen(false)
    }
    const handleDialogOk = (e) => {
        setLoading(true);
        setLoadCheck(true);
        dispatch(getOKQTYLIMITSSRNRequest(qtyLimitsData));
        setvalidCheckQty(true);
        setRTabCond(false);
        setDisCond(0);
        setOkQtyLimitsData([]);
        setHeaderCheck(true);
        setDialogOpen(false)
    }
    const handleCloseDialog = (e) => {
        setOpenDialogQL(false);
        setDialogDataQL("");
    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        const temp = qtyLimitsData.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
        setcurrentPageData(temp);
        setcurrentPageRows(temp);
        setInputValue([]);
        setInputValue1({});
        setSampleVal(tableData);
        setCopyValue(initialCopyValues);
        setLockCheck(false);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    /*
         #################################################
         ##########  MANAGE COLUMNS IN TABLE  ############
         #################################################
   */

    if (ManageHeaderCheck) {
        var temp = []
        QtyHeader.map(row => temp.push(row.id));
        const temp1 = ['LOCATION_GROUP_ID', 'SKU_COUNT']
        const temp2 = temp.filter(value => !temp1.includes(value));
        setManageHeaderData(temp2);
        setManageHeaderCheck(false);
    }

    const HandleManageHeader = () => {
        setOpenDialogManage(true);
    }
    const handleCloseDialogManage = (e) => {
        if (ManageHeaderData.length > 0) { setOpenDialogManage(false); }
        else { setOpenDialogQL(true); setDialogDataQL("Table must contain atleast one column."); }
    }

    const handleManageHeaderClick = (e, name) => {
        if (e.target.checked === true) {
            const updatedManageHeaderData = [...ManageHeaderData, name];
            setManageHeaderData(updatedManageHeaderData)
        } else {
            const updatedManageHeaderData = ManageHeaderData.filter(item => item !== name);
            setManageHeaderData(updatedManageHeaderData)
        }
    }

    const handleShowAllManageHeader = () => {
        var temp = []
        QtyHeader.map(row => temp.push(row.id));
        setManageHeaderData(temp);
    }

    const headerManage = () => (
        <Box display="inline-block"
            sx={{ backgroundColor: "", height: "auto", padding: "0rem 0rem", width: "100%", }}>
            <div>
                {QtyHeader.map((key) => (
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


    return (
        <Box className={QuantityLimitsClasses.maindiv} sx={{ width: "99.5%" }}>
            <div className={QuantityLimitsClasses.course_box} >
                {SearchHeader()}
            </div>

            <div className={QuantityLimitsClasses.course_box} >
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
                        marginTop: "5px",
                    }}
                >
                    {/* <div sx={{ display: "flex", flexDirection: "row" }}>
                        <Grid id="top-row" container spacing={0}> */}
                    <div className={QuantityLimitsClasses.course_box}>
                        <div className={QuantityLimitsClasses.grid_block}>

                            <Box
                                display="flex"
                                sx={{
                                    backgroundColor: "",
                                    margin: "10px 0px 0px 5px",
                                    justifyContent: "space-between"
                                }}
                            >
                                <div>
                                    {/* <div >
                                        <FormControlLabel
                                            size="small"
                                            sx={{
                                                margin: "0px",
                                                padding: "0px"
                                            }}
                                            control={
                                                <Switch
                                                    size="small"
                                                    disabled
                                                    // checked={checked?false:true}
                                                    onChange={handleChangeSwitch}
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
                                                    float: 'left'
                                                }}>
                                                Include Inventory - Minimum</InputLabel>}
                                        />
                                    </div>

                                    <div>
                                        <FormControlLabel
                                            size="small"
                                            sx={{
                                                margin: "0px",
                                                padding: "0px"
                                            }}
                                            control={
                                                <Switch
                                                    size="small"
                                                    disabled
                                                    // checked={checked?false:true}
                                                    onChange={handleChangeSwitch}
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
                                                    float: 'left'
                                                }}>
                                                Include Inventory - Maximum</InputLabel>}
                                        />
                                    </div> */}
                                </div>

                                <div>
                                    <div className={QuantityLimitsClasses.float_child}>
                                        <Button sx={{
                                            backgroundColor: "#228B22", fontSize: "12px", margin: "0px 5px 0px 0px", width: "100px",
                                            '&:hover': {
                                                backgroundColor: '#3CB371', // Change this to the desired "light maroon" color
                                            },
                                        }}
                                            variant="contained"
                                            // className={QuantityLimitsData.textField}
                                            type="submit"
                                            onClick={ApproveFreeseCheck ? ViewModeFunction : SubmitValueList}
                                            startIcon={<DoneAllIcon />}
                                        >
                                            Ok</Button>

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

                                        <Button sx={{
                                            backgroundColor: "maroon", fontSize: "12px", margin: "0px 5px 0px 0px", width: "100px",

                                            '&:hover': {
                                                backgroundColor: '#8B0000', // Change this to the desired "light maroon" color
                                            },
                                        }}
                                            variant="contained"
                                            // className={QuantityLimitsData.textField}
                                            type="submit"
                                            onClick={ApproveFreeseCheck ? ViewModeFunction : handleCancel}
                                            startIcon={<CancelIcon />}
                                        >
                                            Cancel</Button>

                                        <Button
                                            sx={{
                                                backgroundColor: "", fontSize: "12px", margin: "0px 0px 0px 0px", width: "130px",
                                                '&.Mui-disabled': {
                                                    opacity: 0.5,
                                                    backgroundColor: 'DodgerBlue',
                                                    color: '#fff',
                                                },
                                            }}
                                            variant="contained"
                                            // className={QuantityLimitsData.textField}
                                            type="submit"
                                            onClick={eraseVal}
                                            disabled={ApproveFreeseCheck}
                                            startIcon={<ClearAllIcon />}
                                        >
                                            Clear All</Button>

                                    </div>
                                </div>
                            </Box>

                        </div>
                        <div className={QuantityLimitsClasses.grid_block}>
                            <Box display="flex" justifyContent="space-between" sx={{}}>
                                <InputLabel sx={{
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                    margin: "2px 0px 10px 5px",
                                    display: 'inline',
                                    float: 'left',
                                    color: "black",
                                }}>
                                    Sku Quantity Limits</InputLabel>

                                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <div
                                        style={{
                                            flex: "1",
                                            backgroundColor: isSHovered ? '#f5f5f5' : 'white',
                                            borderRadius: '20%',
                                            padding: "0px 8px 0px 8px",
                                            margin: "2px 0px 0px 2px",
                                            // border: "1px solid red",
                                            height: "30px", minHeight: "30px",
                                        }}
                                        title="Manage Columns"
                                        onMouseEnter={handleSEnter}
                                        onMouseLeave={handleSLeave}
                                    >
                                        <ViewColumnIcon style={{ padding: "0px", backgroundColor: isSHovered ? '#f5f5f5' : 'white', marginTop: "2px", color: "DodgerBlue" }} onClick={HandleManageHeader} title="Manage Columns" />
                                    </div>
                                </div>
                                {/* <Button
                                    autoFocus
                                    variant="contained"
                                    onClick={HandleManageHeader}
                                    sx={{
                                        backgroundColor: "",
                                        padding: "0px",
                                        margin: "2px 2px 2px 0px",
                                        alignItems: "center",
                                        width: "fit-content",
                                        // border: "1px solid yellow",
                                    }}
                                    title="Manage Columns"
                                ><ViewColumnIcon style={{ padding: "0px" }} /></Button> */}
                            </Box>
                        </div>

                        <div >
                            <Paper sx={{ width: '100%', mb: 0, height: "auto", padding: "0px", margin: "0px", top: 0 }}
                            >
                                <TableContainer style={{ maxHeight: 515, padding: "0px", margin: "0px", top: 0, marginTop: "0px" }} component={Paper}>
                                    <Table >
                                        <EnhancedTableHead
                                            numSelected={selected.length}
                                            order={order}
                                            orderBy={orderBy}
                                            onSelectAllClick={handleSelectAllClick}
                                            onRequestSort={handleRequestSort}
                                            rowCount={qtyLimitsData.length}
                                        />
                                        <TableBody
                                        >
                                            <TableCell padding="checkbox" sx={{ padding: "0px", width: "10px" }} >
                                                <Grid item xs={1} style={{ padding: "0px", margin: "0px 0px 0px 0px" }}>
                                                    <IconButton small="small" onClick={resetFilter} sx={{ padding: "0px" }}>
                                                        <RestartAltIcon small="small" sx={{ padding: "0px" }} />
                                                    </IconButton>
                                                </Grid>
                                            </TableCell>

                                            {ManageHeaderData.includes('LOCATION_ID') ?
                                                <TableCell sx={{
                                                    padding: "0px",
                                                }}>
                                                    <TextField
                                                        name="LOCATION_ID"
                                                        onChange={testChange}
                                                        value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("LOCATION_ID") > 0 ? inputValue.LOCATION_ID : ""}
                                                        placeholder="Location"
                                                        disabled={LockCheck}
                                                        autoComplete="off"
                                                        InputProps={{
                                                            sx: { fontSize: 12, padding: "0px", height: "20px", textAlign: "left", }
                                                        }}
                                                        sx={{ width: "100%" }}
                                                        variant="standard"
                                                        inputProps={{
                                                            // maxLength: 5,
                                                            sx: { fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, },
                                                        }}
                                                    />
                                                </TableCell> : null}

                                            {ManageHeaderData.includes('LOCATION_GROUP_ID') ?
                                                <TableCell sx={{
                                                    padding: "0px"
                                                    , height: "auto"
                                                }}>
                                                    <TextField
                                                        name="LOCATION_GROUP_ID"
                                                        onChange={testChange}
                                                        value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("LOCATION_GROUP_ID") > 0 ? inputValue.LOCATION_GROUP_ID : ""}
                                                        placeholder="Location Group"
                                                        autoComplete="off"
                                                        disabled={LockCheck}
                                                        InputProps={{
                                                            style: { fontSize: 12, height: "20px" },
                                                        }}
                                                        variant="standard"
                                                        inputProps={{
                                                            // maxLength: 5,
                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                        }}
                                                    />
                                                </TableCell> : null}

                                            {ManageHeaderData.includes('ASSIGN_DEFAULT_WH') ?
                                                <TableCell sx={{
                                                    padding: "0px"
                                                    , height: "auto"
                                                }}>
                                                    <TextField
                                                        name="ASSIGN_DEFAULT_WH"
                                                        onChange={testChange}
                                                        value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("ASSIGN_DEFAULT_WH") > 0 ? inputValue.ASSIGN_DEFAULT_WH : ""}
                                                        autoComplete="off"
                                                        placeholder="Def WH"
                                                        disabled={LockCheck}
                                                        InputProps={{
                                                            style: { fontSize: 12, height: "20px", textAlign: "left", },
                                                        }}
                                                        variant="standard"
                                                        inputProps={{
                                                            // maxLength: 5,
                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                        }}
                                                    />
                                                </TableCell> : null}

                                            {ManageHeaderData.includes('ITEM_ID') ?
                                                <TableCell sx={{
                                                    padding: "0px"
                                                    , height: "auto"
                                                }}>
                                                    <TextField
                                                        name="ITEM_ID"
                                                        onChange={testChange}
                                                        value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("ITEM_ID") > 0 ? inputValue.ITEM_ID : ""}
                                                        autoComplete="off"
                                                        placeholder={allocDetails.length > 0 && allocDetails[0].ALLOC_LEVEL_CODE === 'D' ? "Style" : "Sku"}
                                                        disabled={LockCheck}
                                                        InputProps={{
                                                            style: { fontSize: 12, height: "20px", textAlign: "left", },
                                                        }}
                                                        variant="standard"
                                                        inputProps={{
                                                            // maxLength: 5,
                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                        }}
                                                    />
                                                </TableCell> : null}

                                            {ManageHeaderData.includes('ITEM_DESC') ?
                                                <TableCell sx={{
                                                    padding: "0px"
                                                    , height: "auto"
                                                }}>
                                                    <TextField
                                                        name="ITEM_DESC"
                                                        onChange={testChange}
                                                        value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("ITEM_DESC") > 0 ? inputValue.ITEM_DESC : ""}
                                                        autoComplete="off"
                                                        placeholder="Description"
                                                        disabled={LockCheck}
                                                        InputProps={{
                                                            style: { fontSize: 12, height: "20px" },
                                                        }}
                                                        variant="standard"
                                                        inputProps={{
                                                            // maxLength: 5,
                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                        }}
                                                    />
                                                </TableCell> : null}

                                            {ManageHeaderData.includes('DIFF_ID') ?
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
                                                        disabled={LockCheck}
                                                        InputProps={{
                                                            style: { fontSize: 12, height: "20px" },
                                                        }}
                                                        variant="standard"
                                                        inputProps={{
                                                            // maxLength: 5,
                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                        }}
                                                    />
                                                </TableCell> : null}

                                            {ManageHeaderData.includes('SKU_COUNT') ?
                                                <TableCell sx={{
                                                    padding: "0px"
                                                    , height: "auto"
                                                }}>
                                                    <TextField
                                                        name="SKU_COUNT"
                                                        onChange={testChange}
                                                        value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("SKU_COUNT") > 0 ? inputValue.SKU_COUNT : ""}
                                                        autoComplete="off"
                                                        placeholder="No of Sku's"
                                                        disabled={LockCheck}
                                                        InputProps={{
                                                            style: { fontSize: 12, height: "20px" },
                                                        }}
                                                        variant="standard"
                                                        inputProps={{
                                                            // maxLength: 5,
                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                        }}
                                                    />
                                                </TableCell> : null}

                                            {ManageHeaderData.includes('SOM_QTY') ?
                                                <TableCell sx={{
                                                    padding: "0px"
                                                    , height: "auto"
                                                }}>
                                                    <TextField
                                                        name="SOM_QTY"
                                                        onChange={testChange}
                                                        value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("SOM_QTY") > 0 ? inputValue.SOM_QTY : ""}
                                                        autoComplete="off"
                                                        placeholder="Store Packs Qty"
                                                        disabled={LockCheck}
                                                        InputProps={{
                                                            style: { fontSize: 12, height: "20px" },
                                                        }}
                                                        variant="standard"
                                                        inputProps={{
                                                            // maxLength: 5,
                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                        }}
                                                    />
                                                </TableCell> : null}

                                            {ManageHeaderData.includes('TREND') ?
                                                <TableCell sx={{
                                                    padding: "0px"
                                                    , height: "auto"
                                                }}>
                                                    <TextField
                                                        name="TREND"
                                                        onChange={LockCheck ? handleChangeValue : handleInlineFilters}
                                                        autoComplete="off"
                                                        variant="standard"
                                                        placeholder="Trend"
                                                        InputProps={{ endAdornment: <SearchButtonTrend />, style: { fontSize: 12, height: "20px" } }}
                                                        inputProps={{
                                                            maxLength: 12,
                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                        }}
                                                        value={LockCheck ?
                                                            Object.keys(copyValue).length > 0 && Object.keys(copyValue).includes("TREND") > 0 ? copyValue.TREND : "" :
                                                            Object.keys(inputValue1).length > 0 && Object.keys(inputValue1).includes("TREND") > 0 ? inputValue1.TREND : ""
                                                        }
                                                    />
                                                </TableCell> : null}

                                            {ManageHeaderData.includes('WOS') ?
                                                <TableCell sx={{
                                                    padding: "0px"
                                                    , height: "auto"
                                                }}>
                                                    <TextField
                                                        name="WOS"
                                                        onChange={LockCheck ? handleChangeValue : handleInlineFilters}
                                                        autoComplete="off"
                                                        variant="standard"
                                                        placeholder="WOS"
                                                        InputProps={{ endAdornment: <SearchButtonWOS />, style: { fontSize: 12, height: "20px" } }}
                                                        inputProps={{
                                                            maxLength: 12,
                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                        }}
                                                        value={LockCheck ?
                                                            Object.keys(copyValue).length > 0 && Object.keys(copyValue).includes("WOS") > 0 ? copyValue.WOS : "" :
                                                            Object.keys(inputValue1).length > 0 && Object.keys(inputValue1).includes("WOS") > 0 ? inputValue1.WOS : ""
                                                        }
                                                    />
                                                </TableCell> : null}

                                            {ManageHeaderData.includes('MIN') ?
                                                <TableCell sx={{
                                                    padding: "0px"
                                                    , height: "auto"
                                                }}>
                                                    <TextField
                                                        name="MIN"
                                                        onChange={LockCheck ? handleChangeValue : handleInlineFilters}
                                                        autoComplete="off"
                                                        variant="standard"
                                                        placeholder="Min"
                                                        InputProps={{ endAdornment: <SearchButtonMIN />, style: { fontSize: 12, height: "20px" } }}
                                                        inputProps={{
                                                            maxLength: 12,
                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                        }}
                                                        value={LockCheck ?
                                                            Object.keys(copyValue).length > 0 && Object.keys(copyValue).includes("MIN") > 0 ? copyValue.MIN : "" :
                                                            Object.keys(inputValue1).length > 0 && Object.keys(inputValue1).includes("MIN") > 0 ? inputValue1.MIN : ""
                                                        }
                                                    />
                                                </TableCell> : null}

                                            {ManageHeaderData.includes('TRESHOLD') ?
                                                <TableCell sx={{
                                                    padding: "0px"
                                                    , height: "auto"
                                                }}>
                                                    <TextField
                                                        name="TRESHOLD"
                                                        onChange={LockCheck ? handleChangeValue : handleInlineFilters}
                                                        autoComplete="off"
                                                        variant="standard"
                                                        placeholder="Treshold"
                                                        InputProps={{ endAdornment: <SearchButtonTreshold />, style: { fontSize: 12, height: "20px" } }}
                                                        inputProps={{
                                                            maxLength: 12,
                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                        }}
                                                        value={LockCheck ?
                                                            Object.keys(copyValue).length > 0 && Object.keys(copyValue).includes("TRESHOLD") > 0 ? copyValue.TRESHOLD : "" :
                                                            Object.keys(inputValue1).length > 0 && Object.keys(inputValue1).includes("TRESHOLD") > 0 ? inputValue1.TRESHOLD : ""
                                                        }
                                                    />
                                                </TableCell> : null}

                                            {ManageHeaderData.includes('MAX') ?
                                                <TableCell sx={{
                                                    padding: "0px"
                                                    , height: "auto"
                                                }}>
                                                    <TextField
                                                        name="MAX"
                                                        onChange={LockCheck ? handleChangeValue : handleInlineFilters}
                                                        autoComplete="off"
                                                        variant="standard"
                                                        placeholder="Max"
                                                        InputProps={{ endAdornment: <SearchButtonMAX />, style: { fontSize: 12, height: "20px" } }}
                                                        inputProps={{
                                                            maxLength: 12,
                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                        }}
                                                        value={LockCheck ?
                                                            Object.keys(copyValue).length > 0 && Object.keys(copyValue).includes("MAX") > 0 ? copyValue.MAX : "" :
                                                            Object.keys(inputValue1).length > 0 && Object.keys(inputValue1).includes("MAX") > 0 ? inputValue1.MAX : ""
                                                        }
                                                    />
                                                </TableCell> : null}

                                            {ManageHeaderData.includes('MIN_NEED') ?
                                                <TableCell sx={{
                                                    padding: "0px"
                                                    , height: "auto"
                                                }}>
                                                    <TextField
                                                        name="MIN_NEED"
                                                        onChange={LockCheck ? handleChangeValue : handleInlineFilters}
                                                        autoComplete="off"
                                                        variant="standard"
                                                        placeholder="Min Need"
                                                        InputProps={{ endAdornment: <SearchButtonMIN_NEED />, style: { fontSize: 12, height: "20px" } }}
                                                        inputProps={{
                                                            maxLength: 12,
                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                        }}
                                                        value={LockCheck ?
                                                            Object.keys(copyValue).length > 0 && Object.keys(copyValue).includes("MIN_NEED") > 0 ? copyValue.MIN_NEED : "" :
                                                            Object.keys(inputValue1).length > 0 && Object.keys(inputValue1).includes("MIN_NEED") > 0 ? inputValue1.MIN_NEED : ""
                                                        }
                                                    />
                                                </TableCell> : null}
                                        </TableBody>

                                        <TableBody
                                        // sx={{ height: "auto",border:"2px solid green" }}
                                        >

                                            {/* {stableSort(qtyLimitsData, getComparator(order, orderBy))
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
                                            {currentPageData
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
                                                            onClick={() => handleRowClick(row.SR_NO)}
                                                            style={selectedRow === row.SR_NO ? { backgroundColor: "#CDF0FF" } : null}
                                                        >
                                                            <TableCell padding="checkbox" sx={{ padding: "0px", textAlign: "center", fontSize: "12px", width: "10px" }}>
                                                                <Checkbox
                                                                    disabled={ApproveFreeseCheck}
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

                                                            {ManageHeaderData.includes('LOCATION_ID') ?
                                                                <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px", height: "22px", }}>
                                                                    {/* <Box sx={{ display: 'flex', justifyContent: 'flex-start', whiteSpace: "nowrap" }}> */}
                                                                    {row.LOCATION_ID}
                                                                    {/* </Box> */}
                                                                </TableCell> : null}

                                                            {ManageHeaderData.includes('LOCATION_GROUP_ID') ?
                                                                <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}>
                                                                    {row.LOCATION_GROUP_ID}
                                                                </TableCell> : null}

                                                            {ManageHeaderData.includes('ASSIGN_DEFAULT_WH') ?
                                                                <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }} >
                                                                    {row.ASSIGN_DEFAULT_WH}
                                                                </TableCell> : null}

                                                            {ManageHeaderData.includes('ITEM_ID') ?
                                                                <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}>
                                                                    {row.ITEM_ID}
                                                                </TableCell> : null}

                                                            {ManageHeaderData.includes('ITEM_DESC') ?
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
                                                                            {row.ITEM_DESC}
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
                                                                            className={QuantityLimitsClasses.textField}
                                                                            onClick={() => {
                                                                                setOpenDialogQL(true);
                                                                                setDialogDataQL(String(row.ITEM_DESC));
                                                                            }}
                                                                            startIcon={<InfoIcon style={{ fontSize: 16, backgroundColor: "" }} />}
                                                                        >
                                                                        </Button>
                                                                    </Box>
                                                                </TableCell>
                                                                : null}

                                                            {ManageHeaderData.includes('DIFF_ID') ?
                                                                <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}>
                                                                    {row.DIFF_ID}
                                                                </TableCell> : null}

                                                            {ManageHeaderData.includes('SKU_COUNT') ?
                                                                <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}>
                                                                    {row.SKU_COUNT}
                                                                </TableCell> : null}

                                                            {ManageHeaderData.includes('SOM_QTY') ?
                                                                <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}>
                                                                    {row.SOM_QTY}
                                                                </TableCell> : null}

                                                            {ManageHeaderData.includes('TREND') ?
                                                                <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                                                    <TextField
                                                                        InputProps={{
                                                                            style: { fontSize: 12, height: "22px", padding: "0px", margin: "0px" },
                                                                        }}
                                                                        sx={{ width: "100%" }}
                                                                        name="TREND"
                                                                        onChange={(e) => onTableCellChange(e, row.SR_NO)}
                                                                        autoComplete="off"
                                                                        inputProps={{
                                                                            maxLength: 20,
                                                                            sx: { backgroundColor: '#fff', padding: "0px 0px 0px 5px", height: "22px", textAlign: "left", }
                                                                        }}
                                                                        disabled={ApproveFreeseCheck}
                                                                        value={row.TREND}
                                                                        defaultValue={row.TREND}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderData.includes('WOS') ?
                                                                <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                                                    <TextField
                                                                        InputProps={{
                                                                            style: { fontSize: 12, height: "22px" },
                                                                        }}
                                                                        disabled={ApproveFreeseCheck}
                                                                        name="WOS"
                                                                        sx={{ width: "100%" }}
                                                                        onChange={(e) => onTableCellChange(e, row.SR_NO)}
                                                                        autoComplete="off"
                                                                        inputProps={{
                                                                            maxLength: 20,
                                                                            sx: { backgroundColor: '#fff', padding: "0px 0px 0px 5px", height: "22px", textAlign: "left", }
                                                                        }}
                                                                        value={row.WOS}
                                                                        defaultValue={row.WOS}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderData.includes('MIN') ?
                                                                <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                                                    <TextField
                                                                        InputProps={{
                                                                            style: { fontSize: 12, height: "22px" },
                                                                        }}
                                                                        disabled={ApproveFreeseCheck}
                                                                        name="MIN"
                                                                        sx={{ width: "100%" }}
                                                                        onChange={(e) => onTableCellChange(e, row.SR_NO)}
                                                                        autoComplete="off"
                                                                        inputProps={{
                                                                            maxLength: 20,
                                                                            sx: { backgroundColor: '#fff', padding: "0px 0px 0px 5px", height: "22px", textAlign: "left", }
                                                                        }}
                                                                        value={row.MIN}
                                                                        defaultValue={row.MIN}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderData.includes('TRESHOLD') ?
                                                                <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                                                    <TextField
                                                                        InputProps={{
                                                                            style: { fontSize: 12, height: "22px" },
                                                                        }}
                                                                        disabled={ApproveFreeseCheck}
                                                                        name="TRESHOLD"
                                                                        onChange={(e) => onTableCellChange(e, row.SR_NO)}
                                                                        autoComplete="off"
                                                                        sx={{ width: "100%" }}
                                                                        inputProps={{
                                                                            maxLength: 20,
                                                                            sx: { backgroundColor: '#fff', padding: "0px 0px 0px 5px", height: "22px", textAlign: "left", }
                                                                        }}
                                                                        value={row.TRESHOLD}
                                                                        defaultValue={row.TRESHOLD}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderData.includes('MAX') ?
                                                                <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                                                    <TextField
                                                                        InputProps={{
                                                                            style: { fontSize: 12, height: "22px" },
                                                                        }}
                                                                        disabled={ApproveFreeseCheck}
                                                                        name="MAX"
                                                                        sx={{ width: "100%" }}
                                                                        onChange={(e) => onTableCellChange(e, row.SR_NO)}
                                                                        autoComplete="off"
                                                                        inputProps={{
                                                                            maxLength: 20,
                                                                            sx: { backgroundColor: '#fff', padding: "0px 0px 0px 5px", height: "22px", textAlign: "left", }
                                                                        }}
                                                                        value={row.MAX}
                                                                        defaultValue={row.MAX}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderData.includes('MIN_NEED') ?
                                                                <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                                                    <TextField
                                                                        InputProps={{
                                                                            style: { fontSize: 12, height: "22px" },
                                                                        }}
                                                                        disabled={ApproveFreeseCheck}
                                                                        name="MIN_NEED"
                                                                        sx={{ width: "100%" }}
                                                                        onChange={(e) => onTableCellChange(e, row.SR_NO)}
                                                                        autoComplete="off"
                                                                        inputProps={{
                                                                            maxLength: 20,
                                                                            sx: { backgroundColor: '#fff', padding: "0px 0px 0px 5px", height: "22px", textAlign: "left", }
                                                                        }}
                                                                        value={row.MIN_NEED}
                                                                        defaultValue={row.MIN_NEED}
                                                                    />
                                                                </TableCell> : null}

                                                        </TableRow >
                                                    );
                                                })}
                                            {currentPageData.length < 20 ?
                                                [...Array(20 - (currentPageData.length)).keys()].map(val => (
                                                    <TableRow  >
                                                        <TableCell padding="checkbox" sx={{ padding: "0px", width: "10px" }}>
                                                            <Checkbox size="small" color="primary" disabled={true}
                                                                style={{ padding: "0px", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', height: "22px" }}
                                                            />
                                                        </TableCell>
                                                        {ManageHeaderData.map((row, index) => {
                                                            return (
                                                                <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>)
                                                        })}
                                                        {/* <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}></TableCell>
                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}></TableCell>
                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} ></TableCell>
                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
                                                            <TextField
                                                                InputProps={{
                                                                    style: { fontSize: 12, height: "22px" },
                                                                }}
                                                                disabled
                                                                inputProps={{
                                                                    maxLength: 20,
                                                                    sx: { padding: "0px", height: "22px" }
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
                                                            <TextField
                                                                InputProps={{
                                                                    style: { fontSize: 12, height: "22px" },
                                                                }}
                                                                disabled
                                                                inputProps={{
                                                                    maxLength: 20,
                                                                    sx: { padding: "0px", height: "22px" }
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
                                                            <TextField
                                                                InputProps={{
                                                                    style: { fontSize: 12, height: "22px" },
                                                                }}
                                                                disabled
                                                                inputProps={{
                                                                    maxLength: 20,
                                                                    sx: { padding: "0px", height: "22px" }
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
                                                            <TextField
                                                                InputProps={{
                                                                    style: { fontSize: 12, height: "22px" },
                                                                }}
                                                                disabled
                                                                inputProps={{
                                                                    maxLength: 20,
                                                                    sx: { padding: "0px", height: "22px" }
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
                                                            <TextField
                                                                InputProps={{
                                                                    style: { fontSize: 12, height: "22px" },
                                                                }}
                                                                disabled
                                                                inputProps={{
                                                                    maxLength: 20,
                                                                    sx: { padding: "0px", height: "22px" }
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
                                                            <TextField
                                                                InputProps={{
                                                                    style: { fontSize: 12, height: "22px" },
                                                                }}
                                                                disabled
                                                                inputProps={{
                                                                    maxLength: 20,
                                                                    sx: { padding: "0px", height: "22px" }
                                                                }}
                                                            />
                                                        </TableCell> */}
                                                    </TableRow >
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
                                        <div className={QuantityLimitsClasses.header_child}>
                                            <span
                                                style={{
                                                    margin: '13px 0px 0px 15px', fontSize: '14px',
                                                    fontFamily: 'Arial, sans-serif',
                                                }}
                                            >
                                                {"Total Selected: " + String(allPageSelected.length)}
                                            </span>
                                        </div>
                                        <div className={QuantityLimitsClasses.header_child}>
                                            <TablePagination
                                                rowsPerPageOptions={[30]}
                                                component="div"
                                                count={qtyLimitsData.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                                sx={{ '& .MuiToolbar-root': { minHeight: '20px', }, }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                            </Paper>
                        </div>
                    </div>
                </Box >
            </div >

            <div>
                <Dialog open={dialogOpen} disableBackdropClick={true} maxWidth="xs" PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title">
                    <DialogContent sx={{ fontSize: "16px", }}>
                        <p>Min value provided is less than Min Need value. Do you want to continue?</p>
                    </DialogContent>

                    <DialogActions sx={{ padding: "0px 0px 10px 0px", margin: "0px", }}>
                        <Button sx={{ backgroundColor: "#228B22", fontSize: "12px", margin: "0px 5px 0px 0px", width: "100px",'&:hover': {
                    backgroundColor: '#3CB371', // Change this to the desired "light maroon" color
                  }, }} variant="contained"
                            startIcon={<DoneAllIcon />} onClick={handleDialogOk}>Yes</Button>

                        <Button sx={{ backgroundColor: "maroon", fontSize: "12px", margin: "0px 5px 0px 0px", width: "100px",'&:hover': {
                    backgroundColor: '#8B0000', // Change this to the desired "light maroon" color
                  }, }} variant="contained"
                            startIcon={<CancelIcon />} onClick={handleDialogClose}>No</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog
                    fullWidth={true}
                    maxWidth="xs"
                    open={openDialogQL}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                    disableBackdropClick
                >
                    <DialogTitle sx={{ margin: "0px", padding: "15px 0px 0px 0px", }}></DialogTitle>
                    <DialogContent id="draggable-dialog-title" sx={{ fontSize: "16px", userSelect: 'text', padding: "0px 0px 0px 10px", }} >
                        {DialogDataQL}
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 5px 0px 0px", width: "100px" }}
                            onClick={handleCloseDialog} autoFocus variant="contained" startIcon={<DoneAllIcon />}>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

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
                    <DialogContent id="draggable-dialog-title" sx={{ fontSize: "16px", userSelect: 'text', padding: "0px 0px 0px 10px", height: "240px", margin: "0px 10px 0px 0px" }} >
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
        </Box >
    );
};

export default QuantityLimits;
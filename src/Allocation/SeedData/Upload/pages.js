import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { ExcelRenderer } from "react-excel-renderer";
// import Table from "../../Components/Table/index";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import { hier1Headers, item_dtl_headers, isHeadersEqual, header_list } from "../Constants/headers";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { makeStyles } from "@mui/styles";
import { formattedExcelData } from "../Utils/format";
import CircularProgress from "@mui/material/CircularProgress";
import UploadFileIcon from '@mui/icons-material/Upload';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
// import { headCells } from './tableHead';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { postSEEDHIER1Request } from "../../../Redux/Action/SeedDataInsert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CancelIcon from '@mui/icons-material/Cancel';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import { ConstructionOutlined } from "@mui/icons-material";
import Select from 'react-select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
// import "./index.css";

import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import TableSortLabel from '@mui/material/TableSortLabel';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';

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
    stagemaindiv: {
        margin: "80px 0px 0px 10px",
        position: "relative",
        width: "calc(95vw - 64px)",
        '& table': {
            '& tr': {
                '& td:nth-child(17)': {
                    display: 'none'
                },
                '& td:nth-child(18)': {
                    display: 'none'
                },
                '& td:nth-child(19)': {
                    display: 'none'
                }
            }
        }
    },
    boxDiv: {
        textAlign: "initial",
        position: "relative",
        maxWidth: "1400px",
    },
    uploaddiv: {
        display: "flex",
        alignItems: "center",
        // marginTop: "50px",
        textAlign: "start",
        gap: 20,
    },
    GobackDiv: {
        cursor: "pointer",
    },
    resetBtn: {
        marginTop: "40px !important",
    }
});
const useStyles2 = makeStyles({
    tableRow: {
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "red",
        },
    },
    maindiv: {
        position: "relative",
        // backgroundColor:"yellow",
        //  paddingTop:"75px",
        margin: "75px 0px 0px 0px",
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
        height: "30px",
        '& input + fieldset': {
            boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
        },
    },
    inputFielddate: {
        width: "180px",
        height: "30px",
        '& input + fieldset': {
            boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
        },
    },
    header_container: {
        display: "inline-block",
        width: "100%",
    },
    header_child: {
        display: "inline-block",
        padding: "0rem 0.2rem",
        verticalAlign: "middle",
    },
    inputtable: {
        height: "30px"
    },
    float_child: {
        display: "inline-block",
        marginBottom: "0.1rem",
        marginLeft: "0.5rem"
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
        "&::placeholder": {
            color: "red",
            textAlign: "left"
        }
    },
    course_box: {
    },
    TableBody: {
        marginBottom: "0px"
    },
    grid_block: {
    },
    TableTotalBoby: {
        padding: "0px",
        margin: "0px",
    },
    multiselectfield: {
        display: "inline-block",
        margin: "0rem",
        padding: "0rem 0rem",
        verticalAlign: "Top",
    },
    testdiv: {
        marginLeft: "0rem",
    }, backdrop: {
        zIndex: 999,
        color: '#fff',
    },

});
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


const DataProcessing = () => {
    const [tableData, setTabledata] = useState([]);
    const [cloneTabData, setCloneTabData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogData, setDialogData] = useState("");
    const [openDialog2, setOpenDialog2] = useState(false);
    const [dialogData2, setDialogData2] = useState("");
    const [reloadStatus, setReloadStatus] = useState(false);
    const [processName, setProcessName] = useState("");
    const DataProcessingClasses = useStyles();
    const DisplayTableStyles = useStyles2();

    //TABLE 
    const [openDialogManage, setOpenDialogManage] = useState(false);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [openDialogQL, setOpenDialogQL] = useState(false);
    const [DialogDataQL, setDialogDataQL] = useState("");

    const [rowsPerPageMA, setRowsPerPageMA] = React.useState(30);
    const [pageMA, setPageMA] = React.useState(0);
    const [selected, setSelected] = useState([{}]);
    const [ManageHeaderCheck, setManageHeaderCheck] = useState(true);
    const [ManageHeaderData, setManageHeaderData] = useState([]);
    const [isScreenBigger, setIsScreenBigger] = useState(window.innerWidth < 1500 ? false : true);
    const [rowsPerPage, setRowsPerPage] = React.useState(30);
    const [page, setPage] = React.useState(0);
    const [currentPageData, setcurrentPageData] = useState([]);
    const [currentPageRows, setcurrentPageRows] = useState([]);
    const [allPageSelected, setAllPageSelected] = useState([]);
    const [tabColHeader, setTabColHeader] = useState([]);
    const startIndex = page * rowsPerPage;

    const dispatch = useDispatch();
    const ProcessData = useSelector(
        (state) => state.seedDataInsertReducers
    );

    useEffect(() => {
        if (ProcessData?.data?.insH1Status?.status === 201) {
            setIsLoading(false);
            setOpenDialog2(true);
            setDialogData2(ProcessData?.data?.insH1Status?.message)
            ProcessData.data.insH1Status.status = 0;
        } else if (ProcessData?.data?.insH1Status?.status === 500) {
            setIsLoading(false);
            setOpenDialog2(true);
            setDialogData2(ProcessData?.data?.insH1Status?.message)
            setReloadStatus(true);
            ProcessData.data.insH1Status.status = 0;
        }
    }, [ProcessData?.data]);

    const handleResize = () => {
        const screenWidth = window.innerWidth;
        const breakpoint = 1024; // Set your desired breakpoint here
        setIsScreenBigger(screenWidth < 1500 ? false : true);
    };



    useEffect(() => {
        // document.title = 'Alloc Summary';
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const serializedata = (datatable) => {
        let newTabledata = [];
        let count = 1;
        if (datatable.length > 0) {
            datatable.map(item => {
                item['SR_NO'] = count;
                count++;

                newTabledata.push(item);
            })
            // setTabledataclone(newTabledata)
            return newTabledata;
        }
    }
    // Handle Excel Template on Upload
    const handleCapture = ({ target }) => {
        // dispatch(resetStageProcessing());

        // console.log("target::", target, target.files[0], target.files[0].name)
        // setIsValidExcel(true);
        let fileObj = target.files[0];
        let result;
        const file_Name = target.files[0].name;
        if (file_Name.includes("_TEMPLATE")) {
            result = file_Name.split("_TEMPLATE")[0];
            setProcessName(result)
        }

        const headers = header_list[result];
        ExcelRenderer(fileObj, (err, resp) => {
            const tableHeaderColmns = headers.map(fileName => {
                const label = fileName;
                const id = fileName;
                return { id, label };
            });
            setTabColHeader(tableHeaderColmns);
            var temp=[];
            tableHeaderColmns.map(row => temp.push(row.id));
            setManageHeaderData(temp);
            setManageHeaderCheck(false);
            // console.log("headers:: ", resp.rows[0], headers);
            // Align all arrays to the length of the first by replacing empty values and padding shorter arrays with empty strings
            const file_Columns = resp.rows[0];
            const firstArrayLength = resp.rows[0].length;
            const dataArray = resp.rows.slice(1);
            const adjustedRows = dataArray.map((row, index) => {
                const fullArray = Array.from(row, item => item === undefined ? '' : item);
                const adjustedRow = fullArray.map(item => item == null || item === '' ? '' : item);
                while (adjustedRow.length < firstArrayLength) {
                    adjustedRow.push('');
                }
                return adjustedRow;
            });

            // console.log("adjustedRows", adjustedRows,file_Columns);
            const dataSet = [file_Columns, ...adjustedRows]
            if (isHeadersEqual(file_Columns, headers)) {
                let count = 1;
                // console.log(adjustedRows, count);
                // Example input


                const formatData = formattedExcelData(dataSet, headers);
                // console.log("Upload 1 formatData: ", formatData);
                formatData.filter((val) => {
                    for (const [key, value] of Object.entries(val)) {
                        if (value === "NaN") {
                            val[key] = ""
                        }
                    }
                })
                const serializeFormatdata = serializedata(formatData);
                setTabledata(serializeFormatdata);
                setCloneTabData(serializeFormatdata)
                const sortData = stableSort(serializeFormatdata, getComparator('desc', 'HIER1'));
                const temp = sortData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
                setcurrentPageData(temp);
                // setAllData(serializedata(formatData));
            } else {
                setDialogData2("Upload a valid file.");
                setOpenDialog2(true);
                setReloadStatus(true);
            }
        });
    };
    console.log("table data:: ", tableData)
    // Get Current User name
    const getCurrentUser = () => {
        if (localStorage.getItem("userData")) {
            return JSON.parse(localStorage.getItem("userData"))?.username;
        } else {
            return "default";
        }
    }
    const handleCloseDialog = (e) => {
        setOpenDialog(false);
        setDialogData("");
        finalSubmit();
    }
    const handleCloseDialog2 = (e) => {
        setOpenDialog2(false);
        setDialogData2("");
        setIsLoading(false);
        if (reloadStatus) {
            setTabledata([]);
            setCloneTabData([]);
            setProcessName('');
        }
    }
    const submitList = () => {
        setOpenDialog(true);
        setDialogData("Do you want to submit data?");
    }

    const finalSubmit = () => {
        setIsLoading(true);
        const currentUser = getCurrentUser();
        dispatch(postSEEDHIER1Request([{
            TABLE_DATA: tableData,
            USER: currentUser
        }]));
    }


    /*
       #################################################
       ##########  MANAGE COLUMNS IN TABLE  ############
       #################################################
 */
    if (ManageHeaderCheck) {
        var temp = []
        tabColHeader.map(row => temp.push(row.id));
        // const temp1 = ['CONTEXT', 'PROMOTION', 'SELECTED_QTY', 'SHIPPED_QTY', 'CANCELED_QTY', 'RECEIVED_QTY']
        // const temp2 = temp.filter(value => !temp1.includes(value));
        setManageHeaderData(temp);
        setManageHeaderCheck(false);
        // console.log("M:::", temp)
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
        tabColHeader.map(row => temp.push(row.id));
        setManageHeaderData(temp);
    }

    const headerManage = () => (
        <Box display="inline-block"
            sx={{ backgroundColor: "", height: "auto", padding: "0rem 0rem", width: "100%", }}>
            <div>
                {tabColHeader.map((key) => (
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
    /*
                           #########################################
                           ######### SORTING FUNCTIONALITY #########
                           #########################################
       */

    function descendingComparator(a, b, orderBy) {
        let c, d;
        c = isNaN(b[orderBy]) ? typeof b[orderBy] !== "undefined" && (b[orderBy]).length > 0 ? (b[orderBy]).toLowerCase() : b[orderBy] : parseInt(b[orderBy]);
        d = isNaN(a[orderBy]) ? typeof a[orderBy] !== "undefined" && (a[orderBy]).length > 0 ? (a[orderBy]).toLowerCase() : a[orderBy] : parseInt(a[orderBy]);

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
    function TableHeader(props) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };
        if (Object.keys(selected[0]).length > 0
            && Object.keys(selected[0]).includes(String(page))
        ) {
            const allCheck = currentPageData.map((n) => n.SR_NO);

            const isCompleteDataPresent = allCheck.every(item => (selected[0][page].map((n) => n.SR_NO)).includes(item));
            const allCheckVald = currentPageData.length > selected[0][page].length
                ? !isCompleteDataPresent : isCompleteDataPresent
        }
         console.log("tabColHeader:: ", tabColHeader, ManageHeaderData,tabColHeader.length)
        return (
            <>
                <TableHead className={DisplayTableStyles.TitleHead}
                    sx={{ position: "sticky", top: -1, }}
                >
                    <TableRow className={DisplayTableStyles.TitleRow}>
                        <StyledTableCell padding="checkbox" style={{
                            whiteSpace: "nowrap", padding: "0px",
                        }}
                        >
                            <Checkbox
                                color="primary"
                                size="small"
                                // indeterminate={selected.length > 0 && selected.length < tabData.length}
                                // checked={tabData.length > 0 && selected.length === tabData.length}
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
                                    padding: "3px",
                                    // border: "1px solid black"
                                }}
                            />
                        </StyledTableCell>


                        {tabColHeader.map((headCell) => (ManageHeaderData.includes(headCell.id) &&
                            <StyledTableCell
                                key={headCell.id}
                                // className={DisplayTableStyles.TableCell}
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

    TableHeader.propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        const temp = cloneTabData.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage)
            .filter(row => row !== undefined);
        setcurrentPageData(temp);
        setcurrentPageRows(temp);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPageMA(parseInt(event.target.value, 10));
        setPageMA(0);
    };

    console.log("currentPageData", currentPageData)
    return (
        <Box className={DataProcessingClasses.stagemaindiv}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center', // Aligns items vertically in the center
                    padding: '16px', // Optional padding for the outer box
                    // border: '1px solid lightgrey', // Optional border
                    // borderRadius: '8px', // Optional border radius for rounded corners
                }}
            >
                <Box className={DataProcessingClasses.boxDiv}>
                    <div className={DataProcessingClasses.uploaddiv}>
                        {processName.length > 0 ?
                            <h4>{processName} Processing</h4> :
                            <h4></h4>
                        }
                        <Button variant="contained" component="label" sx={{
                            backgroundColor: "", fontSize: "12px",
                            padding: "5px", fontFamily: "system-ui",
                            width: "130px", height: "32px",
                            marginLeft: "8px", // Space between select and button
                            '&.Mui-disabled': {
                                opacity: 0.5,
                                backgroundColor: 'DodgerBlue',
                                color: '#fff',
                            },
                        }} startIcon={<UploadFileIcon />}
                        >
                            Upload File
                            <input type="file" hidden
                                onChange={(e) => {
                                    handleCapture(e);
                                    e.target.value = null;
                                }}
                            />
                        </Button>
                    </div>
                </Box>

                <Box>
                    {tableData.length > 0 ?
                        <Button variant="contained" component="label" sx={{
                            backgroundColor: "", fontSize: "12px",
                            padding: "5px", fontFamily: "system-ui",
                            width: "130px", height: "32px",
                            marginLeft: "8px", // Space between select and button
                            '&.Mui-disabled': {
                                opacity: 0.5,
                                backgroundColor: 'DodgerBlue',
                                color: '#fff',
                            },
                        }}
                            onClick={submitList}
                        >
                            Submit
                        </Button>
                        : null
                    }
                </Box>
            </Box>
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
                        <Button
                            sx={{
                                backgroundColor: "maroon",
                                fontSize: "12px", padding: "5px", fontFamily: "system-ui",
                                width: "100px", marginLeft: "5px", marginTop: "2px",
                            }}
                            startIcon={<CancelIcon />}
                            variant="contained"
                            onClick={() => {
                                setDialogData("");
                                setOpenDialog(false);
                            }}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

            <div>
                <Dialog
                    fullWidth={true}
                    maxWidth="xs"
                    open={openDialog2}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                    disableBackdropClick
                >
                    <DialogTitle sx={{ margin: "0px", padding: "15px 0px 0px 0px", }}></DialogTitle>
                    <DialogContent id="draggable-dialog-title" sx={{ fontSize: "16px", userSelect: 'text', padding: "0px 0px 0px 10px", }} >
                        {dialogData2}
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 5px 0px 0px", width: "100px", }}
                            onClick={() => {
                                handleCloseDialog2();
                                if (!reloadStatus) {
                                    window.location.reload();
                                }
                            }} autoFocus variant="contained" startIcon={<DoneAllIcon />}>
                            Ok
                        </Button>

                    </DialogActions>
                </Dialog>
            </div>
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

            {/* TABLES  */}

            {cloneTabData.length > 0 ?
                <Box
                    // display='flex'
                    sx={{
                        // border: "1px solid lightgrey",
                        boxShadow: 3,
                        borderRadius: 1,
                        width: "calc(92vw - 0px)",
                        margin: "5px 0px 5px 5px",
                        padding: "0px 0px 0px 0px",
                        borderRadius: 1, boxShadow: 2, border: "0", borderBottom: 3, backgroundColor: ""
                    }}
                >
                    <div className={DisplayTableStyles.TableTotalBoby} display="flex">
                        {/* <Box
                        display='flex' justifyContent="space-between"
                    >
                        <InputLabel sx={{
                            fontWeight: "bold",
                            fontSize: "14px",
                            margin: "5px 0px 5px 5px",
                            display: 'flex',
                            float: 'left',
                            color: "black",
                        }}>
                            Search Results
                        </InputLabel>
                        <div style={{ display: "flex", }}>
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
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <div
                                    style={{
                                        flex: "1",
                                        backgroundColor: isSHovered1 ? '#f5f5f5' : 'white',
                                        borderRadius: '20%',
                                        padding: "0px 8px 0px 8px",
                                        margin: "2px 0px 0px 2px",
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
                           
                        </div>
                    </Box> */}

                        <div className={DisplayTableStyles.TableBody}>
                            <Paper sx={{ margin: "0px 0px 0px 0px", mb: 0, height: "auto", }}>
                                <TableContainer style={{ maxHeight: (isScreenBigger ? 700 : 420), width: "calc(100% - 0px)" }} component={Paper}>
                                    <Table aria-label="customized table">
                                        <TableHeader
                                        // numSelected={selected.length}
                                        // onSelectAllClick={handleSelectAllClick}
                                        // rowCount={tabData.length}
                                        // onRequestSort={handleRequestSort}
                                        // order={order}
                                        // orderBy={orderBy} 
                                        />
                                        {/* <TableBody
                                    >
                                        <TableCell padding="checkbox" sx={{ padding: "0px", textAlign: "center", alignContent: "center" }} >
                                            
                                            <IconButton small="small" sx={{ padding: "0px", }}>
                                                <RestartAltIcon small="small" sx={{ padding: "0px" }} onClick={resetFilter} />
                                            </IconButton>
                                            
                                        </TableCell>

                                        

                                        {ManageHeaderData.includes('RECEIVED_QTY') ?
                                            <TableCell sx={{
                                                padding: "0px"
                                                , height: "auto"
                                            }}>
                                                <TextField
                                                    autoComplete="off"
                                                    placeholder="Received Qty"
                                                    name="RECEIVED_QTY"
                                                    onChange={gridFilterD}
                                                    value={Object.keys(inputFVal).length > 0 && Object.keys(inputFVal).includes("RECEIVED_QTY") > 0 ? inputFVal.RECEIVED_QTY : ""}

                                                    InputProps={{
                                                        style: { fontSize: 12, height: "20px" },
                                                    }}
                                                    sx={{
                                                        width: "100%"
                                                    }}
                                                    variant="standard"
                                                    inputProps={{
                                                        sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                    }}
                                                />
                                            </TableCell> : null}
                                    </TableBody> */}

                                        <TableBody
                                        >
                                            {currentPageData.length > 0 ? currentPageData
                                                // .length > 0 ?
                                                //     stableSort(tabData, getComparator(order, orderBy))
                                                .map((row, index) => {
                                                    // const isItemSelected = isSelected(row.ALLOC_NO);
                                                    const labelId = `enhanced-table-checkbox-${index}`;
                                                    return (
                                                        <TableRow
                                                            hover
                                                            role="checkbox"
                                                        // aria-checked={isItemSelected}
                                                        // tabIndex={-1}
                                                        // key={row.ALLOC_NO}
                                                        // selected={isItemSelected}
                                                        // onDoubleClick={() => handleCellDoubleClick(row)}
                                                        // onClick={() => handleRowClick(row.ALLOC_NO)}
                                                        // style={selectedRow === row.ALLOC_NO ? { backgroundColor: "#CDF0FF" } : null}
                                                        >
                                                            <TableCell padding="checkbox" sx={{ padding: "0px", width: "1%" }}>
                                                                <Checkbox
                                                                    size="small" color="primary"
                                                                    // onClick={(event) => handleClick(event, row?.ALLOC_NO)}
                                                                    // checked={isItemSelected}
                                                                    inputProps={{
                                                                        'aria-labelledby': labelId,
                                                                    }}
                                                                    style={{ padding: "0px", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', }} />
                                                            </TableCell>
                                                            {Object.keys(row).map((key, index) => {
                                                                console.log("cell",row,key,(row[key]).length,(Object.keys(row)).length);
                                                                if (key !== "SR_NO") {
                                                                    
                                                                    return (
                                                                        <TableCell
                                                                            key={index}
                                                                            align="right"
                                                                            sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }}
                                                                            textAlign="right"
                                                                        >{console.log("check key", key)}
                                                                            {key=== 'UPDATE_DATETIME'?"test":row[key]}
                                                                        </TableCell>
                                                                    );
                                                                }
                                                            })}

                                                        </TableRow >

                                                    )
                                                }) : null
                                            }
                                            {currentPageData.length < (isScreenBigger ? 30 : 15) ?
                                                [...Array((isScreenBigger ? 30 : 15) - (currentPageData.length)).keys()].map(val => (
                                                    <TableRow  >
                                                        <TableCell padding="checkbox" sx={{ padding: "0px", width: "1%" }}>
                                                            <Checkbox size="small" color="primary" disabled={true} style={{ padding: "0px", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', }} />
                                                        </TableCell>
                                                        {/* {ManageHeaderData.map((row, index) => {
                                                        
                                                        return (
                                                            
                                                            <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}>asdfg</TableCell>)
                                                    })} */}
                                                        {
                                                            tabColHeader.map((key, index) => {
                                                                return (
                                                                    <TableCell
                                                                        key={index}
                                                                        align="right"
                                                                        sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }}
                                                                        textAlign="right"
                                                                    >
                                                                    </TableCell>
                                                                );
                                                            })
                                                        }
                                                    </TableRow >
                                                )) : false}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {cloneTabData.length > 0 ?
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
                                            <div className={DisplayTableStyles.header_child}>
                                                <span
                                                    style={{
                                                        margin: '13px 0px 0px 15px', fontSize: '14px',
                                                        fontFamily: 'Arial, sans-serif',
                                                    }}
                                                >
                                                    {"Total Selected: " + String(allPageSelected.length)}
                                                </span>
                                            </div>
                                            <div className={DisplayTableStyles.header_child}>
                                                <TablePagination
                                                    rowsPerPageOptions={[30]}
                                                    component="div"
                                                    count={cloneTabData.length}
                                                    rowsPerPage={rowsPerPage}
                                                    page={page}
                                                    onPageChange={handleChangePage}
                                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                                    sx={{ '& .MuiToolbar-root': { minHeight: '20px', }, }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    : null}

                                {/* {selected.length > 0 ? <EnhancedTableToolbar numSelected={selected.length} /> : false} */}
                                {/* {tabData.length > 0 ? <EnhancedTableToolbar numSelected={selected.length} /> : null} */}


                            </Paper>
                        </div>

                    </div>

                </Box> : null}
        </Box>
    );
};

export default DataProcessing;

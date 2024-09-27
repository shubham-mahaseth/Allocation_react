import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Backdrop, Fade } from '@material-ui/core';
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Draggable from 'react-draggable';
import DialogTitle from "@mui/material/DialogTitle";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { makeStyles, withStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import InputLabel from '@mui/material/InputLabel';
import TextField from "@mui/material/TextField";
import Select, { components } from 'react-select';
import makeAnimated, { Input } from 'react-select/animated';
import FormControl from '@mui/material/FormControl';
import SearchIcon from "@mui/icons-material/Search";
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
import TableSortLabel from '@mui/material/TableSortLabel';
import PropTypes from 'prop-types';
import { postUSRSDATARequest } from '../Redux/Action/UserConfigDetails';
import { visuallyHidden } from '@mui/utils';
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import IconButton from "@mui/material/IconButton";


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

const useStyles = makeStyles({
    maindiv: {
        position: "relative", width: "calc(94vw - 0px)",
        "& table": {
            "& tr": {
                "& td:nth-child(29)": { display: "none", },
                "& td:nth-child(30)": { display: "none", },
                "& td:nth-child(31)": { display: "none", },
            },
        },
        margin: "90px 0px 0px 5px", // border: "1px solid red"
    }, boxDiv: {
        textAlign: "initial",
        position: "relative",
        maxWidth: "1400px",
    },
    uploaddiv: {
        display: "flex",
        alignItems: "center",
        //marginTop: "80px",
        marginLeft: "20px",
        textAlign: "start",
        gap: 20,
    },
    TitleHead: {
        position: "sticky",
        top: -1,
        width: "100%",
    },
    TitleRow: {
        height: 15,
        width: "100%",
    },
})

const animatedComponents = makeAnimated();
const styleSelect = {
    control: base => ({
        ...base, width: "180px", fontSize: "13px", minHeight: "30px", border: "1px solid rgb(170, 170, 170)",
        // This line disable the blue border    // borderRadius: "0",    // backgroundColor:"#f0f0f0",
        boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
    }),
    dropdownIndicator: (base) => ({ ...base, padding: 1, }),
    clearIndicator: (base) => ({ ...base, padding: 0, color: 'rgb(90,90,90)', }),
    valueContainer: (provided) => ({ ...provided, minHeight: '30px', height: '30px', paddingTop: '0px', paddingBottom: '0px', }),
    singleValue: (provided) => ({ ...provided, }),
    // input: (provided) => ({ ...provided, width: "100%", }),
    option: provided => ({ ...provided, fontSize: "12px", }),
    menu: base => ({ ...base, borderRadius: 0, marginTop: 0, width: "180px", zIndex: 9999 }),
    menuList: base => ({ ...base, padding: 0, })
};

const AdminHeader = [
    { id: "user_id", label: "User Id" },
    { id: "user_name", label: "User Name" },
    { id: "role_name", label: "Role" },
    { id: "status", label: "Status" },
    { id: "create_date", label: "Creation Date" },
]
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
const AdminLayoutPage = ({ }) => {
    const [isLoading, setIsLoading] = useState(false);
    // const [break,setBreak] =useState([]);
    const [load, setLoad] = useState(true);
    const [usrTabData, setUsrTabData] = useState([]);
    const [usrFltrTabData, setUsrFltrData] = useState([]);
    const [gridData, setGridData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogData, setDialogData] = useState("");
    const navigate = useNavigate();


    const [selected, setSelected] = useState([{}]);
    const [allPageSelected, setAllPageSelected] = useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [inputVal, setInputVal] = useState({});
    const [rowsPerPage, setRowsPerPage] = React.useState(30);
    const [page, setPage] = React.useState(0);
    const [currentPageData, setcurrentPageData] = useState([]);
    const [currentPageRows, setcurrentPageRows] = useState([]);
    const startIndex = page * rowsPerPage;
    const [ManageHeaderCheck, setManageHeaderCheck] = useState(true);
    const [ManageHeaderData, setManageHeaderData] = useState([]);
    // const [currentPageData, setcurrentPageData] = useState(RolesList);
    const AdminLayoutPageClasses = useStyles();    
    const dispatch = useDispatch();
    const UsersData = useSelector(
        (state) => state.UserConfigReducers
    );
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
    useEffect(() => {
        if (typeof JSON.parse(localStorage.getItem("userData"))?.username === "undefined"
            || JSON.parse(localStorage.getItem("userData"))?.role_id !== 1) {
            navigate(`/AllocDashboard`);
        }
    }, []);

    useEffect(() => {
        if (load) {
            dispatch(postUSRSDATARequest([{}]));
            setIsLoading(true);
            setLoad(false);
        }

    }, [load]);
    useEffect(() => {
        const usrDtls = UsersData?.data?.usrsData;
        if (Array.isArray(usrDtls)) {
            setUsrTabData(usrDtls.length > 0 ? serializedata(usrDtls) : []);
            if (usrDtls.length === 0) {
                setOpenDialog(true);
                setDialogData('NO DATA FOUND.');
            }
        } else if (usrDtls?.status === 500) {
            setUsrTabData([]);
            setOpenDialog(true);
            setDialogData(usrDtls?.message);
        }

        setIsLoading(false);
    }, [UsersData?.data]);
    console.log("Admin Tab data:: ", usrTabData, isLoading);
    const selectedUsers = (event, value) => {
        console.log("userName ::", event, value)
        if (event.length > 0) {
            setUsrFltrData(event);
        } else {
            setUsrFltrData([]);
        }
    }
    const handleSearch = () => {
        const data = usrFltrTabData.length > 0 ? usrFltrTabData : usrTabData;
        const temp = (data).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
        setcurrentPageData(temp);
        setcurrentPageRows(temp);
        setGridData(data);
    }

    // CHECK BOX HEAD


    const handleSelectAllClick = (event) => {
        const lastPage = Math.ceil((usrTabData.length) / rowsPerPage);
        const filteredArray = currentPageData
        const newSelected = filteredArray.map((n) => n.SR_NO);
        const pageselected = { [page]: newSelected };

        if (event.target.checked && (Object.keys(selected[0]).length > 0 && !Object.keys(selected[0]).includes(String(page)))
        ) {
            const sortedArray = ((selected && Object.keys(selected[0]).length > 0) ? [{ ...selected[0], ...pageselected }]
                : [pageselected]).sort((a, b) => {
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
            setAllPageSelected(combinedList);
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
    const isSelected = (name) => (Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) ? selected[0][page].indexOf(name) !== -1 : false;

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
        // setBreakChk([]);
        return;
    };
    console.log("selected :: ", selected, allPageSelected);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        const temp = gridData.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage)
            .filter(row => row !== undefined);
        setcurrentPageData(temp);
        setcurrentPageRows(temp);
        // setInputVal([]);
        setIsLoading(false);

    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleCloseDialog = (e) => {
        setOpenDialog(false);
        setDialogData("")
    }


    if (ManageHeaderCheck) {
        var temp = []
        AdminHeader.map(row => temp.push(row.id));
        setManageHeaderData(temp);
        setManageHeaderCheck(false);
    }
    /* TABLE HEADER */
    function UsrTabHead(props) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <>
                <TableHead
                    className={AdminLayoutPageClasses.TitleHead} sx={{ background: "yellow", margin: "0", padding: "0" }}
                >
                    <TableRow className={AdminLayoutPageClasses.TitleRow} sx={{ background: "yellow", margin: "0", padding: "0" }}
                    >
                        <StyledTableCell padding="checkbox" style={{
                            whiteSpace: "nowrap", padding: "0px",
                        }}
                        >
                            <Checkbox
                                color="primary"
                                size="small"
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
                                style={{ color: "#fff", padding: "3px", }}
                            />
                        </StyledTableCell>
                        {AdminHeader.map((headCell) =>
                        (ManageHeaderData.includes(headCell.id) &&
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
                        ))
                        }

                    </TableRow>

                </TableHead>

            </>
        );
    }
    UsrTabHead.propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };
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
    /*
                #########################################
                ######### INLINE-FILTER FUNCTIONALITY #########
                #########################################
      */
    const gridFilter = (e) => {
        setInputVal((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }
    useEffect(() => {
        if (Object.keys(inputVal).length > 0) {

            for (let i = 0; i < Object.keys(inputVal).length; i++) {
                var temp_dict = {}
                if (inputVal[Object.keys(inputVal)[i]].includes("&") || inputVal[Object.keys(inputVal)[i]].includes("%")) {
                    inputVal[Object.keys(inputVal)[i]].slice(1);

                    temp_dict[Object.keys(inputVal)[i]] = inputVal[Object.keys(inputVal)[i]].slice(1)
                    if (temp_dict) {
                        for (const key in temp_dict) {
                            if (temp_dict[key] === '') {
                                delete temp_dict[key];
                            }
                        }
                    }
                    const temp = currentPageRows.filter((props) => String(props[Object.keys(inputVal)[i]]).toLowerCase() === String(temp_dict[Object.keys(inputVal)[i]]).toLowerCase())
                    setcurrentPageData(temp);
                }
                else {
                    const filteredTable = currentPageRows.filter((props) =>
                        Object.entries(inputVal).every(
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
        } else if (Object.keys(inputVal).length === 0) {
            setcurrentPageData(currentPageRows);
        }
    }, [inputVal]);


    return (
        <div>
            <Box className={AdminLayoutPageClasses.maindiv}>
                <div>
                    <Box className={AdminLayoutPageClasses.boxDiv} sx={{ display: 'flex', alignItems: 'center' }}>
                        <div className={AdminLayoutPageClasses.uploaddiv} style={{ display: 'flex', alignItems: 'center' }}>
                            {/* <h4 style={{ marginRight: '16px' }}>USERS</h4> */}
                            <FormControl>
                                <Select
                                    labelId="template-select-label"
                                    id="template-select"
                                    label="Select Template"
                                    classNamePrefix="mySelect"
                                    getOptionLabel={option =>
                                        `${option.user_name.toString()}`}
                                    getOptionValue={option => option.user_name}
                                    options={usrTabData.length > 0 ? usrTabData : []}
                                    // placeholder="Select Users"
                                    onChange={selectedUsers}
                                    maxMenuHeight={180}
                                    hideSelectedOptions={false}
                                    styles={styleSelect}
                                    menuPlacement="bottom"
                                    menuPosition="absolute"
                                    isSearchable={true}
                                    components={animatedComponents}
                                    isMulti
                                    isClearable={true}
                                    closeMenuOnSelect={false}
                                />
                            </FormControl>

                            <Button
                                variant="contained"
                                onClick={handleSearch}
                                startIcon={<SearchIcon sx={{ padding: "0px" }} />}
                                sx={{
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
                            >
                                search
                            </Button>

                        </div>
                    </Box>
                    {usrTabData.length > 0 ?
                        <Box
                            component="fieldset"
                            display="inline-block"
                            sx={{
                                backgroundColor: "", padding: "0px 0px 0px 0px", borderRadius: 1, boxShadow: 2, border: "0",
                                borderBottom: 3, backgroundColor: "", width: "calc(92vw - 0px)", margin: "30px 0px 0px 0px",
                            }}
                        >

                            <Paper sx={{ margin: "0px 0px 0px 0px", padding: "0px 5px 5px 5px", borderRadius: 0, boxShadow: 0, border: "0" }}>
                                <TableContainer style={{
                                    //maxHeight: (isScreenBigger ? 700 : 420),
                                    maxHeight: "380px",//maxHeight: "fit-content", 
                                    // width: "fit-content",
                                    width: "100%",
                                    borderRadius: '7px',
                                }}
                                    component={Paper}
                                //  sx={{ position: "sticky", top: -1, }}
                                >
                                    <Table aria-label="customized table">
                                        <UsrTabHead className={AdminLayoutPageClasses.TitleHead}
                                            numSelected={selected.length}
                                            onSelectAllClick={handleSelectAllClick}
                                            rowCount={usrTabData.length}
                                            onRequestSort={handleRequestSort}
                                            order={order}
                                            orderBy={orderBy}
                                        />
                                        <TableCell padding="checkbox" sx={{ padding: "0px", textAlign: "center", alignContent: "center" }} >
                                            {/* <Grid item xs={1} style={{ padding: "0px", margin: "0px 0px 0px 0px" }}> */}
                                            <IconButton small="small" sx={{ padding: "0px", }}>
                                                <RestartAltIcon small="small" sx={{ padding: "0px" }} onClick={() => {
                                                    setInputVal({})
                                                }} />
                                            </IconButton>
                                            {/* </Grid> */}
                                        </TableCell>
                                        {Object.keys(usrTabData[0]).map((col) => {
                                            const matchedColumn = usrTabData.find((item) => item.id === col);
                                            const placeholderLabel = matchedColumn ? matchedColumn.label : '';
                                            console.log("columns :: ", col)
                                            return ManageHeaderData.includes(col) ? (
                                                <TableCell
                                                    key={col}
                                                    sx={{
                                                        padding: "0px",
                                                        height: "22px",
                                                    }}
                                                >
                                                    <TextField
                                                        name={col}
                                                        onChange={gridFilter}
                                                        value={inputVal && inputVal[col] ? inputVal[col] : ""}
                                                        placeholder={placeholderLabel}
                                                        autoComplete="off"
                                                        InputProps={{
                                                            sx: {
                                                                fontSize: 12, padding: "0px",
                                                                height: "20px", textAlign: "left",
                                                            },
                                                        }}
                                                        sx={{ width: "100%", }}
                                                        variant="standard"
                                                        inputProps={{
                                                            sx: {
                                                                fontSize: 12, padding: "0px 0px 0px 3px",
                                                                height: "20px", textAlign: "left",
                                                                "&::placeholder": {
                                                                    textAlign: "left", padding: "0px",
                                                                },
                                                            },
                                                        }}
                                                    />
                                                </TableCell>
                                            ) : null;
                                        })}
                                        <TableBody >

                                            {currentPageData.length > 0 ?
                                                // stableSort(currentPageData, getComparator(order, orderBy))
                                                currentPageData.map((row, index) => {
                                                    const isItemSelected = isSelected(row.SR_NO);
                                                    const labelId = `enhanced-table-checkbox-${index}`;
                                                    return (<TableRow  >
                                                        <TableCell padding="checkbox" sx={{ padding: "0px", width: "1%" }}>
                                                            <Checkbox
                                                                size="small" color="primary"
                                                                onClick={(event) => handleClick(event, row?.SR_NO)}
                                                                checked={isItemSelected}
                                                                inputProps={{
                                                                    'aria-labelledby': labelId,
                                                                }}
                                                                style={{ padding: "0px", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', }} />
                                                        </TableCell>
                                                        {Object.keys(row).map((key, index) => {
                                                            if (key !== "SR_NO") {

                                                                return (
                                                                    ManageHeaderData.includes(key) ?
                                                                        <TableCell
                                                                            key={index}
                                                                            align="right"
                                                                            sx={{
                                                                                fontFamily: "system-ui", textAlign: "left", fontSize: "75%",
                                                                                padding: "0px 0px 0px 3px", height: "20px"
                                                                            }}
                                                                            textAlign="right"
                                                                        >
                                                                            {row[key]}
                                                                        </TableCell> : null
                                                                );
                                                            }
                                                        })}

                                                    </TableRow >)
                                                }) : null}
                                            {currentPageData.length < (15) ?
                                                [...Array((15) - currentPageData.length).keys()].map(val => (
                                                    <TableRow  >
                                                        <TableCell padding="checkbox" sx={{ padding: "0px", width: "1%" }}>
                                                            <Checkbox size="small" color="primary" disabled={true} style={{ padding: "0px", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', }} />
                                                        </TableCell>
                                                        {ManageHeaderData.map((row, index) => {
                                                            return (

                                                                <TableCell align="right"
                                                                    sx={{
                                                                        fontFamily: "system-ui", textAlign: "left", fontSize: "75%",
                                                                        padding: "0px 0px 0px 3px", height: "20px"
                                                                    }}></TableCell>
                                                            )
                                                        })}

                                                    </TableRow >
                                                )) : null}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {gridData.length > 10 ?

                                    <div className={AdminLayoutPageClasses.header_child}>
                                        <TablePagination
                                            rowsPerPageOptions={[30]}
                                            component="div"
                                            count={gridData.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            sx={{ '& .MuiToolbar-root': { minHeight: '20px', maxHeight: '40px' }, }}
                                        />
                                    </div>

                                    : null}
                            </Paper>

                        </Box>
                        : null}
                </div>
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
                    <DialogTitle sx={{ margin: "0px", padding: "15px 0px 0px 0px" }} id="draggable-dialog-title"></DialogTitle>
                    <DialogContent id="draggable-dialog-title" sx={{ fontSize: "16px", userSelect: 'text', padding: "0px 0px 0px 10px" }}>
                        {dialogData}
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 5px 0px 0px", width: "100px", }}
                            onClick={handleCloseDialog} autoFocus variant="contained" startIcon={<DoneAllIcon />}>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
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
    );
};

export default AdminLayoutPage;

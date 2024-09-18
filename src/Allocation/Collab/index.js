import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { makeStyles, withStyles } from "@mui/styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import ReactDOM from 'react-dom';


const useStyles = makeStyles({
    maindiv: {
        position: "relative",
        // backgroundColor:"yellow",
        // width:"100%",
        //width: "calc(95vw - 0px)",
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
        // '&::-webkit-scrollbar': { width: '8px', height: "8px" },
        // '&::-webkit-scrollbar-thumb': { backgroundColor: '#bdbdbd', borderRadius: '4px', },
        // '&::-webkit-scrollbar-track': { backgroundColor: '#f5f5f5', borderRadius: '4px', },
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
    header_container1: {
        display: "inline-block",
        width: "100%",
    }, header_container2: {
        //display: "inline-block",
        width: "100%",
        display: 'flex',
        // justifyContent:"end"
        flexDirection: 'column'
    },
    header_child: {
        display: "inline-block",
        // border: "1px solid red",
        padding: "0rem 0.2rem",
        verticalAlign: "middle",
    },
    header_child2: {
        display: "inline-block",
        // marginTop:"10px ",
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

/*  ### TEMPORARY DATA ### */

const CommentTableHeaderDetails = [
    { id: "COMMENT", label: "Comment", width: "200px" },
    { id: "USER", label: "User", width: "80px" },
    { id: "TIME", label: "Time", width: "80px" },
]
// const commentData = [
//     { USER: "AKHIL", ALLOC_NO: "100", COMMENT: "hII", TIME: "" },
//     { USER: "TARUN", ALLOC_NO: "100", COMMENT: "WHY", TIME: "" },
//     { USER: "CHANDAN", ALLOC_NO: "100", COMMENT: "WHEN", TIME: "" },
//     { USER: "SAMANTHA", ALLOC_NO: "100", COMMENT: "WHERE", TIME: "" },
// ]


const Collab = ({ commTabData, commFltrData, setCommFltrData }) => {
    // const [commFltrData, setCommFltrData] = useState([]);
    const CollabStyle = useStyles();
    var filterDataStatus = true;
    useEffect(() => {
        if (filterDataStatus && commFltrData.length === 0) {
            setCommFltrData(commTabData);
            filterDataStatus = false;
        }
    }, [commTabData]);

    //CHECKBOX SELECT 
    const [selected, setSelected] = useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [inputVal, setInputVal] = useState({});
    /*
            #################################################
            ##########  MANAGE COLUMNS IN TABLE  ############
            #################################################
      */

    const [ManageHeaderCheck, setManageHeaderCheck] = useState(true);
    const [ManageHeaderData, setManageHeaderData] = useState([]);

    if (ManageHeaderCheck) {
        var temp = []
        CommentTableHeaderDetails.map(row => temp.push(row.id));
        setManageHeaderData(temp);
        setManageHeaderCheck(false);
    }

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


    function CommTableHead(props) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <>
                <TableHead
                    className={CollabStyle.TitleHead}
                >
                    <TableRow className={CollabStyle.TitleRow}
                    >
                        {CommentTableHeaderDetails.map((headCell) => (ManageHeaderData.includes(headCell.id) &&
                            <StyledTableCell
                                key={headCell.id}
                                // className={CollabStyle.TableCell}
                                size="small"
                                sortDirection={orderBy === headCell.id ? order : false}
                                style={{
                                    // height:"22px",
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

    const DI_DetailsTable = () => (

        <Box
            component="fieldset"
            display="inline-block"
            sx={{
                backgroundColor: "",
                width: "100%",
                borderRadius: 1,
                boxShadow: 2, border: 0,
                borderBottom: 3,
                border: "1px solid lightgrey",
                margin: "5px 0px 0px 2px"
            }}
        >

            <legend style={{
                fontWeight: "bold",//fontSize: "16px",
                color: "#191970"
            }}>Comments</legend>

            <Paper sx={{ margin: "2px 0px 0px 0px", }}
            >
                <TableContainer style={{
                    maxHeight: "425px",//maxHeight: "fit-content", 
                    width: "100%",//width: "calc(100% - 0px)",
                    borderRadius: '7px'
                }}
                    component={Paper}
                //  sx={{ position: "sticky", top: -1, }}
                >
                    <Table aria-label="customized table">
                        <CommTableHead
                            numSelected={selected.length}
                            //  onSelectAllClick={handleSelectAllClick}
                            //  rowCount={filtrdLocGrpData.length}
                            onRequestSort={handleRequestSort}
                            order={order}
                            orderBy={orderBy}
                        />
                        <TableBody >
                            {ManageHeaderData.includes('COMMENT') ?
                                <TableCell sx={{
                                    padding: "0px", height: "22px"
                                }}>
                                    <TextField
                                        name="COMMENT"
                                        onChange={gridFilter}
                                        value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("COMMENT") > 0 ? inputVal.COMMEMT : ""}
                                        placeholder="Comment"
                                        autoComplete="off"
                                        InputProps={{
                                            sx: { fontSize: 12, padding: "0px", height: "20px", textAlign: "left", }
                                        }}
                                        sx={{ width: "100%", }}
                                        variant="standard"
                                        inputProps={{
                                            sx: {
                                                fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left",
                                                "&::placeholder": { textAlign: "left", padding: "0px", },
                                            },
                                        }}
                                    />
                                </TableCell>
                                : null}
                            {ManageHeaderData.includes('USER') ?
                                <TableCell sx={{
                                    padding: "0px",
                                }}>
                                    <TextField
                                        name="USER"
                                        onChange={gridFilter}
                                        value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("USER") > 0 ? inputVal.USER : ""}
                                        placeholder="User"
                                        autoComplete="off"
                                        InputProps={{
                                            sx: { fontSize: 12, padding: "0px", height: "20px", textAlign: "left", }
                                        }}
                                        sx={{ width: "100%", }}
                                        variant="standard"
                                        inputProps={{
                                            sx: {
                                                fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left",
                                                "&::placeholder": { textAlign: "left", padding: "0px", },
                                            },
                                        }}
                                    />

                                </TableCell> : null}
                            {ManageHeaderData.includes('TIME') ?
                                <TableCell sx={{
                                    padding: "0px",
                                }}>
                                    <TextField
                                        name="TIME"
                                        onChange={gridFilter}
                                        value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("TIME") > 0 ? inputVal.TIME : ""}
                                        placeholder="Time"
                                        autoComplete="off"
                                        InputProps={{
                                            sx: { fontSize: 12, padding: "0px", height: "20px", textAlign: "left", }
                                        }}
                                        sx={{ width: "100%", }}
                                        variant="standard"
                                        inputProps={{
                                            sx: {
                                                fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left",
                                                "&::placeholder": { textAlign: "left", padding: "0px", },
                                            },
                                        }}
                                    />
                                </TableCell> : null}


                            {commFltrData.length > 0 ?
                                stableSort(commFltrData, getComparator(order, orderBy)).map(row => (
                                    <TableRow  >
                                        {ManageHeaderData.includes('COMMENT') ?
                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", height: "20px" }}>{row.COMMENT}</TableCell>
                                            : null}
                                        {ManageHeaderData.includes('USER') ?
                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }}>{row.USER}</TableCell>
                                            : null}
                                        {ManageHeaderData.includes('TIME') ?
                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} >
                                                {/* {row.TIME} */}
                                                {
                                                    (() => {
                                                        const formatDate = (str) => {
                                                            if (!str.includes(' ')) return str;

                                                            const [datePart, timePart] = str.split(' ');
                                                            const [year, month, day] = datePart.split('-');
                                                            const formattedYear = year.slice(2) || 'yy';

                                                            return `${month}-${day}-${formattedYear} ${timePart}`;
                                                        };

                                                        return formatDate(row.TIME);
                                                    })()
                                                }


                                            </TableCell>
                                            : null}
                                    </TableRow >
                                )) : null}
                            {commFltrData.length < 5 ?
                                [...Array(5 - commFltrData.length).keys()].map(val => (
                                    <TableRow  >
                                        {ManageHeaderData.map((row, index) => {
                                            return (
                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", height: "22px" }}></TableCell>
                                            )
                                        })}

                                    </TableRow >
                                )) : null}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>


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
                    const temp = commTabData.filter((props) => String(props[Object.keys(inputVal)[i]]).toLowerCase() === String(temp_dict[Object.keys(inputVal)[i]]).toLowerCase())
                    setCommFltrData(temp);
                }
                else {
                    const filteredTable = commTabData.filter((props) =>
                        Object.entries(inputVal).every(
                            ([key, val]) =>
                                !val.length ||
                                props[key]
                                    ?.toString()
                                    .toLowerCase()
                                    .includes(val?.toString().toLowerCase())
                        )
                    );
                    setCommFltrData(filteredTable);
                }
            }
        } else if (Object.keys(inputVal).length === 0) {
            setCommFltrData(commTabData);
        }
    }, [inputVal]);


    return (
        <Box className={CollabStyle.maindiv} //sx={{  width: "calc(60vw - 0px)",backgroundColor:"green"}}
        >
            <div>
                {DI_DetailsTable()}
            </div>
        </Box>
    )

};

export default Collab;
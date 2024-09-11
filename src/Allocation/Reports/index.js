import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import { makeStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import {
  getREPORTRequest
} from "../../Redux/Action/Reports";
import { Modal, Backdrop, Fade } from '@material-ui/core';
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import { visuallyHidden } from '@mui/utils';
import TableSortLabel from '@mui/material/TableSortLabel';
import { styled } from '@mui/material/styles';
import TablePagination from '@mui/material/TablePagination';


const useStyles = makeStyles({
  maindiv: {
    position: "relative",
    // backgroundColor:"yellow",
    // width:"100%",
    //width: "calc(95vw - 0px)",

    marginTop: "65px",
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
  },
  TitleHead: {
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
 
  header_child: {
    display: "flex",
    justifyContent:"flex-end",
    // display: "inline-block",
    // border: "1px solid red",
    //padding: "0rem 0.2rem",
    verticalAlign: "middle",
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
const ReportTabHeadDtl = [
  { id: "ITEM_ID", label: "Item id", width: "120px" },
  { id: "TOTAL_ALLOCATED_QTY", label: "Total Allocated Qty", width: "200px" },
]
const ShowReport = () => {

  const [load, setLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [tabData, setTabData] = useState([]);
  const [fltrtabData, setFltrTabData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState("");
  const [rptTabHdDtl, setRptTabHdDtl] = useState([]);
  //CHECKBOX SELECT 
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [inputVal, setInputVal] = useState({});

  const [isScreenBigger, setIsScreenBigger] = useState(window.innerWidth < 1500 ? false : true);

  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const [page, setPage] = React.useState(0);
  const [currentPageData, setcurrentPageData] = useState([]);
  const [currentPageRows, setcurrentPageRows] = useState([]);
  const startIndex = page * rowsPerPage;
  const ReportStyle = useStyles();
  const dispatch = useDispatch();
  const ReportData = useSelector(
    (state) => state.ReportsReducers
  );

  useEffect(() => {
    if (load) {
      console.log("Report1:", load);
      setIsLoading(true);
      dispatch(getREPORTRequest([{}]));
      setLoad(false);
    }

  }, [load]);
  const handleResize = () => {
    const screenWidth = window.innerWidth;
    const breakpoint = 1024; // Set your desired breakpoint here
    // //console.log("screenWidth ",screenWidth,(isScreenBigger?25:15),screenWidth < 1366? false: true)
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
  useEffect(() => {
    if (ReportData?.data?.rptData && Array.isArray(ReportData?.data?.rptData)) {
      setIsLoading(false);
      setLoad(false);
      if ((ReportData?.data?.rptData).length) {
        setTabData(ReportData?.data?.rptData);
        setFltrTabData(ReportData?.data?.rptData);
        const head = Object.keys((ReportData?.data?.rptData)[0])
        const newArray = head.map(str => {
          const label = str
            .toLowerCase()               // Convert to lowercase
            .replace(/_/g, ' ')          // Replace underscores with spaces
            .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letter of each word

          return {
            id: str,    // Original string as id
            label: label // Transformed label
          };
        });
        setRptTabHdDtl(newArray);
        const temp = (ReportData?.data?.rptData).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
        setcurrentPageData(temp);
        setcurrentPageRows(temp);
        ReportData.data.rptData = [];
      } else {
        setOpenDialog(true);
        setDialogData('NO DATA FOUND');
        setTabData([]);
        setFltrTabData([]);
      }
    } else if (ReportData?.data?.rptData?.status === 500) {
      setIsLoading(false);
      setOpenDialog(true);
      setDialogData(ReportData?.data?.rptData?.message);
      setTabData([]);
      setFltrTabData([]);
      setLoad(false);
      console.log("Table Data:", ReportData?.data?.rptData)
      ReportData.data.rptData.status = 0;
    }
  }, [ReportData?.data]);

  // console.log("table data", tabData, fltrtabData, inputVal, ReportData.data.rptData, rptTabHdDtl);






  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    const temp = tabData.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage)
      .filter(row => row !== undefined);
    setcurrentPageData(temp);
    setcurrentPageRows(temp);
    setInputVal([]);
    setIsLoading(false);

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

  const [ManageHeaderCheck, setManageHeaderCheck] = useState(true);
  const [ManageHeaderData, setManageHeaderData] = useState([]);

  if (ManageHeaderCheck && rptTabHdDtl.length > 0) {
    var temp = []
    rptTabHdDtl.map(row => temp.push(row.id));
    // console.log("ManageHeaderData::", temp, rptTabHdDtl);
    setManageHeaderData(temp);
    setManageHeaderCheck(false);
  }
  const handleCloseDialog = (e) => {
    setOpenDialog(false);
    setDialogData("")
  }
  /* TABLE HEADER */
  function ReportTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <>
        <TableHead
          className={ReportStyle.TitleHead} sx={{ background: "yellow", margin: "0", padding: "0"}}
        >
          <TableRow className={ReportStyle.TitleRow} sx={{ background: "yellow", margin: "0", padding: "0" }}
          >
            {rptTabHdDtl.map((headCell) => (ManageHeaderData.includes(headCell.id) &&
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
    <Box className={ReportStyle.maindiv} >
      {tabData.length > 0 ?
        <Box
          component="fieldset"
          display="inline-block"
          sx={{
            backgroundColor: "",
            width: "100%",
            border: '0',
            // borderRadius: 1,
            // boxShadow: 2,
            // borderBottom: 3,
            // border: "1px solid lightgrey",
            margin: "35px 0px 0px 0px",

          }}
        >

          {/* <legend style={{
          fontWeight: "bold",//fontSize: "16px",
          color: "#191970"
        }}>Comments</legend> */}

          <Paper sx={{ margin: "0px 0px 0px 0px",// width: "fit-content",
           }}
          >
            <TableContainer style={{ 
              maxHeight: (isScreenBigger ? 700 : 420),
              // maxHeight: "450px",//maxHeight: "fit-content", 
              // width: "fit-content",
              width: "100%",
              borderRadius: '7px',
            }}
              component={Paper}
            //  sx={{ position: "sticky", top: -1, }}
            >
              <Table aria-label="customized table">
                <ReportTableHead className={ReportStyle.TitleHead}
                  numSelected={selected.length}
                  //  onSelectAllClick={handleSelectAllClick}
                  //  rowCount={filtrdLocGrpData.length}
                  onRequestSort={handleRequestSort}
                  order={order}
                  orderBy={orderBy}
                />
                {/* <TableHead className={ReportStyle.TitleHead}>
               <TableRow  sx={{ backgroundColor: "white", padding: "0px", margin: "0px", }}> */}
                {Object.keys(fltrtabData[0]).map((col) => {
                    const matchedColumn = rptTabHdDtl.find((item) => item.id === col);
                    const placeholderLabel = matchedColumn ? matchedColumn.label : '';

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
                {/* </TableRow>
                </TableHead> */}
                <TableBody >
                
                  {currentPageData.length > 0 ?
                    stableSort(currentPageData, getComparator(order, orderBy)).map(row => (
                      <TableRow  >
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

                      </TableRow >
                    )) : null}
                  {currentPageData.length < 15 ?
                    [...Array(15 - currentPageData.length).keys()].map(val => (
                      <TableRow  >
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
            {tabData.length > 30 ?

              <div className={ReportStyle.header_child}>
                <TablePagination
                  rowsPerPageOptions={[30]}
                  component="div"
                  count={tabData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{ '& .MuiToolbar-root': { minHeight: '20px',maxHeight:'35px' }, }}
                />
              </div>

              : null}
          </Paper>


        </Box>
        : null}
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

    </Box>
  )

}

export default ShowReport;


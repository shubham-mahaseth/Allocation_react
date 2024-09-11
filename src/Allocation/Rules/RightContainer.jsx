import React from "react";
import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import "./Right.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridCellModes } from "@mui/x-data-grid";
import { CONFIG } from "../../services/config";

// import data12 from './data.json'
// import locationlistjson from '../Components/data/store_list.json'
// import locationtraitsjson from '../Components/data/store_traits.json'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import {
  getFETCHLOCATIONDATARequest,
  getLOCATIONRLRequest,
  getLOCATIONLISTRLRequest,
  getLOCATIONTRAITSRLRequest,
  getCLEARANCERLRequest,
  getSTATUSRLRequest,

  getDELETELOCATIONRLRequest,
} from "../../Redux/Action/rules&location";
import InputLabel from '@mui/material/InputLabel';
import { makeStyles, withStyles } from "@mui/styles";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';
import Toolbar from "@mui/material/Toolbar";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import makeAnimated from 'react-select/animated';
import IconButton from "@mui/material/IconButton";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import swal from "@sweetalert/with-react";
import CopyAllIcon from '@mui/icons-material/CopyAll';
import { BsFillEraserFill } from 'react-icons/bs';
import InfoIcon from '@mui/icons-material/Info';


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
    position: "sticky",
    top: -1,
  },
  GobackDiv: {
    cursor: "pointer",
  },
  textField: {
    marginRight: "10px ",
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
  header_container: {
    display: "inline-block",
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
  input: {
    // width: "250px",
    height: 37.8,
    // backgroundColor:"#f0f0f0",
    '& input + fieldset': {
      // borderColor: 'gray',
      borderRadius: "0",
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
    },
  },
  divBoxLeft: {
    width: "100%",
    float: "left"
  },
  TableCell: {
    color: "#fff",
    padding: "6px 6px !important",
    //lineHeight: "1.2rem !important",
  },
  course_box: {
    // width: "100%",
    // margin:"0 auto", 
    // display: "block",
    // flexWrap:"wrap",
  },
  textField: {
    marginRight: "10px !important",
  },
})

const styleSelect3 = {
  control: base => ({
    ...base,
    width: "130px",
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
const styleSelect5 = {
  control: base => ({
    ...base,
    width: "130px",
    fontSize: "12px",
    minHeight: "20px",
    margin: "0px 0px 0px 0px",
    // This line disable the blue border
    borderRadius: "5px",
    // border:0,
    // borderBottom:"1px solid gray"
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
    //justifyContent:"right"
    // minHeight: '1px',
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
    width: "100px",
    fontSize: "12px",
    minHeight: "20px",
    margin: "0px 0px 0px 0px",
    // This line disable the blue border
    borderRadius: "0px",
    border: 0,
    borderBottom: "1px solid gray",
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
    marginTop: 0
  }),
  menuList: base => ({
    ...base,
    // kill the white space on first and last option
    padding: 0
  })
};

const styleSelect2 = {
  control: base => ({
    ...base,
    width: "180px",
    fontSize: "12px",
    minHeight: "20px",
    margin: "0px 0px 0px 0px",
    // This line disable the blue border
    borderRadius: "5px",
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
  placeholder: (provided, state) => ({
    ...provided,
    // marginTop: '-30px',
    color: "gray"
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

const styleSelect1 = {
  control: base => ({
    ...base,
    width: "200px",
    fontSize: "14px",
    margin: "0px 0px 0px 0px",
    // This line disable the blue border
    //borderRadius: "0",
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
    height: '30px',
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

const animatedComponents = makeAnimated();


// console.log("dfghjklghjk::", getDELETELOCATIONRLRequest)
const LocationHeader = [
  { id: "LOC", label: "Location" },
  { id: "LOC_DESC", label: "Loc Desc" },
  { id: "LOC_TYPE", label: "Loc Type" },
  { id: "DEFAULT_WH", label: "Default WH" },
  { id: "GROUP_ID", label: "Group ID" },
  { id: "GROUP_DESC", label: "Group Desc" },
  { id: "LIKE_LOC", label: "Like Loc" },
  { id: "LIKE_LOC_DESC", label: "Like Loc Desc" },
  { id: "WEIGHT_PCT", label: "Weight" },
  { id: "CLEARANCE_IND", label: "Clearance Flag" },
  { id: "ITEM_LOC_STATUS", label: "Status" },
  { id: "RELEASE_DATE", label: "Release Date" },
]




const optionsTemplates = [
  { value: "Template Name", label: "Template Name" },
  { value: "option 2", label: "option 2" },
  { value: "option 3", label: "option 3" },
  { value: "option 4", label: "option 4" }
]


const RightContainer = ({ tableData, new_table, setNew_table,
  allocNoData, setTotalData, totalData, selected, setSelected,
  AllRetreiverRLdataCheck, tableLocData, setTableLocData,
  likeLocData, clearanceRLData, StatusRLData, }) => {

  const [search, setsearch] = useState({
    "location": "",
    "loc_desc": "",
    "loc_type": "",
    "default_wh": "",
    "group_id": "",
    "group_desc": ""
  });
  // const [searcharray, setSearcharray] = useState([])
  const [status, setStatus] = useState([])
  const [clearance, setClearance] = useState([])


  const initialsearch = {
    LOCATION: [],
    LOCATION_LIST: [],
    LOCATION_TRAIT: [],
    EXCLUDE_LOCATION: [],
    ALL_STORE: "N",
    ALLOC_NO: allocNoData.ALLOC_NO
  }

  const initialCopyValues = {
    LIKE_LOC: "",
    LIKE_LOC_DESC: "",
    WEIGHT_PCT: "",
    CLEARANCE_IND: "",
    CLEARANCE_IND_DESC: "",
    ITEM_LOC_STATUS: "",
    ITEM_LOC_STATUS_DESC: "",
  }

  const [searchData, setSearchData] = useState(initialsearch);
  //////////////////////////////////////////////
  /////////////////////////
  ///////////////////////////////////////////////////////

  const [switchTableData, setSwitchTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearch, setSearch] = useState(false);
  // const [akka aaa number 1 selected, setSelected] = useState([]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [inputValue, setInputValue] = useState([]);
  const [sampleVal, setSampleVal] = useState([]);
  const [copyValue, setCopyValue] = useState(initialCopyValues);
  const [selectedRow, setSelectedRow] = useState(null);
  const [sorted, setSorted] = useState(true);

  const RulesLocationRightClasses = useStyles();

  const RulesLocationRightData = useSelector(
    (state) => state.RulesLocationReducers
  );

  const dispatch = useDispatch();


  //console.log("locationRL:", locationRL);
  //console.log("locationListRL:", locationListRL);
  //console.log("locationTraitRL:", locationTraitRL);
  //console.log("clearanceRL:", clearanceRL);
  // console.log("statusRL:", statusRL);
  console.log("likeLocData::", likeLocData);
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
      height: "30px",
      padding: 0,
    },
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "DodgerBlue",
      color: theme.palette.common.black,
      fontSize: 14,
      textAlign: "left"
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
      textAlign: "left"
    },
  }));


  function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <>

        <TableHead className={RulesLocationRightClasses.TitleHead}>
          <TableRow >
            <StyledTableCell padding="checkbox" style={{
              whiteSpace: "nowrap", padding: "0px",
            }}
            >
              <Checkbox
                color="primary"
                size="small"
                indeterminate={selected.length > 0 && selected.length < totalData.length}
                checked={totalData.length > 0 && selected.length === totalData.length}
                onChange={onSelectAllClick}
                inputProps={{
                  'aria-label': 'select all data',
                }}
                style={{
                  // transform: "scale(0.8)",
                  padding: "3px",
                  color: "#fff",
                }}
              />
            </StyledTableCell>


            {LocationHeader.map((headCell) => (
              <StyledTableCell
                key={headCell.id}
                // className={RulesLocationRightClasses.TableCell}
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
                      padding: "0px 0px 0px 5px"
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
          ...(totalData.length > 0 &&
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
        {totalData.length > 0 && (
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
            Rows {selected.length} of {totalData.length}
          </Typography>
        )}
      </Toolbar>
    );
  }


  function descendingComparator(a, b, orderBy) {
    let c, d;
    if (orderBy == "LOC_DESC") {
      c = b[orderBy].slice(b[orderBy].indexOf("-") + 1);
      d = a[orderBy].slice(a[orderBy].indexOf("-") + 1);
      c = isNaN(c) ? c : parseInt(c);
      d = isNaN(d) ? d : parseInt(d);
    }
    else if (orderBy == "LOCATION" || orderBy == "GROUP_DESC") {
      c = parseInt(b[orderBy]);
      d = parseInt(a[orderBy]);
    }
    else if (orderBy == "LIKE_LOC" || orderBy == "GROUP_ID") {
      c = parseInt(b[orderBy]);
      d = parseInt(a[orderBy]);
      c = isNaN(c) ? 0 : parseInt(c);
      d = isNaN(d) ? 0 : parseInt(d);
    }
    // else if (!a[orderBy].sortable) {
    //   return 0;
    // }
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
        const sortedData = stableSort(totalData, getComparator("asc", sortValue));
        setTotalData(sortedData);
      }
      if (order === "desc") {
        const sortedData = stableSort(totalData, getComparator("desc", sortValue));
        setTotalData(sortedData);
      }
      setSortCheck(false)
    }
  }, [totalData, order, orderBy]);

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
    ////console.log("event::",event)
    if (event.target.checked && selected.length === 0) {
      const newSelected = totalData.map((n) => n.LOC);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleSingleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
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


  console.log("selected::", selected);

  ///////////////////////////////////////////
  ///////////////
  //////////////////////////////////////////////


  const r1 = useRef()
  const r2 = useRef()
  const r3 = useRef()
  const r4 = useRef()


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
    console.log("inputValue::", inputValue)
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
          if (col === "LOC") {
            const temp = tableLocData.filter((props) => String(props.LOC) === String(temp_dict.LOC))
            setTotalData(temp);
          }
          else if (col === "LOC_DESC") {
            const temp = tableLocData.filter((props) => String(props.LOC_DESC) === String(temp_dict.LOC_DESC))
            setTotalData(temp);
          }
          else if (col === "LOC_TYPE") {
            const temp = tableLocData.filter((props) => String(props.LOC_TYPE) === String(temp_dict.LOC_TYPE))
            setTotalData(temp);
          }
          else if (col === "DEFAULT_WH") {
            const temp = tableLocData.filter((props) => String(props.DEFAULT_WH) === String(temp_dict.DEFAULT_WH))
            setTotalData(temp);
          }
          else if (col === "GROUP_ID") {
            const temp = tableLocData.filter((props) => String(props.GROUP_ID) === String(temp_dict.GROUP_ID))
            setTotalData(temp);
          }
          else if (col === "GROUP_DESC") {
            const temp = tableLocData.filter((props) => String(props.GROUP_DESC) === String(temp_dict.GROUP_DESC))
            setTotalData(temp);
          }

          // console.log("inputValue:3:",key);
        }
        else {
          const filteredTable = tableLocData.filter((props) =>
            Object.entries(inputValue).every(
              ([key, val]) =>
                !val.length ||
                props[key]
                  ?.toString()
                  .toLowerCase()
                  .includes(val?.toString().toLowerCase())
            )
          );
          setTotalData(filteredTable);
        }
      }
    }
    if (Object.keys(inputValue).length === 0) {
      setTotalData(tableLocData)
    }

  }, [inputValue]);


  const handleChangeWeight = (e, name) => {
    if (e) {
      if (e.target.name === "WEIGHT_PCT") {
        setCopyValue((prev) => ({
          ...prev,
          [e.target.name]: e.target.value
        }))
      }
    }
  }

  const handleChangeValue = (e, name) => {
    console.log("inputValue:11223332:", e, name, Object.is(e, null))
    // console.log("inputValue:8989898:", e, name, Object.is(e, null))


    if (Object.is(e, null) === false) {
      if (name.name === "LIKE_LOC" || name.name === "LIKE_LOC_DESC") {
        if (name.name === "LIKE_LOC") {
          var temp = "LIKE_LOC_DESC"
          setCopyValue((prev) => ({
            ...prev,
            [name.name]: e.STORE,
            [temp]: e.STORE_DESC
          }))
        }
        if (name.name === "LIKE_LOC_DESC") {
          var temp = "LIKE_LOC"
          console.log("inputValue:991119:", e, name, temp);
          setCopyValue((prev) => ({
            ...prev,
            [name.name]: e.STORE_DESC,
            [temp]: e.STORE
          }))
        }

      }
      if (name.name === "CLEARANCE_IND") {
        var temp = "CLEARANCE_IND_DESC"
        setCopyValue((prev) => ({
          ...prev,
          [name.name]: e.CODE,
          [temp]: e.CODE_DESC
        }))
      }
      if (name.name === "ITEM_LOC_STATUS") {
        var temp = "ITEM_LOC_STATUS_DESC"
        setCopyValue((prev) => ({
          ...prev,
          [name.name]: e.CODE,
          [temp]: e.CODE_DESC
        }))
      }
    }

    console.log("inputValue:333:", e, Object.is(e, null))

    if (Object.is(e, null) === true) {
      if (name.name === "LIKE_LOC" || name.name === "LIKE_LOC_DESC") {
        if (name.name === "LIKE_LOC") {
          var temp = "LIKE_LOC_DESC"
          setCopyValue((prev) => ({
            ...prev,
            [name.name]: "",
            [temp]: ""
          }))
        }
        if (name.name === "LIKE_LOC_DESC") {
          var temp = "LIKE_LOC"
          // console.log("inputValue:991119:", e, name, temp);
          setCopyValue((prev) => ({
            ...prev,
            [name.name]: "",
            [temp]: ""
          }))
        }

      }
      if (name.name === "CLEARANCE_IND") {
        var temp = "CLEARANCE_IND_DESC"
        setCopyValue((prev) => ({
          ...prev,
          [name.name]: "",
          [temp]: ""
        }))
      }
      if (name.name === "ITEM_LOC_STATUS") {
        var temp = "ITEM_LOC_STATUS_DESC"
        setCopyValue((prev) => ({
          ...prev,
          [name.name]: "",
          [temp]: ""
        }))
      }
    }
    // setSampleVal([])
  }

  const onTableCellChange = (e, value, name) => {
    // console.log("inputValue; aty:::::::totalData:::", totalData, e, value, name, Object.is(e, null))

    if (Object.is(e, null) === false) {
      if (name === "LIKE_LOC" || name === "LIKE_LOC_DESC") {
        totalData.map((row) => {
          if (row.LOC === value) {
            row["LIKE_LOC"] = e.STORE
            row["LIKE_LOC_DESC"] = e.STORE_DESC
          }
        })
      }
      if (name === "CLEARANCE_IND") {
        totalData.map((row) => {
          if (row.LOC === value) {
            row["CLEARANCE_IND"] = e.CODE
            row["CLEARANCE_IND_DESC"] = e.CODE_DESC
          }
        })
      }

      if (name === "ITEM_LOC_STATUS") {
        totalData.map((row) => {
          if (row.LOC === value) {
            row["ITEM_LOC_STATUS"] = e.CODE
            row["ITEM_LOC_STATUS_DESC"] = e.CODE_DESC
          }
        })
      }
      if (name === "WEIGHT_PCT") {
        totalData.map((row) => {
          if (row.LOC === value) {
            row["WEIGHT_PCT"] = e.target.value
          }
        })
      }
    }
    if (Object.is(e, null) === true) {
      // console.log("inputValue; aty:::::::12345:::", totalData, e, value, name, Object.is(e, null))
      if (name === "LIKE_LOC" || name === "LIKE_LOC_DESC") {
        totalData.map((row) => {
          if (row.LOC === value) {
            row["LIKE_LOC"] = ""
            row["LIKE_LOC_DESC"] = ""
          }
        })
      }
      if (name === "CLEARANCE_IND") {
        totalData.map((row) => {
          if (row.LOC === value) {
            row["CLEARANCE_IND"] = ""
            row["CLEARANCE_IND_DESC"] = ""
          }
        })
      }

      if (name === "ITEM_LOC_STATUS") {
        totalData.map((row) => {
          if (row.LOC === value) {
            row["ITEM_LOC_STATUS"] = ""
            row["ITEM_LOC_STATUS_DESC"] = ""
          }
        })
      }
      // console.log("inputValue; aty:::::::555555:::", totalData, e, value,name)
    }
    setTotalData(totalData);
    setSampleVal([])
    setSorted(true);
  };

  const handleCopyDown = (e) => {
    for (const key in copyValue) {
      if (copyValue[key] === '') {
        delete copyValue[key];
      }
    }
    if (selected.length > 0) {
      const editData = tableLocData.filter((item) => {
        return selected.some((val) => {
          return item.LOC === val;
        });
      });

      const copyUpdate = editData.map(item => {
        Object.assign(item, copyValue);
        return item;
      })

      copyUpdate.map((obj) => {
        if (Object.keys(obj).includes("LOC")) {
          const temp = totalData.filter((obj1) =>
            obj1["LOC"] === obj["LOC"]
          )
        }
      })
    }
    setTotalData(totalData)
    setSampleVal([]);
  }

  const eraseValLikeLoc = (e) => {
    for (const key in copyValue) {
      if (copyValue[key] === '') {
        delete copyValue[key];
      }
    }

    if (selected.length > 0) {
      const editData = tableLocData.filter((item) => {
        return selected.some((val) => {
          return item.LOC === val;
        });
      });


      editData.map((row) => {
        if (Object.keys(row).includes("LIKE_LOC")) {
          row["LIKE_LOC"] = ""
          row["LIKE_LOC_DESC"] = ""
        }
      }
      )

      editData.map((obj) => {
        if (Object.keys(obj).includes("LOC")) {
          const temp = totalData.filter((obj1) =>
            obj1["LOC"] === obj["LOC"]

          )
        }
      })
    }


    setTotalData(totalData)
    setSampleVal([]);
  }

  const eraseValClearance = (e) => {
    for (const key in copyValue) {
      if (copyValue[key] === '') {
        delete copyValue[key];
      }
    }

    if (selected.length > 0) {
      const editData = tableLocData.filter((item) => {
        return selected.some((val) => {
          return item.LOC === val;
        });
      });


      editData.map((row) => {
        if (Object.keys(row).includes("CLEARANCE_IND")) {
          row["CLEARANCE_IND"] = ""
          row["CLEARANCE_IND_DESC"] = ""
        }
      }
      )

      editData.map((obj) => {
        if (Object.keys(obj).includes("LOC")) {
          const temp = totalData.filter((obj1) =>
            obj1["LOC"] === obj["LOC"]

          )
        }
      })
    }


    setTotalData(totalData)
    setSampleVal([]);
  }

  const eraseValStatus = (e) => {
    for (const key in copyValue) {
      if (copyValue[key] === '') {
        delete copyValue[key];
      }
    }

    if (selected.length > 0) {
      const editData = tableLocData.filter((item) => {
        return selected.some((val) => {
          return item.LOC === val;
        });
      });


      editData.map((row) => {
        if (Object.keys(row).includes("ITEM_LOC_STATUS")) {
          row["ITEM_LOC_STATUS"] = ""
          row["ITEM_LOC_STATUS_DESC"] = ""
        }
      }
      )

      editData.map((obj) => {
        if (Object.keys(obj).includes("LOC")) {
          const temp = totalData.filter((obj1) =>
            obj1["LOC"] === obj["LOC"]

          )
        }
      })
    }


    setTotalData(totalData)
    setSampleVal([]);
  }

  const eraseValWeight = (e) => {
    for (const key in copyValue) {
      if (copyValue[key] === '') {
        delete copyValue[key];
      }
    }

    if (selected.length > 0) {
      const editData = tableLocData.filter((item) => {
        return selected.some((val) => {
          return item.LOC === val;
        });
      });


      editData.map((row) => {
        if (Object.keys(row).includes("WEIGHT_PCT")) {
          row["WEIGHT_PCT"] = ""
        }
      }
      )

      editData.map((obj) => {
        if (Object.keys(obj).includes("LOC")) {
          const temp = totalData.filter((obj1) =>
            obj1["LOC"] === obj["LOC"]

          )
        }
      })
    }


    setTotalData(totalData)
    setSampleVal([]);
  }

  const SearchButtonLIKE_LOC = () => (
    [
      <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} >
        <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }}
          onClick={handleCopyDown}
        />
      </IconButton>
      ,
      <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} >
        <BsFillEraserFill fontSize="small"
          onClick={eraseValLikeLoc}
        />
      </IconButton>
    ]
  )

  const SearchButtonLIKE_LOC_DESC = () => (
    [
      <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} >
        <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }}
          onClick={handleCopyDown}
        />
      </IconButton>
      ,
      <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} >
        <BsFillEraserFill fontSize="small"
          onClick={eraseValLikeLoc}
        />
      </IconButton>
    ]
  )

  const SearchButtonClearance = () => (
    [
      <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} >
        <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }}
          onClick={handleCopyDown}
        />
      </IconButton>
      ,
      <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} >
        <BsFillEraserFill fontSize="small"
          onClick={eraseValClearance}
        />
      </IconButton>
    ]
  )

  const SearchButtonStatus = () => (
    [
      <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} >
        <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }}
          onClick={handleCopyDown}
        />
      </IconButton>
      ,
      <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} >
        <BsFillEraserFill fontSize="small"
          onClick={eraseValStatus}
        />
      </IconButton>
    ]
  )

  const SearchButtonWeight = () => (
    [
      <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} >
        <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }}
          onClick={handleCopyDown}
        />
      </IconButton>
      ,
      <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} >
        <BsFillEraserFill fontSize="small"
          onClick={eraseValWeight}
        />
      </IconButton>
    ]
  )

  const resetFilter = () => {
    setInputValue([]);

    if (inputValue.length === 0) {
      setTotalData(totalData);
      setSampleVal(totalData);
      setCopyValue(initialCopyValues);
      setInputValue([]);
    } else {
      setTotalData(totalData);
      setSampleVal(totalData);
      setCopyValue(initialCopyValues);
      setInputValue([]);
    }
  }
  const handleRowClick = (rowId) => {
    setSelectedRow(rowId);
  };

  return (
    // <div className="right-container">

    <div >
      {!AllRetreiverRLdataCheck ?
        <Box
          component="fieldset"
          //display="inline-block"
          sx={{
            backgroundColor: "",
            height: "100%",
            width: "100%",

            margin: "10px 0px 0px 10px",

            // backgroundColor: "rgb(250, 250, 250)",
            borderRadius: 1,

            boxShadow: 2, border: 0,
            borderBottom: 3,
            border: "1px solid lightgrey",
            // border:"1px dotted gray",
            // borderRadius:"5px",
          }}
        >



          <div>
            <Box
              display="inline-block"
              sx={{
                //width: "fit-content",
                //height: "auto",
              }}
            >
              {/* className={RulesLocationRightClasses.course_box} */}
              <div >
                {/* <div>
              {LocationTopPart()}
            </div> */}

                <div>
                  <Paper sx={{ marginTop: "10px", width: "100%", mb: 0, width: "calc(45.7vw - 0px)" }}>
                    <TableContainer
                      style={{
                        maxHeight: 480,
                        width: "auto",
                      }}
                      className={RulesLocationRightClasses.TitleHead}
                    // component={Paper}
                    >

                      <Table aria-label="customized table">
                        <EnhancedTableHead
                          numSelected={selected.length}
                          order={order}
                          orderBy={orderBy}
                          onSelectAllClick={handleSelectAllClick}
                          onRequestSort={handleRequestSort}
                          rowCount={totalData.length}
                        />
                        <TableBody sx={{ position: "sticky", top: -1, }}>

                          <TableCell padding="checkbox" className={RulesLocationRightClasses.TitleHead} sx={{ padding: "0px" }} >
                            <Grid item xs={1} style={{ padding: "0px", margin: "0px 0px 0px 0px" }}>
                              <IconButton small="small" onClick={resetFilter} sx={{ padding: "0px" }}>
                                <RestartAltIcon small="small" sx={{ padding: "0px" }} />
                              </IconButton>
                            </Grid>
                          </TableCell>
                          <TableCell sx={{ padding: "0px" }} className={RulesLocationRightClasses.TitleHead}>
                            <TextField
                              name="LOC"
                              value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("LOC") > 0 ? inputValue.LOC : ""}
                              onChange={testChange}
                              placeholder="Location"
                              autoComplete="off"
                              InputProps={{
                                style: { fontSize: 12, height: "20px" },
                              }}
                              variant="standard"
                              inputProps={{
                                // maxLength: 5,
                                sx: { padding: "0px", height: "20px", textAlign: "center", }
                              }}
                            />
                          </TableCell>

                          <TableCell sx={{ padding: "0px" }}>
                            <TextField
                              name="LOC_DESC"
                              onChange={testChange}
                              value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("LOC_DESC") > 0 ? inputValue.LOC_DESC : ""}
                              placeholder="Loc Desc"
                              autoComplete="off"
                              InputProps={{
                                style: { fontSize: 12, height: "20px" },
                              }}
                              variant="standard"
                              inputProps={{
                                // maxLength: 5,
                                sx: { padding: "0px", height: "20px", textAlign: "center", }
                              }}
                            />
                          </TableCell>

                          <TableCell sx={{ padding: "0px" }}>
                            <TextField
                              name="LOC_TYPE"
                              onChange={testChange}
                              value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("LOC_TYPE") > 0 ? inputValue.LOC_TYPE : ""}
                              autoComplete="off"
                              placeholder="Loc Type"
                              InputProps={{
                                style: { fontSize: 12, height: "20px" },
                              }}
                              variant="standard"
                              inputProps={{
                                // maxLength: 5,
                                sx: { padding: "0px", height: "20px", textAlign: "center", }
                              }}
                            />
                          </TableCell>

                          <TableCell sx={{ padding: "0px" }}>
                            <TextField
                              name="DEFAULT_WH"
                              onChange={testChange}
                              value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("DEFAULT_WH") > 0 ? inputValue.DEFAULT_WH : ""}
                              autoComplete="off"
                              placeholder="Default WH"
                              InputProps={{
                                style: { fontSize: 12, height: "20px" },
                              }}
                              variant="standard"
                              inputProps={{
                                // maxLength: 5,
                                sx: { padding: "0px", height: "20px", textAlign: "center", }
                              }}
                            />
                          </TableCell>

                          <TableCell sx={{ padding: "0px" }}>
                            <TextField
                              name="GROUP_ID"
                              value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("GROUP_ID") > 0 ? inputValue.GROUP_ID : ""}
                              onChange={testChange}
                              autoComplete="off"
                              placeholder="Group ID"
                              InputProps={{
                                style: { fontSize: 12, height: "20px" },
                              }}
                              variant="standard"
                              inputProps={{
                                // maxLength: 5,
                                sx: { padding: "0px", height: "20px", textAlign: "center", }
                              }}
                            />
                          </TableCell>

                          <TableCell sx={{ padding: "0px" }}>
                            <TextField
                              name="GROUP_DESC"
                              onChange={testChange}
                              value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("GROUP_DESC") > 0 ? inputValue.GROUP_DESC : ""}
                              autoComplete="off"
                              placeholder="Group Desc"
                              InputProps={{
                                style: { fontSize: 12, height: "20px" },
                              }}
                              variant="standard"
                              inputProps={{
                                // maxLength: 5,
                                sx: { padding: "0px", height: "20px", textAlign: "center", }
                              }}
                            />
                          </TableCell>

                          <TableCell sx={{ padding: "0px" }}>
                            <div style={{ display: "flex" }}>
                              <Select
                                name="LIKE_LOC"
                                // isDisabled={leftContData.RULE_TYPE === "Manual"}
                                placeholder="Like_Loc"
                                textAlign='center'
                                maxMenuHeight={150}
                                classNamePrefix="mySelect"
                                getOptionLabel={option =>
                                  `${option.STORE.toString()}`}
                                getOptionValue={option => option.STORE}
                                options={likeLocData}
                                isSearchable={true}
                                // onChange={(e) => handleChangeValue(e, "LIKE_LOC")}
                                onChange={handleChangeValue}
                                // onChange={(e) => { setLikeLocCopy(e?.LOC ?? ''); setLikeLocDesCopy(e?.LOC_DESC ?? '') }}
                                menuPlacement="bottom"
                                // isMulti
                                isClearable={true}
                                closeMenuOnSelect={true}
                                hideSelectedOptions={false}
                                value={likeLocData.filter(obj => copyValue?.LIKE_LOC === (obj.STORE))}
                                // sx={{ width: "80% !important" }}
                                // value={totalData.length>0? totalData[0]}
                                styles={styleSelect4}

                              // onChange={setLoc}
                              // style={{ maxWidth: '20px' }}
                              // components={animatedComponents}
                              />
                              <SearchButtonLIKE_LOC />
                            </div>
                          </TableCell>

                          <TableCell sx={{ padding: "0px" }}>
                            <div style={{ display: "flex" }}>
                              <Select
                                name="LIKE_LOC_DESC"
                                // isDisabled={leftContData.RULE_TYPE === "Manual"}
                                maxMenuHeight={150}
                                placeholder="Like_Loc_Desc"
                                //textAlign= 'left'
                                classNamePrefix="mySelect"
                                getOptionLabel={option =>
                                  `${option.STORE_DESC.toString()}`}
                                getOptionValue={option => option.STORE_DESC}
                                options={likeLocData}
                                isSearchable={true}
                                onChange={handleChangeValue}
                                // onChange={(e) => { setLikeLocCopy(e?.LOC ?? ''); setLikeLocDesCopy(e?.LOC_DESC ?? '') }}
                                menuPlacement="bottom"
                                // isMulti
                                isClearable={true}
                                closeMenuOnSelect={true}
                                hideSelectedOptions={false}
                                value={likeLocData.filter(obj => copyValue?.LIKE_LOC_DESC === (obj.STORE_DESC))}
                                // sx={{ width: "80% !important" }}
                                // value={Need.filter(obj => leftContData?.EXACT_IND_VAL === (obj.CODE_DESC))}
                                styles={styleSelect3}
                                // onChange={setLoc}
                                style={{ maxWidth: '20px' }}
                              // components={animatedComponents}
                              />
                              <SearchButtonLIKE_LOC_DESC />
                            </div>
                          </TableCell>

                          <TableCell sx={{ padding: "0px" }}>
                            <TextField
                              name="WEIGHT_PCT"
                              onChange={handleChangeWeight}
                              InputProps={{ endAdornment: <SearchButtonWeight />, style: { fontSize: 12, height: "20px" } }}
                              autoComplete="off"
                              variant="standard"
                              value={Object.keys(copyValue).length > 0 && Object.keys(copyValue).includes("WEIGHT_PCT") > 0 ? copyValue.WEIGHT_PCT : ""}
                            // InputProps={{ style: { fontSize: 12, height: "30px" } }}
                            />
                          </TableCell>

                          <TableCell sx={{ padding: "0px" }}>
                            <div style={{ display: "flex" }}>
                              <Select
                                name="CLEARANCE_IND"
                                // isDisabled={leftContData.RULE_TYPE === "Manual"}
                                placeholder="Clearance"
                                maxMenuHeight={150}
                                classNamePrefix="mySelect"
                                getOptionLabel={option =>
                                  `${option.CODE_DESC.toString()}`}
                                getOptionValue={option => option.CODE_DESC}
                                options={clearanceRLData}
                                isSearchable={true}
                                onChange={handleChangeValue}
                                // onChange={(e) => { setLikeLocCopy(e?.LOC ?? ''); setLikeLocDesCopy(e?.LOC_DESC ?? '') }}
                                menuPlacement="bottom"
                                // isMulti
                                isClearable={true}
                                closeMenuOnSelect={true}
                                hideSelectedOptions={false}
                                value={clearanceRLData.filter(obj => copyValue?.CLEARANCE_IND_DESC === (obj.CODE_DESC))}
                                // sx={{ width: "80% !important" }}
                                // value={Need.filter(obj => leftContData?.EXACT_IND_VAL === (obj.CODE_DESC))}
                                styles={styleSelect3}
                                // onChange={setLoc}
                                style={{ maxWidth: '20px' }}
                              // components={animatedComponents}
                              />
                              <SearchButtonClearance />
                            </div>
                          </TableCell>

                          <TableCell sx={{ padding: "0px" }}>
                            <div style={{ display: "flex" }}>
                              <Select
                                name="ITEM_LOC_STATUS"
                                // isDisabled={leftContData.RULE_TYPE === "Manual"}
                                placeholder="Status"
                                maxMenuHeight={150}
                                classNamePrefix="mySelect"
                                getOptionLabel={option =>
                                  `${option.CODE_DESC.toString()}`}
                                getOptionValue={option => option.CODE_DESC}
                                options={StatusRLData}
                                isSearchable={true}
                                onChange={handleChangeValue}
                                // onChange={(e) => { setLikeLocCopy(e?.LOC ?? ''); setLikeLocDesCopy(e?.LOC_DESC ?? '') }}
                                menuPlacement="bottom"
                                // isMulti
                                isClearable={true}
                                closeMenuOnSelect={true}
                                hideSelectedOptions={false}
                                value={StatusRLData.filter(obj => copyValue?.ITEM_LOC_STATUS_DESC === (obj.CODE_DESC))}
                                // sx={{ width: "80% !important" }}
                                // value={Need.filter(obj => leftContData?.EXACT_IND_VAL === (obj.CODE_DESC))}
                                styles={styleSelect3}
                                // onChange={setLoc}
                                style={{ maxWidth: '20px' }}
                              // components={animatedComponents}
                              />
                              <SearchButtonStatus />
                            </div>
                          </TableCell>


                          {/* {stableSort(totalData, getComparator(order, orderBy)) */}
                          {totalData
                            .map((row, index) => {
                              const isItemSelected = isSelected(row.LOC);
                              const labelId = `enhanced-table-checkbox-${index}`;
                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  aria-checked={isItemSelected}
                                  tabIndex={-1}
                                  key={row.LOC}
                                  selected={isItemSelected}
                                  onClick={() => handleRowClick(row.LOC)}
                                  style={selectedRow === row.LOC ? { backgroundColor: "#bc8f8f" } : null}
                                >
                                  <TableCell style={{
                                    padding: "0px"
                                  }}>
                                    <Checkbox
                                      size="small"
                                      // style={{ transform: "scale(0.8)" }}
                                      onClick={(event) => handleSingleClick(event, row?.LOC)}
                                      color="primary"
                                      checked={isItemSelected}
                                      inputProps={{
                                        'aria-labelledby': labelId,
                                      }}
                                      sx={{ padding: "0px" }}
                                    />
                                  </TableCell>

                                  <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}
                                  >
                                    {row.LOC}
                                  </TableCell>

                                  <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                    {/* {row.LOC_DESC} */}
                                    {String(row.LOC_DESC).length > 0 ?
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
                                        >
                                          {String(row.LOC_DESC).length > 0 && String(row.LOC_DESC).length < 5 ?
                                            row.LOC_DESC === "NULL" ? null : row.LOC_DESC
                                            : String(row.LOC_DESC).substring(0, 10)}
                                        </InputLabel>
                                        <Button sx={{
                                          backgroundColor: "", '&:hover': {
                                            backgroundColor: "",
                                          }, border: 0, color: "CadetBlue"
                                        }}
                                          style={{
                                            maxWidth: '0px', minWidth: '4px', justifyContent: "flex-start", paddingLeft: "0px", paddingRight: "0px"
                                          }}
                                          size='small'
                                          className={RulesLocationRightClasses.textField}
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
                                                  {row.LOC_DESC}
                                                </InputLabel>
                                              </div>
                                            )
                                          }}
                                          startIcon={<InfoIcon size="small" sx={{ padding: "0px" }} />}
                                        >
                                        </Button>
                                      </Box> : null}
                                  </TableCell>

                                  <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }} >
                                    {row.LOC_TYPE}
                                  </TableCell>

                                  <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                    {row.DEFAULT_WH}
                                  </TableCell>

                                  <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                    {row.GROUP_ID}
                                  </TableCell>

                                  <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                    {/* {row.GROUP_DESC} */}
                                    {String(row.GROUP_DESC).length > 0 ?
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
                                        >
                                          {String(row.GROUP_DESC).length > 0 && String(row.GROUP_DESC).length < 5 ?
                                            row.GROUP_DESC === "NULL" ? null : row.GROUP_DESC
                                            : String(row.GROUP_DESC).substring(0, 10) + "..."}
                                        </InputLabel>
                                        <Button sx={{
                                          backgroundColor: "", '&:hover': {
                                            backgroundColor: "",
                                          }, border: 0, color: "CadetBlue"
                                        }}
                                          style={{
                                            maxWidth: '0px', minWidth: '4px', justifyContent: "flex-start", paddingLeft: "0px", paddingRight: "0px"
                                          }}
                                          size='small'
                                          className={RulesLocationRightClasses.textField}
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
                                                  {row.GROUP_DESC}
                                                </InputLabel>
                                              </div>
                                            )
                                          }}
                                          startIcon={<InfoIcon size="small" sx={{ padding: "0px" }} />}
                                        >
                                        </Button>
                                      </Box> : null}
                                  </TableCell>

                                  <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                    <Select
                                      name="LIKE_LOC"
                                      // isDisabled={leftContData.RULE_TYPE === "Manual"}

                                      maxMenuHeight={150}
                                      classNamePrefix="mySelect"
                                      getOptionLabel={option =>
                                        `${option.STORE.toString()}`}
                                      getOptionValue={option => option.STORE}
                                      options={likeLocData}
                                      isSearchable={true}
                                      // onChange={(e) => { setLikeLocCopy(e?.LOC ?? ''); setLikeLocDesCopy(e?.LOC_DESC ?? '') }}
                                      menuPlacement="bottom"
                                      onChange={(e) =>
                                        // console.log("TREND::",e.target.value,e,row.ITEM,qtyLimitsData)
                                        onTableCellChange(e, row.LOC, "LIKE_LOC")
                                      }
                                      value={likeLocData.filter(obj => row?.LIKE_LOC === (obj.STORE))}
                                      // isMulti
                                      // defaultValue={row.LIKE_LOC}
                                      // value={String(row.LIKE_LOC)}
                                      isClearable={true}
                                      closeMenuOnSelect={true}
                                      hideSelectedOptions={false}
                                      // sx={{ width: "80% !important" }}
                                      // value={Need.filter(obj => leftContData?.EXACT_IND_VAL === (obj.CODE_DESC))}
                                      styles={styleSelect5}
                                      // onChange={setLoc}
                                      style={{ maxWidth: '20px' }}
                                    // components={animatedComponents}
                                    />

                                  </TableCell>

                                  <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                    <Select
                                      name="LIKE_LOC_DESC"
                                      // isDisabled={leftContData.RULE_TYPE === "Manual"}
                                      maxMenuHeight={150}
                                      classNamePrefix="mySelect"
                                      getOptionLabel={option =>
                                        `${option.STORE_DESC.toString()}`}
                                      getOptionValue={option => option.STORE_DESC}
                                      options={likeLocData}
                                      isSearchable={true}
                                      onChange={(e) =>
                                        // console.log("TREND::",e.target.value,e,row.ITEM,qtyLimitsData)
                                        onTableCellChange(e, row.LOC, "LIKE_LOC_DESC")
                                      }
                                      // onChange={(e) => { setLikeLocCopy(e?.LOC ?? ''); setLikeLocDesCopy(e?.LOC_DESC ?? '') }}
                                      menuPlacement="bottom"
                                      // isMulti
                                      value={likeLocData.filter(obj => row?.LIKE_LOC_DESC === (obj.STORE_DESC))}
                                      isClearable={true}
                                      closeMenuOnSelect={true}
                                      hideSelectedOptions={false}
                                      // sx={{ width: "80% !important" }}
                                      // value={row.LIKE_LOC_DESC}
                                      styles={styleSelect2}
                                      // onChange={setLoc}
                                      style={{ maxWidth: '20px' }}
                                    // components={animatedComponents}
                                    />
                                    {/* {row.LIKE_LOC_DESC} */}
                                  </TableCell>

                                  <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}
                                  >
                                    {/* {row.WEIGHT} */}
                                    <TextField
                                      InputProps={{
                                        style: { fontSize: 12, height: "20px" },
                                      }}
                                      // value={row.WOS}
                                      name="WEIGHT_PCT"
                                      onChange={(e) => onTableCellChange(e, row.LOC, "WEIGHT_PCT")}
                                      autoComplete="off"
                                      inputProps={{
                                        maxLength: 20,
                                        sx: { backgroundColor: '#fff', padding: "0px", height: "20px", textAlign: "center", }
                                      }}
                                      defaultValue={row.WEIGHT_PCT}
                                      value={row.WEIGHT_PCT}
                                    />
                                  </TableCell>

                                  <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                    <Select
                                      name="CLEARANCE_IND"
                                      // isDisabled={leftContData.RULE_TYPE === "Manual"}
                                      maxMenuHeight={150}
                                      classNamePrefix="mySelect"
                                      getOptionLabel={option =>
                                        `${option.CODE_DESC.toString()}`}
                                      getOptionValue={option => option.CODE_DESC}
                                      options={clearanceRLData}
                                      isSearchable={true}
                                      onChange={(e) =>
                                        // console.log("TREND::",e.target.value,e,row.ITEM,qtyLimitsData)
                                        onTableCellChange(e, row.LOC, "CLEARANCE_IND")
                                      }
                                      // onChange={(e) => { setLikeLocCopy(e?.LOC ?? ''); setLikeLocDesCopy(e?.LOC_DESC ?? '') }}
                                      menuPlacement="bottom"
                                      value={clearanceRLData.filter(obj => row?.CLEARANCE_IND_DESC === (obj.CODE_DESC))}
                                      // isMulti
                                      isClearable={true}
                                      closeMenuOnSelect={true}
                                      hideSelectedOptions={false}
                                      // sx={{ width: "80% !important" }}
                                      // value={Need.filter(obj => leftContData?.EXACT_IND_VAL === (obj.CODE_DESC))}
                                      styles={styleSelect2}
                                      // onChange={setLoc}
                                      style={{ maxWidth: '20px' }}
                                    // components={animatedComponents}
                                    />
                                    {/* {row.CLEARANCE_FLAG} */}
                                  </TableCell>
                                  <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                    <Select
                                      name="ITEM_LOC_STATUS"
                                      // isDisabled={leftContData.RULE_TYPE === "Manual"}
                                      maxMenuHeight={150}
                                      classNamePrefix="mySelect"
                                      getOptionLabel={option =>
                                        `${option.CODE_DESC.toString()}`}
                                      getOptionValue={option => option.CODE_DESC}
                                      options={StatusRLData}
                                      isSearchable={true}
                                      onChange={(e) =>
                                        // console.log("TREND::",e.target.value,e,row.ITEM,qtyLimitsData)
                                        onTableCellChange(e, row.LOC, "ITEM_LOC_STATUS")
                                      }
                                      // onChange={(e) => { setLikeLocCopy(e?.LOC ?? ''); setLikeLocDesCopy(e?.LOC_DESC ?? '') }}
                                      menuPlacement="bottom"
                                      value={StatusRLData.filter(obj => row?.ITEM_LOC_STATUS_DESC === (obj.CODE_DESC))}
                                      // isMulti
                                      isClearable={true}
                                      closeMenuOnSelect={true}
                                      hideSelectedOptions={false}
                                      // sx={{ width: "80% !important" }}
                                      // value={Need.filter(obj => leftContData?.EXACT_IND_VAL === (obj.CODE_DESC))}
                                      styles={styleSelect2}
                                      // onChange={setLoc}
                                      style={{ maxWidth: '20px' }}
                                    // components={animatedComponents}
                                    />
                                    {/* {row.STATUS} */}
                                  </TableCell>

                                  <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}
                                  >
                                    {/* {row.WEIGHT} */}
                                    <TextField
                                      InputProps={{
                                        style: { fontSize: 12, height: "20px" },
                                      }}
                                      // value={row.WOS}
                                      name="RELEASE_DATE"
                                      onChange={(e) => onTableCellChange(e, row.LOC, "RELEASE_DATE")}
                                      autoComplete="off"
                                      inputProps={{
                                        maxLength: 20,
                                        sx: { backgroundColor: '#fff', padding: "0px", height: "20px", textAlign: "center", }
                                      }}
                                      defaultValue={row.RELEASE_DATE}
                                      value={row.RELEASE_DATE}
                                    />
                                  </TableCell>
                                  {/* <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
                                <TextField
                                  InputProps={{
                                    style: { fontSize: 12, height: "30px" },
                                  }}
                                  value={row.LIKE_LOC}
                                  name="LIKE_LOC"
                                  // onChange={(e) => onChange(e, row.ITEM)}
                                  autoComplete="off"
                                  inputProps={{
                                    maxLength: 20,
                                  }}
                                />
                              </TableCell>
                              <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}>
                                <TextField
                                  InputProps={{
                                    style: { fontSize: 12, height: "30px" },
                                  }}
                                  value={row.LIKE_LOC_DESC}
                                  name="LIKE_LOC_DESC"
                                  // onChange={(e) => onChange(e, row.ITEM)}
                                  autoComplete="off"
                                  inputProps={{
                                    maxLength: 20,
                                  }}
                                />
                              </TableCell>
                              <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}>
                                <TextField
                                  InputProps={{
                                    style: { fontSize: 12, height: "30px" },
                                  }}
                                  value={row.WEIGHT}
                                  name="WEIGHT"
                                  // onChange={(e) => onChange(e, row.ITEM)}
                                  autoComplete="off"
                                  inputProps={{
                                    maxLength: 20,
                                  }}
                                />
                              </TableCell>
                              <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}>
                                <TextField
                                  InputProps={{
                                    style: { fontSize: 12, height: "30px" },
                                  }}
                                  value={row.CLEARANCE_FLAG}
                                  name="CLEARANCE_FLAG"
                                  // onChange={(e) => onChange(e, row.ITEM)}
                                  autoComplete="off"
                                  inputProps={{
                                    maxLength: 20,
                                  }}
                                />
                              </TableCell>
                              <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}>
                                <TextField
                                  InputProps={{
                                    style: { fontSize: 12, height: "30px" },
                                  }}
                                  value={row.STATUS}
                                  name="STATUS"
                                  // onChange={(e) => onChange(e, row.ITEM)}
                                  autoComplete="off"
                                  inputProps={{
                                    maxLength: 20,
                                  }}
                                />
                              </TableCell> */}
                                  {/* <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
                              <TextField
                                InputProps={{
                                  style: { fontSize: 12, height: "30px" },
                                }}
                                value={row.MIN_NEED}
                                name="MIN_NEED"
                                onChange={(e) => onChange(e, row.ITEM)}
                                autoComplete="off"
                                inputProps={{
                                  maxLength: 20,
                                }}
                              />
                            </StyledTableCell> */}

                                </TableRow >
                              );
                            })}
                          {/*  switch Data*/}

                          {totalData.length < 15 ?
                            [...Array(15 - (totalData.length)).keys()].map(val => (
                              <TableRow  >
                                <TableCell padding="checkbox" sx={{ padding: "0px", width: "1%" }}>
                                  <Checkbox size="small" sx={{ padding: "1px 0px 1px 0px" }} color="primary" disabled={true} />
                                </TableCell>
                                <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                {/* <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}></TableCell> */}
                                {/* <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}></TableCell>
                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} ></TableCell>
                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell> */}
                                <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                              </TableRow >
                            )) : false}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    {totalData.length > 0 ? <EnhancedTableToolbar numSelected={selected.length} /> : null}
                  </Paper>
                </div>
              </div>
            </Box>
          </div>


        </Box>
        : null}
    </div>
  );
};

export default RightContainer;








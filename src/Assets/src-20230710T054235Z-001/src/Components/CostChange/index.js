import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Table from "../../Components/Table/indexCC";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Modal from '@mui/material/Modal';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import Typography from '@mui/material/Typography';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Drawer from "@mui/material/Drawer";
import { makeStyles } from "@mui/styles";
import { getCostChangeRequest, postCostChangeRequest, getClassDataRequest, getLocationDataRequest } from "../../Redux/Action/costChange";
import CircularProgress from "@mui/material/CircularProgress";
import { headCells } from "./tableHead";
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SendIcon from '@mui/icons-material/Send';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import swal from '@sweetalert/with-react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

//import "./index.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const animatedComponents = makeAnimated();
const styleSelect = {
  control: base => ({
    ...base,
    border: 0,
    //border: "5px solid black",
    // This line disable the blue border
    boxShadow: 'none',
    borderBottom: "1px solid black"
  })
};


const useStyles = makeStyles({
  maindiv: {
    position: "relative",
    width: "calc(95vw - 0px)",
    '& table': {
      '& tr': {
        '& td:nth-child(28)': {
          display: 'none'
        },
        '& td:nth-child(29)': {
          display: 'none'
        },
        '& td:nth-child(30)': {
          display: 'none'
        }
      }
    }
  }, boxDiv: {
    textAlign: "initial",
    position: "relative",
    maxWidth: "100%",
  },
  uploaddiv: {
    display: "flex",
    alignItems: "center",
    marginTop: "50px",
    textAlign: "start",
    gap: 20,
  },
  GobackDiv: {
    cursor: "pointer",
  },
  textField: {
    marginRight: "10px !important",
  },
  dateField: {
    '& .MuiInput-input': {
      color: "rgba(102,102,102,1)",
    }
  },
});

const initialsearch = {
  HIER1: [],
  HIER2: [],
  HIER3: [],
  ITEM: [],
  LOCATION: [],
}

const initialItemData = {
  HIER1: "",
  HIER2: "",
  HIER3: "",
  ITEM: ""
}
const CostChange = () => {
  const [input, setInput] = useState("");
  const [inputH2, setInputH2] = useState("");
  const [inputH3, setInputH3] = useState("");
  const [inputItem, setInputItem] = useState("");
  const [inputLoc, setInputLoc] = useState("");
  const [valLoc, setValLoc] = useState([]);
  const [valH1, setValH1] = useState([]);
  const [valH2, setValH2] = useState([]);
  const [valH3, setValH3] = useState([]);
  const [valItem, setValItem] = useState([]);
  const [tabledata, setTabledata] = useState("");
  const [inputValue, setInputValue] = useState();
  const [allData, setAllData] = useState("");
  const [editRows, seteditRows] = useState([]);
  const [updateRow, setUpdateRow] = useState([]);
  const [itemData, setItemData] = useState(initialItemData);
  const [origItemData, setOrigItemData] = useState({});
  const [filterClass, setFilterClass] = useState([]);
  const [subfilterClass, setsubFilterClass] = useState([]);
  const [filterItem, setFilterItem] = useState([]);
  const [locationData, setLocationData] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [searchData, setSearchData] = useState(initialsearch);
  const [searched, setSearched] = useState();
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [freeze, setFreeze] = useState(false);
  const [open, setOpen] = useState(false);
  const [tabledataclone, setTabledataclone] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [load, setLoad] = useState(0);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const CostChangeClasses = useStyles();
  const CostChangeData = useSelector(
    (state) => state.CostChangeReducers
  );
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Cost Maintanence';
  }, []);

  //console.log("tabledata:",tabledata,"allData:",allData)

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const serializedata = (datatable) => {
    let newTabledata = [];
    if (datatable.length > 0) {
      datatable.map(item => {
        const reorder = {
          'ITEM': null,
          'ITEM_DESC': null,
          'LOCATION': null,
          'LOCATION_NAME': "",
          'ITEM_SOH': "",
          'UNIT_COST': "",
        }
        let test = Object.assign(reorder, item);
        newTabledata.push(test);
        // initialsearch.HIER1 = [];
        // initialsearch.HIER2 = [];
        // initialsearch.HIER3 = [];
        // initialsearch.ITEM = [];
        // initialsearch.LOCATION = [];
        // setSearchData(initialsearch)
      })
      setTabledataclone(newTabledata)
      return newTabledata;
    }
  }

  // console.log(1234,CostChangeData?.data?.Data,"sdddsdsdsd",Array.isArray(CostChangeData?.data?.Data))

  useEffect(() => {
    if (inputValue && freeze === false) {
      const filteredTable = tabledataclone.filter(props =>
        Object
          .entries(inputValue)
          .every(([key, val]) =>
            !val.length ||
            props[key]?.toString().toLowerCase().includes(val?.toString().toLowerCase()))
      )
      setTabledata(filteredTable);

    }
  }, [inputValue]);

  useEffect(() => {
    if (CostChangeData.isError) {
      if ((CostChangeData["message"]).length > 0) {
        setIsError(true);
        swal(
          <div>
            <p>{CostChangeData?.message}</p>
          </div>
        )
        CostChangeData.isError = false;
        setSearch(false);
      }
    } else if (CostChangeData.isSuccess) {
      if ((CostChangeData["message"]).length > 0) {
        setIsSuccess(true);
        //setLoading(() => window.location.reload(), 500)
        //setTimeout(() => window.location.reload(), 500)
        swal(
          <div>
            <p>{CostChangeData?.message}</p>
          </div>
        )

      }
    }
    else {
      setIsError(false);
      setIsSuccess(false);
      setTabledata("");
    }
  }, [CostChangeData])

  useEffect(() => {
    if (isSubmit) {
      setTimeout(() => {
        ////console.log("194 SD", searchData)

        dispatch(getCostChangeRequest([searchData]))
      }, 1000)
    }
  }, [isSubmit]);

  useEffect(() => {
    if (isSearch) {
      dispatch(getCostChangeRequest([searchData]))

    }
  }, [isSearch])

  useEffect(() => {
    setLoading(true);
    dispatch(getClassDataRequest([{}]));
    dispatch(getLocationDataRequest([{}]));

  }, [''])

  useEffect(() => { //console.log(12323454)
    if (CostChangeData?.data?.Data && Array.isArray(CostChangeData?.data?.Data)) {
      // console.log(1234)
      if (load === 0) {
        setTabledata(serializedata(CostChangeData?.data?.Data));
        setAllData(serializedata(CostChangeData?.data?.Data));
      }
      //  console.log("Data",Data)
      setLoading(false);
      setSubmit(false);
      setSearch(false);
      setLoad(0);
    } else if (CostChangeData?.data?.itemData && Array.isArray(CostChangeData?.data?.itemData)) {
      setItemData(CostChangeData?.data?.itemData);
      setOrigItemData(CostChangeData?.data?.itemData);
      setLoading(false);
    } else if (CostChangeData?.data?.locationData && Array.isArray(CostChangeData?.data?.locationData)) {
      setLocationData(CostChangeData?.data?.locationData);
      setLoading(false);
    } else {
      setSearch(false)
    }
  }, [CostChangeData?.data])
  // console.log("tabledata",CostChangeData)
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value == "") {
      setInputValue(prevState => ({
        ...prevState,
        [name]: value
      }));
      setTabledata(allData);
    } else {
      setInputValue(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  let UniqDept =
    itemData.length > 0
      ? [...new Map(itemData.map((item) => [item["HIER1"], item])).values()]
      : [];

  const SubmitList = () => {
    for (let i = 0; i < Object.values(updateRow).length; i++) {
      Object.values(updateRow)[i]["CREATE_ID"] = JSON.parse(localStorage.getItem("userData"))?.username;
    }
    //console.log("251 cc", Object.values(updateRow));
    if (Object.keys(updateRow).length > 0) {
      let sendRow = Object.values(updateRow);
      sendRow.map((item) => {
        delete item?.ITEM_DESC;
        delete item?.ITEM_SOH;
        delete item?.LOCATION_NAME;
        delete item?.undefined;
      })
      //console.log("post:", sendRow);
      dispatch(postCostChangeRequest(sendRow));
      setLoading(true);
      setSubmit(true);
      seteditRows([]);
      setOpen(false)
    } else {
      setOpen(true)
    }

  };
  const handleSubmit = (event) => {
    var check = 0;
    //console.log(searchData,inputH3)
    if (input.length > 0) {
      for (var i = 0; i < UniqDept.length; i++) {
        check = 1
        if ((UniqDept[i].HIER1).toUpperCase() === input.toUpperCase()) {
          handleHier1(0, UniqDept[i])
          setInput("");
          check = 2;
          break;
        }
      }
    } if (inputH2.length > 0 && (check === 0 || check === 2)) {
      if (filterClass.length > 0) {
        for (var i = 0; i < filterClass.length; i++) {
          if ((filterClass[i].HIER2).toUpperCase() === inputH2.toUpperCase()) {
            handleHier2(0, filterClass[i])
            setInputH2("");
            check = 2;
            break;
          }
          else {
            check = 1
          }
        }
      }
      else {
        check = 1
      }
    } if (inputH3.length > 0 && (check === 0 || check === 2)) {
      if (subfilterClass.length > 0) {
        for (var i = 0; i < subfilterClass.length; i++) {
          if ((subfilterClass[i].HIER3).toUpperCase() === inputH3.toUpperCase()) {
            handleHier3(0, subfilterClass[i]);
            setInputH3("");
            check = 2;
            break;
          }
          else {
            check = 1;
          }
        }
      }
      else {
        check = 1
      }
    } if (inputItem.length > 0 && (check === 0 || check === 2)) {
      if (filterItem.length > 0) {
        for (var i = 0; i < filterItem.length; i++) {
          if ((filterItem[i].ITEM).toUpperCase() === inputItem.toUpperCase()) {
            handleItem(0, filterItem[i]);
            setInputItem("");
            check = 2;
            break;
          }
          else {
            check = 1;
          }
        }
      }
      else {
        check = 1
      }
    } if (inputLoc.length > 0 && (check === 0 || check === 2)) {
      if (locationData.length > 0) {
        for (var i = 0; i < locationData.length; i++) {
          if (locationData[i].LOCATION === parseInt(inputLoc)) {
            selectLocation(0, locationData[i]);
            setInputLoc("");
            check = 2;
            break;
          } else {
            check = 1;
          }
        }
      }
      else {
        check = 1;
      }
    }
    if (check === 1) {
      swal(
        <div>
          <p>{"No Data Found"}</p>
        </div>
      )
      event.preventDefault();
      setState({ ...state, 'right': open });
      setLoad(1)
    } else {
      setLoad(0);
      event.preventDefault();
      setSearch(true);
      setState({ ...state, 'right': open });
    }
  }

  const onReset = (event) => {
    setLoad(0);
    setInput("");
    setInputH2("");
    setInputH3("");
    setInputItem("");
    setInputLoc("");
    initialsearch.HIER1 = [];
    initialsearch.HIER2 = [];
    initialsearch.HIER3 = [];
    initialsearch.ITEM = [];
    initialsearch.LOCATION = [];
    setSearchData(initialsearch);
    setValH1([]);
    setValH2([]);
    setValH3([]);
    setValItem([]);
    setValLoc([]);
    setFilterClass([]);
    setsubFilterClass([]);
    setFilterItem([]);
    seteditRows([]);
    setSearch(false);
    setTabledata("");
    setInputValue("");
  }

  const handleSearchColumn = (e) => {
    //console.log(inputValue);
    setFreeze(true);

  }

  const handleCopyDown = (e) => {
    ////console.log("Handle Copy Down",e);
    ////console.log("EditR",editRows);
    ////console.log("update",inputValue);

    // Filter object by single key
    // const test = Object.keys(inputValue).
    // filter((key) => key.includes(e)).
    // reduce((cur, key) => { return Object.assign(cur, { [key]: inputValue[key] })}, {});

    for (const key in inputValue) {
      if (inputValue[key] === '') {
        delete inputValue[key];
        //console.log("k",key);
      }
      if (inputValue.hasOwnProperty('ITEM')) {
        delete inputValue['ITEM'];
      }
    }
    if (editRows.length > 0) {
      const editData = tabledata.filter((item) => {
        return editRows.some((val) => {
          return item.SR_NO === val;
        });
      });
      const copyUpdate = editData.map(item => {
        Object.assign(item, inputValue);
        return item;
      })
      setTabledata(copyUpdate);
      setUpdateRow(copyUpdate);
      seteditRows([]);
      setInputValue("");
      setFreeze(false);
    } else {
      setFreeze(false);
    }

  }
  

  const handleHier1 = (e, value) => {
    let selectedDept = [];
    if (value.option) {
      valH1.push(value.option)
      // if (value.option.HIER1===input){ 
      //   setInput("");
      // }
      if ((value.option.HIER1).includes(input)) {
        setInput("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valH1.length; i++) {
        if (valH1[i]["HIER1"] === value.removedValue.HIER1) {
          index = i;
          break;
        }
      }
      valH1.splice(index, 1);
    } else if (value.action === "clear") {
      valH1.splice(0, valH1.length);
      valH2.splice(0, valH2.length);
      valH3.splice(0, valH3.length);
      valItem.splice(0, valItem.length);
      setSearchData((prev) => {
        return {
          ...prev,
          HIER2: [],
        };

      });
      setSearchData((prev) => {
        return {
          ...prev,
          HIER3: [],
        };

      });
      setSearchData((prev) => {
        return {
          ...prev,
          ITEM: [],
        };

      });

    }
    //manual input handle input and filter itemdata
    if (e === 0) {
      valH1.push(value);
    }
    //Filtering HIER2 based on HIER1
    if (valH1.length > 0) {
      const filterClass = itemData.filter((item) => {
        return (valH1).some((val) => {
          return item.HIER1 === val.HIER1;
        });
      });
      let UniqClass =
        filterClass.length > 0
          ? [
            ...new Map(
              filterClass.map((item) => [item["HIER2"], item])
            ).values(),
          ]
          : [];
      setFilterClass(UniqClass);
      valH1.map((item) => {
        selectedDept.push(item.HIER1);
      });
      setSearchData((prev) => {
        return {
          ...prev,
          HIER1: selectedDept,
        };

      });
      if (value.removedValue && searchData.HIER2.length > 0) {
        handleHier2("Filter", UniqClass)
      }
    } else {
      setFilterClass([])
      setsubFilterClass([]);
      setFilterItem([]);
      setSearchData((prev) => {
        return {
          ...prev,
          HIER1: []
        };
      });
    }
  }
  const handleHier2 = (e, value) => {
    let selectedHier2 = [];
    if (e === "Filter") {
      valH2.splice(0, valH2.length);
      valH2.push(...value);
    }


    if (value && e !== "Filter") {
      if (value.option) {
        //console.log(123)
        valH2.push(value.option)
        if ((value.option.HIER2).includes(inputH2)) {
          setInputH2("");
        }
      } else if (value.removedValue) {
        let index = 0
        for (var i = 0; i < valH2.length; i++) {
          if (valH2[i]["HIER2"] === value.removedValue.HIER2) {
            index = i;
            break;
          }
        }
        valH2.splice(index, 1);


      } else if (value.action === "clear") {
        valH2.splice(0, valH2.length);
        valH3.splice(0, valH3.length);
        valItem.splice(0, valItem.length);

        setSearchData((prev) => {
          return {
            ...prev,
            HIER3: [],
          };

        });
        setSearchData((prev) => {
          return {
            ...prev,
            ITEM: [],
          };

        });
      }
    }
    //manual input handle input and filter itemdata
    if (e === 0) {
      valH2.push(value);
    }
    //console.log("filter",valH2)
    //Filtering HIER2 based on HIER1
    if (valH2.length > 0) {
      ////console.log(1232)
      const filterSubClass = itemData.filter((item) => {
        return (valH2).some((val) => {
          return item.HIER2 === val.HIER2;
        });
      });
      let UniqClass =
        filterSubClass.length > 0
          ? [
            ...new Map(
              filterSubClass.map((item) => [item["HIER3"], item])
            ).values(),
          ]
          : [];
      setsubFilterClass(UniqClass);
      valH2.map((item) => {
        selectedHier2.push(item.HIER2);
      });
      //console.log("SH",selectedHier2)
      if ((e === "Filter" || value.removedValue) && searchData.HIER3.length > 0) {
        //console.log(123)
        handleHier3("Filter", UniqClass)
      }
      if (e !== "Filter") {
        setSearchData((prev) => {
          return {
            ...prev,
            HIER2: selectedHier2,
          };
        });
      }
      var filter_rem1 = selectedHier2.filter(function (i) {
        return this.indexOf(i) < 0;
      },
        searchData.HIER2)

      var filter_rem2 = searchData.HIER2.filter(function (i) {
        return this.indexOf(i) < 0;
      },
        selectedHier2)
      ////console.log("wew",elmts)
      if (filter_rem1.length > 0 || filter_rem2.length > 0) {
        var temp = [];
        filter_rem1.length > 0 ? temp = [...filter_rem1] : temp = [...filter_rem2]
        //console.log("wew",temp)
        for (var i = 0; i < temp.length; i++) {//console.log("Afvsd")
          const index = searchData.HIER2.indexOf(temp[i]);
          if (index > -1) {
            searchData.HIER2.splice(index, 1);
          }
          //console.log("searchData.HIER2",searchData.HIER2)
        }
      }


    } else {
      setsubFilterClass([]);
      setFilterItem([]);
      setSearchData((prev) => {
        return {
          ...prev,
          HIER2: []
        };
      });
    }
  }

  const handleHier3 = (e, value) => {
    if (e === "Filter") {
      valH3.splice(0, valH3.length);
      valH3.push(...value);
    }

    let selectedHier3 = [];
    if (value.option) {
      valH3.push(value.option)
      if ((value.option.HIER3).includes(inputH3)) {
        setInputH3("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valH3.length; i++) {
        if (valH3[i]["HIER3"] === value.removedValue.HIER3) {
          index = i;
          break;
        }
      }
      valH3.splice(index, 1);

    } else if (value.action === "clear") {
      valH3.splice(0, valH3.length);
      valItem.splice(0, valItem.length);
      setSearchData((prev) => {
        return {
          ...prev,
          ITEM: [],
        };

      });
    }
    //manual input handle input and filter itemdata
    if (e === 0) {
      valH3.push(value)
    }
    //Filtering HIER3 based on HIER2
    if (valH3.length > 0) {
      const filterItem = itemData.filter((item) => {
        return (valH3).some((val) => {
          return item.HIER3 === val.HIER3;
        });
      });
      setFilterItem(filterItem);
      valH3.map((item) => {
        selectedHier3.push(item.HIER3);
      });
      if (e !== "Filter") {
        setSearchData((prev) => {
          return {
            ...prev,
            HIER3: selectedHier3,
          };
        });
      }
      var filter_rem1 = selectedHier3.filter(function (i) {
        return this.indexOf(i) < 0;
      },
        searchData.HIER3)

      var filter_rem2 = searchData.HIER3.filter(function (i) {
        return this.indexOf(i) < 0;
      },
        selectedHier3)
      ////console.log("wew",elmts)
      if (filter_rem1.length > 0 || filter_rem2.length > 0) {
        var temp = [];
        filter_rem1.length > 0 ? temp = [...filter_rem1] : temp = [...filter_rem2]
        //console.log("wew",temp)
        for (var i = 0; i < temp.length; i++) {//console.log("Afvsd")
          const index = searchData.HIER3.indexOf(temp[i]);
          if (index > -1) {
            searchData.HIER3.splice(index, 1);
          }
          //console.log("searchData.HIER3",searchData.HIER3)
        }
      }
    } else {
      setFilterItem([]);
      setSearchData((prev) => {
        return {
          ...prev,
          HIER3: []
        };
      });
    }
  }

  const handleItem = (e, value) => {
    let selectedItem = [];
    if (value.option) {
      valItem.push(value.option)
      if ((value.option.ITEM).includes(inputItem)) {
        setInputItem("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valItem.length; i++) {
        if (valItem[i]["ITEM"] === value.removedValue.ITEM) {
          index = i;
          break;
        }
      }
      valItem.splice(index, 1);

    } else if (value.action === "clear") {
      valItem.splice(0, valItem.length);
    }
    //manual input handle input and filter itemdata
    if (e === 0) {
      valItem.push(value);
    }
    //Filtering ITEM based on HIER3
    if (valItem.length > 0) {

      valItem.map((item) => {
        selectedItem.push(item.ITEM);
      });
      setSearchData((prev) => {
        return {
          ...prev,
          ITEM: selectedItem,
        };
      });
    } else {
      setSearchData((prev) => {
        return {
          ...prev,
          ITEM: selectedItem,
        };
      });
    }
  }
  ////console.log("searchData",searchData)
  const selectLocation = (event, value) => {
    let selectedLocation = [];
    if (value.option) {
      valLoc.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //console.log(1234)
      //   setInputLoc("");
      // }
      if (String(value.option.LOCATION).includes(inputLoc)) {
        setInputLoc("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valLoc.length; i++) {
        if (valLoc[i]["LOCATION"] === value.removedValue.LOCATION) {
          index = i;
          break;
        }
      }
      valLoc.splice(index, 1);
    } else if (value.action === "clear") {
      valLoc.splice(0, valLoc.length);
    }
    if (event === 0) {
      valLoc.push(value)
    }
    if (valLoc.length > 0 && typeof valLoc[0]['LOCATION'] !== "undefined") {
      valLoc.map(
        (item) => {
          selectedLocation.push(item.LOCATION);
        }
      )
      setSearchData((prev) => {
        return {
          ...prev,
          LOCATION: selectedLocation,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid LOCATION"}</p>
        </div>
      )
    } else {
      initialsearch.LOCATION = "";
      setSearchData((prev) => {
        return {
          ...prev,
          LOCATION: [],
        };
      });
    }
  }
  const searchPanel = () => (
    <Box
      sx={{ width: 350, marginTop: '80px' }}
      role="presentation"
      component="form"
      onSubmit={handleSubmit}
    > <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
        <Stack spacing={2} sx={{ width: 250 }}>
          <Select
            closeMenuOnSelect={true}
            className="basic-multi-select"
            classNamePrefix="select"
            getOptionLabel={option =>
              `${option.HIER1.toString()}-${option.HIER1_DESC.toString()}`}
            getOptionValue={option => option.HIER1}
            options={UniqDept.length > 0 ? UniqDept : []}
            isSearchable={true}
            onInputChange={(value, action) => {
              // only set the input when the action that caused the
              // change equals to "input-change" and ignore the other
              // ones like: "set-value", "input-blur", and "menu-close"
              if (action.action === "input-change") setInput(value); // <---
            }}
            inputValue={input}
            onChange={handleHier1}
            placeholder={"Choose HIER1"}
            styles={styleSelect}
            components={animatedComponents}
            isMulti
            isClearable={true}
            value={UniqDept.filter(obj => searchData?.HIER1.includes(obj.HIER1))}
          />

          <Select
            closeMenuOnSelect={true}
            className="basic-multi-select"
            classNamePrefix="select"
            getOptionLabel={option =>
              `${option.HIER2.toString()}-${option.HIER2_DESC.toString()}`}
            getOptionValue={option => option.HIER2}
            options={(filterClass.length > 0) ? filterClass : []}
            onInputChange={(value, action) => {
              if (action.action === "input-change") setInputH2(value);
            }}
            inputValue={inputH2}
            isSearchable={true}
            onChange={handleHier2}
            placeholder={"Choose a HIER2"}
            styles={styleSelect}
            components={animatedComponents}
            isMulti
            value={filterClass.filter(obj => searchData?.HIER2.includes(obj.HIER2))}
          />

          <Select
            closeMenuOnSelect={true}
            className="basic-multi-select"
            classNamePrefix="select"
            getOptionLabel={option =>
              `${option.HIER3.toString()}-${option.HIER3_DESC.toString()}`}
            getOptionValue={option => option.HIER2}
            options={(subfilterClass.length > 0) ? subfilterClass : []}
            onInputChange={(value, action) => {
              if (action.action === "input-change") setInputH3(value);
            }}
            inputValue={inputH3}
            isSearchable={true}
            onChange={handleHier3}
            placeholder={"Choose a HIER3"}
            styles={styleSelect}
            components={animatedComponents}
            isMulti
            value={subfilterClass.filter(obj => searchData?.HIER3.includes(obj.HIER3))}
          />

          <Select
            //disabled={filterItem.length > 0 ?false:true}
            closeMenuOnSelect={true}
            className="basic-multi-select"
            classNamePrefix="select"
            getOptionLabel={option =>
              `${option.ITEM.toString()}`}
            getOptionValue={option => option.ITEM}
            options={(filterItem.length > 0) ? filterItem : []}
            onInputChange={(value, action) => {
              if (action.action === "input-change") setInputItem(value);
            }}
            inputValue={inputItem}
            isSearchable={true}
            onChange={handleItem}
            placeholder={"Choose a ITEM"}
            styles={styleSelect}
            components={animatedComponents}
            isMulti
            value={filterItem.filter(obj => searchData?.ITEM.includes(obj.ITEM))}
            isDisabled={filterItem.length > 0 ? false : true}
          />

          <Select
            closeMenuOnSelect={true}
            className="basic-multi-select"
            classNamePrefix="select"
            getOptionLabel={option =>
              `${option.LOCATION.toString()}-(${option.LOCATION_NAME.toString()})`}
            getOptionValue={option => option.LOCATION}
            options={locationData.length > 0 ? locationData : []}
            onInputChange={(value, action) => {
              if (action.action === "input-change") setInputLoc(value);
            }}
            inputValue={inputLoc}
            isSearchable={true}
            onChange={selectLocation}
            placeholder={"Choose a Location"}
            styles={styleSelect}
            components={animatedComponents}
            value={locationData.filter(obj => searchData?.LOCATION.includes(obj.LOCATION))}
            isMulti
          />
          <div>
            <Button
              className={CostChangeClasses.textField}
              type="submit"
              variant="contained"
              sx={{ width: '120px' }}
              startIcon={<SearchIcon />}
            >
              Search1
            </Button>
            <Button
              variant="contained"
              sx={{ width: '120px' }}
              onClick={onReset}
              startIcon={<RestartAltIcon />}
            >
              Reset
            </Button>
          </div>
        </Stack>
      </Grid>
    </Box>
  );
  const handleCancel = () => {
    setOpen(false)
  }
  const handleClose = () => {
    //setIsValidExcel(true);
    setOpen(false);
  };
  const handleClickOpen = () => setOpen(true);


  return (
    <Box className={CostChangeClasses.maindiv}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Box className={CostChangeClasses.boxDiv}>
            <div className={CostChangeClasses.uploaddiv}>
              <h4>Cost Maintenance</h4>
            </div>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex"
            justifyContent="flex-end"
            alignItems="flex-end" className={CostChangeClasses.boxDiv}>
            <div className={CostChangeClasses.uploaddiv}>
              {(Object.keys(updateRow).length > 0) &&
                <Button variant="contained" sx={{ marginTop: '15px' }} onClick={handleClickOpen} startIcon={<SendIcon />}>
                  Submit
                </Button>

              }
              <div>
                <Dialog
                  fullScreen={fullScreen}
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
                  className={CostChangeClasses.popUp}
                  PaperProps={{
                    style: {
                      backgroundColor: '#D3D3D3',
                      borderRadius: '20px',
                    },
                  }}
                >
                  <DialogTitle id="responsive-dialog-title">
                    {"This will permanently update the data!"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Please click continue to update.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button onClick={SubmitList} autoFocus>
                      Continue
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>


              <Button variant="contained" sx={{ marginTop: '15px', textAlign: 'right' }} onClick={toggleDrawer('right', true)} startIcon={<SearchIcon />}>Search1</Button>
              <Drawer
                anchor={'right'}
                open={state['right']}
                onClose={toggleDrawer('right', false)}
                transitionDuration={700}
              >
                {searchPanel('right')}
              </Drawer>
            </div>
          </Box>
        </Grid>
      </Grid>

      {loading ? (
        <CircularProgress color="inherit" />
      ) : (
        tabledata &&
        <Table
          tableData={tabledata}
          //handleDelete={handleDelete}
          handleSearchClick={handleSearchColumn}
          handleCopyDown={handleCopyDown}
          handleSearch={handleChange}
          searchText={inputValue}
          handleEdit={true}
          editRows={editRows}
          seteditRows={seteditRows}
          setUpdateRow={setUpdateRow}
          headCells={headCells}
          setTabledata={setTabledata}
          allData={allData}
          freeze={freeze}
          setTabledataclone={setTabledataclone}
          tabledataclone={allData}
          inputValue={inputValue}
          setInputValue={setInputValue}
          setSearched={setSearched}
          setAllData={setAllData}
          pageName="cost_maintenance"
        />
      )}

    </Box>
  );
};

export default CostChange;
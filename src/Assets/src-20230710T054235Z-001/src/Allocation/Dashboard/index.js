import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { getDailyCountRequest, getStageCountRequest, getErrorCountRequest } from "../../Redux/Action/dashBoard";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import RefreshIcon from '@mui/icons-material/Refresh';
import CircularProgress from "@mui/material/CircularProgress";
import { Chart as GoogleChart } from "react-google-charts";
import ApexChart from "react-apexcharts";
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LensBlurSharpIcon from '@mui/icons-material/LensBlurSharp';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import InputLabel from '@mui/material/InputLabel';
import {
  postDASHBOARDUSERALLOCRequest,
  postDASHBOARDRELEASECOUNTRequest,
  postDASHBOARDALLOCCOUNTRequest,
} from "../../Redux/Action/AllocDashboard";
import { Modal, Backdrop, Fade } from '@material-ui/core';
import { Pie } from '@ant-design/plots';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#d9d9d9",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

const pieData = [
  { 'name': 'Work', 'value': 11 },
  { 'name': 'Eat', 'value': 2 },
  { 'name': 'Commute', 'value': 2 },
  { 'name': 'Watch TV', 'value': 2 },
  { 'name': 'Sleep', 'value': 5 },
  { 'name': 'Tarun', 'value': 15 },
  { 'name': 'Akhil', 'value': 12 },
  { 'name': 'Sam', 'value': 3 },
  { 'name': 'Chandan', 'value': 8 },
]

const pieOptions = {
  title: "My Daily Activities",
  pieHole: 0.4,
  is3D: true,
  tooltip: {
    showColorCode: true,
    textStyle: {
      color: 'black',
      fontSize: 12,
    },
  },
  pieSliceTextStyle: {
    color: 'white',
    fontSize: 12,
  },
  legend: {
    // position: 'bottom',
    alignment: 'center',
    textStyle: {
      fontSize: 12,
      color: 'black',
    },
  },
  // backgroundColor: 'transparent',
  // pieSliceBorderColor: 'green',
  chartArea: {
    left: 50,
    top: 50,
    right: 0, bottom: 0,
    width: '80%',
    height: '80%',
    border: "1px solid blue",
  },
}

const options = {
  chart: { title: "Company Performance", },
  colors: ['DodgerBlue', 'yellow', 'green'],
};

const chartContainerStyle = {
  width: '100%',
  height: '100%',
  padding: '10px',
  boxSizing: 'border-box',
};

const BarData = [
  { 'ALLOC_CRITERIA': "PO", 'WS': 1000, 'APV': 400, 'RSV': 200 },
  { 'ALLOC_CRITERIA': "W", 'WS': 1170, 'APV': 460, 'RSV': 250 },
  { 'ALLOC_CRITERIA': "ASN", 'WS': 660, 'APV': 1120, 'RSV': 300 },
  { 'ALLOC_CRITERIA': "TSF", 'WS': 1030, 'APV': 540, 'RSV': 350 },
  { 'ALLOC_CRITERIA': "F", 'WS': 1170, 'APV': 460, 'RSV': 250 }
];

const BarData1 = [
  { 'RELEASE_DATE': "2023-07-10", 'WS': 10, 'APV': 5, 'RSV': 2 },
  { 'RELEASE_DATE': "2023-07-12", 'WS': 12, 'APV': 6, 'RSV': 3 },
  { 'RELEASE_DATE': "2023-07-15", 'WS': 15, 'APV': 3, 'RSV': 4 },
  { 'RELEASE_DATE': "2023-07-16", 'WS': 11, 'APV': 8, 'RSV': 5 },
  { 'RELEASE_DATE': "2023-07-18", 'WS': 9, 'APV': 2, 'RSV': 5 },
  { 'RELEASE_DATE': "2023-07-20", 'WS': 5, 'APV': 1, 'RSV': 2 },
  { 'RELEASE_DATE': "2023-07-23", 'WS': 1, 'APV': 9, 'RSV': 8 },
  { 'RELEASE_DATE': "2023-07-27", 'WS': 0, 'APV': 5, 'RSV': 3 },
  { 'RELEASE_DATE': "2023-07-30", 'WS': 4, 'APV': 0, 'RSV': 6 },
  { 'RELEASE_DATE': "2023-07-31", 'WS': 19, 'APV': 4, 'RSV': 7 },
  { 'RELEASE_DATE': "2023-07-10", 'WS': 10, 'APV': 5, 'RSV': 2 },
  { 'RELEASE_DATE': "2023-07-12", 'WS': 12, 'APV': 6, 'RSV': 3 },
  { 'RELEASE_DATE': "2023-07-15", 'WS': 15, 'APV': 3, 'RSV': 4 },
  { 'RELEASE_DATE': "2023-07-16", 'WS': 11, 'APV': 8, 'RSV': 5 },
  { 'RELEASE_DATE': "2023-07-18", 'WS': 9, 'APV': 2, 'RSV': 5 },
  { 'RELEASE_DATE': "2023-07-20", 'WS': 5, 'APV': 1, 'RSV': 2 },
  { 'RELEASE_DATE': "2023-07-23", 'WS': 1, 'APV': 9, 'RSV': 8 },
  { 'RELEASE_DATE': "2023-07-27", 'WS': 0, 'APV': 5, 'RSV': 3 },
  { 'RELEASE_DATE': "2023-07-30", 'WS': 4, 'APV': 0, 'RSV': 6 },
  { 'RELEASE_DATE': "2023-07-31", 'WS': 19, 'APV': 4, 'RSV': 7 },
];

const AllocDashboard = () => {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [DashUserAlloc, setDashUserAlloc] = useState([]);
  const [DashReleaseCount, setDashReleaseCount] = useState([]);
  const [DashAllocCount, setDashAllocCount] = useState([]);
  const [LoadCheck, setLoadCheck] = useState(false);

  const intialBarData = { "DAYS": 6 }

  const [reqBar, setReqBar] = useState(intialBarData);
  const [reqBar2, setReqBar2] = useState(intialBarData);

  const dispatch = useDispatch();
  const DashBoardData = useSelector(
    (state) => state.allocDashboardReducers
  );

  useEffect(() => {
    setDashUserAlloc([]); setDashReleaseCount([]); setDashAllocCount([]);
    dispatch(postDASHBOARDUSERALLOCRequest([{}]));
    dispatch(postDASHBOARDRELEASECOUNTRequest([reqBar]));
    dispatch(postDASHBOARDALLOCCOUNTRequest([reqBar2]));
    setLoadCheck(true);
  }, [""]);
  //console.log(DashBoardData);

  useEffect(() => {
    document.title = 'Dashboard';
  }, []);

  useEffect(() => {
    if (
      DashBoardData?.data?.DashUserAlloc
      && Array.isArray(DashBoardData?.data?.DashUserAlloc)
    ) {
      setDashUserAlloc(DashBoardData?.data?.DashUserAlloc);
      setLoading(false);
    } else if (
      DashBoardData?.data?.DashReleaseCount
      && Array.isArray(DashBoardData?.data?.DashReleaseCount)
    ) {
      setDashReleaseCount(DashBoardData?.data?.DashReleaseCount);
      setLoading(false);
    } else if (
      DashBoardData?.data?.DashAllocCount
      && Array.isArray(DashBoardData?.data?.DashAllocCount)
    ) {
      setDashAllocCount(DashBoardData?.data?.DashAllocCount);
      setLoading(false);
    }
    setLoadCheck(false);
  }, [DashBoardData?.data]);

  console.log("DashAllocCount: ", DashAllocCount, DashReleaseCount, DashUserAlloc);

  const series = DashAllocCount.length > 0 ? Object.keys(DashAllocCount[0])
    .filter(key => key !== 'ALLOC_CRITERIA')
    .map(key => ({
      name: key,
      data: DashAllocCount.map(item => item[key]),
    })) : []

  const series2 = DashReleaseCount.length > 0 ? Object.keys(DashReleaseCount[0])
    .filter(key => key !== 'RELEASE_DATE')
    .map(key => ({
      name: key,
      data: DashReleaseCount.map(item => item[key]),
    })) : []

  const series1 = pieData.map(item => item.value);
  const seriesDonut = pieData.map(item => item.value);

  const pieData1 = DashUserAlloc.length > 0 ? [['Task', 'Hours per Day'], ...DashUserAlloc.map(({ CREATE_ID, ALLOC_NO }) => [`${CREATE_ID} - ${ALLOC_NO}`, ALLOC_NO])] : []

  // const series = []
  // const series2 = []
  // const pieData1 = []


  const options1 = {
    chart: { title: "Company Performance" },
    xaxis: { categories: BarData.map(item => item.ALLOC_CRITERIA) },
    dataLabels: {
      style: {
        colors: ['Black'],
      }
    }
  };


  const options2 = {
    chart: { title: "Company Performance", },
    xaxis: { categories: pieData.map(item => item.name) },
    dataLabels: {
      style: {
        colors: ['white'],
      },
    },
    labels: pieData.map(item => item.name),
  };

  const options3 = {
    chart: { title: "Company Performance", stacked: true, },
    xaxis: { categories: DashAllocCount.map(item => item.ALLOC_CRITERIA) },
    dataLabels: {
      style: {
        colors: ['transparent'],
      },
    },
    colors: ['#b4b4b4', '#ffbf00', '#00a800'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "80%",
        endingShape: "flat"
      },
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'right',
      fontSize: '12px',
      fontWeight: 500
    }
  };

  const options4 = {
    chart: { title: "Company Performance", stacked: true, },
    xaxis: { categories: DashReleaseCount.map(item => item.RELEASE_DATE) },
    dataLabels: {
      style: {
        colors: ['transparent'],
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "80%",
        endingShape: "flat",
      },
      align: 'right' // Move the series to the right
    },
    colors: ['#b4b4b4', '#ffbf00', '#00a800'],
    legend: {
      position: 'bottom',
      horizontalAlign: 'right',
      fontSize: '12px',
      fontWeight: 500
    }
  };

  const handleCheckboxChange = (event) => {
    const target = event.target;
    const name = target.name;
    //const allocType = name === 'adHocAllocations' ? "A" : name === 'childAllocations' ? "C" : name === 'scheduledAllocations' ? "S" : searchData.ALLOC_TYPE;
    // Unselect all other checkboxes

    setReqBar(prevSearchData => {
      return {
        ...prevSearchData,
        DAYS: name === "WEEKLY" ? 6 : 13
      }
    });
    setDashReleaseCount([]);
    dispatch(postDASHBOARDRELEASECOUNTRequest([{ DAYS: name === "WEEKLY" ? 6 : 13 }]));
    setLoadCheck(true);
  };

  const handleCheckboxChange2 = (event) => {
    const target = event.target;
    const name = target.name;
    //const allocType = name === 'adHocAllocations' ? "A" : name === 'childAllocations' ? "C" : name === 'scheduledAllocations' ? "S" : searchData.ALLOC_TYPE;
    // Unselect all other checkboxes

    setReqBar2(prevSearchData => {
      return {
        ...prevSearchData,
        DAYS: name === "WEEKLY" ? 6 : name === "MONTHLY" ? 30 : 90
      }
    });
    setDashAllocCount([]);
    dispatch(postDASHBOARDALLOCCOUNTRequest([{ DAYS: name === "WEEKLY" ? 6 : name === "MONTHLY" ? 30 : 90 }]));
    setLoadCheck(true);
  };

  const colorPalette = ['DodgerBlue', 'rgb(255, 80, 16)', 'Orange', '#00a800', 'yellowgreen', '#ffe854', '#FFC0CB', '#ab4e52','#ffbf00']; // Array of pleasant colors


  const config = {
    appendPadding: 10,
    data: DashUserAlloc && DashUserAlloc.length > 0 ? DashUserAlloc : [],
    angleField: 'ALLOC_NO',
    colorField: 'CREATE_ID',
    radius: 0.9,
    label: false,
    innerRadius: 0.4,
    interactions: [
      {
        type: 'element-active',
      },
    ],
    pieStyle: {
      stroke: 'white', // Color for the stroke around each slice
    },
    color: colorPalette,
    legend: {
      itemFormatter: (value, item) => `${item.CREATE_ID} - ${item.ALLOC_NO}`, // Format the legend item as 'type - value'
      itemName: {
        style: {
          fontSize: 12,padding: 0,
        },
      }, itemMarginBottom: 5,      
    },
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, marginTop: "70px" }}>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }} >
          <Grid item xs={6}>  <h4 style={{ margin: '0px', paddingLeft: "15px" }}> Allocation Dashboard</h4> </Grid>
          <Grid xs={6} sx={{ textAlign: 'right' }}>
            {/* <Button size="small" variant="contained" onClick={() => setRefresh(true)}startIcon={<RefreshIcon />}>Refresh Akhil</Button> */}
          </Grid>
        </Grid>
      </Box>

      {
        loading ? (
          <Box sx={{ flexGrow: 1 }}>
            <CircularProgress color="inherit" />
          </Box>
        ) : (
          <Box sx={{ flexGrow: 1, marginTop: "10px", width: "calc(93.6vw - 0px)", }}>
            {/* <Grid container spacing={{ xs: 3, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ marginTop: "100px" }}>
            <Grid item xs={2} sm={4} md={4}>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
            </Grid>
          </Grid> */}
            {/* <Box display="inline-block"
              sx={{ margin: "0px 0px 0px 5px", mb: 0, height: "auto", border: 0, width: "100%", }}
            >
              <Grid container spacing={1} columns={{ xs: 4, sm: 6, md: 9 }} sx={{ margin: "25px 10px 0px 0px", justifyContent: "space-around", padding: "10px" }}>
                <Grid item xs={2} sm={0} md={2} style={{ position: "relative", width: "200px" }}>
                  <Item style={{ background: "#f5f5f5", height: "150px" }}>
                    <div style={{
                      width: "45px", // Specify the desired width in pixels
                      height: "45px", // Specify the desired height in pixels
                      margin: "auto",
                      background: "black",
                      position: "absolute",
                      top: 15,
                      left: 45,
                      //top: "50%",
                      // left: "50%",
                      transform: "translate(-50%, -50%)",
                      borderRadius: "5px",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <DashboardIcon fontSize="medium" />
                    </div>
                    <div style={{
                      display: "flex", justifyContent: "flex-end", flexDirection: "column", alignItems: "flex-end", height: "80px", //border: "1px solid red"
                    }}>
                      <div style={{// border: "1px solid green",
                        position: "absolute", top: 20, right: 10
                      }}>
                        <span style={{ textAlign: "right" }}>Allocations</span>
                        <h4 style={{ textAlign: "right", fontSize: "25px", color: "black", fontWeight: "bold", margin: "0" }}>281</h4>
                      </div>
                    </div>
                    <div style={{
                      height: "2px", background: "linear-gradient(to right, rgba(0, 0, 0, 0), #818589, rgba(0, 0, 0, 0))",
                      animation: "fading-ends 2s infinite"
                    }}></div>


                    <div style={{ marginTop: "10px" }}>
                      <span style={{ textAlign: "right" }}> Updated just now</span></div>

                  </Item>
                </Grid>

                <Grid item xs={2} sm={3} md={2} style={{ position: "relative", width: "200px" }}>
                  <Item style={{ background: "#f5f5f5", height: "150px", }}>
                    <div
                      style={{
                        width: "45px", // Specify the desired width in pixels
                        height: "45px", // Specify the desired height in pixels
                        margin: "auto",
                        background: "#50C878",
                        position: "absolute",
                        top: 15,
                        left: 45,
                        //top: "50%",
                        // left: "50%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "5px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <LocalShippingIcon fontSize="medium" />
                    </div>
                    <div style={{
                      display: "flex", justifyContent: "flex-end", flexDirection: "column", alignItems: "flex-end", height: "80px", //border: "1px solid red"
                    }}>
                      <div style={{// border: "1px solid green",
                        position: "absolute", top: 20, right: 10
                      }}>
                        <span style={{ textAlign: "right" }}>Closed</span>
                        <h4 style={{ textAlign: "right", fontSize: "25px", color: "black", fontWeight: "bold", margin: "0" }}>15</h4>
                      </div>
                    </div>
                    <div style={{
                      height: "2px", background: "linear-gradient(to right, rgba(0, 0, 0, 0), #818589, rgba(0, 0, 0, 0))",
                      animation: "fading-ends 2s infinite"
                    }}></div>
                    <div style={{ marginTop: "10px" }}>
                      <span style={{ textAlign: "right", color: "#4CBB17", fontWeight: "bold", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)" }}>+5% </span>
                      <span style={{ textAlign: "right" }}> than last week</span>
                    </div>

                  </Item>
                </Grid>
                <Grid item xs={2} sm={0} md={2} style={{ position: "relative", width: "200px", }}>
                  <Item style={{ background: "#f5f5f5", height: "150px" }}>
                    <div style={{
                      width: "45px", // Specify the desired width in pixels
                      height: "45px", // Specify the desired height in pixels
                      margin: "auto",
                      background: "#0096FF",
                      position: "absolute",
                      top: 15,
                      left: 45,
                      //top: "50%",
                      // left: "50%",
                      transform: "translate(-50%, -50%)",
                      borderRadius: "5px",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <CheckCircleOutlineSharpIcon fontSize="medium" />
                    </div>
                    <div style={{
                      display: "flex", justifyContent: "flex-end", flexDirection: "column", alignItems: "flex-end", height: "80px", //border: "1px solid red"
                    }}>
                      <div style={{// border: "1px solid green",
                        position: "absolute", top: 20, right: 10
                      }}>
                        <span style={{ textAlign: "right" }}>Reserved</span>
                        <h4 style={{ textAlign: "right", fontSize: "25px", color: "black", fontWeight: "bold", margin: "0" }}>81</h4>
                      </div>
                    </div>
                    <div style={{
                      height: "2px", background: "linear-gradient(to right, rgba(0, 0, 0, 0), #818589, rgba(0, 0, 0, 0))",
                      animation: "fading-ends 2s infinite"
                    }}></div>
                    <div style={{ marginTop: "10px" }}>
                      <span style={{ textAlign: "right" }}> Updated just now</span>
                    </div>


                  </Item>
                </Grid>

                <Grid item xs={2} sm={3} md={2} style={{ position: "relative", width: "200px" }}>
                  <Item style={{ background: "#f5f5f5", height: "150px", }}>
                    <div
                      style={{
                        width: "45px", // Specify the desired width in pixels
                        height: "45px", // Specify the desired height in pixels
                        margin: "auto",
                        background: "#ab4e52",
                        position: "absolute",
                        top: 15,
                        left: 45,
                        //top: "50%",
                        // left: "50%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "5px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <LensBlurSharpIcon fontSize="medium" />
                    </div>
                    <div style={{
                      display: "flex", justifyContent: "flex-end", flexDirection: "column", alignItems: "flex-end", height: "80px", //border: "1px solid red"
                    }}>
                      <div style={{// border: "1px solid green",
                        position: "absolute", top: 20, right: 10
                      }}>
                        <span style={{ textAlign: "right" }}>Approved</span>
                        <h4 style={{ textAlign: "right", fontSize: "25px", color: "black", fontWeight: "bold", margin: "0" }}>35</h4>
                      </div>
                    </div>
                    <div style={{
                      height: "2px", background: "linear-gradient(to right, rgba(0, 0, 0, 0), #818589, rgba(0, 0, 0, 0))",
                      animation: "fading-ends 2s infinite"
                    }}></div>
                    <div style={{ marginTop: "10px" }}>
                      <span style={{ textAlign: "right" }}> This month</span>
                    </div>

                  </Item>
                </Grid>
              </Grid>

            </Box> */}

            <div >
              <Box display="inline-block"
                sx={{ margin: "5px 0px 0px 5px", mb: 0, height: "auto", border: 0, width: "100%" }}
              >
                {/* <Box display="inline-block" sx={{
                  borderRadius: 0, boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)", border: 0, borderBottom: 3,
                  width: "500px", margin: "0px 0px 0px 5px", height: "300px"
                }}>
                  <div style={chartContainerStyle}>
                    <GoogleChart
                      chartType="Bar"
                      width="100%"
                      height="100%"
                      // data={data}
                      data={[['ALLOC_CRITERIA', 'WS', 'APV', 'RSV'], ...BarData.map(({ ALLOC_CRITERIA, WS, APV, RSV }) => [ALLOC_CRITERIA, WS, APV, RSV])]}
                      options={options}
                    /></div>
                </Box>
                <Box display="inline-block" sx={{
                  verticalAlign: "top",
                  borderRadius: 1, boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)", border: 0, borderBottom: 3,
                  width: "500px", margin: "0px 0px 0px 5px", height: "300px"
                }}>
                  <ApexChart
                    options={options1}
                    series={series}
                    type="bar"
                    width="100%"
                    height="100%"

                  />
                </Box> */}
                {DashReleaseCount.length > 0 ?
                  <Box display="inline-block" sx={{
                    verticalAlign: "top",
                    borderRadius: 1, boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)", border: 0, borderBottom: 3,
                    width: "500px", margin: "5px 0px 0px 5px", height: "300px"
                  }}>
                    <ApexChart
                      options={options4}
                      series={series2}
                      type="bar"
                      width="100%"
                      height="100%"
                    />
                    <div style={{ position: 'relative', top: '-26px', width: "fit-content" }}>
                      <FormControlLabel
                        size="small"
                        sx={{ padding: "0px 0px 0px 4px", margin: "0px 0px 0px 0px", }}
                        control={
                          <Radio
                            size="small" name="WEEKLY"
                            sx={{ margin: "0px 0px 0px 0px", padding: "2px", }}
                            onChange={handleCheckboxChange}
                            checked={reqBar.DAYS === 6}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                        }
                        label={<InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "1px 5px 0px 0px", padding: "0px 0px 0px 0px", display: 'inline', float: 'left', }}>
                          Weekly</InputLabel>}
                      />
                      <FormControlLabel
                        size="small"
                        sx={{ padding: "0px 0px 0px 4px", margin: "0px 0px 0px 0px", }}
                        control={
                          <Radio
                            size="small" name="BI-WEEKLY"
                            sx={{ margin: "0px 0px 0px 0px", padding: "2px", }}
                            onChange={handleCheckboxChange}
                            checked={reqBar.DAYS === 13}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                        }
                        label={<InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "1px 5px 0px 0px", padding: "0px 0px 0px 0px", display: 'inline', float: 'left', }}>
                          Bi-Weekly</InputLabel>}
                      />
                    </div>
                  </Box> : null}
                {/* <Box display="inline-block" sx={{
                  verticalAlign: "top",
                  borderRadius: 1, boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)", border: 0, borderBottom: 3,
                  width: "500px", margin: "0px 0px 0px 5px", height: "300px"
                }}>
                  <ApexChart
                    options={options2}
                    series={series1}
                    type="donut"
                    width="100%"
                    height="100%"
                  />
                </Box> */}
                {DashAllocCount.length > 0 ?
                  <Box display="inline-block" sx={{
                    verticalAlign: "top",
                    borderRadius: 1, boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)", border: 0, borderBottom: 3,
                    width: "500px", margin: "5px 0px 0px 5px", height: "300px"
                  }}>
                    <ApexChart
                      options={options3}
                      series={series}
                      type="bar"
                      width="100%"
                      height="100%"
                    />
                    <div style={{ position: 'relative', top: '-26px', width: "fit-content" }}>
                      <FormControlLabel
                        size="small"
                        sx={{ padding: "0px 0px 0px 4px", margin: "0px 0px 0px 0px", }}
                        control={
                          <Radio
                            size="small" name="WEEKLY"
                            sx={{ margin: "0px 0px 0px 0px", padding: "2px", }}
                            onChange={handleCheckboxChange2}
                            checked={reqBar2.DAYS === 6}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                        }
                        label={<InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "1px 5px 0px 0px", padding: "0px 0px 0px 0px", display: 'inline', float: 'left', }}>
                          Weekly</InputLabel>}
                      />
                      <FormControlLabel
                        size="small"
                        sx={{ padding: "0px 0px 0px 4px", margin: "0px 0px 0px 0px", }}
                        control={
                          <Radio
                            size="small" name="MONTHLY"
                            sx={{ margin: "0px 0px 0px 0px", padding: "2px", }}
                            onChange={handleCheckboxChange2}
                            checked={reqBar2.DAYS === 30}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                        }
                        label={<InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "1px 5px 0px 0px", padding: "0px 0px 0px 0px", display: 'inline', float: 'left', }}>
                          Monthly</InputLabel>}
                      />
                      <FormControlLabel
                        size="small"
                        sx={{ padding: "0px 0px 0px 4px", margin: "0px 0px 0px 0px", }}
                        control={
                          <Radio
                            size="small" name="QUATERLY"
                            sx={{ margin: "0px 0px 0px 0px", padding: "2px", }}
                            onChange={handleCheckboxChange2}
                            checked={reqBar2.DAYS === 90}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                        }
                        label={<InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "1px 5px 0px 0px", padding: "0px 0px 0px 0px", display: 'inline', float: 'left', }}>
                          Quaterly</InputLabel>}
                      />
                    </div>
                  </Box> : null}
                {/* {DashUserAlloc.length > 0 ?
                  <Box display="inline-block" sx={{
                    width: "500px", margin: "5px 0px 0px 5px",
                    borderRadius: 1, boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)", border: 0, borderBottom: 3,
                    height: "300px"
                  }}>
                    <GoogleChart
                      width={'400px'}
                      height={'250px'}
                      chartType="PieChart"
                      loader={<div>Loading Chart</div>}
                      data={pieData1}
                      options={pieOptions}
                    />
                  </Box> : null} */}
                {DashUserAlloc.length > 0 ?
                  <Box display="inline-block" sx={{
                    verticalAlign: "top",
                    width: "500px", margin: "5px 0px 0px 5px",
                    borderRadius: 1, boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)", border: 0, borderBottom: 3,
                    height: "300px",//border:"1px solid red"
                  }}>
                    <Pie {...config} />
                  </Box> : null}
              </Box>
              {/* <Box
            sx={{ display: "inline-block",margin: "0px 0px 0px 5px", mb: 0, width: "calc(94vw - 0px)", height: "400px", border: "1px solid red" }}
              // sx={{
              //   display: "inline-block",
              //   border: "1px solid red",
              //   height: "400px", // Adjust the height as per your requirement
              // }}
            >
              <Box
                sx={{
                  display: "inline-block",
                  width: "500px",
                  borderRadius: 1,
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
                  border: 0,
                  borderBottom: 3,
                  height: "100%",
                }}
              >
                <GoogleChart
                  width={"100%"}
                  height={"100%"}
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={[['Task', 'Hours per Day'], ...pieData.map(({ name, value }) => [`${name} - ${value}`, value])]}
                  options={pieOptions}
                />
              </Box>
              <Box
                sx={{
                  display: "inline-block",
                  width: "500px",
                  borderRadius: 1,
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
                  border: 0,
                  borderBottom: 3,
                  height: "100%",
                }}
              >
                  <GoogleChart
                    chartType="Bar"
                    width="100%"
                    height="100%"
                    data={[['ALLOC_CRITERIA', 'WS', 'APV', 'RSV'], ...BarData.map(({ ALLOC_CRITERIA, WS, APV, RSV }) => [ALLOC_CRITERIA, WS, APV, RSV])]}
                    options={options}
                  />
              </Box>
              <Box
                sx={{
                  display: "inline-block",
                  width: "500px",
                  borderRadius: 1,
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
                  border: 0,
                  borderBottom: 3,
                  height: "100%",
                }}
              >
                <ApexChart
                  options={options1}
                  series={series}
                  type="bar"
                  width="100%"
                />
              </Box>
            </Box> */}

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

          </Box>
        )
      }

    </>
  );
}
export default AllocDashboard;


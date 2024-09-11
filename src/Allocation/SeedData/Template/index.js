import React, { useEffect, useState } from "react";
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

const useStyles = makeStyles({
  stagemaindiv: {
    position: "relative",
    width: "calc(95vw - 64px)",
    '& table': {
      '& tr': {
        '& td:nth-child(14)': {
          display: 'none'
        },
        '& td:nth-child(15)': {
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
    marginTop: "80px",
    marginLeft: "20px",
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

const TemplateDownload = () => {

  const [template, setTemplate] = useState("");
  const [selectedFile, setSelectedFile] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState("");
  const [templateList, setTemplateList] = useState([]);
  // Create a file named excelFiles.js (or any name you prefer)
  const requireContext = require.context('../Template/templates', false, /\.xlsx$/);
  
  useEffect(() => {
    
    const fileNames = requireContext.keys().map(file => {
      return file.replace('./', '');
    });    
    const template_list = fileNames.map(fileName => {
      const label = fileName.replace('.xlsx', '');
      const value = label.replace('_TEMPLATE', '');
      return { value, label };
    });
    setTemplateList(template_list);
    // console.log("fileNames :",fileNames,template_list)
  }, []);


  // const template_list = [{ value: 'HIER1', label: "HIER1_TEMPLATE" },
  // { value: 'HIER2', label: "HIER2_TEMPLATE" }
  // ]
  const templatesArray = templateList.map(item => item.label);


  // Directly require a specific file for comparison
  const HIER1 = require("../Template/templates/HIER1_TEMPLATE.xlsx");

  // Function to fetch the file dynamically
  const getExcelFile = (fileName) => {
    // console.log("template:: ", fileName, HIER1)
    try {
      return require("../Template/templates/" + fileName + ".xlsx");
    } catch (error) {
      console.error('File not found:', fileName);
      return null;
    }
  };
  const TemplatesDwnld = useStyles();

  useEffect(() => {
    // document.title = 'Download Transaction Layout';
  }, []);

  const selectTemplate = (event) => {
    // console.log("Template ::", event, event.target.value)
    let templateFile = event.target.value;
    setTemplate(getExcelFile(templateFile));
    setSelectedFile(templateFile);
  }

  const DownloadFiles = () => {
    if (templatesArray.includes(selectedFile)) {
      const link = document.createElement("a");
      link.download = selectedFile + ".xlsx";//(selectedFile == 1) ? "HIER1_TEMPLATE.xlsx" : "STAGE_PROCESSING_NON_INV_TRAN_TEMPLATE.xlsx";
      if (template !== null) {
        link.href = template;
        link.click();
      } else {
        setDialogData("Template Unavailable.");
        setOpenDialog(true);
      }

    } else {
      setDialogData("Select valid Template.");
      setOpenDialog(true);
    }

    setSelectedFile('');
  }
  const handleCloseDialog = (e) => {
    setOpenDialog(false);
    setDialogData("")
  }

  return (
    <Box className={TemplatesDwnld.stagemaindiv}>
      <Box className={TemplatesDwnld.boxDiv} sx={{ display: 'flex', alignItems: 'center' }}>
        <div className={TemplatesDwnld.uploaddiv} style={{ display: 'flex', alignItems: 'center' }}>
          <h4 style={{ marginRight: '16px' }}>Templates</h4>

          <FormControl sx={{ marginRight: '16px' }}>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "14px", margin: "-6px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Download
            </InputLabel>
            <Select
              labelId="template-select-label"
              id="template-select"
              value={selectedFile}
              onChange={selectTemplate}
              label="Select Template"
              size="small"
              sx={{
                width: '200px',
                fontSize: '13px', // Font size for the select element
                '& .MuiSelect-select': {
                  fontSize: '13px', // Font size for the selected item
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    '& .MuiMenuItem-root': {
                      fontSize: '13px', // Font size for the dropdown items
                    },
                  },
                },
              }}
            >
              {templateList.length > 0 ? (
                templateList.map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    {option.value}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No options available</MenuItem>
              )}
            </Select>
          </FormControl>

          {selectedFile.length > 0 && (
            <Button
              variant="contained"
              onClick={DownloadFiles}
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
              Download
            </Button>
          )}
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
    </Box>
  )

}

export default TemplateDownload;


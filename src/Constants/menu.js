import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import ReceiptIcon from '@mui/icons-material/Receipt';
import RepeatIcon from '@mui/icons-material/Repeat';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import HelpIcon from '@mui/icons-material/Help';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import BookIcon from '@mui/icons-material/Book';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HiveSharpIcon from '@mui/icons-material/HiveSharp';
import PixSharpIcon from '@mui/icons-material/PixSharp';
import StorageIcon from '@mui/icons-material/Storage';
import SourceIcon from '@mui/icons-material/Source';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

export const GetItems = () => {
  let json_Original = {
    list: [
      {
        id: 0,
        name: "Home",
        icon: <HomeIcon sx={{ color: "#b4b4b4" }} />,
      },
      {
        id: 1,
        name: "System Config",
        icon: <SettingsSuggestIcon sx={{ color: "#b4b4b4" }} />,
        subitems: [
          {
            id: 1,
            name: "System Config Maintenance",
          },
          {
            id: 2,
            name: "System Config Creation",
          },
        ],
      },
      {
        id: 2,
        name: "Stage Processing",
        icon: <SendIcon sx={{ color: "#b4b4b4" }} />,
        subitems: [
          {
            id: 1,
            name: "Download",
            // icon: <DownloadIcon sx={{color: "#b4b4b4"}}/>,
          },
          {
            id: 2,
            name: "Upload Inventory",
            // icon: <UploadIcon sx={{color: "#b4b4b4"}}/>,
          },
          {
            id: 3,
            name: "Upload Non Inventory",
            // icon: <UploadIcon sx={{color: "#b4b4b4"}}/>,
          },
        ],
      },
      {
        id: 3,
        name: "Transaction Processing",
        icon: <ReceiptIcon sx={{ color: "#b4b4b4" }} />,
        subitems: [
          {
            id: 1,
            name: "Error Processing",
          },
        ],
      },
      {
        id: 4,
        name: "Reconciliation Report",
        icon: <RepeatIcon sx={{ color: "#b4b4b4" }} />,
        subitems: [
          {
            id: 1,
            name: "Reconciliation",
          },
        ],
      },
      {
        id: 5,
        name: "Transaction Inquiry",
        icon: <HelpIcon sx={{ color: "#b4b4b4" }} />,
        subitems: [
          {
            id: 1,
            name: "Inquiry",
          },
        ],
      },
      {
        id: 6,
        name: "Transaction Maintenance",
        icon: <ReceiptLongIcon sx={{ color: "#b4b4b4" }} />,
        subitems: [
          {
            id: 1,
            name: "Edit Transaction",
          },
          {
            id: 2,
            name: "Transaction Reversal",
          },
        ],
      },
      {
        id: 7,
        name: "Cost Maintenance",
        icon: <PaymentIcon sx={{ color: "#b4b4b4" }} />,
        subitems: [
          {
            id: 1,
            name: "Unit Cost Maintenance",
          },
          {
            id: 2,
            name: "SubLedger Cost",
          },
        ],
      },
      {
        id: 8,
        name: "Account maintenance",
        icon: <BookIcon sx={{ color: "#b4b4b4" }} />,
        subitems: [
          {
            id: 1,
            name: "Account maintenance",
          },
          {
            id: 2,
            name: "Account creation",
          },
        ],
      },
      {
        id: 9,
        name: "Finance Interface",
        icon: <AccountBalanceIcon sx={{ color: "#b4b4b4" }} />,
        subitems: [
          {
            id: 1,
            name: "Finance Interface Data",
          },

        ],
      },
      {
        id: 10,
        name: "Stock Ledger View",
        icon: <InventoryIcon sx={{ color: "#b4b4b4" }} />,
        subitems: [
          {
            id: 1,
            name: "Stock Ledger View",
          },
        ],
      },
      {
        id: 11,
        name: "Allocation",
        icon: <UploadIcon sx={{ color: "#b4b4b4" }} />,
        subitems: [
          {
            id: 1,
            name: "Home",
          },
          {
            id: 2,
            name: "Create Allocation",
          },
          {
            id: 3,
            name: "Allocation Summary",
          },
        ],
      },

    ],
  };
  let json = {
    list: [

      {
        id: 1,
        name: "Allocation",
        icon: <PixSharpIcon sx={{ color: "#b4b4b4" }} />,
        subitems: [
          {
            id: 1,
            name: "Home",
          },
          {
            id: 2,
            name: "Standard Allocation",
          },
          {
            id: 3,
            name: "Schedule Allocation",
          },
          {
            id: 4,
            name: "Allocation Summary",
          },
        ],
      },
      {
        id: 2,
        name: "Batches",
        icon: <ReceiptIcon sx={{ color: "#b4b4b4" }} />,
        subitems: [
          {
            id: 1,
            name: "Schedule",
          },
          {
            id: 1,
            name: "Date",
          },
        ],
      },
      {
        id: 3,
        name: "Seed Data",
        icon: <SourceIcon sx={{ color: "#b4b4b4" }} />,
        subitems: [
          {
            id: 1,
            name: "Download",
            icon: <DownloadIcon sx={{ color: "#b4b4b4" }} />,
        
          },
          {
            id: 2,
            name: "Upload",
            icon: <UploadIcon sx={{ color: "#b4b4b4" }} />,
        
          },
        ],
      },
      {
        id: 4,
        name: "Reports",
        icon: <TextSnippetIcon sx={{ color: "#b4b4b4" }} />,
        subitems: [
          {
            id: 1,
            name: "Sample Report",
            // icon: <DownloadIcon sx={{ color: "#b4b4b4" }} />,
        
          },
          
        ],
      },
    ],
  };

  return json;
};

import Button from "@mui/material/Button";
import {styled} from "@mui/material";
import  {yellow}  from "@mui/material/colors";

const BalanceCard =(props)=>{
    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(yellow[800]),
        backgroundColor: yellow[700],
        '&:hover': {
          backgroundColor: yellow[900],
        },
      }));
    return(
        <div className="balanceCardDashboard p-20 m-b-40 w-50">
            <h3 className="m-b-20">Wallet Balance</h3>
           <h1 className="m-b-10">{props?.balance ? `NGN ${props?.balance}` : "NGN 0.00"}</h1> 
            <ColorButton variant="contained">Fund Wallet</ColorButton>
        </div>
    )
}

export default BalanceCard;
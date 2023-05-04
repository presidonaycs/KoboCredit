import  Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {styled} from "@mui/material";
import  {yellow}  from "@mui/material/colors";
import Link from "next/link";
import { useRouter } from "next/router";

const signIn = () => {


    let router = useRouter();


    const handleSignIn =()=>{
        router.push('/dashboard');
    }

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(yellow[800]),
        backgroundColor: yellow[700],
        '&:hover': {
          backgroundColor: yellow[900],
        },
      }));
    return (
        <div className="signin-bg w-100 p-20 max-vh max-vw">
            <div className="w-30 white-bg">
                <h3 className="center-text">Sign In</h3>
                <div className="flex flex-direction-v p-20">
                    <TextField className="m-b-20" id="outlined-basic" label="Email" variant="outlined" />
                    <TextField className="m-b-20" id="outlined-basic" label="Password" variant="outlined" />
                </div>
            </div>
            <h5>Don't have an account? <Link href="/signup">Sign Up</Link></h5>
            <ColorButton  variant="contained" onClick={handleSignIn}>Sign In</ColorButton>
        </div>
    );
}

export default signIn;
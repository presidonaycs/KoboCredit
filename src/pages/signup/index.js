import  Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {styled} from "@mui/material";
import  {yellow}  from "@mui/material/colors";
import Link from "next/link";
import { useRouter } from "next/router";


const dashboard = () => {
    let router = useRouter()

    const handleSignUp = () => {
        router.push('/signin')
    }


    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(yellow[800]),
        backgroundColor: yellow[700],
        '&:hover': {
          backgroundColor: yellow[900],
        },
      }));
    return (
        <>
            <div className="flex space-around h-25">
                <img src="Rectangle 46.png" alt="" className="signup-image" />
                <div className="w-30 ">
                    <h3 className="center-text">Sign Up</h3>
                    <div className="flex flex-direction-v signup-border p-20">
                        <TextField className="m-b-20" id="outlined-basic" label="First Name" variant="outlined" />
                        <TextField className="m-b-20" id="outlined-basic" label="Last Name" variant="outlined" />
                        <TextField className="m-b-20" id="outlined-basic" label="Email" variant="outlined" />
                        <TextField className="m-b-20" id="outlined-basic" label="Phone Number" variant="outlined" />
                        <TextField className="m-b-20" id="outlined-basic" label="Password" variant="outlined" type="password"/>
                        <TextField className="m-b-20" id="outlined-basic" label="Repeat Password" variant="outlined" type="password" />
                    </div>
                    <h5>Already have an account <Link href="/signin">Sign In</Link></h5>
                    <ColorButton variant="contained" onClick={handleSignUp}>Sign Up</ColorButton>
                </div>

            </div>

        </>
    );
}

export default dashboard;
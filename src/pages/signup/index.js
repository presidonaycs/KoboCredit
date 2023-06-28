import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material";
import { blue, yellow } from "@mui/material/colors";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { post } from "@/api-services/fetch";
import { feedback } from "@/config/feedback";
import { Diversity1 } from "@mui/icons-material";


const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'white',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
    },
    '& .MuiInputLabel-root': {
        color: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
    },
});

const dashboard = () => {
    let router = useRouter()

    const [userData, setUserData] = useState(
        {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            phoneNumber: "",
            password: "",
            repeatPassword: "",
        }
    )

    const handleSignUp = async () => {
        console.log(userData)
        const res = await post({ endpoint: `Auth/user/profile`, body: userData, auth: false })
        console.log(res)
        if (res.data.code = 200) {
            feedback({
                title: "Success",
                text: res?.data?.message,
                iconType: "success",
            });
        }
        else {
            feedback({
                title: "Failed",
                text: res?.data?.message,
                iconType: "error",
            });
        }

        router.push('/signin')
    }

    const handleValue = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(blue[800]),
        backgroundColor: blue[700],
        '&:hover': {
            backgroundColor: blue[900],
        },
    }));
    return (
        <div className="backG">
            <div className="flex space-around h-25">
                <div className="w-55 center">
                    <h2 className="center-text color-white">Sign Up</h2>
                    <div className="flex flex-direction-v signup-border trans-bg p-20 m-b-20">
                        <div className="flex space-between">
                            <CssTextField className="m-b-20 w-60 m-r-5 m-b-10" name="firstName" onChange={(e) => handleValue(e)} type="text" id="outlined-basic" label="First Name" variant="outlined" />
                            <CssTextField className="m-b-20 w-60 m-l-5 m-b-10" name="lastName" onChange={(e) => handleValue(e)} type="text" id="outlined-basic" label="Last Name" variant="outlined" />
                        </div>
                        <div className="flex space-between">
                            <CssTextField className="m-b-20 w-60 m-r-5 m-b-10" name="email" onChange={(e) => handleValue(e)} type="email" id="outlined-basic" label="Email" variant="outlined" />
                            <CssTextField className="m-b-20 w-60 m-l-5 m-b-10" name="phoneNumber" onChange={(e) => handleValue(e)} type="phone" id="outlined-basic" label="Phone Number" variant="outlined" />
                        </div>
                        <CssTextField className="m-b-20 w-100  m-b-10 " name="username" onChange={(e) => handleValue(e)} type="username" id="outlined-basic" label="Username" variant="outlined" />
                        <CssTextField className="m-b-20 w-100  m-b-10" name="password" onChange={(e) => handleValue(e)} type="password" id="outlined-basic" label="Password" variant="outlined" />
                        <CssTextField className="m-b-20 w-100  m-b-10" name="confirmpassword" onChange={(e) => handleValue(e)} type="password" id="outlined-basic" label="Repeat Password" variant="outlined" />
                    </div>
                    <ColorButton className="float-right w-100" variant="contained" onClick={handleSignUp}>Sign Up</ColorButton>
                    <h4 className="m-b-10 color-white right-text"><span className="color-white">Already have an account? &nbsp;</span><Link href="/signin" className="color-blue">Sign In</Link></h4>
                </div>

            </div>

        </div>
    );
}

export default dashboard;


dashboard.getLayout = function getLayout(dashboard) {
    return (
        <div>
            <div>{dashboard}</div>
        </div>
    )
}
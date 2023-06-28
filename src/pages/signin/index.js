import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { yellow } from "@mui/material/colors";
import Link from "next/link";
import { useRouter } from "next/router";
import { post } from "@/api-services/fetch";
import { useState } from "react";

import { ThemeProvider } from "@mui/system";
import { createTheme, styled } from "@mui/material";
import { feedback } from "@/config/feedback";


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

const signIn = () => {
    let router = useRouter();

    const [userData, setUserData] = useState(
        {
            username: "",
            password: "",
        }
    )

    const handleValue = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const handleSignIn = async () => {
        const res = await post({ endpoint: `Auth`, body: userData, auth: false })
        console.log(res)
        if (res.data.code = 200) {
            feedback({
                title: "Success",
                text: res?.data?.message,
                iconType: "success",
            });
            router.push('/dashboard');
        }
        else {
            feedback({
                title: "Failed",
                text: res?.data?.message,
                iconType: "error",
            });
        }
    }

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(yellow[800]),
        backgroundColor: yellow[700],
        '&:hover': {
            backgroundColor: yellow[900],
        },
    }));

    const theme = createTheme({
        palette: {
            primary: {
                main: "#ffffff"
            },
        },
    });

    return (
        <div className="signin-bg w-100 p-20 max-vh max-vw">
            <div className="w-30 center">
                <h2 className="center-text color-white m-b-10">Sign In</h2>
                <div className="w-100 trans-bg m-b-10 ">
                    <div className="flex flex-direction-v p-20">
                        <ThemeProvider theme={theme}>
                            <CssTextField className="m-t-40 m-b-40" id="outlined-basic" name="username" onChange={(e) => handleValue(e)} label="Email" variant="outlined" type="email" sx={{ input: { color: 'white', label: "white" } }} />
                            <CssTextField className="m-b-40" id="outlined-basic" name="password" onChange={(e) => handleValue(e)} label="Password" variant="outlined" type="password" sx={{ input: { color: 'white', label: "white" } }} />
                        </ThemeProvider>
                    </div>
                </div>
                <h4 className="m-b-10 color-white right-text"><span className="color-white">Don't have an account? &nbsp;</span><Link href="/signup" className="color-orange">Sign Up</Link></h4>
                <ColorButton className="float-right w-100" variant="contained" onClick={handleSignIn}>Sign In</ColorButton>
            </div>

        </div>
    );
}

export default signIn;
import { get, post } from '@/api-services/fetch';
import OneClickCards from '@/Components/OneClickCards';
import ThreeDots from '@/Components/ThreeDots'
import Button from '@mui/material/Button';
import {styled} from "@mui/material";
import TextField from '@mui/material/TextField';
import  {yellow}  from "@mui/material/colors";
import { useRouter } from 'next/router';
import { useState } from 'react';

const AirtimePurchase = () => {

    const [glo, setGlo] = useState(false);
    const [etisalat, setEtisalat] = useState(false);
    const [mtn, setMtn] = useState(false);
    const [airtel, setAirtel] = useState(false);
    const [amount, setAmount] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [network, setNetwork] = useState("");
    let router = useRouter()

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(yellow[800]),
        backgroundColor: yellow[700],
        '&:hover': {
          backgroundColor: yellow[900],
        },
      }));

    const handleGlo = () => {
        setGlo(true);

        setNetwork("Glo")
        setEtisalat(false);
        setMtn(false);
        setAirtel(false);
    }

    const handleEtisalat = () => {
        setGlo(false);
        setEtisalat(true);

        setNetwork("Etisalat")
        setMtn(false);
        setAirtel(false);
    }

    const handleMtn = () => {
        setGlo(false);
        setEtisalat(false);
        setMtn(true);

        setNetwork("Mtn")

        setAirtel(false);
    }

    const handleAirtel = () => {
        setGlo(false);
        setEtisalat(false);
        setMtn(false);
        setAirtel(true);

        setNetwork("Airtel")

    }


    const getDataBundles = async (network) => {
        const res = await get({ endpoint: `GetDataBundles?network=${network}`, auth: false })
        console.log(res);
        setBundles(res?.data?.bundles)
    }

    const buyData = async () => {
        const body = {
            vtu_network: network,
            amount: Number(amount),
            phone: phoneNumber,
            email: email
        }
        const res = await post({ endpoint: "VendAirtime", body: body, auth: false })
        console.log(res);
        alert("SUCCESS")
        router.push("/print-receipt")
    }


    const handleChangeAmount = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setAmount(e.target.value);
        }
    }

    const handleChangePhone = (e) => {
        console.log(e.target.value)
        setPhoneNumber(e.target.value)
    }

    const handleChangeEmail = (e) => {
        console.log(e.target.value)
        setEmail(e.target.value)
    }


    return (
        <div className=''>
            <div className='flex flex-h-center m-t-40  h-100 '>
                <div className='flex flex-direction-v flex-h-center signup-border w-50'>
                    <h1 className='center-text m-b-40  '>Purchase Airtime</h1>
                    <div className='w-100 m-b-40 '><ThreeDots /></div>
                    <h4 className='w-100 m-b-40 center-text '>Select Provider</h4>
                    <div className='flex flex-h-center m-b-40 space-around  '>
                        <OneClickCards onClick={handleGlo} active={glo ? "one-click-border one-click" : "one-click"} vendor="icons8-glo.png" />
                        <OneClickCards onClick={handleEtisalat} active={etisalat ? "one-click-border one-click" : "one-click"} vendor="9mobile-logo.png" />
                        <OneClickCards onClick={handleMtn} active={mtn ? "one-click-border one-click" : "one-click"} vendor="mtn.png" />
                        <OneClickCards onClick={handleAirtel} active={airtel ? "one-click-border one-click" : "one-click"} vendor="airtel-new-logo.png" />
                    </div>
                    <div className='flex flex-direction-v flex-v-center  '>
                        <div className="w-100">
                            <TextField type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={handleChangeAmount} className="m-b-40 w-100" id="outlined-basicid" label="Amount" variant="outlined" />
                        </div>
                        <div className='flex space-around  w-100'>

                            <TextField onChange={handleChangePhone} className="m-b-40  w-48" id="outlined-basic" label="Phone Number" variant="outlined" />
                            <TextField onChange={handleChangeEmail} className="m-b-40  w-48" id="outlined-basicid" label="Email" variant="outlined" />
                        </div>
                        

                        <div className='m-b-20'><ColorButton onClick={buyData} variant="contained">Confirm</ColorButton></div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default AirtimePurchase;
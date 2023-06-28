import { get, post } from '@/api-services/fetch';
import ThreeDots from '@/Components/ThreeDots'
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { styled } from "@mui/material";
import { yellow } from "@mui/material/colors";
import { feedback } from '@/config/feedback';
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

const key = process.env.NEXT_PUBLIC_PUBLIC_KEY;

const CableSubscription = () => {

    const [glo, setGlo] = useState(false);
    const [etisalat, setEtisalat] = useState(false);
    const [mtn, setMtn] = useState(false);
    const [airtel, setAirtel] = useState(false);
    const [bundles, setBundles] = useState([]);
    const [cable, setCable] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [amount, setAmount] = useState(0)
    const [email, setEmail] = useState("");
    const [cardNumber, setCardNumber] = useState(null);
    const [selectedBundle, setSelectedBundle] = useState(null);
    const [smartCardDetails, setSmartCardDetails] = useState({});
    const serviceType = ("Cable Subscription");

    let router = useRouter();

    const intervalId = useRef();


    const config = {
        public_key: key,
        tx_ref: null,
        amount: amount,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: email,
            phone_number: phoneNumber,
        },
        customizations: {
            title: 'Cable Subscription',
            description: 'Payment for cable TV',
        },
    }

    const initiateBody = {

        id: 0,
        amount: Number(amount),
        phone: phoneNumber,
        email: email,
        name: "string",
        payment_type: "'card,mobilemoney,ussd'",
        product: selectedBundle,
        status: "pending",
        tx_ref: Date.now(),
        transid: 0,
        created_at: new Date().toISOString()
    }

    const verifyTransaction = async (ref) => {
        let check;

        const transactionStatus = await post({ endpoint: `FlutterWave/VerifyTransaction?tx_ref=${ref}` })
       
        check = transactionStatus;

        if (!intervalId) {
            intervalId.current = setInterval(async () => {
                const transactionStatus = await post({ endpoint: `FlutterWave/VerifyTransaction?tx_ref=${ref}` })
               
                check = transactionStatus;
            }, 10000)
        }


        return check;
    }

    const handleFlutterPayment = useFlutterwave(config);

    const getCableBundles = async (network) => {
        const res = await get({ endpoint: `Tv/GetTvBouquets?network=${network}`, auth: false })
   
        setBundles(res?.data?.bundles)
    }



    const getSmartCardInfo = async () => {
        const res = await get({ endpoint: `Tv/GetSmartcardInfo?network=${cable}&smartcardNo=${cardNumber}&servicecode=${selectedBundle}` })
   
        setSmartCardDetails(res?.data)
    }

    const validate = () =>{
        let error = ""
        if (phoneNumber.length !== 11 || isNaN(Number(phoneNumber))){
            error = "Please Enter a correct 11-digit phone number(e.g 08022222222)"
            return error;
        }
        if(!email || email === ""){
            error = "Please Enter a valid email address"
            return error;
        }
        if(!cardNumber && cardNumber?.length !== 11){
            error = "Please Enter your card Number"
            return error;
        }
        if(!selectedBundle){
            error = "Please choose a subscription bouquet"
            return error;
        }

        return error;
    }

    const buyBundle = async () => {

        let valid =  validate();
        if(valid !== ""){
            feedback({
                title: "Validation Error",
                text:valid,
                iconType: "warning",
            });
            return;
        }

        const flutter = await get({ endpoint: "FlutterWave/referencecode" })
        config.tx_ref = flutter?.data;
        initiateBody.tx_ref = flutter?.data;
        const initiate = await post({ endpoint: "FlutterWave/InitiateTransaction", body: initiateBody })


        const body = {
            tvnetwork: cable,
            smartcardno: cardNumber,
            email: email,
            amount: 0,
            phone: phoneNumber,
            access_token: smartCardDetails?.access_token,
            servicecode: selectedBundle
        }

       
        if (initiate.data.status === "Successful") {

            handleFlutterPayment({
                callback: async (response) => {
                    const paymentCheck = await verifyTransaction(response.tx_ref);
                

                    if (response.status === "successful") {
                        if (paymentCheck.data.status === "Successful") {
                            const res = await post({ endpoint: "Tv/VendTv", body: body, auth: false })
                            feedback({
                                title: "Success",
                                text: "Success",
                                iconType: "success",
                            });
                            clearInterval(intervalId.current);
                            intervalId.current = null;
                            router.push(`/print-receipt?service=${cable}&amount=${bundles?.find((id) => id.code === selectedBundle)?.price}&serviceType=${serviceType}&transactionId=${response.transaction_id}`)
                            closePaymentModal() // this will close the modal programmatically
                        }
                    }
                    else {
                        feedback({
                            title: "Transaction Error",
                            text: "Failed to process your transaction",
                            iconType: "error",
                        });
                        closePaymentModal() // this will close the modal programmatically
                    }

                   
                },
                onClose: () => { },
            });
        }
        else{
            feedback({
                title: "Transaction Error",
                text: "Failed to initiate Transaction, Please try again later.",
                iconType: "error",
            });
        }

        
    }


    const handleChange = (e) => {
    console.log(e.target.value)
        setCable(e.target.value)
        getCableBundles(e.target.value);
    }

    const handleChangeBundle = (e) => {
      
        setSelectedBundle(e.target.value)
        let bundle = bundles.find((bundle) => {
            return bundle?.code === e.target.value
        })
   
        setAmount(Number(bundle?.price));
    }

    const handleChangeCard = (e) => {
   
        setCardNumber(e.target.value)
        e.target.value.length === 11 && getSmartCardInfo()
    }

    const handleChangePhone = (e) => {
    
        setPhoneNumber(e.target.value)
    }

    const handleChangeEmail = (e) => {
      
        setEmail(e.target.value)
    }

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(yellow[800]),
        backgroundColor: yellow[700],
        '&:hover': {
            backgroundColor: yellow[900],
        },
    }));

    return (
        <div className=''>
            <div className='flex flex-h-center m-t-40  h-100 '>
                <div className='flex flex-direction-v flex-h-center signup-border '>
                    <h1 className='center-text m-b-40  '>TV/Cable Subscription</h1>
                    <div className='w-100 m-b-40 '><ThreeDots /></div>
                    <h4 className='w-100 m-b-40 center-text '>Enter Details</h4>
                    {/*<div className='flex flex-h-center m-b-40 space-around  '>
                        <OneClickCards onClick={handleGlo} active={glo ? "one-click-border one-click" : "one-click"} vendor="icons8-glo.png" />
                        <OneClickCards onClick={handleEtisalat} active={etisalat ? "one-click-border one-click" : "one-click"} vendor="9mobile-logo.png" />
                        <OneClickCards onClick={handleMtn} active={mtn ? "one-click-border one-click" : "one-click"} vendor="mtn.png" />
                        <OneClickCards onClick={handleAirtel} active={airtel ? "one-click-border one-click" : "one-click"} vendor="airtel-new-logo.png" />
                    </div> */}
                    <div className='flex flex-direction-v flex-v-center  '>

                        <div className="w-100">
                            <FormControl fullWidth className="m-b-40  w-100">
                                <InputLabel id="demo-simple-select-label">Provider</InputLabel>
                                <Select
                                    className="m-b-40  w-100"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={cable}
                                    label="Provider"
                                    onChange={handleChange}
                                >

                                    <MenuItem key={1} value="DSTV">DSTV</MenuItem>
                                    <MenuItem key={2} value="GOTV">GOTV</MenuItem>
                                    <MenuItem key={3} value="StarTimes">Star Times</MenuItem>

                                </Select>
                            </FormControl>
                        </div>

                        <div className='flex space-around  w-100'>

                            <TextField onChange={handleChangePhone} className="m-b-40  w-48" id="outlined-basic" label="Phone Number" variant="outlined" />
                            <TextField onChange={handleChangeEmail} className="m-b-40  w-48" id="outlined-basicid" label="Email" variant="outlined" />
                        </div>

                        <FormControl fullWidth className="m-b-40  w-100">
                            <InputLabel id="demo-simple-select-label">Cable Bouquets</InputLabel>
                            <Select
                                className="m-b-40  w-100"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedBundle}
                                label="Cable Bouquets"
                                onChange={handleChangeBundle}
                            >
                                {
                                    Array.isArray(bundles) && bundles.map((item) => (
                                        <MenuItem key={item?.code} value={item?.code}>{item?.title} - {parseInt(item?.price)}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <div className='flex space-around  w-100'>
                            <TextField onChange={handleChangeCard} className="m-b-40  w-100" id="outlined-basic" label="Smart Card Number" variant="outlined" />
                        </div>

                        <div className='m-b-20'><ColorButton onClick={buyBundle} variant="contained">Confirm</ColorButton></div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default CableSubscription;
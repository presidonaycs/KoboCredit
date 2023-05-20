import { get, post } from '@/api-services/fetch';
import ThreeDots from '@/Components/ThreeDots'
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import {styled} from "@mui/material";
import  {yellow}  from "@mui/material/colors";
import { feedback } from '@/config/feedback';
import {useRouter} from 'next/router'
import { useEffect, useState } from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

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
    const [cardNumber, setCardNumber] = useState("");
    const [selectedBundle, setSelectedBundle] = useState("");
    const [smartCardDetails, setSmartCardDetails] = useState({});
    const serviceType = ("Cable Subscription")
    let router = useRouter();
  

    const config  = {
        public_key: 'FLWPUBK_TEST-fa32182ff09d67865c487b01af321d90-X',
        tx_ref: Date.now(),
        amount: amount,
        currency: 'NGN',
        payment_options: 'card',
        customer: {
            email: email,
            phone_number: phoneNumber,
            name: 'john doe',
        },
        customizations: {
            title: 'Airtime Purchase',
            description: 'Payment for airtime',
            logo: '/9mobile-logo.png',
        },
    }

    const handleFlutterPayment = useFlutterwave(config);
   

    // const handleGlo = () => {
    //     setGlo(true);
    //     getDataBundles("Glo")
    //     setNetwork("Glo")
    //     setEtisalat(false);
    //     setMtn(false);
    //     setAirtel(false);
    // }

    // const handleEtisalat = () => {
    //     setGlo(false);
    //     setEtisalat(true);
    //     getDataBundles("Etisalat")
    //     setNetwork("Etisalat")
    //     setMtn(false);
    //     setAirtel(false);
    // }

    // const handleMtn = () => {
    //     setGlo(false);
    //     setEtisalat(false);
    //     setMtn(true);
    //     getDataBundles("Mtn")
    //     setNetwork("Mtn")

    //     setAirtel(false);
    // }

    // const handleAirtel = () => {
    //     setGlo(false);
    //     setEtisalat(false);
    //     setMtn(false);
    //     setAirtel(true);
    //     getDataBundles("Airtel")
    //     setNetwork("Airtel")

    // }


    const getCableBundles = async (network) => {
        const res = await get({ endpoint: `Tv/GetTvBouquets?network=${network}`, auth: false })
        console.log(res);
        setBundles(res?.data?.bundles)
    }

    

    const getSmartCardInfo =async () =>{
        const res = await get({endpoint:`Tv/GetSmartcardInfo?network=${cable}&smartcardNo=${cardNumber}&servicecode=${selectedBundle}`})
        console.log(res);
        setSmartCardDetails(res?.data)
    }

    const buyBundle = async () => {
        const body = {
            tvnetwork: cable,
            smartcardno: cardNumber,
            email: email,
            amount: 0,
            phone: phoneNumber,
            access_token: smartCardDetails?.access_token,
            servicecode: selectedBundle
        }
        const res = await post({ endpoint: "Tv/VendTv", body: body, auth: false })
        handleFlutterPayment({
            callback: (response) => {
                console.log(response);
                feedback({
                    title: "Success",
                    text: "Success",
                    iconType: "success",
                });
                router.push(`/print-receipt?service=${cable}&amount=${bundles?.find((id)=>id.code === selectedBundle)?.price}&serviceType=${serviceType}&transactionId=${response.transaction_id}`)
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {  },
        });
        console.log(res);
    //    router.push(`/print-receipt?service=${cable}&amount=${bundles?.find((id)=>id.code === selectedBundle)?.price}&serviceType=${serviceType}&transactionId=${response.transaction_id}`)
    }


    const handleChange = (e) => {
        console.log(e.target.value)
        setCable(e.target.value)
        getCableBundles(e.target.value);
    }

    const handleChangeBundle = (e) => {
        console.log(e.target.value)
        setSelectedBundle(e.target.value)
        let bundle = bundles.find((bundle)=>{
            return bundle?.code === e.target.value
           })
           console.log(bundle)
           setAmount(Number(bundle?.price));
    }

    const handleChangeCard = (e) => {
        console.log(e.target.value)
        setCardNumber(e.target.value)
        e.target.value.length === 11 && getSmartCardInfo()
    }

    const handleChangePhone = (e) => {
        console.log(e.target.value)
        setPhoneNumber(e.target.value)
    }

    const handleChangeEmail = (e) => {
        console.log(e.target.value)
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
                <div className='flex flex-direction-v flex-h-center signup-border w-50'>
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
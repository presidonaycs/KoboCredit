import { get, post } from '@/api-services/fetch';
import OneClickCards from '@/Components/OneClickCards';
import ThreeDots from '@/Components/ThreeDots'
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {styled} from "@mui/material";
import TextField from '@mui/material/TextField';
import { yellow } from '@mui/material/colors';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useToaster } from 'react-hot-toast';
import { feedback } from '@/config/feedback';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';


const DataSubscription = () => {

    const [glo, setGlo] = useState(false);
    const [etisalat, setEtisalat] = useState(false);
    const [mtn, setMtn] = useState(false);
    const [airtel, setAirtel] = useState(false);
    const [bundles, setBundles] = useState([]);
    const [vtuData, setVtuData] = useState(0);
    const [amount, setAmount] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [network, setNetwork] = useState("");
    const serviceType = ("Data Subscription")
    let router = useRouter()
    let toaster = useToaster();

    const config = {
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
            title: 'Data Subsciption',
            description: 'Subscribe Data',
            logo: '/9mobile-logo.png',
        },
    }

    const handleFlutterPayment = useFlutterwave(config);

    const handleGlo = () => {
        setGlo(true);
        getDataBundles("Glo")
        setNetwork("Glo")
        setEtisalat(false);
        setMtn(false);
        setAirtel(false);
    }

    const handleEtisalat = () => {
        setGlo(false);
        setEtisalat(true);
        getDataBundles("Etisalat")
        setNetwork("Etisalat")
        setMtn(false);
        setAirtel(false);
    }

    const handleMtn = () => {
        setGlo(false);
        setEtisalat(false);
        setMtn(true);
        getDataBundles("Mtn")
        setNetwork("Mtn")

        setAirtel(false);
    }

    const handleAirtel = () => {
        setGlo(false);
        setEtisalat(false);
        setMtn(false);
        setAirtel(true);
        getDataBundles("Airtel")
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
            vtu_data: vtuData,
            phone: phoneNumber,
            email: email
        }
        const res = await post({ endpoint: "VendData", body:body, auth: false })
        handleFlutterPayment({
            callback: (response) => {
                console.log(response);
                feedback({
                    title: "Success",
                    text: "Success",
                    iconType: "success",
                });
                router.push(`/print-receipt?service=${network}&amount=${bundles?.find((id)=>id.code === vtuData)?.price}&serviceType=${serviceType}&transactionId=${response.transaction_id}`)
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {  },
        });
        console.log(res);
        // feedback({
        //     title: "Success",
        //     text: "Success",
        //     iconType: "success",
        //   });
        // router.push(`/print-receipt?service=${network}&amount=${bundles?.find((id)=>id.code === vtuData)?.price}&serviceType=${serviceType}&transactionId=${response.transaction_id}`)
    }


    const handleChange = (e) => {
        console.log(e.target.value)
        setVtuData(e.target.value)
       let bundle = bundles.find((bundle)=>{
        return bundle?.code === e.target.value
       })
       console.log(bundle)
       setAmount(Number(bundle?.price));
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
            <div className='flex flex-h-center m-t-10  h-100 '>
                <div className='flex flex-direction-v flex-h-center signup-border'>
                    <h1 className='center-text m-b-40  '>Data Subscription</h1>
                    <div className='w-100 m-b-40 '><ThreeDots /></div>
                    <h4 className='w-100 m-b-40 center-text '>Select Provider</h4>
                    <div className='flex flex-h-center m-b-40 space-around  '>
                        <OneClickCards onClick={handleGlo} active={glo ? "one-click-border one-click" : "one-click"} vendor="icons8-glo.png" />
                        <OneClickCards onClick={handleEtisalat} active={etisalat ? "one-click-border one-click" : "one-click"} vendor="9mobile-logo.png" />
                        <OneClickCards onClick={handleMtn} active={mtn ? "one-click-border one-click" : "one-click"} vendor="mtn.png" />
                        <OneClickCards onClick={handleAirtel} active={airtel ? "one-click-border one-click" : "one-click"} vendor="airtel-new-logo.png" />
                    </div>
                    <div className='flex flex-direction-v flex-v-center  '>
                        <div className='flex space-around  w-100'>

                            <TextField onChange={handleChangePhone} className="m-b-40  w-48" id="outlined-basic" label="Phone Number" variant="outlined" />
                            <TextField onChange={handleChangeEmail} className="m-b-40  w-48" id="outlined-basicid" label="Email" variant="outlined" />
                        </div>
                        <div className="w-100">
                            <FormControl fullWidth className="m-b-40  w-100">
                                <InputLabel id="demo-simple-select-label">Data Bundle</InputLabel>
                                <Select
                                    className="m-b-40  w-100"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={vtuData}
                                    label="Data Bundle"
                                    onChange={handleChange}
                                >
                                    {
                                        Array.isArray(bundles) && bundles.map((item) => (
                                            <MenuItem key={item?.code} value={item?.code}>{item?.title}</MenuItem>
                                        ))
                                    }

                                </Select>
                            </FormControl>
                        </div>
                        <div className='m-b-20'><ColorButton onClick={buyData} variant="contained">Confirm</ColorButton></div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default DataSubscription;
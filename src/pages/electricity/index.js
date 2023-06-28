import { get, post } from '@/api-services/fetch';
import OneClickCards from '@/Components/OneClickCards';
import ThreeDots from '@/Components/ThreeDots'
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from "@mui/material";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { useEffect, useRef, useState } from 'react';
import { yellow } from '@mui/material/colors';
import { useRouter } from 'next/router';
import { feedback } from '@/config/feedback';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';


const key = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const Power = () => {

    const [meterInfo, setMeterInfo] = useState({});
    const [bundles, setBundles] = useState([]);
    const [discos, setDiscos] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [meterNumber, setMeterNumber] = useState("");
    const [network, setNetwork] = useState("");
    const [amount, setAmount] = useState(0);
    const [selectedDisco, setSelectedDisco] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const serviceType = ("Electric Bill")
    let router = useRouter()

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
            title: 'Power Purchase',
            description: 'Payment for power units',
        },
    }

    const initiateBody = {

        id: 0,
        amount: Number(amount),
        phone: phoneNumber,
        email: email,
        name: "string",
        payment_type: "card,mobilemoney,ussd",
        product: selectedDisco,
        status: "pending",
        tx_ref: Date.now(),
        transid: 0,
        created_at: new Date().toISOString()
    }

    const handleFlutterPayment = useFlutterwave(config);

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

    const getDiscos = async () => {
        const res = await get({ endpoint: "Power/GetElectricDiscos", auth: false })
        setDiscos(res?.data?.bundles);
    }

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(yellow[800]),
        backgroundColor: yellow[700],
        '&:hover': {
            backgroundColor: yellow[900],
        },
    }));

    useEffect(() => {
        getDiscos()
    }, [])


    const getDataBundles = async (network) => {
        const res = await get({ endpoint: `GetDataBundles?network=${network}`, auth: false })
        setBundles(res?.data?.bundles)
    }

    const getMeterInfo = async () => {
        const res = await get({ endpoint: `Power/GetMeterInfo?meterNumber=${meterNumber}&disco=${selectedDisco}` })
        setMeterInfo(res?.data)
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
        if(isNaN(Number(amount)) || Number(amount === 0)){
            error = "Please Enter a valid amount"
            return error;
        }
        if(!meterNumber || meterNumber?.length < 7){
            error = "Please Enter a valid meter Number"
            return error;
        }
        if(!selectedDisco){
            error = "Please choose a distribution company"
            return error;
        }

        return error;
    }

    const buyData = async () => {

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
            meterno: meterNumber,
            disco: selectedDisco,
            access_token: meterInfo?.access_token,
            amount: Number(amount),
            phone: phoneNumber,
            email: email
        }

        if (initiate.data.status === "Successful") {
            handleFlutterPayment({
                callback: async (response) => {
                    const paymentCheck = await verifyTransaction(response.tx_ref);

                    if (response.status === "successful") {
                        if (paymentCheck.data.status === "Successful") {
                            const res = await post({ endpoint: "Power/VendPower", body: body, auth: false })
                            feedback({
                                title: "Transaction Success",
                                text: "Successfully processed your transaction",
                                iconType: "success",
                            });
                            clearInterval(intervalId.current);
                            intervalId.current = null;
                            router.push(`/print-receipt?service=${selectedDisco}&amount=${amount}&serviceType=${serviceType}&transactionId=${response.transaction_id}`)
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
        setSelectedDisco(e.target.value)
    }

    const handleChangeMeterNo = (e) => {
        setMeterNumber(e.target.value)
        e.target.value.length === 11 && getMeterInfo()
    }

    const handleChangePhone = (e) => {
        setPhoneNumber(e.target.value)
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangeAmount = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setAmount(e.target.value);
        }
    }


    return (
        <div className='m-b-40'>
            <div className='flex flex-h-center m-t-40 h-100 '>
                <div className='flex flex-direction-v flex-h-center signup-border'>
                    <h1 className='center-text m-b-40'>Electricity Bill</h1>
                    <div className='w-100 m-b-40'><ThreeDots /></div>
                    <h4 className='w-100 m-b-40 center-text'>Enter Details</h4>

                    <div className='flex flex-direction-v flex-v-center'>
                        <div className="w-100">
                            <TextField type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={handleChangeAmount} className="m-b-40 w-100" id="outlined-basicid" label="Amount" variant="outlined" />
                        </div>
                        <div className='flex space-around m-b-20  w-100'>

                            <TextField onChange={handleChangePhone} className="m-b-20  w-48" id="outlined-basic" label="Phone Number" variant="outlined" />
                            <TextField onChange={handleChangeEmail} className="m-b-20  w-48" id="outlined-basicid" label="Email" variant="outlined" />
                        </div>
                        <div className="w-100">
                            <FormControl fullWidth className="m-b-20  w-100">
                                <InputLabel id="demo-simple-select-label">Distributor</InputLabel>

                                <Select
                                    className="m-b-20  w-100"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Distributor"
                                    value={selectedDisco}
                                    onChange={handleChange}
                                >
                                    {
                                        Array.isArray(discos) && discos.map((item) => (
                                            <MenuItem key={item?.code} value={item?.code}>{item?.description}</MenuItem>
                                        ))
                                    }

                                </Select>
                            </FormControl>
                        </div>
                        <div className="w-100">
                            <TextField InputProps={{
                                endAdornment: <InputAdornment position="end"><CardGiftcardIcon /></InputAdornment>,
                            }} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={handleChangeMeterNo} className="m-b-40 w-100" id="outlined-basicid" label="Meter Number" variant="outlined" />
                        </div>
                        <div className='m-b-20'>{meterInfo?.customer && meterInfo?.customer?.name}</div>

                        <div className='m-b-20'><ColorButton onClick={buyData} variant="contained">Confirm</ColorButton></div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Power;
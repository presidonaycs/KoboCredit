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
import InputAdornment from '@mui/material/InputAdornment';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { useEffect, useState } from 'react';
import { yellow } from '@mui/material/colors';
import { useRouter } from 'next/router';
import { feedback } from '@/config/feedback';

const DataSubscription = () => {

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


  

    const getDiscos = async () => {
        const res = await get({ endpoint: "Power/GetElectricDiscos", auth: false })
        console.log(res);
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
        console.log(res);
        setBundles(res?.data?.bundles)
    }

    const getMeterInfo = async () => {
        const res = await get({ endpoint: `Power/GetMeterInfo?meterNumber=${meterNumber}&disco=${selectedDisco}` })
        console.log(res)
        setMeterInfo(res?.data)
    }

    const buyData = async () => {
        const body = {
            meterno: meterNumber,
            disco: selectedDisco,
            access_token: meterInfo?.access_token,
            amount: Number(amount),
            phone: phoneNumber,
            email: email
        }
        const res = await post({ endpoint: "Power/VendPower", body: body, auth: false })
        console.log(res);
        feedback({
            title: "Success",
            text: "Success",
            iconType: "success",
          });
        router.push(`/print-receipt?service=${selectedDisco}&amount=${amount}&serviceType=${serviceType}&transactionId=${res?.data?.ref}`)
    }


    const handleChange = (e) => {
        console.log(e.target.value)
        setSelectedDisco(e.target.value)
    }

    const handleChangeMeterNo = (e) => {
        console.log(e.target.value)
        setMeterNumber(e.target.value)
        e.target.value.length === 11 && getMeterInfo()
    }

    const handleChangePhone = (e) => {
        console.log(e.target.value)
        setPhoneNumber(e.target.value)
    }

    const handleChangeEmail = (e) => {
        console.log(e.target.value)
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

export default DataSubscription;
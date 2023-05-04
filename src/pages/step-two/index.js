import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';


import Image from "next/image";
import { useState } from "react";

const { default: ThreeDots } = require("@/Components/ThreeDots")

const stepTwo = () => {

    const [selectedValue, setSelectedValue] = useState('a');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };


    return (
        <div className="w-100 flex flex-h-center p-40 ">
            <div className="w-80 p-40">
                <ThreeDots />
                <h2 className="center-text m-t-40 m-b-40">Payment Details</h2>
                <div className="flex space-around">

                    <div className="balanceCard p-20 ">
                        <h4 className="m-b-20 center-text">Select a Payment Method</h4>
                        <div className="w-100">
                            <FormControl fullWidth className="m-b-20  w-100">
                                <InputLabel id="demo-simple-select-label">Payment Method</InputLabel>

                                <Select
                                    className="w-100"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Distributor"
                                    onChange={handleChange}
                                >

                                    <MenuItem key={1} value={1}>Card</MenuItem>
                                    <MenuItem key={2} value={2}>MoneyPoint</MenuItem>
                                    <MenuItem key={3} value={3}>InterSwitch</MenuItem>


                                </Select>
                            </FormControl>
                        </div>
                        <div className="flex flex-direction-v space-around flex-v-center">
                            <div className="flex flex-direction-v w-100">
                                <div className="flex m-b-20 space-between flex-v-center ">
                                    <div className="flex space-between flex-b-70 m-r-10 cardDetail">
                                        <Image className="m-r-20" src="/Vector.svg" width={20} height={20} />
                                        <p>xxxxxxxxx5467</p>
                                    </div>
                                    <Radio
                                        checked={selectedValue === 'b'}
                                        onChange={handleChange}
                                        value="a"
                                        name="radio-buttons"
                                        inputProps={{ 'aria-label': 'A' }}
                                        
                                    />

                                </div>
                                <div className="flex space-between flex-v-center m-b-20">
                                    <div className="flex space-between flex-b-70 m-r-10 cardDetail">
                                        <Image className="m-r-20" src="/uim_master-card.svg" width={20} height={20} />
                                        <p>xxxxxxxxx3328</p>
                                    </div>
                                    <Radio
                                        checked={selectedValue === 'a'}
                                        onChange={handleChange}
                                        value="a"
                                        name="radio-buttons"
                                        inputProps={{ 'aria-label': 'A' }}
                                    />

                                </div>
                                <Button variant="outlined">Add Card</Button>

                            </div>
                        </div>
                    </div>

                    <div className="summaryCard p-20">
                        <h2 className="center-text m-b-40">Transaction Summary</h2>
                        <div className="summary-sub-border p-20">
                            <div className="flex  m-b-40">
                                <div className="flex-b-70">
                                    <h4>From</h4>
                                    <p>Paygate</p>
                                </div>
                                <div className="flex-b-30">
                                    <h4>Transaction ID</h4>
                                    <p>0000097458</p>
                                </div>
                            </div>
                            <hr className="m-b-40" />
                            <div className="flex space-between m-b-40">
                                <div className="flex-b-70">
                                    <h4>Source</h4>
                                    <p>Nasiru Zakaria</p>
                                </div>
                                <div className="flex-b-30">
                                    <h4>Destination</h4>
                                    <p>01258984x</p>
                                </div>
                            </div>
                            <hr className="m-b-40" />
                            <div className="flex space-between m-b-40">
                                <div className="flex-b-70">
                                    <h4>Value</h4>
                                    <p>NGN 9,000</p>
                                </div>
                                <div className="flex-b-30">
                                    <h4>Description</h4>
                                    <p>Airtime Purchase </p>
                                    <p>Airtel</p>
                                </div>
                            </div>

                        </div>
                        <div className="flex flex-v-center m-b-20">
                            <Radio
                                checked={selectedValue === 'c'}
                                onChange={handleChange}
                                value="a"
                                name="radio-buttons"
                                inputProps={{ 'aria-label': 'A' }}
                            />
                            <p>Add this to one time payments?</p>
                        </div>
                        <div className="flex space-between">
                            <Button variant="outlined" className="flex-b-48">Cancel</Button>
                            <Button variant="contained" className="flex-b-48">Proceed</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default stepTwo;
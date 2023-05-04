import Image from "next/image";
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";



const Transaction = () => {

    const [value, setValue] = useState("");

    function createData(Image, Name, Type, Amount, Recipient, Status, Date) {
        return { Image, Name, Type, Amount, Recipient, Status, Date };
    }

    const rows = [
        createData(<Image src="/netflix.png" width={40} alt="Service Logo" height={40} />, "Zakaria Nasiru", "TV/Cable", "4,000", "Zakaria Nasiru", "Pending", "13/03/21 at 3:59PM"),
        createData(<Image src="/gotv.png" width={40} alt="Service Logo" height={40} />, "Zakaria Nasiru", "Data Subscription", "3,500", "Zakaria Nasiru", "Successful", "13/03/21 at 3:59PM"),
        createData(<Image src="/9mobile-logo.png" width={40} alt="Service Logo" height={40} />, "Zakaria Nasiru", "Airtime Purchase", "2,000", "Zakaria Nasiru", "Failed", "13/03/21 at 3:59PM"),
        createData(<Image src="/9mobile-logo.png" width={40} alt="Service Logo" height={40} />, "Zakaria Nasiru", "Airtime Purchase", "2,000", "Zakaria Nasiru", "Failed", "13/03/21 at 3:59PM"),
        createData(<Image src="/9mobile-logo.png" width={40} alt="Service Logo" height={40} />, "Zakaria Nasiru", "Airtime Purchase", "2,000", "Zakaria Nasiru", "Failed", "13/03/21 at 3:59PM"),
        createData(<Image src="/9mobile-logo.png" width={40} alt="Service Logo" height={40} />, "Zakaria Nasiru", "Airtime Purchase", "2,000", "Zakaria Nasiru", "Failed", "13/03/21 at 3:59PM"),
    ];


    return (
        <div className=" flex flex-direction-column flex-v-center flex-h-center m-t-20">
            <h1 className="m-b-50">Transactions</h1>
            <div className="flex justify-content-end w-80 flex-h-center">
                <DatePicker
                    label="Date From"
                    className="m-r-20"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                />
                <DatePicker
                    label="Date To"
                    value={value}
                    className="m-r-20"
                    onChange={(newValue) => setValue(newValue)}
                />
                <TextField placeholder="Search..." className="w-60"/>
            </div>
            <div className="flex flex-direction-v flex-v-center m-t-20 w-100 m-b-80">
                <TableContainer component={Paper} className="flex flex-direction-v flex-v-center  w-80 m-b-80 ">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell><h3>Name</h3></TableCell>
                                <TableCell align="left"><h3>Type</h3></TableCell>
                                <TableCell align="left"><h3>Amount(NGN)</h3></TableCell>
                                <TableCell align="left"><h3>Recipient</h3></TableCell>
                                <TableCell align="left"><h3>Status</h3></TableCell>
                                <TableCell align="left"><h3>Date</h3></TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.Name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.Image}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.Name}
                                    </TableCell>
                                    <TableCell >
                                        {row.Type}
                                    </TableCell>
                                    <TableCell align="left">{row.Amount}</TableCell>
                                    <TableCell align="left">{row.Recipient}</TableCell>
                                    <TableCell align="left">{row.Status}</TableCell>
                                    <TableCell align="left">{row.Date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default Transaction;
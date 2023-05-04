import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Profile = (props) => {

    function createData(Service, AccountName, AccountNumber) {
        return { Service, AccountName, AccountNumber };
    }

    const rows = [
        createData(<Image src="/netflix.png" width={40} height={40} />, "Zakaria Nasiru", 233004958),
        createData(<Image src="/gotv.png" width={40} height={40} />, "Zakaria Nasiru", 233004958),
        createData(<Image src="/9mobile-logo.png" width={40} height={40} />, "Zakaria Nasiru", 233004958),
    ];
    return (
        <>
            <div className="flex flex-direction-v flex-v-center m-b-40">
                <h1 className="m-b-20">
                    Profile
                </h1>
                <div className="m-b-20">
                    <Image
                        src="/Ellipse 4.png"
                        width={80}
                        height={80}
                    />
                </div>
                <h3 className="m-b-20">Ayuub Naseer</h3>
                <p className=" w-100 m-b-40 center-text">Last Logged in 04/08/2023 at 12:20PM</p>
                <div className="flex space-around w-100 m-b-20">
                    <p><b>UserId:</b> 01258954</p>
                    <p><b>Phone:</b> 09021133343</p>
                </div>
                <div>
                   <b>Email:</b>  ZakariaNasiru@gmail.com
                </div>
            </div>
            <h3 className="center-text m-b-20">Transaction Settings</h3>
            <div className="flex space-around ">
                <div className="balanceCard p-20 ">
                    <h3 className="m-b-20 center-text">Manage Cards</h3>
                    <div className="flex flex-direction-v space-around flex-v-center h-80">
                        <div className="flex flex-direction-v w-100">
                            <div className="flex space-around m-b-20">
                                <div className="flex space-around m-r-10">
                                    <Image className="m-r-20" src="/Vector.svg" width={20} height={20} />
                                    <p>xxxxxxxxx5467</p>
                                </div>
                                <Image src="/Vector (1).png" width={20} height={20} />

                            </div>
                            <div className="flex space-around">
                                <div className="flex space-between m-r-10">
                                    <Image className="m-r-20" src="/uim_master-card.svg" width={20} height={20} />
                                    <p>xxxxxxxxx3328</p>
                                </div>
                                <Image src="/Vector (1).png" width={20} height={20} />


                            </div>
                        </div>
                        <Button variant="outlined">Add Card</Button>
                    </div>
                </div>
                <div className="balanceCard flex flex-direction-v flex-v-center p-20">
                    <h3 className="m-b-20">Set/Change Transaction Pins</h3>
                    <TextField className="m-b-20 w-100" id="outlined-basic" label="Old Pin" variant="outlined" />
                    <TextField className="m-b-20 w-100" id="outlined-basic" label="New Pin" variant="outlined" />
                    <TextField className="m-b-20 w-100" id="outlined-basic" label=" Repeat New Pin" variant="outlined" />
                    <Button variant="contained">Set</Button>
                </div>
            </div>

            <div className="flex flex-direction-v flex-v-center m-t-20 w-100 m-b-80">
                <TableContainer component={Paper} className="flex flex-direction-v flex-v-center  w-80 m-b-80 ">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Service</TableCell>
                                <TableCell align="right">Account Name</TableCell>
                                <TableCell align="right">Account Number</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.Service}
                                    </TableCell>
                                    <TableCell align="right">{row.AccountName}</TableCell>
                                    <TableCell align="right">{row.AccountNumber}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div>
                    <Button variant="contained">Add Account</Button>
                </div>
            </div>



        </>
    )
}

export default Profile;
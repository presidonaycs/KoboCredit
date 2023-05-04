import { get } from "@/api-services/fetch";
import OneClickCards from "@/Components/OneClickCards";
import OneClickDashboard from "@/Components/OneClickDashboard";
import TransactionCard from "@/Components/TransactionCard";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BalanceCard from "../../Components/BalanceCard"
const dashboard = () => {
    const [balance, setBalance] = useState(0);
    let router = useRouter();

    const handleClick = () => {
        router.push("/data-subscription")
    }

    function createData(Service, AccountName, AccountNumber) {
        return { Service, AccountName, AccountNumber };
    }

    const rows = [
        createData(<Image src="/netflix.png" width={40} alt="Service Logo" height={40} />, "Zakaria Nasiru", 233004958),
        createData(<Image src="/gotv.png" width={40} alt="Service Logo" height={40} />, "Zakaria Nasiru", 233004958),
        createData(<Image src="/9mobile-logo.png" width={40} alt="Service Logo" height={40} />, "Zakaria Nasiru", 233004958),
    ];

    const getWalletBalance = async () => {
        const res = await get({ endpoint: "Wallet/GetWalletBalance", auth: false, })
        console.log(res);
        setBalance(res?.data?.wallet_balance)

    }

    useEffect(() => {
        getWalletBalance();
    }, [])



    return (
        <div className="w-100  ">
            <h2 className="m-40">
                Welcome, Zakaria Nasiru
            </h2>
            <div className="flex space-around h-80   m-t-40 m-b-40 ">

                <div className="m-b-40 w-50 ">

                    <BalanceCard balance={balance} className="w-30" />
                    <div >
                        <div className="m-b-40 ">

                            <h3 className="m-b-20 center-text">One Click Transactions</h3>

                            <div className="flex space-around m-b-40  p-10">
                                <OneClickDashboard vendor="icons8-glo.png" onClick={()=>handleClick()}/>
                                <OneClickDashboard vendor="9mobile-logo.png" onClick={()=>handleClick()}/>
                                <OneClickDashboard vendor="netflix.png" onClick={()=>handleClick()}/>
                            </div>
                        </div>
                        <div className="m-b-40">
                            <h3 className="m-b-40 center-text">Saved Accounts</h3>
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
                        </div>
                    </div>


                </div>

                <div className=" m-b-40">
                    <div className="flex space-between  m-b-10">
                        <h3>
                            Recent Transactions
                        </h3>
                        <Link href={"/transactions"}>
                            <h5>See All</h5>
                        </Link>
                    </div>
                    <div className="balanceCardDashboard ">
                        <TransactionCard tab="green" />
                        <TransactionCard tab="red" />
                        <TransactionCard tab="green" />
                        <TransactionCard tab="red" />
                        <TransactionCard tab="red" />
                        <TransactionCard tab="orange" />
                    </div>

                </div>

            </div>
        </div>


    )
}

export default dashboard;
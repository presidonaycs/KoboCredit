import ThreeDots from "@/Components/ThreeDots";
import Button from "@mui/material/Button";
import {useRouter} from 'next/router'

const PrintReceipt = () => {
let router = useRouter();
    const handleClick=() => {
        router.push("/dashboard")
    }
    return (
        <div className="p-t-40 flex flex-direction-column flex-h-center flex-v-center">
            <ThreeDots />

            <div className="m-t-40 receiptBg w-60 flex flex-direction-v flex-v-center">
                <p className="center-text ">Thanks for your patronage.</p>
                <p className="center-text ">Here's your</p>
                <p className="center-text m-b-40">Reciept</p>

                <div className="flex w-100 flex-h-center ">
                    <div className="receiptCard bg-white p-20">
                        <h2 className="center-text m-b-40">PAYGATE</h2>
                        <div className=" p-20">
                            <div className="flex m-b-20">
                                <div className="flex-b-70">
                                    <p>02-05-2023</p>
                                </div>
                                <div className="flex-b-30">
                                    <p>4:30pm</p>
                                </div>
                            </div>
                            <hr className="m-b-40 receiptBottom" />
                            <div className="m-b-40">
                                <div className="m-b-70">
                                    <p className="center-text">Receipt</p>
                                </div>

                            </div>
                            <hr className="m-b-40 receiptBottom" />
                            <div className="flex space-between m-b-40">
                                <div className="flex-b-70">
                                    <h4>Service Paid For:</h4>
                                    <p>Airtime Purchase</p>
                                    <p>Airtel</p>
                                </div>
                                <div className="flex-b-30">
                                    <h4>NGN 9,000</h4>

                                </div>
                            </div>
                            <hr className="m-b-40 receiptBottom" />
                            <div className="flex  m-b-40">
                                <div className="flex-b-70">
                                    <p>Total</p>
                                </div>
                                <div className="flex-b-30">
                                    <p>NGN 9,000</p>
                                </div>
                            </div>

                        </div>
                        <div className="w-100 flex flex-h-center">
                            <Button onClick={()=>handleClick()} variant="contained">Save</Button>
                        </div>


                    </div>
                </div>
            </div>



        </div>
    )
}
export default PrintReceipt;
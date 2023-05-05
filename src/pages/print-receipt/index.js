import ThreeDots from "@/Components/ThreeDots";
import Button from "@mui/material/Button";
import Image from "next/image";
import { useRouter } from 'next/router'

const PrintReceipt = () => {
    let router = useRouter();
    const handleClick = () => {
        router.push("/")
    }


    const {service} = router.query;
    const {serviceType} = router.query;
    const {amount} = router.query;
    const {transactionId} = router.query;



    return (
        <div className="p-t-40 flex flex-direction-column flex-h-center flex-v-center">
            <ThreeDots />

            <div className="m-t-40 receiptBg w-60 flex flex-direction-v flex-v-center">
                <p className="center-text ">Thanks for your patronage.</p>
                <p className="center-text ">Here's your</p>
                <p className="center-text m-b-40">Reciept</p>

                <div className="flex w-100 flex-h-center ">
                    <div className="receiptCard bg-white p-20">
                        <div className="flex flex-h-center">
                            <Image src="/koborush.jpg" width={40} height={40} />
                            <h2 className="center-text m-b-40 m-l-10">KOBORUSH</h2>
                        </div>

                        <div className=" p-20">
                            <div className="flex m-b-20">
                                <div className="flex-b-70">
                                    <p>{new Date().toLocaleDateString()}</p>
                                </div>
                                <div className="flex-b-30">
                                    <p>{new Date().toLocaleTimeString()}</p>
                                </div>
                            </div>
                            <hr className="m-b-40 receiptBottom" />
                            <div className="m-b-40">
                                <div className="m-b-70">
                                    <p className="center-text">Receipt</p>
                                </div>

                            </div>
                            <hr className="m-b-40 receiptBottom" />
                            <div className="flex space-between m-b-10">
                                <div className="flex-b-70">
                                    <h4>Service Paid For:</h4>
                                    <p>{serviceType}</p>
                                    <p>{service}</p>
                                </div>
                                <div className="flex-b-30">
                                    <h4>{`NGN ${amount}`}</h4>

                                </div>
                            </div>
                            <div className="flex space-between m-b-40">
                                <div className="flex-b-70">
                                    <h4>Transaction ID:</h4>
                                </div>
                                <div className="flex-b-30">
                                    <h4>{(transactionId !== null && transactionId !== "null") ? transactionId : "NIL" }</h4>
                                </div>
                            </div>
                            <hr className="m-b-40 receiptBottom" />
                            <div className="flex  m-b-40">
                                <div className="flex-b-70">
                                    <p>Total</p>
                                </div>
                                <div className="flex-b-30">
                                    <p>{`NGN ${amount}`}</p>
                                </div>
                            </div>

                        </div>
                        <div className="w-100 flex flex-h-center">
                            <Button onClick={() => handleClick()} variant="contained">Save</Button>
                        </div>


                    </div>
                </div>
            </div>



        </div>
    )
}
export default PrintReceipt;
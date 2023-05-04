import Image from "next/image";

const TransactionCard = (props) => {
    return (
        <div className="flex m-b-20  p-20">
            <Image 
            src="/netflix.png"
            width={50}
            height={50}
            />
            <div className="m-r-30 m-l-20">
                <div>Zakari Nasiru</div>
                <div>NGN 9000</div>
                <div>pending</div>
            </div>
            <div className="m-r-30">
                <div>Netflix</div>
                <div>14/04/2023</div>
            </div>
            <div className="m-r-30 ">
                <div className={`${props.tab}-tab`}></div>
                <div>at 4:22PM</div>
            </div>
        </div>


    );
}
export default TransactionCard;
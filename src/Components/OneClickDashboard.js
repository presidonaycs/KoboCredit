import Image from "next/image";

const OneClickDashboard =(props)=>{
    return(
        <div onClick={props?.onClick} className={`${props?.active} pointer balanceCardDashboard p-10`}>
        <Image 
            src={`/${props?.vendor}`}
            alt="vendor logo"
            width={60}
            height={60}
        />
        <div>
            <div className="center-text">NGN</div>
            <div className="center-text">{props.amount || "8500"}</div>
        </div>
    </div>
    )
    
}

export default OneClickDashboard;
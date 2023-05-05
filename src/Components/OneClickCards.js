import Image from "next/image";

const OneClickCards =(props)=>{
    return(
        <div onClick={props?.onClick} className={props?.active}>
        <Image 
            src={`/${props?.vendor}`}
            alt="vendor logo"
            width={80}
            height={80}
        />
        {/* <div>
            <div>NGN</div>
            <div>{props.amount || "8500"}</div>
        </div> */}
    </div>
    )
    
}

export default OneClickCards;
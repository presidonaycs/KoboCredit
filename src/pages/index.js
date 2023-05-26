import OneClickCards from "@/Components/OneClickCards";
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import LatestUpdate from "../Components/LatetstUpdate";
import EasyBuy from "../Components/EasyBuy";




export default function PrimarySearchAppBar() {

  const [selectedService, setSelectedService] = useState("");
  const [glo, setGlo] = useState(false);
  const [ikeja, setIkeja] = useState(false);
  const [mtn, setMtn] = useState(false);
  const [dstv, setDstv] = useState(false);
  const [network, setNetwork] = useState("");

let router = useRouter()



  const handleGlo = () => {
    setGlo(true);
    
    setNetwork("Glo")
    setIkeja(false);
    setMtn(false);
    setDstv(false);
  }

  const handleIkeja = () => {
    setGlo(false);
    setIkeja(true);

    setNetwork("Ikeja")
    setMtn(false);
    setDstv(false);
  }

  const handleMtn = () => {
    setGlo(false);
    setIkeja(false);
    setMtn(true);

    setNetwork("Mtn")

    setDstv(false);
  }

  const handleDstv = () => {
    setGlo(false);
    setIkeja(false);
    setMtn(false);
    setDstv(true);

    setNetwork("Dstv")

  }

  const handleChange = (e) => {
    setSelectedService(e.target.value)

    if(e.target.value === "airtime"){
      router.push("/airtime-purchase")
    }
    else if(e.target.value === "data"){
      router.push("/data-subscription")
    }
    else if(e.target.value === "power"){
      router.push("/electricity-bill")
    }
    else{
      router.push("/cable-tv")
    }
   
  }
  const styles = {
    pageTitle: {
      mb: 2,
    },

    columnContainer: {
      columns: "300px 2",
      maxWidth: 1400,
    },
  };


  return (
    <Box >
      
        <Typography sx={styles.pageTitle} variant="h5">
          Welcome to KOBOrush
        </Typography>
        <Box sx={styles.columnContainer}>
          <EasyBuy />
        </Box>
      
      {/* <div className="w-80 ">
        <h1 className="color-white m-b-20"> Welcome, Make A Quick Transaction?</h1>
        <div className="flex flex-start">
          <div className='flex flex-h-center m-b-40 w-50 space-between '>
            <Link href="/airtime-purchase"><OneClickCards onClick={handleGlo} active={glo ? "one-click-border one-click " : "one-click"} vendor="icons8-glo.png" /></Link>
            <Link href="/electricity-bill"><OneClickCards onClick={handleIkeja} active={ikeja ? "one-click-border one-click" : "one-click"} vendor="ikeja-electric.png" /></Link>
            <Link href="/airtime-purchase"> <OneClickCards onClick={handleMtn} active={mtn ? "one-click-border one-click" : "one-click"} vendor="mtn.png" /></Link>
            <Link href="/cable-tv"> <OneClickCards onClick={handleDstv} active={dstv ? "one-click-border one-click" : "one-click"} vendor="DSTV.png" /></Link>
          </div>
        </div>

        <div className="flex space-between p-t-40">

          <div className="w-30">
            <FormControl fullWidth className="m-b-40  w-100">
              <InputLabel id="demo-simple-select-label">Select a Service</InputLabel>

              <Select
                className="m-b-40  w-100"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedService}
                label="Distributor"
                onChange={handleChange}
                sx={{ backgroundColor: "white", color: "black" }}
              >

                <MenuItem key={1} value={"data"}>Subscribe Data</MenuItem>
                <MenuItem key={2} value={"airtime"}>Purchase Airtime</MenuItem>
                <MenuItem key={3} value={"power"}>Electricity Bill</MenuItem>
                <MenuItem key={4} value={"cable"}>TV/Cable Subscripton</MenuItem>


              </Select>
            </FormControl>
          </div>
          <div>
            <Image src="/kobodash.jpg" width={500} height={500} />
          </div>
        </div>
      </div> */}
    </Box>
  );
  
}
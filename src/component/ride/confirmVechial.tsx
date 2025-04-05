import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { LeftArrow } from "../../icons/leftArrow";
import { Button } from "../ui/button";
import { FaCar, FaMoneyBill } from "react-icons/fa";
import { RiMotorbikeFill } from "react-icons/ri";
import { Auto } from "../../icons/auto";
import { useUserRideContext } from "../../context/userRideContext";
import { Location } from "../../icons/location";
import { useFetch } from "../../hook/userFetch";

const ConfirmVehicle = ({setConfirmVachialPanal,setWaitingPanal}:{setConfirmVachialPanal:Dispatch<SetStateAction<boolean>>,setWaitingPanal:Dispatch<SetStateAction<boolean>>}) => {
    const userRideContext=useUserRideContext();
    const [rideType,setRideType]=useState("");
    const imgUrl:Record<"car"|"auto"|"motorcycle",string>={
        car:"https://i.fbcd.co/products/resized/resized-1500-1000/s211114-car-tran006-mainpreview-98c1b8038b213aece57e1aaf2869ebff977725e579c2053d4fb55b54bceef39c.webp",
        auto:"https://us.123rf.com/450wm/venkateshselvarajan/venkateshselvarajan2205/venkateshselvarajan220500023/187831139-auto-rickshaw-vector-illustration-a-primary-transport-vehicle-in-india.jpg?ver=6",
        motorcycle:"https://media1.thehungryjpeg.com/thumbs2/ori_4071401_s01c9v7fkfgoz04kd90j38p41acvl416soitcb7y_motorbike-icon-side-view-motorcycle-cartoon-bike.jpg"
        
    }
    useEffect(()=>{
        if(userRideContext?.userRideInfo.vehicleType){
            setRideType(userRideContext?.userRideInfo.vehicleType)
        }
    },[userRideContext?.userRideInfo])
 
    return (
        <div className="flex flex-col h-screen mt-3 px-4 gap-y-2">
           <div onClick={()=>setConfirmVachialPanal(false)}> <LeftArrow/></div>
                <div className="flex flex-col gap-y-3">
                    {
                      <div className="h-32 w-32 mx-auto"><img src={rideType=="car"?imgUrl.car:rideType=="motorcycle"?imgUrl.motorcycle:rideType=="auto"?imgUrl.auto:""} alt="" /></div>
                    }
                     <div className="flex gap-x-3"><Location/>{userRideContext?.userRideInfo.pickup}</div>
                    <div className="flex gap-x-3"><Location/>{userRideContext?.userRideInfo.destination}</div>
                    <div className="flex gap-x-3"><FaMoneyBill/>{userRideContext?.userRideInfo.fare}</div>
                <Button
                        variant="primary"
                        label="confirm"
                        onClick={()=>setWaitingPanal(true)}/>
            </div>
        </div>
    );
};

export {ConfirmVehicle};
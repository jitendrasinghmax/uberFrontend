import { Dispatch, SetStateAction, useEffect,  } from "react";
import { LeftArrow } from "../../icons/leftArrow";
import { useFetch } from "../../hook/userFetch";
import { useUserRideContext } from "../../context/userRideContext";
import { Loader } from "../loader/loader";

export const VechileInput = ({vachialPanal, setVechialPanal , setConfirmVachialPanal}: {vachialPanal:boolean, setVechialPanal: Dispatch<SetStateAction<boolean>> ,setConfirmVachialPanal: Dispatch<SetStateAction<boolean>>  }) => {
    const vehicles = [
        {
            name: "car",
            capacity: 4,
            time: "2 mins away",
            description: "Affordable, compact rides",
            price: "₹193.20",
            icon: "🚗", // Placeholder for car icon
        },
        {
            name: "motorcycle",
            capacity: 1,
            time: "3 mins away",
            description: "Affordable motorcycle rides",
            price: "₹65",
            icon: "🏍️", // Placeholder for bike icon
        },
        {
            name: "auto",
            capacity: 3,
            time: "3 mins away",
            description: "Affordable Auto rides",
            price: "₹118.86",
            icon: "🛺", // Placeholder for auto icon
        },
    ];
    const {resp,loading,reFetch}=useFetch();
    const userRideContext=useUserRideContext();
    useEffect(()=>{
        if(vachialPanal){
            reFetch('/map/getFare',"POST",{origin:userRideContext?.userRideInfo.pickup,destination:userRideContext?.userRideInfo.destination}) 
            
        }
    },[vachialPanal])
    const vachialTypehandeler=(type:string)=>{

        userRideContext?.setUserRideInfo((prev)=>{
            return {...prev,vehicleType:type,fare:Math.floor(resp[type])+""}
        })
        setConfirmVachialPanal(true)
    }
    console.log(resp)
    return (
        <div className="flex flex-col gap-y-3 p-5">
            <div onClick={()=>setVechialPanal(false)}><LeftArrow/></div>
            {vehicles.map((vehicle, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-300 rounded-lg mb-2 bg-gray-100"
                    onClick={()=>vachialTypehandeler(vehicle.name,)}
                >
                    <div className="flex items-center">
                        <div className="text-2xl mr-4">{vehicle.icon}</div>
                        <div>
                            <h4 className="m-0 text-base font-medium">
                                {vehicle.name} <span className="text-sm text-gray-600">• {vehicle.capacity}</span>
                            </h4>
                            <p className="m-0 text-sm text-gray-500">{vehicle.time}</p>
                            <p className="m-0 text-xs text-gray-400">{vehicle.description}</p>
                        </div>
                    </div>
                    <div className="text-base font-bold">{loading?<Loader/>:(vehicle.name=="car"&&"Rs."+Math.floor(resp?.car)||vehicle.name=="motorcycle"&&"Rs."+Math.floor(resp?.motorcycle)||vehicle.name=="auto"&&"Rs."+Math.floor(resp?.auto))}</div>
                </div>
            ))}
        </div>
    );
};


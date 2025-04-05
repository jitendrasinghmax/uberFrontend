import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Location } from "../../icons/location";
import { useUserRideContext } from "../../context/userRideContext";
import { useFetch } from "../../hook/userFetch";

export const Suggesation=({isActive,value,setValue}:{isActive:string,value:{pickup:string,destination:string},setValue:Dispatch<SetStateAction<{pickup:string,destination:string}>>})=>{
    const userRideContext=useUserRideContext();
    const [locations,setLocations]=useState([]);
    const {resp,error,loading,reFetch}=useFetch();
    const locationHandeler=(location:string)=>{
        userRideContext?.setUserRideInfo((prev)=>{
            return{...prev,[isActive]:location}
        })
        setValue((prev)=>{
            return{...prev,[isActive]:location}
        })
    }
    useEffect(()=>{
        reFetch('/map/getAutoSuggestions',"POST",{input:isActive=="pickup"?value.pickup:value.destination})
    },[value])
    return(<>
    <div className="h-72 overflow-auto px-4 pt-4 flex flex-col gap-y-2">
            {resp&&resp.map((location:{description:string,place_id:string},index:number)=>{
                return <div id={index+""} onClick={()=>locationHandeler(location.description)} className="px-4 py-2 flex border-2 border-gray-400 gap-x-4 rounded-lg active:border-gray-800 "><Location/>{location.description}</div>
            })}
    </div>
    </>)
}
import { Dispatch, ReactElement, SetStateAction, useState } from "react"
import { Input } from "../ui/input"
import { Suggesation } from "./LocationSuggesation"
import { Button } from "../ui/button"
import {  useUserRideContext } from "../../context/userRideContext"

export const InputLocation = ({ panalUp, setPanalUp, setVechialPanal }: { panalUp: boolean, setPanalUp: Dispatch<SetStateAction<boolean>>, setVechialPanal: Dispatch<SetStateAction<boolean>> }) => {
    const [isActive,setIsActive]=useState<string>("");
    const [value,setValue]=useState({
        pickup:"",
        destination:""
    });
    const userRideContext=useUserRideContext();
    const onChangeHandeler=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setPanalUp(true)
        const {value,name}=e.target;
        setIsActive(name);
        setValue((prev)=>{
            return{...prev,[name]:value}
        })
    }
    console.log(userRideContext?.userRideInfo)
    return (
        <>
            <div className="px-5 flex flex-col justify-between">
                <div className="flex flex-col gap-y-4 pt-4 bg-transparent">
                    <Input
                        name="pickup"
                        variant="primary"
                        label="Enter location"
                        value={value.pickup}
                        placeholder="Add a pick-up Location"
                        onChange={(e) => onChangeHandeler(e) }/>
                    <Input
                        name="destination"
                        variant="primary"
                        value={value.destination}
                        placeholder="Distination Location"
                        onChange={(e) =>  onChangeHandeler(e)} />
                </div>
                {panalUp && <Suggesation isActive={isActive} value={value} setValue={setValue}/>}
                {
                    panalUp && <div className="mt-5"><Button
                        variant="primary"
                        label="Confirm"
                        onClick={() => setVechialPanal(true)} />
                    </div>
                }
            </div>
        </>
    )
}
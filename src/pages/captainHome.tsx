import { useEffect, useRef, useState } from "react";
import { useFetch } from "../hook/userFetch";
import hotTost from "../notification/hot.tost";
import { useNavigate } from "react-router-dom";
import {  useCaptainContext } from "../context/captainContext";
import { Button } from "../component/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Otp from "../component/ui/otp";
import { useSocketContext } from "../context/socketContext";
import Map from "../component/map/map";
import { useRideContext } from "../context/rideContext";
export const CaptainHome = () => {
    const [mapPanalUp, setMapPanalUp] = useState(false);
    const [rides, setRides] = useState<any>();
    const [ride,setRide]=useState<any>();
    const [otpValue, setOtpValue] = useState({
        0: "",
        1: "",
        2: "",
        3: ""
    })

    const mapPanalRef = useRef(null);
    const requestRef = useRef(null);
    const { reFetch, resp, error } = useFetch();
    const confirmRide=useFetch();
    const startRide=useFetch();
    const endRide=useFetch();
    const captain= useCaptainContext();
    const {socket}=useSocketContext()
    const rideContext=useRideContext();
    const navigate = useNavigate();
    const otpHandeler=async()=>{
        const otp=otpValue[0]+otpValue[1]+otpValue[2]+otpValue[3]
        const data=await startRide.reFetch('/ride/start-ride',"POST",{rideId:ride._id,otp})
        console.log("start ride",data)
    }
    useGSAP(() => {
        if (mapPanalUp) {
            gsap.to(mapPanalRef.current, {
                top: "0%"
            })
            gsap.to(requestRef.current, {
                top: "100%"
            })
        }
        else {
            gsap.to(mapPanalRef.current, {
                top: "100%"
            })
            gsap.to(requestRef.current, {
                top: "0%"
            })
        }
    }, [mapPanalUp])

    useEffect(() => {
            reFetch('/captain/profile', "POST", {});
    }, []);

    useEffect(() => {

        if (resp) {
            captain?.setCaptain({
                email:resp.captain.email,
                name:resp.captain.fullName.firstName,
                _id:resp.captain._id
            });

        }
    }, [resp]);
    useEffect(()=>{
        if(startRide.resp){
            hotTost.sucess("Ride Started");
        }
    },[startRide.resp])
    useEffect(() => {
        if (error && error.message) {
            hotTost.error(error.message);
            navigate('/captain/signin');
        }
    }, [error]);
    useEffect(()=>{
        if(captain?.captain?._id){
            socket?.emit("join",{userType:"captain",userId:captain.captain._id})
        }
        const updateLocation=()=>{
            if(navigator.geolocation&&captain?.captain){
                navigator.geolocation.getCurrentPosition((position)=>{
                    socket?.emit('update-location-captain',{
                        userId:captain?.captain?._id,
                        location:{
                            ltd:position.coords.latitude,
                        lng:position.coords.longitude
                        }
                    })
                })
            }
        }
        const locationInterval=setInterval(updateLocation,10000);
        updateLocation()
        return ()=>clearInterval(locationInterval)        
    },[captain?.captain])
    socket?.on('new-ride',(data)=>{
        setRides(data)
        console.log("new ride",data)
        hotTost.sucess("New Ride Request")
    })
    socket?.on('end-ride', () => {
        console.log("ride ended");
        window.location.reload();
    });
    const confirmRideHandeler=()=>{
        confirmRide.reFetch('/ride/confirm',"POST",{rideId:rides._id})
    }
    useEffect(()=>{
        if(confirmRide.resp){
            setRide(confirmRide.resp);
            setMapPanalUp(true)
            hotTost.sucess("Ride Confirmed");
            rideContext.setRideGlobal(confirmRide.resp);
        }
    },[confirmRide.resp])
    useEffect(()=>{
        if(startRide.error && startRide.error.message){
            console.log("error",startRide.error.message)
        }
    }
    , [startRide.error])
    return (
        <>
            <div className="flex-1 flex flex-col relative overflow-hidden ">
            <div className="text-xl font-semibold">hey {captain?.captain?.name}</div>
                {rides&&<div ref={requestRef} className="flex flex-col gap-y-3 px-4 relative  bg-white top-0 w-full">
                    
                    {
                        [1].map(() => {
                            return <div className="w-full h-fit p-4  bg-gray-100 rounded-xl">
                                <div>
                                    <h1>pick up- {rides.pickup}</h1>
                                    <h1>Distination- {rides.destination}</h1>
                                    <h1>PRICE- ${rides.fare}</h1>
                                </div>
                                <div className="flex gap-x-2">
                                    <Button
                                        variant="secondary"
                                        label="cancel" />
                                    <Button
                                        variant="primary"
                                        label="Accept"
                                        onClick={confirmRideHandeler} />
                                </div>
                            </div>
                        })
                    }
                </div>}
                <div ref={mapPanalRef} className="h-screen flex flex-col bg-white f-full absolute">
                    <div className="h-2/3 bg-white w-screen">
                    <div className="h-full w-full"><Map userType="captain"/></div>
                    </div>
                    <div className="w-full absolute top-[60%] bg-white h-full rounded-xl px-4 pt-4">
                        <div className="flex w-full ">
                            <div className="h-fit w-1/2 flex flex-col gap-y-2">
                                <h1 className="font-bold">Go To Pick Up</h1>
                                <div className="flex gap-x-2">
                                    <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                                    <h1>{ride?.user?.fullName.firstName}</h1>
                                </div>
                                <div className="font-semibold">{ride?.pickup}</div>
                            </div>
                            <div className="flex flex-col gap-y-2 pl-8">
                                <h1 className="font-bold">Enter OTP</h1>
                                <Otp
                                    otpValue={otpValue}
                                    setOtpValue={setOtpValue} />
                                <Button
                                    variant="primary"
                                    label="Varify"
                                    loading={startRide.loading}
                                    onClick={otpHandeler} />
                            </div>
                        </div>
                        <div className="flex justify-between mt-4">
                            <Button
                                variant="secondary"
                                label="Cancel"
                                loading={endRide.loading}
                                onClick={() => {
                                    endRide.reFetch('/ride/end-captain-ride', "POST", { rideId: ride._id })
                                }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
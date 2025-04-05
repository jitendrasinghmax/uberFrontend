import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { LeftArrow } from "../../icons/leftArrow";
import { Button } from "../ui/button";
import { useFetch } from "../../hook/userFetch";
import { useUserRideContext } from "../../context/userRideContext";
import { Loader } from "../loader/loader";
import { useSocketContext } from "../../context/socketContext";

const LookingForDriver = ({ waitingPanal, setWaitingPanal }: { waitingPanal: boolean, setWaitingPanal: Dispatch<SetStateAction<boolean>> }) => {
    const [ride, setRide] = useState<any>()
    const userRideContext = useUserRideContext()
    const {  loading, reFetch } = useFetch();
    const endRide = useFetch()
    const { socket } = useSocketContext()
    useEffect(() => {
        if (waitingPanal) {
            reFetch('/ride/create', "POST", userRideContext?.userRideInfo)
        }
    }, [waitingPanal])
    socket?.on('ride-confirmed', data => {
        
        setRide(data)
    })
    if (loading) {
        return (<>
            <div className="flex flex-col h-screen mt-3 px-4 gap-y-2">
                <div onClick={() => setWaitingPanal(false)}> <LeftArrow /></div>
                <div className="h-full w-full flex justify-center pt-10">
                    <Loader />
                </div>
            </div>
        </>)
    }

    else return (
        <div className="flex flex-col h-screen mt-3 px-4 gap-y-2">
            <div onClick={() => setWaitingPanal(false)}> <LeftArrow /></div>
            {/* Header */}
            {
                ride ?
                <div className="flex flex-col items-center justify-center bg-gray-100 py-4 shadow-md">
                        <h1 className="text-lg font-semibold">{ride.captain.fullName.firstName}</h1>
                        <div className="mx-auto">{ride.otp}</div>
                    </div>
                :
                    <div className="flex flex-col items-center justify-center bg-gray-100 py-4 shadow-md">
                        <h1 className="text-lg font-semibold">Looking for nearby drivers</h1>
                        <div className="mx-auto"><Loader /></div>
                    </div>
            }

            {/* Vehicle Image */}

            <Button
                    variant="primary"
                    label="Cancel Ride"
                    loading={endRide.loading}
                     onClick={()=>{
                        if(ride){
                            endRide.reFetch('/ride/end-user-ride', "POST", { rideId: ride._id })
                        }
                     }}/>
            {/* Ride Details */}
            <div className="bg-white p-4 shadow-md">
                {/* Pickup Location */}
                <div className="flex items-start mb-4">
                    <div className="text-xl mr-4">📍</div>
                    <div>
                        <h2 className="font-semibold">562/11-A</h2>
                        <p className="text-sm text-gray-600">
                            {userRideContext?.userRideInfo.pickup}
                        </p>
                    </div>
                </div>

                {/* Drop Location */}
                <div className="flex items-start mb-4">
                    <div className="text-xl mr-4">⬛</div>
                    <div>
                        <h2 className="font-semibold">Third Wave Coffee</h2>
                        <p className="text-sm text-gray-600">
                            {userRideContext?.userRideInfo.destination}
                        </p>
                    </div>
                </div>

                {/* Fare Details */}
                <div className="flex items-start">
                    <div className="text-xl mr-4">💵</div>
                    <div>
                        <h2 className="font-semibold">₹{userRideContext?.userRideInfo.fare}</h2>
                        <p className="text-sm text-gray-600">Cash</p>
                    </div>
                </div>
               
            </div>
        </div>
    );
};

export { LookingForDriver };
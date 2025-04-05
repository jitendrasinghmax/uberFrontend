import { useEffect, useRef, useState } from "react";
import { useFetch } from "../hook/userFetch"
import hotTost from "../notification/hot.tost";
import { useNavigate } from "react-router-dom";
import { userContext, UserContextType } from "../context/userContext";
import { Loader } from "../component/loader/loader";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DownIcon } from "../icons/down";
import { InputLocation } from "../component/ride/inputLocation";
import { VechileInput } from "../component/ride/vaichalInput";
import { ConfirmVehicle } from "../component/ride/confirmVechial";
import { LookingForDriver } from "../component/ride/waiting";
import { useSocketContext } from "../context/socketContext";
import { useRideContext } from "../context/rideContext";
import Map from "../component/map/map";
export const UserHome = () => {
    const [panalUp, setPanalUp] = useState(false);
    const [vachialPanal, setVechialPanal] = useState(false);
    const [confirmVechialPanel, setConfirmVachialPanal] = useState(false);
    const [waitingPanal, setWaitingPanal] = useState(false)
    const panalRef = useRef(null)
    const vechialPanalRef = useRef(null);
    const confirmVechialRef = useRef(null);
    const waitingPanalRef = useRef(null)
    const { reFetch, resp, error } = useFetch();
    const user: UserContextType | undefined = userContext();
    const { socket } = useSocketContext()
    const rideContext = useRideContext()
    const navigate = useNavigate();
    useGSAP(() => {
        if (panalUp) {
            gsap.to(panalRef.current, {
                height: "10%"
            })
        }
        else {
            gsap.to(panalRef.current, {
                height: "60%"
            })
        }
    }, [panalUp])
    useGSAP(() => {
        if (vachialPanal) {
            gsap.to(vechialPanalRef.current, {
                top: "25%"
            })
            gsap.to(panalRef.current, {
                height: "60%"
            })
        }
        else {
            gsap.to(vechialPanalRef.current, {
                top: "100%"
            })
            if (panalUp) {
                gsap.to(panalRef.current, {
                    height: "10%"
                })
            }
        }
    }, [vachialPanal])
    useGSAP(() => {
        if (confirmVechialPanel) {
            gsap.to(confirmVechialRef.current, {
                top: "25%"
            })
            gsap.to(vechialPanalRef.current, {
                top: "100%"
            })
        }
        else {
            gsap.to(confirmVechialRef.current, {
                top: "100%"
            })
            if (vachialPanal) {
                gsap.to(vechialPanalRef.current, {
                    top: "25%"
                })
            }
        }
    }, [confirmVechialPanel])
    useGSAP(() => {
        if (waitingPanal) {
            gsap.to(confirmVechialRef.current, {
                top: "100%"
            })
            gsap.to(waitingPanalRef.current, {
                top: "25%"
            })
        }
        else {
            gsap.to(waitingPanalRef.current, {
                top: "100%"
            })
            if (confirmVechialPanel) {
                gsap.to(confirmVechialRef.current, {
                    top: "25%"
                })
            }
        }
    }, [waitingPanal])
    useEffect(() => {
        reFetch('/user/profile', "POST", {});

    }, [])
    useEffect(() => {
        if (resp) {
            user?.setUser(resp.user);
            console.log(resp)
        }
    }, [resp])
    useEffect(() => {
        if (error && error.message) {
            hotTost.error(error.message);
            navigate('/user/signin');
        }
    }, [error])
    useEffect(() => {
        if (user?.user) {
            socket?.emit("join", { userType: "user", userId: user?.user._id })
        }

    }, [user?.user])
    socket?.on('ride-started', ride => {
        rideContext.setRideGlobal(ride);
        console.log("ride started", ride)
        gsap.to(waitingPanalRef.current, {
            top: "60%"
        })
    })
    socket?.on('end-ride', () => {
        console.log("ride ended");
        window.location.reload();
    });
    return (
        <>

            <div className="flex-1 flex flex-cols">
                {
                    false ?
                        <Loader />
                        :
                        <div className="z-20 flex-1 flex flex-col relative overflow-hidden">
                            <div className="h-2/3 ">
                                <div className="h-2/3 w-full absolute"><Map userType="user" /></div>
                            </div>
                            <div className="h-screen w-screen absolute ">
                                <div ref={panalRef} className=" w-full"></div>
                                <div className="h-full w-full rounded-t-2xl bg-white">
                                    <div style={{ display: panalUp ? "" : "none" }} className="flex justify-center pt-4" onClick={() => setPanalUp(false)}><DownIcon /></div>
                                    <InputLocation panalUp={panalUp} setPanalUp={setPanalUp} setVechialPanal={setVechialPanal} />
                                </div>
                                <div ref={vechialPanalRef} className="bg-white absolute w-full h-full rounded-t-2xl">
                                    <VechileInput vachialPanal={vachialPanal} setVechialPanal={setVechialPanal} setConfirmVachialPanal={setConfirmVachialPanal} />
                                </div>
                                <div ref={confirmVechialRef} className="bg-white absolute top-[20%] h-full w-full rounded-t-2xl">
                                    <ConfirmVehicle setConfirmVachialPanal={setConfirmVachialPanal} setWaitingPanal={setWaitingPanal} />
                                </div>
                                <div ref={waitingPanalRef} className="bg-white absolute top-0 w-full rounded-t-2xl">
                                    <LookingForDriver waitingPanal={waitingPanal} setWaitingPanal={setWaitingPanal} />
                                </div>
                            </div>
                        </div>
                }
            </div>

        </>
    )
}
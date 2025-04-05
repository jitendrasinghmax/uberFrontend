import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Outlet } from "react-router-dom"
import { SignIn as UserSignIn } from "../pages/user/signin"
import { SignUp as UserSignUp } from "../pages/user/signup"
import { SignIn as CaptainSignIn } from "../pages/captain/signin"
import { SignUp as CaptainSignUp } from "../pages/captain/signup"
import { Start } from "../pages/start"
import { Toaster } from "react-hot-toast"
import { UserHome } from "../pages/userHome"
import { CaptainHome } from "../pages/captainHome"
import { UserRideProvide } from "../context/userRideContext"
import { CaptainProvider } from "../context/captainContext"
import { useSocketContext } from "../context/socketContext"
import hotTost from "../notification/hot.tost"

export const Layout = () => {
    const {socket}=useSocketContext();
    socket?.on('error',data=>{
        hotTost.sucess(data.message)
    })
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Toaster />
                <div className="text-xl pl-4 mb-4 font-extrabold">
                    UBER
                </div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Start />} />
                        <Route path='/userHome' element={<UserRideProvide>
                                                             <UserHome />
                                                         </UserRideProvide>}></Route>
                        <Route path='/captainHome' element={
                                                            <CaptainProvider>
                                                                <CaptainHome />
                                                            </CaptainProvider>
                        }></Route>
                        <Route path="/user" element={<Outlet />}>
                            <Route path="signin" element={<UserSignIn />} />
                            <Route path="signup" element={<UserSignUp />} />
                        </Route>
                        <Route path="/captain" element={<Outlet />}>
                            <Route path="signin" element={<CaptainSignIn />} />
                            <Route path="signup" element={<CaptainSignUp />} />
                        </Route>

                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}
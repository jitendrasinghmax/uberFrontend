import { useNavigate } from "react-router-dom";
import { Button } from "../component/ui/button";
import { RightArrow } from "../icons/rightArrow";

export const Start = () => {
    const naviagte=useNavigate();
  return (
    <div className="h-screen">
       <div className="flex flex-col justify-between items-center h-full pb-4 px-2">
        <div className="flex flex-col justify-center items-center h-full">
            <h1 className="text-5xl font-extrabold">UBER</h1>
        </div>
        <div className="flex flex-col gap-y-2">
            <h1 className="text-lg font-extrabold">Get Started with UBER</h1>
            <Button variant="primary" label="continue" endIcon={<RightArrow/>} onClick={()=>naviagte("/user/signin")}/>
        </div>
       </div>
    </div>
  );
}
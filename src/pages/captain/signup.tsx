import { useEffect, useState } from "react";
import { Button } from "../../component/ui/button";
import { Input } from "../../component/ui/input";
import { useFetch } from "../../hook/userFetch";
import hotTost from "../../notification/hot.tost";
import { useNavigate } from "react-router-dom";
import { CaptainContextType, useCaptainContext } from "../../context/captainContext";

export const SignUp = () => {
  const navigate=useNavigate();
  const [formData,setFormData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    color:"",
    plate:"",
    capacity:""
  })
  const {reFetch,resp,error,loading}=useFetch();
  const [isError,setError]=useState<any>();
  const [message,setMessage]=useState<string|null>();
  const captain:CaptainContextType=useCaptainContext()
  const formHandeler=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {value,name}=e.target;
    setFormData((prev)=>{
      return{...prev,[name]:value}
    })
  }
  useEffect(()=>{
    console.log(error)
    if(error){
      setError(error.errors);
      setMessage(error.message);
    }
  },[error])
  useEffect(()=>{
    if(resp){
      hotTost.sucess(resp.message);
      navigate('/captainHome');
    }
  },[resp])
  useEffect(()=>{
    if(captain&&captain.captain?.email)navigate('/home')
  },[])
  return (
    <>
      <div className="flex-1 px-2 flex flex-col justify-between pb-10">
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-x-2">
            <Input
              warning={isError?.fullName.firstName==false?"first name "+message:""}
              onChange={(e)=>formHandeler(e)}
              value={formData.firstName}
              name="firstName"
              placeholder="Enter first name"
              variant="primary" />
            <Input
              warning={isError?.fullName.lastName==false?"last name "+message:""}
              onChange={(e)=>formHandeler(e)}
              value={formData.lastName}
              name="lastName"
              placeholder="Enter last name"
              variant="primary" />
          </div>
          <Input
            warning={isError&&isError.email==false?"email "+message:""}
            onChange={(e)=>formHandeler(e)}
            value={formData.email}
            name="email"
            placeholder="Enter Email"
            variant="primary" />
          <Input
            warning={isError?.password==false?"password "+message:""}
            onChange={(e)=>formHandeler(e)}
            value={formData.password}
            name="password"
            placeholder="Enter password name"
            variant="primary" />
            <h1 className="text-md font-bold">VACIAL</h1>
          <div className="flex gap-x-2">
            <Input
              warning={isError?.vechial.color==false?"color "+message:""}
              onChange={(e)=>formHandeler(e)}
              value={formData.color}
              name="color"
              placeholder="color"
              variant="primary" />
            <Input
              warning={isError?.vechial.plate==false?"plate "+message:""}
              onChange={(e)=>formHandeler(e)}
              value={formData.plate}
              name="plate"
              placeholder="plate"
              variant="primary" />
            <Input
              warning={isError?.vechial.capacity==false?"capacity "+message:""}
              onChange={(e)=>formHandeler(e)}
              value={formData.capacity}
              name="capacity"
              placeholder="capacity"
              variant="primary" />
          </div>
          <Button 
                onClick={()=>reFetch('/captain/register',"POST",formData)}
                loading={loading}
                variant="primary"
                label="signup"/>
        </div>
        <div>
          <Button
                onClick={()=>navigate('/captain/signin')}
                variant="secondary"
                label="signin"/>
        </div>
      </div>
    </>
  );
}
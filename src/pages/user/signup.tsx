import { useEffect, useState } from "react";
import { Input } from "../../component/ui/input";
import { Button } from "../../component/ui/button";
import { useFetch } from "../../hook/userFetch";
import { useNavigate } from "react-router-dom";
import { userContext, UserContextType } from "../../context/userContext";
import hotTost from "../../notification/hot.tost";

export const SignUp = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState<any>(null);
  const [message, setMessage] = useState<string|null>(null); 
  const {reFetch,loading,error,resp}=useFetch();
  const user:UserContextType|undefined=userContext();
  const formHander = (e: React.ChangeEvent<HTMLInputElement>) => {
  const {name,value}=e.target;
  setFormData((prev)=>{
    return {...prev,[name]:value}
  })
}
useEffect(()=>{  
  if(error){
    setIsError(error.errors);
  setMessage(error.message);
  }
}, [error])
useEffect(()=>{
  if(resp){
    hotTost.sucess(resp.message)
    navigate('/userHome');
  }
},[resp])
useEffect(()=>{
  if(user&&user.user?.email)navigate('/userHome')
},[])
    return (
    <div className=" flex-1 flex flex-col justify-between  px-2 pb-10">
      <div className=" h-full flex flex-col gap-y-2 justify-between">
        <div className="flex justify-evenly gap-x-2">
          <Input
          warning={isError?.fullName.firstName==false?"first name"+message:null}
          name="firstName"
          placeholder="Enter Fist Name"
          variant="primary"
          value={formData.firstName}
          onChange={(e)=>formHander(e)}
          />
          <Input
          name="lastName"
          placeholder="Enter Last Name"
          warning={isError?.fullName.lastName==false?"last name   "+message:null}
          variant="primary"
          value={formData.lastName}
          onChange={(e)=>formHander(e)}
          />
        </div>
        <Input
          name="email"
          placeholder="Enter Email Name"
          variant="primary"
          warning={isError?.email==false?"Email "+message:null}
          value={formData.email}
          onChange={(e)=>formHander(e)}
          />
          <Input
          name="password"
          placeholder="Enter password Name"
          variant="primary"
          warning={isError?.password==false?"password "+message:null}
          value={formData.password}
          onChange={(e)=>formHander(e)}
          />
          <Button
          variant="primary"
          label="Sign Up"
          loading={loading}
          onClick={()=>reFetch('/user/register',"POST",formData)}/>
      </div>
      <div>
        <Button 
        variant="secondary" 
        label="Signin" 
        onClick={()=>navigate("/user/signin")}
        />
      </div>
    </div>
  );
}
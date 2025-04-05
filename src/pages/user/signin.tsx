import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../component/ui/button";
import { Input } from "../../component/ui/input";
import { useEffect, useState } from "react";
import { useFetch } from "../../hook/userFetch";
import hotTost from "../../notification/hot.tost";
export const SignIn = () => {
    const navigate = useNavigate();
    const [formData,setFormData]=useState({
      email:"",
      password:""
    });
    const [isError,setIsError]=useState<any>();
    const [message,setMessage]=useState<String|null>();
    const {reFetch,resp,error,loading}=useFetch();
    const formHander=(e:React.ChangeEvent<HTMLInputElement>)=>{
      const {name,value}=e.target;
      setFormData((prev)=>{
        return {...prev,[name]:value}
      })
    }
    useEffect(()=>{
      console.log(error)
      if(error){
        setIsError(error.errors);
        setMessage(error.message);
      }
      if(error&&!error?.errors){
        
        hotTost.error(error.message)
      }
    },[error])
    useEffect(()=>{
      if(resp){
        console.log(resp)
        hotTost.sucess(resp.message)
        navigate('/userHome');
      }    
    },[resp])
    return (
      <div className="flex-1 flex flex-col justify-between pb-10  px-4">
        <div className="flex flex-col gap-y-4">
            <Input variant="primary" 
                    name="email"
                    warning={isError?.email==false?"email "+message:null}
                    placeholder="example@gmail.com" 
                    label="Enter Your Email"
                    value={formData.email}
                    onChange={(e)=>formHander(e)}/>
            <Input  name="password"
                    type="password"
                    variant="primary" 
                    warning={isError?.password==false?"password "+message:null}
                    placeholder="******" 
                    label="Enter Your Password"
                    value={formData.password}
                    onChange={(e)=>formHander(e)}/>
            <Button loading={loading}
                    variant="primary" 
                    label="Login" 
                    onClick={()=>reFetch('/user/login',"POST",formData)}/>
            <h1 className="font-bold text-center">New here? <Link className="text-blue-400" to='/user/signup'>Create New Account</Link></h1>
        </div>
        <div>
            <Button variant="secondary" label="Sign as Captain" onClick={()=>navigate('/captain/signin')} />
        </div>
      </div>
    );
  }
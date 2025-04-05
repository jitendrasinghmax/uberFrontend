import { useState } from "react";

export const useFetch = () => {
    const [resp, setResp] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);
    
    
        const reFetch = async (route:String,method:string,body:any) => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${route}`,
                method=="POST"?{
                    method:"POST",
                    credentials: "include",
                    headers:{
                        "Content-Type":"application/json",
                        "Accept":"application/json",
                    },
                    body:JSON.stringify(body),
                }:{
                    method:"GET",
                    credentials: "include",
                    headers:{
                        "Content-Type":"application/json",
                        "Accept":"application/json",
                    }, 
                }
            );
            
            if (!response.ok) {
            if (response.status === 400) {
                const result=await response.json()
                setError(result);
                throw new Error("invalid input");
            }
            if(response.status==401){
                const result=await response.json()
                console.log(result)
                setError(result);
                throw new Error("unauthrized");
            }
        }
        if(response.status==200){
            const data = await response.json();
            setResp(data);
        }
       
     } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
        };
    
    
    return { resp, loading, error,reFetch };
    }
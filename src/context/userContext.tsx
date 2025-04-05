import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
interface user{
    _id:string,
    fullName:{
        firstName:string;
        lastName:string
    },
    email:string|null,
}

export interface UserContextType {
    user:user|null;
    setUser:Dispatch<SetStateAction<user|null>>;
}

export const AppContext = createContext<UserContextType | undefined>(undefined);
interface ContextProps {
    children: ReactNode;
  }
export const UserContextProvider=({children}:ContextProps)=>{
    const [user,setUser]=useState<user|null>(null);
    return(
        <>
        <AppContext.Provider value={{user,setUser}}>
            {children}
        </AppContext.Provider>
        </>
    )
}
export const userContext=()=>useContext(AppContext);
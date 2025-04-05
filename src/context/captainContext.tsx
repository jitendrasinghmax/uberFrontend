import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

export interface captainInterface{
    email:string;
    name:string;
    _id:string;
}
export interface CaptainContextType {
    captain: captainInterface|null;
    setCaptain:Dispatch<SetStateAction<captainInterface>>;
}

const CaptainContext = createContext<CaptainContextType|undefined>(undefined);

export const CaptainProvider = ({ children }:{children:ReactNode}) => {
    const [captain, setCaptain] = useState<captainInterface>({
        email:"",
        name:"",
        _id:""
    });

    return (
        <CaptainContext.Provider value={{ captain, setCaptain }}>
            {children}
        </CaptainContext.Provider>
    );
};

export const useCaptainContext = (): CaptainContextType => {
    const context = useContext(CaptainContext);
    if (!context) {
        throw new Error("useCaptainContext must be used within a CaptainProvider");
    }
    return context;
};

import React, { createContext, useState, ReactNode, useContext } from "react";

interface UserRideInfo {
    pickup: string;
    destination: string;
    vehicleType: string;
    fare:string;
}

export interface UserRideContextType {
    userRideInfo: UserRideInfo;
    setUserRideInfo: React.Dispatch<React.SetStateAction<UserRideInfo>>;
}

const UserRideContext = createContext<UserRideContextType | undefined>(undefined);

export const UserRideProvide = ({ children }:{children:ReactNode}) => {
    const [userRideInfo, setUserRideInfo] = useState<UserRideInfo>({
        pickup: "",
        destination: "",
        vehicleType: "",
        fare:""
    });

    return (
        <UserRideContext.Provider value={{ userRideInfo, setUserRideInfo }}>
            {children}
        </UserRideContext.Provider>
    );
};

export const useUserRideContext = ()=> useContext(UserRideContext);
  
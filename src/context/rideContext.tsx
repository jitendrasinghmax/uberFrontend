import { createContext, useContext, useState, ReactNode } from "react";

type RideContextType = {
    rideGlobal: any;
    setRideGlobal: React.Dispatch<React.SetStateAction<any>>;
};

const RideContext = createContext<RideContextType | undefined>(undefined);

export const RideProvider = ({ children }: { children: ReactNode }) => {
    const [rideGlobal, setRideGlobal] = useState<any>(null);

    return (
        <RideContext.Provider value={{ rideGlobal, setRideGlobal }}>
            {children}
        </RideContext.Provider>
    );
};

export const useRideContext = () => {
    const context = useContext(RideContext);
    if (!context) {
        throw new Error("useRideContext must be used within a RideProvider");
    }
    return context;
};

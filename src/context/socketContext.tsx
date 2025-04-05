import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
   
    isConnected: boolean;
    socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socketInstance = io(import.meta.env.VITE_BACKEND_URL, { // Use the correct environment variable
            transports: ["websocket", "polling"], // Ensure fallback to polling if WebSocket fails
            withCredentials: true, // Allow credentials if needed
        });

        setSocket(socketInstance);

        socketInstance.on("connect", () => {
            console.log("Connected to server:", socketInstance.id);
            setIsConnected(true);
        });

        socketInstance.on("disconnect", () => {
            console.log("Disconnected from server");
            setIsConnected(false);
        });

        socketInstance.on("connect_error", (err) => {
            console.error("Connection error:", err);
        });

        return () => {
            socketInstance.disconnect();
        };
    }, []);


    return (
        <SocketContext.Provider value={{ socket,isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocketContext = (): SocketContextType => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocketContext must be used within a SocketProvider");
    }
    return context;
};

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
        const socketInstance = io(import.meta.env.BASE_URL, {
            transports: ["websocket"],
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

    const sendMessage = (eventName: string, data: any) => {
        if (socket) {
            socket.emit(eventName, data);
        } else {
            console.error("Socket is not connected.");
        }
    };

    const onMessage = (eventName: string, callback: (data: any) => void) => {
        if (socket) {
            socket.on(eventName, callback);
        } else {
            console.error("Socket is not connected.");
        }
    };

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

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@/config";
import { useAuth } from "@/context/auth-context";

interface SocketContextType {
    socket: Socket | null;
    connected: boolean;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    connected: false,
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [connected, setConnected] = useState(false);
    const { removeAuthContext } = useAuth();

    useEffect(() => {
        const init = async () => {
            const stored = await AsyncStorage.getItem("auth");
            const auth = stored ? JSON.parse(stored) : {};
            const token = auth?.token;

            if (!token) {
                removeAuthContext();
                return;
            }

            const socketInstance = io(BASE_URL, {
                transports: ["websocket"],
                auth: { token: `Bearer ${token}` },
            });

            setSocket(socketInstance);

            socketInstance.on("connect", () => {
                setConnected(true);
                console.log("Socket connected:", socketInstance.id);
            });

            socketInstance.on("disconnect", () => {
                setConnected(false);
                console.log("socket disconnected:", socketInstance.id);
            });

            socketInstance.on("connect_error", (err) => {
                if (
                    err.message === "Invalid or expired token" ||
                    err.message === "Authentication required"
                ) {
                    removeAuthContext();
                }
            });
        };

        init();

        return () => {
            socket?.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, connected }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
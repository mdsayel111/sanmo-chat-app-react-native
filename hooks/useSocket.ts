import { BASE_URL } from "@/config";
import { useAuth } from "@/context/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = () => {
    const socketRef = useRef<Socket | null>(null);
    const [connected, setConnected] = useState(false);
    const { removeAuthContext } = useAuth();

    useEffect(() => {
        // let isMounted = true;

        const init = async () => {
            const stored = await AsyncStorage.getItem("auth");
            const auth = stored ? JSON.parse(stored) : {};
            const token = auth?.token;

            if (!token) {
                // navigation.reset({
                //     index: 0,
                //     routes: [{ name: "Auth" }],
                // });
                // router.
                removeAuthContext();
                return;
            }

            if (socketRef.current) return;

            const socket = io(BASE_URL, {
                transports: ["websocket"],
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
                auth: { token: `Bearer ${token}` },
            });

            socketRef.current = socket;

            socket.on("connect", () => {
                // if (!isMounted) return;
                console.log("Socket connected:", socket.id);
                setConnected(true);
            });

            socket.on("disconnect", () => {
                // if (!isMounted) return;
                setConnected(false);
            });

            socket.on("connect_error", async (err) => {
                console.log("Socket auth error:", err.message);

                // If invalid token → clear storage & redirect
                if (
                    err.message === "Invalid or expired token" ||
                    err.message === "Authentication required"
                ) {
                    // await AsyncStorage.removeItem("auth");
                    removeAuthContext();

                    // navigation.reset({
                    //     index: 0,
                    //     routes: [{ name: "Auth" }],
                    // });
                }
            });
        };

        init();

        return () => {
            // isMounted = false;
            socketRef.current?.disconnect();
            socketRef.current = null;
        };
    }, []);

    return {
        socket: socketRef.current,
        connected,
    };
};
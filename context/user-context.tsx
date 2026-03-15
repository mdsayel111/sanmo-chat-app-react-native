// context/users-context.tsx
import { useAuthAxios } from "@/hooks/use-auth-axios";
import { TUser } from "@/types/user-type";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useSocket } from "./socket-context";
import { useAuth } from "./auth-context";

type TUserWithStatus = TUser & { isActive: boolean };

type UsersContextType = {
    users: TUserWithStatus[];
};

const UsersContext = createContext<UsersContextType | undefined>(undefined);

// Hook to access users
export const useUsers = () => {
    const context = useContext(UsersContext);
    if (!context) throw new Error("useUsers must be used within UsersProvider");
    return context;
};

type Props = { children: ReactNode };

export const UsersProvider = ({ children }: Props) => {
    const [users, setUsers] = useState<TUserWithStatus[]>([]);
    const { socket } = useSocket();
    const axios = useAuthAxios();
    const { auth } = useAuth();

    useEffect(() => {
        if (auth?.token) {
            axios.get("/user/all-users").then((res) => {
                const active: TUser[] = res.data?.data?.activeUsers || [];
                const inactive: TUser[] = res.data.data?.inactiveUsers || [];

                const merged: TUserWithStatus[] = [
                    ...active.map(u => ({ ...u, isActive: true })),
                    ...inactive.map(u => ({ ...u, isActive: false })),
                ];
                setUsers(merged.sort(sortUsers));
            });
        }
    }, [axios, auth]);

    useEffect(() => {
        if (!socket) return;

        const handleUserConnected = (userId: string) => {
            setUsers(prev => prev.map(u => u._id === userId ? { ...u, isActive: true } : u).sort(sortUsers));
        };

        const handleUserDisconnected = (userId: string) => {
            setUsers(prev => prev.map(u => u._id === userId ? { ...u, isActive: false } : u).sort(sortUsers));
        };

        socket.on("userConnected", handleUserConnected);
        socket.on("userDisconnected", handleUserDisconnected);

        return () => {
            socket.off("userConnected", handleUserConnected);
            socket.off("userDisconnected", handleUserDisconnected);
        };
    }, [socket]);

    const sortUsers = (a: TUserWithStatus, b: TUserWithStatus) => {
        if (a.isActive && !b.isActive) return -1;
        if (!a.isActive && b.isActive) return 1;
        return (a.name || "").localeCompare(b.name || "");
    };

    return <UsersContext.Provider value={{ users }}>{children}</UsersContext.Provider>;
};
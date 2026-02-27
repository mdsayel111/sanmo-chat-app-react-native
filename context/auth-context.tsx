import { TUser } from "@/types/user-type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from "react";

type TAuth = {
    token: string;
    user: TUser;
} | null

type AuthContextType = {
    auth: TAuth;
    loading: boolean;
    setAuthContext: (data: TAuth) => Promise<void>;
    removeAuthContext: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [auth, setAuth] = useState<TAuth | null>(null);
    const [loading, setLoading] = useState(true);

    // Load token on app start
    useEffect(() => {
        const loadToken = async () => {
            const auth = JSON.parse((await AsyncStorage.getItem("auth")) || "null");
            setAuth(auth);
            setLoading(false);
        };

        loadToken();
    }, []);

    // set auth 
    const setAuthContext = async (data: TAuth) => {
        setAuth(data);
        await AsyncStorage.setItem("auth", JSON.stringify(data));
    };

    // remove auth
    const removeAuthContext = async () => {
        setAuth(null);
        await AsyncStorage.removeItem("auth");
    };

    const clearAsyncStorage = async () => {
        try {
            await AsyncStorage.clear();
            console.log('AsyncStorage cleared successfully');
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }
    };
    // clearAsyncStorage()
    return (
        <AuthContext.Provider
            value={{
                loading,
                auth,
                setAuthContext,
                removeAuthContext,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
};
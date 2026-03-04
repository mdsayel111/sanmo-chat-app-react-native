import { API_URL } from "@/config";
import { useAuth } from "@/context/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, {
    AxiosError,
    AxiosInstance,
    InternalAxiosRequestConfig,
} from "axios";
import { useEffect } from "react";

// create singleton instance
const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

export function useAuthAxios(): AxiosInstance {
    const authData = useAuth();

    useEffect(() => {
        const requestInterceptor = axiosInstance.interceptors.request.use(
            async (config: InternalAxiosRequestConfig) => {
                const token = authData.auth?.token;

                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                const fullUrl = `${config.baseURL ?? ""}${config.url ?? ""}`;

                // console.log("🚀 REQUEST:", {
                //     method: config.method?.toUpperCase(),
                //     url: fullUrl,
                //     params: config.params,
                //     data: config.data,
                // });
                console.log("🚀 REQUEST:", fullUrl);
                return config;
            },
            (error: AxiosError) => Promise.reject(error)
        );

        const responseInterceptor = axiosInstance.interceptors.response.use(
            (response) => response,
            async (error: AxiosError) => {
                if (error.response?.status === 401) {
                    await AsyncStorage.removeItem("auth");
                }
                // console.log(JSON.stringify(error), "Error from Axios")
                return Promise.reject(error);
            }
        );

        // cleanup interceptors to prevent duplicates
        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }, []);

    return axiosInstance;
}
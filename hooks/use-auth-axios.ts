// import { API_URL } from "@/config";
// import { useAuth } from "@/context/auth-context";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios, {
//     AxiosError,
//     AxiosInstance,
//     InternalAxiosRequestConfig,
// } from "axios";
// import { useEffect } from "react";

// // create singleton instance
// const axiosInstance: AxiosInstance = axios.create({
//     baseURL: API_URL,
//     timeout: 10000,
// });

// export function useAuthAxios(): AxiosInstance {
//     const authData = useAuth();

//     useEffect(() => {
//         const requestInterceptor = axiosInstance.interceptors.request.use(
//             async (config: InternalAxiosRequestConfig) => {
//                 const token = authData.auth?.token;

//                 if (token) {
//                     config.headers.Authorization = `Bearer ${token}`;
//                 }
//                 const fullUrl = `${config.baseURL ?? ""}${config.url ?? ""}`;

//                 // console.log("🚀 REQUEST:", {
//                 //     method: config.method?.toUpperCase(),
//                 //     url: fullUrl,
//                 //     params: config.params,
//                 //     data: config.data,
//                 // });
//                 console.log("🚀 REQUEST:", fullUrl);
//                 return config;
//             },
//             (error: AxiosError) => Promise.reject(error)
//         );

//         const responseInterceptor = axiosInstance.interceptors.response.use(
//             (response) => response,
//             async (error: AxiosError) => {
//                 if (error.response?.status === 401) {
//                     await AsyncStorage.removeItem("auth");
//                 }
//                 // console.log(JSON.stringify(error), "Error from Axios")
//                 return Promise.reject(error);
//             }
//         );

//         // cleanup interceptors to prevent duplicates
//         return () => {
//             axiosInstance.interceptors.request.eject(requestInterceptor);
//             axiosInstance.interceptors.response.eject(responseInterceptor);
//         };
//     }, []);

//     return axiosInstance;
// }

import { useAuth } from "@/context/auth-context";
import axios, {
    AxiosInstance,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig,
    AxiosRequestHeaders
} from "axios";
import { API_URL } from "@/config";
import { useEffect } from "react";

// singleton axios instance
const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

export function useAuthAxios(): AxiosInstance {
    const { auth, loading, removeAuthContext } = useAuth();

    useEffect(() => {
        if (loading) return;

        if (!auth?.token) {
            removeAuthContext();
            return;
        }


        // Request interceptor
        const reqInterceptor = axiosInstance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                // Ensure headers exist
                if (!config.headers) {
                    config.headers = {} as AxiosRequestHeaders;
                }

                // console.log(auth.token, "-----------------", config.baseURL, config.url)

                // Axios 1.x headers are AxiosHeaders
                if ("set" in config.headers && typeof config.headers.set === "function") {
                    config.headers.set("Authorization", `Bearer ${auth.token}`);
                } else {
                    // fallback if headers is a plain object
                    (config.headers as Record<string, string>).Authorization = `Bearer ${auth.token}`;
                }

                // console.log("🚀 REQUEST:", `${config.baseURL}${config.url}`);
                return config;
            },
            (error: AxiosError) => Promise.reject(error)
        );

        // Response interceptor
        const resInterceptor = axiosInstance.interceptors.response.use(
            (res: AxiosResponse) => res,
            async (error: AxiosError) => {
                // Log the URL/method that caused the error
                if (error.config) {
                    console.error(
                        `❌ Axios Error: [${error.config.method?.toUpperCase()}] ${error.config.baseURL}${error.config.url}`,
                        "\nResponse:", error.response?.data
                    );
                } else {
                    console.error("❌ Axios Error without config:", error);
                }

                // Handle 401
                if (error.response?.status === 401) {
                    await removeAuthContext();
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstance.interceptors.request.eject(reqInterceptor);
            axiosInstance.interceptors.response.eject(resInterceptor);
        };
    }, [auth, loading, removeAuthContext]);

    return axiosInstance;
}
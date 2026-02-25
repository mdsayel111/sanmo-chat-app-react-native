import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> {
  return function AuthGuard(props: P) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        const value = await AsyncStorage.getItem("auth");

        if (!value) {
          router.replace("/auth");
          setLoading(false);
          return;
        }

        setLoading(false);
      };

      checkAuth();
    }, []);

    if (loading) return null;

    return <WrappedComponent {...props} />;
  };
}
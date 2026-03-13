import { Redirect, router, Stack, usePathname } from "expo-router";
import React from "react";


import { useAuth } from "@/context/auth-context";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';

export default function TabLayout() {
    const { auth, loading } = useAuth();

    const hideRoutes = ["/call", "/profile-update"];
    const shouldHideTab = hideRoutes.some(route =>
        pathname === route
    );

    if (loading) {
        return <></>
    }
    if (!auth?.token) {
        return <Redirect href="/auth" />;
    }


    const isNewUser =
        new Date(auth?.user.createdAt).getTime() ===
        new Date(auth?.user.updatedAt).getTime();
    if (isNewUser) {
        return <Redirect href={"/profile-update"} />
    }

    const pathname = usePathname();

    return (
        <>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                {/* <Stack.Screen name="call" options={{ presentation: 'modal', title: 'Modal' }} /> */}
            </Stack>

            {!shouldHideTab && (
                <View style={styles.bottomTab}>
                    <TabItem
                        icon={<Ionicons
                            name={"chatbubble-outline"}
                            size={25}
                            color={pathname === "/" ? "#0f3d33" : "#888"}
                        />}
                        label="Message"
                        navigateTo="/"
                        isActive={pathname === "/"}
                    />
                    <TabItem icon={<Ionicons
                        name={"call-outline"}
                        size={25}
                        color={pathname === "/calls" ? "#0f3d33" : "#888"}
                    />}
                        label="Calls"
                        navigateTo="/calls"
                        isActive={pathname === "/calls"}
                    />
                    <TabItem
                        icon={
                            <Feather name="users"
                                size={24}
                                color={pathname === "/contacts" ? "#0f3d33" : "#888"}
                            />
                        }
                        label="Users"
                        navigateTo="/contacts"
                        isActive={pathname === "/contacts"}
                    />
                    <TabItem
                        icon={<Ionicons
                            name={"settings-outline"}
                            size={25}
                            color={pathname === "/settings" ? "#0f3d33" : "#888"}
                        />}
                        label="Settings"
                        navigateTo="/settings"
                        isActive={pathname === "/settings"}
                    />
                </View>
            )}
        </>
    );
}

const TabItem = ({
    icon,
    label,
    navigateTo,
    isActive,
}: {
    icon: any;
    label: string;
    navigateTo: string;
    isActive?: boolean;
}) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.push(navigateTo as any)}>
            <View style={{ alignItems: "center", height: 45, }}>
                {/* <Ionicons
                    name={icon}
                    size={size}
                    color={isActive ? "#0f3d33" : "#888"}
                /> */}
                {icon}
                <Text
                    style={{
                        fontSize: 12,
                        color: isActive ? "#0f3d33" : "#888",
                    }}
                >
                    {label}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    bottomTab: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 12,
        backgroundColor: "white",
        borderTopColor: "#F0F0F0",
        borderTopWidth: 1,
    },
});
import { Redirect, router, Stack, Tabs, usePathname } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

import { useAuth } from "@/context/auth-context";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const { auth, loading } = useAuth();

  const hideRoutes = ["/chat", "/chat/[id]", "/auth", "/profile-update", "/verify-otp"];
  const shouldHideTab = hideRoutes.some(route =>
    pathname.startsWith(route.replace("[id]", ""))
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

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
      </Stack>

      {!shouldHideTab && (
        <View style={styles.bottomTab}>
          <TabItem icon="chatbubble-outline" label="Message" navigateTo="/" />
          <TabItem icon="call-outline" label="Calls" navigateTo="/calls" />
          <TabItem icon="list-outline" label="Contacts" navigateTo="/contacts" size={25} />
          <TabItem icon="settings-outline" label="Settings" navigateTo="/settings" size={25} />
        </View>
      )}
    </>
  );
}

const TabItem = ({
  icon,
  label,
  navigateTo,
  size = 22,
}: {
  icon: any;
  label: string;
  navigateTo: string;
  size?: number;
}) => {
  const pathname = usePathname();
  const isActive = pathname === navigateTo;

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => router.navigate(navigateTo as any)}>
      <View style={{ alignItems: "center", height: 45 }}>
        <Ionicons
          name={icon}
          size={size}
          color={isActive ? "#0f3d33" : "#888"}
        />
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
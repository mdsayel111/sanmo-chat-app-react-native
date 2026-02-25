import { Tabs, usePathname } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();

  const hideRoutes = ["/chat", "/chat/[id]", "/auth"];
  const shouldHideTab = hideRoutes.some(route =>
    pathname.startsWith(route.replace("[id]", ""))
  );

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: { display: "none" }
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="calls"
          options={{
            title: "Calls",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="paperplane.fill" color={color} />
            ),
          }}
        />
      </Tabs>

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
    <TouchableOpacity activeOpacity={0.7}>
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
  },
});
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ListRenderItem,
} from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";

type CallType = "incoming" | "outgoing" | "missed";

interface CallItem {
  id: string;
  name: string;
  time: string;
  type: CallType;
}

const initialCalls: CallItem[] = [
  {
    id: "1",
    name: "Anamul",
    time: "February 20, 4:23 PM",
    type: "incoming",
  },
  {
    id: "2",
    name: "Mamun Vai Sanmo",
    time: "February 20, 4:11 PM",
    type: "outgoing",
  },
  {
    id: "3",
    name: "Saidul Gazi Borishal",
    time: "February 19, 10:50 AM",
    type: "missed",
  },
];

const CallsScreen: React.FC = () => {
  const [calls, setCalls] = useState<CallItem[]>(initialCalls);

  const addFakeCall = () => {
    const newCall: CallItem = {
      id: Date.now().toString(),
      name: "New Contact",
      time: new Date().toLocaleString(),
      type: "outgoing",
    };

    setCalls((prev) => [newCall, ...prev]);
  };

  const renderItem: ListRenderItem<CallItem> = ({ item }) => {
    const iconColor =
      item.type === "missed" ? "#ff4d4d" : "#25D366";

    const iconName =
      item.type === "incoming"
        ? "call-received"
        : item.type === "outgoing"
        ? "call-made"
        : "call-received";

    return (
      <TouchableOpacity style={styles.callItem}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.name.charAt(0)}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.name,
              item.type === "missed" && { color: "#ff4d4d" },
            ]}
          >
            {item.name}
          </Text>

          <View style={styles.row}>
            <MaterialIcons
              name={iconName}
              size={16}
              color={iconColor}
            />
            <Text style={styles.time}> {item.time}</Text>
          </View>
        </View>

        <Ionicons name="call-outline" size={22} color="#ccc" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Calls</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="search" size={22} color="#fff" />
          <Feather name="more-vertical" size={22} color="#fff" />
        </View>
      </View>

      {/* Top Actions */}
      <View style={styles.actionsContainer}>
        {[
          { icon: "call-outline", label: "Call" },
          { icon: "calendar-outline", label: "Schedule" },
          { icon: "keypad-outline", label: "Keypad" },
          { icon: "heart-outline", label: "Favorites" },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.actionItem}>
            <View style={styles.actionCircle}>
              <Ionicons name={item.icon as any} size={24} color="#fff" />
            </View>
            <Text style={styles.actionText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.recentTitle}>Recent</Text>

      <FlatList
        data={calls}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={addFakeCall}>
        <Ionicons name="call" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default CallsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b141a",
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 20,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 25,
  },
  actionItem: {
    alignItems: "center",
  },
  actionCircle: {
    backgroundColor: "#1f2c34",
    width: 65,
    height: 65,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    color: "#ccc",
    marginTop: 8,
    fontSize: 13,
  },
  recentTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  callItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2a3942",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontSize: 18,
  },
  name: {
    color: "#fff",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  time: {
    color: "#aaa",
    fontSize: 13,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#25D366",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
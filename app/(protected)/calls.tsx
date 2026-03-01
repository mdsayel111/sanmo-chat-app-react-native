import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

interface CallItem {
  id: string;
  name: string;
  avatar: string;
  time: string;
  type: "incoming" | "missed" | "outgoing";
}

const DATA: CallItem[] = [
  {
    id: "1",
    name: "Team Align",
    avatar: "https://i.pravatar.cc/150?img=1",
    time: "Today, 09:30 AM",
    type: "incoming",
  },
  {
    id: "2",
    name: "Jhon Abraham",
    avatar: "https://i.pravatar.cc/150?img=2",
    time: "Today, 07:30 AM",
    type: "incoming",
  },
  {
    id: "3",
    name: "Sabila Sayma",
    avatar: "https://i.pravatar.cc/150?img=3",
    time: "Yesterday, 07:35 PM",
    type: "missed",
  },
  {
    id: "4",
    name: "Alex Linderson",
    avatar: "https://i.pravatar.cc/150?img=4",
    time: "Monday, 09:30 AM",
    type: "outgoing",
  },
  {
    id: "5",
    name: "John Borino",
    avatar: "https://i.pravatar.cc/150?img=5",
    time: "Monday, 09:30 AM",
    type: "incoming",
  },
];

const CallsScreen = () => {
  const renderItem = ({ item }: { item: CallItem }) => {
    const color =
      item.type === "missed"
        ? "#FF4D4F"
        : item.type === "incoming"
        ? "#1BA784"
        : "#6C63FF";

    const icon =
      item.type === "incoming"
        ? "phone-incoming"
        : item.type === "missed"
        ? "phone-missed"
        : "phone-outgoing";

    return (
      <View style={styles.row}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>

          <View style={styles.subtitleRow}>
            <Feather name={icon as any} size={14} color={color} />
            <Text style={styles.time}>{item.time}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Feather name="phone" size={20} color="#9AA0A6" />
          <Feather name="video" size={20} color="#9AA0A6" />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.circleBtn}>
          <Feather name="search" size={20} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Calls</Text>

        <TouchableOpacity style={styles.circleBtn}>
          <Ionicons name="call-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Sheet */}
      <View style={styles.sheet}>
        <View style={styles.dragIndicator} />
        <Text style={styles.sectionTitle}>Recent</Text>

        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </View>
  );
};

export default CallsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f3d33",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },

  circleBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "#ffffff40",
    justifyContent: "center",
    alignItems: "center",
  },

  sheet: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  dragIndicator: {
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E0E0E0",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
  },

  subtitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 6,
  },

  time: {
    fontSize: 13,
    color: "#888",
    marginLeft: 6,
  },

  actions: {
    flexDirection: "row",
    gap: 16,
  },

  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
  },
});
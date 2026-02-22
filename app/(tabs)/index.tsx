import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SwipeableItem from "react-native-swipeable-item";

interface Chat {
  id: string;
  name: string;
  message: string;
  time: string;
  unread?: number;
  avatar: string;
  online?: boolean;
}

const chats: Chat[] = [
  {
    id: "1",
    name: "Alex Linderson",
    message: "How are you today?",
    time: "2 min ago",
    unread: 3,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    online: true,
  },
  {
    id: "2",
    name: "Team Align",
    message: "Don’t miss to attend the meeting.",
    time: "2 min ago",
    unread: 4,
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    online: true,
  },
  {
    id: "3",
    name: "John Ahrham",
    message: "Hey! Can you join the meeting?",
    time: "2 min ago",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    id: "4",
    name: "Sabila Sayma",
    message: "How are you today?",
    time: "2 min ago",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "5",
    name: "John Borino",
    message: "Have a good day 🌸",
    time: "2 min ago",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    online: true,
  },
];

export default function HomeScreen() {
  const renderRightActions = () => {
    return (
      <View style={styles.rightActions}>
        <TouchableOpacity style={styles.bellButton}>
          <Ionicons name="notifications-outline" size={20} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton}>
          <Feather name="trash-2" size={20} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item }: { item: Chat }) => {
    return (
      <SwipeableItem
        item={item}
        renderUnderlayRight={renderRightActions}
        snapPointsRight={[120]}
        overSwipe={0}
      >
        <View style={styles.chatItem}>
          <View>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            {item.online && <View style={styles.onlineDot} />}
          </View>

          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.message} numberOfLines={1}>
              {item.message}
            </Text>
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.time}>{item.time}</Text>
            {item.unread && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{item.unread}</Text>
              </View>
            )}
          </View>
        </View>
      </SwipeableItem>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Feather name="search" size={22} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Home</Text>

        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/men/11.jpg",
          }}
          style={styles.profile}
        />
      </View>

      {/* Stories */}
      <View style={styles.storyContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.storyItem}>
              <Image source={{ uri: item.avatar }} style={styles.storyAvatar} />
              <Text style={styles.storyName}>
                {item.name.split(" ")[0]}
              </Text>
            </View>
          )}
        />
      </View>

      {/* Chat List */}
      <View style={styles.chatContainer}>
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}



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
    paddingVertical: 15,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  profile: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  storyContainer: {
    paddingLeft: 15,
    paddingVertical: 10,
  },
  storyItem: {
    alignItems: "center",
    marginRight: 18,
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  storyName: {
    color: "white",
    fontSize: 12,
    marginTop: 6,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
  },
  onlineDot: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 12,
    height: 12,
    backgroundColor: "#00C851",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "white",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  message: {
    color: "#777",
    marginTop: 4,
  },
  time: {
    fontSize: 12,
    color: "#999",
  },
  unreadBadge: {
    backgroundColor: "#FF3B30",
    borderRadius: 11,
    height: 22,
    width: 22,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
  },
  unreadText: {
    color: "white",
    fontSize: 12,
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },
  bellButton: {
    backgroundColor: "#0f3d33",
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
});
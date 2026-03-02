import DraggableModal from "@/components/shared/draggable-modal";
import NoData from "@/components/shared/no-data";
import PrimaryWrapper from "@/components/shared/primary-wrapper";
import TextInput from "@/components/ui/text-input";
import { BASE_URL } from "@/config";
import { useAuth } from "@/context/auth-context";
import { withAuth } from "@/HOF/auth-provider";
import { useAuthAxios } from "@/hooks/use-auth-axios";
import globalStyles from "@/styles";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SwipeableItem from "react-native-swipeable-item";
import SearchModal from "@/components/home/search-modal";

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

function HomeScreen() {
  const { auth } = useAuth();
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [chats, setChats] = useState([]);
  const axios = useAuthAxios();
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
        renderUnderlayLeft={renderRightActions}
        snapPointsLeft={[100]}
        overSwipe={30}
      >
        <Pressable
          onPress={() => {
            router.push(`/chat?id=${item.id}`);
          }}
          style={styles.chatItem}
        >
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
        </Pressable>
      </SwipeableItem>
    );
  };

  useEffect(() => {
    const fetchChats = async () => {
      const res = await axios.get("/chats");
      setChats(res.data.data);
    };
    fetchChats();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSearchModalVisible(true)}>
          <Feather name="search" size={26} color="white" />
        </TouchableOpacity>

        <Text style={globalStyles.pageHeader}>Home</Text>

        <Pressable onPress={() => router.navigate("/my-profile")}>
          <Image
            source={{
              uri: BASE_URL as string + auth?.user?.image,
            }}
            style={styles.profile}
          />
        </Pressable>
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
      <PrimaryWrapper>
        {
          chats.length > 0 ? (
            <FlatList
              data={chats}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <NoData containerStyles={{ flex: 1 }} />
          )
        }
      </PrimaryWrapper>
      <SearchModal chats={chats} setSearchModalVisible={setSearchModalVisible} searchModalVisible={searchModalVisible} renderItem={renderItem} />
    </SafeAreaView>
  );
}

export default withAuth(HomeScreen);



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
    paddingBottom: 20,
  },
  profile: {
    width: 43,
    height: 43,
    borderRadius: 20,
  },
  storyContainer: {
    paddingLeft: 15,
    paddingVertical: 30,
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
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 15,
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
    justifyContent: "flex-end",
    height: "100%",
    gap: 5,
    paddingHorizontal: 10,
  },
  bellButton: {
    backgroundColor: "#0f3d33",
    width: 40,
    height: 40,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    width: 40,
    height: 40,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
  },
});


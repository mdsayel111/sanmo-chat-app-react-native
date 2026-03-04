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
import { formatRelativeTime } from "@/utils/date";
import { TMessage } from "@/types/message-type";
import { useSocket } from "@/context/socket-context";

type TMember = {
  _id: string;
  name: string;
  image: string;
}

interface TChat {
  _id: string;
  name: string;
  message: string;
  time: string;
  unread?: number;
  image: string;
  online?: boolean;
  lastMessage: TMessage;
  type: string;
  members: TMember[];
}

function HomeScreen() {
  const { auth } = useAuth();
  const { socket } = useSocket();
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [chats, setChats] = useState<TChat[]>([]);
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

  const renderItem = ({ item }: { item: TChat }) => {
    return (
      <SwipeableItem
        item={item}
        renderUnderlayLeft={renderRightActions}
        snapPointsLeft={[100]}
        overSwipe={30}
      >
        <Pressable
          onPress={() => {
            router.push({
              pathname: "/(protected)/chat/[type]/[id]",
              params: {
                type: item.type,
                id: item._id,
              },
            });
          }}
          style={styles.chatItem}
        >
          <View>
            <Image source={{ uri: BASE_URL + item.image }} style={styles.avatar} />
            {item.online && <View style={styles.onlineDot} />}
          </View>

          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4, gap: 6 }}>
              <Text style={styles.message} numberOfLines={1}>
                {item?.lastMessage?.text || "No messages yet"}
              </Text>
              <Text style={styles.time}>{formatRelativeTime(item?.lastMessage?.createdAt)}</Text>
            </View>
          </View>

          <View style={{ alignItems: "flex-end" }}>
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
      const res = await axios.get("/chat");
      setChats(res.data.data);
    };
    fetchChats();
  }, []);

  // socket events listener
  useEffect(() => {
    if (!socket) return;

    socket.on("chat:receive", (chat: TChat) => {
      setChats(prev => [formatChats([chat])[0], ...prev]);
    });

    socket.on("message:receive", (message: TMessage) => {
      setChats(prev => {
        const chat = prev.find(item => item._id === message.chat);
        if (!chat) return prev;
        chat.lastMessage = message;
        return [...prev];
      });
    });

    return () => {
      socket.off("chat:receive");
    };
  }, [socket]);

  const formatChats = (chats: TChat[]) => {
    return chats.map((item: TChat) => {
      if (item.type === "private") {
        const otherUser = item?.members.find((member: TMember) => member._id !== auth?.user?._id) as TMember;
        item.image = otherUser.image;
        item.name = otherUser.name;
      }

      return item;
    });
  };

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
          keyExtractor={(item: TChat) => item._id}
          renderItem={({ item }) => (
            <View style={styles.storyItem}>
              <Image source={{ uri: item.image }} style={styles.storyAvatar} />
              <Text style={styles.storyName}>
                {item.name}
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
              data={formatChats(chats)}
              keyExtractor={(item) => item._id}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 20, gap: 10 }}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <NoData containerStyles={{ flex: 1 }} text="No chat found" />
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
    width: 40,
    height: 40,
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
    fontSize: 16,
  },
  time: {
    fontSize: 13,
    color: "green",
  },
  sender: {
    fontSize: 16,
    color: "green",
    marginRight: 4,
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


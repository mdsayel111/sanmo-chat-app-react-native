import ChatRenderItem from "@/components/home/chat-render-item/chat-render-item";
import SearchModal from "@/components/home/search-modal";
import Header from "@/components/shared/header/header";
import NoData from "@/components/shared/no-data";
import PrimaryWrapper from "@/components/shared/primary-wrapper";
import { COLORS } from "@/constants/style";
import { useAuth } from "@/context/auth-context";
import { useSocket } from "@/context/socket-context";
import { withAuth } from "@/HOF/auth-provider";
import { useAuthAxios } from "@/hooks/use-auth-axios";
import { TChat } from "@/types/chat-type";
import { TMessage } from "@/types/message-type";
import { TUser } from "@/types/user-type";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";


function HomeScreen() {
  const { auth } = useAuth();
  const { socket } = useSocket();
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [chats, setChats] = useState<TChat[]>([]);
  const axios = useAuthAxios();

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
        const otherUser = item?.members.find((member: TUser) => member._id !== auth?.user?._id) as TUser;
        item.image = otherUser.image;
        item.name = otherUser.name;
      }

      return item;
    });
  };

  return (
    <View style={styles.container}>
      <Header
        title="Home"
        leftButton={<TouchableOpacity
          onPress={() => setSearchModalVisible(true)}
        >
          <Feather name="search" size={26} color="white" />
        </TouchableOpacity>}
      />

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
              renderItem={({ item }) => <ChatRenderItem item={item} />}
              contentContainerStyle={{ paddingBottom: 20, gap: 10 }}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <NoData containerStyles={{ flex: 1 }} text="No chat found" />
          )
        }
      </PrimaryWrapper>
      <SearchModal chats={chats} setSearchModalVisible={setSearchModalVisible} searchModalVisible={searchModalVisible} renderItem={ChatRenderItem} />
    </View>
  );
}

export default withAuth(HomeScreen);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "flex-start"
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
});


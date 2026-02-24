import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type MessageType = "incoming" | "outgoing" | "voice" | "images";

interface Message {
  id: string;
  type: MessageType;
  text?: string;
}

const messages: Message[] = [
  { id: "1", type: "incoming", text: "Hello ! Nazrul How are you?" },
  { id: "2", type: "outgoing", text: "You did your job well!" },
  { id: "3", type: "incoming", text: "Have a great working week!!" },
  { id: "4", type: "incoming", text: "Hope you like it" },
  { id: "5", type: "voice" },
  { id: "6", type: "incoming", text: "Look at my work man!!" },
  { id: "7", type: "images" },
];

const ChatScreen: React.FC = () => {
  const renderItem: ListRenderItem<Message> = ({ item }) => {
    if (item.type === "voice") {
      return (
        <View style={styles.voiceContainer}>
          <View style={styles.playBtn}>
            <Feather name="play" size={16} color="#fff" />
          </View>
          <View style={styles.wave} />
          <Text style={styles.voiceTime}>00:16</Text>
        </View>
      );
    }

    if (item.type === "images") {
      return (
        <View style={styles.imageRow}>
          <Image
            source={{ uri: "https://picsum.photos/200/200" }}
            style={styles.previewImage}
          />
          <Image
            source={{ uri: "https://picsum.photos/201/200" }}
            style={styles.previewImage}
          />
        </View>
      );
    }

    const isOutgoing = item.type === "outgoing";

    return (
      <View
        style={[
          styles.messageBubble,
          isOutgoing ? styles.outgoing : styles.incoming,
        ]}
      >
        <Text style={isOutgoing ? styles.outgoingText : styles.incomingText}>
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} />
        </Pressable>
        <Image
          source={{ uri: "https://i.pravatar.cc/100" }}
          style={styles.avatar}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>Jhon Abraham</Text>
          <Text style={styles.status}>Active now</Text>
        </View>
        <Feather name="phone" size={20} style={styles.headerIcon} />
        <Feather name="video" size={20} />
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
      />

      {/* Input */}
      <View style={styles.inputBar}>
        <Feather name="paperclip" size={20} color="#777" />
        <TextInput placeholder="Write your message" style={styles.input} />
        <Feather name="camera" size={20} color="#777" />
        <TouchableOpacity style={styles.sendBtn}>
          <View style={{ transform: [{ translateX: -0.7 }, { translateY: 0.5 }] }}>
            <Feather name="send" size={18} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },

  name: { fontSize: 16, fontWeight: "600" },
  status: { fontSize: 12, color: "#4CAF50" },
  headerIcon: { marginRight: 15 },

  messageBubble: {
    padding: 12,
    borderRadius: 14,
    marginVertical: 6,
    maxWidth: "75%",
  },

  incoming: {
    backgroundColor: "#F1F3F5",
    alignSelf: "flex-start",
  },

  outgoing: {
    backgroundColor: "#1BA784",
    alignSelf: "flex-end",
  },

  incomingText: { color: "#000" },
  outgoingText: { color: "#fff" },

  voiceContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1BA784",
    padding: 10,
    borderRadius: 14,
    alignSelf: "flex-end",
    marginVertical: 6,
  },

  playBtn: {
    backgroundColor: "#ffffff33",
    padding: 6,
    borderRadius: 20,
    marginRight: 8,
  },

  wave: {
    width: 120,
    height: 4,
    backgroundColor: "#fff",
    borderRadius: 2,
    marginRight: 8,
  },

  voiceTime: { color: "#fff", fontSize: 12 },

  imageRow: {
    flexDirection: "row",
    marginVertical: 6,
  },

  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginRight: 8,
  },

  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  input: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#F1F3F5",
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 40,
  },

  sendBtn: {
    backgroundColor: "#1BA784",
    padding: 8,
    borderRadius: 20,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
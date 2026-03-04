import NoData from "@/components/shared/no-data";
import BackButton from "@/components/ui/back-button";
import { BASE_URL } from "@/config";
import { useAuth } from "@/context/auth-context";
import { useSocket } from "@/context/socket-context";
import { useAuthAxios } from "@/hooks/use-auth-axios";
import { TMessage } from "@/types/message-type";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
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

type TChatInfo = {
    _id: string;
    name: string;
    image: string;
}
const ChatScreen: React.FC = () => {
    const [messages, setMessages] = useState<TMessage[]>([]);
    const [chatInfo, setChatInfo] = useState<TChatInfo>({} as TChatInfo);
    const { auth } = useAuth();
    const params = useLocalSearchParams();
    const [inputText, setInputText] = useState("");
    const axios = useAuthAxios();
    const { socket } = useSocket();

    const [id, setId] = useState(params.id);
    const [type, setType] = useState(params.type);

    const renderItem: ListRenderItem<TMessage> = ({ item }) => {
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

        const isOutgoing = item.sender === auth?.user?._id;

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


    const handleSend = async (text: string) => {
        if (params.type === "user") {
            try {
                const res = await axios.post("/message/" + params.type + "/" + id, {
                    text,
                    sender: auth?.user?._id,
                    type: "text",
                });
                setMessages(prev => [...prev, res?.data?.data?.message as TMessage]);
                setInputText("");
                setId(res?.data?.data?.chat?._id);
                setType(res?.data?.data?.chat?.type);
            } catch (error: any) {
                console.log(error.response?.data?.message);
            }
        };
    };

    useEffect(() => {
        const fetchMessages = async () => {
            const res = await axios.get("/message/" + type + "/" + id);
            setMessages(res?.data?.data?.messages);
            setChatInfo(res?.data?.data?.chat as TChatInfo);
        };
        fetchMessages();
    }, []);


    // socket events listener
    useEffect(() => {
        if (!socket) return;
        socket.on(`message:receive:${id}`, (message: TMessage) => {
            setMessages(prev => {
                return [...prev, message];
            });
        });
        return () => {
            socket.off("message:receive");
        };
    }, [socket, id]);


    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <BackButton onPress={() => router.back()} />
                <Image
                    source={{ uri: BASE_URL + chatInfo?.image }}
                    style={styles.avatar}
                />
                <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{chatInfo?.name}</Text>
                    <Text style={styles.status}>Active now</Text>
                </View>
                <Feather name="phone" size={20} style={styles.headerIcon} onPress={() => router.navigate("/call")} />
                <Feather name="video" size={20} style={[styles.headerIcon, { marginRight: 10 }]} />
            </View>

            {/* Messages */}
            {
                messages.length > 0 ? (
                    <FlatList
                        data={messages}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id}
                        contentContainerStyle={{ padding: 16 }}
                    />
                ) : (
                    <NoData containerStyles={{ flex: 1 }} text="No messages found!" />
                )
            }

            {/* Input */}
            <View style={styles.inputBar}>
                <Feather name="paperclip" size={20} color="#777" />
                <TextInput placeholder="Write your message" style={styles.input} onChangeText={setInputText} value={inputText} />
                <Feather name="camera" size={20} color="#777" />
                <TouchableOpacity style={styles.sendBtn}
                    onPress={() => handleSend(inputText)}
                >
                    <View style={{ transform: [{ translateX: -0.7 }, { translateY: 0.5 }] }}>
                        <Feather name="send" size={18} color="#fff" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "white", },

    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderBottomWidth: 1,
        borderColor: "#eee",
        backgroundColor: "#0f3d33",
        paddingTop: 10,
        paddingBottom: 17,
    },

    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
        marginLeft: 13
    },

    name: { fontSize: 16, fontWeight: "600", color: "white" },
    status: { fontSize: 12, color: "#4CAF50" },
    headerIcon: { marginRight: 15, color: "white" },

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
        backgroundColor: "#0f3d33",
        alignSelf: "flex-end",
    },

    incomingText: { color: "#000" },
    outgoingText: { color: "#fff" },

    voiceContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0f3d33",
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
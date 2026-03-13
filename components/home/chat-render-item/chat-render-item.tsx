import Avatar from "@/components/shared/avatar";
import { BASE_URL } from "@/config";
import { TChat } from "@/types/chat-type";
import { formatRelativeTime } from "@/utils/date";
import { router } from "expo-router";
import React from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";
import SwipeableItem from "react-native-swipeable-item";
import ChatRenderRightActions from "./components/chat-render-item-action";

const ChatRenderItem = ({ item }: { item: TChat }) => {
    return (
        <SwipeableItem
            item={item}
            renderUnderlayLeft={ChatRenderRightActions}
            snapPointsLeft={[100]}
            overSwipe={30}
        >
            <Pressable
                onPress={() => {
                    router.push({
                        pathname: "/chat/[type]/[id]",
                        params: {
                            type: item.type,
                            id: item._id,
                        },
                    });
                }}
                style={styles.chatItem}
            >
                <Avatar uri={BASE_URL + item.image} />

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

export default ChatRenderItem;

const styles = StyleSheet.create({
    chatItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f3f3f3",
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 15,
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
})
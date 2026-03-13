import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { CallItem } from '@/types/call-type';

export default function CallRenderItem({ item }: { item: CallItem }) {
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
}

const styles = StyleSheet.create({
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
});
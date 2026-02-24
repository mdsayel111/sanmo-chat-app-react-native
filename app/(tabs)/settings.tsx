import { Feather, Ionicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import React from "react";
import {
    Image,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface SettingItemProps {
    icon: keyof typeof Feather.glyphMap;
    title: string;
    subtitle: string;
    href?: Href;
}

const SettingItem = ({ icon, title, subtitle, href }: SettingItemProps) => (

    <TouchableOpacity style={styles.item} onPress={() => href && router.push(href)}>
        <View style={styles.iconCircle}>
            <Feather name={icon} size={18} color="#6B7280" />
        </View>

        <View style={{ flex: 1 }}>
            <Text style={styles.itemTitle}>{title}</Text>
            <Text style={styles.itemSubtitle}>{subtitle}</Text>
        </View>
    </TouchableOpacity>
);

const SettingsScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <Feather name="arrow-left" size={22} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.title}>Settings</Text>

                <View style={{ width: 22 }} />
            </View>

            {/* Sheet */}
            <View style={styles.sheet}>
                <View style={styles.dragIndicator} />

                {/* Profile */}
                <View style={styles.profileRow}>
                    <Image
                        source={{ uri: "https://i.pravatar.cc/150?img=8" }}
                        style={styles.avatar}
                    />

                    <View style={{ flex: 1 }}>
                        <Text style={styles.name}>Nazrul Islam</Text>
                        <Text style={styles.subtitle}>Never give up 💪</Text>
                    </View>

                    <Ionicons name="qr-code-outline" size={22} color="#1BA784" />
                </View>

                <View style={styles.separator} />

                {/* Settings Items */}
                <SettingItem
                    icon="key"
                    title="Account"
                    subtitle="Privacy, security, change number"
                    href={"/user-profile"}
                />

                <SettingItem
                    icon="message-circle"
                    title="Chat"
                    subtitle="Chat history, theme, wallpapers"
                />

                <SettingItem
                    icon="bell"
                    title="Notifications"
                    subtitle="Messages, group and others"
                />

                <SettingItem
                    icon="help-circle"
                    title="Help"
                    subtitle="Help center, contact us, privacy policy"
                />

                <SettingItem
                    icon="arrow-down"
                    title="Storage and data"
                    subtitle="Network usage, storage usage"
                />

                <SettingItem
                    icon="user-plus"
                    title="Invite a friend"
                    subtitle=""
                />
            </View>
        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#062E26",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
    },

    title: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "600",
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

    profileRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
    },

    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        marginRight: 12,
    },

    name: {
        fontSize: 18,
        fontWeight: "600",
    },

    subtitle: {
        fontSize: 13,
        color: "#888",
        marginTop: 2,
    },

    separator: {
        height: 1,
        backgroundColor: "#F0F0F0",
        marginVertical: 10,
    },

    item: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
    },

    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#F3F4F6",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    itemTitle: {
        fontSize: 16,
        fontWeight: "600",
    },

    itemSubtitle: {
        fontSize: 13,
        color: "#888",
        marginTop: 2,
    },
});
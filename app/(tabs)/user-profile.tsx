import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    StatusBar,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import DraggableSheet from "@/components/shared/dragable-sheet";

const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <View style={{ marginBottom: 18 }}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
);

const ActionBtn = ({
    icon,
}: {
    icon: keyof typeof Feather.glyphMap;
}) => (
    <TouchableOpacity style={styles.actionBtn}>
        <Feather name={icon} size={20} color="#fff" />
    </TouchableOpacity>
);

export default function UserProfileScreen() {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <Feather name="arrow-left" size={22} color="#fff" />
                </TouchableOpacity>

                <View style={{ width: 22 }} />
            </View>

            {/* Avatar */}
            <Image
                source={{ uri: "https://i.pravatar.cc/150?img=5" }}
                style={styles.avatar}
            />

            <Text style={styles.name}>Jhon Abraham</Text>
            <Text style={styles.username}>@jhonabraham</Text>

            {/* Actions */}
            <View style={styles.actionsRow}>
                <ActionBtn icon="message-circle" />
                <ActionBtn icon="video" />
                <ActionBtn icon="phone" />
                <ActionBtn icon="more-horizontal" />
            </View>
            
            <DraggableSheet>
                <InfoRow label="Display Name" value="Jhon Abraham" />
                <InfoRow
                    label="Email Address"
                    value="jhonabraham20@gmail.com"
                />
                <InfoRow
                    label="Address"
                    value="33 street west subidbazar, sylhet"
                />
                <InfoRow label="Phone Number" value="(320) 555-0104" />

                {/* Media Shared */}
                <View style={styles.mediaHeader}>
                    <Text style={styles.label}>Media Shared</Text>
                    <Text style={styles.viewAll}>View All</Text>
                </View>

                <View style={styles.mediaRow}>
                    <Image
                        source={{ uri: "https://picsum.photos/200/200?1" }}
                        style={styles.media}
                    />
                    <Image
                        source={{ uri: "https://picsum.photos/200/200?2" }}
                        style={styles.media}
                    />
                    <View style={styles.mediaOverlay}>
                        <Image
                            source={{ uri: "https://picsum.photos/200/200?3" }}
                            style={styles.media}
                        />
                        <View style={styles.overlay}>
                            <Text style={styles.overlayText}>255+</Text>
                        </View>
                    </View>
                </View>
            </DraggableSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#062E26",
        alignItems: "center",
    },

    header: {
        width: "100%",
        paddingTop: 60,
        paddingHorizontal: 20,
    },

    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        marginTop: 20,
    },

    name: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "600",
        marginTop: 12,
    },

    username: {
        color: "#C7D2D9",
        fontSize: 14,
        marginTop: 2,
    },

    actionsRow: {
        flexDirection: "row",
        gap: 18,
        marginTop: 20,
        marginBottom: 20,
    },

    actionBtn: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#0F4D43",
        justifyContent: "center",
        alignItems: "center",
    },

    sheet: {
        flex: 1,
        width: "100%",
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 18,
        paddingTop: 14,
    },

    dragIndicator: {
        alignSelf: "center",
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: "#E0E0E0",
        marginBottom: 16,
    },

    label: {
        fontSize: 13,
        color: "#888",
    },

    value: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 4,
    },

    mediaHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
    },

    viewAll: {
        color: "#1BA784",
        fontWeight: "600",
    },

    mediaRow: {
        flexDirection: "row",
        gap: 10,
    },

    media: {
        width: 100,
        height: 100,
        borderRadius: 16,
    },

    mediaOverlay: {
        position: "relative",
    },

    overlay: {
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 16,
        backgroundColor: "#0008",
        justifyContent: "center",
        alignItems: "center",
    },

    overlayText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
});
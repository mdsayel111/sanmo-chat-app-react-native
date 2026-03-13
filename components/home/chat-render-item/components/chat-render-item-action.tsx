import { COLORS } from "@/constants/style";
import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";


const ChatRenderRightActions = () => {
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
export default ChatRenderRightActions;

const styles = StyleSheet.create({
    rightActions: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        height: "100%",
        gap: 5,
        paddingHorizontal: 10,
    },
    bellButton: {
        backgroundColor: COLORS.primary,
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
});
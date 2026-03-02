import React, { ReactNode } from "react";
import {
    StyleSheet,
    View
} from "react-native";

interface DraggableSheetProps {
    children: ReactNode;
    closeThreshold?: number;
    onClose?: () => void;
}

export default function PrimaryWrapper({
    children
}: DraggableSheetProps) {

    return (
        <View style={styles.sheet}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    sheet: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width: "100%",
        paddingHorizontal: 16,
        paddingTop: 10,
        overflow: "hidden",
    },
});
import { router } from "expo-router";
import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from "react-native";

export default function Auth() {
    const [phone, setPhone] = useState("");

    const sendOtp = async () => {
        if (phone.length < 10) {
            Alert.alert("Invalid number");
            return;
        }

        // 🔥 Mock API call
        await new Promise((r) => setTimeout(r, 800));

        router.push({
            pathname: "/verify-otp",
            params: { phone },
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Enter your phone number</Text>

            <TextInput
                placeholder="Phone number"
                keyboardType="phone-pad"
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
            />

            <TouchableOpacity style={styles.button} onPress={sendOtp}>
                <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, justifyContent: "center" },
    title: { fontSize: 28, fontWeight: "700", marginBottom: 8 },
    subtitle: { color: "#666", marginBottom: 20 },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#0f3d33",
        padding: 16,
        borderRadius: 12,
        marginTop: 20,
    },
    buttonText: { color: "white", textAlign: "center", fontWeight: "600" },
});
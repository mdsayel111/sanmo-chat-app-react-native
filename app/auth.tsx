import Button from "@/components/ui/button";
import { useAuthAxios } from "@/hooks/use-auth-axios";
import globalStyles from "@/styles";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Auth() {
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const axios = useAuthAxios();

    const sendOtp = async () => {
        if (!phone || phone.length !== 11) {
            Alert.alert("Invalid phone number");
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post("/auth/get-otp", {
                phone,
            });
            console.log(res.data)
            router.push({
                pathname: "/verify-otp",
                params: { phone },
            });
        } catch (error: any) {
            Alert.alert(error.response?.data?.message);
        }
        setLoading(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Login Account</Text>
            <Text style={styles.subtitle}>Enter your phone number</Text>

            <TextInput
                placeholder="Phone number"
                keyboardType="phone-pad"
                style={styles.input}
                value={phone}
                onChangeText={(text) => {
                    if (text.length <= 11) {
                        setPhone(text);
                    }
                }}
            />
            <Button text="Send OTP" onPress={sendOtp} loading={loading} containerStyles={{ marginTop: 20 }} />
        </SafeAreaView>
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
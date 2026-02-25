import { router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function VerifyOtp() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);

  const inputs = useRef<TextInput[]>([]);

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) inputs.current[index + 1]?.focus();
  };

  const verifyOtp = async () => {
    const code = otp.join("");

    if (code.length !== 4) {
      Alert.alert("Enter full OTP");
      return;
    }

    // 🔥 Mock verification
    await new Promise((r) => setTimeout(r, 800));

    Alert.alert("Success", "Account created 🎉");

    router.replace("/(tabs)");
  };

  const resendOtp = () => {
    setTimer(30);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>Sent to {phone}</Text>

      <View style={styles.otpRow}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => {
              if (el) inputs.current[index] = el;
            }}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={verifyOtp}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={timer > 0}
        onPress={resendOtp}
        style={{ marginTop: 16 }}
      >
        <Text style={{ color: timer > 0 ? "#aaa" : "#0f3d33" }}>
          {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 26, fontWeight: "700" },
  subtitle: { color: "#666" },
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    width: 50,
    height: 50,
    textAlign: "center",
    fontSize: 20,
  },
  button: {
    backgroundColor: "#0f3d33",
    padding: 16,
    borderRadius: 12,
  },
  buttonText: { color: "white", textAlign: "center", fontWeight: "600" },
});
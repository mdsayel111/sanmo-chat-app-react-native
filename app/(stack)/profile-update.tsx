import PrimaryWrapper from "@/components/shared/primary-wrapper";
import Button from "@/components/ui/button";
import ImageInput from "@/components/ui/image-input";
import TextInput from "@/components/ui/text-input";
import { COLORS } from "@/constants/style";
import { useAuth } from "@/context/auth-context";
import { useAuthAxios } from "@/hooks/use-auth-axios";
import globalStyles from "@/styles";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function ProfileUpdateScreen() {
  const [name, setName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [emergencyContactRelation, setEmergencyContactRelation] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [designation, setDesignation] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState<string | ImagePicker.ImagePickerAsset | null>(null);
  const { auth, setAuthContext } = useAuth();
  const [loading, setLoading] = useState(false);

  const axios = useAuthAxios();

  const handleUpdate = async () => {
    if (!image || !name || !emergencyContactPhone || !emergencyContactRelation || !emergencyContactName || !designation || !address) {
      return Alert.alert("Error", "Please fill in all fields.");
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("emergencyContactPhone", emergencyContactPhone);
      formData.append("emergencyContactRelation", emergencyContactRelation);
      formData.append("emergencyContactName", emergencyContactName);
      formData.append("designation", designation);
      formData.append("address", address);
      if (image && typeof image !== "string") {
        formData.append("image", {
          uri: image.uri,
          name: image.fileName || "profile.jpg",
          type: image.mimeType || "image/jpeg",
        } as any); // 👈 required cast
      }
      const res = await axios.put("/user/profile-update", formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

      if (auth) {
        setAuthContext({ token: auth?.token, user: res?.data?.data });
      }

      router.push("/");
    } catch (error: any) {
      Alert.alert("Error", error.response?.data?.message);
    }

    setLoading(false);
  };





  return (
    <View style={styles.container}>
      <PrimaryWrapper>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            {/* image */}
            <ImageInput
              image={image}
              onChange={(image) => setImage(image)}
            />

            <Text style={{
              fontSize: 20,
              fontWeight: "900",
              marginTop: 20,
            }}>Personal Info :</Text>

            <TextInput value={name} onChangeText={(text) => setName(text)} placeholder="Enter your name" label="Name" />
            <TextInput value={designation} onChangeText={(text) => setDesignation(text)} placeholder="Enter your designation" label="Designation" />
            <TextInput value={address} onChangeText={(text) => setAddress(text)} placeholder="Enter your address" label="Address" multiline />

            <Text style={{
              fontSize: 20,
              fontWeight: "900",
              marginTop: 20,
            }}>Emergency Contact :</Text>

            <TextInput value={emergencyContactName} onChangeText={(text) => setEmergencyContactName(text)} placeholder="Enter name" label="Name" />
            <TextInput value={emergencyContactPhone} onChangeText={(text) => {
              if (text.length < 12) {
                setEmergencyContactPhone(text);
              }
            }} placeholder="Enter phone number" keyboardType="phone-pad" label="Phone Number" />
            <TextInput value={emergencyContactRelation} onChangeText={(text) => setEmergencyContactRelation(text)} placeholder="Enter relation" label="Relation" />
          </View>

          <Button

            text="Update Profile" onPress={handleUpdate}
            containerStyles={{ marginVertical: 20 }} loading={loading} disabled={loading} />
        </ScrollView>
      </PrimaryWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
});
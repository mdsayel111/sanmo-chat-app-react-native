import DraggableSheet from "@/components/shared/dragable-sheet";
import Button from "@/components/ui/button";
import ImageInput from "@/components/ui/image-input";
import TextInput from "@/components/ui/text-input";
import { useAuth } from "@/context/auth-context";
import { useAuthAxios } from "@/hooks/use-auth-axios";
import globalStyles from "@/styles";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
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
      {/* Dark Header */}
      <View style={styles.header}>
        <Text style={globalStyles.pageHeader}>Update Profile</Text>
      </View>

      {/* White Card Form */}
      <DraggableSheet>
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
      </DraggableSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f3d33", // dark greenish theme
  },
  header: {
    paddingVertical: 25,
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
  },
  card: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 15,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    marginTop: "auto",
    backgroundColor: "#0f3d33",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
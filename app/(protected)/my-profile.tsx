import DraggableSheet from "@/components/shared/dragable-sheet";
import Button from "@/components/ui/button";
import ImageInput from "@/components/ui/image-input";
import TextInput from "@/components/ui/text-input";
import { IMAGE_BASE_URL } from "@/config";
import { useAuth } from "@/context/auth-context";
import { useAuthAxios } from "@/hooks/use-auth-axios";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function UserProfileUpdateScreen() {
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [address, setAddress] = useState("");
    const [emergencyContact, setEmergencyContact] = useState("");
    const [phone, setPhone] = useState("");
    const [emergencyContactName, setEmergencyContactName] = useState("");
    const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
    const [emergencyContactRelation, setEmergencyContactRelation] = useState("");
    const [image, setImage] = useState<string | ImagePicker.ImagePickerAsset | null>(null);

    const [loading, setLoading] = useState(false);
    const { auth, setAuthContext } = useAuth();

    const axios = useAuthAxios();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get("/user/profile");
                setName(res.data?.data?.name);
                setDesignation(res.data?.data?.designation);
                setAddress(res.data?.data?.address);
                setEmergencyContact(res.data?.data?.emergencyContact);
                setPhone(res.data?.data?.phone);
                setImage(IMAGE_BASE_URL + res.data?.data?.image);
            } catch (error: any) {
                console.log(error);
            }
        };
        fetchProfile();
    }, []);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("designation", designation);
            formData.append("address", address);
            formData.append("emergencyContactPhone", emergencyContactPhone);
            formData.append("emergencyContactRelation", emergencyContactRelation);
            formData.append("emergencyContactName", emergencyContactName);
            if (image && typeof image !== "string") {
                formData.append("image", {
                    uri: image.uri,
                    name: image.fileName || "profile.jpg",
                    type: image.mimeType || "image/jpeg",
                } as any);
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
        } catch (error: any) {
            Alert.alert("Error", error.response?.data?.message);
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <Feather name="arrow-left" size={22} color="#fff" />
                </TouchableOpacity>
                <View style={{ width: 22 }} />
            </View>

            {/* Avatar */}
            <ImageInput
                image={image}
                onChange={(img) => setImage(img.uri)}
                size={110}
                isEdit
            />

            <Text style={styles.name}>{name}</Text>

            <DraggableSheet>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flex: 1 }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: "900",
                            marginTop: 20,
                        }}>Personal Info :</Text>

                        <TextInput value={name} onChangeText={(text) => setName(text)} placeholder="Enter your name" label="Name" />
                        <TextInput value={phone} readOnly placeholder="Enter your phone number" label="Phone Number" />
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

                    <Button text="Update Profile" onPress={handleUpdate} loading={loading} disabled={loading} />
                </ScrollView>
            </DraggableSheet >
        </View >
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

    name: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "600",
        marginTop: 12,
        marginBottom: 20,
    },

    label: {
        fontSize: 13,
        color: "#888",
        marginBottom: 6,
        marginTop: 15,
    },

    input: {
        backgroundColor: "#fff",
        borderRadius: 14,
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

    readOnlyInput: {
        backgroundColor: "#F2F2F2",
        color: "#777",
    },
});
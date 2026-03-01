import DraggableSheet from "@/components/shared/dragable-sheet";
import BackButton from "@/components/ui/back-button";
import Button from "@/components/ui/button";
import ImageInput from "@/components/ui/image-input";
import TextInput from "@/components/ui/text-input";
import { IMAGE_BASE_URL } from "@/config";
import { useAuth } from "@/context/auth-context";
import { useAuthAxios } from "@/hooks/use-auth-axios";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
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

    const user = auth?.user;

    const axios = useAuthAxios();

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
            if (image && typeof image === "string") {
                formData.append("image", {
                    uri: image,
                    name: "profile.jpg",
                    type: "image/jpeg",
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

    useEffect(() => {
        if (user) {
            setName(user?.name);
            setDesignation(user?.designation);
            setAddress(user?.address);
            setEmergencyContactPhone(user?.emergencyContact?.phone);
            setEmergencyContactRelation(user?.emergencyContact?.relation);
            setEmergencyContactName(user?.emergencyContact?.name);
            setImage(IMAGE_BASE_URL + user?.image);
            setPhone(user?.phone);
        }
    }, []);


    return (
        <View style={styles.container}>
            <StatusBar style="light" backgroundColor="#0f3d33" />
            {/* Header */}
            <View style={styles.header}>
                <BackButton onPress={() => router.back()} />
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

                    <Button text="Update Profile" onPress={handleUpdate} loading={loading} disabled={loading} containerStyles={{ marginVertical: 20 }} />
                </ScrollView>
            </DraggableSheet >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f3d33",
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
import DraggableSheet from "@/components/shared/dragable-sheet";
import ImageInput from "@/components/ui/image-input";
import globalStyles from "@/styles";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileUpdateScreen() {
  const [name, setName] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [designation, setDesignation] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState<string | ImagePicker.ImagePickerAsset | null>(null);

  const handleUpdate = () => {
    console.log({
      name,
      emergencyContact,
      designation,
      address,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Dark Header */}
      <View style={styles.header}>
        <Text style={globalStyles.pageHeader}>Update Profile</Text>
      </View>

      {/* White Card Form */}
      <DraggableSheet>
        <View style={{flex:1}}>
         <View style={{flex:1}}>
          {/* image */}
          <ImageInput
            image={image}
            onChange={(image) => setImage(image)}
          />
           {/* Name */}
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />
          
          {/* Designation */}
          <Text style={styles.label}>Designation</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your designation"
            placeholderTextColor="#999"
            value={designation}
            onChangeText={setDesignation}
          />

          {/* Emergency Contact */}
          <Text style={styles.label}>Emergency Contact</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter emergency contact number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={emergencyContact}
            onChangeText={setEmergencyContact}
          />


          {/* Address */}
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Enter your address"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            value={address}
            onChangeText={setAddress}
          />
         </View>

          {/* Update Button */}
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>

      </DraggableSheet>
    </SafeAreaView>
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
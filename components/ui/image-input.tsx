// import React from "react";
// import {
//   View,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Text,
//   ImageSourcePropType,
//   StyleProp,
//   ViewStyle,
//   ImageStyle,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { Ionicons } from "@expo/vector-icons";

// interface ImageInputProps {
//   image?: string | ImagePicker.ImagePickerAsset | null;
//   onChange: (image: ImagePicker.ImagePickerAsset) => void;
//   size?: number;
//   style?: StyleProp<ViewStyle>;
//   imageStyle?: StyleProp<ImageStyle>;
//   isEdit?: boolean; // 👈 NEW PROP
// }

// const ImageInput: React.FC<ImageInputProps> = ({
//   image = null,
//   onChange,
//   size = 120,
//   style,
//   imageStyle,
//   isEdit = false,
// }) => {
//   const pickImage = async (): Promise<void> => {
//     const permission =
//       await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (!permission.granted) {
//       Alert.alert("Permission required to access gallery");
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 0.8,
//     });

//     if (!result.canceled) {
//       onChange(result.assets[0]);
//     }
//   };

//   const getImageSource = (): ImageSourcePropType | null => {
//     if (!image) return null;

//     if (typeof image === "string") {
//       return { uri: image };
//     }

//     if ("uri" in image) {
//       return { uri: image.uri };
//     }

//     return null;
//   };

//   const source = getImageSource();

//   return (
//     <TouchableOpacity
//       onPress={pickImage}
//       activeOpacity={0.8}
//       style={{ width: size, height: size }}
//     >
//       <View
//         style={[
//           styles.container,
//           { width: size, height: size },
//           style,
//         ]}
//       >
//         {source ? (
//           <>
//             <Image
//               source={source}
//               style={[
//                 styles.image,
//                 { width: size, height: size },
//                 imageStyle,
//               ]}
//             />

//             {isEdit && (
//               <TouchableOpacity
//                 style={styles.editButton}
//                 onPress={pickImage}
//               >
//                 <Ionicons name="pencil" size={16} color="#fff" />
//               </TouchableOpacity>
//             )}
//           </>
//         ) : (
//           <View style={styles.placeholder}>
//             <Ionicons name="cloud-upload-outline" size={23} color="#555"  style={{marginBottom: 4}} />
//             <Text style={styles.uploadText}>Upload Image</Text>
//           </View>
//         )}
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default ImageInput;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#EAEAEA",
//     justifyContent: "center",
//     alignItems: "center",
//     overflow: "hidden",
//     borderRadius: 12,
//   },
//   image: {
//     resizeMode: "cover",
//   },
//   placeholder: {
//     width: "100%",
//     height: "100%",
//     backgroundColor: "#D0D0D0",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   uploadText: {
//     color: "#555",
//     fontSize: 14,
//     fontWeight: "500",
//   },
//   editButton: {
//     position: "absolute",
//     top: 6,
//     right: 6,
//     backgroundColor: "rgba(0,0,0,0.8)",
//     padding: 6,
//     borderRadius: 20,
//   },
// });


import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Text,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  ImageStyle,
  Keyboard,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

interface ImageInputProps {
  image?: string | ImagePicker.ImagePickerAsset | null;
  onChange: (image: ImagePicker.ImagePickerAsset) => void;
  size?: number;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  isEdit?: boolean;
}

const ImageInput: React.FC<ImageInputProps> = ({
  image = null,
  onChange,
  size = 120,
  style,
  imageStyle,
  isEdit = false,
}) => {
  const pickImage = async (): Promise<void> => {
    // ✅ Unfocus all TextInput
    Keyboard.dismiss();

    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required to access gallery.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length > 0) {
      onChange(result.assets[0]);
    }
  };

  const getImageSource = (): ImageSourcePropType | null => {
    if (!image) return null;

    if (typeof image === "string") {
      return { uri: image };
    }

    if ("uri" in image) {
      return { uri: image.uri };
    }

    return null;
  };

  const source = getImageSource();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={pickImage}
      style={{ width: size, height: size }}
    >
      <View
        style={[
          styles.container,
          { width: size, height: size },
          style,
        ]}
      >
        {source ? (
          <>
            <Image
              source={source}
              style={[
                styles.image,
                { width: size, height: size },
                imageStyle,
              ]}
            />

            {isEdit && (
              <TouchableOpacity
                style={styles.editButton}
                onPress={pickImage}
                activeOpacity={0.7}
              >
                <Ionicons name="pencil" size={16} color="#fff" />
              </TouchableOpacity>
            )}
          </>
        ) : (
          <View style={styles.placeholder}>
            <Ionicons
              name="cloud-upload-outline"
              size={24}
              color="#555"
              style={{ marginBottom: 6 }}
            />
            <Text style={styles.uploadText}>Upload Image</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ImageInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EAEAEA",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 16,
  },
  image: {
    resizeMode: "cover",
  },
  placeholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#D0D0D0",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadText: {
    color: "#555",
    fontSize: 14,
    fontWeight: "500",
  },
  editButton: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 6,
    borderRadius: 20,
  },
});
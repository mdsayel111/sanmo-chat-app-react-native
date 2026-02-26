import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

interface ImageInputProps {
  image?: string | ImagePicker.ImagePickerAsset | null;
  onChange: (image: ImagePicker.ImagePickerAsset) => void;
  size?: number; // default square size
  style?: StyleProp<ViewStyle>; // container style override
  imageStyle?: StyleProp<ImageStyle>; // image style override
}

const ImageInput: React.FC<ImageInputProps> = ({
  image = null,
  onChange,
  size = 120,
  style,
  imageStyle,
}) => {
  const pickImage = async (): Promise<void> => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required to access gallery");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
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
    <TouchableOpacity onPress={pickImage} activeOpacity={0.8} style={{width: size, height: size}}>
      <View
        style={[
          styles.container,
          { width: size, height: size },
          style, // 👈 custom override
        ]}
      >
        {source ? (
          <Image
            source={source}
            style={[
              styles.image,
              { width: size, height: size },
              imageStyle, // 👈 custom image override
            ]}
          />
        ) : (
          <View style={styles.placeholder} />
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
    borderRadius: 12, // square with rounded corners
  },
  image: {
    resizeMode: "cover",
  },
  placeholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#D0D0D0",
  },
});
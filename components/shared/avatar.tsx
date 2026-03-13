import React from "react";
import { View, Image, StyleSheet, ImageSourcePropType } from "react-native";

type AvatarProps = {
    uri: string;
    size?: number;
    isOnline?: boolean;
};

const Avatar: React.FC<AvatarProps> = ({ uri, size = 60, isOnline = false }) => {
    return (
        <View style={{ width: size, height: size }}>
            <Image
                source={{ uri } as ImageSourcePropType}
                style={[
                    styles.avatar,
                    {
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                    },
                ]}
            />

            {isOnline && (
                <View
                    style={[
                        styles.onlineIndicator,
                        {
                            width: size * 0.28,
                            height: size * 0.28,
                            borderRadius: (size * 0.28) / 2,
                            right: 0,
                            bottom: 0,
                        },
                    ]}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    avatar: {
        resizeMode: "cover",
    },
    onlineIndicator: {
        position: "absolute",
        backgroundColor: "#22c55e",
        borderWidth: 2,
        borderColor: "#fff",
    },
});

export default Avatar;

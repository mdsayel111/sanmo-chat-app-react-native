import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

interface NoDataProps {
    containerStyles?: any;
    imageStyles?: any;
    textStyles?: any;
    text?: string;
}
export default function NoData({
    containerStyles,
    imageStyles,
    textStyles,
    text = 'No data found'
}: NoDataProps) {
    return (
        <View style={[styles.container, containerStyles]}>
            <Image
                source={require('../../assets/images/no-data.png')}
                style={[imageStyles]}
                resizeMode='contain'
                width={100}
                height={100}
            />
            <Text style={[styles.text, textStyles]}>{text}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    text: {
        color: "#777",
        fontSize: 20,
        fontWeight: "600",
        marginTop: 5,
    },
});
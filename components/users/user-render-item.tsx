import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { TUser } from '@/types/user-type'
import { BASE_URL } from '@/config'
import Avatar from '../shared/avatar'
import { router } from 'expo-router'

export default function UserRenderItem({ item }: { item: TUser }) {
    console.log(item, "item")
    return (
        <Pressable
            style={styles.row}
            onPress={() => {
                router.push({
                    pathname: "/chat/[type]/[id]",
                    params: {
                        type: "private",
                        id: item._id,
                    },
                });
            }}
        >
            {/* <Image source={{ uri: BASE_URL + item.image }} style={styles.avatar} /> */}
            <Avatar uri={BASE_URL + item.image} />

            <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.subtitle}>{item.designation}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({

    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },

    name: {
        fontSize: 16,
        fontWeight: "600",
    },

    subtitle: {
        fontSize: 13,
        color: "#888",
        marginTop: 2,
    },
});
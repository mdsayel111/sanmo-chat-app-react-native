import { BASE_URL } from '@/config'
import { router } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Avatar from '../shared/avatar'

export default function UserRenderItem({ item, isOnline, type, id }: { item: any, isOnline?: boolean, type?: string, id?: string }) {
    console.log(type, id)
    return (
        <Pressable
            style={styles.row}
            onPress={() => {
                router.push({
                    pathname: "/chat/[type]/[id]",
                    params: {
                        type: type || item?.type as string,
                        id: id || item._id,
                    },
                });
            }}
        >
            {/* <Image source={{ uri: BASE_URL + item.image }} style={styles.avatar} /> */}
            <Avatar uri={BASE_URL + item.image} isOnline={isOnline} size={40} />

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
        gap: 15,
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
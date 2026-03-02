import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'

export default function BackButton({ onPress, color }: { onPress: () => void, color?: string }) {
    return (
        <TouchableOpacity
            onPress={onPress || router.back()}
        >
            <Feather name="arrow-left" size={26} color={color || "white"} />
        </TouchableOpacity>
    )
}

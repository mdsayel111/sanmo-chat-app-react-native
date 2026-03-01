import { Feather } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity } from 'react-native'

export default function BackButton({ onPress }: { onPress: () => void }) {
    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <Feather name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
    )
}

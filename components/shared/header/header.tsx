import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import BackButton from '../../ui/back-button';
import HeaderTitle from './header-title';

type TProps = {
    title: string;
    leftButton?: React.ReactNode;
    rightButton?: React.ReactNode;
}

export default function Header(
    {
        title,
        leftButton = <BackButton onPress={() => router.back()} />,
        rightButton
    }: TProps) {
    return (
        <View style={styles.header}>
            {leftButton}
            <HeaderTitle title={title} />
            {rightButton || <View />}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 0,
        paddingBottom: 20,
    },
});
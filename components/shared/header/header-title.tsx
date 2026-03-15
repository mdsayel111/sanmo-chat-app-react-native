import React from 'react';
import { StyleSheet, Text } from 'react-native';

type TProps = {
  title: string;
  extraStyles?: any;
}

export default function HeaderTitle({ title, extraStyles }: TProps) {
  return (
    <Text style={[styles?.pageHeader, extraStyles]}>{title}</Text>
  )
}

const styles = StyleSheet.create({
  pageHeader: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "600",
  },
});
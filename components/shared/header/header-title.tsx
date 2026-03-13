import React from 'react';
import { StyleSheet, Text } from 'react-native';

type TProps = {
  title: string;
}

export default function HeaderTitle({ title }: TProps) {
  return (
    <Text style={styles.pageHeader}>{title}</Text>
  )
}

const styles = StyleSheet.create({
  pageHeader: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "600",
  },
});
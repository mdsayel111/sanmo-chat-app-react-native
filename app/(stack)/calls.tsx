import CallRenderItem from "@/components/calls/call-render-item";
import Header from "@/components/shared/header/header";
import PrimaryWrapper from "@/components/shared/primary-wrapper";
import { COLORS } from "@/constants/style";
import { CallItem } from "@/types/call-type";
import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const DATA: CallItem[] = [
  {
    id: "1",
    name: "Team Align",
    avatar: "https://i.pravatar.cc/150?img=1",
    time: "Today, 09:30 AM",
    type: "incoming",
  },
  {
    id: "2",
    name: "Jhon Abraham",
    avatar: "https://i.pravatar.cc/150?img=2",
    time: "Today, 07:30 AM",
    type: "incoming",
  },
  {
    id: "3",
    name: "Sabila Sayma",
    avatar: "https://i.pravatar.cc/150?img=3",
    time: "Yesterday, 07:35 PM",
    type: "missed",
  },
  {
    id: "4",
    name: "Alex Linderson",
    avatar: "https://i.pravatar.cc/150?img=4",
    time: "Monday, 09:30 AM",
    type: "outgoing",
  },
  {
    id: "5",
    name: "John Borino",
    avatar: "https://i.pravatar.cc/150?img=5",
    time: "Monday, 09:30 AM",
    type: "incoming",
  },
];

const CallsScreen = () => {


  return (
    <View style={styles.container}>
      <Header title="Calls" />

      <PrimaryWrapper>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <CallRenderItem item={item} />}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </PrimaryWrapper>
    </View>
  );
};

export default CallsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
  },
});
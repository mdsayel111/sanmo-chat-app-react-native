import Header from "@/components/shared/header/header";
import PrimaryWrapper from "@/components/shared/primary-wrapper";
import UserRenderItem from "@/components/users/user-render-item";
import { COLORS } from "@/constants/style";
import { useUsers } from "@/context/user-context";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";

const ContactsScreen = () => {

  const { users } = useUsers();
  return (
    <View style={styles.container}>
      <Header title="All Users" />

      <PrimaryWrapper>
        <FlatList
          data={users}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <UserRenderItem item={item} isOnline={item.isActive} type={item.chatType} id={item.chatId} />
          )}
        />
      </PrimaryWrapper>
    </View>
  );
};

export default ContactsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
});
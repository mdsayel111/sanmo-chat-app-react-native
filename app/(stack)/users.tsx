import Header from "@/components/shared/header/header";
import PrimaryWrapper from "@/components/shared/primary-wrapper";
import BackButton from "@/components/ui/back-button";
import UserRenderItem from "@/components/users/user-render-item";
import { COLORS } from "@/constants/style";
import { useAuthAxios } from "@/hooks/use-auth-axios";
import { TUser } from "@/types/user-type";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

interface Contact {
  id: string;
  name: string;
  subtitle: string;
  avatar: string;
  section: string;
}

const DATA: Contact[] = [
  {
    id: "1",
    name: "Afrin Sabila",
    subtitle: "Life is beautiful ✌️",
    avatar: "https://i.pravatar.cc/150?img=11",
    section: "A",
  },
  {
    id: "2",
    name: "Adil Adnan",
    subtitle: "Be your own hero 💪",
    avatar: "https://i.pravatar.cc/150?img=12",
    section: "A",
  },
  {
    id: "3",
    name: "Bristy Haque",
    subtitle: "Keep working ✍️",
    avatar: "https://i.pravatar.cc/150?img=13",
    section: "B",
  },
  {
    id: "4",
    name: "John Borino",
    subtitle: "Make yourself proud 😍",
    avatar: "https://i.pravatar.cc/150?img=14",
    section: "B",
  },
  {
    id: "5",
    name: "Borsha Akther",
    subtitle: "Flowers are beautiful 🌸",
    avatar: "https://i.pravatar.cc/150?img=15",
    section: "B",
  },
  {
    id: "6",
    name: "Sheik Sadi",
    subtitle: "Hello there 👋",
    avatar: "https://i.pravatar.cc/150?img=16",
    section: "S",
  },
];

const ContactsScreen = () => {

  const sections = Array.from(new Set(DATA.map((c) => c.section)));
  const [users, setUsers] = useState<TUser[]>([]);
  const axios = useAuthAxios();

  useEffect(() => {
    axios.get("/user/all-users").then((res) => {
      setUsers(res.data.data);
    });
  }, []);

  console.log(users,"users")

  return (
    <View style={styles.container}>
      <Header title="All Users" />

      <PrimaryWrapper>
        <FlatList
          data={users}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <UserRenderItem item={item} />
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
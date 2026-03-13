import Header from "@/components/shared/header/header";
import PrimaryWrapper from "@/components/shared/primary-wrapper";
import BackButton from "@/components/ui/back-button";
import { COLORS } from "@/constants/style";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
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
  const renderItem = ({ item }: { item: Contact }) => (
    <View style={styles.row}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />

      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );

  const sections = Array.from(new Set(DATA.map((c) => c.section)));

  return (
    <View style={styles.container}>
      <Header title="All Users" />

      <PrimaryWrapper>
        <FlatList
          data={sections}
          keyExtractor={(section) => section}
          renderItem={({ item: section }) => (
            <View>
              <Text style={styles.sectionHeader}>{section}</Text>

              {DATA.filter((c) => c.section === section).map((contact) => (
                <View key={contact.id}>{renderItem({ item: contact })}</View>
              ))}
            </View>
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  sectionHeader: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 6,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
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
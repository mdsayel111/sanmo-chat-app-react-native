import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

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
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.circleBtn}>
          <Feather name="search" size={20} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Contacts</Text>

        <TouchableOpacity style={styles.circleBtn}>
          <Ionicons name="person-add-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Sheet */}
      <View style={styles.sheet}>
        <View style={styles.dragIndicator} />

        <Text style={styles.sectionTitle}>My Contact</Text>

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
      </View>
    </View>
  );
};

export default ContactsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#062E26",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },

  circleBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "#ffffff40",
    justifyContent: "center",
    alignItems: "center",
  },

  sheet: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  dragIndicator: {
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E0E0E0",
    marginBottom: 12,
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
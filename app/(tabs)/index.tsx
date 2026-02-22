// import { Image } from 'expo-image';
// import { Platform, StyleSheet } from 'react-native';

// import { HelloWave } from '@/components/hello-wave';
// import ParallaxScrollView from '@/components/parallax-scroll-view';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { Link } from 'expo-router';

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: 'cmd + d',
//               android: 'cmd + m',
//               web: 'F12',
//             })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <Link href="/modal">
//           <Link.Trigger>
//             <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//           </Link.Trigger>
//           <Link.Preview />
//           <Link.Menu>
//             <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
//             <Link.MenuAction
//               title="Share"
//               icon="square.and.arrow.up"
//               onPress={() => alert('Share pressed')}
//             />
//             <Link.Menu title="More" icon="ellipsis">
//               <Link.MenuAction
//                 title="Delete"
//                 icon="trash"
//                 destructive
//                 onPress={() => alert('Delete pressed')}
//               />
//             </Link.Menu>
//           </Link.Menu>
//         </Link>

//         <ThemedText>
//           {`Tap the Explore tab to learn more about what's included in this starter app.`}
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           {`When you're ready, run `}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });

import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SwipeableItem from "react-native-swipeable-item";

interface Chat {
  id: string;
  name: string;
  message: string;
  time: string;
  unread?: number;
  avatar: string;
  online?: boolean;
}

const chats: Chat[] = [
  {
    id: "1",
    name: "Alex Linderson",
    message: "How are you today?",
    time: "2 min ago",
    unread: 3,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    online: true,
  },
  {
    id: "2",
    name: "Team Align",
    message: "Don’t miss to attend the meeting.",
    time: "2 min ago",
    unread: 4,
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    online: true,
  },
  {
    id: "3",
    name: "John Ahrham",
    message: "Hey! Can you join the meeting?",
    time: "2 min ago",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    id: "4",
    name: "Sabila Sayma",
    message: "How are you today?",
    time: "2 min ago",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "5",
    name: "John Borino",
    message: "Have a good day 🌸",
    time: "2 min ago",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    online: true,
  },
];

export default function HomeScreen() {
  const renderRightActions = () => {
    return (
      <View style={styles.swipeContainer}>
        <TouchableOpacity style={styles.bellButton}>
          <Ionicons name="notifications-outline" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton}>
          <Feather name="trash-2" size={20} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item }: { item: Chat }) => {
    return (
      <SwipeableItem
        item={item}
        renderUnderlayRight={renderRightActions}
        snapPointsRight={[120]}
      >
        <View style={styles.chatItem}>
          <View>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            {item.online && <View style={styles.onlineDot} />}
          </View>

          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.message}>{item.message}</Text>
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.time}>{item.time}</Text>
            {item.unread && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{item.unread}</Text>
              </View>
            )}
          </View>
        </View>
      </SwipeableItem>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Feather name="search" size={22} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Home</Text>

        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/men/11.jpg",
          }}
          style={styles.profile}
        />
      </View>

      {/* Stories */}
      <View style={styles.storyContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.storyItem}>
              <Image source={{ uri: item.avatar }} style={styles.storyAvatar} />
              <Text style={styles.storyName}>{item.name.split(" ")[0]}</Text>
            </View>
          )}
        />
      </View>

      {/* Chat List */}
      <View style={styles.chatContainer}>
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>

      {/* Bottom Tab */}

    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f3d33",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  profile: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  storyContainer: {
    paddingLeft: 15,
    paddingVertical: 10,
  },
  storyItem: {
    alignItems: "center",
    marginRight: 18,
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  storyName: {
    color: "white",
    fontSize: 12,
    marginTop: 6,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
  },
  onlineDot: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 12,
    height: 12,
    backgroundColor: "#00C851",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "white",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  message: {
    color: "#777",
    marginTop: 4,
  },
  time: {
    fontSize: 12,
    color: "#999",
  },
  unreadBadge: {
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 6,
  },
  unreadText: {
    color: "white",
    fontSize: 12,
  },
  swipeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: 120,
  },
  bellButton: {
    backgroundColor: "#0f3d33",
    width: 60,
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    width: 60,
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  bottomTab: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "white",
  },
});
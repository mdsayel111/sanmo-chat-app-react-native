import DraggableModal from "@/components/shared/draggable-modal";
import NoData from "@/components/shared/no-data";
import TextInput from "@/components/ui/text-input";
import { useAuthAxios } from "@/hooks/use-auth-axios";
import { TChat } from "@/types/chat-type";
import { formatChats } from "@/utils/chat";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import React, { useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    View
} from "react-native";
import ChatRenderItem from "./chat-render-item/chat-render-item";

export default function SearchModal({ setSearchModalVisible, searchModalVisible, users, auth }: {
    setSearchModalVisible: (visible: boolean) => void;
    searchModalVisible: boolean;
    users: any;
    auth: any;
}) {
    const axios = useAuthAxios();
    const [searchChats, setSearchChats] = useState<(TChat & { isOnline?: boolean })[]>([]);

    const handleSearch = async (text: string) => {
        try {
            const res = await axios.get("/chat/search-chats?searchQuery=" + text);
            setSearchChats(res.data.data);
        } catch (error: any) {
            console.error(error.response?.data?.message);
        }
    };

    useEffect(() => {
        handleSearch("")
    }, [axios]);
    return (
        <DraggableModal visible={searchModalVisible} onClose={() => setSearchModalVisible(false)}>
            <View style={styles.searchModal}>
                <View style={styles.searchContainer}>
                    <EvilIcons name="search" size={24} color="black" style={styles.searchIcon} />
                    <TextInput placeholder="Search" style={styles.searchInput} onChangeText={handleSearch} />
                </View>
                {
                    searchChats.length > 0 ? (
                        <>
                            <Text style={styles.sectionTitle}>Recent</Text>
                            <FlatList
                                data={formatChats(searchChats, users, auth)}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) => <ChatRenderItem item={item} isOnline={item.isOnline} />}
                                contentContainerStyle={{ paddingBottom: 20, gap: 10 }}
                                showsVerticalScrollIndicator={false}
                            />
                        </>
                    ) : (
                        <NoData text="No reult found!" />
                    )
                }
            </View>
        </DraggableModal>
    )
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
    },
    searchModal: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 16,
        paddingTop: 10,
    },
    searchContainer: {
        position: "relative",
    },
    searchIcon: {
        position: "absolute",
        top: "19%",
        left: 10,
        zIndex: 1,
        color: "#c4bcbc",
    },
    searchInput: {
        backgroundColor: "#fff",
        borderRadius: 6000,
        paddingRight: 15,
        paddingLeft: 40,
        paddingVertical: 10,
        fontSize: 14,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        marginBottom: 20,
    },
});

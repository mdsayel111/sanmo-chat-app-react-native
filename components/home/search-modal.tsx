import DraggableModal from "@/components/shared/draggable-modal";
import NoData from "@/components/shared/no-data";
import TextInput from "@/components/ui/text-input";
import { useAuthAxios } from "@/hooks/use-auth-axios";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import React, { useEffect, useState } from "react";
import {
    FlatList,
    ListRenderItem,
    StyleSheet,
    Text,
    View
} from "react-native";

export default function SearchModal({ chats, setSearchModalVisible, searchModalVisible, renderItem }: {
    chats: any[];
    setSearchModalVisible: (visible: boolean) => void;
    searchModalVisible: boolean;
    renderItem: (item: any) => any;
}) {
    const axios = useAuthAxios();
    const [searchChats, setSearchChats] = useState(chats);

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
    }, []);
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
                                data={searchChats}
                                keyExtractor={(item) => item._id}
                                renderItem={renderItem}
                                contentContainerStyle={{ paddingBottom: 20, gap: 10 }}
                                showsVerticalScrollIndicator={false}
                            />
                        </>
                    ) : (
                        <NoData text="No reult found!"/>
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

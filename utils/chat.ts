import { TChat } from "@/types/chat-type";
import { TUser } from "@/types/user-type";

export const formatChats = (chats: (TChat & { isOnline?: boolean })[], users: (TUser & { isActive: boolean })[], auth?: any) => {
    return chats.map((item) => {
        if (item.type === "private") {
            const otherUser = item?.members.find((member: TUser) => member._id !== auth?.user?._id) as TUser;
            item.image = otherUser.image;
            item.name = otherUser.name;
            item.isOnline = users.find(u => u._id === otherUser._id)?.isActive;
        }

        return item;
    });
};
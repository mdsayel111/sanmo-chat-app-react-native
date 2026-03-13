import { TMessage } from "./message-type";
import { TUser } from "./user-type";

export type TChat = {
    _id: string;
    name: string;
    message: string;
    time: string;
    unread?: number;
    image: string;
    online?: boolean;
    lastMessage: TMessage;
    type: string;
    members: TUser[];
}
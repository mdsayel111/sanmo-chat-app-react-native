type TMessageType = "incoming" | "outgoing" | "voice" | "images";

export type TMessage = {
    _id: string;
    type: TMessageType;
    text?: string;
    sender: string;
    createdAt: string;
    chat: string;
}
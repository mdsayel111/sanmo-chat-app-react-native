type TMessageType = "incoming" | "outgoing" | "voice" | "images";

export type TMessage = {
    id: string;
    type: TMessageType;
    text?: string;
    sender?: string;
    createdAt?: string;
}
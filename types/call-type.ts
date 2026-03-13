export interface CallItem {
    id: string;
    name: string;
    avatar: string;
    time: string;
    type: "incoming" | "missed" | "outgoing";
}
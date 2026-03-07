import React, { useEffect, useRef, useState } from "react";
import { View, Button } from "react-native";
import {
    RTCPeerConnection,
    RTCView,
    mediaDevices,
    RTCSessionDescription,
} from "react-native-webrtc";
import { useSocket } from "@/context/socket-context";

const configuration = {
    iceServers: [
        { urls: "stun:stun.l.google.com:19302" }
    ],
};

export default function CallScreen() {
    const { socket } = useSocket();

    const peerConnection = useRef<RTCPeerConnection | null>(null);
    const [localStream, setLocalStream] = useState<any>(null);
    const [remoteStream, setRemoteStream] = useState<any>(null);

    useEffect(() => {
        if (!socket) return;

        console.log("🟢 Setting socket listeners");

        peerConnection.current = new RTCPeerConnection(configuration);

        // Event: Remote track received
        peerConnection.current.ontrack = (event) => {
            console.log("🎥 Remote track received");
            if (event.streams && event.streams[0]) {
                setRemoteStream(event.streams[0]);
            }
        };

        // Event: ICE candidate generated locally
        peerConnection.current.onicecandidate = (event) => {
            if (event.candidate) {
                console.log("🧊 Sending ICE candidate");
                socket.emit("ice-candidate", {
                    roomId: "room1",
                    candidate: event.candidate,
                });
            }
        };

        // Join room
        socket.emit("join-room", "room1");

        // Receive Offer
        socket.on("offer", async (offer) => {
            console.log("📩 Offer received");

            if (!peerConnection.current) return;

            await peerConnection.current.setRemoteDescription(
                new RTCSessionDescription(offer)
            );

            // Get local media for receiver
            const stream = await mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            setLocalStream(stream);

            // Add local tracks to connection
            stream.getTracks().forEach((track) => {
                peerConnection.current?.addTrack(track, stream);
            });

            // Create and send answer
            const answer = await peerConnection.current.createAnswer();
            await peerConnection.current.setLocalDescription(answer);

            socket.emit("answer", { roomId: "room1", answer });
            console.log("📤 Answer sent");
        });

        // Receive Answer
        socket.on("answer", async (answer) => {
            console.log("📩 Answer received");
            await peerConnection.current?.setRemoteDescription(
                new RTCSessionDescription(answer)
            );
        });

        // Receive ICE candidate from remote
        socket.on("ice-candidate", async (candidate) => {
            console.log("🧊 ICE candidate received");
            try {
                await peerConnection.current?.addIceCandidate(candidate);
            } catch (err) {
                console.log("ICE error:", err);
            }
        });

        peerConnection.current.oniceconnectionstatechange = () => {
            console.log(
                "ICE connection state:",
                peerConnection.current?.iceConnectionState
            );
        };

        return () => {
            peerConnection.current?.close();
            peerConnection.current = null;
            setLocalStream(null);
            setRemoteStream(null);
        };
    }, [socket]);

    const startCall = async () => {
        console.log("📞 Starting call");

        if (!peerConnection.current) return;

        const stream = await mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });
        setLocalStream(stream);

        // Add local tracks to connection
        stream.getTracks().forEach((track) => {
            peerConnection.current?.addTrack(track, stream);
        });

        // Create offer
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);

        socket?.emit("offer", { roomId: "room1", offer });
        console.log("📤 Offer sent");
    };

    return (
        <View style={{ flex: 1 }}>
            {localStream && (
                <RTCView
                    streamURL={localStream.toURL()}
                    style={{ width: "100%", height: 250 }}
                />
            )}
            {remoteStream && (
                <RTCView
                    streamURL={remoteStream.toURL()}
                    style={{ width: "100%", height: 250 }}
                />
            )}
            <Button title="Start Call" onPress={startCall} />
        </View>
    );
}
import { useSocket } from "@/context/socket-context";
import React, { useEffect, useRef, useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import {
    RTCPeerConnection,
    RTCView,
    mediaDevices,
    RTCSessionDescription,
} from "react-native-webrtc";

const configuration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

export default function CallScreen() {
    const [localStream, setLocalStream] = useState<any>(null);
    const [remoteStream, setRemoteStream] = useState<any>(null);
    const peerConnection = useRef<RTCPeerConnection | null>(null);
    const { socket } = useSocket();

    useEffect(() => {
        if (!socket) return;
        socket.emit("join-room", "room1");

        socket.on("offer", async (offer) => {
            await peerConnection.current?.setRemoteDescription(
                new RTCSessionDescription(offer)
            );

            const answer = await peerConnection.current?.createAnswer();
            await peerConnection.current?.setLocalDescription(answer);

            socket.emit("answer", { roomId: "room1", answer });
        });

        socket.on("answer", async (answer) => {
            await peerConnection.current?.setRemoteDescription(
                new RTCSessionDescription(answer)
            );
        });

        socket.on("ice-candidate", async (candidate) => {
            await peerConnection.current?.addIceCandidate(candidate);
        });
    }, [socket]);

    const startCall = async () => {
        if (!socket) return;
        peerConnection.current = new RTCPeerConnection(configuration);

        const stream = await mediaDevices.getUserMedia({
            audio: true,
            video: true, // set false for audio-only
        });

        setLocalStream(stream);

        stream.getTracks().forEach((track) => {
            peerConnection.current?.addTrack(track, stream);
        });

        peerConnection.current.ontrack = (event) => {
            setRemoteStream(event.streams[0]);
        };

        peerConnection.current.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit("ice-candidate", {
                    roomId: "room1",
                    candidate: event.candidate,
                });
            }
        };

        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);

        socket.emit("offer", { roomId: "room1", offer });
    };

    return (
        <View style={styles.container}>
            {localStream && (
                <RTCView
                    streamURL={localStream.toURL()}
                    style={styles.video}
                />
            )}

            {remoteStream && (
                <RTCView
                    streamURL={remoteStream.toURL()}
                    style={styles.video}
                />
            )}

            <Button title="Start Call" onPress={startCall} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    video: { width: "100%", height: 300 },
});
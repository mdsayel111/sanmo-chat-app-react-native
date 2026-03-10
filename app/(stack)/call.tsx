import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useRef, useState } from "react";
import { BackHandler, Image, StyleSheet, TouchableOpacity, View } from "react-native";

import {
    mediaDevices,
    RTCPeerConnection,
    RTCSessionDescription,
    RTCView,
} from "react-native-webrtc";

import { useSocket } from "@/context/socket-context";
import { router, useLocalSearchParams } from "expo-router";

const configuration = {
    iceServers: [
        { urls: "stun:stun.l.google.com:19302" }
    ]
};

export default function CallScreen() {
    const { id, type } = useLocalSearchParams<any>();

    const [backEnabled, setBackEnabled] = useState(false);

    const { socket } = useSocket();

    const peerConnection = useRef<RTCPeerConnection | null>(null);

    const [localStream, setLocalStream] = useState<any>(null);
    const [remoteStream, setRemoteStream] = useState<any>(null);

    const [incomingCall, setIncomingCall] = useState(false);
    const [callerOffer, setCallerOffer] = useState<any>(null);

    const [muted, setMuted] = useState(false);
    const [videoEnabled, setVideoEnabled] = useState(true);

    const [remoteVideoEnabled, setRemoteVideoEnabled] = useState(true);

    // ⭐ Setup WebRTC
    useEffect(() => {

        if (!socket) return;

        peerConnection.current = new RTCPeerConnection(configuration);

        socket.emit("join-room", id);

        peerConnection.current.ontrack = (event) => {
            if (event.streams?.[0]) {
                setRemoteStream(event.streams[0]);
            }
        };

        peerConnection.current.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit("ice-candidate", {
                    roomId: id,
                    candidate: event.candidate
                });
            }
        };

        // ⭐ Incoming Call
        socket.on("offer", (offer) => {
            console.log("📞 Incoming call");
            setCallerOffer(offer);
            setIncomingCall(true);
        });

        socket.on("answer", async (answer) => {
            await peerConnection.current?.setRemoteDescription(
                new RTCSessionDescription(answer)
            );
        });

        socket.on("ice-candidate", async (candidate) => {
            try {
                await peerConnection.current?.addIceCandidate(candidate);
            } catch (err) {
                console.log(err);
            }
        });

        // ⭐ Remote video toggle event
        socket.on("toggle-video", ({ enabled }) => {
            setRemoteVideoEnabled(enabled);
        });
    }, [socket]);



    useEffect(() => {
        const backAction = () => {
            return true;
        };

        BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        startCall();
    }, []);

    // ⭐ Start Call
    const startCall = async () => {

        const stream = await mediaDevices.getUserMedia({
            video: true,
            audio: true
        });

        setLocalStream(stream);

        stream.getTracks().forEach(track => {
            peerConnection.current?.addTrack(track, stream);
        });

        const offer = await peerConnection.current?.createOffer();
        await peerConnection.current?.setLocalDescription(offer);

        socket?.emit("offer", { roomId: id, offer });

    };

    // ⭐ Accept Call
    const acceptCall = async () => {

        setIncomingCall(false);

        await peerConnection.current?.setRemoteDescription(
            new RTCSessionDescription(callerOffer)
        );

        const stream = await mediaDevices.getUserMedia({
            video: true,
            audio: true
        });

        setLocalStream(stream);

        stream.getTracks().forEach(track => {
            peerConnection.current?.addTrack(track, stream);
        });

        const answer = await peerConnection.current?.createAnswer();

        await peerConnection.current?.setLocalDescription(answer);

        socket?.emit("answer", {
            roomId: id,
            answer
        });

    };

    const rejectCall = () => {
        setIncomingCall(false);
        setCallerOffer(null);
    };

    // ⭐ Toggle Mute
    const toggleMute = () => {

        localStream?.getAudioTracks().forEach(track => {
            track.enabled = !track.enabled;
        });

        setMuted(!muted);
    };

    // ⭐ Toggle Video
    const toggleVideo = () => {

        const enabled = !videoEnabled;

        localStream?.getVideoTracks().forEach(track => {
            track.enabled = enabled;
        });

        setVideoEnabled(enabled);

        socket?.emit("toggle-video", {
            roomId: id,
            enabled
        });

    };

    const endCall = () => {

        localStream?.getTracks().forEach(track => track.stop());
        peerConnection.current?.close();
        peerConnection.current = null;

        setLocalStream(null);
        setRemoteStream(null);
        router.back();
    };

    const isVideoActive = () => {
        return remoteVideoEnabled && remoteStream;
    };
    return (
        <View style={styles.container}>

            {/* ⭐ Remote Video / Avatar */}
            {isVideoActive() ? (
                <RTCView
                    streamURL={remoteStream.toURL()}
                    style={styles.remoteVideo}
                />
            ) : (
                <View style={styles.avatarContainer}>
                    <Image
                        source={{ uri: "https://i.pravatar.cc/300" }}
                        style={styles.avatar}
                    />
                </View>
            )}

            {/* ⭐ Local Preview */}
            {localStream && videoEnabled && (
                <RTCView
                    streamURL={localStream.toURL()}
                    style={styles.localPreview}
                />
            )}

            {incomingCall ? (
                <View style={styles.controls}>

                    <View style={{ flexDirection: "row", marginTop: 20 }}>

                        <TouchableOpacity
                            style={[styles.btn, { backgroundColor: "green" }]}
                            onPress={acceptCall}
                        >
                            <Ionicons name="call-outline" size={24} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.btn, { backgroundColor: "red", marginLeft: 50 }]}
                            onPress={rejectCall}
                        >
                            <AntDesign name="close" size={24} color="white" />
                        </TouchableOpacity>

                    </View>

                </View>
            ) : (<View style={styles.controls}>

                <TouchableOpacity style={styles.btn} onPress={toggleMute}>
                    <Ionicons
                        name={muted ? "mic-off" : "mic"}
                        size={24}
                        color="white"
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={toggleVideo}>
                    <Ionicons
                        name={videoEnabled ? "videocam" : "videocam-off"}
                        size={24}
                        color="white"
                    />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btn, styles.endBtn]} onPress={endCall}>
                    <Ionicons name="call" size={24} color="white" />
                </TouchableOpacity>

            </View>)}

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#0f172a",
        position: "relative"
    },

    remoteVideo: {
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 1
    },

    avatarContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    avatar: {
        width: 160,
        height: 160,
        borderRadius: 80
    },

    localPreview: {
        width: 120,
        height: 160,
        position: "absolute",
        right: 20,
        top: 60,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "white",
        zIndex: 10000
    },

    controls: {
        position: "absolute",
        bottom: 120,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-evenly"
    },

    btn: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#1e293b",
        justifyContent: "center",
        alignItems: "center"
    },

    endBtn: {
        backgroundColor: "#ef4444"
    },

    startBtn: {
        position: "absolute",
        bottom: 40,
        alignSelf: "center",
        backgroundColor: "#22c55e",
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 30
    },

    callBox: {
        position: "absolute",
        top: "40%",
        alignSelf: "center",
        backgroundColor: "#0f172a",
        padding: 30,
        borderRadius: 20
    }

});
// import { router } from 'expo-router'
// import React from 'react'
// import { Pressable, Text } from 'react-native'

// export default function Call() {
//     return (
//         <Pressable onPress={() => router.back()}>
//             <Text>Call</Text>
//         </Pressable>
//     )
// }

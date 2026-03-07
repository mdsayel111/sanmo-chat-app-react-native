// import React, { useEffect, useRef, useState } from "react";
// import { View, Button } from "react-native";
// import {
//     RTCPeerConnection,
//     RTCView,
//     mediaDevices,
//     RTCSessionDescription,
// } from "react-native-webrtc";
// import { useSocket } from "@/context/socket-context";

// const configuration = {
//     iceServers: [
//         { urls: "stun:stun.l.google.com:19302" }
//     ],
// };

// export default function CallScreen() {
//     const { socket } = useSocket();

//     const peerConnection = useRef<RTCPeerConnection | null>(null);
//     const [localStream, setLocalStream] = useState<any>(null);
//     const [remoteStream, setRemoteStream] = useState<any>(null);

//     useEffect(() => {
//         if (!socket) return;

//         console.log("🟢 Setting socket listeners");

//         peerConnection.current = new RTCPeerConnection(configuration);

//         // Event: Remote track received
//         peerConnection.current.ontrack = (event) => {
//             console.log("🎥 Remote track received");
//             if (event.streams && event.streams[0]) {
//                 setRemoteStream(event.streams[0]);
//             }
//         };

//         // Event: ICE candidate generated locally
//         peerConnection.current.onicecandidate = (event) => {
//             if (event.candidate) {
//                 console.log("🧊 Sending ICE candidate");
//                 socket.emit("ice-candidate", {
//                     roomId: "room1",
//                     candidate: event.candidate,
//                 });
//             }
//         };

//         // Join room
//         socket.emit("join-room", "room1");

//         // Receive Offer
//         socket.on("offer", async (offer) => {
//             console.log("📩 Offer received");

//             if (!peerConnection.current) return;

//             await peerConnection.current.setRemoteDescription(
//                 new RTCSessionDescription(offer)
//             );

//             // Get local media for receiver
//             const stream = await mediaDevices.getUserMedia({
//                 video: true,
//                 audio: true,
//             });
//             setLocalStream(stream);

//             // Add local tracks to connection
//             stream.getTracks().forEach((track) => {
//                 peerConnection.current?.addTrack(track, stream);
//             });

//             // Create and send answer
//             const answer = await peerConnection.current.createAnswer();
//             await peerConnection.current.setLocalDescription(answer);

//             socket.emit("answer", { roomId: "room1", answer });
//             console.log("📤 Answer sent");
//         });

//         // Receive Answer
//         socket.on("answer", async (answer) => {
//             console.log("📩 Answer received");
//             await peerConnection.current?.setRemoteDescription(
//                 new RTCSessionDescription(answer)
//             );
//         });

//         // Receive ICE candidate from remote
//         socket.on("ice-candidate", async (candidate) => {
//             console.log("🧊 ICE candidate received");
//             try {
//                 await peerConnection.current?.addIceCandidate(candidate);
//             } catch (err) {
//                 console.log("ICE error:", err);
//             }
//         });

//         peerConnection.current.oniceconnectionstatechange = () => {
//             console.log(
//                 "ICE connection state:",
//                 peerConnection.current?.iceConnectionState
//             );
//         };

//         return () => {
//             peerConnection.current?.close();
//             peerConnection.current = null;
//             setLocalStream(null);
//             setRemoteStream(null);
//         };
//     }, [socket]);

//     const startCall = async () => {
//         console.log("📞 Starting call");

//         if (!peerConnection.current) return;

//         const stream = await mediaDevices.getUserMedia({
//             video: true,
//             audio: true,
//         });
//         setLocalStream(stream);

//         // Add local tracks to connection
//         stream.getTracks().forEach((track) => {
//             peerConnection.current?.addTrack(track, stream);
//         });

//         // Create offer
//         const offer = await peerConnection.current.createOffer();
//         await peerConnection.current.setLocalDescription(offer);

//         socket?.emit("offer", { roomId: "room1", offer });
//         console.log("📤 Offer sent");
//     };

//     return (
//         <View style={{ flex: 1 }}>
//             {localStream && (
//                 <RTCView
//                     streamURL={localStream.toURL()}
//                     style={{ width: "100%", height: 250 }}
//                 />
//             )}
//             {remoteStream && (
//                 <RTCView
//                     streamURL={remoteStream.toURL()}
//                     style={{ width: "100%", height: 250 }}
//                 />
//             )}
//             <Button title="Start Call" onPress={startCall} />
//         </View>
//     );
// }


import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";

import {
    RTCPeerConnection,
    RTCView,
    mediaDevices,
    RTCSessionDescription,
} from "react-native-webrtc";

import { useSocket } from "@/context/socket-context";
import { Ionicons } from "@expo/vector-icons";

const configuration = {
    iceServers: [
        { urls: "stun:stun.l.google.com:19302" }
    ]
};

export default function CallScreen() {

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

        socket.emit("join-room", "room1");

        peerConnection.current.ontrack = (event) => {
            if (event.streams?.[0]) {
                setRemoteStream(event.streams[0]);
            }
        };

        peerConnection.current.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit("ice-candidate", {
                    roomId: "room1",
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

        socket?.emit("offer", { roomId: "room1", offer });

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
            roomId: "room1",
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
            roomId: "room1",
            enabled
        });

    };

    const endCall = () => {

        localStream?.getTracks().forEach(track => track.stop());
        peerConnection.current?.close();

        setLocalStream(null);
        setRemoteStream(null);
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

            {/* ⭐ Incoming Call UI */}
            {incomingCall && (
                <View style={styles.callBox}>

                    <Text style={{ color: "white", fontSize: 18 }}>
                        Incoming Call...
                    </Text>

                    <View style={{ flexDirection: "row", marginTop: 20 }}>

                        <TouchableOpacity
                            style={[styles.btn, { backgroundColor: "green" }]}
                            onPress={acceptCall}
                        >
                            <Text style={{ color: "white" }}>Accept</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.btn, { backgroundColor: "red", marginLeft: 20 }]}
                            onPress={rejectCall}
                        >
                            <Text style={{ color: "white" }}>Decline</Text>
                        </TouchableOpacity>

                    </View>

                </View>
            )}

            {/* ⭐ Controls */}
            <View style={styles.controls}>

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

            </View>

            <TouchableOpacity style={styles.startBtn} onPress={startCall}>
                <Text style={{ color: "white" }}>Start Call</Text>
            </TouchableOpacity>

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
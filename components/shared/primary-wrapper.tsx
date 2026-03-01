// import React, { ReactNode, useRef } from "react";
// import {
//     Animated,
//     Dimensions,
//     PanResponder,
//     ScrollView,
//     StyleSheet,
//     View,
// } from "react-native";

// const SCREEN_HEIGHT = Dimensions.get("window").height;

// interface DraggableSheetProps {
//     children: ReactNode;
//     closeThreshold?: number;
//     onClose?: () => void;
// }

// export default function DraggableSheet({
//     children,
//     closeThreshold = 120,
//     onClose,
// }: DraggableSheetProps) {
//     const translateY = useRef(new Animated.Value(0)).current;

//     const panResponder = useRef(
//         PanResponder.create({
//             onMoveShouldSetPanResponder: (_, gestureState) =>
//                 Math.abs(gestureState.dy) > 5,

//             onPanResponderMove: (_, gestureState) => {
//                 if (gestureState.dy > 0) {
//                     translateY.setValue(gestureState.dy);
//                 }
//             },

//             onPanResponderRelease: (_, gestureState) => {
//                 if (gestureState.dy > closeThreshold) {
//                     Animated.timing(translateY, {
//                         toValue: SCREEN_HEIGHT - 430,
//                         duration: 250,
//                         useNativeDriver: true,
//                     }).start(() => onClose?.());
//                 } else {
//                     Animated.spring(translateY, {
//                         toValue: 0,
//                         useNativeDriver: true,
//                     }).start();
//                 }
//             },
//         })
//     ).current;

//     return (
//         <Animated.View
//             {...panResponder.panHandlers}
//             style={[styles.sheet, { transform: [{ translateY }] }]}
//         >
//             <View style={styles.dragIndicator} />
//             <ScrollView style={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>{children}</ScrollView>
//         </Animated.View>
//     );
// }

// const styles = StyleSheet.create({
//     sheet: {
//         flex: 1,
//         backgroundColor: "#fff",
//         borderTopLeftRadius: 30,
//         borderTopRightRadius: 30,
//         width: "100%",
//         paddingHorizontal: 16,
//         paddingTop: 10,
//         overflow: "hidden",
//     },

//     dragIndicator: {
//         alignSelf: "center",
//         width: 40,
//         height: 4,
//         borderRadius: 2,
//         backgroundColor: "#E0E0E0",
//         marginBottom: 12,
//     },
// });



import React, { ReactNode, useRef } from "react";
import {
    Animated,
    Dimensions,
    PanResponder,
    StyleSheet,
    View
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;

interface DraggableSheetProps {
    children: ReactNode;
    closeThreshold?: number;
    onClose?: () => void;
}

export default function PrimaryWrapper({
    children,
    closeThreshold = 120,
    onClose,
}: DraggableSheetProps) {
    const translateY = useRef(new Animated.Value(0)).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) =>
                Math.abs(gestureState.dy) > 5,

            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dy > 0) {
                    translateY.setValue(gestureState.dy);
                }
            },

            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > closeThreshold) {
                    Animated.timing(translateY, {
                        toValue: SCREEN_HEIGHT - 430,
                        duration: 250,
                        useNativeDriver: true,
                    }).start(() => onClose?.());
                } else {
                    Animated.spring(translateY, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    return (
        <View style={styles.sheet}>
            <View style={styles.dragIndicator} />
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    sheet: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width: "100%",
        paddingHorizontal: 16,
        paddingTop: 10,
        overflow: "hidden",
    },

    dragIndicator: {
        alignSelf: "center",
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: "#E0E0E0",
        marginBottom: 12,
    },
});
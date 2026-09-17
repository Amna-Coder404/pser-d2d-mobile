
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function OfflineCard({ onClose, text }) {
    return (
        <View style={styles.overlay}>
            <View style={styles.card}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                        name="wifi-off"
                        size={32}
                        color="#B3261E"
                    />
                </View>

                <Text style={styles.title}>
                    You are Offline
                </Text>

                <Text style={styles.message}>
                    {text || " Please connect to the internet!"}

                </Text>

                <TouchableOpacity
                    style={styles.okButton}
                    onPress={onClose}
                    activeOpacity={0.8} >
                    <Text style={styles.okButtonText}>
                        OK
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: "rgba(0, 0, 0, 0.25)",
        zIndex: 999,
    },

    card: {
        width: "85%",
        padding: 22,
        borderRadius: 18,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E5E5E5",
    },

    iconContainer: {
        width: 62,
        height: 62,
        borderRadius: 31,
        backgroundColor: "#FDECEC",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 14,
    },

    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1F1F1F",
        marginBottom: 7,
    },

    message: {
        fontSize: 14,
        color: "#666666",
        textAlign: "center",
        lineHeight: 21,
        marginBottom: 20,
    },

    okButton: {
        width: "100%",
        height: 46,
        borderRadius: 12,
        backgroundColor: "#0B6B4F",
        alignItems: "center",
        justifyContent: "center",
    },

    okButtonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },
});


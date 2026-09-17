
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function OfflineBanner() {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons
                name="wifi-off"
                size={17}
                color="#FFFFFF"
            />

            <Text style={styles.text}>
                No Internet Connection
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 38,
        backgroundColor: "#B3261E",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
    },

    text: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "600",
    },
});


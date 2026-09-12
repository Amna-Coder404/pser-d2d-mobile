import { StyleSheet, Text, View } from "react-native";
import COLOR from "../constant/colors";

const NotFound = ({ text }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {text}
            </Text>
        </View>
    );
};

export default NotFound;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

        paddingVertical: 50,
        width: "100%",
    },

    text: {
        fontSize: 15,
        color: COLOR.textSecondary,
        textAlign: "center",
    },
});
import { StyleSheet } from "react-native";
import COLOR from "../constant/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
        backgroundColor: COLOR.background,
    },

    title: {
        fontSize: 32,
        fontWeight: "700",
        textAlign: "center",
        color: COLOR.text,
    },

    subtitle: {
        fontSize: 18,
        textAlign: "center",
        color: COLOR.textSecondary,
        marginTop: 6,
        marginBottom: 32,
    },

    input: {
        height: 52,
        borderWidth: 1,
        borderColor: COLOR.border,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 14,
        color: COLOR.text,
        backgroundColor: COLOR.surface,
    },

    error: {
        color: COLOR.error,
        fontSize: 14,
        marginBottom: 12,
    },

    button: {
        height: 52,
        borderRadius: 10,
        backgroundColor: COLOR.primary,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 6,
    },

    disabledButton: {
        opacity: 0.6,
    },

    buttonText: {
        color: COLOR.white,
        fontSize: 16,
        fontWeight: "600",
    },
});

export default styles;
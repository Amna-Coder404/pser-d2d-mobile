import { StyleSheet } from "react-native";
import COLOR from "../constant/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.background,
    },

    content: {
        padding: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        color: COLOR.text,
        marginBottom: 6,
    },

    subtitle: {
        fontSize: 14,
        color: COLOR.textSecondary,
        marginBottom: 20,
    },

    draftCard: {
        backgroundColor: COLOR.surface,
        borderWidth: 1,
        borderColor: COLOR.border,
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
    },

    draftTitle: {
        fontSize: 17,
        fontWeight: "600",
        color: COLOR.text,
        marginBottom: 6,
    },

    draftText: {
        fontSize: 14,
        color: COLOR.textSecondary,
        lineHeight: 20,
    },

    draftDate: {
        fontSize: 12,
        color: COLOR.placeholder,
        marginTop: 10,
    },

    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 60,
    },

    emptyText: {
        fontSize: 15,
        color: COLOR.textSecondary,
        textAlign: "center",
    },

    button: {
        backgroundColor: COLOR.primary,
        height: 48,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 16,
    },

    buttonText: {
        color: COLOR.white,
        fontSize: 15,
        fontWeight: "600",
    },
});

export default styles;
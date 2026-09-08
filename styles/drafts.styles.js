import { StyleSheet } from "react-native";
import COLOR from "../constant/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.background,
        paddingHorizontal: 20
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

    // Draft Card
    darftCard: {
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        overflow: "hidden",
    },

    name: {
        fontSize: 18,
        fontWeight: "bold",
    },

    leftBtn: {
        flex: 1,
        padding: 14,
        gap: 4,
        justifyContent: "center",
    },

    rightBtn: {
        backgroundColor: "#86000063",
        width: 65,
        alignItems: "center",
        justifyContent: "center",
    },

    conSur: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
    },

    text: {
        color: COLOR.primary,
        fontWeight: "500",
        fontSize: 17,
    },
});

export default styles;
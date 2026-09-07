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

    header: {
        marginBottom: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        color: COLOR.text,
    },

    subtitle: {
        fontSize: 14,
        color: COLOR.textSecondary,
        marginTop: 6,
    },

    surveyCard: {
        backgroundColor: COLOR.surface,
        borderWidth: 1,
        borderColor: COLOR.border,
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
    },

    surveyTitle: {
        fontSize: 17,
        fontWeight: "600",
        color: COLOR.text,
        marginBottom: 8,
    },

    surveyInfo: {
        fontSize: 14,
        color: COLOR.textSecondary,
        marginBottom: 4,
    },

    status: {
        alignSelf: "flex-start",
        backgroundColor: COLOR.background,
        borderWidth: 1,
        borderColor: COLOR.border,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 8,
    },

    statusText: {
        fontSize: 12,
        fontWeight: "600",
        color: COLOR.primary,
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
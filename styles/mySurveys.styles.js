
import { StyleSheet } from "react-native";

import COLOR from "../constant/colors";

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLOR.background,
        paddingHorizontal: 16,
        paddingTop: 20,
    },

    header: {
        marginBottom: 20,
    },
    back: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    backButton: {
        width: 42,
        height: 42,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLOR.card,
        borderWidth: 1,
        borderColor: COLOR.border,
        marginRight: 12,
    },

    title: {
        flex: 1,
        fontSize: 28,
        fontWeight: "700",
        color: COLOR.text,
    },
    subtitle: {
        fontSize: 15,
        color: COLOR.textSecondary,
        marginLeft: 54,
        lineHeight: 21,
    },

    surveyCard: {
        backgroundColor: COLOR.card,
        borderRadius: 14,
        padding: 16,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: COLOR.border,
    },

    surveyTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: COLOR.primary,
    },

    divider: {
        height: 1,
        backgroundColor: COLOR.border,
        marginVertical: 12,
    },

    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingVertical: 7,
        gap: 12,
    },

    label: {
        fontSize: 15,
        fontWeight: "600",
        color: COLOR.textSecondary,
        flex: 1,
    },

    value: {
        fontSize: 15,
        color: COLOR.text,
        textAlign: "right",
        flex: 1.5,
    },

});

export default styles;


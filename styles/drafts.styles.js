
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
        marginBottom: 22,
    },

    headerTop: {
        flexDirection: "row",
        alignItems: "center",
    },

    backButton: {
        width: 46,
        height: 46,
        borderRadius: 15,
        backgroundColor: COLOR.primary,

        alignItems: "center",
        justifyContent: "center",

        marginRight: 13,

        elevation: 4,
        shadowColor: COLOR.primary,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },

    headerText: {
        flex: 1,
    },

    title: {
        fontSize: 25,
        fontWeight: "800",
        color: COLOR.text,
        letterSpacing: -0.5,
    },

    subtitle: {
        fontSize: 13,
        color: COLOR.textSecondary,
        marginTop: 3,
        lineHeight: 18,
    },

    back: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },


    // Draft Card
    draftCard: {
        backgroundColor: COLOR.surface,
        borderRadius: 20,
        padding: 16,
        marginBottom: 14,

        borderWidth: 1,
        borderColor: COLOR.border,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 3,
    },

    // Top
    topSection: {
        flexDirection: "row",
        alignItems: "center",
    },

    personIcon: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: "#EFF6FF",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    nameContainer: {
        flex: 1,
        marginRight: 8,
    },

    name: {
        fontSize: 17,
        fontWeight: "700",
        color: COLOR.text,
    },

    draftLabel: {
        fontSize: 13,
        color: COLOR.textSecondary,
        marginTop: 3,
    },

    stepBadge: {
        backgroundColor: "#EFF6FF",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
    },

    stepText: {
        fontSize: 12,
        fontWeight: "700",
        color: COLOR.primary,
    },

    // Progress
    progressSection: {
        marginTop: 18,
    },

    progressHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 7,
    },

    progressLabel: {
        fontSize: 13,
        fontWeight: "600",
        color: COLOR.textSecondary,
    },

    progressPercent: {
        fontSize: 13,
        fontWeight: "700",
        color: COLOR.primary,
    },

    progressTrack: {
        height: 7,
        backgroundColor: COLOR.border,
        borderRadius: 10,
        overflow: "hidden",
    },

    progressFill: {
        height: "100%",
        backgroundColor: COLOR.primary,
        borderRadius: 10,
    },

    // Actions
    actions: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 18,
        gap: 10,
    },

    continueButton: {
        flex: 1,
        height: 48,
        borderRadius: 13,
        backgroundColor: COLOR.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },

    continueText: {
        fontSize: 15,
        fontWeight: "700",
        color: COLOR.white,
    },

    deleteButton: {
        width: 48,
        height: 48,
        borderRadius: 13,
        backgroundColor: "#FEF2F2",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#FECACA",
    },

    offlineOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        zIndex: 100,
    },
});

export default styles;


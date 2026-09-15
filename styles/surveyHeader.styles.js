import { StyleSheet } from "react-native";
import COLOR from "../constant/colors";

export default StyleSheet.create({

    container: {
        backgroundColor: COLOR.background,

    },

    infoCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 16,
        borderWidth: 1,
        borderColor: COLOR.border,
        marginBottom: 16,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.06,
        shadowRadius: 5,
        elevation: 2,
    },

    logoContainer: {
        width: 58,
        height: 58,
        borderRadius: 16,
        backgroundColor: `${COLOR.primary}12`,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
    },

    infoText: {
        flex: 1,
    },

    mainTitle: {
        fontSize: 22,
        fontWeight: "800",
        color: COLOR.primary,
        marginBottom: 2,
    },

    subtitle: {
        fontSize: 13,
        fontWeight: "600",
        color: COLOR.text,
    },

    description: {
        fontSize: 12,
        color: COLOR.textSecondary,
        marginTop: 3,
    },

    progressContainer: {

        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        paddingHorizontal: 8,

    },

    stepWrapper: {
        flex: 1,
        alignItems: "center",
    },

    stepRow: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
    },

    circle: {
        width: 58,
        height: 58,
        borderRadius: 40,
        backgroundColor: "#E2E8F0",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#CBD5E1",
    },

    activeCircle: {
        backgroundColor: COLOR.primary,
        borderColor: COLOR.primary,
    },

    stepNumber: {
        fontSize: 15,
        fontWeight: "700",
        color: "#64748B",
    },

    activeStepNumber: {
        color: "#FFFFFF",
    },

    line: {
        flex: 1,
        height: 3,
        backgroundColor: "#E2E8F0",
        marginHorizontal: 5,
    },

    activeLine: {
        backgroundColor: COLOR.primary,
    },

    stepTitle: {
        marginTop: 7,
        fontSize: 11,
        fontWeight: "600",
        color: "#64748B",
        textAlign: "center",
    },

    activeStepTitle: {
        color: COLOR.primary,
        fontWeight: "800",
    },

    completedStepTitle: {
        color: COLOR.primary,
    },
});
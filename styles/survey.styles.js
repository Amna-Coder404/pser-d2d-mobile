import { StyleSheet } from "react-native";
import COLOR from "../constant/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.background,
        paddingHorizontal: 24,
        paddingVertical: 40,
    },

    content: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
        gap: 12
    },



    title: {
        fontSize: 24,
        fontWeight: "700",
        color: COLOR.text,
        marginBottom: 24,
    },

    label: {
        fontSize: 15,
        fontWeight: "600",
        color: COLOR.text,
        marginBottom: 8,
        marginTop: 16,
    },

    input: {
        height: 52,
        borderWidth: 1,
        borderColor: COLOR.border,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        color: COLOR.text,
        backgroundColor: COLOR.surface,
    },

    options: {
        flexDirection: "row",
        gap: 12,
    },

    option: {
        flex: 1,
        height: 52,
        borderWidth: 1,
        borderColor: COLOR.border,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLOR.surface,
    },

    selectedOption: {
        borderColor: COLOR.primary,
        backgroundColor: COLOR.primary,
    },

    optionText: {
        fontSize: 16,
        fontWeight: "600",
        color: COLOR.text,
    },

    selectedOptionText: {
        color: "#FFFFFF",
    },

    errors: {
        color: COLOR.error,
        fontSize: 13,
        marginTop: 5,
    },

    backButton: {
        alignSelf: "flex-start",
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: COLOR.surface,
        borderWidth: 1,
        borderColor: COLOR.border,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 18,
    },

    stepText: {
        fontSize: 14,
        color: COLOR.textSecondary,
        marginTop: -16,
    },

    formContainer: {
        flex: 1,
        marginTop: 30,
    },

    buttonRow: {
        flexDirection: "row",
        gap: 10,
    },

    previousButton: {
        flex: 1,
        height: 54,
        borderRadius: 14,
        backgroundColor: COLOR.surface,
        borderWidth: 1,
        borderColor: COLOR.border,
        justifyContent: "center",
        alignItems: "center",
    },

    previousButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: COLOR.text,
    },

    nextButton: {
        flex: 1,
        height: 54,
        borderRadius: 14,
        backgroundColor: COLOR.primary,
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#FFFFFF",
    },
});

export default styles;
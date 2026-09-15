import { StyleSheet } from "react-native";
import COLOR from "../constant/colors";

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLOR.background,
        alignItems: "center",
        paddingHorizontal: 22,
        paddingTop: 55,
    },
    keyboardContainer: {
        flex: 1,
    },

    scrollContent: {
        flexGrow: 1,
    },
    // LOGO

    logoContainer: {
        width: 92,
        height: 92,
        borderRadius: 28,
        backgroundColor: COLOR.surface,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 18,

        borderWidth: 1,
        borderColor: COLOR.border,

        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 10,
    },

    logo: {
        width: 72,
        height: 72,
    },

    // HEADER

    title: {
        fontSize: 30,
        fontWeight: "800",
        color: COLOR.text,
        letterSpacing: 0.5,
    },

    subtitle: {
        fontSize: 16,
        fontWeight: "600",
        color: COLOR.primary,
        marginTop: 5,
    },

    description: {
        fontSize: 13,
        color: COLOR.textSecondary,
        textAlign: "center",
        marginTop: 8,
        marginBottom: 24,
    },

    // FORM CARD

    formCard: {
        width: "100%",
        backgroundColor: COLOR.surface,
        borderRadius: 24,
        padding: 20,

        borderWidth: 1,
        borderColor: COLOR.border,

        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.06,
        shadowRadius: 12,
    },

    formTitle: {
        fontSize: 21,
        fontWeight: "700",
        color: COLOR.text,
    },

    formSubtitle: {
        fontSize: 13,
        color: COLOR.textSecondary,
        marginTop: 5,
        marginBottom: 20,
    },

    // INPUTS

    input: {
        width: "100%",
        height: 54,
        backgroundColor: COLOR.background,

        borderWidth: 1,
        borderColor: COLOR.border,
        borderRadius: 14,

        paddingHorizontal: 16,
        fontSize: 15,
        color: COLOR.text,

        marginBottom: 13,
    },

    // ERROR

    errorBox: {
        backgroundColor: "#FEF2F2",
        borderWidth: 1,
        borderColor: "#FECACA",
        borderRadius: 12,

        paddingHorizontal: 13,
        paddingVertical: 10,

        marginBottom: 14,
    },

    error: {
        color: "#DC2626",
        fontSize: 13,
        fontWeight: "500",
    },

    // BUTTON

    button: {
        height: 54,
        borderRadius: 14,

        backgroundColor: COLOR.primary,

        alignItems: "center",
        justifyContent: "center",

        marginTop: 3,

        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6,
    },

    disabledButton: {
        opacity: 0.6,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

    // FOOTER

    footer: {
        fontSize: 12,
        color: COLOR.textSecondary,
        marginTop: 22,
    },
    passwordContainer: {
        position: "relative",
        width: "100%",
        marginBottom: 13,
    },

    passwordInput: {
        width: "100%",
        height: 54,
        backgroundColor: COLOR.background,

        borderWidth: 1,
        borderColor: COLOR.border,
        borderRadius: 14,

        paddingLeft: 16,
        paddingRight: 52,

        fontSize: 15,
        color: COLOR.text,
    },

    eyeButton: {
        position: "absolute",
        right: 4,
        top: 4,

        width: 46,
        height: 46,

        alignItems: "center",
        justifyContent: "center",
    },

});

export default styles;
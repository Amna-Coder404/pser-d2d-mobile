import { StyleSheet } from "react-native";
import COLOR from "../constant/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 24,
        backgroundColor: COLOR.background,
    },
    headerCard: {
        backgroundColor: COLOR.primary,

        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
    },

    appHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 18,
    },

    appLogo: {
        width: 48,
        height: 48,
    },

    appTitle: {
        flex: 1,
        fontSize: 22,
        fontWeight: "700",
        color: COLOR.white,
        marginLeft: 10,
    },

    menuButton: {
        width: 44,
        height: 44,
        borderRadius: 12,
        // backgroundColor: COLOR.profileCard,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: COLOR.border,
    },

    profileHeader: {
        flexDirection: "row",
        alignItems: "center",
    },

    profileInfo: {
        flex: 1,
        marginLeft: 12,
    },

    name: {
        fontSize: 19,
        fontWeight: "700",
        color: COLOR.white,
    },

    role: {
        fontSize: 14,
        color: COLOR.white,
        marginTop: 3,
    },




    avatar: {
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: COLOR.primary,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
    },




    // Dashboard Title
    titleSection: {
        marginBottom: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: "800",
        color: COLOR.text,
        marginBottom: 5,
    },

    subtitle: {
        fontSize: 15,
        color: COLOR.textSecondary,
    },

    // Dashboard Cards
    card: {
        flexDirection: "row",
        alignItems: "center",
        padding: 18,
        borderRadius: 16,
        backgroundColor: COLOR.surface,
        borderWidth: 1,
        borderColor: COLOR.border,
        marginBottom: 14,
    },

    startCard: {
        borderColor: COLOR.primary,
    },

    cardIcon: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: COLOR.background,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
    },

    iconText: {
        fontSize: 22,
        color: COLOR.primary,
        fontWeight: "700",
    },

    cardContent: {
        flex: 1,
    },

    cardTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: COLOR.text,
        marginBottom: 4,
    },

    cardDescription: {
        fontSize: 13,
        color: COLOR.textSecondary,
        lineHeight: 18,
    },

    arrow: {
        fontSize: 24,
        color: COLOR.primary,
        marginLeft: 10,
    },




});

export default styles;
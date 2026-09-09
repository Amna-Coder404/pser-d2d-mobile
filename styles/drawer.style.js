import { StyleSheet } from 'react-native'
import COLOR from '../constant/colors'

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLOR.background,
        padding: 20,
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
        // flex: 1,
        fontSize: 28,
        fontWeight: "700",
        color: COLOR.white
    },
    subtitle: {
        fontSize: 15,
        color: COLOR.textSecondary,
        marginLeft: 54,
        lineHeight: 21,
    },




    formContainer: {
        width: '100%',
    },

    label: {
        fontSize: 15,
        fontWeight: '600',
        color: COLOR.text,
        marginBottom: 8,
    },

    input: {
        height: 55,
        backgroundColor: COLOR.surface,
        borderWidth: 1,
        borderColor: COLOR.border,
        borderRadius: 14,
        paddingHorizontal: 16,
        color: COLOR.text,
        marginBottom: 20,
    },

    placeholder: {
        color: COLOR.placeholder,
    },

    button: {
        height: 55,
        backgroundColor: COLOR.primary,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },

    buttonText: {
        color: COLOR.white,
        fontSize: 16,
        fontWeight: '700',
    },
    error: {
        color: COLOR.error,
        fontSize: 12
    },

    // _______________ Drawer ____________________

    drawerContainer: {
        flex: 1,
        backgroundColor: COLOR.background,
    },

    drawerContent: {
        alignItems: "center",
        justifyContent: "center",

        backgroundColor: COLOR.primary,
        paddingHorizontal: 20,
        paddingTop: 35,
        paddingBottom: 28,

        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },

    drawerImage: {
        width: 88,
        height: 88,
        borderRadius: 44,

        backgroundColor: COLOR.white,

        borderWidth: 3,
        borderColor: COLOR.white,

        marginBottom: 14,
    },

    title: {
        fontSize: 21,
        fontWeight: "700",
        color: COLOR.white,
        marginBottom: 6,
    },

    text: {
        fontSize: 13,
        fontWeight: "500",
        color: COLOR.white,
        opacity: 0.85,
    },

    buttons: {
        paddingHorizontal: 16,
        paddingTop: 18,
    },

    drawerBtn: {
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: COLOR.surface,

        minHeight: 58,
        borderRadius: 14,

        paddingHorizontal: 15,
        marginBottom: 10,

        borderWidth: 1,
        borderColor: COLOR.border,
    },

    btnIcon: {
        fontSize: 21,
        color: COLOR.primary,
        marginRight: 14,
    },

    btnText: {
        color: COLOR.text,
        fontSize: 15,
        fontWeight: "600",
    },

    closeBtn: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },

    info: {
        flexDirection: "row",
        gap: 12,
        alignItems: "center"
    }
})

export default styles
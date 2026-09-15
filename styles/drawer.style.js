
import { StyleSheet } from 'react-native';
import COLOR from '../constant/colors';

const styles = StyleSheet.create({

    // 
    // CHANGE PASSWORD SCREEN
    // 

    container: {
        flex: 1,
        backgroundColor: COLOR.background,
        paddingHorizontal: 20,
        paddingTop: 20,
    },

    header: {
        marginBottom: 24,
        backgroundColor: COLOR.surface,
        padding: 12,
        borderRadius: 12
    },

    back: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    backButton: {
        width: 44,
        height: 44,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR.card,
        borderWidth: 1,
        borderColor: COLOR.border,
        marginRight: 12,
    },

    titleContainer: {
        flex: 1,
    },

    changePasswordTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: COLOR.text,
        marginBottom: 3,
    },

    subtitle: {
        fontSize: 13,
        color: COLOR.textSecondary,
        lineHeight: 19,
        paddingRight: 10,
    },


    // 
    // FORM
    // 

    formCard: {
        width: '100%',
        backgroundColor: COLOR.surface,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLOR.border,
        padding: 20,
    },

    formIconContainer: {
        width: 105,
        height: 105,
        borderRadius: 26,
        backgroundColor: `${COLOR.primary}15`,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 14,
    },

    formTitle: {
        fontSize: 19,
        fontWeight: '700',
        color: COLOR.text,
        marginBottom: 6,
    },

    formDescription: {
        fontSize: 13,
        lineHeight: 19,
        color: COLOR.textSecondary,
        marginBottom: 24,
    },



    // INPUTS


    label: {
        fontSize: 14,
        fontWeight: '600',
        color: COLOR.text,
        marginBottom: 8,
    },

    inputContainer: {
        height: 54,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLOR.surface,
        borderWidth: 1,
        borderColor: COLOR.border,
        borderRadius: 14,
        paddingHorizontal: 14,
        marginBottom: 18,
    },

    input: {
        flex: 1,
        height: '100%',
        color: COLOR.text,
        fontSize: 15,
        marginLeft: 10,
    },

    placeholder: {
        color: COLOR.placeholder,
    },



    // ERROR


    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: `${COLOR.error}10`,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 12,
    },

    error: {
        flex: 1,
        color: COLOR.error,
        fontSize: 13,
        lineHeight: 18,
        marginLeft: 7,
    },



    // BUTTON


    button: {
        height: 54,
        backgroundColor: COLOR.primary,
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
        gap: 8,
    },

    buttonDisabled: {
        opacity: 0.7,
    },

    buttonText: {
        color: COLOR.white,
        fontSize: 15,
        fontWeight: '700',
    },



    // REACT NATIVE PAPER DIALOG


    dialog: {
        backgroundColor: COLOR.surface,
        borderRadius: 22,

    },

    dialogIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
    },

    dialogTitle: {
        color: COLOR.text,
        textAlign: 'center',
        fontSize: 21,
        fontWeight: '700',
    },

    dialogText: {
        color: COLOR.textSecondary,
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 21,
    },

    dialogButton: {
        borderRadius: 10,
        paddingHorizontal: 10,
    },



    // DRAWER


    drawerContainer: {
        flex: 1,
        backgroundColor: COLOR.background,
    },

    drawerContent: {
        alignItems: 'center',
        justifyContent: 'center',

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
        fontWeight: '700',
        color: COLOR.white,
        marginBottom: 6,
    },

    text: {
        fontSize: 13,
        fontWeight: '500',
        color: COLOR.white,
        opacity: 0.85,
    },

    buttons: {
        paddingHorizontal: 16,
        paddingTop: 18,
    },

    drawerBtn: {
        flexDirection: 'row',
        alignItems: 'center',

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
        fontWeight: '600',
    },

    closeBtn: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },

    info: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
    },

});

export default styles;


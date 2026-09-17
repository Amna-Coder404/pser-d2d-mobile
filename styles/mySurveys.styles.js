
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




    // Survey Card


    surveyCard: {
        marginBottom: 16,
        borderRadius: 18,
        backgroundColor: COLOR.surface,
        overflow: "hidden",

        elevation: 3,

        shadowColor: COLOR.primary,

        shadowOpacity: 0.07,
        shadowRadius: 8,
        borderColor: COLOR.placeholder
    },

    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 13,
    },

    personImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: COLOR.border,
        marginRight: 12,
    },

    personImagePlaceholder: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: `${COLOR.primary}15`,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,

        borderWidth: 1,
        borderColor: `${COLOR.primary}25`,
    },

    personInitial: {
        fontSize: 28,
        fontWeight: "700",
        color: COLOR.primary,
    },

    titleContainer: {
        flex: 1,
        justifyContent: "center",
    },

    surveyTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: COLOR.text,
    },

    surveySubtitle: {
        fontSize: 12,
        color: COLOR.textSecondary,
        marginTop: 4,
    },

    expandButton: {
        margin: 0,
        backgroundColor: `${COLOR.primary}10`,
    },

    chevron: {
        color: COLOR.primary,
    },


    // Details


    divider: {
        height: 1,
        backgroundColor: COLOR.border,
        marginVertical: 12,
    },

    detailsHeader: {
        marginBottom: 4,
        marginTop: 2,
    },

    detailsTitle: {
        fontSize: 13,
        fontWeight: "800",
        color: COLOR.primary,
        textTransform: "uppercase",
        letterSpacing: 0.6,
    },

    sectionDivider: {
        height: 1,
        backgroundColor: COLOR.border,
        marginVertical: 10,
    },

    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingVertical: 8,
    },

    label: {
        flex: 1,
        fontSize: 14,
        fontWeight: "600",
        color: COLOR.textSecondary,
    },

    value: {
        flex: 1.5,
        fontSize: 14,
        fontWeight: "500",
        color: COLOR.text,
        textAlign: "right",
        marginLeft: 12,
        lineHeight: 20,
    },


    // Status Badges


    statusBadge: {
        minWidth: 52,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        alignItems: "center",
    },

    yesBadge: {
        backgroundColor: `${COLOR.primary}15`,
    },

    noBadge: {
        backgroundColor: "#F1F5F9",
    },

    statusText: {
        fontSize: 12,
        fontWeight: "700",
    },

    yesText: {
        color: COLOR.primary,
    },

    noText: {
        color: COLOR.textSecondary,
    },
});

export default styles;


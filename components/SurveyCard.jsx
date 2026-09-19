
import { useRef, useState } from "react";
import {
    Animated,
    Easing,
    Image,
    Text,
    View,
} from "react-native";
import { Card, IconButton } from "react-native-paper";

import styles from "../styles/mySurveys.styles";
import { formatCNIC } from "../utils/cnic";

const SurveyCard = ({ item }) => {
    const [expanded, setExpanded] = useState(false);

    const animation = useRef(new Animated.Value(0)).current;

    const toggleExpanded = () => {
        const toValue = expanded ? 0 : 1;

        setExpanded(!expanded);

        Animated.timing(animation, {
            toValue,
            duration: 280,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }).start();
    };

    const rotate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"],
    });

    const detailsStyle = {
        opacity: animation,
        transform: [
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-8, 0],
                }),
            },
        ],
    };

    return (
        <Card style={styles.surveyCard}>
            {/* Header */}
            <Card.Content>
                <View style={styles.cardHeader}>

                    {item.person_image_url ? (
                        <Image
                            source={{ uri: item.person_image_url }}
                            style={styles.personImage}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={styles.personImagePlaceholder}>
                            <Text style={styles.personInitial}>
                                {item.person_name
                                    ?.charAt(0)
                                    ?.toUpperCase() || "?"}
                            </Text>
                        </View>
                    )}

                    <View style={styles.titleContainer}>
                        <Text style={styles.surveyTitle}>
                            {item.person_name || "Unnamed Survey"}
                        </Text>

                        <Text style={styles.surveySubtitle}>
                            Survey Details
                        </Text>
                    </View>

                    <Animated.View
                        style={{
                            transform: [{ rotate }],
                        }}
                    >
                        <IconButton
                            icon="chevron-down"
                            size={25}
                            iconColor={styles.chevron.color}
                            onPress={toggleExpanded}
                            style={styles.expandButton}
                        />
                    </Animated.View>
                </View>
            </Card.Content>

            {/* Details */}
            {expanded && (
                <Animated.View style={detailsStyle}>
                    <Card.Content>

                        <View style={styles.divider} />

                        {/* Personal Information */}
                        <View style={styles.detailsHeader}>
                            <Text style={styles.detailsTitle}>
                                Personal Information
                            </Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Phone</Text>
                            <Text style={styles.value}>
                                {item.phone_number || "Not provided"}
                            </Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Age</Text>
                            <Text style={styles.value}>
                                {item.age || "Not provided"}
                            </Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Address</Text>
                            <Text style={styles.value}>
                                {item.address || "Not provided"}
                            </Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Education</Text>
                            <Text style={styles.value}>
                                {item.education || "Not provided"}
                            </Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>CNIC No.</Text>
                            <Text style={styles.value}>

                                {formatCNIC(item.cnic) || "Not provided"}
                            </Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Occupation</Text>
                            <Text style={styles.value}>
                                {item.occupation || "Not provided"}
                            </Text>
                        </View>

                        <View style={styles.sectionDivider} />

                        {/* Household Information */}
                        <View style={styles.detailsHeader}>
                            <Text style={styles.detailsTitle}>
                                Household Information
                            </Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>
                                Has House
                            </Text>

                            <View
                                style={[
                                    styles.statusBadge,
                                    item.has_house
                                        ? styles.yesBadge
                                        : styles.noBadge,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.statusText,
                                        item.has_house
                                            ? styles.yesText
                                            : styles.noText,
                                    ]}
                                >
                                    {item.has_house ? "Yes" : "No"}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>
                                Has Illness
                            </Text>

                            <View
                                style={[
                                    styles.statusBadge,
                                    item.has_illness
                                        ? styles.yesBadge
                                        : styles.noBadge,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.statusText,
                                        item.has_illness
                                            ? styles.yesText
                                            : styles.noText,
                                    ]}
                                >
                                    {item.has_illness ? "Yes" : "No"}
                                </Text>
                            </View>
                        </View>

                        {item.has_illness && (
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>
                                    Illness Details
                                </Text>

                                <Text style={styles.value}>
                                    {item.illness_details ||
                                        "Not provided"}
                                </Text>
                            </View>
                        )}

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>
                                Marital Status
                            </Text>

                            <Text style={styles.value}>
                                {item.marital_status || "Not provided"}
                            </Text>
                        </View>

                    </Card.Content>
                </Animated.View>
            )}
        </Card>
    );
};

export default SurveyCard;


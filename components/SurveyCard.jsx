
import { Text, View } from "react-native";

import styles from "../styles/mySurveys.styles";

const SurveyCard = ({ item }) => {
    return (
        <View style={styles.surveyCard}>

            <Text style={styles.surveyTitle}>
                {item.person_name || "Unnamed Survey"}
            </Text>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
                <Text style={styles.label}>Phone</Text>
                <Text style={styles.value}>{item.phone_number}</Text>
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>Age</Text>
                <Text style={styles.value}>{item.age}</Text>
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>Address</Text>
                <Text style={styles.value}>{item.address}</Text>
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>Education</Text>
                <Text style={styles.value}>{item.education}</Text>
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>Occupation</Text>
                <Text style={styles.value}>{item.occupation}</Text>
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>Has House</Text>
                <Text style={styles.value}>
                    {item.has_house ? "Yes" : "No"}
                </Text>
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>Has Illness</Text>
                <Text style={styles.value}>
                    {item.has_illness ? "Yes" : "No"}
                </Text>
            </View>

            {item.has_illness && (
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Illness Details</Text>
                    <Text style={styles.value}>
                        {item.illness_details || "Not provided"}
                    </Text>
                </View>
            )}

            <View style={styles.infoRow}>
                <Text style={styles.label}>Marital Status</Text>
                <Text style={styles.value}>
                    {item.marital_status}
                </Text>
            </View>

        </View>
    );
};

export default SurveyCard;


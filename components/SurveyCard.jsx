
import { Text, View } from "react-native";

import { Image } from "react-native";
import styles from "../styles/mySurveys.styles";

const SurveyCard = ({ item }) => {
    console.log("SURVEY IMAGE URL:", item.person_image_url);
    return (
        <View style={styles.surveyCard}>
            {/* Person Image */}
            {item.person_image_url ? (
                <Image
                    source={{ uri: item.person_image_url }}
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: 60,
                        alignSelf: "center",
                        marginBottom: 12,
                        backgroundColor: "#ddd",
                    }}
                    resizeMode="cover"
                    onLoad={() => console.log("IMAGE LOADED")}
                    onError={(error) => {
                        console.log("IMAGE LOAD ERROR:", error.nativeEvent);
                    }}
                />
            ) : null}

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
                <Text style={styles.label}>CNIC No.</Text>
                <Text style={styles.value}>{item.cnic}</Text>
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


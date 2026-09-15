
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

import COLOR from "../constant/colors";
import styles from "../styles/drafts.styles";

const DraftCard = ({ item, onNext, onDelete }) => {
    const currentStep = item.current_step || 1;
    const progress = currentStep / 3;

    return (
        <View style={styles.draftCard}>
            {/* Top Section */}
            <View style={styles.topSection}>
                <View style={styles.personIcon}>
                    <Ionicons
                        name="document-text-outline"
                        size={24}
                        color={COLOR.primary}
                    />
                </View>

                <View style={styles.nameContainer}>
                    <Text style={styles.name} numberOfLines={1}>
                        {item.person_name || "Unnamed Survey"}
                    </Text>

                    <Text style={styles.draftLabel}>
                        Saved draft
                    </Text>
                </View>

                <View style={styles.stepBadge}>
                    <Text style={styles.stepText}>
                        Part {currentStep} / 3
                    </Text>
                </View>
            </View>

            {/* Progress */}
            <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                    <Text style={styles.progressLabel}>
                        Survey progress
                    </Text>

                    <Text style={styles.progressPercent}>
                        {Math.round(progress * 100)}%
                    </Text>
                </View>

                <View style={styles.progressTrack}>
                    <View
                        style={[
                            styles.progressFill,
                            { width: `${progress * 100}% ` },
                        ]}
                    />
                </View>
            </View>

            {/* Actions */}
            <View style={styles.actions}>
                <TouchableOpacity
                    onPress={onNext}
                    activeOpacity={0.8}
                    style={styles.continueButton}
                >
                    <Text style={styles.continueText}>
                        Continue Survey
                    </Text>

                    <Ionicons
                        name="arrow-forward"
                        size={20}
                        color={COLOR.white}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onDelete}
                    activeOpacity={0.7}
                    style={styles.deleteButton}
                >
                    <Ionicons
                        name="trash-outline"
                        size={21}
                        color={COLOR.error}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DraftCard;


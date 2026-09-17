import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { useRouter } from "expo-router";
import { Appbar } from 'react-native-paper';
import COLOR from "../constant/colors";
import styles from "../styles/surveyHeader.styles";



const steps = [
    {
        title: "Personal",
        icon: "person-outline",
    },
    {
        title: "Education",
        icon: "school-outline",
    },
    {
        title: "Household",
        icon: "home-outline",
    },
];

const SurveyHeader = ({ currentStep }) => {
    const router = useRouter()
    return (
        <View style={styles.container}>

            <Appbar.BackAction

                onPress={() => router.back()}
                style={styles.backButton}
                iconColor="#FFFFFF"

            />
            {/* PSER Info */}
            <View style={styles.infoCard}>

                <View style={styles.logoContainer}>
                    <Ionicons
                        name="people-outline"
                        size={32}
                        color={COLOR.primary}
                    />
                </View>

                <View style={styles.infoText}>
                    <Text style={styles.mainTitle}>
                        PSER D2D
                    </Text>

                    <Text style={styles.subtitle}>
                        Pakistan Social & Economic Registry
                    </Text>

                    <Text style={styles.description}>
                        Door-to-Door Survey
                    </Text>
                </View>

            </View>

            {/* Progress */}
            <View style={styles.progressContainer}>

                {steps.map((step, index) => {

                    const stepNumber = index + 1;

                    const isActive = currentStep === stepNumber;
                    const isCompleted = currentStep > stepNumber;

                    return (
                        <View key={stepNumber} style={styles.stepWrapper}   >

                            {/* Step + line */}
                            <View style={styles.stepRow}>

                                <View
                                    style={[
                                        styles.circle,
                                        (isActive || isCompleted) &&
                                        styles.activeCircle,
                                    ]}
                                >
                                    {isCompleted ? (
                                        <Ionicons
                                            name="checkmark"
                                            size={18}
                                            color="#FFFFFF"
                                        />
                                    ) : (
                                        <Text
                                            style={[
                                                styles.stepNumber,
                                                isActive &&
                                                styles.activeStepNumber,
                                            ]} >
                                            {stepNumber}
                                        </Text>
                                    )}
                                </View>

                                {index < steps.length - 1 && (
                                    <View
                                        style={[
                                            styles.line,
                                            currentStep > stepNumber &&
                                            styles.activeLine,
                                        ]}
                                    />
                                )}

                            </View>

                            {/* Label */}
                            <Text
                                style={[
                                    styles.stepTitle,
                                    isActive &&
                                    styles.activeStepTitle,
                                    isCompleted &&
                                    styles.completedStepTitle,
                                ]}
                            >
                                {step.title}
                            </Text>

                        </View>
                    );
                })}

            </View>

        </View>
    );
};

export default SurveyHeader;
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import OfflineCard from "../../components/Netinfo/OfflineCard";
import Form1 from "../../components/SurveyForm/form1";
import Form2 from "../../components/SurveyForm/form2";
import Form3 from "../../components/SurveyForm/form3";
import SurveyHeader from "../../components/SurveyHeader";
import { useNetworkStatus } from "../../hooks/useNetworkStatus";
import { useSurvey } from "../../hooks/useSurvey";
import { useAuthStore } from "../../store/authStore";
import styles from "../../styles/survey.styles";

const Survey = () => {
    const user = useAuthStore((state) => state.user);
    const { draftId } = useLocalSearchParams();

    const router = useRouter();

    const { isOnline } = useNetworkStatus();
    const [showOfflineCard, setShowOfflineCard] = useState(false);

    const form1Ref = useRef(null);
    const form2Ref = useRef(null);
    const form3Ref = useRef(null);

    const {
        formData,
        step,
        loading,
        updateField,
        nextStep,
        previousStep,
        submit,
        pickPersonImage,

    } = useSurvey(user, draftId);


    // HANDLE NEXT
    const handleNext = () => {
        let valid = false;

        if (step === 1) {
            valid = form1Ref.current?.validate();
        }

        if (step === 2) {
            valid = form2Ref.current?.validate();
        }

        if (!valid) return;
        nextStep();
    };


    // HANDLE BACK
    const handlePrevious = () => {
        if (step === 1) {
            router.back();
            return;
        }
        previousStep();
    };


    // HANDLE SUBMIT
    const handleSubmit = async () => {
        const valid = form3Ref.current?.validate();

        // Cannot submit while offline
        if (!isOnline) {
            setShowOfflineCard(true);
            return;
        }

        if (!valid) return;
        try {
            await submit();

            Alert.alert("Success",
                "Survey submitted successfully.",
                [
                    {
                        text: "OK",
                        onPress: () => router.replace("/"),
                    },
                ]
            );

        } catch (error) {
            Alert.alert("Error", "Failed to submit survey."
            );
        }
    };


    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "padding"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
            <View style={styles.container}>

                <ScrollView
                    style={styles.formContainer}
                    contentContainerStyle={styles.formContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                >

                    {step === 1 && (
                        <>
                            <SurveyHeader currentStep={step} />

                            <Form1
                                ref={form1Ref}
                                data={formData}
                                updateField={updateField}
                                onBack={handlePrevious}
                            />
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <SurveyHeader currentStep={step} />

                            <Form2
                                ref={form2Ref}
                                data={formData}
                                pickImage={pickPersonImage}
                                updateField={updateField}
                            />
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <SurveyHeader currentStep={step} />

                            <Form3
                                ref={form3Ref}
                                data={formData}
                                updateField={updateField}
                            />
                        </>
                    )}

                    {/* BUTTONS ARE NOW INSIDE SCROLLVIEW */}
                    <View style={styles.buttonRow}>

                        {step > 1 && (
                            <TouchableOpacity
                                onPress={handlePrevious}
                                style={styles.previousButton}
                            >
                                <Text style={styles.previousButtonText}>
                                    Previous
                                </Text>
                            </TouchableOpacity>
                        )}

                        {step < 3 ? (
                            <TouchableOpacity
                                onPress={handleNext}
                                style={styles.nextButton}
                            >
                                <Text style={styles.buttonText}>
                                    Next
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={handleSubmit}
                                disabled={loading}
                                style={styles.nextButton}
                            >
                                <Text style={styles.buttonText}>
                                    {loading
                                        ? "Submitting..."
                                        : "Submit Survey"}
                                </Text>
                            </TouchableOpacity>
                        )}

                    </View>

                </ScrollView>

                {/* Offline card */}
                {showOfflineCard && (
                    <OfflineCard
                        onClose={() => setShowOfflineCard(false)}
                        text={"Please connect to the internet before submitting this survey."}
                    />
                )}
            </View>
        </KeyboardAvoidingView>
    );
};

export default Survey;
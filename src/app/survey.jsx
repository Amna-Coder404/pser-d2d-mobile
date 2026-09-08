import { router, useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import {
    Alert,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import Form1 from "../../components/SurveyForm/form1";
import Form2 from "../../components/SurveyForm/form2";
import Form3 from "../../components/SurveyForm/form3";

import { useSurvey } from "../../hooks/useSurvey";
import { useAuthStore } from "../../store/authStore";
import styles from "../../styles/survey.styles";

const Survey = () => {
    const user = useAuthStore((state) => state.user);

    const { draftId } = useLocalSearchParams();

    console.log("id", draftId);

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

        if (!valid) return;
        try {
            await submit();

            Alert.alert(
                "Success",
                "Survey submitted successfully.",
                [
                    {
                        text: "OK",
                        onPress: () =>
                            router.replace("/"),
                    },
                ]
            );

        } catch (error) {

            Alert.alert(
                "Error",
                "Failed to submit survey."
            );
        }
    };


    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Start Survey
            </Text>

            <Text style={styles.stepText}>
                Part {step} of 3
            </Text>


            {/* FORM */}

            <View style={styles.formContainer}>

                {step === 1 && (
                    <Form1
                        ref={form1Ref}
                        data={formData}
                        updateField={updateField}
                        onBack={handlePrevious}
                    />
                )}

                {step === 2 && (
                    <Form2
                        ref={form2Ref}
                        data={formData}
                        updateField={updateField}
                    />
                )}

                {step === 3 && (
                    <Form3
                        ref={form3Ref}
                        data={formData}
                        updateField={updateField}
                    />
                )}

            </View>


            {/* BUTTONS */}

            <View style={styles.buttonRow}>

                {step > 1 && (

                    <TouchableOpacity
                        onPress={handlePrevious}
                        style={styles.previousButton}>
                        <Text style={styles.previousButtonText}>
                            Previous
                        </Text>
                    </TouchableOpacity>
                )}


                {step < 3 ? (

                    <TouchableOpacity
                        onPress={handleNext}
                        style={styles.nextButton} >
                        <Text style={styles.buttonText}>
                            Next
                        </Text>
                    </TouchableOpacity>

                ) : (

                    <TouchableOpacity
                        onPress={handleSubmit}
                        disabled={loading}
                        style={styles.nextButton}>
                        <Text style={styles.buttonText}>
                            {loading
                                ? "Submitting..."
                                : "Submit Survey"}
                        </Text>
                    </TouchableOpacity>

                )}

            </View>

        </View>
    );
};

export default Survey;
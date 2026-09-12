import { forwardRef, useImperativeHandle, useState } from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import styles from "../../styles/survey.styles";

const Form3 = forwardRef(({ data, updateField }, ref) => {
    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        updateField(field, value);

        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: "",
            }));
        }
    };

    const handleHouseChange = (value) => {
        updateField("has_house", value);

        setErrors((prev) => ({
            ...prev,
            has_house: "",
        }));
    };

    const handleIllnessChange = (value) => {
        updateField("has_illness", value);

        if (value === false) {
            updateField("illness_details", "");
        }

        setErrors((prev) => ({
            ...prev,
            has_illness: "",
            illness_details: "",
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (data.has_house === null) {
            newErrors.has_house = "Please select Yes or No";
        }

        if (data.has_illness === null) {
            newErrors.has_illness = "Please select Yes or No";
        }

        if (
            data.has_illness === true &&
            !data.illness_details.trim()
        ) {
            newErrors.illness_details =
                "Illness details are required";
        }

        if (!data.marital_status.trim()) {
            newErrors.marital_status =
                "Marital status is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    useImperativeHandle(ref, () => ({ validate, }));

    return (
        <View>
            <Text style={styles.title}>
                Household & Health
            </Text>

            {/* House */}
            <Text style={styles.label}>
                Does the person have a house? *
            </Text>

            <View style={styles.options}>
                <TouchableOpacity
                    style={[
                        styles.option,
                        data.has_house === true &&
                        styles.selectedOption,
                    ]}
                    onPress={() => handleHouseChange(true)}
                >
                    <Text
                        style={[
                            styles.optionText,
                            data.has_house === true &&
                            styles.selectedOptionText,
                        ]}
                    >
                        {data.has_house === true ? "✓ " : ""}
                        Yes
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.option,
                        data.has_house === false &&
                        styles.selectedOption,
                    ]}
                    onPress={() => handleHouseChange(false)}
                >
                    <Text
                        style={[
                            styles.optionText,
                            data.has_house === false &&
                            styles.selectedOptionText,
                        ]}
                    >
                        {data.has_house === false ? "✓ " : ""}
                        No
                    </Text>
                </TouchableOpacity>
            </View>

            {errors.has_house ? (
                <Text style={styles.error}>
                    {errors.has_house}
                </Text>
            ) : null}

            {/* Illness */}
            <Text style={styles.label}>
                Does the person have any illness? *
            </Text>

            <View style={styles.options}>
                <TouchableOpacity
                    style={[
                        styles.option,
                        data.has_illness === true &&
                        styles.selectedOption,
                    ]}
                    onPress={() => handleIllnessChange(true)}
                >
                    <Text
                        style={[
                            styles.optionText,
                            data.has_illness === true &&
                            styles.selectedOptionText,
                        ]}
                    >
                        {data.has_illness === true ? "✓ " : ""}
                        Yes
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.option,
                        data.has_illness === false &&
                        styles.selectedOption,
                    ]}
                    onPress={() => handleIllnessChange(false)}
                >
                    <Text
                        style={[
                            styles.optionText,
                            data.has_illness === false &&
                            styles.selectedOptionText,
                        ]}
                    >
                        {data.has_illness === false ? "✓ " : ""}
                        No
                    </Text>
                </TouchableOpacity>
            </View>

            {errors.has_illness ? (
                <Text style={styles.error}>
                    {errors.has_illness}
                </Text>
            ) : null}

            {/* Illness Details */}
            {data.has_illness === true && (
                <>
                    <Text style={styles.label}>
                        Illness Details *
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter illness details"
                        placeholderTextColor="#888888"
                        value={data.illness_details}
                        onChangeText={(value) =>
                            handleChange(
                                "illness_details",
                                value
                            )
                        }
                    />

                    {errors.illness_details ? (
                        <Text style={styles.error}>
                            {errors.illness_details}
                        </Text>
                    ) : null}
                </>
            )}

            {/* Marital Status */}
            <Text style={styles.label}>
                Marital Status *
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Enter marital status"
                placeholderTextColor="#888888"
                value={data.marital_status}
                onChangeText={(value) =>
                    handleChange("marital_status", value)
                }
            />

            {errors.marital_status ? (
                <Text style={styles.error}>
                    {errors.marital_status}
                </Text>
            ) : null}
        </View>
    );
});

export default Form3;
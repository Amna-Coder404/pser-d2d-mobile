import { Picker } from "@react-native-picker/picker";
import { forwardRef, useImperativeHandle, useState } from "react";
import {
    Text,
    TextInput,
    View
} from "react-native";

import COLOR from "../../constant/colors";
import styles from "../../styles/survey.styles";


const educationOptions = [
    { label: "No Education", value: "no_education" },
    { label: "Primary", value: "primary" },
    { label: "Middle", value: "middle" },
    { label: "Matric", value: "matric" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Bachelor's Degree", value: "bachelors" },
    { label: "Master's Degree", value: "masters" },
    { label: "Other", value: "other" },
];


const Form2 = forwardRef(({ data, updateField }, ref) => {
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

    const validate = () => {
        const newErrors = {};

        if (!data.education.trim()) {
            newErrors.education = "Education is required";
        }

        if (!data.occupation.trim()) {
            newErrors.occupation = "Occupation is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    useImperativeHandle(ref, () => ({
        validate,
    }));

    return (
        <View>
            <Text style={styles.title}>
                Education & Occupation
            </Text>

            {/* Education */}
            <Text style={styles.label}>
                Education *
            </Text>

            <View style={styles.dropdown}>
                <Picker
                    selectedValue={data.education}
                    onValueChange={(value) =>
                        handleChange("education", value)
                    }
                    dropdownIconColor={COLOR.text}
                    style={styles.picker}
                >
                    <Picker.Item
                        label="Select education"
                        value=""
                        color={COLOR.textSecondary}
                    />

                    {educationOptions.map((option) => (
                        <Picker.Item
                            key={option.value}
                            label={option.label}
                            value={option.value}
                        />
                    ))}
                </Picker>
            </View>

            {errors.education ? (
                <Text style={styles.errors}>
                    {errors.education}
                </Text>
            ) : null}

            {/* Occupation */}
            <Text style={styles.label}>
                Profession *
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Enter profession"
                placeholderTextColor={COLOR.textSecondary}
                value={data.occupation}
                onChangeText={(value) =>
                    handleChange("occupation", value)
                }
            />

            {errors.occupation ? (
                <Text style={styles.errors}>
                    {errors.occupation}
                </Text>
            ) : null}
        </View>
    );
});

export default Form2;
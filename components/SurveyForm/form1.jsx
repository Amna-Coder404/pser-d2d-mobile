import { Ionicons } from "@expo/vector-icons";
import { forwardRef, useImperativeHandle, useState } from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import COLOR from "../../constant/colors";
import styles from "../../styles/survey.styles";

const Form1 = forwardRef(({ data, updateField, onBack }, ref) => {
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!data.person_name.trim()) {
            newErrors.person_name = "Person name is required";
        }

        if (!data.phone_number.trim()) {
            newErrors.phone_number = "Phone number is required";
        } else if (!/^03\d{9}$/.test(data.phone_number)) {
            newErrors.phone_number = "Enter a valid 11-digit phone number";
        }

        if (!data.address.trim()) {
            newErrors.address = "Address is required";
        }

        if (!data.age.trim()) {
            newErrors.age = "Age is required";
        } else if (!/^\d+$/.test(data.age)) {
            newErrors.age = "Age must be a number";
        } else if (Number(data.age) < 18) {
            newErrors.age = "Age must be 18 or older";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field, value) => {
        updateField(field, value);
        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: "",
            }));
        }
    };

    useImperativeHandle(ref, () => ({
        validate,
    }));

    return (
        <View style={styles.content}>

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={onBack}   >
                    <Ionicons name="arrow-back" size={24} color={COLOR.primary} />
                </TouchableOpacity>

                <Text style={styles.title}>
                    Personal Information
                </Text>
            </View>
            {/* Person Name */}
            <Text style={styles.label}>
                Person Name *
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Enter person name"
                placeholderTextColor={COLOR.textSecondary}
                value={data.person_name}

                onChangeText={(value) =>
                    handleChange("person_name", value)
                }
            />

            {errors.person_name ? (
                <Text style={styles.errors}>
                    {errors.person_name}
                </Text>
            ) : null}

            {/* Phone Number */}
            <Text style={styles.label}>
                Phone Number *
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                placeholderTextColor={COLOR.textSecondary}
                keyboardType="phone-pad"
                maxLength={11}
                value={data.phone_number}
                onChangeText={(value) =>
                    handleChange("phone_number", value)
                }
            />

            {errors.phone_number ? (
                <Text style={styles.errors}>
                    {errors.phone_number}
                </Text>
            ) : null}

            {/* Address */}
            <Text style={styles.label}>
                Address *
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Enter address"
                placeholderTextColor={COLOR.textSecondary}
                value={data.address}
                onChangeText={(value) =>
                    handleChange("address", value)
                }
            />

            {errors.address ? (
                <Text style={styles.errors}>
                    {errors.address}
                </Text>
            ) : null}

            {/* Age */}
            <Text style={styles.label}>
                Age *
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Enter age"
                placeholderTextColor={COLOR.textSecondary}
                keyboardType="number-pad"
                value={data.age}
                onChangeText={(value) =>
                    handleChange("age", value)
                }
            />

            {errors.age ? (
                <Text style={styles.errors}>
                    {errors.age}
                </Text>
            ) : null}
        </View>
    );
});

export default Form1;
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { forwardRef, useImperativeHandle, useState } from "react";
import {
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
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


const Form2 = forwardRef(({ data, updateField, pickImage }, ref) => {
    const [errors, setErrors] = useState({});


    const [imageModalVisible, setImageModalVisible] = useState(false);


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

        // CNIC
        if (!data.cnic.trim()) {
            newErrors.cnic = "CNIC number is required";
        } else if (!/^\d{13}$/.test(data.cnic.trim())) {
            newErrors.cnic = "CNIC must be exactly 13 digits";
        }
        // Person Image
        if (!data.person_image_url) {
            newErrors.person_image_url = "Person image is required";
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
            {/* Phone Number */}
            <Text style={styles.label}>
                CNIC Number *
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Enter CNIC number"
                placeholderTextColor={COLOR.textSecondary}
                keyboardType="phone-pad"
                maxLength={13}
                value={data.cnic}
                onChangeText={(value) => handleChange("cnic", value)}
            />

            {errors.cnic ? (
                <Text style={styles.errors}>
                    {errors.cnic}
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


            <Text style={styles.label}>
                Person Image *
            </Text>

            <TouchableOpacity
                onPress={() => setImageModalVisible(true)}

                style={{
                    width: 120,
                    height: 120,
                    borderRadius: 60,
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                    borderWidth: 2,
                    borderColor: COLOR.border,
                    backgroundColor: COLOR.background,
                    marginBottom: 15,
                }}
            >
                {data.person_image_url ? (
                    <Image
                        source={{ uri: data.person_image_url }}
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                    />
                ) : (
                    <Ionicons
                        name="camera-outline"
                        size={35}
                        color={COLOR.textSecondary}
                    />
                )}
            </TouchableOpacity>
            {errors.person_image_url ? (
                <Text style={styles.errors}>
                    {errors.person_image_url}
                </Text>
            ) : null}

            <Portal>
                <Dialog
                    visible={imageModalVisible}
                    onDismiss={() => setImageModalVisible(false)}
                >
                    <Dialog.Title>Select Person Image</Dialog.Title>

                    <Dialog.Content>
                        <Button
                            icon="camera"
                            mode="contained"
                            onPress={() => {
                                setImageModalVisible(false);
                                pickImage("camera");
                            }}
                            style={{ marginBottom: 10 }}
                        >
                            Take Photo
                        </Button>

                        <Button
                            icon="image"
                            mode="outlined"
                            onPress={() => {
                                setImageModalVisible(false);
                                pickImage("gallery");
                            }}   >
                            Choose from Gallery
                        </Button>
                    </Dialog.Content>

                    <Dialog.Actions>
                        <Button onPress={() => setImageModalVisible(false)}  >
                            Cancel
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
});

export default Form2;
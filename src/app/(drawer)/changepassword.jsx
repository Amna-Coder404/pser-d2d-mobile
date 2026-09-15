import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { Button, Dialog, Portal } from 'react-native-paper';

import COLOR from '../../../constant/colors';
import { changePassword } from '../../../services/auth';
import { useAuthStore } from '../../../store/authStore';
import styles from '../../../styles/drawer.style';

const Changepassword = () => {

    const user = useAuthStore((state) => state.user);
    const router = useRouter();

    const [oldPwd, setOldPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");

    // Password visibility
    const [showOldPwd, setShowOldPwd] = useState(false);
    const [showNewPwd, setShowNewPwd] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    useFocusEffect(
        useCallback(() => {
            setOldPwd("");
            setNewPwd("");
            setShowOldPwd(false);
            setShowNewPwd(false);
            setError("");
            setLoading(false);
        }, [])
    );

    // CHANGE PASSWORD
    const handleChangePwd = async () => {

        if (!user?.id) return;

        if (!oldPwd || !newPwd) {
            setError("Please fill all fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {

            await changePassword(oldPwd, newPwd);

            setOldPwd("");
            setNewPwd("");

            setShowSuccess(true);

        } catch (error) {

            console.log(
                "CHANGE PASSWORD ERROR:",
                error?.message
            );

            setError(
                error?.message ||
                "Unable to change password. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    // SUCCESS DIALOG CLOSE
    const handleSuccessClose = () => {
        setShowSuccess(false);
        router.back();
    };

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}  >

                <View style={styles.container}>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        keyboardDismissMode="on-drag"
                        contentContainerStyle={{
                            paddingBottom: 40,
                        }}   >

                        {/* HEADER */}
                        <View style={styles.header}>

                            <View style={styles.back}>

                                <TouchableOpacity
                                    onPress={() => router.back()}
                                    style={styles.backButton}   >
                                    <Ionicons
                                        name="arrow-back"
                                        size={24}
                                        color={COLOR.text}
                                    />
                                </TouchableOpacity>

                                <View style={styles.titleContainer}>

                                    <Text style={styles.changePasswordTitle}   >
                                        Change Password
                                    </Text>

                                    <Text style={styles.subtitle}>
                                        Update your password to keep your account secure.
                                    </Text>

                                </View>

                            </View>

                        </View>


                        {/* FORM */}
                        <View style={styles.formCard}>

                            {/* ICON */}
                            <View style={styles.formIconContainer}>

                                <Ionicons
                                    name="lock-closed-outline"
                                    size={27}
                                    color={COLOR.primary}
                                />

                            </View>


                            {/* TITLE */}
                            <Text style={styles.formTitle}>
                                Update your password
                            </Text>


                            {/* DESCRIPTION */}
                            <Text style={styles.formDescription}>
                                Enter your current password and choose a new secure password.
                            </Text>


                            {/* OLD PASSWORD */}
                            <Text style={styles.label}>
                                Old Password
                            </Text>

                            <View style={styles.inputContainer}>

                                <Ionicons
                                    name="lock-closed-outline"
                                    size={20}
                                    color={COLOR.textSecondary}
                                />

                                <TextInput
                                    placeholder="Enter old password"
                                    placeholderTextColor={
                                        COLOR.placeholder
                                    }
                                    value={oldPwd}
                                    onChangeText={(text) => {
                                        setOldPwd(text);
                                        setError("");
                                    }}
                                    secureTextEntry={!showOldPwd}
                                    style={styles.input}
                                    autoCapitalize="none"
                                />

                                {/* OLD PASSWORD EYE */}
                                <TouchableOpacity
                                    onPress={() => setShowOldPwd(!showOldPwd)}
                                    style={{ padding: 5, }}   >

                                    <Ionicons
                                        name={showOldPwd ? "eye-outline" : "eye-off-outline"}
                                        size={21}
                                        color={COLOR.textSecondary}
                                    />

                                </TouchableOpacity>

                            </View>


                            {/* NEW PASSWORD */}
                            <Text style={styles.label}>
                                New Password
                            </Text>

                            <View style={styles.inputContainer}>

                                <Ionicons
                                    name="key-outline"
                                    size={20}
                                    color={COLOR.textSecondary}
                                />

                                <TextInput
                                    placeholder="Enter new password"
                                    placeholderTextColor={
                                        COLOR.placeholder
                                    }
                                    value={newPwd}
                                    onChangeText={(text) => {
                                        setNewPwd(text);
                                        setError("");
                                    }}
                                    secureTextEntry={!showNewPwd}
                                    style={styles.input}
                                    autoCapitalize="none"
                                />

                                {/* NEW PASSWORD EYE */}
                                <TouchableOpacity
                                    onPress={() =>
                                        setShowNewPwd(
                                            !showNewPwd
                                        )
                                    }
                                    style={{
                                        padding: 5,
                                    }}
                                >

                                    <Ionicons
                                        name={
                                            showNewPwd
                                                ? "eye-outline"
                                                : "eye-off-outline"
                                        }
                                        size={21}
                                        color={
                                            COLOR.textSecondary
                                        }
                                    />

                                </TouchableOpacity>

                            </View>


                            {/* ERROR */}
                            {error !== "" && (

                                <View
                                    style={
                                        styles.errorContainer
                                    }
                                >

                                    <Ionicons
                                        name="alert-circle-outline"
                                        size={18}
                                        color={COLOR.error}
                                    />

                                    <Text style={styles.error}>
                                        {error}
                                    </Text>

                                </View>

                            )}


                            {/* CHANGE PASSWORD BUTTON */}
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    loading &&
                                    styles.buttonDisabled,
                                ]}
                                onPress={handleChangePwd}
                                disabled={loading}
                            >

                                {loading ? (

                                    <ActivityIndicator
                                        size="small"
                                        color={COLOR.white}
                                    />

                                ) : (

                                    <>
                                        <Ionicons
                                            name="shield-checkmark-outline"
                                            size={20}
                                            color={COLOR.white}
                                        />

                                        <Text
                                            style={
                                                styles.buttonText
                                            }
                                        >
                                            Change Password
                                        </Text>
                                    </>

                                )}

                            </TouchableOpacity>

                        </View>

                    </ScrollView>

                </View>

            </KeyboardAvoidingView>


            {/* SUCCESS DIALOG */}
            <Portal>

                <Dialog
                    visible={showSuccess}
                    onDismiss={handleSuccessClose}
                    style={styles.dialog}    >

                    <View style={styles.dialogIconContainer
                    }
                    >

                        <Ionicons
                            name="checkmark-circle"
                            size={58}
                            color={COLOR.primary}
                        />

                    </View>


                    <Dialog.Title
                        style={styles.dialogTitle}
                    >
                        Password Updated
                    </Dialog.Title>


                    <Dialog.Content>

                        <Text style={styles.dialogText}>
                            Your password has been changed successfully.
                        </Text>

                    </Dialog.Content>


                    <Dialog.Actions>

                        <Button
                            mode="contained"
                            onPress={handleSuccessClose}
                            buttonColor={COLOR.primary}
                            textColor={COLOR.white}
                            style={styles.dialogButton}
                        >
                            Done
                        </Button>

                    </Dialog.Actions>

                </Dialog>

            </Portal>

        </>
    );
};

export default Changepassword;
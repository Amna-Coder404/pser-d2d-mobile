
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import {
    getEmployeeProfile,
    loginEmployee,
    logoutEmployee,
} from "../../services/auth";

import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../../store/authStore";
import styles from '../../styles/login.styles';
import { cleanCNIC, formatCNIC } from "../../utils/cnic";


const Login = () => {
    const [email, setEmail] = useState("");
    const [cnic, setCnic] = useState("");
    const [password, setPassword] = useState("");

    const setUser = useAuthStore((state) => state.setUser);

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    const handleLogin = async () => {
        if (!email.trim() || !cnic.trim() || !password) {
            setError("Please fill all fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const data = await loginEmployee(
                email.trim(),
                password
            );

            const userId = data.user.id;

            const profile = await getEmployeeProfile(userId);

            if (profile.cnic?.trim() !== cnic.trim()) {
                await logoutEmployee();
                throw new Error("Invalid CNIC.");
            }

            setUser(profile);
            router.replace("/");

        } catch (error) {
            console.log("LOGIN ERROR:", error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Login failed."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>

                    {/* Logo */}
                    <View style={styles.logoContainer}>
                        <Image
                            source={require("../../assets/images/icon.png")}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Header */}
                    <Text style={styles.title}>
                        PSER D2D
                    </Text>

                    <Text style={styles.subtitle}>
                        Employee Login
                    </Text>

                    <Text style={styles.description}>
                        Sign in to continue your field survey work
                    </Text>

                    {/* Form */}
                    <View style={styles.formCard}>

                        <Text style={styles.formTitle}>
                            Welcome Back
                        </Text>

                        <Text style={styles.formSubtitle}>
                            Enter your employee credentials
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Email address"
                            placeholderTextColor="#94A3B8"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={!loading}
                            returnKeyType="next"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="CNIC"
                            placeholderTextColor="#94A3B8"
                            value={formatCNIC(cnic)}
                            onChangeText={(value) => setCnic(cleanCNIC(value))}
                            keyboardType="numeric"
                            editable={!loading}
                            returnKeyType="next"
                            maxLength={15}
                        />
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                placeholder="Password"
                                placeholderTextColor="#94A3B8"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                editable={!loading}
                                returnKeyType="done"
                                onSubmitEditing={handleLogin}
                            />

                            <TouchableOpacity
                                style={styles.eyeButton}
                                onPress={() => setShowPassword((prev) => !prev)}
                                disabled={loading}
                                activeOpacity={0.7}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                                    size={21}
                                    color="#64748B"
                                />
                            </TouchableOpacity>
                        </View>

                        {error !== "" && (
                            <View style={styles.errorBox}>
                                <Text style={styles.error}>
                                    {error}
                                </Text>
                            </View>
                        )}

                        <TouchableOpacity
                            style={[
                                styles.button,
                                loading && styles.disabledButton,
                            ]}
                            onPress={handleLogin}
                            disabled={loading}
                            activeOpacity={0.85}
                        >
                            <Text style={styles.buttonText}>
                                {loading
                                    ? "Logging in..."
                                    : "Login"}
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <Text style={styles.footer}>
                        PSER D2D • Employee Portal
                    </Text>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Login;


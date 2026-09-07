import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import {
    getEmployeeProfile,
    loginEmployee,
    logoutEmployee,
} from "../../services/auth";

import { useRouter } from 'expo-router';
import styles from '../../styles/login.styles';

const Login = () => {
    const [email, setEmail] = useState("");
    const [cnic, setCnic] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        if (!email.trim() || !cnic.trim() || !password) {
            setError("Please fill all fields.");
            return;
        }


        setLoading(true);
        setError("");

        try {
            // 1. Login with Supabase Auth
            const data = await loginEmployee(
                email.trim(),
                password
            );

            // 2. Get logged-in user's ID
            const userId = data.user.id;

            // 3. Get employee profile
            const profile = await getEmployeeProfile(userId);
            // 4. Check CNIC
            if (profile.cnic?.trim() !== cnic.trim()) {
                await logoutEmployee();

                throw new Error("Invalid CNIC.");
            }


            // 5. Login successful
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
    }



    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                PSER D2D
            </Text>

            <Text style={styles.subtitle}>
                Employee Login
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#94A3B8"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
            />

            <TextInput
                style={styles.input}
                placeholder="CNIC"
                placeholderTextColor="#94A3B8"
                value={cnic}
                onChangeText={setCnic}
                keyboardType="numeric"
                editable={!loading}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#94A3B8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!loading}
            />

            {error !== "" && (
                <Text style={styles.error}>
                    {error}
                </Text>
            )}

            <TouchableOpacity
                style={[
                    styles.button,
                    loading && styles.disabledButton,
                ]}
                onPress={handleLogin}
                disabled={loading}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>
                    {loading
                        ? "Logging in..."
                        : "Login"}
                </Text>
            </TouchableOpacity>

        </View>
    );
}
export default Login
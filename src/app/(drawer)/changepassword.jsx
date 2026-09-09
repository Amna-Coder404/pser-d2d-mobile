import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import COLOR from '../../../constant/colors';
import { changePassword } from '../../../services/auth';
import { useAuthStore } from '../../../store/authStore';
import styles from '../../../styles/drawer.style';

const Changepassword = () => {

    const user = useAuthStore((state) => state.user);
    const [oldPwd, setOldPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();

    useFocusEffect(
        useCallback(() => {
            setOldPwd("");
            setNewPwd("");
            setError("");
            setLoading(false);
        }, [])
    );
    const handleChangePwd = async () => {
        if (!user?.id) return;

        if (!oldPwd || !newPwd) {
            setError("Please fill all fields.");
            return;
        }

        setLoading(true);

        try {
            await changePassword(oldPwd, newPwd);


            Alert.alert(
                "✅ Password Updated",
                "Your password has been changed successfully. 🔐"
            )
            setOldPwd("");
            setNewPwd("");
            setError("");

            router.back();

        } catch (error) {
            console.log("CHANGE PASSWORD ERROR:", error.message);

            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.back}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}   >
                        <Ionicons name="arrow-back" size={24} color={COLOR.text} />
                    </TouchableOpacity>
                    <Text style={styles.title}> Change Password</Text>
                </View>
                <Text style={styles.subtitle}>   Update your password to keep your account secure.</Text>
            </View>


            <View style={styles.formContainer}>

                <Text style={styles.label}>
                    Old Password
                </Text>

                <TextInput
                    placeholder="Enter old password"
                    placeholderTextColor={styles.placeholder.color}
                    value={oldPwd}
                    onChangeText={setOldPwd}
                    secureTextEntry
                    style={styles.input}
                />

                <Text style={styles.label}>
                    New Password
                </Text>

                <TextInput
                    placeholder="Enter new password"
                    placeholderTextColor={styles.placeholder.color}
                    secureTextEntry
                    style={styles.input}
                    value={newPwd}
                    onChangeText={setNewPwd}
                />

                {error !== "" && (
                    <Text style={styles.error}>
                        {error}
                    </Text>
                )}


                <TouchableOpacity style={styles.button} onPress={handleChangePwd}>
                    {loading ?
                        <ActivityIndicator size={"small"} color={COLOR.white} />
                        :
                        (<Text style={styles.buttonText}>
                            Change Password
                        </Text>)
                    }
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default Changepassword
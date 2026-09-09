import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import COLOR from "../../../constant/colors";
import { logoutEmployee } from "../../../services/auth";
import { useAuthStore } from "../../../store/authStore";
import styles from "../../../styles/drawer.style";

export default function DrawerLayout() {

    const user = useAuthStore((state) => state.user);

    const handleLogout = async () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: async () => {
                        await logoutEmployee();
                    },
                },
            ]
        );
    };
    return (
        <Drawer screenOptions={{
            headerShown: false,
            drawerPosition: "right"
        }}

            drawerContent={(props) => (
                <View style={styles.drawerContainer}>

                    {/* Drawer Header */}
                    <View style={styles.drawerContent}>

                        <Image
                            source={require("../../../assets/images/pser-survey-punjab.webp")}
                            style={styles.drawerImage}
                        />

                        <Text style={styles.title}>
                            PSER D2D APP
                        </Text>

                        <View style={styles.info}>
                            <Ionicons name="id-card-outline" color={COLOR.white} size={22} />

                            <Text style={styles.text}>
                                {user?.cnic} / {user?.block_assign_number}
                            </Text>
                        </View>

                    </View>

                    <View style={styles.buttons}>
                        {/* Change Password */}
                        <TouchableOpacity style={styles.drawerBtn} onPress={() => props.navigation.navigate("changepassword")}  >
                            <Ionicons name="lock-closed-outline" style={styles.btnIcon} />
                            <Text style={styles.btnText}>
                                Change Password
                            </Text>
                        </TouchableOpacity>

                        {/* Logout */}
                        <TouchableOpacity style={styles.drawerBtn} onPress={handleLogout}>
                            <Ionicons name="log-out-outline" style={styles.btnIcon} />
                            <Text style={styles.btnText}>
                                Logout
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            )}
        >
            <Drawer.Screen
                name="index"
                options={{
                    headerShown: false,
                    drawerItemStyle: {
                        display: "none",
                    },
                }}
            />

            <Drawer.Screen
                name="changepassword"
                options={{
                    headerShown: false,
                    drawerItemStyle: {
                        display: "none",
                    },
                }}
            />
        </Drawer>
    );
}
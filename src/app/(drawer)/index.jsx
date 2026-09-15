import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import COLOR from "../../../constant/colors";
import { getImageUrl } from "../../../lib/storage";
import { useAuthStore } from "../../../store/authStore";
import styles from "../../../styles/home.styles";

export default function Home() {
    const user = useAuthStore((state) => state.user);

    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    useEffect(() => {
        const loadProfileImage = async () => {
            if (!user?.profile_image_url) {
                setProfileImageUrl(null);
                setImageLoading(false);
                return;
            }

            setImageLoading(true);

            const url = await getImageUrl(user.profile_image_url);

            setProfileImageUrl(url);
        };

        loadProfileImage();
    }, [user?.profile_image_url]);

    const navigation = useNavigation();

    const handleOpenDrawer = () => {
        navigation.openDrawer();
    };

    return (
        <View style={styles.container}>

            {/* App + Profile Header Card */}
            <View style={styles.headerCard}>

                {/* APP Header */}
                <View style={styles.appHeader}>
                    <Image
                        source={require("../../../assets/images/pser-survey-punjab.png")}
                        style={styles.appLogo}
                        resizeMode="contain"
                    />

                    <Text style={styles.appTitle}>
                        PSER D2D
                    </Text>

                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={handleOpenDrawer}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name="menu"
                            size={28}
                            color={COLOR.white}
                        />
                    </TouchableOpacity>
                </View>

                {/* Profile Header */}
                <View style={styles.profileHeader}>

                    {/* Avatar */}
                    <View style={styles.avatarContainer}>

                        {/* Initial Letter */}
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>
                                {user?.full_name?.charAt(0)?.toUpperCase() || "U"}
                            </Text>
                        </View>

                        {/* Profile Image */}
                        {profileImageUrl && (
                            <Image
                                source={{ uri: profileImageUrl }}
                                style={styles.avatarImage}
                                resizeMode="cover"
                                onLoadEnd={() => setImageLoading(false)}
                                onError={() => {
                                    setProfileImageUrl(null);
                                    setImageLoading(false);
                                }}
                            />
                        )}

                        {/* Loader for Image */}
                        {imageLoading && (
                            <View style={styles.avatarLoader}>
                                <ActivityIndicator size="small" color={COLOR.primary} />
                            </View>
                        )}

                    </View>

                    <View style={styles.profileInfo}>
                        <Text style={styles.name}>
                            {user?.full_name}
                        </Text>

                        <Text style={styles.role}>
                            {user?.cnic} / {user?.block_assign_number}
                        </Text>
                    </View>

                </View>

            </View>

            {/* Draft Surveys */}
            <TouchableOpacity
                style={styles.card}
                onPress={() => router.push("/drafts")}
                activeOpacity={0.8}
            >
                <View style={styles.cardIcon}>
                    <Ionicons name="pencil-outline" style={styles.iconText} />
                </View>

                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>
                        Draft Surveys
                    </Text>

                    <Text style={styles.cardDescription}>
                        Continue your saved surveys
                    </Text>
                </View>

                <Ionicons
                    name="arrow-forward"
                    color={COLOR.primary}
                    size={23}
                />
            </TouchableOpacity>

            {/* My Surveys */}
            <TouchableOpacity
                style={styles.card}
                onPress={() => router.push("/mySurveys")}
                activeOpacity={0.8}
            >
                <View style={styles.cardIcon}>
                    <Ionicons name="list-circle" style={styles.iconText} />
                </View>

                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>
                        My Surveys
                    </Text>

                    <Text style={styles.cardDescription}>
                        View your submitted surveys
                    </Text>
                </View>

                <Ionicons
                    name="arrow-forward"
                    color={COLOR.primary}
                    size={23}
                />
            </TouchableOpacity>

            {/* Start Survey */}
            <TouchableOpacity
                style={[styles.card, styles.startCard]}
                onPress={() => router.push("/survey")}
                activeOpacity={0.8}
            >
                <View style={styles.cardIcon}>
                    <Ionicons name="create-outline" style={styles.iconText} />
                </View>

                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>
                        Start Survey
                    </Text>

                    <Text style={styles.cardDescription}>
                        Create a new PSER survey
                    </Text>
                </View>

                <Ionicons
                    name="arrow-forward"
                    color={COLOR.primary}
                    size={23}
                />
            </TouchableOpacity>

        </View>
    );
}
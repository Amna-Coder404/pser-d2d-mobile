import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { getImageUrl } from "../../lib/storage";
import { useAuthStore } from "../../store/authStore";
import styles from "../../styles/home.styles";



export default function Home() {
  const user = useAuthStore((state) => state.user);

  const [profileImageUrl, setProfileImageUrl] = useState(null);

  useEffect(() => {
    const loadProfileImage = async () => {
      console.log("IMAGE PATH:", user?.profile_image_url);

      if (!user?.profile_image_url) {
        console.log("NO IMAGE PATH");
        setProfileImageUrl(null);
        return;
      }

      const url = await getImageUrl(user.profile_image_url);

      console.log("SIGNED IMAGE URL:", url);

      setProfileImageUrl(url);
    };

    loadProfileImage();
  }, [user?.profile_image_url]);
  return (
    <View style={styles.container}>

      {/* Profile Header */}
      <View style={styles.profileHeader}>
        {profileImageUrl ? (
          <Image
            source={{ uri: profileImageUrl }}
            style={styles.avatar}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.full_name?.charAt(0)?.toUpperCase() || "U"}
            </Text>
          </View>
        )}

        <View style={styles.profileInfo}>
          <Text style={styles.name}>
            {user?.full_name}
          </Text>

          <Text style={styles.role}>
            CNIC {user?.cnic}
          </Text>

          <Text style={styles.block}>
            Block: {user?.block_assign_number}
          </Text>
        </View>

      </View>

      {/* Dashboard Title */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>
          PSER D2D
        </Text>

        <Text style={styles.subtitle}>
          Employee Dashboard
        </Text>
      </View>

      {/* Draft Surveys */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/drafts")}
        activeOpacity={0.8}
      >
        <View style={styles.cardIcon}>
          <Text style={styles.iconText}>📝</Text>
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>
            Draft Surveys
          </Text>

          <Text style={styles.cardDescription}>
            Continue your saved surveys
          </Text>
        </View>

        <Text style={styles.arrow}>
          →
        </Text>
      </TouchableOpacity>

      {/* My Surveys */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/mySurveys")}
        activeOpacity={0.8}
      >
        <View style={styles.cardIcon}>
          <Text style={styles.iconText}>✓</Text>
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>
            My Surveys
          </Text>

          <Text style={styles.cardDescription}>
            View your submitted surveys
          </Text>
        </View>

        <Text style={styles.arrow}>
          →
        </Text>
      </TouchableOpacity>

      {/* Start Survey */}
      <TouchableOpacity
        style={[styles.card, styles.startCard]}
        onPress={() => router.push("/survey")}
        activeOpacity={0.8}
      >
        <View style={styles.cardIcon}>
          <Text style={styles.iconText}>+</Text>
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>
            Start Survey
          </Text>

          <Text style={styles.cardDescription}>
            Create a new PSER survey
          </Text>
        </View>

        <Text style={styles.arrow}>
          →
        </Text>
      </TouchableOpacity>

    </View>
  );
}
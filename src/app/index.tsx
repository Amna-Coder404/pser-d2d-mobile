import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
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
        <Text style={styles.cardTitle}>
          Draft Surveys
        </Text>

        <Text style={styles.cardDescription}>
          Continue your saved surveys
        </Text>
      </TouchableOpacity>

      {/* My Surveys */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/mySurveys")}
        activeOpacity={0.8}
      >
        <Text style={styles.cardTitle}>
          My Surveys
        </Text>

        <Text style={styles.cardDescription}>
          View your submitted surveys
        </Text>
      </TouchableOpacity>

      {/* Start Survey */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/survey")}
        activeOpacity={0.8}
      >
        <Text style={styles.cardTitle}>
          Start Survey
        </Text>

        <Text style={styles.cardDescription}>
          Create a new PSER survey
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  header: {
    marginBottom: 32,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    color: "#111",
  },

  subtitle: {
    fontSize: 17,
    textAlign: "center",
    color: "#666",
    marginTop: 6,
  },

  card: {
    padding: 22,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fafafa",
    marginBottom: 16,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
    marginBottom: 6,
  },

  cardDescription: {
    fontSize: 14,
    color: "#666",
  },
});
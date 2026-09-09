import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import { supabase } from "../../lib/supabase";
import { useAuthStore } from "../../store/authStore";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  getCurrentSession,
  getEmployeeProfile,
} from "../../services/auth";


export default function RootLayout() {
  const [loading, setLoading] = useState(true);

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    checkAuth();

    // Listen for login/logout changes
    const { data: { subscription }, } = supabase.auth.onAuthStateChange(
      async (event, session) => {

        if (session?.user) {
          try {
            const profile = await getEmployeeProfile(
              session.user.id
            );
            console.log("CURRENT USER:", profile);
            setUser(profile);
          } catch (error) {
            console.log("PROFILE ERROR:", error);
            setUser(null);
          }
        } else {
          setUser(null);
        }

        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (loading) return;

    const currentScreen = segments[0];

    // User is NOT logged in
    if (!user && currentScreen !== "login") {
      router.replace("/login");
      return;
    }

    // User IS logged in but opens login screen
    if (user && currentScreen === "login") {
      router.replace("/");
    }
  }, [user, loading, segments]);

  const checkAuth = async () => {
    try {
      const session = await getCurrentSession();

      if (!session) {
        setUser(null);
        return;
      }

      const profile = await getEmployeeProfile(
        session.user.id
      );

      setUser(profile);

    } catch (error) {
      setUser(null);

    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaWrapper>
        {/* We use Drawer here instead of Stack to enable the side menu slider */}
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaWrapper>
    </GestureHandlerRootView>
  );
}
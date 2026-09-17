import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import OfflineBanner from "../../components/Netinfo/OfflineBanner";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import { supabase } from "../../lib/supabase";
import {
  getCurrentSession,
  getEmployeeProfile,
} from "../../services/auth";
import { useAuthStore } from "../../store/authStore";

import { StatusBar } from "react-native";
import { PaperProvider } from "react-native-paper";

import { useNetworkStatus } from "../../hooks/useNetworkStatus";

SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const { isOnline } = useNetworkStatus();
  const [loading, setLoading] = useState(true);

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const router = useRouter();
  const segments = useSegments();




  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  useEffect(() => {
    checkAuth();

    const { data: { subscription }, } = supabase.auth.onAuthStateChange(async (event, session) => {


      // Logout
      if (!session?.user) {
        setUser(null);
        setLoading(false);
        return;
      }

      // IMPORTANT:
      // Do NOT set user here during SIGNED_IN.
      //
      // Login screen will validate the employee profile
      // and then set the user itself.

      if (event === "SIGNED_IN") {
        console.log("SIGNED_IN - waiting for login validation");
        return;
      }

      // For existing sessions / token refresh
      if (event === "INITIAL_SESSION" || event === "TOKEN_REFRESHED") {
        try {
          const profile = await getEmployeeProfile(
            session.user.id
          );

          console.log("CURRENT USER:", profile);

          setUser(profile);
        } catch (error) {
          console.log("PROFILE ERROR:", error);
          setUser(null);
        } finally {
          setLoading(false);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (loading) return;

    const currentScreen = segments[0];

    // Not logged in
    if (!user && currentScreen !== "login") {
      router.replace("/login");
      return;
    }

    // Logged in
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
      console.log("CHECK AUTH ERROR:", error);
      setUser(null);

    } finally {
      setLoading(false);
    }
  };


  return (
    <PaperProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="light" backgroundColor="#0B6B4F" />

        {!isOnline && <OfflineBanner />}
        <SafeAreaWrapper>
          <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaWrapper>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
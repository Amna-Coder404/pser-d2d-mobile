import {
    useFocusEffect,
    useRouter,
} from "expo-router";
import { useCallback, useState } from "react";
import {
    Alert,
    FlatList,
    Text,
    View
} from "react-native";

import DraftCard from "../../components/DraftCard";
import Loader from "../../components/Loader";
import OfflineCard from "../../components/Netinfo/OfflineCard";
import NotFound from "../../components/NotFound";

import { useNetworkStatus } from "../../hooks/useNetworkStatus";

import { getAllDrafts } from "../../services/draftList";
import { deleteDraft } from "../../services/drafts";
import {
    deleteCachedDraft,
    deleteLocalDraft,
} from "../../services/localDrafts";
import { syncDrafts } from "../../services/syncDrafts";

import { Appbar } from "react-native-paper";
import { useAuthStore } from "../../store/authStore";
import styles from "../../styles/drafts.styles";


const DraftsSurvey = () => {
    const user = useAuthStore((state) => state.user);

    const { isOnline } = useNetworkStatus();
    const [showOfflineCard, setShowOfflineCard] = useState(false);

    const [drafts, setDrafts] = useState([]);
    const [loading, setLoading] = useState(true);



    const router = useRouter();

    const onNext = (itemId) => {
        router.push({
            pathname: "/survey",
            params: { draftId: itemId, },
        });
    };

    const onDraftDelete = async (draft) => {
        // OFFLINE
        if (!isOnline) {
            setShowOfflineCard(true);
            return;
        }

        Alert.alert(
            "Delete Draft",
            "Are you sure you want to delete this draft?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            // Local draft
                            if (draft.id.startsWith("local-")) {
                                // Delete Supabase copy
                                // if it already exists
                                if (draft.remote_id) {
                                    await deleteDraft(draft.remote_id, user.id);
                                }

                                await deleteLocalDraft(draft.id, user.id);
                            }

                            // Remote draft
                            else {
                                await deleteDraft(draft.id, user.id);

                                // Remove it from
                                // offline cache too (mean asyn storage)
                                await deleteCachedDraft(draft.id, user.id);
                            }

                            await loadDrafts();
                        } catch (error) {
                            console.error("DELETE DRAFT ERROR:", error);
                        }
                    },
                },
            ]
        );
    };

    const loadDrafts = async () => {
        if (!user?.id) return;

        try {
            setLoading(true);

            // Sync local drafts first
            if (isOnline) {
                try {
                    await syncDrafts(user.id);
                } catch (error) {
                    console.error("DRAFT SYNC ERROR:", error);
                }
            }

            const data = await getAllDrafts(user.id, isOnline);

            setDrafts(data);
        } catch (error) {
            console.error("LOAD DRAFTS ERROR:", error);
        } finally {
            setLoading(false);
        }
    };


    // not need refrech or re-render our app
    useFocusEffect(
        useCallback(() => {
            loadDrafts();
        },
            [user?.id, isOnline,])
    );

    if (loading) {
        return <Loader />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Appbar.BackAction
                        onPress={() => router.back()}
                        style={styles.backButton}
                        color="white"
                    />

                    <View style={styles.headerText}>
                        <Text style={styles.title}>
                            Draft Surveys
                        </Text>

                        <Text style={styles.subtitle}>
                            Resume your incomplete PSER surveys
                        </Text>
                    </View>
                </View>
            </View>

            <FlatList
                data={drafts}
                keyExtractor={(item) => item.id}
                renderItem={({ item, }) => (
                    <DraftCard
                        item={item}
                        onNext={() => onNext(item.id)}
                        onDelete={() => onDraftDelete(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <NotFound
                        text="No draft surveys found."
                    />
                }
                contentContainerStyle={drafts.length === 0 && { flexGrow: 1, }}
            />

            {showOfflineCard && (
                <View style={styles.offlineOverlay}  >
                    <OfflineCard
                        onClose={() => setShowOfflineCard(false)}
                        text={"Please connect to the internet to delete this draft."}
                    />
                </View>
            )}
        </View>
    );
};

export default DraftsSurvey;
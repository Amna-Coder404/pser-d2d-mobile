
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
    Alert,
    FlatList, Text,
    TouchableOpacity,
    View
} from "react-native";

import Loader from "../../components/Loader";
import NotFound from "../../components/NotFound";
import { getDrafts } from "../../services/drafts";
import { useAuthStore } from "../../store/authStore";
import styles from "../../styles/drafts.styles";

import { Ionicons } from "@expo/vector-icons";
import DraftCard from "../../components/DraftCard";
import COLOR from "../../constant/colors";
import { deleteDraft } from "../../services/drafts";


const DraftsSurvey = () => {

    const user = useAuthStore((state) => state.user);

    const [drafts, setDrafts] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const onNext = (itemId) => {
        router.push({
            pathname: "/survey",
            params: { draftId: itemId, },
        })
    }


    const onDraftDelete = async (draftId) => {
        Alert.alert("Delete Draft",
            "Are you sure you want to delete this draft?",
            [
                { text: "Cancel" },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            await deleteDraft(draftId, user.id);
                            await loadDrafts();

                            console.log("DRAFT DELETED!!");
                        } catch (error) {
                            console.error("DELETE DRAFT ERROR:", error);
                        }
                    }
                }
            ]
        )
    };


    const loadDrafts = async () => {
        if (!user?.id) return;

        try {
            setLoading(true);
            const data = await getDrafts(user.id);
            setDrafts(data);
        } catch (error) {
            console.error("LOAD DRAFTS ERROR:", error);
        } finally {
            setLoading(false);

        }
    };


    useFocusEffect(
        useCallback(() => {
            loadDrafts();
        }, [user?.id])
    );



    if (loading) return <Loader />



    return (
        <View style={styles.container}>


            <View style={styles.header}>
                <View style={styles.back}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}   >
                        <Ionicons name="arrow-back" size={24} color={COLOR.text} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Draft Surveys</Text>
                </View>
                <Text style={styles.subtitle}>Resume your incomplete PSER surveys</Text>
            </View>

            <FlatList
                data={drafts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <DraftCard
                        item={item}
                        onNext={() => onNext(item.id)}
                        onDelete={() => onDraftDelete(item.id)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<NotFound text={"No draft surveys found."} />}
            />



        </View>
    );
};

export default DraftsSurvey;
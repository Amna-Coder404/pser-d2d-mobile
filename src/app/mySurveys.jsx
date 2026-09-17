import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import Loader from '../../components/Loader';
import SurveyCard from "../../components/SurveyCard";
import { getMySurveys } from "../../services/submissions";
import { useAuthStore } from '../../store/authStore';

import { Appbar } from 'react-native-paper';
import NotFound from '../../components/NotFound';
import styles from '../../styles/mySurveys.styles';

const MySurveys = () => {
    const user = useAuthStore((state) => state.user);
    const [surveys, setSurveys] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    useFocusEffect(
        useCallback(() => {
            loadMySurveys();
        }, [user?.id])
    );


    const loadMySurveys = async () => {
        if (!user?.id) return;
        setLoading(true);

        try {
            const mydata = await getMySurveys(user.id);
            setSurveys(mydata);
        }
        catch (error) {
            console.log("Faild to Find Survey!", error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <Loader />


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
                        <Text style={styles.title}>My Surveys</Text>
                        <Text style={styles.subtitle}>
                            Your completed PSER surveys
                        </Text>
                    </View>
                </View>
            </View>


            <FlatList
                data={surveys}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <SurveyCard item={item} />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<NotFound text={"No  surveys found."} />}
                contentContainerStyle={
                    surveys.length === 0 && {
                        flexGrow: 1,
                    }
                }
            />
        </View>
    )
}

export default MySurveys
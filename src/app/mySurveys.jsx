import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import Loader from '../../components/Loader';
import SurveyCard from "../../components/SurveyCard";
import { getMySurveys } from "../../services/submissions";
import { useAuthStore } from '../../store/authStore';

import { Ionicons } from '@expo/vector-icons';
import COLOR from '../../constant/colors';
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
                <View style={styles.back}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}   >
                        <Ionicons name="arrow-back" size={24} color={COLOR.text} />
                    </TouchableOpacity>
                    <Text style={styles.title}>My Surveys</Text>
                </View>
                <Text style={styles.subtitle}>View your completed PSER surveys</Text>
            </View>


            <FlatList
                data={surveys}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <SurveyCard item={item} />
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default MySurveys
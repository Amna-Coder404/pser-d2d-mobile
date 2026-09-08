import AsyncStorage from "@react-native-async-storage/async-storage";

const DRAFT_KEY = "pser_current_draft";

export const saveLocalDraft = async (draft) => {
    try {
        await AsyncStorage.setItem(
            DRAFT_KEY,
            JSON.stringify(draft)
        );
    } catch (error) {
        console.error("SAVE LOCAL DRAFT ERROR:", error);
        throw error;
    }
};

export const getLocalDraft = async () => {
    try {
        const draft = await AsyncStorage.getItem(DRAFT_KEY);

        if (!draft) {
            return null;
        }

        return JSON.parse(draft);
    } catch (error) {
        console.error("GET LOCAL DRAFT ERROR:", error);
        return null;
    }
};

export const clearLocalDraft = async () => {
    try {
        await AsyncStorage.removeItem(DRAFT_KEY);
    } catch (error) {
        console.error("CLEAR LOCAL DRAFT ERROR:", error);
        throw error;
    }
};
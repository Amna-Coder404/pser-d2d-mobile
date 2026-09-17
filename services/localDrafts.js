import AsyncStorage from "@react-native-async-storage/async-storage";

const DRAFTS_KEY = "pser_local_drafts";

// Get all locally cached drafts
export const getLocalDrafts = async () => {
    try {
        const drafts = await AsyncStorage.getItem(DRAFTS_KEY);

        return drafts ? JSON.parse(drafts) : [];
    } catch (error) {
        console.error("GET LOCAL DRAFTS ERROR:", error);
        throw error;
    }
};

// Get one local draft
export const getLocalDraft = async (draftId, employeeId) => {
    try {
        const drafts = await getLocalDrafts();

        return (
            drafts.find(
                (draft) =>
                    draft.id === draftId &&
                    draft.employee_id === employeeId
            ) || null
        );
    } catch (error) {
        console.error("GET LOCAL DRAFT ERROR:", error);
        throw error;
    }
};

// Save a new local draft
export const saveLocalDraft = async (employeeId, draftData, currentStep) => {
    try {
        if (!employeeId) {
            throw new Error("Employee ID is required.");
        }

        const drafts = await getLocalDrafts();

        const newDraft = {
            id: `local-${Date.now()}`,
            remote_id: null,
            employee_id: employeeId,
            current_step: currentStep,

            person_name: draftData.person_name || "",
            phone_number: draftData.phone_number || "",
            cnic: draftData.cnic || "",
            person_image_url: draftData.person_image_url || null,
            address: draftData.address || "",
            age: draftData.age || "",
            education: draftData.education || "",
            occupation: draftData.occupation || "",
            has_house: draftData.has_house ?? null,
            has_illness: draftData.has_illness ?? null,
            marital_status: draftData.marital_status || "",
            illness_details:
                draftData.has_illness === true
                    ? draftData.illness_details || ""
                    : "",

            synced: false,
            updated_at: new Date().toISOString(),
        };

        drafts.push(newDraft);

        await AsyncStorage.setItem(
            DRAFTS_KEY,
            JSON.stringify(drafts)
        );

        return newDraft;
    } catch (error) {
        console.error("SAVE LOCAL DRAFT ERROR:", error);
        throw error;
    }
};

// Update an existing local draft
export const updateLocalDraft = async (
    draftId,
    employeeId,
    draftData,
    currentStep
) => {
    try {
        const drafts = await getLocalDrafts();

        const index = drafts.findIndex(
            (draft) =>
                draft.id === draftId &&
                draft.employee_id === employeeId
        );

        if (index < 0) {
            throw new Error("Local draft not found.");
        }

        drafts[index] = {
            ...drafts[index],

            current_step: currentStep,

            person_name: draftData.person_name || "",
            phone_number: draftData.phone_number || "",
            cnic: draftData.cnic || "",
            person_image_url:
                draftData.person_image_url || null,
            address: draftData.address || "",
            age: draftData.age || "",
            education: draftData.education || "",
            occupation: draftData.occupation || "",
            has_house: draftData.has_house ?? null,
            has_illness: draftData.has_illness ?? null,
            marital_status: draftData.marital_status || "",
            illness_details:
                draftData.has_illness === true
                    ? draftData.illness_details || ""
                    : "",

            synced: false,
            updated_at: new Date().toISOString(),
        };

        await AsyncStorage.setItem(
            DRAFTS_KEY,
            JSON.stringify(drafts)
        );

        return drafts[index];
    } catch (error) {
        console.error("UPDATE LOCAL DRAFT ERROR:", error);
        throw error;
    }
};

// Delete a local draft
export const deleteLocalDraft = async (
    draftId,
    employeeId
) => {
    try {
        const drafts = await getLocalDrafts();

        const filteredDrafts = drafts.filter(
            (draft) =>
                !(
                    draft.id === draftId &&
                    draft.employee_id === employeeId
                )
        );

        await AsyncStorage.setItem(
            DRAFTS_KEY,
            JSON.stringify(filteredDrafts)
        );

        return true;
    } catch (error) {
        console.error("DELETE LOCAL DRAFT ERROR:", error);
        throw error;
    }
};

// Replace/update local cache with Supabase drafts
export const saveCachedDrafts = async (drafts) => {
    try {
        await AsyncStorage.setItem(
            DRAFTS_KEY,
            JSON.stringify(drafts)
        );
    } catch (error) {
        console.error("SAVE CACHED DRAFTS ERROR:", error);
        throw error;
    }
};

// Update one cached draft
export const updateCachedDraft = async (draft) => {
    try {
        const drafts = await getLocalDrafts();

        const index = drafts.findIndex(
            (item) =>
                item.employee_id === draft.employee_id &&
                (
                    item.remote_id === draft.id ||
                    item.id === draft.id
                )
        );

        const cachedDraft = {
            ...draft,
            remote_id: draft.id,
            synced: true,
        };

        if (index >= 0) {
            drafts[index] = {
                ...drafts[index],
                ...cachedDraft,
            };
        } else {
            drafts.push(cachedDraft);
        }

        await AsyncStorage.setItem(
            DRAFTS_KEY,
            JSON.stringify(drafts)
        );

        return cachedDraft;
    } catch (error) {
        console.error("UPDATE CACHED DRAFT ERROR:", error);
        throw error;
    }
};

// Remove a remote draft from local cache
export const deleteCachedDraft = async (
    draftId,
    employeeId
) => {
    try {
        const drafts = await getLocalDrafts();

        const filteredDrafts = drafts.filter(
            (draft) =>
                !(
                    draft.employee_id === employeeId &&
                    (
                        draft.id === draftId ||
                        draft.remote_id === draftId
                    )
                )
        );

        await AsyncStorage.setItem(
            DRAFTS_KEY,
            JSON.stringify(filteredDrafts)
        );

        return true;
    } catch (error) {
        console.error("DELETE CACHED DRAFT ERROR:", error);
        throw error;
    }
};

// Mark a local draft as synced
export const markDraftAsSynced = async (
    localId,
    remoteId,
    employeeId
) => {
    try {
        const drafts = await getLocalDrafts();

        const index = drafts.findIndex(
            (draft) =>
                draft.id === localId &&
                draft.employee_id === employeeId
        );

        if (index < 0) {
            throw new Error("Local draft not found.");
        }

        drafts[index] = {
            ...drafts[index],
            remote_id: remoteId,
            synced: true,
            updated_at: new Date().toISOString(),
        };

        await AsyncStorage.setItem(
            DRAFTS_KEY,
            JSON.stringify(drafts)
        );

        return drafts[index];
    } catch (error) {
        console.error("MARK DRAFT AS SYNCED ERROR:", error);
        throw error;
    }
};
import * as ImagePicker from "expo-image-picker";
import { useEffect, useRef, useState } from "react";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import { uploadPersonImage } from "../lib/storage";
import {
    deleteDraft,
    getDraft,
    saveDraft,
    updateDraft,
} from "../services/drafts";
import {
    deleteLocalDraft,
    getLocalDraft,
    saveLocalDraft,
    updateLocalDraft,
} from "../services/localDrafts";
import { submitSurvey } from "../services/submissions";
import { syncDrafts } from "../services/syncDrafts";

const initialFormData = {
    person_name: "",
    phone_number: "",
    cnic: "",
    person_image_url: "",
    address: "",
    age: "",
    education: "",
    occupation: "",
    has_house: null,
    has_illness: null,
    marital_status: "",
    illness_details: "",
};
// TODO
export const useSurvey = (user, draftId) => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [activeDraftId, setActiveDraftId] = useState(draftId || null);

    const { isOnline } = useNetworkStatus();

    const isInitialLoad = useRef(true);
    const isSaving = useRef(false);

    // UPDATE FORM FIELD
    const updateField = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // SYNC LOCAL DRAFTS WHEN INTERNET COMES BACK
    useEffect(() => {
        if (!user?.id || !isOnline) return;

        const sync = async () => {
            try {
                await syncDrafts(user.id);
            } catch (error) {
                console.error("AUTO SYNC ERROR:", error);
            }
        };

        sync();
    }, [isOnline, user?.id]);

    // LOAD EXISTING DRAFT
    useEffect(() => {
        const loadDraft = async () => {
            if (!draftId || !user?.id) {
                isInitialLoad.current = false;
                return;
            }

            try {
                setLoading(true);

                let draft;

                if (draftId.startsWith("local-")) {
                    draft = await getLocalDraft(
                        draftId,
                        user.id
                    );
                } else {
                    draft = await getDraft(
                        draftId,
                        user.id
                    );
                }

                if (!draft) {
                    throw new Error("Draft not found.");
                }

                setFormData({
                    person_name: draft.person_name || "",
                    phone_number: draft.phone_number || "",
                    cnic: draft.cnic || "",
                    person_image_url:
                        draft.person_image_url || "",
                    address: draft.address || "",
                    age: draft.age || "",
                    education: draft.education || "",
                    occupation: draft.occupation || "",
                    has_house: draft.has_house ?? null,
                    has_illness: draft.has_illness ?? null,
                    marital_status:
                        draft.marital_status || "",
                    illness_details:
                        draft.illness_details || "",
                });

                setStep(
                    draft.current_step || 1
                );

                setActiveDraftId(draft.id);
            } catch (error) {
                console.error(
                    "LOAD DRAFT ERROR:",
                    error
                );
            } finally {
                setLoading(false);
                isInitialLoad.current = false;
            }
        };

        loadDraft();
    }, [draftId, user?.id]);

    // CHECK IF FORM HAS DATA
    const hasFormData = Object.values(formData).some(
        (value) => value !== "" && value !== null
    );

    // AUTO SAVE DRAFT
    useEffect(() => {
        if (
            !user?.id ||
            isInitialLoad.current ||
            !hasFormData
        ) {
            return;
        }

        const timer = setTimeout(
            async () => {
                if (isSaving.current) return;

                try {
                    isSaving.current = true;

                    // OFFLINE
                    if (!isOnline) {
                        if (
                            activeDraftId?.startsWith(
                                "local-"
                            )
                        ) {
                            await updateLocalDraft(
                                activeDraftId,
                                user.id,
                                formData,
                                step
                            );
                        } else {
                            const newDraft =
                                await saveLocalDraft(
                                    user.id,
                                    formData,
                                    step
                                );

                            setActiveDraftId(
                                newDraft.id
                            );
                        }
                    }

                    // ONLINE
                    else {
                        // Existing local draft
                        if (
                            activeDraftId?.startsWith(
                                "local-"
                            )
                        ) {
                            await syncDrafts(
                                user.id
                            );

                            const localDraft =
                                await getLocalDraft(
                                    activeDraftId,
                                    user.id
                                );

                            if (
                                localDraft?.remote_id
                            ) {
                                await updateDraft(
                                    localDraft.remote_id,
                                    user.id,
                                    formData,
                                    step
                                );
                            }
                        }

                        // Existing remote draft
                        else if (activeDraftId) {
                            await updateDraft(
                                activeDraftId,
                                user.id,
                                formData,
                                step
                            );
                        }

                        // New online draft
                        else {
                            const newDraft =
                                await saveDraft(
                                    user.id,
                                    formData,
                                    step
                                );

                            setActiveDraftId(
                                newDraft.id
                            );
                        }
                    }
                } catch (error) {
                    console.error(
                        "AUTO SAVE DRAFT ERROR:",
                        error
                    );
                } finally {
                    isSaving.current = false;
                }
            },
            1500
        );

        return () =>
            clearTimeout(timer);
    }, [
        formData,
        step,
        activeDraftId,
        user?.id,
        hasFormData,
        isOnline,
    ]);

    // NEXT STEP
    const nextStep = () => {
        setStep((prev) =>
            prev < 3 ? prev + 1 : prev
        );
    };

    // PREVIOUS STEP
    const previousStep = () => {
        setStep((prev) =>
            prev > 1 ? prev - 1 : prev
        );
    };

    // SUBMIT SURVEY
    const submit = async () => {
        if (!user?.id) {
            throw new Error(
                "Employee information not found."
            );
        }

        try {
            setLoading(true);

            let imageUrl = null;

            // Upload person image
            if (formData.person_image_url) {
                imageUrl =
                    await uploadPersonImage(
                        formData.person_image_url
                    );
            }

            // Submit final survey
            await submitSurvey(
                user.id,
                {
                    ...formData,
                    person_image_url: imageUrl,
                }
            );

            // DELETE DRAFT AFTER SUCCESS
            if (activeDraftId) {
                if (
                    activeDraftId.startsWith(
                        "local-"
                    )
                ) {
                    const localDraft =
                        await getLocalDraft(
                            activeDraftId,
                            user.id
                        );

                    if (localDraft) {
                        if (
                            localDraft.remote_id
                        ) {
                            await deleteDraft(
                                localDraft.remote_id,
                                user.id
                            );
                        }

                        await deleteLocalDraft(
                            activeDraftId,
                            user.id
                        );
                    }
                } else {
                    await deleteDraft(
                        activeDraftId,
                        user.id
                    );
                }
            }

            setFormData(initialFormData);
            setStep(1);
            setActiveDraftId(null);

            return true;
        } catch (error) {
            console.error("FULL SUBMIT ERROR:", error);

            throw error;
        } finally {
            setLoading(false);
        }
    };

    // IMAGE PICKER
    const pickPersonImage = async (type) => {
        let result;

        if (type === "camera") {
            const permission =
                await ImagePicker
                    .requestCameraPermissionsAsync();

            if (!permission.granted) return;

            result =
                await ImagePicker
                    .launchCameraAsync({
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 0.8,
                    });
        } else {
            const permission =
                await ImagePicker
                    .requestMediaLibraryPermissionsAsync();

            if (!permission.granted) return;

            result =
                await ImagePicker
                    .launchImageLibraryAsync({
                        mediaTypes: ["images"],
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 0.8,
                    });
        }

        if (!result.canceled) {
            updateField(
                "person_image_url",
                result.assets[0].uri
            );
        }
    };

    return {
        formData,
        step,
        loading,
        updateField,
        nextStep,
        previousStep,
        submit,
        activeDraftId,
        pickPersonImage,
    };
};
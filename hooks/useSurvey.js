import { useEffect, useRef, useState } from "react";

import {
    deleteDraft,
    getDraft,
    saveDraft,
    updateDraft,
} from "../services/drafts";

import { submitSurvey } from "../services/submissions";

const initialFormData = {
    person_name: "",
    phone_number: "",
    address: "",
    age: "",
    education: "",
    occupation: "",
    has_house: null,
    has_illness: null,
    marital_status: "",
    illness_details: "",
};

export const useSurvey = (user, draftId) => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState(initialFormData);

    const [activeDraftId, setActiveDraftId] = useState(draftId || null);

    const isInitialLoad = useRef(true);
    const isSaving = useRef(false);

    // UPDATE FORM FIELD
    const updateField = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };


    // LOAD EXISTING DRAFT
    useEffect(() => {
        const loadDraft = async () => {
            if (!draftId || !user?.id) {
                isInitialLoad.current = false;
                return;
            }

            try {
                setLoading(true);

                const draft = await getDraft(draftId, user.id);

                setFormData({
                    person_name: draft.person_name || "",
                    phone_number: draft.phone_number || "",
                    address: draft.address || "",
                    age: draft.age || "",
                    education: draft.education || "",
                    occupation: draft.occupation || "",
                    has_house: draft.has_house ?? null,
                    has_illness: draft.has_illness ?? null,
                    marital_status: draft.marital_status || "",
                    illness_details: draft.illness_details || "",
                });

                setStep(draft.current_step || 1);

                setActiveDraftId(draft.id);

            } catch (error) {
                console.error("LOAD DRAFT ERROR:", error);
            } finally {
                setLoading(false);
                isInitialLoad.current = false;
            }
        };

        loadDraft();

    }, [draftId, user?.id]);


    // CHECK IF FORM HAS DATA

    const hasFormData = Object.values(formData).some(
        (value) =>
            value !== "" &&
            value !== null
    );


    // AUTO SAVE DRAFT
    useEffect(() => {
        if (!user?.id) return;

        if (isInitialLoad.current) return;

        if (!hasFormData) return;

        const timer = setTimeout(async () => {
            if (isSaving.current) return;

            try {
                isSaving.current = true;

                if (activeDraftId) {
                    await updateDraft(
                        activeDraftId,
                        user.id,
                        formData,
                        step
                    );

                } else {
                    const newDraft = await saveDraft(user.id, formData,
                        step
                    );

                    setActiveDraftId(newDraft.id);
                }

            } catch (error) {
                console.error("AUTO SAVE DRAFT ERROR:", error);

            } finally {
                isSaving.current = false;

            }

        }, 1500);

        return () => clearTimeout(timer);

    }, [
        formData,
        step,
        activeDraftId,
        user?.id,
        hasFormData,
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

            // Submit completed survey
            await submitSurvey(
                user.id,
                formData
            );

            // Delete draft after successful submission
            if (activeDraftId) {
                await deleteDraft(
                    activeDraftId,
                    user.id
                );
            }

            // Reset survey
            setFormData(initialFormData);
            setStep(1);
            setActiveDraftId(null);

            return true;

        } catch (error) {

            console.error("SUBMIT SURVEY ERROR:", error);
            throw error;

        } finally {
            setLoading(false);
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
    };
};
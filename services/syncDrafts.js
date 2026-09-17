import { saveDraft, updateDraft } from "./drafts";
import {
    getLocalDrafts,
    markDraftAsSynced,
} from "./localDrafts";

export const syncDrafts = async (employeeId) => {
    try {
        if (!employeeId) {
            throw new Error("Employee ID is required.");
        }

        const localDrafts = await getLocalDrafts();

        const employeeDrafts = localDrafts.filter(
            (draft) => draft.employee_id === employeeId
        );

        for (const draft of employeeDrafts) {
            if (draft.synced === true) {
                continue;
            }

            // Local draft has never been uploaded
            if (!draft.remote_id) {
                const newRemoteDraft = await saveDraft(
                    employeeId,
                    draft,
                    draft.current_step
                );

                await markDraftAsSynced(
                    draft.id,
                    newRemoteDraft.id,
                    employeeId
                );

                continue;
            }

            // Local draft already has a Supabase ID
            await updateDraft(
                draft.remote_id,
                employeeId,
                draft,
                draft.current_step
            );

            await markDraftAsSynced(
                draft.id,
                draft.remote_id,
                employeeId
            );
        }

        return true;
    } catch (error) {
        console.error("SYNC DRAFTS ERROR:", error);
        throw error;
    }
};
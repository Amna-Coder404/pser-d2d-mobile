
// This is responsible for deciding what drafts the Draft screen should display.

import { getDrafts } from "./drafts";
import { getLocalDrafts, saveCachedDrafts } from "./localDrafts";

export const getAllDrafts = async (employeeId, isOnline) => {
    try {
        if (!employeeId) {
            throw new Error("Employee ID is required.");
        }

        // ONLINE
        if (isOnline) {
            const remoteDrafts = await getDrafts(employeeId);
            const localDrafts = await getLocalDrafts();

            const employeeLocalDrafts = localDrafts.filter(
                (draft) => draft.employee_id === employeeId
            );

            const localOnlyDrafts = employeeLocalDrafts.filter(
                (draft) => !draft.remote_id
            );

            const remoteDraftsWithCache = remoteDrafts.map(
                (remoteDraft) => {
                    const cachedDraft = employeeLocalDrafts.find(
                        (localDraft) =>
                            localDraft.remote_id === remoteDraft.id
                    );

                    return cachedDraft
                        ? {
                            ...cachedDraft,
                            ...remoteDraft,
                            id: cachedDraft.id,
                            remote_id: remoteDraft.id,
                            synced: true,
                        }
                        : {
                            ...remoteDraft,
                            remote_id: remoteDraft.id,
                            synced: true,
                        };
                }
            );

            const allDrafts = [
                ...remoteDraftsWithCache,
                ...localOnlyDrafts,
            ];

            // Update local cache
            const otherEmployeesDrafts = localDrafts.filter(
                (draft) => draft.employee_id !== employeeId
            );

            await saveCachedDrafts([
                ...otherEmployeesDrafts,
                ...allDrafts,
            ]);

            return allDrafts;
        }

        // OFFLINE
        const localDrafts = await getLocalDrafts();

        return localDrafts.filter(
            (draft) => draft.employee_id === employeeId
        );
    } catch (error) {
        console.error("GET ALL DRAFTS ERROR:", error);
        throw error;
    }
};
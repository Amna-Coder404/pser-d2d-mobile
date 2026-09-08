import { supabase } from "../lib/supabase";

//Save a new survey draft (in supabase)

export const saveDraft = async (employeeId, draftData, currentStep) => {
    if (!employeeId) {
        throw new Error("Employee ID is required.");
    }

    const {
        person_name,
        phone_number,
        address,
        age,
        education,
        occupation,
        has_house,
        has_illness,
        marital_status,
        illness_details,
    } = draftData;


    const { data, error } = await supabase.from("pser_drafts")
        .insert({
            employee_id: employeeId,
            current_step: currentStep,

            person_name: person_name.trim(),
            phone_number: phone_number.trim(),
            address: address.trim(),
            age: age.trim(),

            education: education.trim(),
            occupation: occupation.trim(),

            has_house,
            has_illness,
            marital_status: marital_status.trim(),
            illness_details: has_illness === true
                ? illness_details?.trim() || ""
                : "",
        })
        .select()
        .single();

    if (error) {
        console.error("SAVE DRAFT ERROR:", error);
        throw error;
    }

    return data;
}


//Get all drafts belonging to an employee
export const getDrafts = async (employeeId) => {
    if (!employeeId) {
        throw new Error("Employee ID is required.");
    }

    const { data, error } = await supabase
        .from("pser_drafts")
        .select("*")
        .eq("employee_id", employeeId)
        .order("updated_at", { ascending: false });

    if (error) {
        console.error("GET DRAFTS ERROR:", error);
        throw error;
    }

    return data;
}


//  Get one specific draft
export const getDraft = async (draftId, employeeId) => {
    if (!draftId || !employeeId) {
        throw new Error("Draft ID and Employee ID are required.");
    }

    const { data, error } = await supabase
        .from("pser_drafts")
        .select("*")
        .eq("id", draftId)
        .eq("employee_id", employeeId)
        .single();
    if (error) {
        console.error("GET DRAFT ERROR:", error);
        throw error;
    }

    return data;
};


// Update an existing draft
export const updateDraft = async (
    draftId,
    employeeId,
    draftData,
    currentStep
) => {

    if (!draftId || !employeeId) {
        throw new Error("Draft ID and Employee ID are required.");
    }

    const {
        person_name,
        phone_number,
        address,
        age,
        education,
        occupation,
        has_house,
        has_illness,
        marital_status,
        illness_details,
    } = draftData;


    const { data, error } = await supabase
        .from("pser_drafts")
        .update({
            current_step: currentStep,

            person_name: person_name.trim(),
            phone_number: phone_number.trim(),
            address: address.trim(),
            age: age.trim(),

            education: education.trim(),
            occupation: occupation.trim(),

            has_house,
            has_illness,
            marital_status: marital_status.trim(),
            illness_details:
                has_illness === true
                    ? illness_details?.trim() || ""
                    : "",
        })
        .eq("id", draftId)
        .eq("employee_id", employeeId)
        .select()
        .single();

    if (error) {
        console.error("UPDATE DRAFT ERROR:", error);
        throw error;
    }

    return data;
}


// Delete a draft
export const deleteDraft = async (draftId, employeeId) => {
    if (!draftId || !employeeId) {
        throw new Error("Draft ID and Employee ID are required.");
    }

    const { error } = await supabase
        .from("pser_drafts")
        .delete()
        .eq("id", draftId)
        .eq("employee_id", employeeId);

    if (error) {
        console.error("DELETE DRAFT ERROR:", error);
        throw error;
    }

    return true;
};
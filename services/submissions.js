import { supabase } from "../lib/supabase";

/**
 * Submit a completed survey
 *
 * All survey fields are stored in the same `pser_submissions` table.
 */
export const submitSurvey = async (employeeId, surveyData) => {
    if (!employeeId) {
        throw new Error("Employee ID is required.");
    }

    const {
        person_name,
        phone_number,
        address,
        age,
        education,
        has_house,
        occupation,
        has_illness,
        marital_status,
        illness_details,
    } = surveyData;

    const { data, error } = await supabase
        .from("pser_submissions")
        .insert({
            employee_id: employeeId,
            person_name: person_name.trim(),
            phone_number: phone_number.trim(),
            address: address.trim(),
            age: Number(age),
            education: education.trim(),
            has_house,
            occupation: occupation.trim(),
            has_illness,
            marital_status: marital_status.trim(),
            illness_details:
                has_illness === true
                    ? illness_details?.trim() || null
                    : null,
        })
        .select()
        .single();

    if (error) {
        console.error("SUBMIT SURVEY ERROR:", error);
        throw error;
    }

    return data;
};


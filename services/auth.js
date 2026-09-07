import { supabase } from "../lib/supabase";

export const loginEmployee = async (email, password) => {
    const { data, error, } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}


// get the currently logged-in user's session
export const getCurrentSession = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
        throw new Error(error.message);
    }
    return data.session;
}



// Get employee profile from profile table

export const getEmployeeProfile = async (userId) => {
    const { data, error } = await supabase
        .from("profiles")
        .select(
            "id, full_name, role, cnic, block_assign_number, profile_image_url"
        )
        .eq("id", userId)
        .single();


    if (error) {
        throw new Error(error.message);
    }


    if (!data) {
        throw new Error("Employee profile not found.");
    }

    if (data.role !== "employee") {
        throw new Error("Access denied. Employee account required.");
    }

    return data;
}



// Logout current user 
export const logoutEmployee = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw new Error(error.message);
    }
}
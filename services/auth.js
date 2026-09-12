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
            "id, full_name, role, cnic, block_assign_number, profile_image_url, is_active"
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
    if (!data.is_active) {
        throw new Error("Your employee account is inactive. Please contact the admin.");
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


// Change Passoword

export const changePassword = async (oldPwd, newPwd) => {

    const { data: { user }, error: userError, } = await supabase.auth.getUser();

    if (userError || !user) {
        throw new Error("User not found.");
    }

    const email = user.email;

    const { error: passwordError } = await supabase.auth.signInWithPassword({ email, password: oldPwd });

    if (passwordError) {
        throw new Error("Old password is incorrect.");
    }

    // Update password
    const { error: updateError } = await supabase.auth.updateUser({ password: newPwd });

    if (updateError) {
        throw updateError;
    }

    return true;
}



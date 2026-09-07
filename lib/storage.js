// Supabase Storage path lo ---> signed URL return karo.

import { supabase } from "./supabase";

export const getImageUrl = async (imagePath) => {
    if (!imagePath) {
        return null;
    }

    const { data, error } = await supabase.storage
        .from("employee-images")
        .createSignedUrl(imagePath, 60 * 60);

    if (error) {
        console.log("IMAGE URL ERROR:", error);
        return null;
    }

    return data.signedUrl;
};
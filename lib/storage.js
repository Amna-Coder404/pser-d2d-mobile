// Supabase Storage path lo ---> signed URL return karo.
import { File } from "expo-file-system";
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


// Upload Person Image

export const uploadPersonImage = async (uri) => {
    console.log("UPLOAD FUNCTION START");
    console.log("IMAGE PATH:", uri);

    // Get actual file extension
    const extension =
        uri.split(".").pop()?.toLowerCase() || "jpg";

    let contentType = "image/jpeg";

    if (extension === "png") {
        contentType = "image/png";
    } else if (extension === "jpg" || extension === "jpeg") {
        contentType = "image/jpeg";
    }

    console.log("IMAGE EXTENSION:", extension);
    console.log("CONTENT TYPE:", contentType);

    const file = new File(uri);

    console.log("FILE CREATED");

    const base64 = await file.base64();

    console.log("BASE64 CREATED");

    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    console.log("BYTE ARRAY CREATED");

    const fileName = `person-${Date.now()}.${extension}`;

    const { error } = await supabase.storage
        .from("person-images")
        .upload(fileName, byteArray, {
            contentType,
            upsert: false,
        });

    if (error) {
        console.log("PERSON IMAGE UPLOAD ERROR:", error);
        throw error;
    }

    console.log("IMAGE UPLOADED");

    const { data } = supabase.storage
        .from("person-images")
        .getPublicUrl(fileName);

    console.log("PUBLIC IMAGE URL:", data.publicUrl);

    return data.publicUrl;
};
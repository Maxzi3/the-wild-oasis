import supabase, { supabaseUrl } from "./supabase";
import { v4 as uuidv4 } from "uuid";

export const getCabins = async () => {
  let { data, error } = await supabase.from("Cabin").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be loaded");
  }
  return data;
};

export const createUpdateCabin = async (newCabin, id) => {
  // Check if imagePath already exists (edit case)
  const hasImagePath =
    typeof newCabin.image === "string" &&
    newCabin.image.startsWith(
      `${supabaseUrl}/storage/v1/object/public/cabin-images/`
    );
  const imageName = `${uuidv4()}-${newCabin.image?.name || ""}`;
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  try {
    // 1. Upload the image (only if new image is provided)
    if (!hasImagePath && newCabin.image instanceof File) {
      const { error: imageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

      if (imageError) {
        console.error(imageError);
        throw new Error("Cabin image could not be uploaded");
      }
    }

    // 2. Insert or update the cabin
    let query = supabase.from("Cabin");
    if (!id) {
      // Create new cabin
      query = query.insert([{ ...newCabin, image: imagePath }]);
    } else {
      // Update existing cabin
      query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
    }

    const { data, error } = await query.select();

    if (hasImagePath) return data;
    if (error) {
      console.error(error);
      throw new Error("Cabin could not be created or updated");
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("Cabin").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
};

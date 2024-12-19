import supabase from "./supabase";

export const getCabins = async () => {
  let { data, error } = await supabase.from("Cabin").select("*");
  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded");
  }
  return data;
};

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("Cabin").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("cabins could not be deleted");
  }
  return data;
};

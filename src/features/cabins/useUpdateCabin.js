import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const useUpdateCabin = () => {
  const queryClient = useQueryClient();
  const { mutate: UpdateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newCabinData, id }) => createUpdateCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin succesfully Updated");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { UpdateCabin, isUpdating };
};

export default useUpdateCabin;

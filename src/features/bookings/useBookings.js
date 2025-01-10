import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

const useBookings = () => {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: "filterValue" };
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["Bookings"],
    queryFn: () => getBookings({ filter }),
  });
  return { isLoading, bookings, error };
};

export default useBookings;

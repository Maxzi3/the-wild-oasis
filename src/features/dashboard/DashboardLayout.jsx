import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { isLoading: isLoading1, bookings } = useRecentBookings();
  const { isLoading: isLoading2, stays, confirmedStays } = useRecentStays();
  const isLoading = isLoading1 || isLoading2;


  if (isLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      {/* <Stats bookings={bookings} confirmedStays={confirmedStays} /> */}
      <div>Today's activity</div>
      <div>Chart Stay Duation</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;

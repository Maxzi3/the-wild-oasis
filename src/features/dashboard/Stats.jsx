/* eslint-disable react/prop-types */
import { HiOutlineBriefcase } from "react-icons/hi2";
import Stat from "./Stat";

const Stats = ({ confirmedStays, bookings }) => {
  const numBookings = bookings?.length;
  const numConfirmedStays = confirmedStays.length;
  return (
    <>
      <Stat
        title="bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat />
      <Stat />
      <Stat />
    </>
  );
};

export default Stats;

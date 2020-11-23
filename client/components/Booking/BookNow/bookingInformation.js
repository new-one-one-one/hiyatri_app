
const BookingInformation = ({ data, query }) => {
  const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
  const arrival = query.pid === "arrival";
  const departure = query.pid === "departure";

  return (
    <div className="booking-Information">
      <table>
        <thead>
          <tr>
            <th>Train No.</th>
            <th>Train Name</th>
            <th>{capitalize(query.pid)} Station</th>
            <th>{capitalize(query.pid)} Time</th>
            <th>{capitalize(query.pid)} Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.train_number}</td>
             <td>{data.train_name}</td>
             <td>{arrival?data.reservation_upto.station_name:departure?data.boarding_station.station_name:""}</td>
             <td>{arrival?data.reservation_upto.time:departure?data.boarding_station.time:""}</td>
             <td>{arrival?data.reservation_upto.date:departure?data.boarding_station.date:""}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BookingInformation;

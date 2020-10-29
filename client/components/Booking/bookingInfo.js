
const BookingInformation = ({ data }) => {
  return (
    <div className="booking-Information">
      <table>
        <thead>
          <tr>
            <th>Train No.</th>
            <th>Train Name</th>
            <th>Arrival Station</th>
            <th>Arrival Time</th>
            <th>Arrival Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.train_number}</td>
            <td>{data.train_name}</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BookingInformation;

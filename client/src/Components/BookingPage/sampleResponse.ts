export const SampleResponse = {
  status: "success",
  pnr_details: {
    pnr_number: "8432407269",
    train_name: "ADI GKP SPL",
    train_number: "09089",
    class: "3A",
    no_of_passengers: 3,
    quota: "GN",
    pass_info: [
      {
        passenger_name: "Passenger 1",
        booking_status_details: "CNF B2 14",
        current_status_details: "CAN 0",
      },
      {
        passenger_name: "Passenger 2",
        booking_status_details: "CNF B2 13",
        current_status_details: "CAN 0",
      },
      {
        passenger_name: "Passenger 3",
        booking_status_details: "CNF B2 16",
        current_status_details: "CAN 0",
      },
    ],
    boarding_station: {
      station_code: "BSB",
      station_name: "Varanasi Jn",
      date: "30-11-2020",
      time: "03:20",
    },
    reservation_upto: {
      station_code: "GKP",
      station_name: "Gorakhpur Jn",
      date: "30-11-2020",
      time: "08:00",
    },
    travel_time: "4h 40m ",
    chart_status: false,
  },
};

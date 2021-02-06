export const ACTIONS = {
    TRAIN_NO:"train_no",
    STATE:"state",
    USER:"user_id",
    PNR:"pnr",
  
    BOARDING_STATION: {
      DATE: "date",
      TIME: "time",
      STATION_NAME: "station_name",
      STATION_CODE: "station_code"
    },
    RESERVATION_UPTO: {
      DATE: "date",
      TIME: "time",
      STATION_NAME: "station_name",
      STATION_CODE: "station_code"
  },
    IS_ARRIVAL:"is_arrival",
    PASSENGER_CONTACT_INFO:{
      NAME:"name",
      PRIMARY:"primary_number",
      SECONDARY:"secondary_number",
      EMAIL:"email"
    },
    PASSENGER_DETAIL:{
      NAME:"passenger_detail_name",
      AGE:"passenger_detail_age",
      GENDER:"passenger_detail_gender",
      MEETGREET:"passenger_detail_meet_and_greet",
      WHEELCHAIR:"passenger_detail_wheel_chair",
      GOLFCART:"passenger_detail_golf_cart",
      BILL:{
        MEETGREET:"mg_price",
        WHEELCHAIR:"wl_price",
        GOLFCART:"gc_price",
        TOTAL:"passenger_total_bill",
        TOTAL_ZERO:"total_zero",
        MEETGREET_ZERO:"meet_and_greet_zero",
        GOLFCART_ZERO:"golf_cart_zero",
        WHEELCHAIR_ZERO:"wheel_chair_zero",
      }
    },
    CAB_SERVICE:{
      OPTED:"cab_copted",
      DESTINATION:"cab_destination",
      NUMBER_OF_PASS:"cab_number_of_pass",
      LAGGAGE_BAG:"cab_laggage_bag",
      NUMBER_OF_CAB:"cab_number_of_cab",
      TOTAL_AMOUNT:"cab_price"
    },
    PORTER_SERVICE:{
      OPTED:"porter_copted",
      LARGE_BAG:"porter_large_bags",
      MEDIUM_BAG:"porter_medium_bags",
      SMALL_BAG:"porter_small_bags",
      PORTER_BILL:"porter_bill",
      PORTER_BILL_ZERO:"porter_bill_zero",
      BAGGAGE_GARANTEED:{
        OPTED: "baggage_garanteed_opted",
        LARGE_BAG:"bg_large_bags",
        MEDIUM_BAG:"bg_medium_bags",
        SMALL_BAG:"bg_small_bags",
        BG_BILL:"bg_bill",
        BG_BILL_ZERO:"bg_bill_zero"
      }
    },
    TOTAL_AMOUNT: "total_amount"
  }


 

  export const MONTH = { 
    "1":"Jan", 
    "2":"Feb", 
    "3":"Mar",
    "4":"Apr",
    "5":"May",
    "6":"June",
    "7":"July",
    "8":"Aug",
    "9":"Sep",
    "10":"Oct",
    "11":"Nov",
    "12":"Dec"
  };

export const getServiceAmount = (service_name, category) => {
    if(service_name === "meet_and_greet"){
          if(category === "Sr citizen(above 58 years)"){
            return process.env.NEXT_PUBLIC_MEET_GREET_ABOVE_58_PRICE
          }
          if(category === "Adult(12-58 years)"){
            return process.env.NEXT_PUBLIC_MEET_GREET_12_TO_58_PRICE
          }
          if(category === "Children(upto 12 years)"){
            return process.env.NEXT_PUBLIC_MEET_GREET_5_TO_12_PRICE
          }
    }
    if(service_name === "wheel_chair"){
         return process.env.NEXT_PUBLIC_WHEEL_CHAIR_PRICE;
    }
    if(service_name === "golf_cart"){
          if(category === "Sr citizen(above 58 years)"){
            return process.env.NEXT_PUBLIC_GOLF_CART_ABOVE_58_PRICE
          }
          if(category === "Adult(12-58 years)"){
            return process.env.NEXT_PUBLIC_GOLF_CART_12_TO_58_PRICE
          }
          if(category === "Children(upto 12 years)"){
            return process.env.NEXT_PUBLIC_GOLF_CART_5_TO_12_PRICE
          }
    }
    if(service_name === "luggage_bags"){
          if(category === "BELOW_7KG"){
            return process.env.NEXT_PUBLIC_GOLF_CART_ABOVE_58_PRICE
          }
          if(category === "7KG_TO_20KG"){
            return process.env.NEXT_PUBLIC_GOLF_CART_12_TO_58_PRICE
          }
          if(category === "20KG_TO_30KG"){
            return process.env.NEXT_PUBLIC_GOLF_CART_5_TO_12_PRICE
          }
    }

    if(service_name === "luggage_gaurantee"){
          if(category === "BELOW_7KG"){
            return process.env.NEXT_PUBLIC_LUGGAGE_GAURANTEE_BELOW_7KG_PRICE
          }
          if(category === "7KG_TO_20KG"){
            return process.env.NEXT_PUBLIC_LUGGAGE_GAURANTEE_7KG_TO_20KG_PRICE
          }
          if(category === "20KG_TO_30KG"){
            return process.env.NEXT_PUBLIC_LUGGAGE_GAURANTEE_20KG_TO_30KG_PRICE
          }
    }
}

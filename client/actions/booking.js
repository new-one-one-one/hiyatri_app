import fetch from 'isomorphic-fetch';

export const pnrDetails = pnr => {
      return fetch(`${process.env.NEXT_PUBLIC_RAPID_API_BASE_URL}/pnr-status?pnr=${pnr}`, {
    	"method": "POST",
    	"headers": {
    		"x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
    		"x-rapidapi-host": "indian-railway-pnr-status.p.rapidapi.com"
    	}
    })
    .then(response => {
      return response.json();
    })
    .catch(err => {
    	console.error(err);
    });
};

export const createBooking = (data, token) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/booking/create`, {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getBookingByPnr = (pnr, token) => {
  console.log(pnr)
    return fetch(`${process.env.NEXT_PUBLIC_API}/booking/get/${pnr}`, {
        method: 'GET',
        headers: {
           'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

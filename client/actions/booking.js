import fetch from 'isomorphic-fetch';

export const get_details_by_pnr = pnr => {
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

export const create_booking = (data, token) => {
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


export const get_booking_by_id = (booking_id,token) =>{
    return fetch(`${process.env.NEXT_PUBLIC_API}/booking/single/${booking_id}`, {
        method:"GET",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          },
    }).then(response =>{
        return response.json();
    }).catch(err => {
        return err;
        });
}


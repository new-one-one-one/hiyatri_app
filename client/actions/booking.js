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


export const getBooking = pnr =>{
    if(pnr!==undefined){
    return fetch(`${process.env.NEXT_PUBLIC_API}/booking/${pnr}`, {
        method:"GET",  
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },      
    }).then(response =>{
        return response.json();
    }).catch(err => {
        return err;
        });
    }
    else{
        return null;
    }

}

export const get_all_bookings = () =>{
    return fetch(`${process.env.NEXT_PUBLIC_API}/booking/admin/all`, {
        method:"GET",  
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },      
    }).then(response =>{
        return response.json();
    }).catch(err => {
        return err;
        });
}   

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

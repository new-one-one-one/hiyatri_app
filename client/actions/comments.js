import fetch from 'isomorphic-fetch';
export const createComment = (data) => {
    console.log(data, "Comemnt data");
    return fetch(`${process.env.NEXT_PUBLIC_API}/booking/admin/addComment`, {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

/*
pnr_number,
        comment_by,
        comment,
        facility_type

post format
*/

import fetch from 'isomorphic-fetch';

export const singleUser = (id, token) => {
  console.log(id)
    return fetch(`${process.env.NEXT_PUBLIC_API}/user/${id}`, {
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

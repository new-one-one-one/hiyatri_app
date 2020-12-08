import fetch from 'isomorphic-fetch';

export const create_comment = (data,token) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/comment/create`, {
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

export const comment_list = (token, order_id) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/comment/list/${order_id}`, {
        method: 'GET',
        headers: {
           'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            console.log(response)
            return response.json();
        })
        .catch(err => console.log(err));
};


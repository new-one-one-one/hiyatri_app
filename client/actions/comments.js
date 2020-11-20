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

export const comment_list = (data,token) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/comment/list`, {
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

import fetch from 'isomorphic-fetch';

export const create_comment = (data) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/comment/create`, {
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

export const comment_list = (data) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/comment/list`, {
        method: 'GET',
        headers: {
           'Content-Type': 'application/json',
            Accept: 'application/json',
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

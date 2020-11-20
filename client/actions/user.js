import fetch from 'isomorphic-fetch';

export const singleUser = (id, token) => {
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


export const getUsers = () => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/users/all`, {
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


export const addUser = (newUser) => {
        return fetch(`${process.env.NEXT_PUBLIC_API}/admin/addUser`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(newUser)
        })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err));
};

export const removeUser = (contact) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/admin/removeUser`, {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(contact)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

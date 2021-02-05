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


export const getUsers = (token) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/users/all`, {
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


export const addUser = (newUser,token) => {
        return fetch(`${process.env.NEXT_PUBLIC_API}/admin/addUser`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(newUser)
        })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err));
};

export const removeUser = (contact,token) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/admin/removeUser`, {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(contact)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const updateProfile = (details,token)=>{
    console.log(details)
    return fetch(`${process.env.NEXT_PUBLIC_API}/user/update/${details.id}`, {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(details)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

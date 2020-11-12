import fetch from 'isomorphic-fetch';

  export const createOrder = (booking_id, token) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/order/create/${booking_id}`, {
        method: 'POST',
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


  export const orderList = (token) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/order/list`, {
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


  export const singleOrder = (booking_id, token) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/order/single/${booking_id}`, {
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
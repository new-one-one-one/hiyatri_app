import fetch from 'isomorphic-fetch';

  export const create_order = (booking_id, token) => {
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


  export const order_list = (token) => {
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


  export const single_order = (booking_id, token) => {
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

  export const verify_order = (data, token) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/order/verify`, {
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

  export const assign_agent = (orderId,agentId,token) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/order/assign/agent/${orderId}/${agentId}`, {
        method: 'PATCH',
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

  export const agent_list = (token) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/order/agent/list`, {
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

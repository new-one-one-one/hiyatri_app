import fetch from 'isomorphic-fetch';

  export const create_order = (order, token) => {
    // console.log(order)
    return fetch(`${process.env.NEXT_PUBLIC_API}/order/create`, {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(order)
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



export const get_user_bookings = (user_id)=>{
    return fetch(`${process.env.NEXT_PUBLIC_API}/order/all/${user_id}`, {
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


  export const update_order_status = (orderId,order_status,token) => {
    return fetch(`${process.env.NEXT_PUBLIC_API}/order/update/${orderId}/${order_status}`, {
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

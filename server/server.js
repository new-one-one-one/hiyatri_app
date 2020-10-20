const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models').User;
const User_Type = require('./models').User_Type;

User_Type.create({
    name: 'Admin',
    value: 'admin',
    del_flag: 0,
}).then(user_type =>{
    user_type.createUser({
        name: 'Rohan',
        email: 'rohan@tekonika.com',
        mobile_number: '919034491678',
        user_type_id: 1,
        del_flag: 0
    }).then(()=>{
        console.log('Worked!')
    })
})

const app = express();

app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json());



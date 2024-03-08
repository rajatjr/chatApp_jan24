const Sequelize = require("sequelize");
const db= require("../config/db");
 
const { DataTypes } = Sequelize;
 
const Users = db.define('rajat_jr18users',{
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
   
},{
   
});
 


module.exports = Users;
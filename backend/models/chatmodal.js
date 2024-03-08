const Sequelize=require("sequelize")
const sequelize=require('../config/db');
const chat = sequelize.define("rajatjr_Chat", {
   
    sender: {
       type: Sequelize.STRING,
 
    },
    receiver: {
        type: Sequelize.STRING,
  
     },
    message: {
       type: Sequelize.STRING,
    },

 });
 module.exports=chat;
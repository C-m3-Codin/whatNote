const mongoose = require('mongoose');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

// console.log(process.env.mongoDbUrl)
const url = process.env.mongoDbUrl;
mongoose.connect(process.env.mongoDbUrl, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>console.log("Message Schema is ONLINE"))
.catch((error)=>console.log("Error in message.js"+error))

const Schema = mongoose.Schema;

const datainDb = new Schema({
    username : { 
        
        type:String, lowercase:true, unique:false},
    data : String,
    tag : String,
    time : String,
  
})

var DatainDb = mongoose.model('Data',datainDb);


module.exports = DatainDb;

const db = mongoose.connection;
db.once('error',(err)=>{
    console.log("Error at Accountdata"+err);
});
db.on('open',()=>{
    console.log("Accountdata DB is connected");
})
const messageModel = require("./Model/message");


const messageHandler = function(message){
    console.log(message.body)
    var account = messageModel({

        data : "String",
        tag : 232,
        time : "String",
    });
    account.save()
    .then(()=>console.log("Account data is passed to AccountSchema"))
    .catch((error)=>console.log(error))
    
    
    

}


module.exports = messageHandler;
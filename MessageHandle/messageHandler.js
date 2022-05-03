const messageModel = require("../Model/Model_message");


const messageHandler = function(message){

    
    console.log(message.body)

    const myArray = message.body.split("@#");
    var tag = myArray[1];
    var data = myArray[0];
    var message = messageModel({
        data : data,
        tag : tag,
        time : "String",
    });
    messageModel.find({ "tag": tag}).count(function (err, res) {
        if (err)
           throw err;
           console.log("count of ",tag," ",res)
        // db.close();
    });

    
    message.save()
    .then(()=>console.log("Account data is passed to MessageSchema"))
    .catch((error)=>console.log(error))
    
    
    

}


module.exports = messageHandler;
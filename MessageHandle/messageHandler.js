const model_user = require("../Model/Model_user");
const  {client} = require("../index")

const messageHandler = function(message){

    
    console.log(message.body)
    console.log(message.from)
    client.sendMessage(message.from,"baam from client ");
    const myArray = message.body.split("@#");
    var tag = myArray[1];
    var data = myArray[0];
    // var messageDb = messageModel({
    //     username:message.from,
    //     data : data,
    //     tag : tag,
    //     time : "String",
    // });
    messageModel.find({ "username": message.from}).count(function (err, res) {
        if (err)
           throw err;
           console.log("count of ",tag," ",res)
        if(count>0){
            messageModel.find({
                "username": message.from,
                tags:{
                    $elemMatch:{
                        threadName:tag
                    }
                }
            }, function(err,res){
                // check if the tag exists
                // insert tag if not exists
                
                // update tag array if exists 
            })


            // below code inserts doc if not exists
            var newTagelement = {
                threadName:tag,
                threads:[{
                    message:data,
                    time:"time now"
                }]
            }; 
           
            model_user.updateOne(
                { username: message.from }, 
                { $push: { tags: newTagelement } },
                done
            );
            
        }
        else{
            // user message for first time
            var user_in_db = model_user({
                username : message.from,
    tags: [
        {    
            threadName : tag,
            threads:
            [
                {
                    message:data,
                    time:"String"
                }
            ]
            
        }
    ]
            });
            user_in_db.save()
            .then(()=>console.log("Account data is passed to MessageSchema"))
            .catch((error)=>console.log(error))
            
        }
        // db.close();
    });

    
    
    
    
    

}


module.exports = messageHandler;
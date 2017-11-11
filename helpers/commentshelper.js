var md5 = require('md5');
module.exports ={
    newest : function(){
        var comments =[{
            image_id: "yjm4g2",
            email: "jagarfiasi@gmail.com",
            name: "Aldair Garfias",
            gravatar: md5("jagarfiasi@gmail.com"),
            text: "Sample comment",
            timestamp: Date.now()
        },
        {
            image_id: "yjm4g2",
            email: "jagarfiasi@gmail.com",
            name: "Aldair Garfias",
            gravatar: md5("jagarfiasi@gmail.com"),
            text: "Sample comment",
            timestamp: Date.now()
        }];
        return comments;
    }
}
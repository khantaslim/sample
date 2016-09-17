var mongoose = require('mongoose');
console.log("chat data base created");

var Schema = mongoose.Schema;
var msgSchema = mongoose.Schema({
    //senderID: Schema.Types.ObjectId,
    senderID: {
        type: Schema.ObjectId
    },
    receiverId: {

        type: Schema.ObjectId
    },
    text: String,
    senderEmail: {
        type: String
    },
    // sendername: {
        //     type: String
        // },

 // photoUrl: { type: String },
 // deviceId: {
        //     type: String
        // },

// devicetype: {
        //     type: String
        // },
    time: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Messages", msgSchema);

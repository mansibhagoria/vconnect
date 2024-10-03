import mongoose from "mongoose";
const { Schema } = mongoose;

const EventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
    },
    eventDate: {
        type: Date,
        required: true,
    },
    eventTime: {
        type: String,
        required: true,
    },
    eventVenue: {
        type: String,
        
    },
    maxValue: {
        type: Number,
        
    },
    Description: {
        type: String,
        
    },
    inviteBy:{
        type: String,
        
    },
    // inviteBy:{
    //     type: Schema.Types.ObjectId,
    //     ref: "User"
    // },
    

    });

    export default mongoose.model("Event", EventSchema);
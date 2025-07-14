import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    receiverId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    //The User and Message collections are connected via ObjectId references.
    text: { type: String, },
    image: { type: String, },
    seen: {type: Boolean, default: false}
}, {timestamps: true});

const Message = mongoose.model("Message", messageSchema);

export default Message;
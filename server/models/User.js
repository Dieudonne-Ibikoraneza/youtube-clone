import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    img: {
        type: String,
    },
    subscribers: {
        type: Number,
        default: 0
    },
    subscribedUsers: {
        type: [String]
    }
},{timestamps: true})

export default mongoose.model("User", userSchema);
import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    pname: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    profilePic: {
        type: String,
    },
    requests: {
        type: [String],
    },
    friends: {
        type: [String],
    },
    bio: {
        type: String,
    },
});

UserSchema.methods.updateRequests = async function(newRequest) {
    try {
        this.requests.push(newRequest);
        await this.save();
        return this;
    } catch (error) {
        throw error;
    }
}

const User = mongoose.model("User", UserSchema);

export default User;

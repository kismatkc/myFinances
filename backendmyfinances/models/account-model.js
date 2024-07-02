import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
id: {
    type: String,
    required: [true,"Id required"]
    }, name: {
        type: String,
        required: [true, "Name required"]
    }, userId: {
        type: String,
        required: [true, "UserId required"]
    }, plaidId: {
        type: String,
        required: [true, "UserId required"]
    },


})

const Account = mongoose.model("Account",accountSchema);
export default Account;

import mongoose ,{Document,Schema} from "mongoose";
import { Interface } from "readline";



const accountSchema = new mongoose.Schema({
id: {
    type: String,
    required: [true,"Id required"]
    }, name: {
        type: String,
        required: [true, "Name required"]
    }, userId: {
        type: String,
        required: [false, "UserId required"]
    }, plaidId: {
        type: String,
        required: [false, "UserId required"]
    },


})

const Category = mongoose.model("Category",accountSchema);
export default Category;

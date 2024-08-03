import mongoose, { Schema } from 'mongoose';
import {v4 as uuidv4} from 'uuid';


const accountAndCategorySchema= new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        userId: {
            type: String,
            default: uuidv4,
            unique: true,
            index: true // Creates an index on the userId field
        },
        plaidId: {
            type: String,
            default: uuidv4,
            // required: [true, 'Plaid ID is required'],
            unique: true,
            
        }
    },
    {
        timestamps: true // Automatically manage createdAt and updatedAt fields
    }
);

export const Account = mongoose.model('Account', accountAndCategorySchema);
export const Category = mongoose.model('Category', accountAndCategorySchema)

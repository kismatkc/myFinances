import mongoose, { Document, Schema } from 'mongoose';
import {v4 as uuidv4} from 'uuid';

interface IAccount extends Document {
    name: string;
    userId: string;
    plaidId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const accountSchema: Schema = new Schema(
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

const Account = mongoose.model<IAccount>('Account', accountSchema);
export default Account;
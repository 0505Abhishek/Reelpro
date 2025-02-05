 import mongoose from "mongoose";
 import bycrypt from 'bcryptjs';

 export interface IUser{
   email: string;
   password: string;
   _id?: mongoose.Types.ObjectId;
    created?: Date;
    updated?: Date;
 }

 const userSchema = new mongoose.Schema<IUser>(
    {
      email: {type: String, required: true, unique: true},
      password: {type: String, required: true}
    },
    {
      timestamps: true
    }
)


userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bycrypt.hash(this.password, 8);
    }
    next();
})

const User =  mongoose.models.User || mongoose.model<IUser>('User', userSchema);
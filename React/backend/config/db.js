import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://farjanaepa:farjanaepa@cluster0.gmprkkp.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}
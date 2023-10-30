import mongoose from "mongoose";
export const mongodbUrl = "mongodb+srv://NataliaLoginova:2910nodeJS@onlineshop.gzw0r0m.mongodb.net/?retryWrites=true&w=majority";

export const connectToDB = async (mongodbUrl: string) => {
    try {
        await mongoose.connect(mongodbUrl);
        console.log('connected to the db')
    } catch (err){
        console.error('Error connecting to MongoDB:', err);
    }
}

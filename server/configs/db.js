import mongoose from "mongoose";

async function connectDb(params) {

    try {
        mongoose.connection.on('connected', ()=> console.log('connected'))
        await mongoose.connect(process.env.MONGODB_URI, { dbName: 'my-react-app' });
        console.log('connected');
    } catch (err) {
        console.log(`There was an error while connection to mongodb
                    ${err.message}`)
    }
}
export default connectDb 
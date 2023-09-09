import mongoose from "mongoose";



// const DB_URL = "mongodb://127.0.0.1/Eben"

const uri = "mongodb+srv://eben19:ebenezer19@cluster0.u3wri8y.mongodb.net/"


const dbConfig = async () : Promise<void> => {
    try {
        const connect = await mongoose.connect(uri);
        console.log(`success connection to database on port ${connect.connection.host}`)
    } catch (err) {
        console.log(`failed connection to database`)
    }
}

export default dbConfig;
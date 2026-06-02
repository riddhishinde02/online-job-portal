import mongoose from "mongoose"

export const connection= () => {
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"JobPortal"
    }).then(()=>{
        console.log("Database connected")
    }).catch(err=>{
        console.log(`Some erroe occured while connecting to database: ${err}`)
    })
}
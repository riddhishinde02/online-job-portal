import app from "./app.js"
import cloudinary from "cloudinary"

//backend and cloudinary connection
cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

//server connection
app.listen(process.env.PORT, () => {
    console.log(`server listening at port ${process.env.PORT}`)
});


import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY.CLOUD.NAME, 
        api_key: process.env.CLOUDINARY.API.KEY, 
        api_secret: process.env.CLOUDINARY.API.SECRET // Click 'View API Keys' above to copy your API secret
    });

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        // upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath , {
            resource_type : "auto"
        })
        // uploaded file successfully done
        console.log("file is uploading done" , resource.url)
        return response
    } catch (error) {
        fs.unlink(localFilePath)  // for removing the file in local server or which it is failed to upload in temp file
    }
    const response = await cloudinary.uploader.upload(localFilePath)
}
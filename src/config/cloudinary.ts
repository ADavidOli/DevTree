import { v2 as cloudinary } from 'cloudinary';


// console.log('NAME:', process.env.CLOUDINARY_NAME);
// console.log('KEY:', process.env.CLOUDINARY_API_KEY);
// console.log('SECRET:', process.env.CLOUDINARY_API_SECRET);

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary


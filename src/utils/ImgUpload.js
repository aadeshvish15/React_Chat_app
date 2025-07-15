import axios from 'axios';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; // copy this from Cloudinary dashboard
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET; // the preset you just created

export async function uploadImage(file) {
  const date = new Date();
  

  const formData = new FormData();
  formData.append('file', file); // the image
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('public_id',date + file.name)

  try { 
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData
    ); 
    return response.data.secure_url; // this is the link to your image
  } catch (err) {
    console.error("Something went wrong",err.message);
  }
}
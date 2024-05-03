import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import ImageSearchIcon from '@mui/icons-material/ImageSearch'; // Importing ImageSearchIcon from Material UI icons

const NationalIdUpload = ({ setFrontImage, setBackImage }) => {
  const [frontImageUrl, setFrontImageUrl] = useState(null);
  const [backImageUrl, setBackImageUrl] = useState(null);

  const handleFrontImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      if (imageFile.type.startsWith('image/') && imageFile.size <= 5 * 1024 * 1024) {
        const imageUrl = URL.createObjectURL(imageFile);
        setFrontImageUrl(imageUrl);
        setFrontImage(imageFile); // set the image file itself
      } else {
        alert('Please select a valid image file for front photo (max size: 5 MB)');
      }
    }
  };

  const handleBackImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      if (imageFile.type.startsWith('image/') && imageFile.size <= 5 * 1024 * 1024) {
        const imageUrl = URL.createObjectURL(imageFile);
        setBackImageUrl(imageUrl);
        setBackImage(imageFile); // set the image file itself
      } else {
        alert('Please select a valid image file for back photo (max size: 5 MB)');
      }
    }
  };

  const removeFrontImage = () => {
    setFrontImageUrl(null);
    setFrontImage(null); // remove the image file
  };

  const removeBackImage = () => {
    setBackImageUrl(null);
    setBackImage(null); // remove the image file
  };

  return (
    <div className="mt-5 flex justify-center items-center">
      <div className="flex flex-col items-center">
        <label className="w-28 sm:w-40 flex flex-col items-center px-2 sm:px-4 py-4 sm:py-6 bg-white text-blue-600 rounded-lg shadow-lg tracking-wide uppercase border border-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white mb-3">
          <ImageSearchIcon className="w-4 h-4 sm:w-6 sm:h-6" />
          <span className="mt-1 sm:mt-2 text-xs sm:text-sm font-semibold">Upload Front Photo</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFrontImageChange} />
        </label>
        {frontImageUrl && (
          <div className="mt-1">
            <Avatar alt="Front Photo" src={frontImageUrl} sx={{ width: 80, height: 60 }} variant="rounded" />
            <button className="mt-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded" onClick={removeFrontImage}>Remove</button>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center ml-5">
        <label className="w-28 sm:w-40 flex flex-col items-center px-2 sm:px-4 py-4 sm:py-6 bg-white text-blue-600 rounded-lg shadow-lg tracking-wide uppercase border border-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white mb-3">
          <ImageSearchIcon className="w-4 h-4 sm:w-6 sm:h-6" />
          <span className="mt-1 sm:mt-2 text-xs sm:text-sm font-semibold">Upload Back Photo</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleBackImageChange} />
        </label>
        {backImageUrl && (
          <div className="mt-1">
            <Avatar alt="Back Photo" src={backImageUrl} sx={{ width: 80, height: 60 }} variant="rounded" />
            <button className="mt-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded" onClick={removeBackImage}>Remove</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NationalIdUpload;

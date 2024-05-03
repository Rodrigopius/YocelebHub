import React, { useState, useEffect } from 'react';
import Photo from '../assets/images/User.jpg';


const Card = ({ name, category, price, imageUrl }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error('Failed to fetch');
        const blob = await response.blob();
        const objectURL = URL.createObjectURL(blob);
        setImage(objectURL);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };
    fetchImage();

    return () => {
      // Cleanup function to revoke the object URL
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [imageUrl]);

  return (
    <div className="max-w-md w-full bg-gray-100 shadow-lg rounded-lg overflow-hidden mx-auto mb-4">
      <img className="w-full h-auto" src={image} alt={name} />
      <div className="p-4">
        <h2 className="text-gray-800 font-bold text-xl mb-2">{name}</h2>
        <p className="text-gray-600 text-sm mb-2">{category}</p>
        <p className="text-gray-700 font-bold text-xl">${price}</p>
      </div>
      <div className="flex justify-center pb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View
        </button>
      </div>
    </div>
  );
};

export default Card;

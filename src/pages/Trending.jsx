import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config"; // Import the necessary Firebase 
import Card from '../components/Card'
import AvailabilityBtn from '../components/AvailabilityBtn'

const Trending = () => {
  const [trendingData, setTrendingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch trending data when component mounts
    fetchTrendingData();
  }, []);

  const fetchTrendingData = async () => {
    try {
      const userCollection = collection(db, "users"); // Reference the "users" collection
      const snapshot = await getDocs(userCollection); // Get all documents in the collection
      const trendingList = [];
      snapshot.forEach((doc) => {
        const data = doc.data(); // Get the document data
        // Construct the URL for the profile image using the nickname and profileImageUrl fields
        const profileImageUrl = data.profileImageUrl.startsWith("http") ? 
        data.profileImageUrl : `profile_images/${data.nickname}/${data.profileImageUrl}`;
      
        trendingList.push({
          id: doc.id, // Add the document ID to the data object
          nickname: data.nickname,
          profileImageUrl: profileImageUrl,
          category: data.category,
          price: data.price
        });
      });
      setTrendingData(trendingList); // Set the trending data state
      setLoading(false); // Set loading state to false
    } catch (error) {
      console.error("Error fetching trending data:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
    {loading ? (
      <div style={{fontWeight:"bold", color:"white", fontSize:"40px"}}>Loading Celebrities...</div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trendingData.map((item) => (
          <div key={item.id} className="max-w-sm w-full bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            <img className="w-full" src={item.profileImageUrl} alt={item.nickname} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl text-white mb-2">{item.nickname}</div>
              <p className="text-gray-400 text-base mb-2">{item.category}</p>
              <p className="text-gray-200 text-xl">${item.price}</p>
            </div>
            <div className="px-6 py-4">
             <AvailabilityBtn/>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  
  );
};

export default Trending;

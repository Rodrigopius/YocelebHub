import React, { useState } from "react";
import { Avatar } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Swal from "sweetalert2";
import NationalIdUpload from "./NationalIdUpload";
import CountryDropdown from "./CountryDropdown";
import CelebrityCategoryDropdown from "./CelebrityCategoryDropdown";
import PriceInput from "./PriceInput";
import Binance from './Binance';
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { db, storage } from "../../config";

const USER_COLLECTION = "users";

const RegistrationForm = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      if (
        imageFile.type.startsWith("image/") &&
        imageFile.size <= 5 * 1024 * 1024
      ) {
        setProfileImage(imageFile);
      } else {
        alert("Please select a valid image file (max size: 5 MB)");
      }
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Check if profile image is selected
      if (!profileImage) {
        throw new Error("Please select a profile image");
      }

      // Upload profile image to Firebase Storage
      const profileImageRef = ref(
        storage,
        `profile_images/${profileImage.name}`
      );
      await uploadBytes(profileImageRef, profileImage);
      const profileImageUrl = await getDownloadURL(profileImageRef);

      // Upload front and back images of National ID to Firebase Storage
      if (frontImage && backImage) {
        const frontImageRef = ref(storage, `national_id/front_${name}`);
        await uploadBytes(frontImageRef, frontImage);
        const frontImageUrl = await getDownloadURL(frontImageRef);

        const backImageRef = ref(storage, `national_id/back_${name}`);
        await uploadBytes(backImageRef, backImage);
        const backImageUrl = await getDownloadURL(backImageRef);

        // Add user data to Firestore
        const userRef = collection(db, USER_COLLECTION);
        await addDoc(userRef, {
          name: name,
          nickname: nickname,
          email: email,
          country: country,
          category: category,
          price: price,
          profileImageUrl: profileImageUrl,
          nationalId: {
            frontImageUrl: frontImageUrl,
            backImageUrl: backImageUrl,
          },
        });
      } else {
        throw new Error("Please upload both front and back images of your national ID");
      }

      // Clear form fields after successful submission
      setName("");
      setNickname("");
      setEmail("");
      setCountry("");
      setCategory("");
      setPrice("");
      setProfileImage(null);
      setFrontImage(null);
      setBackImage(null);

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Your data has been submitted successfully.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      // Show error message
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text:
          "An error occurred while submitting your data. Please try again later.",
      });
    }
  };

  const removeProfileImage = () => {
    setProfileImage(null);
  };

  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="relative px-4 py-10 bg-black mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <div className="max-w-md mx-auto text-white">
          <div className="mt-5 flex justify-center items-center">
            {profileImage ? (
              <div className="flex items-center">
                <Avatar
                  alt="Profile Picture"
                  src={URL.createObjectURL(profileImage)}
                  sx={{ width: 100, height: 100 }}
                />
                <button
                  className="ml-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                  onClick={removeProfileImage}
                >
                  Change Picture
                </button>
              </div>
            ) : (
              <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue-600 rounded-lg shadow-lg tracking-wide uppercase border border-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white">
                <AddAPhotoIcon className="w-6 h-6" />
                <span className="mt-2 text-sm font-semibold">
                  Upload Profile Picture
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-5">
              <label className="font-semibold text-sm text-gray-400 pb-1 block">
                Full Name
              </label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-700 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500"
                type="text"
                value={name}
                onChange={handleNameChange}
              />
              <label className="font-semibold text-sm text-gray-400 pb-1 block">
                Nick Name
              </label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-700 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500"
                type="text"
                value={nickname}
                onChange={handleNicknameChange}
              />

              <label className="font-semibold text-sm text-gray-400 pb-1 block">
                Email
              </label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-700 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500"
                type="email"
                value={email}
                onChange={handleEmailChange}
              />

              <PriceInput price={price} setPrice={setPrice} />
              <CountryDropdown
                country={country}
                setCountry={setCountry}
              />
              <CelebrityCategoryDropdown
                selectedCategory={category}
                setCategory={setCategory}
              />
              <NationalIdUpload
                setFrontImage={setFrontImage}
                setBackImage={setBackImage}
              />
            </div>
            <div className="mt-5">
              <button
                className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <Binance/>
    </div>
  );
};

export default RegistrationForm;

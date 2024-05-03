import React from "react";

const CelebrityCategoryDropdown = ({ selectedCategory, setCategory }) => {
  // Define a list of celebrity categories
  const categories = [
    "Sports",
    "Athletes",
    "Actors/Actresses",
    "Musicians",
    "Comedians",
    "Authors",
    "Politicians",
    "Religious Leaders",
    "Journalists",
    "TV Personalities",
    "Models",
    "Chefs",
    "Fashion Designers",
    "Dancers",
    "Directors",
    "Producers",
    "Screenwriters",
    "Photographers",
    "Painters",
    "Sculptors",
    "Architects",
    "Influencers",
    "Entrepreneurs",
    "Business Executives",
    "Scientists",
    "Academics",
    "Doctors",
    "Lawyers",
    "Humanitarians",
    "Activists",
    // Add more categories as needed
  ];

  const handleChange = (event) => {
    const selectedCategory = event.target.value;
    // if (onSelect) {
    //   onSelect(selectedCategory);
    // }
    setCategory(selectedCategory);
  };

  return (
    <select
      onChange={handleChange}
      defaultValue=""
      className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-700 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500"
    >
      <option value="" disabled>
        Select your celebrity category
      </option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CelebrityCategoryDropdown;

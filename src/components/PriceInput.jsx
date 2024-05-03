import React from 'react';
import { BiDollar } from 'react-icons/bi'; // Importing USD icon from React Icons

const PriceInput = ({ price, setPrice }) => {
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  return (
    <div className="flex flex-col items-start mt-5">
      <label className="text-sm text-gray-400 pb-1" htmlFor="price">Set Prices (USD)</label>
      <div className="relative">
        <input
          className="border rounded-lg px-10 py-2 mt-1 mb-5 text-sm w-full bg-gray-700 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500"
          type="number"
          id="price"
          value={price}
          onChange={handlePriceChange}
        />
        <div className="absolute inset-y-0 left-3 flex items-center pl-2">
          <BiDollar className="text-blue-500 text-lg" style={{marginBottom:'14px'}}/>
        </div>
      </div>
    </div>
  );
};

export default PriceInput;

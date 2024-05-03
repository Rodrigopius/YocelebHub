import React, { useState, useEffect } from 'react';

const CountryDropdown = ({ country, setCountry }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (response.ok) {
          const data = await response.json();
          setCountries(data);
        } else {
          throw new Error('Failed to fetch countries');
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (event) => {
    setCountry(event.target.value); // set the country code
  };

  return (
    <select
      value={country} // value should be country code
      onChange={handleChange}
      className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-700 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500"
    >
      <option value="" disabled>Select your country</option>
      {countries.map(country => (
        <option key={country.cca2} value={country.cca2}>{country.name.common}</option>
      ))}
    </select>
  );
};

export default CountryDropdown;

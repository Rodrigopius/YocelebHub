import React, { useState } from 'react';

const Binance = () => {
  const [apiKey, setApiKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [accountInfo, setAccountInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey, secretKey }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch account information');
      }

      const data = await response.json();
      setAccountInfo(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching account information:", error.message);
      setError("Error fetching account information. Please check your API key and secret key.");
      setAccountInfo(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-bold mb-6">Binance API Key Binding</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="apiKey" className="block text-lg">API Key:</label>
            <input
              type="text"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full mt-2 p-2 bg-gray-800 text-white border border-gray-700 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="secretKey" className="block text-lg">Secret Key:</label>
            <input
              type="text"
              id="secretKey"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="w-full mt-2 p-2 bg-gray-800 text-white border border-gray-700 rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Bind</button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {accountInfo && (
          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-2">Account Balances</h3>
            <ul>
              {accountInfo.balances.map((balance) => (
                <li key={balance.asset} className="text-lg">{balance.asset}: {balance.free}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Binance;

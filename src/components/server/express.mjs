// server.mjs

import express from 'express';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import helmet from 'helmet';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(helmet());

// Set Content Security Policy middleware
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "font-src 'self' data:;");
  next();
});

app.post('/api/account', async (req, res) => {
  const { apiKey, secretKey } = req.body;

  try {
    const response = await fetch('https://api.binance.com/api/v3/account', {
      method: 'GET',
      headers: {
        'X-MBX-APIKEY': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch account information');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching account information:", error.message);
    res.status(500).json({ error: 'Error fetching account information' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

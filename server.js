import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.BRAWL_STARS_API_KEY;
const BASE_URL = 'https://api.brawlstars.com/v1';

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Brawl Stars Proxy Server is running' });
});

// Get server IP address
app.get('/ip', async (req, res) => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    res.send(data.ip);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get IP address' });
  }
});

// Proxy endpoint for all Brawl Stars API calls
app.all('/api/*', async (req, res) => {
  try {
    // Check if API key is configured
    if (!API_KEY) {
      return res.status(500).json({ error: 'API key not configured on server' });
    }

    // Extract the path after /api/
    const path = req.path.replace('/api', '');
    const fullUrl = `${BASE_URL}${path}`;

    console.log(`Proxying ${req.method} request to: ${fullUrl}`);

    // Build query string if present
    const queryString = new URLSearchParams(req.query).toString();
    const urlWithQuery = queryString ? `${fullUrl}?${queryString}` : fullUrl;
    
    console.log(`Full URL with query: ${urlWithQuery}`);

    // Make request to Brawl Stars API
    const response = await fetch(urlWithQuery, {
      method: req.method,
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });

    // Get response data
    let data;
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.log(`Non-JSON response: ${text.substring(0, 100)}`);
      data = { raw: text };
    }

    // Return response with same status code
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Proxy server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found', path: req.path });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err instanceof Error ? err.message : 'Unknown error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Brawl Stars Proxy Server running on port ${PORT}`);
  console.log(`📍 API Key configured: ${API_KEY ? 'Yes' : 'No'}`);
});

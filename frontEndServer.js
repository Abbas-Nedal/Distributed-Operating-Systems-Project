// frontEndServer.js
const express = require('express');
const axios = require('axios');
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
const app = express();
const PORT = 3000;

const catalogServers = ['http://localhost:3001', 'http://localhost:3003'];
const orderServers = ['http://localhost:3002', 'http://localhost:3004'];
let catalogIndex = 0;
let orderIndex = 0;

// Load balancing helper
const getNextServer = (servers, index) => {
    const server = servers[index];
    index = (index + 1) % servers.length;
    return { server, index };
};

// Middleware for caching
const cacheMiddleware = (req, res, next) => {
    const { id } = req.params;
    const cachedData = cache.get(id);
    if (cachedData) {
        return res.json(cachedData);
    }
    next();
};

// Get book info with cache
app.get('/catalog/info/:id', cacheMiddleware, async (req, res) => {
    const { id } = req.params;
    const { server, index } = getNextServer(catalogServers, catalogIndex);
    catalogIndex = index;

    try {
        const response = await axios.get(`${server}/catalog/info/${id}`);
        cache.set(id, response.data);  // Cache the data
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Purchase book (write operation, no caching)
app.post('/order/purchase/:id', async (req, res) => {
    const { id } = req.params;
    const { server, index } = getNextServer(orderServers, orderIndex);
    orderIndex = index;

    try {
        const response = await axios.post(`${server}/order/purchase/${id}`);
        cache.del(id);  // Invalidate cache on write
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Front-end server running on port ${PORT}`);
});

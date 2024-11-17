const express = require('express');
const axios = require('axios');
const NodeCache = require("node-cache");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const app = express();
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
const PORT = 3000;

const catalogServers = ['http://localhost:3001', 'http://localhost:3003'];
const orderServers = ['http://localhost:3002', 'http://localhost:3004'];
let catalogIndex = 0;
let orderIndex = 0;

// Round Robin Load Balancer
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

// Swagger Configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Front-End API',
            version: '1.0.0',
            description: 'API Documentation for the Front-End Server',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ['./frontEndServer.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /catalog/info/{id}:
 *   get:
 *     summary: Get catalog info by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The catalog item ID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Server error
 */
// http://localhost:3000/catalog/info/
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

/**
 * @swagger
 * /order/purchase/{id}:
 *   post:
 *     summary: Purchase a book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book ID to purchase
 *     responses:
 *       200:
 *         description: Successful purchase
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Server error
 */


//http://localhost:3000/order/purchase/3
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
    console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});

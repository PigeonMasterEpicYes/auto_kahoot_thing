const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 8080;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Serving verification routing for the connection diagnostic check button
app.get('/api/test-connection', (req, res) => {
    res.status(200).json({
        success: true,
        status: 200,
        message: "Proxy node communication loopback verified successfully."
    });
});

// Structural routing framework pointing to public placeholder dataset API
app.get('/api/check/:id', async (req, res) => {
    const targetId = req.params.id;
    const targetUrl = 'https://typicode.com' + targetId;

    try {
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json'
            }
        });

        if (response.status === 200) {
            const data = await response.json();
            res.status(200).json({ success: true, status: response.status, data: data });
        } else {
            res.status(response.status).json({ success: false, status: response.status });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log('==================================================');
    console.log(' Cloud Workspace Backend Core Active on Port ' + PORT);
    console.log('==================================================');
});

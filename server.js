const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = 8080;

// Enable CORS so your frontend can communicate freely with this server
app.use(cors());
app.use(express.json());

// Serve static HTML files from the current directory
app.use(express.static(__dirname));

// A dedicated local endpoint to test API responses
app.get('/api/check/:id', async (req, res) => {
    const targetId = req.params.id;
    
    // Replace this URL template with the endpoint framework you are testing
    const targetUrl = 'https://typicode.com' + targetId;

    try {
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
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

app.listen(PORT, () => {
    console.log('==================================================');
    console.log(' Local Development Node successfully initialized!');
    console.log(' Web Interface: http://localhost:' + PORT);
    console.log('==================================================');
});

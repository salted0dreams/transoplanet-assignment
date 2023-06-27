const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.post('/translate', async (req, res) => {
    const { text } = req.body;

    const encodedParams = new URLSearchParams();
    encodedParams.set('source_language', 'en');
    encodedParams.set('target_language', 'hi');
    encodedParams.set('text', text);

    const options = {
        method: 'POST',
        url: 'https://text-translator2.p.rapidapi.com/translate',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '2c7594f5f3msh62590a0f1c10c05p1208f7jsned23780438d1',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        data: encodedParams,
    };

    try {
        const response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Translation failed' });
    }
});

app.post('/text-to-speech', async (req, res) => {
    const { text } = req.body;

    const encodedParams = new URLSearchParams();
    encodedParams.set('f', '44khz_8bit_mono');
    encodedParams.set('b64', 'true');
    encodedParams.set('c', 'mp3');
    encodedParams.set('r', '0');
    encodedParams.set('hl', 'hi-in');
    encodedParams.set('src', text);

    const options = {
        method: 'POST',
        url: 'https://voicerss-text-to-speech.p.rapidapi.com/',
        params: {
            key: '9b6eec4c0dde45d1935eb57a55552ef7'
        },
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '2c7594f5f3msh62590a0f1c10c05p1208f7jsned23780438d1',
            'X-RapidAPI-Host': 'voicerss-text-to-speech.p.rapidapi.com'
        },
        data: encodedParams,
        responseType: 'stream'
    };

    try {
        const response = await axios.request(options);
        response.data.pipe(fs.createWriteStream('audio.mp3'));
        res.json({ success: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Text to speech failed' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

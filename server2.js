const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/log-click', (req, res) => {
    const { imageId, clickTime, clickCount } = req.body;
    const logEntry = `ImageId: ${imageId}, ClickTime: ${clickTime}\n`;
    fs.appendFile('C:/Users/jakub.zimandl/click-tracking-server/odpovedi.csv', logEntry, (err) => {
        if (err) {
            console.error('Chyba při zápisu do souboru:', err);
            res.status(500).json({ success: false, error: 'Chyba při zápisu do souboru' });
        } else {
            console.log('Zaznamenáno kliknutí:', logEntry);
            res.json({ success: true });
        }
    });
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server běží na http://localhost:${port}`);
});
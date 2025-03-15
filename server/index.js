const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/dev', (req, res) => {
    res.send('Ok');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
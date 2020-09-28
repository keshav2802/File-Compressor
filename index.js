const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.post('/compressfiles', (req, res) => {
  
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
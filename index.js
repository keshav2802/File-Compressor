const express = require('express');
const fs = require('fs');
const multer = require('multer');

const app = express();

let dir = 'public';
let subdir = 'public/uploads';

if(!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
  fs.mkdirSync(subdir);
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.post('/compressfiles', (req, res) => {

})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
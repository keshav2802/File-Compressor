const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const admzip = require('adm-zip');

const app = express();

app.use(express.static('public'));

// Create the public folder dynamically so that files can be uploaded to that folder.

let dir = 'public';
let subdir = 'public/uploads';

if(!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
  fs.mkdirSync(subdir);
}

// After creating the directories we will use the diskStorage method of multer library to store the files. We are telling multer where to store these files.

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

let maxSize = 10 * 1024 * 1024; // max 10MB of uploads
var config = multer({ storage: storage,limits:{fileSize:maxSize}});

// Convert the uploaded files into an array. Max files that can be uploaded is 100.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.post('/compressfiles', config.array('files', 100), (req, res) => {
  const zip = new admzip();
  if(req.files) {
    req.files.forEach(file => {
      console.log(file.path);
      zip.addLocalFile(file.path);
    });

    // Now write the files into the system  
    let outputPath = Date.now() + 'output.zip';
    fs.writeFileSync(outputPath, zip.toBuffer());
    res.download(outputPath, (err) => {
      if(err) {
        res.send('Error in downloading ZIP file.')
      }
    });
  }
})



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
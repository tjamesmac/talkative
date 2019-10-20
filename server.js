const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const helpers = require('./server.helpers');

const upload = multer({ dest: 'uploads/' });
const app = express();
const PORT = process.env.PORT || 8080;

app.use('/', express.static(path.join(__dirname, 'dist')));

app.post('/', upload.single('streamfile'), (req, res) => {
  fs.readFile(req.file.path, { encoding: 'utf-8' }, (err, data) => {
    if (!err) {
      console.log('received data', data);
      const help = helpers.handleData(data);
      res.send(help);
    } else {
      console.log(err);
    }
  });
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

const express = require('express');

const app = express();

// root url
app.get('/', (req, res) => {
  res.status(200).send('Hello from the server side');
});

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});

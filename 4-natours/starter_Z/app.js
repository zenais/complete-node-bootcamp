const express = require('express');
const app = express();
/* 
// root url
app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello from the server side', app: 'natours' });
});

app.post('/', (req, res) => {
  res.status(200);
  res.send('You cam post on this URL');
});
 */

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});

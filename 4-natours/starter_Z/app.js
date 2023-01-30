const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());

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

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf8')
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const id = ~~req.params.id;
  const requestedTour = tours.find((e) => e.id === id);
  if (!requestedTour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      requestedTour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours.json`,
    JSON.stringify(tours),
    () => {
      res.status(201).json({
        status: 'success',
        data: {
          tours: newTour,
        },
      });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {});

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});

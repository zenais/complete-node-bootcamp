const fs = require('fs');
const express = require('express');
const app = express();
const morgan = require('morgan');

// 1) MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2. ROUTE HANDLERS
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf8')
);

function getAllTours(req, res) {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
}

function searchTourById(req, res) {
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
}

function addNewTour(req, res) {
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
}

function updateTourById(req, res) {
  if (~~req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Update tour here>',
    },
  });
}

function deleteTourById(req, res) {
  if (~~req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
}
/* 
app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', searchTourById);
app.post('/api/v1/tours', addNewTour);
app.patch('/api/v1/tours/:id', updateTourById);
app.delete('/api/v1/tours/:id', deleteTourById);
 */

// 3.) ROUTES
app.route('/api/v1/tours').get(getAllTours).post(addNewTour);

app
  .route('/api/v1/tours/:id')
  .get(searchTourById)
  .patch(updateTourById)
  .delete(deleteTourById);

// 4.) START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});

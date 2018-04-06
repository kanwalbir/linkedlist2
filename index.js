const express = require('express');
const bodyParse = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const { companyRouter, jobRouter, userRouter } = require('./routes');
const { User, Job, Company } = require('./models');
const app = express();
let port = 4000;

app.use(bodyParse.json());
app.use(morgan('dev'));
app.use(methodOverride('_method'));

app.use('/company', companyRouter);
app.use('/jobs', jobRouter);
app.use('/users', userRouter);

//postman works
app.get('/', (req, res) => {
  return res.json('HELLO from route index');
});

//DRAFT - postman does not work
app.get('/search', function(req, res, next) {
  let db = User || Company || Job;
  let searchValue = req.query;
  return db.find(searchValue).then(results => {
    return res.json('/search/results', { results, searchValue });
  });
});

//MAKES search/results routes

//postman works
app.use((req, res) => {
  return res.json('404');
});

app.use((error, req, res, next) => {
  return res.json(error.message);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

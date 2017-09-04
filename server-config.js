const express = require('express');
const app = express();
const sampleData = require('./lib/sample-data.js')
const cors = require('cors');
const bodyParser = require('body-parser');
const Product = require('./app/models/Product.js');

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  Product.getAll(function(array) {
    res.status(200).send(array);
  });
});

app.post('/products', function(req, res) {
  // sampleData.push(req.body);
  Product.createNew(req.body, function(array) {
     res.status(200).send(array);
  });

});

app.put('/products', function(req, res) {
  sampleData.forEach(function(product) {
    if (product.id === req.body.id) {
      console.log('Updating purchase date in DB')
      product.datePurchased = new Date();
    }
  })
  res.status(200).send(sampleData);
});

app.delete('/products', function(req, res) {
  sampleData = sampleData.filter(function(product) {
    return product.id !== +req.url[req.url.length - 1];
  })
  res.status(200).send(sampleData);
});

module.exports = app;


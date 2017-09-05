const Sequelize = require('sequelize');
const db = require('../config.js');

const Product = db.define('Product', {
  id: {
    type: Sequelize.INTEGER,
    defualtValue: 0,
    primaryKey: true,
    autoIncrement: true
  },
  title: Sequelize.STRING,
  url: Sequelize.STRING(1024),
  qtyPurchased: Sequelize.INTEGER,
  timesPurchased: Sequelize.INTEGER
});

Product.createNew = function(data, cb) {
  Product.sync()
    .then(function() {
      return Product.create({
        title: data.title,
        url: data.url,
        qtyPurchased: data.qtyPurchased,
        timesPurchased: 1
      })
      .then(function(products) {
        cb(products);
      })
    })
    .catch(function(err) {
      console.log(err);
      db.close();
    })
};

Product.getAll = function(cb) {
  Product.sync()
    .then(function() {
      Product.findAll()
      .then(function(products) {
        //console.log(products)
        cb(products);
      })
    })
};

Product.delete = function(productId, cb) {
  Product.sync()
  .then(function() {
    Product.destroy({where: {id: productId}})
    .then(function() {
      console.log('DELETING')
      cb();
    })
  })
};

Product.renewPurchase = function(productId, cb) {
  Product.sync()
  .then(function() {
    Product.findOne({where: {id: productId}})
    .then(function(product) {
      product.updateAttributes({
       timesPurchased: product.timesPurchased++
      })
      .then(function() {
        cb();
      })

    })
  })
};


module.exports = Product;
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var mongoskin = require('mongoskin');
var db = mongoskin.db(process.env.MONGOLAB_URI || 'mongodb://@localhost:27017/geoJsonDb', {safe:true})
var collection = db.collection('geoJson', {strict: true});

var fieldsToQuery = function(fields) {
  var query = {};
  for(var field in fields) {
    if(field === 'max_price') {
      if(query.price === undefined) {
        query.price = {};
        query.price.$lte = parseInt(fields[field]);
      } else {
        query.price.$lte = parseInt(fields[field]);
      }
      
    } 
    if(field === 'min_price') {
      if(query.price === undefined) {
        query.price = {};
        query.price.$gte = parseInt(fields[field]);
      } else {
        query.price.$gte = parseInt(fields[field]);
      }
    }
    if(field === 'max_bed') {
      if(query.bedrooms === undefined) {
        query.bedrooms = {};
        query.bedrooms.$lte = parseInt(fields[field]);
      } else {
        query.bedrooms.$lte = parseInt(fields[field]);
      } 
    }
    if(field === 'min_bed') {
      if(query.bedrooms === undefined) {
        query.bedrooms = {};
        query.bedrooms.$gte = parseInt(fields[field]);
      } else {
        query.bedrooms.$gte = parseInt(fields[field]);
      }
      
    }
    if(field === 'max_bath') {
      if(query.bathrooms === undefined) {
        query.bathrooms = {};
        query.bathrooms.$lte = parseInt(fields[field]);
      } else {
        query.bathrooms.$lte = parseInt(fields[field]);

      }
      
    }
    if(field === 'min_bath') {
      if(query.bathrooms  === undefined) {
        query.bathrooms = {};
        query.bathrooms.$gte = parseInt(fields[field]);
      }
      
    }
  };
  return query;
};

// api controller
var routeController = function(req, res) {
  var fields = req.query;
  var query =  fieldsToQuery(fields);
  console.log(query);
  collection.find(query)
  .toArray(function(err, array) {
    console.log(array);
    res.status('200').send(array);
  });

};

// api route
app.get('/listen', routeController);

// https://s3.amazonaws.com/opendoor-problems/listings.csv

app.listen(port);
console.log('geojson is listening on port ' + port + '...');
var express = require('express');
var app = express();

// server is using mongodb for the database hosted on heroku in mongolabs
var mongo = require('mongodb');
var mongoskin = require('mongoskin');

// heroku and dev port
var port = process.env.PORT || 3000;

// heroku and dev db
var db = mongoskin.db(process.env.MONGOLAB_URI || 'mongodb://@localhost:27017/geoJsonDb', {safe:true})

// connection to db collection
var collection = db.collection('geoJson', {strict: true});



// converts GET fields to a database query
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

// convert an array of houses to geoJson
var arrayToGeoJson = function(array) {
  var features =  array.map(function(house) {
    return {
      "type": "Feature",
      "geometry": {"type": "Point", "coordinates": [house.lng,house.lat]},
      "properties": {
        "id": house.id, // CSV id
        "price": house.price, // Price in Dollars
        "street": house.street,
        "bedrooms": house.bedrooms, // Bedrooms
        "bathrooms": house.bathrooms, // Bathrooms
        "sq_ft": house.sq_ft // Square Footage
      }
    };
  });
  var geoJson = {
    "type": "FeatureCollection",
    "features": features
  };
  return geoJson;
};


// api controller
var routeController = function(req, res) {
  var fields = req.query;
  var query =  fieldsToQuery(fields);
  collection.find(query)
  .toArray(function(err, array) {
    if(err) {
      res.status('500').send(err);
    } else {
      var geoJson = JSON.stringify(arrayToGeoJson(array));
      res.status('200').send(geoJson);
    }
  });
};

// api route
app.get('/listen', routeController);


app.listen(port);
console.log('geojson is listening on port ' + port + '...');
# Next Steps
  add front end in React or Angular:

  Build responsive form that allows user to query database
  Display query results on a map and a list.  Map and List will have a real time filter.
  Add performance optimizations


# geojson API
- API endpoint URL is /listings

API:
GET /listings?min_price=100000&max_price=200000&min_bed=2&max_bed=2&min_bath=2&max_bath=2

min_price: The minimum listing price in dollars.
max_price: The maximum listing price in dollars.
min_bed: The minimum number of bedrooms.
max_bed: The maximum number of bedrooms.
min_bath: The minimum number of bathrooms.
max_bath: The maximum number of bathrooms.

The expected response is a GeoJSON FeatureCollection of listings:

{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {"type": "Point", "coordinates": [-112.1,33.4]},
      "properties": {
  "id": "123ABC", # CSV id
  "price": 200000, # Price in Dollars
  "street": "123 Walnut St",
        "bedrooms": 3, # Bedrooms
        "bathrooms": 2, # Bathrooms
        "sq_ft": 1500 # Square Footage
    },
    ...
  ]
}


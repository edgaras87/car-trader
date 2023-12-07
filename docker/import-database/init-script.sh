#!/bin/bash

# Import JSON data into MongoDB collections
mongoimport --host localhost --port 27017 --username root --password example --authenticationDatabase admin --db car-trader --collection specifications --type json --file /docker-entrypoint-initdb.d/car-trader.specifications.json --jsonArray
#mongoimport --host localhost --port 27017 --username admin --password pass --authenticationDatabase admin --db car-trader --collection specifications --type json --file /docker-entrypoint-initdb.d/car-trader.specifications.json --jsonArray
mongoimport --host localhost --port 27017 --username root --password example --authenticationDatabase admin --db car-trader --collection adverts --type json --file /docker-entrypoint-initdb.d/car-trader.adverts.json --jsonArray
mongoimport --host localhost --port 27017 --username root --password example --authenticationDatabase admin --db car-trader --collection roles --type json --file /docker-entrypoint-initdb.d/car-trader.roles.json --jsonArray
mongoimport --host localhost --port 27017 --username root --password example --authenticationDatabase admin --db car-trader --collection users --type json --file /docker-entrypoint-initdb.d/car-trader.users.json --jsonArray

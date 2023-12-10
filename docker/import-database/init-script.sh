#!/bin/bash

# restore JSON data from dump into MongoDB collections
mongorestore --db car-trader --drop /docker-entrypoint-initdb.d/dump/car-trader

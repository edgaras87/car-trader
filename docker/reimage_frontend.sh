#!/bin/bash

# Save current directory
current_dir=$(pwd)
docker-compose -f docker-compose.yaml down -v

# Change to another directory
cd ../frontend



# Do something in the new directory (optional)

docker rmi edgaras87/car-trader-frontend
rm -r dist
ng build
docker build -t edgaras87/car-trader-frontend .


# Go back to the original directory
cd "$current_dir"


docker-compose -f docker-compose.yaml up -d --build


# Print a message (optional)
echo "Returned to the home directory"

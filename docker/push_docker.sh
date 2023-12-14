#!/bin/bash

# Check if a tag version is provided
tag_version=""
if [ -n "$1" ]; then
    tag_version=":$1"
fi



image_front="edgaras87/car-trader-frontend"
image_back="edgaras87/car-trader-backend"

# Set the Docker image name and tag
tag_front="$image_front$tag_version"
tag_back="$image_back$tag_version"



docker tag "$image_front" "$tag_front"
docker tag "$image_back" "$tag_back"
docker images

# Push the Docker image to Docker Hub
docker push "$tag_front"
docker push "$tag_back"

#docker rmi "$tag_front"
#docker rmi "$tag_back"


docker images


# Check if the push was successful
if [ $? -eq 0 ]; then
    echo "Docker image pushed successfully: $docker_image$tag_version"
else
    echo "Error: Failed to push Docker image."
    exit 1
fi

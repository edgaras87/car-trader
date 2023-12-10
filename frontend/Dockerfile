# Use an official Node runtime as a parent image
FROM node:14-alpine as build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install


# Copy the application files to the container
COPY . .

# Expose the port the app runs on
EXPOSE 4200

# Command to run your application
CMD ["npm", "start"]



# ====================
FROM nginx
COPY --from=build /usr/src/app/dist/car-trader-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf


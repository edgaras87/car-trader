# Use an official Node runtime as a parent image
FROM node:14-alpine as build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install
#RUN npm install -g npm
#RUN npm i npm@6.14.18
#RUN npm run build --configuration env_name


# Copy the application files to the container
COPY . .

# Expose the port the app runs on
EXPOSE 4200

# Command to run your application
CMD ["npm", "start"]



# ====================
FROM nginx
COPY --from=build /usr/src/app/dist/car-trader-frontend /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
#COPY --from=build /nginx.conf /etc/nginx/conf.d/default.conf


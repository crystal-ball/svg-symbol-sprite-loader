FROM node:7.9-alpine as base
LABEL maintainer="hedgecock.d@gmail.com"

WORKDIR /usr/src/app

RUN npm install -g serve

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY test-app/package*.json ./
RUN npm install

# Bundle app source
COPY test-app .

EXPOSE 5000
EXPOSE 3000

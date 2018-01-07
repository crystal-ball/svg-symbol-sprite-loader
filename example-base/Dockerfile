FROM node:8.9-alpine as base
LABEL maintainer="hedgecock.d@gmail.com"

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY example-base/package*.json ./
RUN npm install

RUN npm install -g serve

# Bundle app source
COPY example-base .

EXPOSE 5000
EXPOSE 3000

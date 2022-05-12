FROM node:14-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

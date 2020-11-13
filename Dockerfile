FROM node:12.18.3-alpine

ENV APP_HOME /app
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

RUN apk update && npm install -g @vue/cli

COPY package*.json ./
RUN yarn install

COPY . .

RUN yarn build

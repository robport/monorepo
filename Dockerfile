FROM node:12-alpine AS app-base
WORKDIR /app
COPY app/package.json app/yarn.lock ./
RUN yarn install
COPY app/src ./src

FROM node:12-alpine AS app-base
WORKDIR /app
COPY *.json ./
RUN npm install
COPY apps ./apps
COPY libs ./libs
RUN npm run nx run nest-api:build:production
RUN npm run nx run resume:build:production
EXPOSE 3333
CMD [ "node", "/app/dist/apps/nest-api/main.js" ]


FROM node:12-alpine AS app-base
WORKDIR /app
COPY *.json ./
RUN npm install
COPY apps ./apps
COPY libs ./libs
RUN npm run nx build nest-api --prod
RUN npm run nx build resume --prod

EXPOSE 3333

CMD [ "node", "/app/dist/apps/nest-api/main.js" ]


FROM node:10.16.0-alpine as builder
WORKDIR /nest

COPY package.json .
COPY package-lock.json .
RUN npm i
COPY . .
RUN npm run prestart:prod

FROM node:10.16.0-alpine
RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm i --production

COPY --from=builder /nest/dist/ .
CMD [ "node", "main.js" ]

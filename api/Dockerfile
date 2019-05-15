FROM node:8.16.0-alpine

WORKDIR /usr/app

COPY yarn.lock package.json ./
RUN yarn install

COPY . .

EXPOSE 3000
CMD ["node", "index.js"]

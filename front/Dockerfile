FROM node:8.16.0-alpine

ARG REACT_APP_API_ENTRYPOINT
ENV REACT_APP_API_ENTRYPOINT $REACT_APP_API_ENTRYPOINT

RUN yarn global add serve
WORKDIR /usr/app

COPY yarn.lock package.json ./
RUN yarn install

COPY . .
COPY .env.example .env
RUN yarn run build

RUN rm -rf node_modules

EXPOSE 5000
CMD ["serve", "-s", "build"]

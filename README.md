# Requirement (tested on)
- Node 10.15.3
- npm 6.1.0 // yarn 1.6.0
- mongo 4.0.9

```sh
# Run frontend from root project folder (will listen on localhost:3000 by default)
yarn install
yarn run start

# Run backend API (mongodb should be started)
cd api
yarn install

EXPRESS_PORT=3001 MONGODB_URI=mongodb://localhost:27017/db ./node_modules/.bin/nodemon index.js
```

# API documentation
Since the API server is running, you can access its swagger documentation through http://API_URL:PORT/api-docs

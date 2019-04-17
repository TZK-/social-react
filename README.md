```sh
# Run frontend from root folder (will listen on localhost:3000 by default)
yarn install
yarn run start

# Run backend API (mongodb should be started)
cd api
yarn install

EXPRESS_PORT=3001 MONGODB_URI=mongodb://localhost:27017/db nodemon index.js
# Use node instead of nodemon if you want
```

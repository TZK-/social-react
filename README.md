# Installation

## With Docker (recommended)
### Tested Requirement
- Docker CE v18.09.2
- Docker Compose v1.23.2

```sh
git clone https://github.com/TZK-/social-react.git
cd social-react
docker-compose up -d
```

NB. You can customize the docker-compose.yml to change the opened ports etc. but by default the API will be accessible through [http://localhost:3000](http://localhost:3000) and the ReactApp from [http://localhost:5000](http://localhost:5000)

## Or Local installation (takes more time, not recommanded)
### Tested Requirement
- node v11.14.0
- npm v6.9.0
- yarn v1.7.0
- mongo v4.0.3

```sh
git clone https://github.com/TZK-/social-react.git
cd social-react
cd front
yarn install
PORT=5000 yarn run start # or build the app with yarn run build

cd ..
cd api
yarn install
cp .env.example .env
# fill the .env with the API server url (http://localhost:5000)

# Need to have a running mongo instance
EXPRESS_PORT=3000 MONGODB_URI=mongodb://localhost:27017/db node index.js
```

# API Documentation
There is a Swagger documentation available served by the API server. It is accessible from 
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

# Initial Setup

***Backend:-***
> Add your database URL in .env file also change db provider in `prisma/schema.prisma` file

``` .env

 # Environment variables declared in this file are automatically made available to Prisma.
 # See the documentation for more detail: https://pris.ly/d/   prisma-schema#accessing-environment-variables-from-the-schema

 # Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
 # See the documentation for all the connection string options: https://pris.ly/d/connection-strings 
 
 DATABASE_URL="provider://username:password@host:PORT/mydb"
 JWT_SECRET = "your secret"
 COOKIE_NAME = "your cookie name"
 NODE_ENV = "development"

```

### start backend sever `npm start` OR `yarn start`

***Front-end:-***

> Add firebase_key.js in root directory form there export default your firebase config secret OR open Helper/firebase.js to edit

```.env

NEXT_PUBLIC_SERVER_URL='http://localhost:8000' # backend server URL
NEXT_PUBLIC_COOKIE_NAME = 'c63c2db1c530292af42EIKOOC013685db7f97fe' # cookie name from backend server
NEXT_PUBLIC_SALT = '' # add salt
NEXT_PUBLIC_ANOTHER_SALT = '' # add salt

```

### start front end `npm run dev` OR `yarn dev`

### run `npm run format` OR `yarn format` to auto fromat all files
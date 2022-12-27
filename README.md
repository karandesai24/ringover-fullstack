### Ringover Fullstack task

------------


- Tech stacks used: React, SCSS, NodeJS, Express, Sequelize (ORM) , Postgres

------------



### To run this App locally do following setup-

------------



**For BACKEND**



<br></br>
- config .env file for backend(server) with following key-values:

- For Sequelize db: DEV_DATABASE,TEST_DATABASE,PROD_DATABASE,DATABASE_USER,DATABASE_USER_PROD,DATABASE_PASSWORD,DATABASE_PASSWORD_PROD,DATABASE_HOST,DATABASE_HOST_PROD
- For cookie-token :JWT_SECRET,JWT_LIFETIME,SIGNED_COOKIE_SECRET

- Add base localhost url in index.js inside server folder as cross-origin for cors restriction.

<br></br>

**For FRONTEND**



<br></br>
- config .env file for frontend(client) with backend url as:

- REACT_APP_BASE_URL= "http://localhost:5000"


<br></br>

### Alright now App is ready to run locally  ! 🚀 
## run node index.js for server-backend & npm start for client-frontend 

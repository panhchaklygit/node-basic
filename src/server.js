// need import module-alias to the top
require('module-alias/register');
require('dotenv').config();
require('@config/redis');
require('@config/mongodb');
require('@config/sequelize').mysqlConnection();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { errorHandler } = require('@middlewares/handle_error');
const mainRoutes = require('@routes');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    // middlewares use before routes
    this.middlewares();
    // routes use after middlewares
    this.routes();
    // handle errors use after routes
    this.handleError();
  }
    
  // middlewares
  middlewares() {
    // json use for parsing application/json
    this.app.use(express.json());
    // cookieParser use for parsing cookies
    this.app.use(cookieParser());
    // cors use for allowing cross-origin requests
    this.app.use(cors());
    // morgan use for logging requests
    this.app.use(morgan('dev'));
    // urlencoded use for parsing application/x-www-form-urlencoded
    this.app.use(express.urlencoded({ extended: true }));  
    // static use for serving static files
    this.app.use(express.static('public'));
  }
  // routes
  routes() {
    this.app.use('/api', mainRoutes);
  }
  // handle errors
  handleError() {
    this.app.use(errorHandler);
  }
  // listen
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}\nhttp://localhost:${this.port}`);
    });
  }
}

const server = new Server();
server.listen();
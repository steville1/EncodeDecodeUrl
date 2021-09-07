import express, { Request, Response, NextFunction } from 'express'
import { connect } from './sequelize'
const config = require("config");
import bodyParser from 'body-parser'
import apiRoutes from './routes'
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Create Express server
const app = express()
app.set('port', process.env.PORT || 4040)
require('dotenv').config();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

apiRoutes(app)

// 404 handler
app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).send()
})

// error handler
app.use((error: any, _req: Request, res: Response, next: NextFunction) => {
  if (!error) {
    return next()
  }

  res.status(500).send(error)
})

//Starting the Server
const startServer = async () => {
    await connect()
    app.listen(app.get('port'), () => {
      console.log(`Server is running on port ${app.get('port')} in ${app.get('env')} mode`)
     })
  } 
  startServer().catch((err) => {
    console.error(err)
   })
module.exports = app;
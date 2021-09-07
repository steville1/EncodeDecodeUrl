import { Express } from 'express'
import { getUrl, postUrl } from '../controllers/urlShortenerController'
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

export default function apiRoutes (app: Express) {

  const swaggerOptions={
    swaggerDefinition:{
      info:{
        title:"Url Shortener API",
        description:"Encode and Decode Url",
        contact:{
          name:"Ikani Stephen"
        },
        servers:["http://localhost:4040"]
  
      }
  
    },
     apis:['./src/routes/*.ts']
    //apis:['./routes/*.js']
    //apis:['./src/app.ts']
  
  };
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
  // routes middleware
/**
 * @swagger
 * /api/decode:
 *  get:
 *    parameters:
 *      -  in: query
 *         name: hash
 *         type: string
 *         required: false 
 *             
 *    description: Use To Decode Url Created
 *    responses:
 *      '200':
 *        description: A successful response
 */

  app.get('/api/decode/', getUrl)
 /**
 * @swagger
 * /api/encode:
 *  post:
 *    parameters:
 *      -  in: body
 *         name: url
 *         type: object
 *         required: false 
 *             
 *    description: Use To Decode Url Created
 *    responses:
 *      '200':
 *        description: A successful response
 */

  app.post('/api/encode', postUrl)
}
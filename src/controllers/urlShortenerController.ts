import { Response, Request, NextFunction } from 'express'
import Hashids from 'hashids'
import config from 'config'
import Joi from 'joi'

import { UrlShortenerInterface } from '../repositories/urlShortenerInterface'
import SqlUrlRepository from '../repositories/urlShortenerRepository'

const urlRepository: UrlShortenerInterface = new SqlUrlRepository()
const hashGenerator: Hashids = new Hashids('salt', 5);

const urlValidationSchema = {
  url: Joi.string().uri({ scheme: ['https', 'http'] }).trim().required()
}

export async function getUrl (req: Request, res: Response, next: NextFunction) {
    try {
      const shortUrl = req.query.hash as string
      console.log("Request", req.query.hash);
  
      let fullUrl = await urlRepository.getUrlByShortUrl(shortUrl)
      if (!fullUrl) {
          res.status(404).json({'responseCode':'21','responseMessage':'Not Found' }); 
      }
      res.status(200).json({'responseCode':'00','responseMessage':'Successful', fullUrl }); 
      } 
      catch (err) {
      next(err)
    }
  }
  
export async function postUrl (req: Request, res: Response, next: NextFunction) {
  try {
   const { error, value } = Joi.validate(
      { url: req.body.url },
      urlValidationSchema
    )

    if (error) {
        return res.status(400).json({'responseCode':'21','responseMessage':'Invalid Url', error }); 
      //return res.status(400).send('InvalidUrl')
    }
    
   

    const url = value.url
 

    const lastAvailableCount = await urlRepository.getLastAvailableCount()

    const hash = hashGenerator.encode(lastAvailableCount)

    await urlRepository.createShortUrl(url, hash)
    res.status(200).json({'responseCode':'00','responseMessage':'Successful', hash }); 

  } catch (err) {
    next(err)
  }
}
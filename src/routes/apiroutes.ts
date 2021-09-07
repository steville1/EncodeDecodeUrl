import { Express } from 'express'
import { getUrl, postUrl } from '../controllers/urlShortenerController'

export default function apiRoutes (app: Express) {
  app.get('/api/decode/', getUrl)
  app.post('/api/encode', postUrl)
}
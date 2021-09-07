import apiRoutes from './apiroutes'
import { Express } from 'express'

export default function initRoutes (app: Express) {
  apiRoutes(app)
}
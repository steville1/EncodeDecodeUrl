import { instance } from '../sequelize'
import UrlModel from './urlShortenerModel'
// Export models
export const Url = UrlModel(instance)
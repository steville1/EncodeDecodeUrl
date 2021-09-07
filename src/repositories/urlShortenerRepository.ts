import { Url } from '../models'
import { UrlShortenerInterface } from './urlShortenerInterface'

export default class SqlUrlRepository implements UrlShortenerInterface {
  private _url = Url

  public async getLastAvailableCount (): Promise<number> {
    const url = await this._url.findOne({ order: [['count', 'DESC']] })

    if (url === null) {
      return 0
    }

    return url.count
  }

  public async getUrlByShortUrl (shortUrl: string | string[]): Promise<string | null> {
    const urlInstance = await this._url.findOne({ where: { hash: shortUrl } })
    console.log("UrlInstance", urlInstance);
    if (!urlInstance) {
      return null
    }

    return urlInstance.url
  }

  public async createShortUrl (fullUrl: string, shortUrl: string): Promise<void> {
    await this._url.create({ url: fullUrl, hash: shortUrl })
  }
}
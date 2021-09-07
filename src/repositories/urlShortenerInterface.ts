export interface UrlShortenerInterface {
    getLastAvailableCount (): Promise<number>
    getUrlByShortUrl (shortUrl: string): Promise<string | null>
    getStatsOfUrl (shortUrl: string):Promise<Object | null>
    createShortUrl (fullUrl: string, shortUrl: string): Promise<void>
  }
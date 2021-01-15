/** Pulls detailed stock info from the IEX API https://iexcloud.io/docs/api/ */
class IEXFinanceAPI {

  constructor(APIkey) {
    this.APIKey = APIkey;
    this.urlConsts = {
      prod: "cloud",
      sandbox: "sandbox",
      entrypoint: {
        stock: "stock/",
        refdata: "ref-data/",
      },
      stock: "stock/",
      refdata: "ref-data/",
      token: "?token=",
    }

    this.baseURL = `https://${
      this.APIKey.startsWith("T") 
        ? this.urlConsts.sandbox 
        : this.urlConsts.prod
    }.iexapis.com/stable/`;

    this.tokenURL = this.urlConsts.token + APIkey;

    // supported endpoints
    this.endpoints = {
      advancedstats: "advanced-stats",
      balancesheet: "balance-sheet",
      company: "company",
      dividends: "dividends",
      fundamentals: "fundamentals",
      logo: "logo",
      news: "news",
      quote: "quote",
      recommendationtrends: "recommendation-trends",
      splits: "splits",
      // symbols: "symbols", can't be cached, must add fetch limit or lookup options
    }
  }

  _getCachedData(finalUrl) {
    const cache = CacheService.getScriptCache();
    let result = cache.get(finalUrl);
    if(!result) {
      const fetchResult = UrlFetchApp.fetch(finalUrl);
      result = fetchResult.getContentText();
      cache.put(finalUrl, result, 21600);
    }
    return JSON.parse(result);
  }

  getFinalURL(symbol, endpoint) {
    let mainUrl = "";
    switch (endpoint) {
      case this.endpoints.symbols:
        mainUrl = this.baseURL + this.urlConsts.refdata;
        break;
      default:
        mainUrl = this.baseURL + this.urlConsts.stock + symbol + '/';
    }

    return mainUrl + this.endpoints[endpoint] + this.tokenURL;
  }

  fetchData(symbol, endpoint) {
    if (endpoint === "endpoints") {
      return Object.keys(this.endpoints);
    }
    if (!(endpoint in this.endpoints)) {
      throw(`Invalid endpoint "${endpoint}" provided. Available endpoint are: ${Object.keys(this.endpoints).join(", ")}.`);
    }
    const url = this.getFinalURL(symbol, endpoint);
    const data = this._getCachedData(url);
    switch (endpoint) {
      case this.endpoints.logo:
        return data.url;
      case this.endpoints.fundamentals:
      case this.endpoints.balancesheet.replace("-",""):
        return data[endpoint];
      default:
        return data;
    }
  }
}
abstract class iexCloudAPI<T> {
	baseUrl = 'https://cloud.iexapis.com/stable/';
	token: string;

	constructor() {
		this.token = 'pk_28ff58b232844c4eb849452b1812e4ac';
	}

	private getCachedData(partialUrl: string): T {
		const url = this.baseUrl + partialUrl + '?token=' + this.token;
		const cache = CacheService.getScriptCache();
		let result = cache.get(url);
		if (!result) {
			const fetchResult = UrlFetchApp.fetch(url);
			result = fetchResult.getContentText();
			cache.put(url, result, 21600);
		}
		return result;
	}

	abstract getData(symbol: string): T;
}

interface DividendData {
	amount: float;
    currency: string;
    declaredDate: string;
    description: string;
    exDate: string;
    flag: string;
    frequency: string;
    paymentDate: string;
    recordDate: string;
    symbol: string;
    id: string;
    source: string;
    key: string;
    subkey: string;
    date: string;
    updated: string;
}

class iexCloudAPIDividendCall extends iexCloudAPI<DividendData> {
	constructor() {
		super();
	}

	getData(symbol: string, range: string): DividendData {
		return this.getCachedData(`stock/${symbol}/dividends/${range}`);
	}
}

// Google Sheets calls go here

/**
* Imports JSON data to your spreadsheet Ex: =GETEXCLOUDDIVIDENDDATA($A2,GOOGLEFINANCE($A2, "price"),"xxxx")
* @param {string} symbol         - your stock ticker
* @customFunction
*/
function IEXDIVIDENDDATA(symbol: string): DividendData {
	return new iexCloudAPIDividendCall().getData(symbol);
}

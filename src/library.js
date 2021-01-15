/** EXCEL LIBRARY */

/**
 * Detailed stock info from the IEX API https://iexcloud.io/docs/api/
 * 
 * @param {string} APIkey        Your IEXCloud token. Get one for free at https://iexcloud.io/cloud-login#/register/
 * @param {string} symbol        Target ticker symbol
 * @param {string} endpoint      The endpoint to extract. Use "endpoints" to get available options
 * @param {string} attribute     [OPTIONAL] The target attribute to extract. Get multiple via comma separate string or cell array. Use "attributes" to get available options
 * @customFunction
 */
function IEXFINANCE(APIkey, symbol, endpoint ,attribute) {
  const utils = new Utils();
  const check = utils.checkInputs(APIkey, symbol, endpoint, attribute);
  if (check !== null) {
    return check;
  }

  const api = new IEXFinanceAPI(APIkey);
  if (attribute === 'targeturl') {
    return api.getFinalURL(symbol, endpoint);
  }
  const data = utils.getFormattedData(api.fetchData(symbol, endpoint), attribute);
  return data;
}
/** UTILS CLASS  */
class Utils {

  checkInputs(APIkey, symbl, endpoint, attribute): ?string {
    if (symbl == null || symbl === "" || attribute === "") {
      return "";
    }

    if (endpoint == null || endpoint === "") {
      throw("Empty or no endpoint defined");
    }
    
    if (APIkey == null || APIkey == "") {
      throw("get a free API key from https://iexcloud.io/cloud-login#/register/");
    }

    return null;
  }

  normalizeDataObject(data): Record<string, mixed> {
    for (const [key,value] of Object.entries(data)) {
      data[key] = this.normalizeValue(value);
    }
    return data;
  }

  normalizeValue(value) {
    if (value instanceof Array) {
      return value.join(', ');
    }
    return value;
  }

  normalizeDataArray(data) {
    if (!(data[0] instanceof Object) ) {
      return data;
    }
    const masterkeys = Object.keys(data[0]);
    const mainData = {};
    mainData['dataIndex'] = [];
    data.forEach((_, index) => mainData.dataIndex.push(index));
    masterkeys.forEach(
      (key) => {
        const dataArray = [];
        data.forEach(entry => dataArray.push(this.normalizeValue(entry[key])));
        mainData[key] = dataArray;
      }
    );
    return mainData;
  }

  getFormattedData(data, attribute): mixed {
    if (["string", "number", "boolean"].includes(typeof data)) {
      return data;
    }

    if (data instanceof Object) {
      if (Object.keys(data).length === 0) {
        return '';
      } else {
        data = this.normalizeDataObject(data);
      }
    }

    if (data instanceof Array) {
      if (data.length === 1) {
        return this.getFormattedData(data[0], attribute);
      } else {
        data = this.normalizeDataArray(data);
      }
    }

    if (attribute != null) {
      const keys = Object.keys(data);
      if (attribute === 'attributes') {
        return keys;
      }

      // look for multiple attributes passed in via comma separate string or cell array
      const parsedAttributes = (attribute + '').split(",").map(entry => entry.trim()).filter(entry => entry !== "");

      return parsedAttributes.map(parsedAttribute => {
        if (!keys.includes(parsedAttribute)) {
          throw(`Invalid attribute "${parsedAttribute}" provided. Available attributes are: ${keys.join(", ")}.`);
        }
        return data[parsedAttribute];
      })
    }

    return Object.entries(data).map(entry => entry.reduce((a,b) => b instanceof Array ? [a, ...b] : [a,b]));
  }
}
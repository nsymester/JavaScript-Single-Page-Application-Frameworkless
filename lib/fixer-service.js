require('dotenv').config();
const axios = require('axios');

const symbols = process.env.SYMBOLS || 'EUR,USD,GBP';
const accessKey = process.env.API_KEY;

// Axios Client declaration
const api = axios.create({
  baseURL: 'http://data.fixer.io/api',
  params: {
    access_key: process.env.API_KEY
  },
  timeout: process.env.TIMEOUT || 5000
});

// Generic GET request function
const get = async url => {
  const response = await api.get(url);
  const { data } = response;
  if (data.success) {
    return data;
  }
  throw new Error(data.error.type);
};

module.exports = {
  getRates: () =>
    get(`/latest?access_key=${accessKey}&symbols=${symbols}&base=EUR`),

  getSymbols: () => get(`/symbols?access_key=${accessKey}`),

  getHistoricalRate: date =>
    get(`/${date}?access_key=${accessKey}&base=EUR&symbols=${symbols}`)
};

const fetch = require('isomorphic-fetch')
const isPresent = require('is-present')
const isBlank = require('is-blank')

const tickersMap = require('./tickers-map.json')

module.exports = function coinr (currency) {
  const tickerBase = 'https://api.coinmarketcap.com/v1/ticker'
  const url = isPresent(currency) ? `${tickerBase}/${currency}` : tickerBase 
  return new Promise(function (resolve, reject) {
    let currencyId = null
    const baseUrl = 'https://api.coinmarketcap.com/v1/ticker/'
    let url = null

    if (isPresent(currency)) {
      currencyId = tickersMap[currency.toLowerCase()]

      if (isBlank(currencyId)) {
        return reject({ error: `${currency} is unknown` })
      }

      url = `${baseUrl}${currencyId}`
    } else {
      url = baseUrl
    }


    console.log(url)

    fetch(url)
      .then(d => {
        d.json().then(d => {
          const response = isPresent(currency) ? d[0] : d
          isPresent(response) ? resolve(response) : reject(response)
        })
      })
      .catch(e => {
        reject(e)
      })
  })
}

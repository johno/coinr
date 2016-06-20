const fetch = require('isomorphic-fetch')
const isPresent = require('is-present')

module.exports = function coinr (currency) {
  const tickerBase = 'https://api.coinmarketcap.com/v1/ticker'
  const url = isPresent(currency) ? `${tickerBase}/${currency}` : tickerBase 
  return new Promise(function (resolve, reject) {
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

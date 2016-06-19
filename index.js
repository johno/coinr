const fetch = require('isomorphic-fetch')
const isPresent = require('is-present')

module.exports = function coinr (currency) {
  return new Promise(function (resolve, reject) {
    fetch(`https://api.coinmarketcap.com/v1/ticker/${currency}`)
      .then(d => {
        d.json().then(d => {
          const response = d[0]
          isPresent(response) ? resolve(response) : reject(response)
        })
      })
      .catch(e => {
        reject(e)
      })
  })
}

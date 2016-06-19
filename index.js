const fetch = require('isomorphic-fetch')

module.exports = function coinr (currency) {

  return new Promise(function (resolve, reject) {
    fetch(`https://api.coinmarketcap.com/v1/ticker/${currency}`).then(d => {
      resolve(d.json().then(d => d[0]))
    })
  })
}

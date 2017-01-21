require('dotenv').config()

const got = require('got')
const throttle = require('p-throttle')

const Influx = require('influx')

const client = new Influx.InfluxDB({
  database: 'coinr',
  username: process.env.INFLUX_USER,
  password: process.env.INFLUX_PASSWORD,
  port: process.env.INFLUX_PORT,
  host: process.env.INFLUX_HOST,
  schema: [{
    measurement: 'price',
    fields: {
      usd: Influx.FieldType.FLOAT,
      btc: Influx.FieldType.FLOAT
    },
    tags: [
      'currency'
    ]
  }]
})

const writeCurrency = ({ id }) => {
  console.log(`Fetching ${id}`)

  got(`https://api.coinmarketcap.com/v1/datapoints/${id}`, { json: true })
    .then(res => write(id, res.body))
    .then(() => console.log(`Finished ${id}`))
    .catch(() => console.log(`Failed ${id}`))
}

const write = (currency, data) => {
  const prices = data.price_usd.map((obj, i) => {
    return {
      tags: { currency },
      fields: {
        usd: obj[1],
        btc: data.price_btc[i][1]
      },
      timestamp: new Date(obj[0])
    }
  })

  return client.writeMeasurement('price', prices)
}

got('https://api.coinmarketcap.com/v1/ticker/', { json: true })
  .then(res => res.body)
  .then(currencies => {
    const throttled = throttle(currency => {
      writeCurrency(currency)
    }, 10, 2000)

    currencies.map(throttled)
  })

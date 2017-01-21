require('dotenv').config()

const got = require('got')
const coinr = require('coinr')
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

const write = data => {
  return client.writeMeasurement('price', [{
    tags: { currency: data.id },
    fields: {
      usd: data.price_usd,
      btc: data.price_btc
    },
    timestamp: new Date()
  }])
}

got('https://api.coinmarketcap.com/v1/ticker/', { json: true })
  .then(res => res.body.map(write))

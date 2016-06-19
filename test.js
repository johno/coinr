import test from 'ava'
import isPresent from 'is-present'

import coinr from './'

test.cb('grabs ethereum data', t => {
  t.plan(1)

  coinr('ethereum')
    .then(d => {
      console.log(d)
      t.true(isPresent(d))
      t.end()
    })
    .catch(e => {
      console.log(e)
      t.true(false)
      t.end()
    })
})

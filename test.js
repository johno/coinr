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

test.cb('rejects with unknown currency', t => {
  t.plan(1)

  coinr('foobar')
    .then(d => {
      console.log(d)
      t.true(false)
      t.end()
    })
    .catch(e => {
      console.log(e)
      t.true(true)
      t.end()
    })
})

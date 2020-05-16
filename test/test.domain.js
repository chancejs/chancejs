import test from 'ava'
import Chance from '../chance.js'
import _ from 'lodash'

const chance = new Chance()

test('Domain test when tld key equals a string', (t) => {
  _.times(1000, () => {
    const tld = 'com'
    const domain = chance.domain({ tld })
    t.true(domain.endsWith(tld))
  })
})

test('Domain test when tld key equals an array', (t) => {
  _.times(1000, () => {
    const tldList = ['com', 'net', 'org']
    const domain = chance.domain({ tld: tldList })
    const domainsTld = domain.split('.')[1] // 'com', 'net' or 'org'
    t.true(tldList.includes(domainsTld))
  })
})

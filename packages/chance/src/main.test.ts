import { bool, integer } from './main'
import test from 'ava'

test('bool() returns a random boolean', (t) => {
  t.is(typeof bool(), 'boolean')
})

test('integer() exists and returns a number', (t) => {
  t.is(typeof integer(), 'number')
})

import { Core } from './main'
import test from 'ava'

const chance = new Core()

test('chance() returns a random number', (t) => {
    t.is(typeof chance.random(), 'number')
})

test('chance() returns a random number between 0 and 1', (t) => {
    for (let i = 0; i < 1000; i++) {
	t.true(chance.random() >= 0 && chance.random() <= 1)
    }
})

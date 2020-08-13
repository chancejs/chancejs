import { MersenneTwister } from './main'
import test from 'ava'

test("MarsenneTwister returns a random number between 0 and 1", (t) => {
  const twister = new MersenneTwister(21)
  const random = twister.random()
  t.true(random > 0)
  t.true(random < 1)
//  t.deepEqual(random, 2)
})

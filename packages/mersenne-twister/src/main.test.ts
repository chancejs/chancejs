import test from 'ava'
import MersenneTwister from './main'

test("test", async t => {
  const twister = new MersenneTwister(21)
  const random = twister.random()
  t.true(random > 0)
  t.true(random < 1)
//  t.deepEqual(random, 2)
})

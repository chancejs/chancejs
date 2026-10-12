import test from 'ava'
import Chance from '../chance.js'

test('shuffle() handles arrays larger than the function argument limit', t => {
    const input = Object.freeze(Array.from({ length: 250000 }, (_, i) => i))
    const shuffled = new Chance(12345).shuffle(input)
    t.not(shuffled, input)
    t.is(shuffled.length, input.length)
    t.deepEqual(shuffled.slice().sort((a, b) => a - b), input)
})

test('shuffle() preserves repeated object references in a large array', t => {
    const first = { value: 'first' }
    const second = { value: 'second' }
    const input = Object.freeze(Array.from({ length: 250000 }, (_, i) => i % 2 ? first : second))
    const shuffled = new Chance(67890).shuffle(input)
    t.is(shuffled.length, input.length)
    t.is(shuffled.filter(value => value === first).length, 125000)
    t.is(shuffled.filter(value => value === second).length, 125000)
})

test('pick() with a count can sample from a large array', t => {
    const input = Object.freeze(Array.from({ length: 250000 }, (_, i) => i))
    const picked = new Chance(12345).pick(input, 10)
    t.is(picked.length, 10)
    t.is(new Set(picked).size, 10)
    t.true(picked.every(value => Number.isInteger(value) && value >= 0 && value < input.length))
})

test('shuffle() preserves seeded results and the random generator state', t => {
    const chance = new Chance(12345)
    const control = new Chance(12345)
    const input = Object.freeze(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])
    t.deepEqual(chance.shuffle(input), ['h', 'g', 'b', 'a', 'e', 'd', 'c', 'f'])
    input.forEach(() => control.random())
    t.is(chance.random(), control.random())
})

test('shuffle() returns a fresh array for empty and singleton inputs', t => {
    const chance = new Chance(12345)
    const empty = Object.freeze([])
    const singleton = Object.freeze(['only'])
    const shuffledEmpty = chance.shuffle(empty)
    const shuffledSingleton = chance.shuffle(singleton)
    t.not(shuffledEmpty, empty)
    t.not(shuffledSingleton, singleton)
    t.deepEqual(shuffledEmpty, [])
    t.deepEqual(shuffledSingleton, ['only'])
})

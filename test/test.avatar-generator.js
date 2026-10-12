import test from 'ava'
import crypto from 'crypto'
import Chance from '../chance.js'

const email = 'person@example.test'
const hash = value => crypto.createHash('md5').update(value).digest('hex')
const base = '//www.gravatar.com/avatar/'

const constructors = [
    ['new Chance', generator => new Chance(generator)],
    ['Chance', generator => Chance(generator)]
]

constructors.forEach(([name, create]) => {
    test(name + ' with a custom generator accepts an avatar email string', t => {
        const chance = create(() => 0.5)
        t.is(chance.avatar(email), base + hash(email))
    })

    test(name + ' with a custom generator respects avatar options', t => {
        const chance = create(() => 0.5)
        t.is(chance.avatar({
            email: email,
            protocol: 'https',
            fileExtension: 'png',
            size: 96,
            rating: 'pg',
            fallback: 'identicon'
        }), 'https:' + base + hash(email) + '.png?&s=96&r=pg&d=identicon')
    })

    test(name + ' with a custom generator generates an avatar email', t => {
        const chance = create(() => 0.5)
        const expectedEmail = create(() => 0.5).email()
        t.is(chance.avatar(), base + hash(expectedEmail))
    })

    test(name + ' with a custom generator handles avatar options without email', t => {
        const chance = create(() => 0.5)
        const expectedEmail = create(() => 0.5).email()
        t.is(chance.avatar({ protocol: 'https' }), 'https:' + base + hash(expectedEmail))
    })

    test(name + ' preserves the custom generator without drawing on construction', t => {
        let calls = 0
        const generator = () => {
            calls++
            return 0.5
        }
        const chance = create(generator)
        t.is(chance.random, generator)
        t.is(calls, 0)
        t.false('mt' in chance)
        t.is(chance.random(), 0.5)
        t.is(calls, 1)
    })
})

test('seeded avatars keep their hash and do not advance the random generator for an email', t => {
    const chance = new Chance(12345)
    const control = new Chance(12345)
    t.is(chance.avatar(email), base + hash(email))
    t.is(chance.random(), control.random())
})

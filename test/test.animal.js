import test from 'ava'
import Chance from '../chance.js'
import _ from 'lodash'

const chance = new Chance()

const timeout = (seconds) => {
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(), seconds)
    })
}

//chance.animal()

test('returns an animal', t => {
    _.times(1000, () => {
        let animal = chance.animal({type:"dessert"})
        t.true(_.isString(animal))
        t.true(animal.length >= 2)
        t.true(animal.length <= 20)
    })
})

test('throws an error if the type is not part of the animals object', t => {
    _.times(1000, () => {
        const fn = () => chance.animal({type:"test"})
        t.throws(fn, "Please pick from dessert, ocean, grassland, forest, zoo, pets, farm.")
    })
})

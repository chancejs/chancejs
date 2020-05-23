import test from 'ava'
import Chance from '../chance.js'
import _ from 'lodash'
import phoneNumber from './helpers/phoneNumber.min.js'

const chance = new Chance()

// chance.phone()
test('phone() returns a string', t => {
    t.true(_.isString(chance.phone()))
})

test('phone() looks like an actual phone number', t => {
    t.true(/^\(([2-9][0-8][0-9])\)?[\-. ]?([2-9][0-9]{2,2})[\-. ]?([0-9]{4,4})$/.test(chance.phone()))
})

test('phone() obeys formatted option', t => {
    _.times(1000, () => {
        let phone = chance.phone({ formatted: false })
        t.true(_.isString(phone))
        t.true(/^[2-9][0-8]\d[2-9]\d{6,6}$/.test(phone))
    })
})

test('phone() obeys formatted option and parens option', t => {
    _.times(1000, () => {
        let phone = chance.phone({ formatted: false, parens: true })
        t.true(_.isString(phone))
        t.true(/^[2-9][0-8]\d[2-9]\d{6,6}$/.test(phone))
    })
})

test('phone() with country au option', t => {
    _.times(1000, () => {
        let phone = chance.phone({ country: 'au', formatted:false });
        t.true(_.isString(phone))
        t.true(/^0[2,3,7,8][0-9]{8}$/.test(phone))
    })
})

test('phone() with country au and mobile option', t => {
    _.times(1000, () => {
        let phone = chance.phone({ country: 'au', mobile:true });
        t.true(_.isString(phone))
        t.true(/^04[0-9]{8}$/.test(phone))
    })
})

test('phone() with uk option works', t => {
    t.true(_.isString(chance.phone({ country: 'uk' })))
})

test('phone() with uk option works and mobile option', t => {
    t.true(_.isString(chance.phone({ country: 'uk', mobile: true })))
})

test('phone() with uk country looks right', t => {
    t.true(phoneNumber.isValid(chance.phone({ country: 'uk' })))
})

test('phone() with uk country unformatted looks right', t => {
    t.true(phoneNumber.isValid(phoneNumber.format(chance.phone({
        country: 'uk',
        formatted: false
    }))))
})

test('phone() with uk country and mobile option looks right', t => {
    _.times(1000, () => {
        t.true(phoneNumber.isValid(chance.phone({
            country: 'uk',
            mobile: true
        })))
    })
})

test('phone() with uk country and mobile option unformatted looks right', t => {
    _.times(1000, () => {
        t.true(phoneNumber.isValid(phoneNumber.format(chance.phone({
            country: 'uk',
            mobile: true,
            formatted: false
        }))))
    })
})

test('phone() with fr country works', t => {
    t.true(_.isString(chance.phone({ country: 'fr' })))
})

test('phone() with fr country works with mobile option', t => {
    t.true(_.isString(chance.phone({ country: 'fr', mobile: true })))
})

test('phone() with fr country looks right', t => {
    _.times(1000, () => {
        t.true(/0[123459] .. .. .. ../.test(chance.phone({ country: 'fr' })))
    })
})

test('phone() with fr country looks right unformatted', t => {
    _.times(1000, () => {
        t.true(/0........./.test(chance.phone({
            country: 'fr',
            formatted: false
        })))
    })
})

test('phone() with fr country on mobile looks right', t => {
    _.times(1000, () => {
        t.true(/0[67] .. .. .. ../.test(chance.phone({
            country: 'fr',
            mobile: true
        })))
    })
})

test('phone() with fr country on mobile, unformatted looks right', t => {
    _.times(1000, () => {
        t.true(/0[67]......../.test(chance.phone({
            country: 'fr',
            mobile: true,
            formatted: false
        })))
    })
})

test('phone() with br country option works', t => {
    t.true(_.isString(chance.phone({ country: 'br' })))
})

test('phone() with br country and mobile option works', t => {
    t.true(_.isString(chance.phone({ country: 'br', mobile: true })))
})

test('phone() with br country and formatted false option return a correct format', t => {
    t.true(/([0-9]{2})([2-5]{1})([0-9]{3})([0-9]{4})/.test(chance.phone({
        country: 'br',
        mobile: false,
        formatted: false
    })))
})

test('phone() with br country, formatted false and mobile option return a correct format', t => {
    t.true(/([0-9]{2})\9([0-9]{4})([0-9]{4})/.test(chance.phone({
        country: 'br',
        mobile: true,
        formatted: false
    })))
})

test('phone() with br country and formatted option apply the correct mask', t => {
    t.true(/\(([0-9]{2})\) ([2-5]{1})([0-9]{3})\-([0-9]{4})/.test(chance.phone({
        country: 'br',
        mobile: false,
        formatted: true
    })))
})

test('phone() with br country, formatted and mobile option apply the correct mask', t => {
    t.true(/\(([0-9]{2})\) 9([0-9]{4})\-([0-9]{4})/.test(chance.phone({
        country: 'br',
        mobile: true,
        formatted: true
    })))
})
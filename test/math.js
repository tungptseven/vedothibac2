/**
 * Created by msi on 11/02/2017.
 */
const chai = require('chai');
chai.should();

const math = require('../math/hambac2');

describe('Test validate function', function(){

    it('if a is not number throw error', () => {
        (() => {
            math.validate_abc('bad param', 1, 10)

        }).should.throw('a is not number');
    });

    it('if b is not number throw error', () => {
        (() => {
            math.validate_abc(1, 'not param', 10)

        }).should.throw('b is not number');
    });

    it('if c is not number throw error', () => {
        (() => {
            math.validate_abc(1, 10, 'worst param')

        }).should.throw('c is not number');
    });

    it('if a is zero throw error', () => {
        (() => {
            math.validate_abc(0, 1 , 2)

        }).should.throw('a equal to zero');
    });

    it('a,b,c are number', () => {
        math.validate_abc(-4, 4 , 1).should.deep.equal([-4, 4, 1]);
    });

});

describe('Test function findX', () => {

    it('if delta less than zero', () => {
        (() => {
            math.findX(3, -4, 4)

        }).should.throw('delta less than zero');
    });

  it('x1 = 2, x2 = 5', () => {

      math.findX(1, -7, 10).should.deep.equal([2, 5]);
  });

});

describe('Test function findY', () => {

    it('y = 0', () => {
        math.findY(1, -7, 10, 5).should.equal(0);
    })
});

describe('Test function findY', () => {

    it('y = 0', () => {
        math.findY(1, -7, 10, 5).should.equal(0);
    })
});
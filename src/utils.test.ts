// import react-testing-library from '@testing-library/react';
export * from '@testing-library/react'
import { calculatePerformance } from './utils';
/**
 * Test the calculatePerformance() function
 * @param performance
 * @returns
 * @example
 * let initialInvestment = 10000
 * For example, If for the first period of 'AAPL' 2.036, it means it went up by 2.036%. The amount is now: 10 203.60$
 * @example
 * [
 *  [
 *   1278028800000,
 *  -18.81556171954924
 * ],
 * [
 *  1278633600000,
 * -11.955706772519708
*  ]
 * ]
*/
test('calculatePerformance', () => {
  const performance = [
    [
        1278028800000,
        -18.81556171954924
    ],
    [
        1278633600000,
        -11.955706772519708
    ],
    [
        1279238400000,
        20.5679567729557
    ],
    [
        1279843200000,
        1.8690995336870009
    ],
    [
        1280448000000,
        -7.014691613474488
    ]
  ];
  const result = calculatePerformance(performance);
  expect(result).toEqual([
    [
        '2010-07-02T00:00:00.000Z',
        8118.443828045076
    ],
    [
        '2010-07-09T00:00:00.000Z',
        7147.826489472282
    ],
    [
        '2010-07-16T00:00:00.000Z',
        8617.988352032819
    ],
    [
        '2010-07-23T00:00:00.000Z',
        8779.067132133863
    ],
    [
        '2010-07-30T00:00:00.000Z',
        8163.2426462747735
    ]
]);
});


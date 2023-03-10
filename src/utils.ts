/**
 * @description
 * The performance array is an array of arrays. Each array contains the timestamp and the price growth.
 * The price growth is the percentage of growth of the stock price.
 * The performance array is sorted by timestamp.
 * @example
 * let initialInvestment = 10000
 * For example, If for the first period of 'AAPL' 2.036, it means it went up by 2.036%. The amount is now: 10 203.60$
 */
export const calculatePerformance = (performance: any) => {
  let initialInvestment = 10000;
  return performance.reduce((acc: any, [timestamp, priceGrowth]: any) => {
    const initialAmount = (initialInvestment * priceGrowth) / 100; // 2.036
    initialInvestment = initialAmount + initialInvestment;
    acc.push([...[new Date(timestamp).toISOString(), initialInvestment]]); // 2021-01-01T00:00:00.000Z, 10203.6
    return acc;
  }, []);
};
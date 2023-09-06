function exchange(sourceCurrency, amount, targetCurrency, pools) {
  const results = [];

  function findPaths(currentCurrency, currentAmount, path, rate) {
    if (currentCurrency === targetCurrency) {
      results.push({ path, finalRate: rate });
      return;
    }

    for (const pool of pools) {
      const currencyA = pool[0].currencyA;
      const amountA = pool[0].amountA;
      const currencyB = pool[1].currencyB;
      const amountB = pool[1].amountB;

      if (currencyA === currentCurrency) {
        const nextCurrency = currencyB;
        const nextAmount = (currentAmount * amountB) / amountA;
        const nextRate = rate * (amountB / amountA);
        const nextPath = [...path, nextCurrency];

        // Check to avoid infinite loops
        if (!path.includes(nextCurrency)) {
          findPaths(nextCurrency, nextAmount, nextPath, nextRate);
        }
      } else if (currencyB === currentCurrency) {
        const nextCurrency = currencyA;
        const nextAmount = (currentAmount * amountA) / amountB;
        const nextRate = rate * (amountA / amountB);
        const nextPath = [...path, nextCurrency];

        // Check to avoid infinite loops
        if (!path.includes(nextCurrency)) {
          findPaths(nextCurrency, nextAmount, nextPath, nextRate);
        }
      }
    }
  }

  findPaths(sourceCurrency, amount, [sourceCurrency], 1);

  return results;
}

// Example
const pools = [
  [
    { currencyA: "VND", amountA: 1000000 },
    { currencyB: "AUD", amountB: 2000000 },
  ],
  [
    { currencyA: "AUD", amountA: 2000000 },
    { currencyB: "AUF", amountB: 3000000 },
  ],
  [
    { currencyA: "AUF", amountA: 1000000 },
    { currencyB: "AUG", amountB: 4000000 },
  ],
  [
    { currencyA: "AUG", amountA: 4000000 },
    { currencyB: "AUH", amountB: 2000000 },
  ],
  [
    { currencyA: "AUH", amountA: 2000000 },
    { currencyB: "VND", amountB: 5000000 },
  ],
  [
    { currencyA: "VND", amountA: 5000000 },
    { currencyB: "AUJ", amountB: 2000000 },
  ],
  [
    { currencyA: "AUJ", amountA: 5000000 },
    { currencyB: "USD", amountB: 20000000 },
  ],
  [
    { currencyA: "AUH", amountA: 1000000 },
    { currencyB: "AUJ", amountB: 6000000 },
  ],
  [
    { currencyA: "AUJ", amountA: 3000000 },
    { currencyB: "AUK", amountB: 2000000 },
  ],
  [
    { currencyA: "AUK", amountA: 1000000 },
    { currencyB: "USD", amountB: 20000000 },
  ],
];

const results = exchange("VND", 1, "USD", pools);
console.log(results);

import React from 'react';
import propTypes from 'prop-types';
import { isFin, isDict, isStr } from 'fpx';

import { toClassNameString, formatNumber, maybeUpperCase } from '../../utils/utils';
import { CURRENCIES } from '../../lib/constants';

/*
Accepts an amount and a currency and renders them in a canonical fashion:
limits the amount of decimals, attempts to find the matching currency symbol,
may or may not display the currency code in addition to the symbol, and so on.

Currently only supports prices in whole units.
Amounts in whole units must be passed as `value`.
TODO: Add amounts in cents that can be passed as `valueCents`. It should be invalid to pass both.

The currency must be either a dict in the same format as 'CURRENCIES' from constants,
or a string. A string is assumed to be an ISO currency code and used as a key to
`CURRENCIES` constants to get the corresponding currency information. This component
does not require the currency to be a known constant because a currency code may
come from external data, user input, etc., and it's useful to be able to display
it in a sensible fashion.

Beware: multiple currencies may share the same symbol and must be disambiguated
by code. Take dollars for example:

  Canada: symbol = $, code = CAD
  NZ:     symbol = $, code = NZD
  US:     symbol = $, code = USD

To avoid confusion, we must always display the code. The symbol is secondary.
Possible formats include:

  $100.00 USD
  USD$100.00
  100.00 USD
  USD 100.00
 */

const AmountWithCurrency = ({ value, currency, decimals, className: cls, ...props }) => {
    if (!isFin(value)) {
        return (
            <span {...props} className={cls}>{' '}</span>
        )
    }

    const currencyDict = (
        isDict(currency)
            ? currency
            : isStr(currency)
            ? CURRENCIES[currency.toLowerCase()]
            : undefined
    )

    const currencyCode = (
        (currencyDict && currencyDict.code) ||
        (isStr(currency) ? currency : undefined)
    )

    const currencySymbol = currencyDict && currencyDict.symbol
    const priceStr = formatNumber(value, decimals)

    // Note: `flex-shrink: 0` may prevent the span from collapsing and breaking
    // the number over multiple lines.
    return (
        <span {...props} className={toClassNameString('flex-shrink-none', cls)}>
            {currencySymbol}{priceStr}
            {' '}
            {maybeUpperCase(currencyCode)}
      </span>
    )
}

AmountWithCurrency.propTypes = {
    value: propTypes.number.isRequired,
    currency: propTypes.object.isRequired,
    decimals: propTypes.number.isRequired,
    className: propTypes.string
}

export default AmountWithCurrency;

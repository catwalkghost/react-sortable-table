const LEFT_ARROW = '«';
const RIGHT_ARROW = '»';
const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';
const LOADING_TEXT = 'Loading';

const TABLE_DATA_URL = './data.json'
const TABLE_DATA_ERROR = 'Data table cannot be loaded';

const STATUS_IDLE = 'idle';
const STATUS_LOADING = 'loading';
const STATUS_SUCCEEDED = 'succeeded';
const STATUS_FAILED = 'failed';

const TABLE_HEADER = [
    {
        name: 'firstName',
        columnName: 'First Name'
    },
    {
        name: 'lastName',
        columnName: 'Last Name'
    },
    {
        name: 'dob',
        columnName: 'DOB'
    },
    {
        name: 'income',
        columnName: 'Yearly Income'
    },
];

const DEFAULT_FRACTION_DIGITS = 2;
const FORMAT_LOCALE = 'en-UK';

const INPUT_DEBOUNCE = 100;

// https://en.wikipedia.org/wiki/ISO_4217
// https://en.wikipedia.org/wiki/Category:Currency_symbols
const CURRENCY_USD = {code: 'usd', symbol: '$'}
const CURRENCY_EUR = {code: 'eur', symbol: '€'}
const CURRENCY_GBP = {code: 'gbp', symbol: '£'}

const CURRENCIES = {
    [CURRENCY_USD.code]: CURRENCY_USD,
    [CURRENCY_EUR.code]: CURRENCY_EUR,
    [CURRENCY_GBP.code]: CURRENCY_GBP
}

export {
    LEFT_ARROW,
    RIGHT_ARROW,
    LEFT_PAGE,
    RIGHT_PAGE,
    TABLE_DATA_URL,
    TABLE_DATA_ERROR,
    TABLE_HEADER,
    LOADING_TEXT,
    STATUS_IDLE,
    STATUS_FAILED,
    STATUS_SUCCEEDED,
    STATUS_LOADING,
    DEFAULT_FRACTION_DIGITS,
    FORMAT_LOCALE,
    CURRENCIES,
    CURRENCY_GBP,
    INPUT_DEBOUNCE
}

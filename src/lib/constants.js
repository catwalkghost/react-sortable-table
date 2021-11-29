const LEFT_ARROW = '«';
const RIGHT_ARROW = '»';
const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';
const LOADING_TEXT = 'Loading';

const TABLE_DATA_URL = './MOCK_DATA.json'
const TABLE_DATA_ERROR = 'Data table cannot be loaded';

const STATUS_IDLE = 'idle';
const STATUS_LOADING = 'loading';
const STATUS_SUCCEEDED = 'succeeded';
const STATUS_FAILED = 'failed';

const TABLE_HEADER = [
    {
        name: 'id',
        columnName: 'ID',
        align: 'left',
        classes: 'narrow-cell'
    },
    {
        name: 'first_name',
        columnName: 'First Name',
        align: 'left'
    },
    {
        name: 'last_name',
        columnName: 'Last Name',
        align: 'left'
    },
    {
        name: 'email',
        columnName: 'Email',
        align: 'left'
    },
    {
        name: 'date_of_birth',
        columnName: 'DOB',
        align: 'center'
    },
    {
        name: 'industry',
        columnName: 'Industry',
        align: 'center',
        classes: 'text-hyphenate'
    },
    {
        name: 'salary',
        columnName: 'Salary',
        align: 'right'
    },
    {
        name: 'years_of_experience',
        columnName: 'Years of Experience',
        align: 'right'
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

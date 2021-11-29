import { isStr, isNat, isFun, isFin, val, filter, str } from 'fpx';

import {
    LEFT_PAGE,
    RIGHT_PAGE,
    DEFAULT_FRACTION_DIGITS,
    FORMAT_LOCALE
} from '../lib/constants';

import { chartActions } from '../Store/chartSlice';
import { tableActions } from '../Store/tableSlice';
import { searchActions } from '../Store/searchSlice';

// TODO: This can be broken down into separate utility files

/**
 * Sets range
 * @param from
 * @param to
 * @param step
 * @returns {*[]}
 */
const setRange = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
}

/**
 * Checks if the rowsLimit is integer and then sets it via useDispatch
 * @param dispatch
 * @param rowsLimit
 * @returns {undefined}
 */
const handleRowsLimit = (dispatch, rowsLimit) => {
    val(isFun(dispatch));
    val(isNat(rowsLimit));

    const { changeRowsLimit } = tableActions;

    dispatch(changeRowsLimit({
        rowsLimit,
        currentPage: 1
    }));
}

/**
 * Checks if a string is not empty
 * @param value
 * @returns {boolean}
 */
const isNonEmptyString = value => {
    return isStr(value) && value.trim() !== ''
}

/**
 * Gets new page
 * @param pageNumber
 * @param currentPage
 * @returns {number|*}
 */
const getNewPage = (pageNumber, currentPage) => {
    if (pageNumber === 'LEFT') {
        return currentPage - 1;
    }
    if (pageNumber === 'RIGHT') {
        return currentPage + 1;
    }
    return pageNumber;
}

/**
 * Changes page in the paginator via useDispatch
 * @param dispatch
 * @param pageNumber
 * @param currentPage
 */
const handleChangePage = (dispatch, pageNumber, currentPage) => {
    val(isFun(dispatch));
    val(isNat(pageNumber));
    val(isNat(currentPage));

    const newPage = getNewPage(pageNumber, currentPage);
    const { changePage } = tableActions;

    dispatch(changePage(newPage));
}

/**
 * Fetches page numbers and formats them
 * @param lengthData
 * @param rowsLimit
 * @param currentPage
 * @param pageNeighbours
 * @returns {*[]}
 */
const fetchPageNumbers = (lengthData, rowsLimit, currentPage = 1, pageNeighbours = 1) => {

    const totalPages = Math.ceil(lengthData / rowsLimit);
    pageNeighbours = Math.max(0, Math.min(pageNeighbours, 2));

    const totalNumbers = (pageNeighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
        const startPage = Math.max(2, currentPage - pageNeighbours);
        const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
        let pages = setRange(startPage, endPage);

        const hasLeftSpill = startPage > 2;
        const hasRightSpill = (totalPages - endPage) > 1;
        const spillOffset = totalNumbers - (pages.length + 1);

        switch (true) {
            case (hasLeftSpill && !hasRightSpill): {
                const extraPages = setRange(startPage - spillOffset, startPage - 1);
                pages = [LEFT_PAGE, ...extraPages, ...pages];
                break;
            }

            case (!hasLeftSpill && hasRightSpill): {
                const extraPages = setRange(endPage + 1, endPage + spillOffset);
                pages = [...pages, ...extraPages, RIGHT_PAGE];
                break;
            }

            case (hasLeftSpill && hasRightSpill):
            default: {
                pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
                break;
            }
        }

        return [1, ...pages, totalPages];
    }

    return setRange(1, totalPages);
}

/**
 * Gets sorting direction (ASC/DESC)
 * @param currentDirection
 * @param isSame
 * @returns {string|null}
 */
const getSortingDirection = (currentDirection, isSame) => {
    if (currentDirection === 'ASC' && isSame) {
        return 'DESC';
    }
    if (currentDirection === 'DESC' && isSame) {
        return null;
    }

    return 'ASC';
}

/**
 * Changes table sorting direction via useDispatch
 * @param dispatch
 * @param column
 * @param sort
 * @param sortField
 */
const handleSorting = (dispatch, column, sort, sortField) => {
    const newSort = getSortingDirection(sort, sortField === column);
    const { changeTableSorting } = tableActions;

    dispatch(changeTableSorting({
        sort: newSort,
        sortField: column
    }));

}

/**
 * Sorts data by column
 * @param data
 * @param column
 * @param newSort
 * @returns {*[]|*}
 */
const sortData = (data, column, newSort) => {
    const compare = (a, b) => {
        if (a[column] > b[column]) {
            return 1;
        }
        if (a[column] < b[column]) {
            return -1;
        }

        return 0;
    }

    if (data.length === 0) {
        return [];
    }

    const sorted = data.slice(0).sort(compare);

    if (newSort === 'ASC') {
        return sorted;
    }

    if (newSort === 'DESC') {
        return sorted.reverse();
    }

    return data;
}

/**
 * Converts a string to lower case
 * @param value
 * @returns {string}
 */
const toLowerCase = (value) => {
    return str(value).toLowerCase();
}


/**
 * Filters data. Expensive and case-sensitive
 * TODO: rework to be less expensive
 * @param data
 * @param value
 * @returns {*}
 */
const filterData = (data, value) => {
    if (value === null) {
        return data;
    }

    return data.filter(item => {
        let matching;

        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const key in item) {
            const text1 = String(item[key]).replace(/\r?\n/g, ' ');
            const text2 = value.trim();
            const caseInsText1 = toLowerCase(text1);
            const caseInsText2 = toLowerCase(text2);
            matching = matching || caseInsText1.indexOf(caseInsText2) !== -1;
        }

        return matching;
    });
}

/**
 * Formats a number based on the toLocaleString
 * @param value
 * @param decimals
 * @returns {string}
 */
const formatNumber = (value, decimals) => {
    if (!isFin(value)) return '';
    if (!isNat(decimals)) decimals = DEFAULT_FRACTION_DIGITS;

    return value.toLocaleString(FORMAT_LOCALE, {
        maximumFractionDigits: decimals,
        // Note: grouping can cause the number to break over multiple lines in very
        // narrow layouts, particularly if the locale uses spaces.
        useGrouping: true,
    });
}

/**
 * Combines arguments into a className string. Checks for empty strings. Useful for dynamically assigned class names.
 * @returns {string}
 */
const toClassNameString = (...args) => {
    return filter(args, isNonEmptyString).join(' ');
}


/**
 * Converts a string to upper case
 * @param value
 * @returns {string}
 */
const toUpperCase = (value) => {
    return str(value).toUpperCase();
}

/**
 * Determines if a string can/should be converted to upperc ase
 * @param value
 * @returns {string|undefined}
 */
const maybeUpperCase = (value) => {
    if (value == null) return undefined;
    return toUpperCase(value);
}

/**
 * Returns a short random string.
 * Uses `Math.random()`, which has weak entropy in some JS engines.
 * Only usable for unimportant and sparse values such as DOM IDs.
 * @returns {string}
 */
const generateRandomId = () => {
    return String(Math.random()).replace(/\d*\./, '')
}

/**
 * Provides a debounce functionality
 * @param time
 * @param fun
 * @returns {function(...[*]): function(): void}
 */
const debounce = (time, fun) => {
    val(time, isFin)
    val(fun, isFun)

    let timerId

    const deinit = () => clearTimeout(timerId);

    const debounced = (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(fun, time, ...args);
        return deinit;
    }

    debounced.deinit = deinit

    return debounced
}

/**
 * New search
 * @param dispatch
 * @param value
 * @returns {*}
 */
const newSearch = ( dispatch, value) => {
    const { setSearch } = searchActions;
    dispatch(setSearch({
        searchValue: value
    }));
}

/**
 * Finds all occurrences within an object by key using recursion.
 * Outputs an array
 * @param obj
 * @param keyToFind
 * @returns {[string, unknown]}
 */
const findAllByKey = (obj, keyToFind) => {
    return Object.entries(obj)
        .reduce((acc, [key, value]) => (key === keyToFind)
            ? acc.concat(value)
            : (typeof value === 'object')
                ? acc.concat(findAllByKey(value, keyToFind))
                : acc
            , [])
}

/**
 * Splits an array of dates (separator needs to be provided as string)
 * into [{day: xx, month: xx, year: xx}]
 * @param arr
 * @param sep
 * @returns {*}
 */
const splitArrayOfDates = (arr, sep) => {
    sep = str(sep);
    // let newArr = arr;
    // newArr = map(newArr, item => item.split(sep));
    // newArr = map(newArr, (([day, month, year]) => ({day, month, year})));
    // return newArr;
    return arr
        .map(item => item.split(sep))
        .map(([day, month, year]) => ({day, month, year}));
};

/**
 * Counts occurrences in an array by key and returns
 * an array of objects formatted for Nivo pie chart: [{ id: ABC, label: ABC, value: 123 }]
 * TODO: make this more universal
 * @param arr
 * @param key
 * @param sep
 * @returns {*}
 */
const nivoCountByKey = (arr, key) => {
    return Object.values(arr.reduce((mapping, item) => {
        const { [item[key]]: matchingItem } = mapping;
        if(matchingItem) {
            matchingItem.value++;
        }
        else {
            mapping[ item[key] ] = { id: item[key], label: item[key], value : 1 };
        }
        return mapping;
    },{}))
}

/**
 * Checks if the key is a string and then sets it via useDispatch
 * @param dispatch
 * @param key
 */
const filterDatesByKey = (dispatch, key) => {
    val(isFun(dispatch));
    val(isStr(key));

    const { changeDatesDisplay } = chartActions;

    dispatch(changeDatesDisplay({
        filterDatesBy: key
    }))
}

/**
 * Formats an array of objects into a format compatible with a pie chart
 * @param obj
 * @param key
 * @param sep
 * @returns {*}
 */
const nivoFormatDatesBy = (obj, key, sep) => {
    key = str(key);
    sep = str(sep);

    const allDates = findAllByKey(obj, 'date_of_birth');
    const splitArr = splitArrayOfDates(allDates, sep);
    return nivoCountByKey(splitArr, key);
}


export {
    handleChangePage,
    handleSorting,
    getNewPage,
    getSortingDirection,
    fetchPageNumbers,
    handleRowsLimit,
    sortData,
    filterData,
    newSearch,
    isNonEmptyString,
    formatNumber,
    toClassNameString,
    maybeUpperCase,
    generateRandomId,
    debounce,
    findAllByKey,
    splitArrayOfDates,
    nivoCountByKey,
    filterDatesByKey,
    nivoFormatDatesBy
}




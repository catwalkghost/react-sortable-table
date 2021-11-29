import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { newSearch, debounce } from '../../utils/utils';
import { INPUT_DEBOUNCE} from '../../lib/constants';

const SearchBar = () => {

    const dispatch = useDispatch();

    const { search: { searchValue } } = useSelector(state => state);

    // This memoises the debounced handler,
    // but also calls debounce() only during initial rendering of the component.
    const debouncedSearch = useMemo(() =>
            debounce(
                INPUT_DEBOUNCE,
                (searchTerm) => newSearch(dispatch, searchTerm )
            ),[])

     const handleSearch = (e) => {
         debouncedSearch(e.target.value);
     };

    // Stop the invocation of the debounced function
    // after unmounting
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        }
    }, []);

    // TODO: Add focus and auto-focus to the input
    return (
        <input
            autoComplete="on"
            type="text"
            className="search-bar"
            onChange={handleSearch}
            placeholder='Search'
            value={searchValue}
        />
    );
}

export default SearchBar;

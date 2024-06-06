import { useState, useEffect, useRef } from 'react';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Search.module.scss';
import { useDebounce } from '~/Hooks';
import classNames from 'classnames/bind';
import { type } from '@testing-library/user-event/dist/type';

import * as searchServices from '~/services/searchService';
const cx = classNames.bind(styles);
function Search() {
    const [searchValue, setSearchValue] = useState('');

    const [searchResult, setSearchResult] = useState([]);
    //note :
    const [showResult, setShowResult] = useState(true);
    //loading search
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);

    const inputRef = useRef();

    //call API
    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }
        //first API
        const fetchApi = async () => {
            setLoading(true);

            const result = await searchServices.search(debouncedValue);
            setSearchResult(result);

            setLoading(false);
        };
        fetchApi();
    }, [debouncedValue]);

    // ******** Khai bao API bang Fetch
    //     fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debouncedValue)}&type=less`)
    //         .then((res) => res.json())
    //         .then((res) => {
    //             setSearchResult(res.data);
    //             //End API
    //             setLoading(false);
    //         })
    //         .catch(() => {
    //             //Error
    //             setLoading(false);
    //         });
    // }, [debouncedValue]);

    //********** Khai bao API bang Axios
    //     request
    //         .get('users/search', {
    //             params: {
    //                 q: debouncedValue,
    //                 type: 'less',
    //             },
    //         })
    //         .then((res) => {
    //             //note   1: data -> axios      2: data -> return
    //             setSearchResult(res.data);
    //             //End API
    //             setLoading(false);
    //         })
    //         .catch(() => {
    //             setLoading(false);
    //         });
    // }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        //Using a wrapper <div> or <span> tag around the
        //reference element solves this by creating a new parentNode context.
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                //------------------phần render ra kết qả tìm kiếm
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map((results) => (
                                <AccountItem key={results.id} data={results} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    {/* input */}
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />

                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear} style={{ cursor: 'pointer' }}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;

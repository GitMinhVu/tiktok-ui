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

import * as searchServices from '~/apiServices/searchServices';
const cx = classNames.bind(styles);
function Search() {
    const [searchValue, setSearchValue] = useState('');

    const [searchResult, setSearchResult] = useState([]);
    //note :
    const [showResult, setShowResult] = useState(true);
    //loading search
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();

    //call API
    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }
        //first API
        const fetchApi = async () => {
            setLoading(true);

            const result = await searchServices.search(debounced);
            setSearchResult(result);

            setLoading(false);
        };
        fetchApi();
    }, [debounced]);

    // ******** Khai bao API bang Fetch
    //     fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounced)}&type=less`)
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
    // }, [debounced]);

    //********** Khai bao API bang Axios
    //     request
    //         .get('users/search', {
    //             params: {
    //                 q: debounced,
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
    // }, [debounced]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
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
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                />

                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear} style={{ cursor: 'pointer' }}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}

                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                <button className={cx('search-btn')}>
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;

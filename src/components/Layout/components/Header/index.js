import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faCircleXmark,
    faCloudUpload,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faMagnifyingGlass,
    faRightFromBracket,
    faSign,
    faSignIn,
    faSignOut,
    faSpinner,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

import Search from '~/pages/Search';
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';
import 'tippy.js/dist/tippy.css';

const cx = classNames.bind(styles);

const MENU_ITEM = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tieng viet',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const [searchResult, setSearchResult] = useState([]);
    const currentUser = true;

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'Language':
                //handle change language:
                break;
            default:
        }
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View Profile',
            to: '/@minhvu',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/getcoins',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/setting',
        },

        ...MENU_ITEM,

        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <img src={images.logo} alt="TikTok" />

                <HeadlessTippy
                    interactive
                    visible={searchResult.length > 0}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Accounts</h4>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder="Search accounts and videos" spellCheck={false} />
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </HeadlessTippy>

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy delay={[0, 200]} content="Upload Video" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon icon={faCloudUpload} />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button primary>Login</Button>
                        </>
                    )}
                    <Menu items={currentUser ? userMenu : MENU_ITEM} onChange={handleMenuChange}>
                        {currentUser ? (
                            <img
                                className={cx('user-avatar')}
                                src="data:image/jpeg;base64,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"
                                alt="Cat"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;

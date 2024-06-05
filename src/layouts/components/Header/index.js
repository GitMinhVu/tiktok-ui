import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from '~/config';

import {
    faCircleQuestion,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import { UploadIcon, MessageIcon, InboxIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';

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
    const currentUser = true;
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'Language':
                //handle change language:
                break;
            default:
        }
    };

    //Thanh menu
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
                <Link to={config.routes.home} className={cx('logoLink')}>
                    <img src={images.logo} alt="TikTok" />
                </Link>
                <Search />
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy delay={[0, 200]} content="Upload Video" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 200]} content="Send Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 200]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>12</span>
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
                            <Image
                                className={cx('user-avatar')}
                                src="data:image/jpeg;base64,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"
                                alt="Cat"
                                fallback="data:image/webp;base64,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"
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

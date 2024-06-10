import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { ModalContext } from '~/components/ModalProvider';
import { useContext } from 'react';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const context = useContext(ModalContext);

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;

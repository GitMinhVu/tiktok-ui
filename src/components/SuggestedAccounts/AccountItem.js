import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('account-item')}>
            <img
                className={cx('avatar')}
                src="https://cdn.hashnode.com/res/hashnode/image/upload/v1684925660249/a4bdcc8d-264a-4588-8095-5884d4650872.png?w=1200&auto=compress,format&format=webp&fm=png"
                alt="Js"
            />
            <div className={cx('item-info')}>
                <p className={cx('nickName')}>
                    <strong>nguyenThuan</strong>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </p>
                <p className={cx('name')}>Van Thuan</p>
            </div>
        </div>
    );
}

AccountItem.propsTypes = {};

export default AccountItem;

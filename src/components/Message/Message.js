import PropTypes from 'prop-types';

import style from './Message.module.scss';

export default function Message({ message }) {
    Message.propTypes = {
        message: PropTypes.string,
    };
    Message.defaultProps = {
        message: '',
    };
    return <p className={style.msg}>{message}</p>;
}

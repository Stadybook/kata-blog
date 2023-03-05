import PropTypes from 'prop-types';

import style from './FormTitle.module.scss';

export default function FormTitle({ text }) {
    FormTitle.propTypes = {
        text: PropTypes.string.isRequired,
    };
    return <h5 className={style.title}>{text}</h5>;
}

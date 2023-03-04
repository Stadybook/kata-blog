import PropTypes from 'prop-types';

export default function InputSubmit({ userError, value }) {
    InputSubmit.propTypes = {
        value: PropTypes.string.isRequired,
        userError: PropTypes.objectOf(PropTypes.string),
    };
    InputSubmit.defaultProps = {
        userError: null,
    };

    return (
        <input
            style={
                userError
                    ? {
                          color: '#FFFFFF',
                          width: '319px',
                          height: '40px',
                          background: '#aac9e6',
                          border: 'none',
                          borderRadius: '4px',
                      }
                    : {
                          color: '#FFFFFF',
                          width: '319px',
                          height: '40px',
                          background: '#1890FF',
                          border: 'none',
                          borderRadius: '4px',
                      }
            }
            type='submit'
            value={value}
            disabled={userError}
        />
    );
}

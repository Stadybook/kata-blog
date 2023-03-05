import { withRouter, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../components/FormContainer';
import UserForm from '../components/UserForm';
import WarningAlert from '../components/WarningAlert';
import Spiner from '../components/Spiner/Spiner';
import { asyncEditProfile, makeLoad } from '../redux/actions/userActions';

function EditProfilePage() {
    const dispatch = useDispatch();
    const { userError, userUpdate, load, user } = useSelector(
        (state) => state.userReducer
    );

    const alert = userError ? <WarningAlert error={userError} /> : null;
    const spiner = load && !userError ? <Spiner /> : null;

    const { username, email, token } = user;

    const onSubmit = (data) => {
        dispatch(asyncEditProfile(data, token));
        dispatch(makeLoad());
    };

    if (userUpdate !== null) {
        return <Redirect to='/articles/' />;
    }

    return (
        <>
            {alert}
            {spiner}
            <FormContainer
                width={384}
                component={
                    <UserForm
                        username={username}
                        email={email}
                        onSubmit={onSubmit}
                        userError={userError}
                    />
                }
            />
        </>
    );
}

export default withRouter(EditProfilePage);

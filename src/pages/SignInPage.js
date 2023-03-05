import { withRouter, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SignInForm from '../components/SignInForm';
import WarningAlert from '../components/WarningAlert';
import { asyncLogIn, makeLoad } from '../redux/actions/userActions';
import Spiner from '../components/Spiner';
import FormContainer from '../components/FormContainer';

function SignInPage() {
    const { user, userError, load } = useSelector((state) => state.userReducer);

    const dispatch = useDispatch();

    const alert = userError ? <WarningAlert error={userError} /> : null;
    const spiner = load && !userError ? <Spiner /> : null;

    if (!user) {
        const onSubmit = (data) => {
            dispatch(makeLoad());
            dispatch(asyncLogIn(data));
        };

        return (
            <>
                {alert}
                {spiner}
                <FormContainer
                    width={384}
                    component={
                        <SignInForm onSubmit={onSubmit} userError={userError} />
                    }
                />
            </>
        );
    }
    return <Redirect to='/articles/' />;
}

export default withRouter(SignInPage);

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import WithAuthentication from '../WithAuthentication';
import WithOutAuthentication from '../WithOutAutentification';

import style from './Header.module.scss';

export default function Header() {
    const { user } = useSelector((state) => state.userReducer);
    return (
        <header>
            <nav className={style.navigation}>
                <Link to='/articles/' className={style.title}>
                    Realworld Blog
                </Link>
                {user !== null && user !== undefined ? (
                    <WithAuthentication />
                ) : (
                    <WithOutAuthentication />
                )}
            </nav>
        </header>
    );
}

/* eslint-disable react/no-unstable-nested-components */
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';

import './App.scss';

import Header from '../Header';
import SignUpPage from '../../pages/SignUpPage';
import SignInPage from '../../pages/SignInPage';
import ArticleListPage from '../../pages/ArticlesListPage';
import ArticalePage from '../../pages/ArticalePage';
import EditProfilePage from '../../pages/EditProfilePage';
import CreateAndEditArticle from '../../pages/CreateAndEditArticle';
import NotFound from '../../pages/NotFound';
import DisconnectIndicator from '../DisconnectIndicator';

import PrivateRoute from './PrivateRouter';

export default function App() {
    if (!navigator.onLine) {
        return <DisconnectIndicator />;
    }

    return (
        <Router>
            <div className='container'>
                <Header />
                <Switch>
                    <Route path='/' exact>
                        <Redirect to='/articles/' />
                    </Route>
                    <Route path='/sign-up' component={SignUpPage} />
                    <Route path='/sign-in' component={SignInPage} />
                    <PrivateRoute
                        path='/profile'
                        component={() => <EditProfilePage />}
                    />
                    <PrivateRoute
                        path='/new-article'
                        component={() => <CreateAndEditArticle />}
                    />

                    <Route
                        path='/articles/'
                        exact
                        component={ArticleListPage}
                    />
                    <Route
                        path='/articles/:slug'
                        exact
                        render={() => {
                            return <ArticalePage />;
                        }}
                    />
                    <PrivateRoute
                        path='/articles/:slug/edit'
                        component={() => <CreateAndEditArticle edit />}
                    />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
}

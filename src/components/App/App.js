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
                    <Route path='/profile' component={EditProfilePage} />
                    <Route
                        path='/new-article'
                        component={CreateAndEditArticle}
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
                    <Route
                        path='/articles/:slug/edit'
                        render={() => {
                            return <CreateAndEditArticle edit />;
                        }}
                    />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
}

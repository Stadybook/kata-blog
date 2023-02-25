/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.scss';

import Header from '../Header';
import SignUpPage from '../SignUpPage';
import SignInPage from '../SignInPage';
import FullArticle from '../FullArticle';
import ArticleListPage from '../../pages/ArticlesListPage';
import EditProfilePage from '../EditProfilePage';
import CreateArticle from '../CreateArticle';
import NotFound from '../NotFound/NotFound';

export default function App() {
    return (
        <Router>
            <div className='container'>
                <Header />
                <Switch>
                    <Route path='/sign-up' component={SignUpPage} />
                    <Route path='/sign-in' component={SignInPage} />
                    <Route path='/profile' component={EditProfilePage} />
                    <Route path='/new-article' component={CreateArticle} />
                    <Route
                        path='/articles/'
                        exact
                        component={ArticleListPage}
                    />
                    <Route
                        path='/articles/:slug'
                        render={({ history }) => {
                            return <FullArticle />;
                        }}
                    />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
}

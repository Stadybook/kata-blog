/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.scss';

import Header from '../Header';
import SignUpPage from '../SignUpPage';
import SignInPage from '../SignInPage';
import FullArticle from '../FullArticle';
import ArticleListPage from '../../pages/ArticlesListPage';
import EditProfilePage from '../EditProfilePage';
import CreateArticle from '../CreateArticle';

export default function App() {
    return (
        <Router>
            <div className='container'>
                <Header />
                <Route path='/sign-up' component={SignUpPage} />
                <Route path='/sign-in' component={SignInPage} />
                <Route path='/profile' component={EditProfilePage} />
                <Route path='/new-article' component={CreateArticle} />
                <Route path='/articles/' exact component={ArticleListPage} />
                <Route
                    path='/articles/:slug'
                    render={({ match }) => {
                        const { slug } = match.params;
                        return <FullArticle articleId={slug} />;
                    }}
                />
            </div>
        </Router>
    );
}

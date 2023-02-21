/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';

import Header from '../Header';
import FullArticle from '../FullArticle';
import ArticleListPage from '../../pages/ArticlesListPage';

export default function App() {
    return (
        <Router>
            <div className='container'>
                <Header />
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

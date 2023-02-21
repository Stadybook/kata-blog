/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';

import Header from '../Header';
import ArticleList from '../ArticleList';
import FullArticle from '../FullArticle';
import AriclesListPage from '../../pages/AriclesListPage';
import { asyncGetArticles } from '../../redux/actions/actions';

export default function App() {
    return (
        <Router>
            <div className='container'>
                <Header />
                <Route path='/articles' exact component={AriclesListPage} />
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

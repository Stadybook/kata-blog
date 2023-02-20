/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';
import Header from '../Header';
import ArticleList from '../ArticleList';
import Article from '../Article';
import PaginationFn from '../Pagination';
import { asyncGetArticles } from '../../redux/actions/actions';

export default function App() {
    const page = useSelector((state) => state.articlesReducer.page);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncGetArticles());
    }, [page]);

    return (
        <div className='container'>
            <Header />
            <ArticleList />
            <PaginationFn />
        </div>
    );
}

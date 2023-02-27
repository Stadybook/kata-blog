/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { asyncGetArticles, makeLoad } from '../../redux/actions/actions';
import PaginationFn from '../Pagination';
import './ArticleList.scss';
import Article from '../Article';
import cuttingFn from '../../helpFunctions/cuttingFn';
import Spiner from '../Spiner/Spiner';

export default function ArticleList(props) {
    const { onSelected } = props;
    const page = useSelector((state) => state.articlesReducer.page);
    const articles = useSelector((state) => state.articlesReducer.articles);
    const loading = useSelector((state) => state.articlesReducer.loading);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncGetArticles(page));
        dispatch(makeLoad());
    }, [page]);

    const elements = articles.map((item) => {
        // console.log(item)
        const { slug } = item;
        return (
            <Article
                key={slug}
                {...item}
                onSelected={onSelected}
                func={cuttingFn}
            />
        );
    });

    const content = loading ? (
        <Spiner />
    ) : (
        <>
            <ul className='list'>{elements}</ul>
            <PaginationFn />
        </>
    );
    return content;
}

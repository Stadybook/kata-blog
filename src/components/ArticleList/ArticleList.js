/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { asyncGetArticles } from '../../redux/actions/actions';
import PaginationFn from '../Pagination';
import './ArticleList.scss';
import Article from '../Article';
import cuttingFn from '../helpFunctions/cuttingFn';

export default function ArticleList(props) {
    const { onSelected } = props;
    const page = useSelector((state) => state.articlesReducer.page);
    const articles = useSelector((state) => state.articlesReducer.articles);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncGetArticles(page));
    }, [page]);

    const elements = articles.map((item) => {
        // console.log(item);
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
    return (
        <>
            <ul className='list'>{elements}</ul>
            <PaginationFn />
        </>
    );
}

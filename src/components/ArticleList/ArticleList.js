/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    asyncGetArticles,
    makeLoad,
    cleanArr,
} from '../../redux/actions/articleActions';
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
    const user = useSelector((state) => state.userReducer.user);
    const dispatch = useDispatch();

    let Token = '';
    if (user !== null && user !== undefined) {
        const { token } = user;
        Token = token;
    }

    useEffect(() => {
        dispatch(asyncGetArticles(page, Token));
        dispatch(makeLoad());
        dispatch(cleanArr());
    }, [page, dispatch, Token]);

    const elements = articles.map((item) => {
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

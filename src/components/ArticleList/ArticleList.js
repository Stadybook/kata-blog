/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import {
    asyncGetArticles,
    makeLoad,
    cleanArr,
} from '../../redux/actions/articleActions';
import PaginationFn from '../Pagination';
import './ArticleList.scss';
import Article from '../Article';
import cuttingFn from '../../helpFunctions/cuttingFn';
import Spiner from '../Spiner';
import Error from '../Error';

function ArticleList(props) {
    ArticleList.propTypes = {
        onSelected: PropTypes.func.isRequired,
    };

    const { onSelected } = props;
    const { page, articles, loading, articlesError } = useSelector(
        (state) => state.articlesReducer
    );
    const { user } = useSelector((state) => state.userReducer);

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
    const content =
        loading && !articlesError ? (
            <Spiner />
        ) : (
            <>
                <ul className='list'>{elements}</ul>
                <PaginationFn />
            </>
        );
    return articlesError ? <Error /> : content;
}
export default React.memo(ArticleList);

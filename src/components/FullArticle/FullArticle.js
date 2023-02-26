/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import './FullArticle.scss';
import { useSelector, useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';

import Spiner from '../Spiner/Spiner';
import { asyncGetFullArticle, makeLoad } from '../../redux/actions/actions';
import Article from '../Article';

export default function FullArticle() {
    const dispatch = useDispatch();
    const fullArticle = useSelector(
        (state) => state.articlesReducer.fullArticle
    );
    const loading = useSelector((state) => state.articlesReducer.loading);
    const { slug } = useParams();

    useEffect(() => {
        dispatch(asyncGetFullArticle(slug));
        dispatch(makeLoad());
    }, []);

    const content = loading ? (
        <Spiner />
    ) : (
        <article>
            <Article
                {...fullArticle}
                func={(text) => {
                    return text;
                }}
                full
            />
            <ReactMarkdown className='text'>{fullArticle.body}</ReactMarkdown>
        </article>
    );

    return content;
}

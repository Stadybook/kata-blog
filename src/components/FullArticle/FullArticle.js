/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import './FullArticle.scss';
import { useSelector, useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';

import { asyncGetFullArticle } from '../../redux/actions/actions';
import Article from '../Article';

export default function FullArticle() {
    const dispatch = useDispatch();
    const fullArticle = useSelector(
        (state) => state.articlesReducer.fullArticle
    );
    const { slug } = useParams();

    useEffect(() => {
        dispatch(asyncGetFullArticle(slug));
    }, []);

    if (fullArticle !== null) {
        const { body } = fullArticle;

        return (
            <article>
                <Article
                    {...fullArticle}
                    func={(text) => {
                        return text;
                    }}
                    full
                />
                <ReactMarkdown className='text'>{body}</ReactMarkdown>
            </article>
        );
    }
}

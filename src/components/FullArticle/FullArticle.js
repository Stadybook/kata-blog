/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import './FullArticle.scss';
import { useSelector, useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import { asyncGetArticles } from '../../redux/actions/actions';
import Article from '../Article';

export default function FullArticle(props) {
    const dispatch = useDispatch();
    const page = useSelector((state) => state.articlesReducer.page);
    const articles = useSelector((state) => state.articlesReducer.articles);

    useEffect(() => {
        dispatch(asyncGetArticles(page));
    }, []);

    const { articleId } = props;
    const item = articles.filter((article) => article.slug === articleId);

    if (item[0] !== undefined) {
        const { body } = item[0];
        return (
            <article>
                <Article
                    {...item[0]}
                    func={(text) => {
                        return text;
                    }}
                />
                <ReactMarkdown className='text'>{body}</ReactMarkdown>
            </article>
        );
    }
}

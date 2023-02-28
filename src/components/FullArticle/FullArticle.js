import React, { useEffect } from 'react';
import './FullArticle.scss';
import { useSelector, useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { useParams, Redirect } from 'react-router-dom';

import Spiner from '../Spiner/Spiner';
import {
    asyncGetFullArticle,
    makeLoad,
} from '../../redux/actions/articleActions';
import Article from '../Article';

export default function FullArticle(props) {
    const { onEdit } = props;
    const dispatch = useDispatch();
    const fullArticle = useSelector(
        (state) => state.articlesReducer.fullArticle
    );
    const loading = useSelector((state) => state.articlesReducer.loading);
    const articleResponse = useSelector(
        (state) => state.articlesReducer.articleResponse
    );

    const { slug } = useParams();

    useEffect(() => {
        dispatch(asyncGetFullArticle(slug));
        dispatch(makeLoad());
    }, [slug, dispatch]);

    if (articleResponse === undefined) {
        return <Redirect to='/articles/' />;
    }

    let body = '';
    if (fullArticle) {
        body = (
            <ReactMarkdown className='text'>{fullArticle.body}</ReactMarkdown>
        );
    }
    const content =
        loading || fullArticle === null ? (
            <Spiner />
        ) : (
            <article>
                <Article
                    {...fullArticle}
                    func={(text) => {
                        return text;
                    }}
                    onEdit={onEdit}
                    full
                />
                {body}
            </article>
        );

    return content;
}

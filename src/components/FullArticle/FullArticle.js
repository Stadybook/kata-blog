/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import './FullArticle.scss';
import { useSelector, useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { useParams, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Spiner from '../Spiner/Spiner';
import {
    asyncGetFullArticle,
    makeLoad,
} from '../../redux/actions/articleActions';
import Article from '../Article';
import Error from '../ErrorHanding/ErrorHanding';

export default function FullArticle(props) {
    FullArticle.propTypes = {
        onEdit: PropTypes.func.isRequired,
    };

    const { onEdit } = props;
    const dispatch = useDispatch();
    const { fullArticle, articleResponse, loading, articlesError } =
        useSelector((state) => state.articlesReducer);
    const { user } = useSelector((state) => state.userReducer);

    let Token = '';
    if (user) {
        const { token } = user;
        Token = token;
    }

    const { slug } = useParams();

    useEffect(() => {
        dispatch(asyncGetFullArticle(slug, Token));
        dispatch(makeLoad());
    }, [slug, dispatch, Token]);

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
        (loading && !articlesError) || fullArticle === null ? (
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

    return articlesError ? <Error /> : content;
}

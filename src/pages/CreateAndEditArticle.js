/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import ArticleForm from '../components/ArticleForm';
import arrCompare from '../helpFunctions/arrCompare';
import Error from '../components/Error';
import {
    asyncAddArticle,
    asyncUpdateArticle,
} from '../redux/actions/articleActions';

const confirm = (msg) => {
    message.info(msg);
};

function CreateAndEditArticle(props) {
    CreateAndEditArticle.propTypes = {
        edit: PropTypes.bool,
    };
    CreateAndEditArticle.defaultProps = {
        edit: false,
    };

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userReducer);
    const { articleResponse, articleError, fullArticle } = useSelector(
        (state) => state.articlesReducer
    );

    const { token } = user;
    const { edit } = props;

    let initValue = { title: '', description: '', body: '', tagList: [] };

    if (fullArticle && edit) {
        const { title, description, body, tagList } = fullArticle;
        initValue = {
            title,
            description,
            body,
            tagList,
        };
    }
    const { title, description, body, tagList } = initValue;
    const [listOfTags, setTagList] = useState(tagList);

    const onSubmit = (data) => {
        if (
            data.title === title &&
            data.description === description &&
            data.body === body &&
            arrCompare(listOfTags, tagList)
        ) {
            confirm('The data has not changed');
        } else {
            if (!edit) dispatch(asyncAddArticle(data, token, listOfTags));

            dispatch(
                asyncUpdateArticle(data, fullArticle.slug, token, listOfTags)
            );
        }
    };

    if (edit) {
        if (fullArticle === null) {
            return <Redirect to='/sign-in' />;
        }
    }

    if (articleResponse !== null) {
        return <Redirect to='/articles/' />;
    }

    return articleError ? (
        <Error />
    ) : (
        <ArticleForm
            setTagList={setTagList}
            onSubmit={onSubmit}
            title={title}
            description={description}
            body={body}
            tagList={tagList}
            confirm={confirm}
        />
    );
}

export default withRouter(CreateAndEditArticle);

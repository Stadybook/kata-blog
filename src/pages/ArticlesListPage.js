/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { withRouter } from 'react-router-dom';

import ArticleList from '../components/ArticleList';

function ArticleListPage({ history }) {
    return (
        <ArticleList
            onSelected={(articleId) => {
                const newPath = `${articleId}`;
                history.push(newPath);
            }}
        />
    );
}

export default withRouter(ArticleListPage);

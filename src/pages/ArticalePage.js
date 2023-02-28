import React from 'react';
import { withRouter } from 'react-router-dom';

import FullArticle from '../components/FullArticle';

function ArticlePage({ history }) {
    return (
        <FullArticle
            onEdit={(articleId) => {
                const newPath = `${articleId}/edit`;
                history.push(newPath);
            }}
        />
    );
}

export default withRouter(ArticlePage);

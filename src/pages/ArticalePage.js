/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { withRouter } from 'react-router-dom';

// import Article from "../components/Article";
import FullArticle from '../components/FullArticle';

function ArticlePage() {
    return <FullArticle />;
}

export default withRouter(ArticlePage);

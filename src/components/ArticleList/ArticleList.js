/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './ArticleList.scss';
import Article from '../Article/Article';

export default function ArticleList() {
    const articles = useSelector((state) => state.articlesReducer.articles);

    const elements = articles.map((item) => {
        // console.log(item)
        const { slug } = item;
        return <Article key={slug} {...item} />;
    });
    return <ul className='list'>{elements}</ul>;
}

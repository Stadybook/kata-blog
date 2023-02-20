/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Tag } from 'antd';
import { format } from 'date-fns';

import getId from '../hetpFunctions/getId';

import style from './Article.module.scss';
import defaultPhoto from './avatar.svg';
import like from './like.svg';

export default function Article(props) {
    const {
        title,
        description,
        body,
        createdAt,
        tagList,
        favoritesCount,
        author,
    } = props;
    const { image, username } = author;

    // const tagsArray = tagList.join(' ');
    const tags = tagList.map((tag) => {
        if (tag.length !== 0) {
            return <Tag key={getId()}>{tag}</Tag>;
        }
    });

    // ???
    const avatar = image !== null ? image : defaultPhoto;

    const createDate = format(new Date(createdAt), 'MMMM dd, yyyy');
    return (
        <article>
            <div className={style.header}>
                <div>
                    <div className={style.info}>
                        <h5 className={style.title}>{title}</h5>
                        <div className={style.likes}>
                            <div>
                                <img src={like} alt='likes' />
                            </div>
                            <span>{favoritesCount}</span>
                        </div>
                    </div>
                    {tags}
                </div>
                <div className={style.author}>
                    <div className={style.author__info}>
                        <span>{username}</span>
                        <span className={style.date}>{createDate}</span>
                    </div>
                    <div className={style.avatar}>
                        <img src={avatar} alt='avatar' />
                    </div>
                </div>
            </div>
            <div className={style.description}>{description}</div>
        </article>
    );
}

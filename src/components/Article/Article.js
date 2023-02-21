/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */

import React from 'react';
import { Tag } from 'antd';
import { format } from 'date-fns';

import cuttingFn from '../helpFunctions/cuttingFn';
import getId from '../helpFunctions/getId';

import style from './Article.module.scss';
import defaultPhoto from './avatar.svg';
import like from './like.svg';

export default function Article(props) {
    const {
        func,
        title,
        description,
        body,
        slug,
        onSelected,
        createdAt,
        tagList,
        favoritesCount,
        author,
    } = props;
    const { image, username } = author;

    const tags = tagList.map((tag) => {
        if (tag.length === 0) {
            return;
        }
        const words = func(tag, 30);
        return (
            <Tag className={style.tag} key={getId()}>
                {words}
            </Tag>
        );
    });

    // ???
    const avatar = image !== undefined ? image : defaultPhoto;

    const createDate = format(new Date(createdAt), 'MMMM dd, yyyy');

    return (
        <section>
            <div className={style.header}>
                <div>
                    <div className={style.info}>
                        <a
                            onClick={() => onSelected(slug)}
                            className={style.title}
                        >
                            {func(title, 50)}
                        </a>
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
            <div className={style.description}>{func(description, 200)}</div>
        </section>
    );
}

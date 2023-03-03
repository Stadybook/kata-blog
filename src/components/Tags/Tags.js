/* eslint-disable import/no-extraneous-dependencies */
import { Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import style from './Tags.module.scss';

export default function Tags({ tagList, confirm, showTags }) {
    Tags.propTypes = {
        tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
        confirm: PropTypes.func.isRequired,
        showTags: PropTypes.func.isRequired,
    };
    const [listOfTags, setTagList] = useState(tagList);
    const [tagValue, setTagValue] = useState('');

    const { register } = useForm({
        mode: 'onBlur',
    });

    useEffect(() => {
        showTags(listOfTags);
    }, [listOfTags, showTags]);

    const onDelete = (tag) => {
        setTagList(listOfTags.filter((item) => item !== tag));
    };

    const onAddTag = () => {
        if (listOfTags.includes(tagValue)) {
            confirm('This tag already exists ');
            setTagValue('');
        } else if (tagValue === '') {
            confirm('You have not entered any tag');
        } else {
            setTagList((list) => [...list, tagValue]);
            setTagValue('');
        }
    };

    const tags = listOfTags.map((tag) => {
        return (
            <li key={tag} className={style.tag}>
                <Tag>{tag}</Tag>
                <button
                    className={style.delete}
                    type='button'
                    onClick={() => onDelete(tag)}
                >
                    Delete
                </button>
            </li>
        );
    });

    return (
        <div className={style.tags}>
            <span>Tags</span>
            <div className={style.tags__list}>
                <ul>{tags}</ul>
                <div>
                    <label htmlFor='tag'>
                        <input
                            {...register('tag', {
                                required: false,
                                pattern: {
                                    value: /^[a-zA-Z0-9]+$/,
                                    message:
                                        'You can use only english letters and digits without spaces and other symbols',
                                },
                            })}
                            value={tagValue}
                            placeholder='tag'
                            onChange={(e) => setTagValue(e.target.value)}
                        />
                    </label>
                    <button
                        className={style.add}
                        type='button'
                        onClick={onAddTag}
                    >
                        Add tags
                    </button>
                </div>
            </div>
        </div>
    );
}

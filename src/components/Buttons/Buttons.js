import { useSelector, useDispatch } from 'react-redux';
import { Popconfirm } from 'antd';

import { asyncDeleteArticles } from '../../redux/actions/articleActions';

import style from './Buttons.module.scss';

const text = 'Are you sure to delete this article?';
const description = 'Delete the article';

export default function Buttons(props) {
    const { onEdit } = props;
    const fullArticle = useSelector(
        (state) => state.articlesReducer.fullArticle
    );
    const user = useSelector((state) => state.userReducer.user);
    const { token } = user;
    const { slug } = fullArticle;
    const dispatch = useDispatch();

    const onDelete = () => {
        dispatch(asyncDeleteArticles(slug, token));
    };

    return (
        <div className={style.group}>
            <Popconfirm
                placement='rightTop'
                title={text}
                description={description}
                onConfirm={onDelete}
                okText='Yes'
                cancelText='No'
            >
                <button type='button' className={style.delete}>
                    Delete
                </button>
            </Popconfirm>

            <button
                type='button'
                className={style.edit}
                onClick={() => onEdit(slug)}
            >
                Edit
            </button>
        </div>
    );
}

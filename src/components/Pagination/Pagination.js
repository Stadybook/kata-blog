import React from 'react';
import { Pagination } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { changePage } from '../../redux/actions/articleActions';
import './Pagination.scss';

export default function PaginationFn() {
    const { articlesCount } = useSelector((state) => state.articlesReducer);
    const { page } = useSelector((state) => state.articlesReducer);

    const dispatch = useDispatch();
    return (
        <Pagination
            className='pagination'
            onChange={(curentPage) => dispatch(changePage(curentPage))}
            defaultCurrent={1}
            current={page}
            total={articlesCount * 2}
            showSizeChanger={false}
            disabled={false}
        />
    );
}

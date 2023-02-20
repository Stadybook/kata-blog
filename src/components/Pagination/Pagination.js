import React from 'react';
import { Pagination } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { changePage } from '../../redux/actions/actions';
import './Pagination.scss';

export default function PaginationFn() {
    const articlesCount = useSelector(
        (state) => state.articlesReducer.articlesCount
    );
    const dispatch = useDispatch();
    return (
        <Pagination
            onChange={(page) => dispatch(changePage(page))}
            defaultCurrent={1}
            total={articlesCount}
            showSizeChanger={false}
            disabled={false}
        />
    );
}

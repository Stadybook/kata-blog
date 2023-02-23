import React from 'react';
import { Pagination } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { changePage } from '../../redux/actions/actions';
import './Pagination.scss';

export default function PaginationFn() {
    const articlesCount = useSelector(
        (state) => state.articlesReducer.articlesCount
    );
    const pagginationPage = useSelector((state) => state.articlesReducer.page);

    const dispatch = useDispatch();
    return (
        <Pagination
            className='pagination'
            onChange={(page) => dispatch(changePage(page))}
            defaultCurrent={1}
            current={pagginationPage}
            total={articlesCount * 2}
            showSizeChanger={false}
            disabled={false}
        />
    );
}

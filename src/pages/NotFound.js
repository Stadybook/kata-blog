/* eslint-disable no-unused-vars */
import React from 'react';

import img from '../img/not.png';

export default function NotFound() {
    return (
        <>
            <p
                style={{
                    color: 'black',
                    fontSize: '30px',
                    marginTop: '30px',
                    marginBottom: '10px',
                }}
            >
                Page not found
            </p>
            <div style={{ width: '60px', height: '50px' }}>
                <img
                    src={img}
                    alt='not found'
                    style={{ width: '60px', height: '100%' }}
                />
            </div>
        </>
    );
}

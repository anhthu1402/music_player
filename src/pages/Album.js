import React from 'react';
import { useParams } from 'react-router-dom';

function Album() {
    const { id } = useParams();
    return (
        <div>
            nabi beo baetteu
            <div>{id}</div>
        </div>
    )
}

export default Album

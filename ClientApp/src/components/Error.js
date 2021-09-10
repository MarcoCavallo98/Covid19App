import React from 'react';
import { ERROR_404, ERROR_408, ERROR_COMMON } from '../utils/errorConstants';

export default ({ errorCode, history }) => (
    <div className="error-container">
        {history && errorCode === 404 && <button onClick={() => history.push('/')}>Back</button>}
        <h2 className="error-text">{errorCode === 404 ? ERROR_404 : (errorCode === 408 ? ERROR_408 : ERROR_COMMON)}</h2>
    </div>
);
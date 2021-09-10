import React from 'react';
import * as constants from '../utils/positivesIdexConstans';

export default () => (
    <div>
        <h2>Legend</h2>
        <p>Case notification rate per 100 000 inhabitants:</p>
        <div className="legend-item">
            <div 
                className={constants.LOW_COLOR}
            />
            <p>less than {constants.LOW_TRESHOLD}</p>
        </div>
        <div className="legend-item">
            <div 
                className={constants.AVERAGE_COLOR}
            />
            <p>less than {constants.AVERAGE_TRESHOLD}</p>
        </div>
        <div className="legend-item">
            <div 
                className={constants.HIGH_COLOR}
            />
            <p>more than {constants.AVERAGE_TRESHOLD}</p>
        </div>
        <div className="legend-item">
            <div 
                className={constants.NO_DATA_COLOR}
            />
            <p>no data provided</p>
        </div>
    </div>
);
import React from 'react';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';

const rounded = num => {
    if (num > 1000000000) {
      return Math.round(num / 100000000) / 10 + "Bn";
    } else if (num > 1000000) {
      return Math.round(num / 100000) / 10 + "M";
    } else {
      return Math.round(num / 100) / 10 + "K";
    }
};

export default ({data}) => {
    return (
        <div>
            {data && 
                <ReactTooltip data-tip={`Data for ${data.mapName}`}>
                    <h2>{data.mapName}</h2>
                    {data.location &&
                    <div>
                        <p>Reference date: {moment(data.location.Date).format('DD/MM/YYYY')}</p>
                        <p>Population: {rounded(data.location.Population)}</p>
                        <p>Positive: {data.location.ConfirmedDaily}</p>
                        <p>Dead: {data.location.DeathsDaily}</p>
                        <p>Click on the state for more details</p>
                    </div>}
                </ReactTooltip>}
        </div>
        
    );

};
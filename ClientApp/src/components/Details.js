import React, { useEffect, useState } from 'react';
import { getLocationData } from '../api/apiFetcher';
import moment from 'moment';
import { 
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { Scrollbars } from 'react-custom-scrollbars';
import Loading from './Loading';
import Error from './Error';
import { CHART_COLOR, DEATH_LINE_COLOR, POSITE_LINE_COLOR } from '../utils/chartColors';

export default (props) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({name: '', infos: []});
    const [error, setError] = useState(undefined);
    const [clicked, changeClicked] = useState(false);

    const burgerClicked = () => changeClicked(!clicked);

    const toRender = (
            <div className="details-container">
                <button 
                    className="back-button"
                    onClick = {() => props.history.push('/')}
                >
                    Back
                </button>
                <div className="scrollbar-and-chart-container">
                    <div className="side-bar">
                        <div className="burger-container">
                            <div className="bar-container" onClick={burgerClicked}>
                                <div className={clicked ? 'top-bar active' : 'top-bar'}></div>
                                <div className={clicked ? 'middle-bar active' : 'middle-bar'}></div>
                                <div className={clicked ? 'bottom-bar active' : 'bottom-bar'}></div>
                            </div>
                        </div>
                        <div className="scroll-container">
                            <Scrollbars className={clicked ? 'scrollbar active' : 'scrollbar'} >
                                {data.infos.map((elem, index) => (
                                    <div 
                                        key={index}
                                        className="scroll-item"
                                    >
                                        <p className="bold">{elem.Date}</p>
                                        <p>Positive: {elem.ConfirmedDaily}</p>
                                        <p>Dead: {elem.DeathsDaily}</p>
                                    </div>
                                ))}
                            </Scrollbars>
                        </div>
                    </div>
                    <div className="chart-container">
                        <h1>{data.name}</h1>
                        <h2>Trend of the last five days</h2>
                        <div className="chart">
                            <p className="bold">Positive:</p>
                            <ResponsiveContainer width="95%" height="100%">
                                <LineChart data={data.infos} >
                                    <Line 
                                        name="Positive" 
                                        type="monotone" 
                                        dataKey="ConfirmedDaily" 
                                        stroke={POSITE_LINE_COLOR} 
                                    />
                                    <CartesianGrid stroke={CHART_COLOR} strokeDasharray="5 5" />
                                    <XAxis dataKey="Date" stroke={CHART_COLOR} />
                                    <YAxis stroke={CHART_COLOR} />
                                    <Tooltip />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="chart">
                            <p className="bold">Deaths:</p>
                            <ResponsiveContainer width="95%" height="100%">
                                <LineChart data={data.infos} >
                                    <Line 
                                        name="Deaths" 
                                        type="monotone" 
                                        dataKey="DeathsDaily"
                                        stroke= {DEATH_LINE_COLOR}
                                    />
                                    <CartesianGrid stroke={CHART_COLOR} strokeDasharray="5 5" />
                                    <XAxis dataKey="Date" stroke={CHART_COLOR}/>
                                    <YAxis stroke={CHART_COLOR} />
                                    <Tooltip />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        );

    useEffect(() => {
        getLocationData(props.match.params.ISO2)
            .then(res => { 
                const toAdd = res.data;
                toAdd.forEach(elem => {
                    elem.Date = moment(elem.Date).format("DD/MM/YYYY")
                });
                setData(() => ({name: toAdd[0].Country, infos: toAdd}));
            }).catch(e => {
                if(e.response)
                    setError(() => e.response.status)
                else
                    setError(() => 408)
            })
            .finally(() => setLoading(() => false));

            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <>
            {loading ? <Loading /> : (error ? <Error errorCode={error} history={props.history}/> : toRender)}
        </>
    );
}
//Part of this code is provided by React Simple Map

import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from 'react-simple-maps';
import Tooltip from './Tooltip';
import { combineMapNames, findLocation, getStateColor } from '../utils/mapUtils';
import MapLegend from './MapLegend';
import { NO_DATA_COLOR_MAP } from '../utils/positivesIdexConstans';

const geoUrl = process.env.REACT_APP_GEO_URL;


const Map = ({locationsData, history}) => {

    const mapWidth = 300;
    const mapHeight = 150;

    const [tooltipContent, setTooltipContent] = useState(null);

    const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

    const handleZoomIn = () => {
        if (position.zoom >= 4) return;
        setPosition(pos => ({ ...pos, zoom: Math.round(pos.zoom * 2) }));
    }

    const handleZoomOut = () => {
        if (position.zoom <= 1)
          setPosition(() => ({ coordinates: [0, 0], zoom: 1 }));
        else
          setPosition(pos => ({ ...pos, zoom: Math.round(pos.zoom / 2) }));
    }

    const handleMoveEnd = (position) => {
        setPosition(() => position);
    }


    return (
      <div>
        <p className="text-info">
            This website gives some useful informations about the pandhemic world situation.<br/>
            If you move your mouse on the map you will see a box appearing with some infos. If you want see all the data of the last five days, 
            just click on a state.<br/>If you are using a mobile device, just tap on a state to see the data!
        </p>
        <div className="map-container">
          <div>
            <div className="zoom-button-container">
              <button onClick={handleZoomIn}>Zoom in</button>
              <button onClick={handleZoomOut}>Zoom out</button>
          </div>
          <MapLegend />
          </div>
          <div className="map">
            <ComposableMap 
                data-tip="" 
                width={mapWidth}
                height={mapHeight}
                projectionConfig={{ scale: 50 }}
            >
              <ZoomableGroup
                zoom={position.zoom}
                center={position.coordinates}
                onMoveEnd={handleMoveEnd}
                translateExtent={[[0, 0], [mapWidth, mapHeight]]}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map(geo =>{
                        const { ISO_A2, NAME } = geo.properties;
                        const locationData = findLocation(locationsData, ISO_A2);
                        const styleClass = locationData ? getStateColor(locationData.Population, locationData.ConfirmedDaily) : NO_DATA_COLOR_MAP;
                        return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => {
                            history.push(`/details/${ISO_A2}`);
                        }}
                        onMouseEnter={() => {
                            const dbName = locationData ? locationData.Country : undefined;
                            setTooltipContent(() => ({location: locationData, mapName: combineMapNames(NAME, dbName)}));
                        }}
                        onMouseLeave={() => {
                            setTooltipContent(() => null);
                        }}
                        className={styleClass}
                      />
                    )})
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
            <Tooltip data={tooltipContent}/>
          </div>
        </div>
      </div>
    );
  };
  
  const mapStateToProps = (state) => ({
      locationsData: state.locationsData
  });

  export default connect(mapStateToProps)(memo(Map));
import * as constants from './positivesIdexConstans';

export const findLocation = (locationsData, iso2) => {
    return locationsData.find(elem => elem.ISO2.find(e => e.toUpperCase() === iso2.toUpperCase()));
}

export const combineMapNames = (geoName, dbName) => {
    let name = geoName;
    if(dbName && geoName.toUpperCase() !== dbName.toUpperCase())
        name += ` (${dbName})`;
    
    return name;
}

export const getStateColor = (totalPopulation, positives) => {
    const result = (positives/totalPopulation)*100000;
    if(result < constants.LOW_TRESHOLD)
        return constants.LOW_COLOR_MAP;
    else if (result < constants.AVERAGE_TRESHOLD)
        return constants.AVERAGE_COLOR_MAP;
    else
        return constants.HIGH_COLOR_MAP;
}
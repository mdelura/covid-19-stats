import Axios from 'axios';
import parse from 'csv-parse/lib/sync';
import DataResult from '../models/DataResult';

const dataUrl =
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv';

const columns = ['Province/State', 'Country/Region', 'Lat', 'Long'];

const getData = async (): Promise<DataResult[] | undefined> => {
    const response = await Axios.get(dataUrl);

    if (response.statusText !== 'OK') return;

    return parse(response.data, { columns: true }) as DataResult[];
};

const getDays = (dataResult: DataResult): string[] => {
    const days = [];
    for (const key in dataResult) {
        if (dataResult.hasOwnProperty(key) && columns.findIndex(c => c === key) < 0) {
            days.push(key);
        }
    }

    return days;
};

const getDaysFromDayOne = (dataResult: DataResult): string[] => {
    const days = [];
    for (const key in dataResult) {
        const value = parseInt(dataResult[key] as string);
        if (dataResult.hasOwnProperty(key) && columns.findIndex(c => c === key) < 0 && value) {
            days.push(key);
        }
    }

    return days;
};

const getValues = (dataResult: DataResult): number[] => {
    const values = [];
    for (const key in dataResult) {
        if (dataResult.hasOwnProperty(key) && columns.findIndex(c => c === key) < 0) {
            values.push(parseInt(dataResult[key] as string));
        }
    }

    return values;
};

const getValuesFromDayOne = (dataResult: DataResult): number[] => {
    const values = [];
    for (const key in dataResult) {
        const value = parseInt(dataResult[key] as string);
        if (dataResult.hasOwnProperty(key) && columns.findIndex(c => c === key) < 0 && value) {
            values.push(value);
        }
    }

    return values;
};

export default {
    getData,
    getDays,
    getDaysFromDayOne,
    getValues,
    getValuesFromDayOne
};

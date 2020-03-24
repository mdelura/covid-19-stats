import DataResult from '../models/DataResult';
import DayValue from '../models/DayValue';

const columns = ['Province/State', 'Country/Region', 'Lat', 'Long'];

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

const getDayValues = (dataResult: DataResult): DayValue[] => {
    const dayValues: DayValue[] = [];
    for (const key in dataResult) {
        if (dataResult.hasOwnProperty(key) && columns.findIndex(c => c === key) < 0) {
            dayValues.push({
                day: new Date(key),
                value: parseInt(dataResult[key] as string)
            });
        }
    }

    return dayValues;
};

export default {
    getDays,
    getDaysFromDayOne,
    getValues,
    getValuesFromDayOne,
    getDayValues
};

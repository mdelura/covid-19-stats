import DataResult from '../models/DataResult';
import DayValue from '../models/DayValue';
import _ from 'lodash';
import { getPopulation } from '../data/Population';

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
    const population = getPopulation(dataResult['Country/Region']);
    for (const key in dataResult) {
        if (dataResult.hasOwnProperty(key) && columns.findIndex(c => c === key) < 0) {
            const value = parseInt(dataResult[key] as string);
            const previousValue = dayValues.length ? dayValues[dayValues.length - 1].totalCases : 0;
            const daily = value - previousValue;

            const [month, day, year] = key.split('/');
            const date = new Date(Date.UTC(parseInt(`20${year}`), parseInt(month) - 1, parseInt(day)));
            dayValues.push({
                date: date,
                totalCases: value,
                daily,
                dailyIncrease: previousValue ? daily / previousValue : 0,
                ofPopulation: population ? value / population : 0
            });
        }
    }

    return dayValues;
};

const getEstimation = (dataResult: DataResult): DayValue[] => {
    const lastDayValues = _.takeRight(getDayValues(dataResult), 3);
    const averageIncrease = _.meanBy(lastDayValues, dv => dv.dailyIncrease);
    const population = getPopulation(dataResult['Country/Region']);

    //TODO: use lastDayValues do kroczącej estymacji
    const dayValues: DayValue[] = [_.last(lastDayValues) as DayValue];

    for (let i = 0; i < 3; i++) {
        const previousDayValue = dayValues[i];
        const daily = Math.round(previousDayValue.totalCases * averageIncrease);
        const day = new Date(previousDayValue.date);
        day.setDate(day.getDate() + 1);

        const value = previousDayValue.totalCases + daily;

        dayValues.push({
            date: day,
            daily,
            dailyIncrease: averageIncrease,
            totalCases: value,
            ofPopulation: population ? value / population : 0
        });
    }

    return dayValues;
};

export default {
    getDays,
    getDaysFromDayOne,
    getValues,
    getValuesFromDayOne,
    getDayValues,
    getEstimation
};

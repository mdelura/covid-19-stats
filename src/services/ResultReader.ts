import DataResult from '../models/DataResult';
import DayValue from '../models/DayValue';
import _ from 'lodash';

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
            const value = parseInt(dataResult[key] as string);
            const previousValue = dayValues.length ? dayValues[dayValues.length - 1].value : 0;
            const daily = value - previousValue;
            dayValues.push({
                //Typo in date
                day: new Date(key === '3/21/202' ? '3/21/20' : key),
                value,
                daily,
                dailyIncrease: previousValue ? daily / previousValue : 0
            });
        }
    }

    return dayValues;
};

const getEstimation = (dataResult: DataResult): DayValue[] => {
    const lastDayValues = _.takeRight(getDayValues(dataResult), 3);
    const averageIncrease = _.meanBy(lastDayValues, dv => dv.dailyIncrease);

    //TODO: use lastDayValues do kroczącej estymacji
    const dayValues: DayValue[] = [_.last(lastDayValues) as DayValue];

    for (let i = 0; i < 3; i++) {
        const previousDayValue = dayValues[i];
        const daily = Math.round(previousDayValue.value * averageIncrease);
        const day = new Date(previousDayValue.day);
        day.setDate(day.getDate() + 1);

        dayValues.push({
            day,
            daily,
            dailyIncrease: averageIncrease,
            value: previousDayValue.value + daily
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

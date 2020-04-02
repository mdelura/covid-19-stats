import React from 'react';
import Chart from 'react-apexcharts';

import ResultReader from '../services/ResultReader';
import DataResult from '../models/DataResult';
import _ from 'lodash';

export interface ChartsProps {
    dataResults: DataResult[];
    showLastPeriod: boolean;
}

const Charts: React.SFC<ChartsProps> = ({ dataResults, showLastPeriod }) => {
    const getSeries = (dataSelector: (dataResult: DataResult) => number[][]) =>
        dataResults.map(dr => ({
            name: dr['Country/Region'],
            //TODO: Fix since day one
            data: showLastPeriod ? _.takeRight(dataSelector(dr), 14) : dataSelector(dr)
            // data: dataSelector(dr)
        }));

    const series = _.concat(
        getSeries(dr => ResultReader.getDayValues(dr).map(dv => [dv.date.getTime(), dv.totalCases])),
        getSeries(dr => ResultReader.getEstimation(dr).map(dv => [dv.date.getTime(), dv.totalCases]))
    );

    const seriesFromDayOne = getSeries(dr => ResultReader.getValuesFromDayOne(dr).map((value, index) => [index + 1, value]));

    dataResults.map(dr => ({
        name: dr['Country/Region'],
        data: ResultReader.getValuesFromDayOne(dr).map((value, index) => [index + 1, value])
    }));

    const dailySeries = getSeries(dr => ResultReader.getDayValues(dr).map(dv => [dv.date.getTime(), dv.daily]));

    const dailyIncreaseSeries = getSeries(dr => ResultReader.getDayValues(dr).map(dv => [dv.date.getTime(), dv.dailyIncrease]));

    const dailyIncreaseSeriesSinceDayOne = getSeries(dr => {
        const dayValues = ResultReader.getDayValues(dr);
        return dayValues.slice(dayValues.findIndex(dv => dv.totalCases)).map((dv, index) => [index + 1, dv.dailyIncrease]);
    });

    const dailySeriesFromDayOne = getSeries(dr => {
        const dayValues = ResultReader.getDayValues(dr);
        return dayValues.slice(dayValues.findIndex(dv => dv.totalCases)).map((dv, index) => [index + 1, dv.daily]);
    });

    const seriesOfPopulation = getSeries(dr => ResultReader.getDayValues(dr).map(dv => [dv.date.getTime(), dv.ofPopulation]));

    return (
        <React.Fragment>
            <Chart
                series={series}
                type="line"
                options={{
                    title: {
                        text: 'Total cases',
                        style: { fontSize: '18px', fontWeight: 'normal' }
                    },
                    xaxis: { type: 'datetime' },
                    stroke: {
                        dashArray: series.map((s, i) => (i >= series.length / 2 ? 4 : 0))
                    }
                }}
            />
            <Chart
                series={seriesFromDayOne}
                options={{
                    title: {
                        text: 'Total cases since Day One',
                        style: { fontSize: '18px', fontWeight: 'normal' }
                    },
                    xaxis: { type: 'numeric' }
                }}
            />
            <Chart
                series={dailySeries}
                type="line"
                options={{
                    title: {
                        text: 'Daily cases',
                        style: { fontSize: '18px', fontWeight: 'normal' }
                    },
                    xaxis: { type: 'datetime' },
                    dataLabels: { enabled: false }
                }}
            />
            <Chart
                series={dailySeriesFromDayOne}
                type="line"
                options={{
                    title: {
                        text: 'Daily cases since Day One',
                        style: { fontSize: '18px', fontWeight: 'normal' }
                    },
                    xaxis: { type: 'numeric' },
                    dataLabels: { enabled: false }
                }}
            />
            <Chart
                series={dailyIncreaseSeries}
                type="line"
                options={{
                    title: {
                        text: 'Daily increase',
                        style: { fontSize: '18px', fontWeight: 'normal' }
                    },
                    xaxis: { type: 'datetime' },
                    dataLabels: { enabled: false },
                    yaxis: { labels: { formatter: (v: number) => (v * 100).toFixed() + ' %' } }
                }}
            />
            <Chart
                series={dailyIncreaseSeriesSinceDayOne}
                type="line"
                options={{
                    title: {
                        text: 'Daily increase',
                        style: { fontSize: '18px', fontWeight: 'normal' }
                    },
                    xaxis: { type: 'numeric' },
                    dataLabels: { enabled: false },
                    yaxis: { labels: { formatter: (v: number) => (v * 100).toFixed() + ' %' } }
                }}
            />
            <Chart
                series={seriesOfPopulation}
                type="line"
                options={{
                    title: {
                        text: '% of population',
                        style: { fontSize: '18px', fontWeight: 'normal' }
                    },
                    xaxis: { type: 'datetime' },
                    yaxis: { labels: { formatter: (v: number) => (v * 100).toPrecision(2) + ' %' } }
                    // stroke: {
                    //     dashArray: series.map((s, i) => (i >= series.length / 2 ? 4 : 0))
                    // }
                }}
            />
            {/* TODO Add Stats + ests + vs population*/}
        </React.Fragment>
    );
};

export default Charts;

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

    const series = getSeries(dr => ResultReader.getDayValues(dr).map(dv => [dv.day.getTime(), dv.value]));

    console.log(series);
    // const seriesEst = getSeries(dr => ResultReader.getEstimation(dr).map(dv => [dv.day.getTime(), dv.value]));

    const seriesFromDayOne = getSeries(dr => ResultReader.getValuesFromDayOne(dr).map((value, index) => [index + 1, value]));

    dataResults.map(dr => ({
        name: dr['Country/Region'],
        data: ResultReader.getValuesFromDayOne(dr).map((value, index) => [index + 1, value])
    }));

    const dailySeries = getSeries(dr => ResultReader.getDayValues(dr).map(dv => [dv.day.getTime(), dv.daily]));

    const dailyIncreaseSeries = getSeries(dr => ResultReader.getDayValues(dr).map(dv => [dv.day.getTime(), dv.dailyIncrease]));

    const dailySeriesFromDayOne = getSeries(dr => {
        const dayValues = ResultReader.getDayValues(dr);
        return dayValues.slice(dayValues.findIndex(dv => dv.value)).map((dv, index) => [index + 1, dv.daily]);
    });

    return (
        <React.Fragment>
            <Chart
                series={series}
                type="line"
                options={{
                    title: { text: 'Total cases' },
                    xaxis: { type: 'datetime' }
                    // stroke: {
                    //     dashArray: series.map((s, i) => (i / series.length > 0.5 ? 4 : 0))
                    // }
                }}
            />
            <Chart
                series={seriesFromDayOne}
                options={{
                    title: { text: 'Total cases since Day One' },
                    xaxis: { type: 'numeric' }
                }}
            />
            <Chart
                series={dailySeries}
                type="bar"
                options={{
                    title: { text: 'Daily cases' },
                    xaxis: { type: 'datetime' },
                    dataLabels: { enabled: false }
                }}
            />
            <Chart
                series={dailySeriesFromDayOne}
                type="bar"
                options={{
                    title: { text: 'Daily cases since Day One' },
                    xaxis: { type: 'numeric' },
                    dataLabels: { enabled: false }
                }}
            />
            <Chart
                series={dailyIncreaseSeries}
                type="bar"
                options={{
                    title: { text: 'Daily increase' },
                    xaxis: { type: 'datetime' },
                    stroke: { curve: 'stepline' },
                    dataLabels: { enabled: false },
                    yaxis: { labels: { formatter: (v: number) => (v * 100).toFixed() + ' %' } }
                }}
            />
            {/* TODO Add Stats + ests + vs population*/}
        </React.Fragment>
    );
};

export default Charts;

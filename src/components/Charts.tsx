import React from 'react';
import Chart from 'react-apexcharts';
import ResultReader from '../services/ResultReader';
import DataResult from '../models/DataResult';

export interface ChartsProps {
    dataResults: DataResult[];
}

const Charts: React.SFC<ChartsProps> = ({ dataResults }) => {
    const series = dataResults.map(dr => ({
        name: dr['Country/Region'],
        data: ResultReader.getDayValues(dr).map(dv => [dv.day.getTime(), dv.value])
    }));

    const seriesFromDayOneX = dataResults.map(dr => ({
        name: dr['Country/Region'],
        data: ResultReader.getValuesFromDayOne(dr).map((value, index) => [index + 1, value])
    }));

    return (
        <React.Fragment>
            {/* TODO Add legend, set buttons */}
            <Chart series={series} type="line" options={{ xaxis: { type: 'datetime' } }} />
            <Chart series={seriesFromDayOneX} options={{ xaxis: { type: 'numeric' } }} />
            {/* TODO Add Stats + ests + vs population*/}
        </React.Fragment>
    );
};

export default Charts;

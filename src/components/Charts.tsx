import React from 'react';
import Chart from 'react-apexcharts';
import DataService from '../services/DataService';
import DataResult from '../models/DataResult';

export interface ChartsProps {
    data: DataResult[];
}

const Charts: React.SFC<ChartsProps> = ({ data }) => {
    const selectedData = data.find(i => i['Country/Region'] === 'Poland') || ({} as DataResult);

    const getChartOptions = () => ({
        xaxis: { categories: DataService.getDaysFromDayOne(selectedData) }
    });

    const getChartSeries = () => [
        {
            name: selectedData['Country/Region'],
            data: DataService.getValuesFromDayOne(selectedData)
        }
    ];

    return (
        <React.Fragment>
            <Chart options={getChartOptions()} series={getChartSeries()} type="line" />
        </React.Fragment>
    );
};

export default Charts;

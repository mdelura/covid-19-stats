import React from 'react';
import Chart from 'react-apexcharts';
import ResultReader from '../services/ResultReader';
import DataResult from '../models/DataResult';

export interface ChartsProps {
    data: DataResult[];
}

const Charts: React.SFC<ChartsProps> = ({ data }) => {
    const selectedData = data.find(i => i['Country/Region'] === 'Poland') || ({} as DataResult);

    //TODO Add selects for State & Country

    const getChartOptions = (categories: string[]) => ({
        xaxis: { categories }
    });

    const getChartSeries = (values: number[]) => [
        {
            name: selectedData['Country/Region'],
            data: values
        }
    ];

    return (
        <React.Fragment>
            {/* TODO Add legend, set buttons */}

            <Chart
                options={getChartOptions(ResultReader.getDays(selectedData))}
                series={getChartSeries(ResultReader.getValues(selectedData))}
                type="line"
            />
            <Chart
                options={getChartOptions(ResultReader.getDaysFromDayOne(selectedData))}
                series={getChartSeries(ResultReader.getValuesFromDayOne(selectedData))}
                type="line"
            />
            {/* TODO Add Chart with 'since day 1'*/}
            {/* TODO Add Stats + ests*/}
        </React.Fragment>
    );
};

export default Charts;

import React from 'react';
import Chart from 'react-apexcharts';
import ResultReader from '../services/ResultReader';
import DataResult from '../models/DataResult';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

export interface ChartsProps {
    data: DataResult[];
}

const Charts: React.SFC<ChartsProps> = ({ data }) => {
    //TODO Refactor countries setting (lodash? linq?)
    const countries: string[] = [];
    new Set(data.map(i => i['Country/Region'])).forEach(c => countries.push(c));
    countries.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
    const selectedData = data.find(i => i['Country/Region'] === 'Poland') || ({} as DataResult);

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
            <Autocomplete
                multiple
                options={countries}
                disableCloseOnSelect
                renderOption={(country, { selected }) => (
                    <React.Fragment>
                        <Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {country}
                    </React.Fragment>
                )}
                // style={{ width: 500 }}
                renderInput={(params: any) => <TextField {...params} variant="outlined" label="Select Country" placeholder="Countries" />}
            />
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

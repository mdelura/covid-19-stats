import React, { useState, useEffect } from 'react';
import './App.css';
import Chart from 'react-apexcharts';
import Axios from 'axios';
import parse from 'csv-parse/lib/sync';

const dataUrl =
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv';

const columns = ['Province/State', 'Country/Region', 'Lat', 'Long'];

type DataItem = {
    'Province/State': string;
    'Country/Region': string;
    'Lat': number;
    'Long': number;
};
function App() {
    const getChartOptions = () => {
        const categories = [];
        for (const key in selectedData) {
            if (selectedData.hasOwnProperty(key) && columns.findIndex(c => c === key) < 0) {
                categories.push(key);
            }
        }
        return {
            xaxis: { categories }
        };
    };

    const getChartSeries = () => {
        const data = [];
        for (const key in selectedData) {
            if (selectedData.hasOwnProperty(key) && columns.findIndex(c => c === key) < 0) {
                data.push(selectedData[key]);
            }
        }
        return [
            {
                name: 'series-1',
                data
            }
        ];
    };

    // const [data, setData] = useState<DataItem[]>([]);

    const [selectedData, setSelectedData] = useState<any | undefined>(undefined);

    useEffect(() => {
        Axios.get(dataUrl).then(response => {
            if (response.statusText !== 'OK') return;

            const parsedData = parse(response.data, { columns: true }) as DataItem[];
            // setData(parsedData);
            const selected = parsedData.find(i => i['Country/Region'] === 'Poland');
            console.log('selected', selected);
            setSelectedData(selected);
        });
    }, []);

    return <div className="App">{selectedData && <Chart options={getChartOptions()} series={getChartSeries()} type="line" />}</div>;
}

export default App;

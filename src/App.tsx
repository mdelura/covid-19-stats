import React, { useState, useEffect } from 'react';
import './App.css';
import Chart from 'react-apexcharts';
import DataService from './services/DataService';

function App() {
    const getChartOptions = () => ({
        xaxis: { categories: DataService.getDaysFromDayOne(selectedData) }
    });

    const getChartSeries = () => [
        {
            name: 'series-1',
            data: DataService.getValuesFromDayOne(selectedData)
        }
    ];

    const [data, setData] = useState<any | undefined>(undefined);
    const [selectedData, setSelectedData] = useState<any | undefined>(undefined);

    useEffect(() => {
        DataService.getData().then(data => {
            if (!data) return;
            setData(data);
            setSelectedData(data.find(i => i['Country/Region'] === 'Poland'));
        });
    }, []);

    return <div className="App">{selectedData && <Chart options={getChartOptions()} series={getChartSeries()} type="line" />}</div>;
}

export default App;

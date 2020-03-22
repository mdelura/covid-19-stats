import React, { useState, useEffect } from 'react';
import './App.css';
import DataService from './services/DataService';
import Spinner from './components/Spinner';
import Charts from './components/Charts';
import DataResult from './models/DataResult';
import CenteredContent from './components/CenteredContent';

const App: React.SFC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<DataResult[] | undefined>(undefined);

    useEffect(() => {
        DataService.getData().then(data => {
            if (!data) return;
            setData(data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading)
        return (
            <CenteredContent>
                <Spinner message="Loading data..." />
            </CenteredContent>
        );

    if (!data) return <CenteredContent>Failed to load data</CenteredContent>;

    return (
        <div className="App">
            <Charts data={data} />
        </div>
    );
};

export default App;

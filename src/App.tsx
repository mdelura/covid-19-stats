import React, { useState, useEffect } from 'react';
import DataService from './services/DataService';
import Spinner from './components/Spinner';
import Charts from './components/Charts';
import DataResult from './models/DataResult';
import CenteredContent from './components/CenteredContent';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import DataSelector from './components/DataSelector';
import _ from 'lodash';

const defaultRegions = ['Poland', 'Italy', 'Germany'];

const App: React.SFC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [dataResults, setDataResults] = useState<DataResult[]>([]);
    const [selectedDataResults, setSelectedDataResults] = useState<DataResult[]>([]);

    useEffect(() => {
        DataService.getData().then(dataResults => {
            if (!dataResults) return;
            setDataResults(dataResults);
            setSelectedDataResults(dataResults.filter(dr => _.includes(defaultRegions, dr['Country/Region'])));
            setIsLoading(false);
        });
    }, []);

    if (isLoading)
        return (
            <CenteredContent>
                <Spinner message="Loading data..." />
            </CenteredContent>
        );

    if (!dataResults.length) return <CenteredContent>Failed to load data</CenteredContent>;

    return (
        <Container>
            <Box style={{ marginTop: 15 }}>
                <DataSelector dataResults={dataResults} selectedResults={selectedDataResults} onChangeSelectedResults={setSelectedDataResults} />
                <Charts dataResults={selectedDataResults} />
            </Box>
        </Container>
    );
};

export default App;

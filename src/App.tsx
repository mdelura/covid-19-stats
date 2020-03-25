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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Grid } from '@material-ui/core';

const defaultRegions = ['Poland', 'Italy', 'Germany', 'United Kingdom', 'Spain'];

const App: React.SFC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [dataResults, setDataResults] = useState<DataResult[]>([]);
    const [selectedDataResults, setSelectedDataResults] = useState<DataResult[]>([]);
    const [showLastPeriod, setShowLastPeriod] = useState(false);

    useEffect(() => {
        DataService.getDataResults().then(dataResults => {
            if (!dataResults) return;
            const sortedResults = _.sortBy(dataResults, ['Country/Region', 'Province/State']);
            setDataResults(sortedResults);
            setSelectedDataResults(
                sortedResults.filter(
                    dr =>
                        _.includes(defaultRegions, dr['Country/Region']) &&
                        (!dr['Province/State'] || _.includes(defaultRegions, dr['Province/State']))
                )
            );
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
        <React.Fragment>
            <AppBar position="sticky" style={{ backgroundColor: '#FFF', paddingTop: 5 }}>
                <Toolbar>
                    <Grid container>
                        <Grid item xs={9}>
                            <DataSelector
                                dataResults={dataResults}
                                selectedResults={selectedDataResults}
                                onChangeSelectedResults={setSelectedDataResults}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControlLabel
                                style={{ marginLeft: 5, color: '#000' }}
                                control={<Switch checked={showLastPeriod} onChange={(e, c) => setShowLastPeriod(c)} />}
                                label="Show last 2 weeks"
                                color="textSecondary"
                            />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Container style={{ marginTop: 5 }}>
                <Box>
                    <Charts dataResults={selectedDataResults} showLastPeriod={showLastPeriod} />
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default App;

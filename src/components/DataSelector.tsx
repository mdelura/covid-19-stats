import React from 'react';
import DataResult from '../models/DataResult';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';

export interface DataSelectorProps {
    dataResults: DataResult[];
    selectedResults: DataResult[];
    onChangeSelectedResults: (selectedResults: DataResult[]) => void;
}

const DataSelector: React.SFC<DataSelectorProps> = ({ dataResults, selectedResults, onChangeSelectedResults }) => {
    return (
        <Autocomplete
            multiple
            options={dataResults}
            onChange={(e, values) => onChangeSelectedResults(values)}
            value={selectedResults}
            getOptionLabel={dr => _.uniq(_.compact([dr['Country/Region'], dr['Province/State']])).join(', ')}
            renderInput={(params: any) => (
                <TextField {...params} variant="outlined" label="Regions" placeholder={!selectedResults ? 'Select region' : ''} />
            )}
        />
    );
};

export default DataSelector;

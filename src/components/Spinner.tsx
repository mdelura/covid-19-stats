import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography, Box } from '@material-ui/core';

export interface SpinnerProps {
    message?: string;
}

const Spinner: React.SFC<SpinnerProps> = ({ message }) => {
    return (
        <React.Fragment>
            <Box display="flex" flexDirection="column" alignItems="center">
                <CircularProgress />
                <Typography style={{ marginTop: 5 }}>{message}</Typography>
            </Box>
        </React.Fragment>
    );
};

export default Spinner;

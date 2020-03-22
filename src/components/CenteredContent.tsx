import React from 'react';
import { Box } from '@material-ui/core';

export interface CenteredContentProps {}

const CenteredContent: React.SFC<CenteredContentProps> = ({ children }) => {
    return (
        <Box display="flex" alignItems="center" justifyContent="center" css={{ minHeight: '100vh' }}>
            {children}
        </Box>
    );
};

export default CenteredContent;

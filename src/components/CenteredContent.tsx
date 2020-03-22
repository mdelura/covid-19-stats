import React from 'react';

export interface CenteredContentProps {}

const CenteredContent: React.SFC<CenteredContentProps> = ({ children }) => {
    return (
        <div className="row min-vh-100 justify-content-center align-content-center">
            <div className="d-flex">{children}</div>
        </div>
    );
};

export default CenteredContent;

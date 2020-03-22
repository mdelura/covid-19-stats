import * as React from 'react';

export interface SpinnerProps {
    message?: string;
}

const Spinner: React.SFC<SpinnerProps> = ({ message }) => {
    return (
        <React.Fragment>
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            {!!message && <p>{message}</p>}
        </React.Fragment>
    );
};

export default Spinner;

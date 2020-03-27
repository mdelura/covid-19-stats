import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DataResult from '../models/DataResult';
import ResultReader from '../services/ResultReader';

import { getPopulation } from '../data/Population';
import _ from 'lodash';

export interface SummaryTableProps {
    dataResults: DataResult[];
}

const SummaryTable: React.SFC<SummaryTableProps> = ({ dataResults }) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Country</TableCell>
                        <TableCell align="right">Population</TableCell>
                        <TableCell align="right">Total Cases</TableCell>
                        <TableCell align="right">% of Population</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataResults.map((dr, i) => {
                        const dv = _.last(ResultReader.getDayValues(dr));
                        return (
                            <TableRow key={i}>
                                <TableCell component="th" scope="row">
                                    {dr['Country/Region']}
                                </TableCell>
                                <TableCell align="right">{getPopulation(dr['Country/Region']).toLocaleString()}</TableCell>
                                <TableCell align="right">{dv?.totalCases.toLocaleString()}</TableCell>
                                <TableCell align="right">{((dv ? dv?.ofPopulation : 0) * 100).toFixed(3) + '%'}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SummaryTable;

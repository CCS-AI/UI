import React, { useState } from 'react';
import { DataGrid, GridColDef, GridCellParams, GridRowId } from '@material-ui/data-grid';
import '../styles/tableExaminations.css';
import { Button } from '@material-ui/core';
import { Examination } from '../../../../models/entities/examination';
import { words } from 'lodash';
import moment from 'moment';

export interface TablehProps {
    examinationsRows: Examination[];
    columns: string[];
    pageSize: number;
}

const examinationHebFields = require('./../../../../models/he.json')['examination'];
export const ExaminationsResults = ({ examinationsRows, columns, pageSize }: TablehProps) => {
    examinationsRows.forEach((row) => (moment(row.createdAt).format(), moment(row.updatedAt).format()));
    return (
        <React.Fragment>
            {/* <Button></Button> */}
            <ExaminationsTable examinationsRows={examinationsRows} columns={columns} pageSize={pageSize} />
        </React.Fragment>
    );
};

const ExaminationsTable = ({ examinationsRows, columns, pageSize }: TablehProps) => {
    // add show patient's medical file column
    const EXAMINATION_INFO = 'info';
    if (!columns.includes(EXAMINATION_INFO)) columns.push(EXAMINATION_INFO);

    const BUTTON = (params: GridCellParams) => (
        <Button className={'btn'} onClick={() => {}}>
            הצג
        </Button>
    );
    const HIDDEN_FIELDS = ['id', 'pmfId', 'speechAudiometry', 'patientTestBackground'];
    const columnsDef: GridColDef[] = columns.map((column) => {
        const basicProp = { field: column, width: 150, headerName: examinationHebFields[column] };
        if (HIDDEN_FIELDS.includes(column)) return { ...basicProp, hide: true };
        else if (column == EXAMINATION_INFO) return { ...basicProp, renderCell: BUTTON };
        return basicProp;
    });
    return <DataGrid rows={examinationsRows} columns={columnsDef} pageSize={pageSize} hideFooter={true} />;
};

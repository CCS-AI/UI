import React, { useState } from 'react';
import { DataGrid, GridColDef, GridCellParams, GridRowId } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import { Examination } from '../../../../models/entities/examination';
import moment from 'moment';
import { formatHebDate } from '../../../../utils/date';
import MuiDataGrid from '../../../shared/MuiDataGrid/MuiDataGrid';
import { TableHeader } from '../../../shared/form/StyledFormShared';

export interface TablehProps {
    examinationsRows: Examination[];
    columns: string[];
    pageSize: number;
}

const examinationHebFields = require('./../../../../models/he.json')['examination'];

export const ExaminationsTable = ({ examinationsRows, columns, pageSize }: TablehProps) => {
    // add show patient's medical file column
    const EXAMINATION_INFO = 'info';
    if (!columns.includes(EXAMINATION_INFO)) columns.push(EXAMINATION_INFO);

    const BUTTON = (params: GridCellParams) => (
        <Button color="secondary" variant="contained" onClick={() => {}}>
            הצג
        </Button>
    );
    const HIDDEN_FIELDS = ['id', 'pmfId', 'speechAudiometry', 'patientTestBackground', 'questionnaireResultId'];
    const DATE_FIELDS = ['createdAt', 'updatedAt'];
    const columnsDef: GridColDef[] = columns.map((column) => {
        const basicProp = { field: column, width: 150, headerName: examinationHebFields[column] };
        if (HIDDEN_FIELDS.includes(column)) return { ...basicProp, hide: true };
        else if (DATE_FIELDS.includes(column)) {
            return { ...basicProp, valueFormatter: (params) => formatHebDate(params.value?.toString()) };
        } else if (column === EXAMINATION_INFO) return { ...basicProp, renderCell: BUTTON };
        return basicProp;
    });
    return <MuiDataGrid rows={examinationsRows} columns={columnsDef} height="500px" />;
};

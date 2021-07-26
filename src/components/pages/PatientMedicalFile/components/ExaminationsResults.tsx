import React, { useState } from 'react';
import { DataGrid, GridColDef, GridCellParams, GridRowId } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Examination } from '../../../../models/entities/examination';
import moment from 'moment';
import { formatHebDate } from '../../../../utils/date';
import MuiDataGrid from '../../../shared/MuiDataGrid/MuiDataGrid';
import { TableHeader } from '../../../shared/form/StyledFormShared';
import { PagesRoutes } from '../../../../routing/PagesRoutes';

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
        <Link style={{ textDecoration: 'none' }} to={{ pathname: `${PagesRoutes.SingleExaminationSummary}/${params.row.id}` }}>
            <Button color="secondary" variant="contained">
                הצג
            </Button>
        </Link>
    );
    const HIDDEN_FIELDS = ['id', 'pmfId', 'speechAudiometry', 'patientTestBackground'];
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

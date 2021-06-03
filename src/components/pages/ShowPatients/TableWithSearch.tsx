import React, { useState } from 'react';
import { GridColDef, GridCellParams } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import { formatHebDate } from '../../../utils/date';
import MuiDataGrid from '../../shared/MuiDataGrid/MuiDataGrid';
import { TableHeader } from '../../shared/form/StyledFormShared';
import { Link } from 'react-router-dom';
import { PagesRoutes } from '../../../routing/PagesRoutes';

export interface TableWithSearchProps {
    rows: any[];
    columns: string[];
    pageSize: number;
}

const patientsHebFields = require('./../../../models/he.json')['patient'];

export const PatientTableWithSearch = ({ rows, columns, pageSize }: TableWithSearchProps) => {
    const [filteredRaws, setFilterRaws] = useState(rows);

    const requestSearch = (searchValue: string) => {
        const filteredRows = rows.filter((row) => {
            // Should be this code, but in dev the personalId may be null
            /* row.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
                row.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
                row.personalId.includes(searchValue) */

            const idMatch = row.personalId ? row.personalId.includes(searchValue) : false;
            return (
                row.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
                row.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
                idMatch
            );
        });
        setFilterRaws(filteredRows);
    };

    const cancelSearch = () => {
        setFilterRaws(rows);
    };

    return (
        <>
            <TableHeader>צפייה במטופלים</TableHeader>
            <br />
            <br />
            <SearchBar
                value={''}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
                placeholder={'חפש לפי שם פרטי/משפחה/תעודת זהות'}
                style={{ boxShadow: 'none' }}
            />
            <PatientTable rows={filteredRaws} columns={columns} pageSize={pageSize} />
        </>
    );
};

type PatientTableProps = TableWithSearchProps & {};
const PatientTable = ({ rows, columns, pageSize }: PatientTableProps) => {
    // add show patient's medical file column
    const MEDICAL_FILE = 'medicalFile';
    if (!columns.includes(MEDICAL_FILE)) columns.push(MEDICAL_FILE);

    const BUTTON = (params: GridCellParams) => (
        <Link style={{ textDecoration: 'none' }} to={{ pathname: `${PagesRoutes.Patients}/${params.row.id}` }}>
            <Button color="secondary" variant="contained">
                הצג
            </Button>
        </Link>
    );
    const HIDDEN_FIELDS = ['id', 'createdAt', 'updatedAt', 'organizationId'];
    const DATE_FIELDS = ['createdAt', 'updatedAt', 'birth'];
    const columnsDef: GridColDef[] = columns.map((column) => {
        const basicProp = { field: column, width: 120, headerName: patientsHebFields[column] };
        if (HIDDEN_FIELDS.includes(column)) return { ...basicProp, hide: true };
        else if (column == MEDICAL_FILE) return { ...basicProp, renderCell: BUTTON };
        else if (DATE_FIELDS.includes(column)) {
            return { ...basicProp, valueFormatter: (params) => formatHebDate(params.value?.toString()) };
        }
        return basicProp;
    });
    return <MuiDataGrid rows={rows} columns={columnsDef} />;
};

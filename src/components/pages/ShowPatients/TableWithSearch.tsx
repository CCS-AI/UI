import React, { useState } from 'react';
import { DataGrid, GridColDef, GridCellParams, GridRowId } from '@material-ui/data-grid';
import './styles/table.css';
import { Button, Dialog } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import PatientMedicalFileDetails from '../PatientMedicalFile';

export interface TableWithSearchProps {
    rows: any[];
    columns: string[];
    pageSize: number;
}

const patientsHebFields = require('./../../../models/he.json')['patient'];

export const PatientTableWithSearch = ({ rows, columns, pageSize }: TableWithSearchProps) => {
    const [filteredRaws, setFilterRaws] = useState(rows);
    const [open, setOpen] = useState(false);
    const [patientId, setPatientId] = useState('');

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
        <React.Fragment>
            <Dialog onClose={() => setOpen(false)} open={open}>
                <div>somemodal</div>
                <PatientMedicalFileDetails patientId={patientId} />
            </Dialog>
            <SearchBar
                value={''}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
                placeholder={'חפש לפי שם פרטי/משפחה/תעודת זהות'}
            />
            <Button></Button>
            <PatientTable rows={filteredRaws} columns={columns} pageSize={pageSize} setOpen={setOpen} setPatientId={setPatientId} />
        </React.Fragment>
    );
};

type PatientTableProps = TableWithSearchProps & {
    patientId?: string;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setPatientId: React.Dispatch<React.SetStateAction<string>>;
};
const PatientTable = ({ rows, columns, pageSize, setOpen, setPatientId }: PatientTableProps) => {
    // add show patient's medical file column
    const MEDICAL_FILE = 'medicalFile';
    if (!columns.includes(MEDICAL_FILE)) columns.push(MEDICAL_FILE);

    const BUTTON = (params: GridCellParams) => (
        <Button
            className={'btn'}
            onClick={() => {
                setOpen(true);
                setPatientId('' + params.row.id);
            }}
        >
            הצג
        </Button>
    );
    const HIDDEN_FIELDS = ['id', 'createdAt', 'updatedAt'];
    const columnsDef: GridColDef[] = columns.map((column) => {
        const basicProp = { field: column, width: 120, headerName: patientsHebFields[column] };
        if (HIDDEN_FIELDS.includes(column)) return { ...basicProp, hide: true };
        else if (column == MEDICAL_FILE) return { ...basicProp, renderCell: BUTTON };
        return basicProp;
    });

    return <DataGrid rows={rows} columns={columnsDef} pageSize={pageSize} />;
};
